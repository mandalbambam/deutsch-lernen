/** Turns AI-generated grammar items into exercises, dropping any that are malformed or contradict themselves. */
import { LESSON_BY_ID } from '@/content/grammar';
import type { AiOutput } from '@/lib/ai/schemas';
import { hashString } from '@/lib/random';
import { checkAnswer, checkChoice } from './check';
import type { Exercise } from './types';

type AiItem = AiOutput<'grammar-exercises'>['exercises'][number];

export function mainTag(topicId: string): Exercise['tag'] {
  const counts = new Map<string, number>();
  for (const e of LESSON_BY_ID[topicId]?.exercises ?? []) if (e.tag) counts.set(e.tag, (counts.get(e.tag) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] as Exercise['tag'];
}

/** Turns one model item into an exercise, or drops it if it is malformed or contradicts itself. */
export function toExercise(item: AiItem, topicId: string, tag?: Exercise['tag']): Exercise | null {
  const prompt = item.prompt.trim();
  const answers = [...new Set(item.answers.map((a) => a.trim()).filter(Boolean))];
  if (!answers.length) return null;
  const id = `ai:${topicId}:${hashString(prompt).toString(36)}`;
  const instruction = item.instruction?.trim();
  const base = { id, explain: item.explain.trim(), tag, ...(instruction && item.kind !== 'transform' ? { heading: instruction } : {}) };
  let ex: Exercise;
  if (item.kind === 'transform') {
    if (!instruction) return null;
    ex = { ...base, kind: 'transform', instruction, source: prompt, answers };
  } else {
    if (prompt.split('___').length !== 2) return null;
    if (answers.some((a) => a.includes('___'))) return null;
    if (item.kind === 'fill') {
      ex = { ...base, kind: 'fill', prompt, answers };
    } else {
      const lower = new Set(answers.map((a) => a.toLowerCase()));
      const wrong = [...new Set(item.distractors.map((d) => d.trim()).filter((d) => d && !lower.has(d.toLowerCase())))];
      if (wrong.length < 2) return null;
      ex = { ...base, kind: 'choice', prompt, options: [answers[0], ...wrong.slice(0, 3)] };
      if (new Set(ex.options.map((o) => o.toLowerCase())).size !== ex.options.length) return null;
      return checkChoice(ex, 0).verdict === 'correct' ? ex : null;
    }
  }
  return checkAnswer(ex, answers[0]).verdict === 'correct' ? ex : null;
}
