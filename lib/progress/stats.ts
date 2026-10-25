'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { LEVELS, type Level } from '@/lib/cefr';
import { TOPICS } from '@/content/grammar';
import { computeStreak, dayCounts, totalSeconds } from '@/lib/activity';
import { db, today } from '@/lib/db';
import type { Assessment, DayLog, MistakeStat, Module, SkillState } from '@/lib/db/types';
import { isMastered } from '@/lib/grammar/progress';

const DAY = 86_400_000;
/** a level check is suggested this long after the last test */
export const LEVEL_CHECK_INTERVAL_DAYS = 21;

export interface ProgressStats {
  skills: Partial<Record<string, SkillState>>;
  streak: number;
  daysActive: number;
  /** minutes per day, oldest first (14 days) */
  minutesByDay: { date: string; minutes: number }[];
  /** seconds per module over the last 7 days */
  weekByModule: Partial<Record<Module, number>>;
  totalMinutes: number;
  cards: { total: number; learned: number; learning: number; fresh: number };
  /** reviews due per day for the next 14 days (index 0 = today, includes overdue) */
  forecast: number[];
  /** the dates of the forecast days (YYYY-MM-DD) */
  forecastDates: string[];
  mistakes: MistakeStat[];
  grammar: { mastered: number; started: number; byLevel: Record<Level, { mastered: number; total: number }> };
  texts: { reading: number; listening: number };
  writings: number;
  conversations: number;
  assessments: Assessment[];
  levelCheck: { due: boolean; daysSince?: number; hasPlacement: boolean };
}

export function levelCheckStatus(assessments: Assessment[], now = Date.now()): ProgressStats['levelCheck'] {
  const done = assessments.filter((a) => a.status === 'done');
  const hasPlacement = done.some((a) => a.kind === 'placement');
  if (!done.length) return { due: false, hasPlacement };
  const last = Math.max(...done.map((a) => a.takenAt));
  const daysSince = Math.floor((now - last) / DAY);
  return { due: hasPlacement && daysSince >= LEVEL_CHECK_INTERVAL_DAYS, daysSince, hasPlacement };
}

function lastDates(n: number, now = new Date()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    out.push(today(d));
  }
  return out;
}

export function useProgressStats(): ProgressStats | undefined {
  return useLiveQuery(async () => {
    const now = Date.now();
    const [skillStates, days, cards, mistakes, topics, texts, writings, conversations, assessments] = await Promise.all([
      db.skillState.toArray(),
      db.days.toArray(),
      db.cards.toArray(),
      db.mistakes.toArray(),
      db.topicProgress.toArray(),
      db.textProgress.toArray(),
      db.writings.count(),
      db.conversations.count(),
      db.assessments.where('status').equals('done').sortBy('takenAt'),
    ]);
    const byDate = new Map<string, DayLog>(days.map((d) => [d.date, d]));
    const minutesByDay = lastDates(14).map((date) => ({ date, minutes: Math.round(totalSeconds(byDate.get(date)) / 60) }));
    const weekByModule: Partial<Record<Module, number>> = {};
    for (const date of lastDates(7)) {
      for (const [m, s] of Object.entries(byDate.get(date)?.seconds ?? {})) weekByModule[m as Module] = (weekByModule[m as Module] ?? 0) + (s ?? 0);
    }

    const active = cards.filter((c) => !c.suspended && !c.known);
    const learned = cards.filter((c) => c.known || (c.state === 2 && c.scheduledDays >= 21)).length;
    const fresh = active.filter((c) => c.state === 0).length;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const forecast = Array.from({ length: 14 }, () => 0);
    for (const c of active) {
      if (c.state === 0) continue;
      const idx = Math.max(0, Math.floor((c.due - startOfToday.getTime()) / DAY));
      if (idx < 14) forecast[idx]++;
    }

    const byLevel = Object.fromEntries(LEVELS.map((l) => [l, { mastered: 0, total: 0 }])) as Record<Level, { mastered: number; total: number }>;
    const progress = new Map(topics.map((t) => [t.topicId, t]));
    for (const t of TOPICS) {
      byLevel[t.level].total++;
      if (isMastered(progress.get(t.id))) byLevel[t.level].mastered++;
    }

    return {
      skills: Object.fromEntries(skillStates.map((s) => [s.skill, s])),
      streak: computeStreak(days),
      daysActive: days.filter((d) => dayCounts(d) || totalSeconds(d) >= 60).length,
      minutesByDay,
      weekByModule,
      totalMinutes: Math.round(days.reduce((sum, d) => sum + totalSeconds(d), 0) / 60),
      cards: { total: cards.length, learned, learning: active.filter((c) => c.state !== 0 && !(c.state === 2 && c.scheduledDays >= 21)).length, fresh },
      forecast,
      forecastDates: Array.from({ length: 14 }, (_, i) => today(new Date(startOfToday.getTime() + i * DAY + 12 * 3_600_000))),
      mistakes: mistakes.sort((a, b) => b.count - a.count || b.lastAt - a.lastAt).slice(0, 8),
      grammar: { mastered: topics.filter(isMastered).length, started: topics.filter((t) => t.attempts > 0).length, byLevel },
      texts: { reading: texts.filter((t) => t.kind === 'reading' && t.completedAt).length, listening: texts.filter((t) => t.kind === 'listening' && t.completedAt).length },
      writings,
      conversations,
      assessments,
      levelCheck: levelCheckStatus(assessments, now),
    };
  }, []);
}
