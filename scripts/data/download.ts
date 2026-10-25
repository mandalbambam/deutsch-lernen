/**
 * Downloads all raw data sources into .data-cache/.
 * Usage: npm run data:download [-- --force]
 */
import { createWriteStream } from 'node:fs';
import { mkdir, rename, stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { CACHE_DIR, SOURCES } from './sources';

const force = process.argv.includes('--force');

async function fileSize(path: string): Promise<number | null> {
  try {
    return (await stat(path)).size;
  } catch {
    return null;
  }
}

function mb(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function download(url: string, dest: string) {
  const head = await fetch(url, { method: 'HEAD', redirect: 'follow' });
  const expected = Number(head.headers.get('content-length') ?? 0);
  const existing = await fileSize(dest);
  if (!force && existing !== null && (expected === 0 || existing === expected)) {
    console.log(`  ✓ cached ${dest} (${mb(existing)})`);
    return;
  }

  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status} for ${url}`);
  const total = Number(res.headers.get('content-length') ?? expected ?? 0);
  let received = 0;
  let lastLog = Date.now();
  const progress = new Transform({
    transform(chunk: Buffer, _enc, cb) {
      received += chunk.length;
      if (Date.now() - lastLog > 3000) {
        lastLog = Date.now();
        const pct = total ? ` (${((received / total) * 100).toFixed(0)}%)` : '';
        console.log(`    … ${mb(received)}${pct}`);
      }
      cb(null, chunk);
    },
  });

  const tmp = `${dest}.part`;
  try {
    await pipeline(Readable.fromWeb(res.body as never), progress, createWriteStream(tmp));
    await rename(tmp, dest);
  } catch (err) {
    await unlink(tmp).catch(() => {});
    throw err;
  }
  console.log(`  ✓ downloaded ${dest} (${mb(received)})`);
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });
  for (const src of SOURCES) {
    console.log(`• ${src.id}`);
    await download(src.url, join(CACHE_DIR, src.file));
  }
  console.log('All sources ready in', CACHE_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
