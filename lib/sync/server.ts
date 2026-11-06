/**
 * Server side of sync: one compressed snapshot in a folder. The server never looks inside it —
 * devices do all the merging — so this stays cheap on small machines.
 *
 * The etag "<epoch>.<version>" changes with every upload. The epoch only changes on a reset
 * ("replace everything"), which tells other devices to drop their copy instead of merging it.
 */
import { copyFile, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const MAX_SNAPSHOT_BYTES = 20 * 1024 * 1024;
/** Daily copies kept in `backups/`, in case a bad upload ever has to be undone. */
const BACKUPS_KEPT = 14;

interface Meta {
  epoch: number;
  version: number;
}

export function syncDir(): string | undefined {
  return process.env.SYNC_DATA_DIR?.trim() || undefined;
}

export const etagOf = (m: Meta) => `${m.epoch}.${m.version}`;

const snapshotPath = (dir: string) => path.join(dir, 'snapshot.gz');
const metaPath = (dir: string) => path.join(dir, 'meta.json');

async function readMeta(dir: string): Promise<Meta> {
  try {
    const m = JSON.parse(await readFile(metaPath(dir), 'utf8')) as Meta;
    if (Number.isInteger(m.epoch) && Number.isInteger(m.version)) return m;
  } catch {
    /* first use */
  }
  return { epoch: 0, version: 0 };
}

async function writeAtomic(file: string, data: string | Uint8Array): Promise<void> {
  const tmp = `${file}.tmp`;
  await writeFile(tmp, data, { mode: 0o600 });
  await rename(tmp, file);
}

async function writeMeta(dir: string, m: Meta): Promise<void> {
  await writeAtomic(metaPath(dir), JSON.stringify(m));
}

/** Keeps a copy of the current snapshot under `name`, then drops the oldest copies. */
async function keepBackup(dir: string, name: string, overwrite: boolean): Promise<void> {
  const backups = path.join(dir, 'backups');
  await mkdir(backups, { recursive: true, mode: 0o700 });
  const target = path.join(backups, `${name}.gz`);
  const names = await readdir(backups);
  if (overwrite || !names.includes(`${name}.gz`)) {
    await copyFile(snapshotPath(dir), target).catch((err: NodeJS.ErrnoException) => {
      if (err.code !== 'ENOENT') throw err; // nothing uploaded yet
    });
  }
  const sorted = (await readdir(backups)).sort();
  for (const old of sorted.slice(0, Math.max(0, sorted.length - BACKUPS_KEPT))) await rm(path.join(backups, old));
}

// One Node process serves all requests: running writes one at a time makes the etag check safe.
let queue: Promise<unknown> = Promise.resolve();
function oneAtATime<T>(work: () => Promise<T>): Promise<T> {
  const run = queue.then(work, work);
  queue = run.catch(() => {});
  return run;
}

export async function readSnapshot(dir: string): Promise<{ etag: string; data: Buffer | null }> {
  const etag = etagOf(await readMeta(dir));
  const data = await readFile(snapshotPath(dir)).catch((err: NodeJS.ErrnoException) => {
    if (err.code === 'ENOENT') return null;
    throw err;
  });
  return { etag, data };
}

/** Stores a snapshot if the device saw the latest one; otherwise it has to merge first. */
export function writeSnapshot(dir: string, data: Uint8Array, seenEtag: string | null): Promise<{ ok: boolean; etag: string }> {
  return oneAtATime(async () => {
    await mkdir(dir, { recursive: true, mode: 0o700 });
    const meta = await readMeta(dir);
    if (seenEtag !== etagOf(meta)) return { ok: false, etag: etagOf(meta) };
    await keepBackup(dir, new Date().toISOString().slice(0, 10), false);
    await writeAtomic(snapshotPath(dir), data);
    const next = { ...meta, version: meta.version + 1 };
    await writeMeta(dir, next);
    return { ok: true, etag: etagOf(next) };
  });
}

/** "Replace everything": the old snapshot moves to the backups and other devices drop their copy. */
export function resetSnapshot(dir: string): Promise<{ etag: string }> {
  return oneAtATime(async () => {
    await mkdir(dir, { recursive: true, mode: 0o700 });
    const meta = await readMeta(dir);
    const now = new Date().toISOString();
    await keepBackup(dir, `${now.slice(0, 10)}-reset-${Date.now()}`, true);
    await rm(snapshotPath(dir), { force: true });
    const next = { epoch: meta.epoch + 1, version: 0 };
    await writeMeta(dir, next);
    return { etag: etagOf(next) };
  });
}
