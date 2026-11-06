'use client';

/**
 * Export / import of all learning data as one JSON file (backup, or moving between laptop and phone).
 * Sync (lib/sync/client.ts) exchanges the same format and uses the same merge rules.
 */
import type { Table } from 'dexie';
import { z } from 'zod';
import { db, TABLE_NAMES } from '@/lib/db';
import type { DayLog, Tombstone } from '@/lib/db/types';

export const BACKUP_VERSION = 1;
/** caches are not worth exporting */
const EXPORTED = TABLE_NAMES.filter((t) => t !== 'aiCache');
type TableName = (typeof EXPORTED)[number];

/** Unfinished writing drafts (`meta`) stay on the device they were started on. */
export const SYNCED_TABLES = EXPORTED.filter((t) => t !== 'meta');

const KEY: Record<TableName, string> = {
  profile: 'id',
  assessments: 'id',
  skillState: 'skill',
  cards: 'id',
  reviews: 'id',
  attempts: 'id',
  mistakes: 'tag',
  topicProgress: 'topicId',
  textProgress: 'textId',
  plans: 'weekStart',
  days: 'date',
  writings: 'id',
  conversations: 'id',
  meta: 'key',
  tombstones: 'key',
};

/** timestamp used to decide which copy of a record is newer when merging */
const STAMP: Partial<Record<TableName, string>> = {
  profile: 'updatedAt',
  assessments: 'takenAt',
  skillState: 'updatedAt',
  cards: 'updatedAt',
  reviews: 'at',
  attempts: 'at',
  mistakes: 'lastAt',
  topicProgress: 'lastAt',
  textProgress: 'updatedAt',
  plans: 'createdAt',
  writings: 'at',
  conversations: 'updatedAt',
};

const record = z.record(z.string(), z.unknown());
const backupSchema = z.object({
  app: z.literal('deutsch-lernen'),
  version: z.number().int().min(1).max(BACKUP_VERSION),
  exportedAt: z.string(),
  tables: z.object(Object.fromEntries(EXPORTED.map((t) => [t, z.array(record).optional()])) as Record<TableName, z.ZodOptional<z.ZodArray<typeof record>>>),
});

export type Backup = z.infer<typeof backupSchema>;
type Row = Record<string, unknown>;

function table(name: TableName): Table<Row, string> {
  return db.table(name);
}

export async function exportData(names: readonly TableName[] = EXPORTED): Promise<Backup> {
  const tables = {} as Backup['tables'];
  for (const name of names) tables[name] = (await table(name).toArray()) as Row[];
  return { app: 'deutsch-lernen', version: BACKUP_VERSION, exportedAt: new Date().toISOString(), tables };
}

export async function downloadBackup(): Promise<void> {
  const data = await exportData();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `deutsch-lernen-backup-${data.exportedAt.slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/** Parses and validates a backup file; throws a readable error. */
export function parseBackup(text: string): Backup {
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error('This file is not valid JSON.');
  }
  const parsed = backupSchema.safeParse(json);
  if (!parsed.success) throw new Error('This file is not a Deutsch Lernen backup (or it was made by a newer version of the app).');
  for (const name of EXPORTED) {
    const key = KEY[name];
    for (const r of parsed.data.tables[name] ?? []) {
      if (typeof r[key] !== 'string' && typeof r[key] !== 'number') throw new Error(`The backup is damaged (a ${name} record has no ${key}).`);
    }
  }
  return parsed.data;
}

export function backupSummary(b: Backup): { exportedAt: string; counts: Record<string, number>; total: number } {
  const counts: Record<string, number> = {};
  let total = 0;
  for (const name of EXPORTED) {
    counts[name] = b.tables[name]?.length ?? 0;
    total += counts[name];
  }
  return { exportedAt: b.exportedAt, counts, total };
}

/** Text form of a value that doesn't depend on the order of its fields. */
export function canonical(value: unknown): string {
  return JSON.stringify(value, (_, v: unknown) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
      : v,
  );
}

function compareText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function mergeDay(local: DayLog, incoming: DayLog): DayLog {
  const seconds: DayLog['seconds'] = { ...local.seconds };
  for (const [m, s] of Object.entries(incoming.seconds ?? {})) seconds[m as keyof DayLog['seconds']] = Math.max(seconds[m as keyof DayLog['seconds']] ?? 0, s ?? 0);
  const progress = (d: DayLog) => (d.session?.completedAt ? 1000 : 0) + (d.session?.blocks.filter((b) => b.done).length ?? -1);
  const order = progress(incoming) - progress(local) || compareText(canonical(incoming.session), canonical(local.session));
  return { ...local, seconds, session: order > 0 ? incoming.session : local.session, reviews: Math.max(local.reviews ?? 0, incoming.reviews ?? 0), newCards: Math.max(local.newCards ?? 0, incoming.newCards ?? 0) };
}

const stampOf = (name: TableName, row: Row) => Number(row[STAMP[name] ?? ''] ?? 0);

/**
 * Above 0 when the incoming copy wins. Gives the same answer from either side, so two devices
 * merging each other's data always end up identical.
 */
function compareCopies(name: TableName, local: Row, incoming: Row): number {
  let order = 0;
  // a real profile beats the defaults of a device that hasn't been set up
  if (name === 'profile') order = Number(!!incoming.onboarded) - Number(!!local.onboarded);
  if (name === 'assessments') {
    // a test's timestamps don't change while it runs: the copy further along is the newer one
    const progress = (a: Row) => (a.status === 'done' ? 1_000_000 : 0) + ((a.responses as unknown[] | undefined)?.length ?? 0);
    order = progress(incoming) - progress(local);
  }
  return order || stampOf(name, incoming) - stampOf(name, local) || compareText(canonical(incoming), canonical(local));
}

/**
 * replace: wipe local data and restore the backup.
 * merge: keep both — for records present on both sides the newer one wins; daily logs are combined;
 * records deleted on the other side are deleted here too, unless they were changed afterwards.
 */
export async function importBackup(b: Backup, mode: 'replace' | 'merge'): Promise<number> {
  let written = 0;
  await db.transaction('rw', EXPORTED.map((n) => db.table(n)), async () => {
    if (mode === 'replace') {
      for (const name of EXPORTED) {
        const rows = b.tables[name] ?? [];
        await table(name).clear();
        await table(name).bulkPut(rows);
        if (name !== 'tombstones') written += rows.length;
      }
      return;
    }

    // deletions from both sides
    const deleted = new Map<string, Tombstone>((await db.tombstones.toArray()).map((d) => [d.key, d]));
    const newDeletions: Tombstone[] = [];
    for (const d of (b.tables.tombstones ?? []) as unknown as Tombstone[]) {
      const known = deleted.get(d.key);
      if (known && known.at >= d.at) continue;
      deleted.set(d.key, d);
      newDeletions.push(d);
    }
    await db.tombstones.bulkPut(newDeletions);

    for (const name of EXPORTED) {
      if (name === 'tombstones') continue;
      const rows = b.tables[name] ?? [];
      const deletedHere = [...deleted.values()].filter((d) => d.table === name);
      if (rows.length === 0 && deletedHere.length === 0) continue;

      const t = table(name);
      const key = KEY[name];
      const localRows = new Map((await t.toArray()).map((r) => [String(r[key]), r]));
      const puts: Row[] = [];
      for (const row of rows) {
        const id = String(row[key]);
        const local = localRows.get(id);
        const gone = deleted.get(`${name}:${id}`);
        if (gone && stampOf(name, row) <= gone.at) continue;
        let next: Row | undefined;
        if (!local) next = row;
        else if (name === 'days') next = mergeDay(local as unknown as DayLog, row as unknown as DayLog) as unknown as Row;
        else if (compareCopies(name, local, row) > 0) next = row;
        if (next && (!local || canonical(next) !== canonical(local))) {
          puts.push(next);
          localRows.set(id, next);
        }
      }
      const removals = deletedHere.filter((d) => {
        const local = localRows.get(d.id);
        return local && stampOf(name, local) <= d.at;
      }).map((d) => d.id);
      await t.bulkPut(puts);
      await t.bulkDelete(removals);
      written += puts.length + removals.length;
    }
  });
  return written;
}

/** Empties everything sync manages, keeping device-only data (drafts, AI cache). */
export async function clearSyncedData(): Promise<void> {
  await db.transaction('rw', SYNCED_TABLES.map((n) => db.table(n)), async () => {
    for (const name of SYNCED_TABLES) await db.table(name).clear();
  });
}

/** Deletes every record on this device (after a confirmation in the UI). */
export async function deleteAllData(): Promise<void> {
  await db.transaction('rw', TABLE_NAMES.map((n) => db.table(n)), async () => {
    for (const name of TABLE_NAMES) await db.table(name).clear();
  });
}
