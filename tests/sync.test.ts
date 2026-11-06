import 'fake-indexeddb/auto';
import Dexie from 'dexie';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { DELETE, GET, PUT } from '@/app/api/sync/route';
import { canonical, clearSyncedData, deleteAllData, exportData, importBackup, parseBackup, SYNCED_TABLES } from '@/lib/backup';
import { AppDB, db, deleteRecords } from '@/lib/db';
import type { Assessment, Card, DayLog, Profile, ReviewLog } from '@/lib/db/types';
import { DEFAULT_PROFILE, updateProfile } from '@/lib/db/profile';
import { syncOnce } from '@/lib/sync/client';
import { cardFromDeck, undoReview } from '@/lib/srs/cards';

function card(word: string, updatedAt: number, extra: Partial<Card> = {}): Card {
  return { ...cardFromDeck({ w: word, p: 'noun', g: 'm', d: ['x'], r: 1, l: 'A1' }, updatedAt), updatedAt, ...extra };
}

function test(id: string, answers: number, status: Assessment['status'] = 'in-progress', takenAt = 1000): Assessment {
  return {
    id,
    kind: 'placement',
    status,
    startedAt: 1000,
    takenAt,
    skills: {},
    responses: Array.from({ length: answers }, (_, i) => ({ itemId: `i${i}`, skill: 'grammar', level: 'A1', correct: true, choice: 0, ms: 1, errorTags: [] })),
  };
}

const profile = (patch: Partial<Profile>): Profile => ({ ...DEFAULT_PROFILE, ...patch });

const synced = async () => canonical((await exportData(SYNCED_TABLES)).tables);

/** Everything one device keeps: its database and its localStorage. */
interface Device {
  storage: Map<string, string>;
  data: Awaited<ReturnType<typeof exportData>> | null;
}
const newDevice = (): Device => ({ storage: new Map(), data: null });
let current: Device | null = null;

function fakeLocalStorage(store: Map<string, string>) {
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
}

/** Switches the one test database between devices. */
async function on(device: Device, work: () => Promise<unknown>) {
  if (current !== device) {
    if (current) current.data = await exportData();
    await deleteAllData();
    if (device.data) await importBackup(device.data, 'replace');
    vi.stubGlobal('localStorage', fakeLocalStorage(device.storage));
    current = device;
  }
  await work();
}

/** Connects the client's fetch calls directly to the route handlers, counting uploads. */
let uploads = 0;
function connectToServer() {
  uploads = 0;
  vi.stubGlobal('fetch', async (url: string, init: RequestInit = {}) => {
    const req = new Request(`http://test${url}`, { method: init.method, headers: init.headers, body: init.body });
    if (init.method === 'GET') return GET(req);
    if (init.method === 'DELETE') return DELETE(req);
    uploads++;
    return PUT(req);
  });
}

function put(body: Uint8Array, headers: Record<string, string>) {
  return PUT(new Request('http://test/api/sync', { method: 'PUT', headers, body: body as BodyInit }));
}
const gz = new Uint8Array([0x1f, 0x8b, 1, 2, 3]);

let root: string;
let dir: string;
let n = 0;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), 'sync-test-'));
});
afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

beforeEach(async () => {
  dir = path.join(root, `case-${n++}`);
  process.env.SYNC_DATA_DIR = dir;
  process.env.SYNC_BEHIND_LOGIN = '1';
  current = null;
  vi.stubGlobal('localStorage', fakeLocalStorage(new Map()));
  await deleteAllData();
  connectToServer();
});
afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.SYNC_DATA_DIR;
  delete process.env.APP_PASSPHRASE;
  delete process.env.SYNC_BEHIND_LOGIN;
});

describe('merge rules', () => {
  /** Merges in both directions and returns what each side ends up with. */
  async function converge(a: () => Promise<unknown>, b: () => Promise<unknown>) {
    await a();
    const dataA = await exportData(SYNCED_TABLES);
    await deleteAllData();
    await b();
    const dataB = await exportData(SYNCED_TABLES);
    await importBackup(parseBackup(JSON.stringify(dataA)), 'merge');
    const onB = await synced();
    await deleteAllData();
    await importBackup(parseBackup(JSON.stringify(dataA)), 'replace');
    await importBackup(parseBackup(JSON.stringify(dataB)), 'merge');
    const onA = await synced();
    return { onA, onB };
  }

  it('continues a test from the copy with the most answers, whichever side it is on', async () => {
    const { onA, onB } = await converge(() => db.assessments.put(test('t', 2)), () => db.assessments.put(test('t', 7)));
    expect(onA).toBe(onB);
    expect((await db.assessments.get('t'))?.responses).toHaveLength(7);
  });

  it('a finished test beats an unfinished copy with more answers', async () => {
    const { onA, onB } = await converge(() => db.assessments.put(test('t', 9)), () => db.assessments.put(test('t', 5, 'done', 2000)));
    expect(onA).toBe(onB);
    expect((await db.assessments.get('t'))?.status).toBe('done');
  });

  it('settles on the same copy when timestamps are equal', async () => {
    const { onA, onB } = await converge(() => db.cards.put(card('Tisch', 5, { stability: 1 })), () => db.cards.put(card('Tisch', 5, { stability: 2 })));
    expect(onA).toBe(onB);
  });

  it('combines study days the same way from both sides', async () => {
    const day = (session: DayLog['session'], seconds: DayLog['seconds']): DayLog => ({ date: '2026-11-01', session, seconds, reviews: 1, newCards: 0 });
    const block = (done: boolean) => ({ kind: 'cards' as const, minutes: 5, done });
    const finished = day({ blocks: [block(true), block(false)], createdAt: 1, completedAt: 9 }, { cards: 100 });
    const further = day({ blocks: [block(true), block(true)], createdAt: 2 }, { grammar: 50 });
    const { onA, onB } = await converge(() => db.days.put(finished), () => db.days.put(further));
    expect(onA).toBe(onB);
    const merged = await db.days.get('2026-11-01');
    expect(merged?.session?.completedAt).toBe(9);
    expect(merged?.seconds).toEqual({ cards: 100, grammar: 50 });
  });

  it('a set-up profile beats the defaults of a new device, even if those are newer', async () => {
    const { onA, onB } = await converge(
      () => db.profile.put(profile({ onboarded: true, dailyMinutes: 60, updatedAt: 100 })),
      () => db.profile.put(profile({ onboarded: false, updatedAt: 999 })),
    );
    expect(onA).toBe(onB);
    expect((await db.profile.get('me'))?.dailyMinutes).toBe(60);
  });

  it('settings changes spread: the newest profile wins', async () => {
    const { onA, onB } = await converge(
      () => db.profile.put(profile({ onboarded: true, dailyMinutes: 15, updatedAt: 100 })),
      () => db.profile.put(profile({ onboarded: true, dailyMinutes: 60, updatedAt: 200 })),
    );
    expect(onA).toBe(onB);
    expect((await db.profile.get('me'))?.dailyMinutes).toBe(60);
  });

  it('merging the same data twice changes nothing', async () => {
    await db.cards.put(card('Tisch', 5));
    await db.days.put({ date: '2026-11-01', seconds: { cards: 5 }, reviews: 1, newCards: 0 });
    const backup = parseBackup(JSON.stringify(await exportData()));
    expect(await importBackup(backup, 'merge')).toBe(0);
  });

  it('deleted records stay deleted, but a card added again later comes back', async () => {
    const t = Date.now() - 1000;
    await db.cards.put(card('Tisch', t));
    await db.assessments.put(test('old', 3));
    const before = parseBackup(JSON.stringify(await exportData()));
    await deleteRecords('cards', ['v:Tisch|noun']);
    await deleteRecords('assessments', ['old']);

    expect(await importBackup(before, 'merge')).toBe(0); // the other device still has them
    expect(await db.cards.get('v:Tisch|noun')).toBeUndefined();
    expect(await db.assessments.get('old')).toBeUndefined();

    const deletions = parseBackup(JSON.stringify(await exportData()));
    await deleteAllData();
    await importBackup(before, 'replace');
    await importBackup(deletions, 'merge'); // the deletion reaches the other device
    expect(await db.cards.get('v:Tisch|noun')).toBeUndefined();
    expect(await db.assessments.get('old')).toBeUndefined();

    const readded = parseBackup(JSON.stringify(await exportData()));
    readded.tables.cards = [card('Tisch', Date.now() + 1000) as unknown as Record<string, unknown>];
    await importBackup(readded, 'merge');
    expect(await db.cards.get('v:Tisch|noun')).toBeDefined();
  });

  it('undoing a review survives a merge with the reviewed copy', async () => {
    const previous = card('Tisch', 1000, { reps: 0 });
    const reviewed = card('Tisch', 2000, { reps: 1 });
    const log: ReviewLog = { id: 'r1', cardId: reviewed.id, at: 2000, rating: 3, state: 0, elapsedDays: 0, scheduledDays: 1, durationMs: 1 };
    await db.cards.put(reviewed);
    await db.reviews.put(log);
    const pushed = parseBackup(JSON.stringify(await exportData()));
    await undoReview({ card: reviewed, previous, logId: 'r1' } as Parameters<typeof undoReview>[0]);
    await importBackup(pushed, 'merge');
    expect((await db.cards.get(reviewed.id))?.reps).toBe(0);
    expect(await db.reviews.get('r1')).toBeUndefined();
  });
});

describe('database upgrade', () => {
  it('keeps the data of browsers that used the app before sync existed', async () => {
    const old = new Dexie('upgrade-test');
    old.version(1).stores({ profile: 'id', assessments: 'id, takenAt, kind, status', cards: 'id, due, state, kind, level, source, updatedAt, word', meta: 'key' });
    await old.table('assessments').put(test('old-test', 12));
    await old.table('cards').put(card('Tisch', 5));
    old.close();

    const upgraded = new AppDB('upgrade-test');
    expect((await upgraded.assessments.get('old-test'))?.responses).toHaveLength(12);
    expect(await upgraded.cards.count()).toBe(1);
    expect(await upgraded.tombstones.count()).toBe(0);
    upgraded.close();
  });

  it('old backups without deletions still import', async () => {
    const backup = parseBackup(JSON.stringify({ app: 'deutsch-lernen', version: 1, exportedAt: 'x', tables: { cards: [card('Tisch', 5)] } }));
    await importBackup(backup, 'merge');
    expect(await db.cards.count()).toBe(1);
  });
});

describe('sync route', () => {
  it('is off without SYNC_DATA_DIR', async () => {
    delete process.env.SYNC_DATA_DIR;
    expect((await GET(new Request('http://test/api/sync'))).status).toBe(404);
    expect((await put(gz, { 'content-type': 'application/gzip' })).status).toBe(404);
    expect((await DELETE(new Request('http://test/api/sync', { method: 'DELETE' }))).status).toBe(404);
  });

  it('stays off and stores nothing when nothing protects it', async () => {
    delete process.env.SYNC_BEHIND_LOGIN;
    expect((await GET(new Request('http://test/api/sync'))).status).toBe(404);
    expect((await put(gz, { 'content-type': 'application/gzip', 'x-sync-etag': '0.0' })).status).toBe(404);
    expect((await DELETE(new Request('http://test/api/sync', { method: 'DELETE' }))).status).toBe(404);
    await expect(readdir(dir)).rejects.toThrow();
  });

  it('respects APP_PASSPHRASE', async () => {
    delete process.env.SYNC_BEHIND_LOGIN; // the passphrase alone is enough to turn it on
    process.env.APP_PASSPHRASE = 'secret';
    expect((await GET(new Request('http://test/api/sync'))).status).toBe(401);
    expect((await GET(new Request('http://test/api/sync', { headers: { 'x-app-passphrase': 'secret' } }))).status).toBe(204);
  });

  it('refuses anything that is not a gzip upload', async () => {
    const etag = '0.0';
    expect((await put(gz, { 'content-type': 'text/plain', 'x-sync-etag': etag })).status).toBe(415);
    expect((await put(new Uint8Array([1, 2, 3]), { 'content-type': 'application/gzip', 'x-sync-etag': etag })).status).toBe(400);
    expect((await put(gz, { 'content-type': 'application/gzip', 'content-length': String(21 * 1024 * 1024), 'x-sync-etag': etag })).status).toBe(413);
    const huge = new Uint8Array(21 * 1024 * 1024);
    huge.set([0x1f, 0x8b]);
    expect((await put(huge, { 'content-type': 'application/gzip', 'x-sync-etag': etag })).status).toBe(413); // no size announced
    expect((await GET(new Request('http://test/api/sync'))).status).toBe(204); // nothing stored
  });

  it('only accepts uploads from a device that has seen the latest copy', async () => {
    const first = await put(gz, { 'content-type': 'application/gzip', 'x-sync-etag': '0.0' });
    expect(first.status).toBe(200);
    expect(first.headers.get('x-sync-etag')).toBe('0.1');
    const stale = await put(gz, { 'content-type': 'application/gzip', 'x-sync-etag': '0.0' });
    expect(stale.status).toBe(409);
    expect((await GET(new Request('http://test/api/sync', { headers: { 'x-sync-etag': '0.1' } }))).status).toBe(304);
    const res = await GET(new Request('http://test/api/sync'));
    expect(res.status).toBe(200);
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(gz);
  });

  it('two uploads at the same moment cannot both win', async () => {
    const results = await Promise.all([1, 2, 3].map(() => put(gz, { 'content-type': 'application/gzip', 'x-sync-etag': '0.0' })));
    expect(results.map((r) => r.status).sort()).toEqual([200, 409, 409]);
  });

  it('keeps old copies when uploading and resetting', async () => {
    await put(gz, { 'content-type': 'application/gzip', 'x-sync-etag': '0.0' });
    await put(gz, { 'content-type': 'application/gzip', 'x-sync-etag': '0.1' });
    expect(await readdir(path.join(dir, 'backups'))).toHaveLength(1); // one per day
    const reset = await DELETE(new Request('http://test/api/sync', { method: 'DELETE' }));
    expect(reset.headers.get('x-sync-etag')).toBe('1.0');
    expect(await readdir(path.join(dir, 'backups'))).toHaveLength(2);
    expect((await GET(new Request('http://test/api/sync'))).status).toBe(204);
  });
});

describe('two devices', () => {
  it('a test started on the laptop continues on the phone and finishes on the laptop', async () => {
    const laptop = newDevice();
    const phone = newDevice();
    await on(laptop, async () => {
      await db.assessments.put(test('t', 3));
      await syncOnce();
    });
    await on(phone, async () => {
      await syncOnce();
      expect((await db.assessments.get('t'))?.responses).toHaveLength(3);
      await db.assessments.put(test('t', 8));
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
      await syncOnce();
    });
    await on(laptop, async () => {
      await syncOnce();
      expect((await db.assessments.get('t'))?.responses).toHaveLength(8);
      await db.assessments.put(test('t', 8, 'done', 5000));
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
      await syncOnce();
    });
    await on(phone, async () => {
      await syncOnce();
      expect((await db.assessments.get('t'))?.status).toBe('done');
    });
  });

  it('settles down: once both are in step, nothing more is uploaded', async () => {
    const laptop = newDevice();
    const phone = newDevice();
    await on(laptop, async () => {
      await db.cards.put(card('Tisch', 5));
      await syncOnce();
    });
    await on(phone, async () => {
      await db.cards.put(card('Stuhl', 6));
      await syncOnce();
      expect(await db.cards.count()).toBe(2);
    });
    await on(laptop, () => syncOnce());
    uploads = 0;
    let requests = 0;
    const inner = globalThis.fetch;
    vi.stubGlobal('fetch', (...args: Parameters<typeof fetch>) => {
      requests++;
      return inner(...args);
    });
    await on(phone, () => syncOnce());
    await on(laptop, () => syncOnce());
    await on(phone, () => syncOnce());
    expect(uploads).toBe(0);
    expect(requests).toBeGreaterThan(0);
  });

  it('never overwrites the server with a device whose data was wiped', async () => {
    const laptop = newDevice();
    await on(laptop, async () => {
      await db.cards.bulkPut([card('Tisch', 5), card('Stuhl', 6)]);
      await syncOnce();
      await clearSyncedData(); // the browser evicted the database but kept localStorage
      await db.cards.put(card('Lampe', 7)); // and the learner carried on
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
      await syncOnce();
      expect(await db.cards.count()).toBe(3);
    });
    const phone = newDevice();
    await on(phone, async () => {
      await syncOnce();
      expect(await db.cards.count()).toBe(3);
    });
  });

  it('restores a device whose database was wiped, even when nothing changed on the server', async () => {
    const laptop = newDevice();
    await on(laptop, async () => {
      await db.cards.put(card('Tisch', 5));
      await syncOnce();
      await clearSyncedData();
      await syncOnce();
      expect(await db.cards.count()).toBe(1);
    });
  });

  it('merges work done offline on both devices', async () => {
    const laptop = newDevice();
    const phone = newDevice();
    await on(laptop, async () => {
      await db.cards.put(card('Tisch', 5));
      await syncOnce();
    });
    await on(phone, () => syncOnce());
    await on(laptop, async () => {
      await db.cards.put(card('Stuhl', 6));
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
    });
    await on(phone, async () => {
      await db.cards.put(card('Lampe', 7));
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
    });
    await on(laptop, () => syncOnce());
    await on(phone, async () => {
      await syncOnce();
      expect(await db.cards.count()).toBe(3);
    });
    await on(laptop, async () => {
      await syncOnce();
      expect(await db.cards.count()).toBe(3);
    });
  });

  it('retries when another device uploads first', async () => {
    const laptop = newDevice();
    const phone = newDevice();
    await on(laptop, async () => {
      await db.cards.put(card('Tisch', 5));
      await syncOnce();
    });
    await on(phone, async () => {
      await syncOnce();
      await db.cards.put(card('Lampe', 7));
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
    });
    // the laptop uploads between the phone's download and upload
    const laptopCopy = parseBackup(JSON.stringify(laptop.data));
    laptopCopy.tables.cards = [...(laptopCopy.tables.cards ?? []), card('Stuhl', 6) as unknown as Record<string, unknown>];
    const bytes = new Uint8Array(await new Response(new Blob([JSON.stringify(laptopCopy)]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());
    const inner = globalThis.fetch;
    let raced = false;
    vi.stubGlobal('fetch', async (url: string, init: RequestInit = {}) => {
      if (init.method === 'PUT' && !raced) {
        raced = true;
        const etag = (await GET(new Request('http://test/api/sync'))).headers.get('x-sync-etag')!;
        await put(bytes, { 'content-type': 'application/gzip', 'x-sync-etag': etag });
      }
      return inner(url, init);
    });
    await on(phone, async () => {
      await syncOnce();
      expect(await db.cards.count()).toBe(3);
    });
    await on(laptop, async () => {
      await syncOnce();
      expect(await db.cards.count()).toBe(3);
    });
  });

  it('a deletion on one device reaches the other', async () => {
    const laptop = newDevice();
    const phone = newDevice();
    await on(laptop, async () => {
      await db.cards.put(card('Tisch', Date.now() - 1000));
      await syncOnce();
    });
    await on(phone, () => syncOnce());
    await on(laptop, async () => {
      await deleteRecords('cards', ['v:Tisch|noun']);
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
      await syncOnce();
    });
    await on(phone, async () => {
      await syncOnce();
      expect(await db.cards.count()).toBe(0);
    });
  });

  it('"replace everything" makes other devices drop their copy, but only on a real reset', async () => {
    const laptop = newDevice();
    const phone = newDevice();
    await on(laptop, async () => {
      await db.cards.put(card('Tisch', 5));
      await syncOnce();
    });
    await on(phone, async () => {
      await syncOnce();
      await db.assessments.put(test('new-attempt', 1));
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
    });
    await on(laptop, async () => {
      await importBackup({ app: 'deutsch-lernen', version: 1, exportedAt: 'x', tables: { assessments: [test('old-test', 20) as unknown as Record<string, unknown>] } }, 'replace');
      const state = JSON.parse(localStorage.getItem('deutsch-lernen-sync')!);
      localStorage.setItem('deutsch-lernen-sync', JSON.stringify({ ...state, resetPending: true }));
      await syncOnce();
      expect((await db.assessments.toArray()).map((a) => a.id)).toEqual(['old-test']);
    });
    await on(phone, async () => {
      await syncOnce();
      expect((await db.assessments.toArray()).map((a) => a.id)).toEqual(['old-test']);
      expect(await db.cards.count()).toBe(0);
    });
  });

  it('losing the server folder doesn\'t wipe devices: they upload again', async () => {
    const laptop = newDevice();
    await on(laptop, async () => {
      await db.cards.put(card('Tisch', 5));
      await syncOnce();
      await DELETE(new Request('http://test/api/sync', { method: 'DELETE' })); // epoch 1, seen by nobody
    });
    await on(laptop, async () => {
      await syncOnce(); // real reset: drops local data, by design
      expect(await db.cards.count()).toBe(0);
      await db.cards.put(card('Stuhl', 6));
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
      await syncOnce();
    });
    await rm(dir, { recursive: true, force: true }); // the folder is gone: epoch falls back to 0
    await on(laptop, async () => {
      await syncOnce();
      expect(await db.cards.count()).toBe(1);
    });
    const phone = newDevice();
    await on(phone, async () => {
      await syncOnce();
      expect(await db.cards.count()).toBe(1);
    });
  });

  it('the AI passphrase stays on each device and never reaches the server', async () => {
    const laptop = newDevice();
    const phone = newDevice();
    await on(laptop, async () => {
      await db.profile.put(profile({ onboarded: true, dailyMinutes: 60, updatedAt: 100, ai: { passphrase: 'laptop-secret', noticeAccepted: true } }));
      await db.cards.put(card('Tisch', 5));
      await syncOnce();
    });
    const stored = await GET(new Request('http://test/api/sync'));
    const text = await new Response(stored.body!.pipeThrough(new DecompressionStream('gzip'))).text();
    expect(text).toContain('noticeAccepted');
    expect(text).not.toContain('laptop-secret');

    await on(phone, async () => {
      await syncOnce();
      expect((await db.profile.get('me'))?.ai).toEqual({ noticeAccepted: true });
      await updateProfile({ dailyMinutes: 15 }); // a settings change comes back to the laptop
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
      await syncOnce();
    });
    await on(laptop, async () => {
      await syncOnce();
      const merged = await db.profile.get('me');
      expect(merged?.dailyMinutes).toBe(15);
      expect(merged?.ai.passphrase).toBe('laptop-secret');
    });

    uploads = 0;
    await on(laptop, async () => {
      localStorage.setItem('deutsch-lernen-sync-dirty', '1');
      await syncOnce();
    });
    expect(uploads).toBe(0); // the passphrase doesn't make the devices look different
  });

  it('a new device sets up without erasing anything', async () => {
    const laptop = newDevice();
    await on(laptop, async () => {
      await updateProfile({ onboarded: true, dailyMinutes: 60 });
      await db.cards.put(card('Tisch', 5));
      await syncOnce();
    });
    const phone = newDevice();
    await on(phone, async () => {
      await updateProfile({ uiLang: 'de' }); // touched settings before the first sync
      await syncOnce();
      expect((await db.profile.get('me'))?.dailyMinutes).toBe(60);
      expect(await db.cards.count()).toBe(1);
    });
  });
});
