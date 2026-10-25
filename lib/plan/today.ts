'use client';

import { getDay } from '@/lib/activity';
import { db, today } from '@/lib/db';
import { getProfile } from '@/lib/db/profile';
import type { DayLog, SessionBlock, Skill, SkillState } from '@/lib/db/types';
import { recognitionSupported } from '@/lib/speech/stt';
import { voicesReady } from '@/lib/speech/tts';
import { buildSessionBlocks } from './session';
import { ensurePlan } from './store';

/** Returns today's session, creating it from the current plan if needed. */
export async function ensureTodaySession(): Promise<{ day: DayLog; adjustedNotes?: string[] } | null> {
  const { plan, adjusted } = await ensurePlan();
  if (!plan) return null;
  const date = today();
  const day = await getDay(date);
  if (day.session) return { day };

  const [profile, states, progress, voices] = await Promise.all([
    getProfile(),
    db.skillState.toArray(),
    db.topicProgress.toArray(),
    voicesReady(),
  ]);
  const recent = new Map(progress.map((p) => [p.topicId, p.lastAt]));
  const twoDays = Date.now() - 2 * 86_400_000;
  const grammarTopic = plan.topicQueue.find((t) => (recent.get(t) ?? 0) < twoDays) ?? plan.topicQueue[0];
  const blocks: SessionBlock[] = buildSessionBlocks({
    plan,
    profile,
    skills: Object.fromEntries(states.map((s) => [s.skill, s])) as Partial<Record<Skill, SkillState>>,
    date,
    grammarTopic,
    ttsAvailable: voices.length > 0,
    sttAvailable: recognitionSupported(),
  });
  const next: DayLog = { ...day, session: { blocks, createdAt: Date.now() } };
  await db.days.put(next);
  return { day: next, adjustedNotes: adjusted ? plan.notes : undefined };
}

export async function completeBlock(index: number, result: SessionBlock['result']): Promise<void> {
  const date = today();
  await db.transaction('rw', db.days, async () => {
    const day = await db.days.get(date);
    if (!day?.session) return;
    const blocks = day.session.blocks.map((b, i) => (i === index ? { ...b, done: true, doneAt: Date.now(), result } : b));
    const completedAt = blocks.every((b) => b.done) ? (day.session.completedAt ?? Date.now()) : undefined;
    await db.days.put({ ...day, session: { ...day.session, blocks, completedAt } });
  });
}
