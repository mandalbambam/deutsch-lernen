'use client';

import { LEVELS, type Level } from '@/lib/cefr';
import { hashString, mulberry32, shuffled } from '@/lib/random';
import { tokenize } from '@/lib/text/tokenize';
import { loadSentences } from './load';
import type { SentenceRow } from './types';

export interface Sentence {
  id: number;
  de: string;
  en: string;
  clozeIdx: number;
  clozeLemma: string;
  flags: number;
  level: Level;
}

export function toSentence(row: SentenceRow, level: Level): Sentence {
  return { id: row[0], de: row[1], en: row[2], clozeIdx: row[3], clozeLemma: row[4], flags: row[5], level };
}

export function wordCount(s: string): number {
  return tokenize(s).filter((t) => t.word).length;
}

/**
 * Picks `n` sentences of a level (deterministic for a given seed), optionally filtered.
 * Falls back to the neighbouring lower level if there are not enough.
 */
export async function pickSentences(
  level: Level,
  n: number,
  opts: { seed: string; minWords?: number; maxWords?: number; needCloze?: boolean; exclude?: Set<number> },
): Promise<Sentence[]> {
  const out: Sentence[] = [];
  const levels = [level, ...LEVELS.slice(0, LEVELS.indexOf(level)).reverse()];
  for (const lvl of levels) {
    const rows = await loadSentences(lvl);
    const pool = rows.filter((r) => {
      const wc = wordCount(r[1]);
      if (opts.minWords && wc < opts.minWords) return false;
      if (opts.maxWords && wc > opts.maxWords) return false;
      if (opts.needCloze && r[3] < 0) return false;
      if (opts.exclude?.has(r[0])) return false;
      return true;
    });
    const rand = mulberry32(hashString(`${opts.seed}|${lvl}`));
    for (const r of shuffled(pool, rand)) {
      if (out.length >= n) break;
      out.push(toSentence(r, lvl));
    }
    if (out.length >= n) break;
  }
  return out;
}
