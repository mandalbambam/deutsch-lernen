'use client';

import { db } from '@/lib/db';
import { getProfile } from '@/lib/db/profile';
import type { Skill, SkillState, WeeklyPlan } from '@/lib/db/types';
import { thetaLevel } from '@/lib/placement/engine';
import { adjustPlan, buildPlan, practiceUpdates, type PlanContext } from './plan';

const WEEK = 7 * 86_400_000;

export async function loadPlanContext(now = Date.now()): Promise<PlanContext> {
  const since = now - WEEK;
  const [profile, states, mistakes, topicProgress, attempts, reviews, days] = await Promise.all([
    getProfile(),
    db.skillState.toArray(),
    db.mistakes.toArray(),
    db.topicProgress.toArray(),
    db.attempts.where('at').above(since).toArray(),
    db.reviews.where('at').above(since).toArray(),
    db.days.toArray(),
  ]);
  const recentDays = days.filter((d) => new Date(`${d.date}T12:00:00`).getTime() > since);
  const avgReviewsPerDay = recentDays.length ? recentDays.reduce((s, d) => s + d.reviews, 0) / 7 : 0;
  return {
    profile,
    skills: Object.fromEntries(states.map((s) => [s.skill, s])) as Partial<Record<Skill, SkillState>>,
    mistakes,
    topicProgress,
    attempts,
    reviews,
    avgReviewsPerDay,
    now,
  };
}

export async function latestPlan(): Promise<WeeklyPlan | undefined> {
  const plans = await db.plans.toArray();
  return plans.sort((a, b) => b.createdAt - a.createdAt)[0];
}

/**
 * Returns the current plan, creating it after the placement test and re-adjusting it once a
 * week. `adjusted` is true when a weekly adjustment just happened.
 */
export async function ensurePlan(now = Date.now()): Promise<{ plan?: WeeklyPlan; adjusted: boolean }> {
  const ctx = await loadPlanContext(now);
  if (!ctx.skills.grammar && !ctx.skills.vocabulary) return { adjusted: false };
  const prev = await latestPlan();
  if (!prev) {
    const plan = buildPlan(ctx);
    await db.plans.put(plan);
    return { plan, adjusted: false };
  }
  if (now - prev.createdAt < WEEK) return { plan: prev, adjusted: false };

  // a week has passed: fold practice results into the skill estimates, then re-plan
  const updates = practiceUpdates(ctx);
  const states: SkillState[] = [];
  for (const [skill, theta] of Object.entries(updates)) {
    const cur = ctx.skills[skill as Skill];
    if (!cur || theta === undefined || Math.abs(theta - cur.theta) < 0.01) continue;
    states.push({ ...cur, theta, level: thetaLevel(theta), updatedAt: now, source: 'practice' });
  }
  if (states.length) await db.skillState.bulkPut(states);
  const fresh = await loadPlanContext(now);
  const plan = adjustPlan(prev, fresh);
  await db.plans.put(plan);
  return { plan, adjusted: true };
}

/** Re-creates the plan immediately (e.g. after changing daily time or goals). */
export async function rebuildPlan(now = Date.now()): Promise<WeeklyPlan | undefined> {
  const ctx = await loadPlanContext(now);
  if (!ctx.skills.grammar && !ctx.skills.vocabulary) return undefined;
  const prev = await latestPlan();
  const plan = buildPlan(ctx);
  if (prev) {
    // keep difficulty targets that were already adjusted from practice
    plan.targets = { ...plan.targets, ...prev.targets };
    plan.notes = ['Plan updated after you changed your preferences.'];
    if (prev.weekStart === plan.weekStart) await db.plans.delete(prev.weekStart);
  }
  await db.plans.put(plan);
  return plan;
}
