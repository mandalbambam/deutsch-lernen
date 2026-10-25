'use client';

import { getDay } from '@/lib/activity';
import { type Level } from '@/lib/cefr';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/db/profile';
import { thetaLevel } from '@/lib/placement/engine';
import { latestPlan } from '@/lib/plan/store';
import { buildQueue, type QueueInfo } from './cards';

/** Where new words start: the vocabulary level, or one below when in its lower third. */
export async function newCardStartLevel(): Promise<Level> {
  const vocab = await db.skillState.get('vocabulary');
  if (!vocab) return 'A1';
  return thetaLevel(vocab.theta - 0.35);
}

export interface DailyAllowance {
  newLeft: number;
  reviewsLeft: number;
  newPerDay: number;
}

export async function dailyAllowance(): Promise<DailyAllowance> {
  const [profile, plan, day] = await Promise.all([getProfile(), latestPlan(), getDay()]);
  const newPerDay = Math.min(plan?.newCardsPerDay ?? profile.srs.maxNewPerDay, profile.srs.maxNewPerDay);
  return {
    newPerDay,
    newLeft: Math.max(0, newPerDay - day.newCards),
    reviewsLeft: Math.max(0, profile.srs.maxReviewsPerDay - day.reviews),
  };
}

/** Today's queue respecting the daily new-card and review limits. */
export async function todaysQueue(): Promise<QueueInfo> {
  const [allow, startLevel] = await Promise.all([dailyAllowance(), newCardStartLevel()]);
  return buildQueue({ newLimit: allow.newLeft, reviewLimit: allow.reviewsLeft, startLevel });
}
