'use client';

import { updateDay } from '@/lib/activity';
import { LEVELS, type Level } from '@/lib/cefr';
import { loadDeck } from '@/lib/data/load';
import type { DeckEntry } from '@/lib/data/types';
import { db, today, uid } from '@/lib/db';
import type { Card, ReviewLog } from '@/lib/db/types';
import { emptySchedule, schedule, type ReviewRating } from './fsrs';

export function deckCardId(word: string, pos: string): string {
  return `v:${word}|${pos}`;
}

export function cardFromDeck(e: DeckEntry, now = Date.now()): Card {
  return {
    id: deckCardId(e.w, e.p),
    kind: 'word',
    word: e.w,
    pos: e.p,
    gender: e.g,
    plural: e.pl,
    glosses: e.d,
    level: e.l,
    rank: e.r,
    verb: e.v,
    example: e.ex ? { tatoebaId: e.ex[0], de: e.ex[1], en: e.ex[2] } : undefined,
    source: 'deck',
    ...emptySchedule(new Date(now)),
    createdAt: now,
    updatedAt: now,
  };
}

/** Cards that can be scheduled (not suspended, not marked as known). */
function active(c: Card) {
  return !c.suspended && !c.known;
}

/** Adds up to `count` new words from the frequency decks, starting at `startLevel`. */
export async function introduceNewCards(count: number, startLevel: Level): Promise<number> {
  if (count <= 0) return 0;
  const existing = new Set(await db.cards.toCollection().primaryKeys());
  const fresh: Card[] = [];
  for (const level of LEVELS.slice(LEVELS.indexOf(startLevel))) {
    const deck = await loadDeck(level);
    for (const e of deck) {
      if (fresh.length >= count) break;
      const id = deckCardId(e.w, e.p);
      if (!existing.has(id)) {
        fresh.push(cardFromDeck(e));
        existing.add(id);
      }
    }
    if (fresh.length >= count) break;
  }
  await db.cards.bulkPut(fresh);
  return fresh.length;
}

export interface QueueInfo {
  cards: Card[];
  due: number;
  fresh: number;
}

/**
 * Today's review queue: due learning/review cards plus new cards, new ones spread evenly.
 * `newLimit` is the remaining allowance for today.
 */
export async function buildQueue(opts: { newLimit: number; reviewLimit: number; startLevel: Level; now?: number }): Promise<QueueInfo> {
  const now = opts.now ?? Date.now();
  const due = (await db.cards.where('due').belowOrEqual(now).toArray())
    .filter((c) => active(c) && c.state !== 0)
    .sort((a, b) => a.state === b.state ? a.due - b.due : a.state === 2 ? 1 : -1)
    .slice(0, Math.max(0, opts.reviewLimit));

  let pendingNew = (await db.cards.where('state').equals(0).toArray()).filter(active);
  if (pendingNew.length < opts.newLimit) {
    await introduceNewCards(opts.newLimit - pendingNew.length, opts.startLevel);
    pendingNew = (await db.cards.where('state').equals(0).toArray()).filter(active);
  }
  const fresh = pendingNew.sort((a, b) => (a.rank ?? 1e9) - (b.rank ?? 1e9) || a.createdAt - b.createdAt).slice(0, Math.max(0, opts.newLimit));

  // interleave: one new card after every few reviews
  const cards: Card[] = [];
  const gap = fresh.length ? Math.max(1, Math.floor(due.length / fresh.length)) : Infinity;
  let r = 0;
  let n = 0;
  while (r < due.length || n < fresh.length) {
    for (let k = 0; k < gap && r < due.length; k++) cards.push(due[r++]);
    if (n < fresh.length) cards.push(fresh[n++]);
    if (gap === Infinity) break;
  }
  while (r < due.length) cards.push(due[r++]);
  return { cards, due: due.length, fresh: fresh.length };
}

export interface ReviewResult {
  card: Card;
  previous: Card;
  logId: string;
}

export async function reviewCard(card: Card, rating: ReviewRating, durationMs: number, retention: number): Promise<ReviewResult> {
  const now = Date.now();
  const { schedule: next, log } = schedule(card, rating, new Date(now), retention);
  const updated: Card = { ...card, ...next, updatedAt: now };
  const entry: ReviewLog = {
    id: uid(),
    cardId: card.id,
    at: now,
    rating,
    state: log.state as ReviewLog['state'],
    elapsedDays: log.elapsed_days,
    scheduledDays: log.scheduled_days,
    durationMs: Math.min(durationMs, 120_000),
  };
  await db.transaction('rw', db.cards, db.reviews, async () => {
    await db.cards.put(updated);
    await db.reviews.put(entry);
  });
  await updateDay((d) => {
    d.reviews += 1;
    if (card.state === 0) d.newCards += 1;
  });
  return { card: updated, previous: card, logId: entry.id };
}

export async function undoReview(res: ReviewResult): Promise<void> {
  await db.transaction('rw', db.cards, db.reviews, async () => {
    await db.cards.put(res.previous);
    await db.reviews.delete(res.logId);
  });
  await updateDay((d) => {
    d.reviews = Math.max(0, d.reviews - 1);
    if (res.previous.state === 0) d.newCards = Math.max(0, d.newCards - 1);
  });
}

/** "I already know this word": long interval, out of the daily queue. */
export async function markKnown(card: Card): Promise<Card> {
  const now = Date.now();
  const updated: Card = {
    ...card,
    known: true,
    state: 2,
    stability: Math.max(card.stability, 365),
    difficulty: card.difficulty || 3,
    reps: Math.max(1, card.reps),
    scheduledDays: 365,
    due: now + 365 * 86_400_000,
    lastReview: now,
    updatedAt: now,
  };
  await db.cards.put(updated);
  return updated;
}

export async function setSuspended(card: Card, suspended: boolean): Promise<void> {
  await db.cards.update(card.id, { suspended, updatedAt: Date.now() });
}

export async function resetCard(card: Card): Promise<void> {
  await db.cards.put({ ...card, ...emptySchedule(), known: false, suspended: false, updatedAt: Date.now() });
}

/** Adds a word (from reading, a mistake or manually); keeps an existing card's progress. */
export async function addCard(input: Omit<Card, keyof ReturnType<typeof emptySchedule> | 'createdAt' | 'updatedAt' | 'id'> & { id?: string }): Promise<{ card: Card; created: boolean }> {
  const id = input.id ?? (input.pos ? deckCardId(input.word, input.pos) : `c:${uid()}`);
  const existing = await db.cards.get(id);
  if (existing) {
    if (existing.known || existing.suspended) {
      await db.cards.update(id, { known: false, suspended: false, updatedAt: Date.now() });
    }
    return { card: existing, created: false };
  }
  const now = Date.now();
  const card: Card = { ...input, id, ...emptySchedule(new Date(now)), createdAt: now, updatedAt: now };
  await db.cards.put(card);
  return { card, created: true };
}

export async function countDue(now = Date.now()): Promise<number> {
  const due = await db.cards.where('due').belowOrEqual(now).toArray();
  return due.filter((c) => active(c) && c.state !== 0).length;
}

export { today };
