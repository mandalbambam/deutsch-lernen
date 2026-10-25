import type { InterestId } from '@/content/interests';
import type { Level } from '@/lib/cefr';

/** Multiple choice: options[0] is correct (shuffled on display). */
export interface ChoiceQ {
  kind: 'choice';
  q: string;
  options: string[];
  explain: string;
}

/** Richtig / falsch. */
export interface TrueFalseQ {
  kind: 'tf';
  q: string;
  answer: boolean;
  explain: string;
}

export type ComprehensionQ = ChoiceQ | TrueFalseQ;

export interface ReadingText {
  id: string;
  level: Level;
  title: string;
  /** e-mail, blog post, article, short story … */
  genre: string;
  topics: InterestId[];
  /** paragraphs separated by blank lines */
  text: string;
  questions: ComprehensionQ[];
}

export const mc = (q: string, options: string[], explain: string): ChoiceQ => ({ kind: 'choice', q, options, explain });
export const tf = (q: string, answer: boolean, explain: string): TrueFalseQ => ({ kind: 'tf', q, answer, explain });
