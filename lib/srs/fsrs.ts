import { createEmptyCard, fsrs, Rating, type Card as FsrsCard, type Grade, type FSRS } from 'ts-fsrs';
import type { CardSchedule } from '@/lib/db/types';

export { Rating };
export type ReviewRating = 1 | 2 | 3 | 4;

const schedulers = new Map<number, FSRS>();

/** FSRS scheduler for a desired retention (cached). */
export function scheduler(retention = 0.9): FSRS {
  const key = Math.round(retention * 100);
  let s = schedulers.get(key);
  if (!s) {
    s = fsrs({ request_retention: key / 100, enable_fuzz: true, enable_short_term: true, maximum_interval: 3650 });
    schedulers.set(key, s);
  }
  return s;
}

export function toFsrs(c: CardSchedule): FsrsCard {
  return {
    due: new Date(c.due),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsedDays,
    scheduled_days: c.scheduledDays,
    learning_steps: c.learningSteps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    last_review: c.lastReview ? new Date(c.lastReview) : undefined,
  };
}

export function fromFsrs(c: FsrsCard): CardSchedule {
  return {
    due: c.due.getTime(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsedDays: c.elapsed_days,
    scheduledDays: c.scheduled_days,
    learningSteps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state as CardSchedule['state'],
    lastReview: c.last_review?.getTime(),
  };
}

export function emptySchedule(now = new Date()): CardSchedule {
  return fromFsrs(createEmptyCard(now));
}

export function schedule(c: CardSchedule, rating: ReviewRating, now = new Date(), retention = 0.9) {
  const { card, log } = scheduler(retention).next(toFsrs(c), now, rating as Grade);
  return { schedule: fromFsrs(card), log };
}

/** Next due time per rating, for the button labels. */
export function previewDue(c: CardSchedule, now = new Date(), retention = 0.9): Record<ReviewRating, number> {
  const p = scheduler(retention).repeat(toFsrs(c), now);
  return {
    1: p[Rating.Again].card.due.getTime(),
    2: p[Rating.Hard].card.due.getTime(),
    3: p[Rating.Good].card.due.getTime(),
    4: p[Rating.Easy].card.due.getTime(),
  };
}

/** "10m", "3d", "2mo" … */
export function formatInterval(ms: number): string {
  const min = Math.max(1, Math.round(ms / 60000));
  if (min < 60) return `${min}m`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 31) return `${d}d`;
  const mo = Math.round(d / 30.4);
  if (mo < 12) return `${mo}mo`;
  return `${(d / 365).toFixed(1)}y`;
}

/** Probability of recall right now (0..1). */
export function retrievability(c: CardSchedule, now = new Date(), retention = 0.9): number {
  if (c.state === 0) return 0;
  return scheduler(retention).get_retrievability(toFsrs(c), now, false);
}
