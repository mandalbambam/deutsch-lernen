'use client';

import { aiRequest } from '@/lib/ai/client';
import { mainTag, toExercise } from './ai-convert';
import type { Exercise } from './types';

/** Prompts already generated per topic in this tab, so the next batch asks for different sentences. */
const seen = new Map<string, string[]>();

/** Asks the AI for a fresh batch of exercises for a B2–C2 topic (never cached). */
export async function aiExercises(topicId: string): Promise<Exercise[]> {
  const before = seen.get(topicId) ?? [];
  const out = await aiRequest('grammar-exercises', { topicId, avoid: before.slice(-40).map((p) => p.slice(0, 300)) }, { cache: false });
  const tag = mainTag(topicId);
  const exercises = out.exercises.map((e) => toExercise(e, topicId, tag)).filter((e): e is Exercise => !!e);
  const unique = exercises.filter((e, i) => exercises.findIndex((x) => x.id === e.id) === i);
  seen.set(topicId, [...before, ...unique.map((e) => (e.kind === 'transform' ? e.source : 'prompt' in e ? e.prompt : ''))]);
  return unique;
}
