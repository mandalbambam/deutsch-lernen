'use client';

/**
 * Keeps this device and the server's snapshot in step. Every round: fetch what's new, merge it
 * into IndexedDB, upload if this device has something the server doesn't. Works offline-first:
 * the app never waits for it, and a failed round is simply tried again later.
 */
import Dexie from 'dexie';
import { useSyncExternalStore } from 'react';
import { canonical, clearSyncedData, exportData, importBackup, parseBackup, SYNCED_TABLES, type Backup } from '@/lib/backup';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/db/profile';
import { fnv1a } from '@/lib/lexicon/hash';

const ETAG = 'x-sync-etag';
const STATE_KEY = 'deutsch-lernen-sync';
const DIRTY_KEY = 'deutsch-lernen-sync-dirty';
/** Wait for a pause in activity, but upload at least this often while studying. */
const QUIET_MS = 30_000;
const MAX_WAIT_MS = 180_000;
const CHECK_EVERY_MS = 120_000;
/** Browsers only finish requests after the page closes if the body is this small. */
const KEEPALIVE_LIMIT = 60_000;
const MAX_ROUNDS = 4;

interface Stored {
  etag?: string;
  /** fingerprint of what the server holds */
  hash?: string;
  epoch?: number;
  /** a "replace everything" still has to reach the server */
  resetPending?: boolean;
  lastSyncedAt?: number;
}

const memory = new Map<string, string>();
function readItem(key: string): string | null {
  try {
    return globalThis.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}
function writeItem(key: string, value: string | null) {
  try {
    if (value === null) globalThis.localStorage.removeItem(key);
    else globalThis.localStorage.setItem(key, value);
  } catch {
    if (value === null) memory.delete(key);
    else memory.set(key, value);
  }
}

function loadState(): Stored {
  try {
    return JSON.parse(readItem(STATE_KEY) ?? '{}') as Stored;
  } catch {
    return {};
  }
}
const saveState = (s: Stored) => writeItem(STATE_KEY, JSON.stringify(s));
const isDirty = () => readItem(DIRTY_KEY) === '1';
const setDirty = (dirty: boolean) => writeItem(DIRTY_KEY, dirty ? '1' : null);

function fingerprint(tables: Backup['tables']): string {
  const text = canonical(SYNCED_TABLES.map((t) => tables[t] ?? []));
  return `${fnv1a(text)}:${text.length}`;
}

const isEmpty = (tables: Backup['tables']) => SYNCED_TABLES.every((t) => !tables[t]?.length);
const epochOf = (etag: string) => Number(etag.split('.')[0]);

async function gzip(text: string): Promise<Blob> {
  return new Response(new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'))).blob();
}

async function gunzip(res: Response): Promise<string> {
  return new Response(res.body!.pipeThrough(new DecompressionStream('gzip'))).text();
}

class SyncHttpError extends Error {
  constructor(public status: number) {
    super(`sync request failed (${status})`);
  }
}

async function request(method: string, headers: Record<string, string>, body?: Blob): Promise<Response> {
  const profile = await getProfile();
  const res = await fetch('/api/sync', {
    method,
    cache: 'no-store',
    keepalive: !!body && body.size < KEEPALIVE_LIMIT,
    headers: { ...headers, ...(profile.ai.passphrase ? { 'x-app-passphrase': profile.ai.passphrase } : {}) },
    body,
  });
  if (!res.ok && res.status !== 304 && res.status !== 409) throw new SyncHttpError(res.status);
  return res;
}

/** One complete exchange with the server. Throws if the server can't be reached. */
export async function syncOnce(): Promise<void> {
  const state = loadState();
  const finish = () => {
    state.lastSyncedAt = Date.now();
    saveState(state);
  };
  // the browser may have wiped this device's data: fetch everything again
  const counts = await Promise.all(SYNCED_TABLES.map((t) => db.table(t).count()));
  if (counts.every((n) => n === 0)) setDirty(true);

  for (let round = 0; round < MAX_ROUNDS; round++) {
    if (state.resetPending) {
      const etag = (await request('DELETE', {})).headers.get(ETAG)!;
      state.etag = etag;
      state.epoch = epochOf(etag);
      state.hash = undefined;
      state.resetPending = false;
      saveState(state);
      setDirty(true);
    }

    // Uploads replace the server's copy, so before one this device always merges the full copy:
    // nothing on the server can be lost, whatever happened to the data here.
    const res = await request('GET', state.etag && !isDirty() ? { [ETAG]: state.etag } : {});
    if (res.status !== 304) {
      const etag = res.headers.get(ETAG)!;
      const epoch = epochOf(etag);
      // another device replaced everything: its data takes over from what's here
      if (state.epoch !== undefined && epoch > state.epoch) await clearSyncedData();
      if (res.status === 200) {
        const incoming = parseBackup(await gunzip(res));
        await importBackup(incoming, 'merge');
        state.hash = fingerprint(incoming.tables);
      } else {
        state.hash = undefined;
      }
      state.etag = etag;
      state.epoch = epoch;
      saveState(state);
      setDirty(true);
    }

    if (!isDirty()) return finish();
    // cleared before reading, so changes made during the upload are picked up next time
    setDirty(false);
    const local = await exportData(SYNCED_TABLES);
    const hash = fingerprint(local.tables);
    if (hash === state.hash || (state.hash === undefined && isEmpty(local.tables))) return finish();

    try {
      const put = await request('PUT', { 'Content-Type': 'application/gzip', [ETAG]: state.etag ?? '' }, await gzip(JSON.stringify(local)));
      if (put.status === 409) {
        // another device uploaded first: fetch and merge that, then try again
        setDirty(true);
        continue;
      }
      state.etag = put.headers.get(ETAG)!;
      state.hash = hash;
      return finish();
    } catch (err) {
      setDirty(true);
      throw err;
    }
  }
  throw new Error('Other devices kept uploading at the same moment — trying again soon.');
}

// ── status for the settings screen ───────────────────────────────────────────
export interface SyncStatus {
  /** undefined until the server has answered */
  enabled?: boolean;
  state: 'idle' | 'syncing' | 'offline' | 'error';
  lastSyncedAt?: number;
  message?: string;
}

const INITIAL: SyncStatus = { state: 'idle' };
let status: SyncStatus = INITIAL;
const listeners = new Set<() => void>();

function setStatus(patch: Partial<SyncStatus>) {
  status = { ...status, ...patch };
  listeners.forEach((l) => l());
}

export function useSyncStatus(): SyncStatus {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => status,
    () => INITIAL,
  );
}

// ── when to sync ─────────────────────────────────────────────────────────────
let running: Promise<void> | null = null;
let again = false;
let quietTimer: ReturnType<typeof setTimeout> | undefined;
let waitTimer: ReturnType<typeof setTimeout> | undefined;

function clearTimers() {
  clearTimeout(quietTimer);
  clearTimeout(waitTimer);
  quietTimer = waitTimer = undefined;
}

/** Runs a round now, or right after the one in progress. */
export function syncNow(): Promise<void> {
  clearTimers();
  if (!status.enabled) return Promise.resolve();
  if (running) {
    again = true;
    return running;
  }
  setStatus({ state: 'syncing', message: undefined });
  running = syncOnce()
    .then(() => setStatus({ state: 'idle', lastSyncedAt: loadState().lastSyncedAt }))
    .catch((err: unknown) => {
      if (err instanceof SyncHttpError) setStatus({ state: 'error', message: err.status === 401 ? 'The server asked you to sign in again.' : `The server answered with an error (${err.status}).` });
      else if (navigator.onLine === false || err instanceof TypeError) setStatus({ state: 'offline' });
      else setStatus({ state: 'error', message: (err as Error).message });
    })
    .finally(() => {
      running = null;
      if (again) {
        again = false;
        void syncNow();
      }
    });
  return running;
}

/** Makes this device's data the only copy: other devices drop theirs at their next sync. */
export function replaceEverywhere(): Promise<void> {
  if (!status.enabled) return Promise.resolve();
  const state = loadState();
  state.resetPending = true;
  saveState(state);
  return syncNow();
}

function changedSyncedData(parts: Record<string, unknown>): boolean {
  return Object.keys(parts).some((part) => {
    const name = part.split('/')[3];
    return name !== undefined && (SYNCED_TABLES as readonly string[]).includes(name);
  });
}

/** Starts watching for changes. Offline changes are remembered and uploaded once back online. */
export function startSync(): () => void {
  const onChange = (parts: Record<string, unknown>) => {
    if (!changedSyncedData(parts)) return;
    setDirty(true);
    if (!status.enabled) return;
    clearTimeout(quietTimer);
    quietTimer = setTimeout(() => void syncNow(), QUIET_MS);
    waitTimer ??= setTimeout(() => void syncNow(), MAX_WAIT_MS);
  };
  const onVisibility = () => {
    if (document.visibilityState === 'visible') void syncNow();
    else if (isDirty()) void syncNow(); // leaving the app: upload while the browser still lets us
  };
  const onOnline = () => void syncNow();

  Dexie.on('storagemutated', onChange);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('online', onOnline);
  const checker = setInterval(() => {
    if (document.visibilityState === 'visible') void syncNow();
  }, CHECK_EVERY_MS);

  setStatus({ lastSyncedAt: loadState().lastSyncedAt });
  void fetch('/api/sync/status', { cache: 'no-store' })
    .then((r) => (r.ok ? (r.json() as Promise<{ enabled: boolean }>) : { enabled: false }))
    .then(({ enabled }) => {
      setStatus({ enabled });
      if (enabled) void syncNow();
    })
    .catch(() => setStatus({ state: 'offline' }));

  return () => {
    clearTimers();
    clearInterval(checker);
    Dexie.on.storagemutated.unsubscribe(onChange);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('online', onOnline);
  };
}
