'use client';

import type { Level } from '@/lib/cefr';
import { db, uid } from '@/lib/db';
import { logMistakes, type MistakeExample } from '@/lib/db/mistakes';
import type { Attempt, Module, Skill } from '@/lib/db/types';

export interface AttemptInput {
  module: Module;
  skill: Skill;
  itemId: string;
  level?: Level;
  correct: boolean;
  score?: number;
  errorTags?: string[];
  ms?: number;
  topicId?: string;
  mistake?: MistakeExample;
}

/** Stores an exercise answer, updates topic mastery and the error profile. */
export async function recordAttempt(input: AttemptInput): Promise<void> {
  const attempt: Attempt = {
    id: uid(),
    at: Date.now(),
    module: input.module,
    skill: input.skill,
    itemId: input.itemId,
    level: input.level,
    correct: input.correct,
    score: input.score,
    errorTags: input.errorTags ?? [],
    ms: input.ms,
  };
  await db.attempts.put(attempt);
  if (input.topicId) await updateTopic(input.topicId, input.score ?? (input.correct ? 1 : 0));
  if (!input.correct && attempt.errorTags.length) {
    await logMistakes(
      attempt.errorTags.map((tag) => ({ tag, example: input.mistake })),
      input.module,
    );
  }
}

/** Mastery is an exponentially weighted accuracy (recent answers count more). */
export async function updateTopic(topicId: string, score: number, seenExplanation?: boolean): Promise<void> {
  await db.transaction('rw', db.topicProgress, async () => {
    const cur = (await db.topicProgress.get(topicId)) ?? { topicId, attempts: 0, correct: 0, mastery: 0, seenExplanation: false, lastAt: 0 };
    const alpha = cur.attempts < 4 ? 0.4 : 0.2;
    await db.topicProgress.put({
      ...cur,
      attempts: cur.attempts + 1,
      correct: cur.correct + score,
      mastery: cur.attempts === 0 ? score * 0.6 : cur.mastery * (1 - alpha) + score * alpha,
      seenExplanation: seenExplanation ?? cur.seenExplanation,
      lastAt: Date.now(),
    });
  });
}

export async function markExplanationSeen(topicId: string): Promise<void> {
  await db.transaction('rw', db.topicProgress, async () => {
    const cur = await db.topicProgress.get(topicId);
    if (cur) await db.topicProgress.put({ ...cur, seenExplanation: true });
    else await db.topicProgress.put({ topicId, attempts: 0, correct: 0, mastery: 0, seenExplanation: true, lastAt: Date.now() });
  });
}
