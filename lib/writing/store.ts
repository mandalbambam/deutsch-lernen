'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { ERROR_TAGS } from '@/content/error-tags';
import type { AiOutput } from '@/lib/ai/schemas';
import { levelFromTheta, levelNumber, type Level } from '@/lib/cefr';
import { db, uid } from '@/lib/db';
import { logMistakes } from '@/lib/db/mistakes';
import type { Writing } from '@/lib/db/types';

export type WritingFeedback = AiOutput<'writing-feedback'>;

export async function loadDraft(taskId: string): Promise<string> {
  const d = await db.meta.get(`draft:${taskId}`);
  return typeof d?.value === 'string' ? d.value : '';
}

export async function saveDraft(taskId: string, text: string): Promise<void> {
  if (text.trim()) await db.meta.put({ key: `draft:${taskId}`, value: text });
  else await db.meta.delete(`draft:${taskId}`);
}

export async function saveWriting(w: Omit<Writing, 'id' | 'at'>): Promise<Writing> {
  const writing: Writing = { ...w, id: uid(), at: Date.now() };
  await db.writings.put(writing);
  if (w.taskId) await db.meta.delete(`draft:${w.taskId}`);
  return writing;
}

export function useWritings(taskId?: string): Writing[] | undefined {
  return useLiveQuery(async () => {
    const all = await db.writings.orderBy('at').reverse().toArray();
    return taskId ? all.filter((w) => w.taskId === taskId) : all;
  }, [taskId]);
}

/** Feeds AI-found mistakes into the error profile (known tags only). */
export async function logFeedbackMistakes(errors: { original: string; correction: string; explanation: string; tag: string }[], context?: string): Promise<void> {
  const entries = errors
    .filter((e) => e.tag in ERROR_TAGS && e.original.trim() !== e.correction.trim())
    .map((e) => ({ tag: e.tag, example: { wrong: e.original, right: e.correction, context: context ?? e.explanation } }));
  await logMistakes(entries, 'writing');
}

/** Moves the writing-skill estimate towards an AI-assessed level (practice evidence counts less than a test). */
export async function updateWritingSkill(level: Level, weight = 0.3, source: 'practice' | 'placement' = 'practice'): Promise<void> {
  const target = levelNumber(level);
  await db.transaction('rw', db.skillState, async () => {
    const cur = await db.skillState.get('writing');
    const theta = cur ? cur.theta * (1 - weight) + target * weight : target;
    await db.skillState.put({ skill: 'writing', theta, se: cur ? Math.max(0.35, cur.se * 0.9) : 0.8, level: levelFromTheta(theta), updatedAt: Date.now(), source });
  });
}

export function wordCountOf(text: string): number {
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}
