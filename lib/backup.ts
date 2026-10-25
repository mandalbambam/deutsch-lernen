'use client';

/**
 * Export / import of all learning data as one JSON file (backup, or moving between laptop and phone).
 */
import type { Table } from 'dexie';
import { z } from 'zod';
import { db, TABLE_NAMES } from '@/lib/db';
import type { DayLog, Profile } from '@/lib/db/types';

export const BACKUP_VERSION = 1;
/** caches are not worth exporting */
const EXPORTED = TABLE_NAMES.filter((t) => t !== 'aiCache');
type TableName = (typeof EXPORTED)[number];

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
};

/** timestamp used to decide which copy of a record is newer when merging */
const STAMP: Partial<Record<TableName, string>> = {
  assessments: 'takenAt',
  skillState: 'updatedAt',
  cards: 'updatedAt',
  mistakes: 'lastAt',
  topicProgress: 'lastAt',
  textProgress: 'updatedAt',
  plans: 'createdAt',
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

function table(name: TableName): Table<Record<string, unknown>, string> {
  return db.table(name);
}

export async function exportData(): Promise<Backup> {
  const tables = {} as Backup['tables'];
  for (const name of EXPORTED) tables[name] = (await table(name).toArray()) as Record<string, unknown>[];
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

function mergeDay(local: DayLog, incoming: DayLog): DayLog {
  const seconds: DayLog['seconds'] = { ...local.seconds };
  for (const [m, s] of Object.entries(incoming.seconds ?? {})) seconds[m as keyof DayLog['seconds']] = Math.max(seconds[m as keyof DayLog['seconds']] ?? 0, s ?? 0);
  const doneBlocks = (d: DayLog) => d.session?.blocks.filter((b) => b.done).length ?? -1;
  const session = incoming.session?.completedAt && !local.session?.completedAt ? incoming.session : doneBlocks(incoming) > doneBlocks(local) ? incoming.session : local.session;
  return { ...local, seconds, session, reviews: Math.max(local.reviews ?? 0, incoming.reviews ?? 0), newCards: Math.max(local.newCards ?? 0, incoming.newCards ?? 0) };
}

/**
 * replace: wipe local data and restore the backup.
 * merge: keep both — for records present on both sides the newer one wins; daily logs are combined.
 */
export async function importBackup(b: Backup, mode: 'replace' | 'merge'): Promise<number> {
  let written = 0;
  await db.transaction('rw', EXPORTED.map((n) => db.table(n)), async () => {
    for (const name of EXPORTED) {
      const t = table(name);
      const rows = b.tables[name] ?? [];
      if (mode === 'replace') {
        await t.clear();
        await t.bulkPut(rows);
        written += rows.length;
        continue;
      }
      const key = KEY[name];
      const stamp = STAMP[name];
      for (const row of rows) {
        const id = row[key] as string;
        const local = await t.get(id);
        let next: Record<string, unknown> | undefined;
        if (!local) next = row;
        else if (name === 'days') next = mergeDay(local as unknown as DayLog, row as unknown as DayLog) as unknown as Record<string, unknown>;
        else if (name === 'profile') next = (local as unknown as Profile).onboarded ? undefined : row;
        else if (stamp && Number(row[stamp] ?? 0) > Number(local[stamp] ?? 0)) next = row;
        if (next) {
          await t.put(next);
          written++;
        }
      }
    }
  });
  return written;
}

/** Deletes every record on this device (after a confirmation in the UI). */
export async function deleteAllData(): Promise<void> {
  await db.transaction('rw', TABLE_NAMES.map((n) => db.table(n)), async () => {
    for (const name of TABLE_NAMES) await db.table(name).clear();
  });
}
