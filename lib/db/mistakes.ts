import { db } from './index';
import type { MistakeStat, Module } from './types';

export interface MistakeExample {
  wrong: string;
  right: string;
  context?: string;
}

/** Adds occurrences of error tags to the learner's error profile. */
export async function logMistakes(entries: { tag: string; example?: MistakeExample }[], source: Module): Promise<void> {
  if (entries.length === 0) return;
  const now = Date.now();
  await db.transaction('rw', db.mistakes, async () => {
    for (const { tag, example } of entries) {
      const cur: MistakeStat = (await db.mistakes.get(tag)) ?? { tag, count: 0, firstAt: now, lastAt: now, examples: [] };
      cur.count += 1;
      cur.lastAt = now;
      if (example) cur.examples = [{ ...example, source, at: now }, ...cur.examples].slice(0, 5);
      await db.mistakes.put(cur);
    }
  });
}
