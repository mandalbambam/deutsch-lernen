import type { Exercise, GrammarLesson } from '@/lib/exercise/types';
import { A1_LESSONS } from './a1';
import { A2_LESSONS } from './a2';
import { B1_LESSONS } from './b1';
import { B2_LESSONS } from './b2';
import { C1_LESSONS } from './c1';
import { C2_LESSONS } from './c2';
import { EXTRA_DRILLS, EXTRA_EXERCISES } from './extra';

export { TOPICS, TOPIC_BY_ID, type TopicMeta } from './catalog';

const withExtra = (l: GrammarLesson): GrammarLesson => {
  const extra: Exercise[] = EXTRA_EXERCISES[l.id] ?? [];
  const drills = [...new Set([...(l.drills ?? []), ...(EXTRA_DRILLS[l.id] ?? [])])];
  return { ...l, exercises: [...l.exercises, ...extra], drills: drills.length ? drills : undefined };
};

export const LESSONS: GrammarLesson[] = [...A1_LESSONS, ...A2_LESSONS, ...B1_LESSONS, ...B2_LESSONS, ...C1_LESSONS, ...C2_LESSONS].map(withExtra);

export const LESSON_BY_ID: Record<string, GrammarLesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
