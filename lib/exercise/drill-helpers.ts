/** Shared building blocks for the generated drills (exercise constructors, random context, item pools). */
import type { BankItem } from '@/content/grammar/drill-items';
import type { VerbTable } from '@/lib/data/types';
import { shuffled } from '@/lib/random';
import type { ChoiceExercise, CorrectExercise, Exercise, FillExercise, OrderExercise, TransformExercise } from './types';

export type Tag = Exercise['tag'];
export type Case = 'nom' | 'acc' | 'dat' | 'gen';
export interface Ctx {
  rand: () => number;
  pick: <T>(arr: readonly T[]) => T;
  chance: (p: number) => boolean;
  verbs: VerbTable[];
}
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
export const uniq = (a: string[]) => [...new Set(a)];
export function choice(id: string, prompt: string, correct: string, wrong: string[], explain: string, tag: Tag, rand: () => number, accepted: string[] = []): ChoiceExercise {
  const block = new Set([correct, ...accepted].map((x) => x.toLowerCase()));
  const others = shuffled(uniq(wrong).filter((w) => !block.has(w.toLowerCase())), rand).slice(0, 3);
  return { id, kind: 'choice', prompt, options: [correct, ...others], explain, tag };
}
export const fill = (id: string, prompt: string, answers: string[], explain: string, tag: Tag, hint?: string, feedback?: Record<string, string>): FillExercise => ({
  id,
  kind: 'fill',
  prompt,
  answers: uniq(answers),
  explain,
  tag,
  hint,
  feedback,
});
export const transform = (id: string, instruction: string, source: string, answers: string[], explain: string, tag: Tag, feedback?: [string, string][]): TransformExercise => ({
  id,
  kind: 'transform',
  instruction,
  source,
  answers: uniq(answers),
  explain,
  tag,
  feedback,
});
export const order = (id: string, words: string[], explain: string, tag: Tag, answers?: string[]): OrderExercise => ({ id, kind: 'order', words, explain, tag, answers });
export const correct = (id: string, sentence: string, answers: string[], explain: string, tag: Tag): CorrectExercise => ({ id, kind: 'correct', sentence, answers, explain, tag });
/** One exercise from a hand-written pool: gap-fill (if allowed and single gap) or multiple choice. */
export function fromBank(kind: string, items: BankItem[], tag: Tag, c: Ctx, allowFill: boolean, defaultWrong: string[] = []): Exercise {
  const idx = Math.floor(c.rand() * items.length);
  const [prompt, ans, wrong, explain] = items[idx];
  const answers = Array.isArray(ans) ? ans : [ans];
  const gaps = prompt.split('___').length - 1;
  if (allowFill && gaps === 1 && c.chance(0.5)) return fill(`drill:${kind}:${idx}:f`, prompt, answers, explain, tag);
  return choice(`drill:${kind}:${idx}:c`, prompt, answers[0], wrong.length ? wrong : defaultWrong, explain, tag, c.rand, answers);
}
