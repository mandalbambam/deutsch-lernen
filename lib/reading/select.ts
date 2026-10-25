import type { InterestId } from '@/content/interests';
import { LISTENING, type ListeningScript } from '@/content/listening/scripts';
import { TEXTS, type ComprehensionQ, type ReadingText } from '@/content/reading';
import { levelNumber, type Level } from '@/lib/cefr';

interface Graded {
  id: string;
  level: Level;
  topics: InterestId[];
}

/**
 * Next unread item for a level: same level first (interest matches first), then one level below,
 * then one above. Returns undefined when everything nearby has been done.
 */
export function pickNext<T extends Graded>(items: T[], level: Level, interests: string[], done: Set<string>): T | undefined {
  const target = levelNumber(level);
  const score = (t: T) => {
    const d = levelNumber(t.level) - target;
    const levelScore = d === 0 ? 0 : d === -1 ? 1 : d === 1 ? 2 : 10 + Math.abs(d);
    const interest = t.topics.some((x) => interests.includes(x)) ? 0 : 0.5;
    return levelScore + interest;
  };
  return items
    .filter((t) => !done.has(t.id) && Math.abs(levelNumber(t.level) - target) <= 1)
    .sort((a, b) => score(a) - score(b) || items.indexOf(a) - items.indexOf(b))[0];
}

export function nextText(level: Level, interests: string[], done: Set<string>): ReadingText | undefined {
  return pickNext(TEXTS, level, interests, done);
}

export function nextScript(level: Level, interests: string[], done: Set<string>): ListeningScript | undefined {
  return pickNext(LISTENING, level, interests, done);
}

/** Error tag for a wrong comprehension answer, from the kind of question. */
export function questionTag(q: ComprehensionQ, skill: 'reading' | 'listening'): string {
  const text = q.q.toLowerCase();
  if (text.startsWith('was bedeutet')) return 'lexis.meaning';
  if (/^(welche these|welche position|worum geht|wie bewertet|welche stimmung|was ist das zentrale)/.test(text)) return `${skill}.gist`;
  if (/^(was meint|was zeigt|was drückt|wie ist .* zu verstehen|worin liegt die ironie|was ist an)/.test(text)) return `${skill}.inference`;
  return `${skill}.detail`;
}

/** Rough word count (for reading time). */
export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
