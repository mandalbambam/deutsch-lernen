import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { deleteAllData, exportData, importBackup, parseBackup } from '@/lib/backup';
import { db } from '@/lib/db';
import type { Card, DayLog } from '@/lib/db/types';
import { cardFromDeck } from '@/lib/srs/cards';

function card(word: string, updatedAt: number): Card {
  return { ...cardFromDeck({ w: word, p: 'noun', g: 'm', d: ['x'], r: 1, l: 'A1' }, updatedAt), updatedAt };
}

const day = (date: string, seconds: DayLog['seconds'], reviews = 0): DayLog => ({ date, seconds, reviews, newCards: 0 });

beforeEach(async () => {
  await deleteAllData();
});

describe('backup', () => {
  it('round-trips all data through export and replace-import', async () => {
    await db.cards.bulkPut([card('Tisch', 1000), card('Stuhl', 2000)]);
    await db.days.put(day('2026-10-01', { cards: 600 }, 12));
    await db.mistakes.put({ tag: 'gender', count: 3, firstAt: 1, lastAt: 2, examples: [] });
    const backup = parseBackup(JSON.stringify(await exportData()));
    await deleteAllData();
    expect(await db.cards.count()).toBe(0);
    await importBackup(backup, 'replace');
    expect((await db.cards.toArray()).map((c) => c.word).sort()).toEqual(['Stuhl', 'Tisch']);
    expect((await db.days.get('2026-10-01'))?.reviews).toBe(12);
    expect((await db.mistakes.get('gender'))?.count).toBe(3);
  });

  it('merges: newer records win, study days are combined', async () => {
    await db.cards.bulkPut([card('Tisch', 5000), card('Lampe', 1000)]);
    await db.days.put(day('2026-10-02', { cards: 300, grammar: 100 }, 5));
    const other = await exportData();
    other.tables.cards = [
      { ...card('Tisch', 1000), stability: 99 },
      { ...card('Lampe', 9000), stability: 42 },
      card('Fenster', 3000),
    ] as unknown as Record<string, unknown>[];
    other.tables.days = [day('2026-10-02', { cards: 100, reading: 400 }, 9)] as unknown as Record<string, unknown>[];
    await importBackup(parseBackup(JSON.stringify(other)), 'merge');
    expect((await db.cards.get('v:Tisch|noun'))?.stability).not.toBe(99); // local copy is newer
    expect((await db.cards.get('v:Lampe|noun'))?.stability).toBe(42); // incoming copy is newer
    expect(await db.cards.get('v:Fenster|noun')).toBeDefined();
    const d = await db.days.get('2026-10-02');
    expect(d?.seconds).toEqual({ cards: 300, grammar: 100, reading: 400 });
    expect(d?.reviews).toBe(9);
  });

  it('rejects files that are not backups', () => {
    expect(() => parseBackup('not json')).toThrow(/JSON/);
    expect(() => parseBackup(JSON.stringify({ app: 'other', version: 1 }))).toThrow(/not a Deutsch Lernen backup/);
    expect(() => parseBackup(JSON.stringify({ app: 'deutsch-lernen', version: 1, exportedAt: 'x', tables: { cards: [{ word: 'no id' }] } }))).toThrow(/damaged/);
  });
});
