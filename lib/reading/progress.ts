'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import type { ErrorTagId } from '@/content/error-tags';
import type { ComprehensionQ } from '@/content/reading';
import { db } from '@/lib/db';
import type { TextProgress } from '@/lib/db/types';
import type { ChoiceExercise } from '@/lib/exercise/types';
import { questionTag } from './select';

/** Comprehension questions as choice exercises (Richtig/Falsch always in that order). */
export function toExercises(questions: ComprehensionQ[], prefix: string, skill: 'reading' | 'listening'): ChoiceExercise[] {
  return questions.map((q, i) => {
    const base = { id: `${prefix}#${i}`, kind: 'choice' as const, prompt: q.q, explain: q.explain, tag: questionTag(q, skill) as ErrorTagId };
    if (q.kind === 'tf') {
      return { ...base, heading: 'Richtig oder falsch?', options: q.answer ? ['Richtig', 'Falsch'] : ['Falsch', 'Richtig'], display: q.answer ? [0, 1] : [1, 0] };
    }
    return { ...base, options: q.options };
  });
}

export async function saveTextProgress(textId: string, kind: 'reading' | 'listening', result: { correct: number; total: number }, lookups: number): Promise<void> {
  await db.transaction('rw', db.textProgress, async () => {
    const prev = await db.textProgress.get(textId);
    const score = result.total ? result.correct / result.total : 0;
    const now = Date.now();
    await db.textProgress.put({
      textId,
      kind,
      completedAt: now,
      score: Math.max(score, prev?.score ?? 0),
      lookups: (prev?.lookups ?? 0) + lookups,
      updatedAt: now,
    });
  });
}

export async function completedIds(kind: 'reading' | 'listening'): Promise<Set<string>> {
  const all = await db.textProgress.where('kind').equals(kind).toArray();
  return new Set(all.filter((p) => p.completedAt).map((p) => p.textId));
}

export function useTextProgress(kind: 'reading' | 'listening'): Map<string, TextProgress> | undefined {
  return useLiveQuery(async () => new Map((await db.textProgress.where('kind').equals(kind).toArray()).map((p) => [p.textId, p])), [kind]);
}
