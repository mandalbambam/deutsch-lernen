'use client';

import { useEffect } from 'react';
import { db, today } from '@/lib/db';
import type { DayLog, Module } from '@/lib/db/types';

export function emptyDay(date: string): DayLog {
  return { date, seconds: {}, reviews: 0, newCards: 0 };
}

export async function getDay(date = today()): Promise<DayLog> {
  return (await db.days.get(date)) ?? emptyDay(date);
}

export async function updateDay(fn: (d: DayLog) => void, date = today()): Promise<void> {
  await db.transaction('rw', db.days, async () => {
    const d = (await db.days.get(date)) ?? emptyDay(date);
    fn(d);
    await db.days.put(d);
  });
}

export async function addSeconds(module: Module, seconds: number): Promise<void> {
  if (seconds <= 0) return;
  await updateDay((d) => {
    d.seconds[module] = (d.seconds[module] ?? 0) + seconds;
  });
}

export function totalSeconds(d: DayLog | undefined): number {
  if (!d) return 0;
  return Object.values(d.seconds).reduce((a, b) => a + (b ?? 0), 0);
}

/** A day counts for the streak with ≥ 5 minutes of practice or a completed daily session. */
export function dayCounts(d: DayLog | undefined): boolean {
  return !!d && (totalSeconds(d) >= 300 || !!d.session?.completedAt);
}

/** Consecutive counted days ending today (or yesterday, if today has not counted yet). */
export function computeStreak(days: DayLog[], now = new Date()): number {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const cursor = new Date(now);
  if (!dayCounts(byDate.get(today(cursor)))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (dayCounts(byDate.get(today(cursor)))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/**
 * Counts active study time for a module: ticks every 15 s while the page is visible and the
 * learner interacted within the last 90 s. Stops when the component unmounts or is hidden.
 */
export function useActivityTimer(module: Module, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    let lastInput = Date.now();
    const mark = () => {
      lastInput = Date.now();
    };
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastInput < 90_000) addSeconds(module, 15);
    }, 15_000);
    return () => {
      window.clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, mark));
    };
  }, [module, enabled]);
}
