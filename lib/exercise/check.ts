/**
 * Rule-based answer checking with explanations of *why* an answer is wrong.
 */
import { diffWords, foldUmlauts, type DiffResult } from '@/lib/text/diff';
import { normalizeAnswer } from '@/lib/text/tokenize';
import type { Exercise } from './types';

export type Verdict = 'correct' | 'almost' | 'wrong';

export interface CheckResult {
  verdict: Verdict;
  /** the accepted answer closest to the learner's answer */
  expected: string;
  /** specific reason (from feedback rules) — shown before the general explanation */
  reason?: string;
  /** small issues on an otherwise correct answer (capitalisation, ae/oe/ue) */
  note?: string;
  diff?: DiffResult;
  /** 1 correct, 0.5 almost, 0 wrong */
  score: number;
}

const norm = (s: string) => normalizeAnswer(s).replace(/\s*,\s*/g, ', ');

/** Compares two answers: exact, only capitalisation, only umlaut spelling, or different. */
export function compareAnswer(expected: string, actual: string): 'same' | 'case' | 'umlaut' | 'diff' {
  const e = norm(expected);
  const a = norm(actual);
  if (e === a) return 'same';
  // a capital first letter of a full sentence is not required
  if (e.length > 0 && a.length > 0 && e.slice(1) === a.slice(1) && e[0].toLowerCase() === a[0].toLowerCase() && /\s/.test(e)) return 'same';
  if (e.toLowerCase() === a.toLowerCase()) return 'case';
  if (foldUmlauts(e).replace(/ß/g, 'ss') === foldUmlauts(a).replace(/ß/g, 'ss')) return 'umlaut';
  return 'diff';
}

function acceptedAnswers(ex: Exercise): string[] {
  switch (ex.kind) {
    case 'choice':
      return [ex.options[0]];
    case 'fill':
    case 'transform':
    case 'correct':
      return ex.answers;
    case 'order':
      return [ex.words.join(' '), ...(ex.answers ?? [])];
  }
}

const POLITE = /^(Sie|Ihnen|Ihr|Ihre|Ihrem|Ihren|Ihrer|Ihres)$/;

/** Explains a capitalisation-only difference (content feedback first, then the rule that applies). */
function caseNote(ex: Exercise, answer: string, expected: string): string {
  const specific = ex.kind === 'fill' ? ex.feedback?.[answer.trim().toLowerCase()] : undefined;
  if (specific) return specific;
  const first = expected.trim().split(/\s+/)[0] ?? '';
  if (POLITE.test(first) && !/\s/.test(expected.trim())) return `Check the capitalisation: the polite form is always capitalised (${expected.trim()}).`;
  if (/^[a-zäöü]/.test(expected.trim()) && /^[A-ZÄÖÜ]/.test(answer.trim())) return 'Check the capitalisation: only nouns and the polite Sie are capitalised — this word is written in lower case.';
  return 'Check the capitalisation: nouns are written with a capital letter.';
}

function patternFeedback(rules: [string, string][] | undefined, answer: string): string | undefined {
  for (const [pattern, message] of rules ?? []) {
    try {
      if (new RegExp(pattern, 'iu').test(answer)) return message;
    } catch {
      /* invalid pattern in content: ignore */
    }
  }
  return undefined;
}

/** Checks a free-text answer (fill/transform/correct/order). For choice exercises use checkChoice. */
export function checkAnswer(ex: Exercise, answer: string): CheckResult {
  const accepted = acceptedAnswers(ex);
  let best: { expected: string; cmp: ReturnType<typeof compareAnswer> } | null = null;
  for (const exp of accepted) {
    const cmp = compareAnswer(exp, answer);
    if (cmp === 'same') return { verdict: 'correct', expected: exp, score: 1 };
    if (!best || (best.cmp === 'diff' && cmp !== 'diff')) best = { expected: exp, cmp };
  }
  if (best && best.cmp === 'case') {
    return { verdict: 'almost', expected: best.expected, note: caseNote(ex, answer, best.expected), score: 0.5 };
  }
  if (best && best.cmp === 'umlaut') {
    return { verdict: 'correct', expected: best.expected, note: `Correct — written with umlaut/ß: ${best.expected}`, score: 1 };
  }

  // wrong: pick the closest accepted answer for the comparison display
  let closest = accepted[0];
  let closestDiff = diffWords(closest, answer);
  for (const exp of accepted.slice(1)) {
    const d = diffWords(exp, answer);
    if (d.score > closestDiff.score) {
      closest = exp;
      closestDiff = d;
    }
  }
  let reason: string | undefined;
  if (ex.kind === 'fill') reason = ex.feedback?.[answer.trim().toLowerCase()];
  if (ex.kind === 'transform' || ex.kind === 'correct') reason = patternFeedback(ex.feedback, answer);
  if (ex.kind === 'correct' && compareAnswer(ex.sentence, answer) === 'same') {
    reason = 'You did not change the sentence — there is a mistake in it.';
  }
  const longAnswer = ex.kind !== 'fill' && ex.kind !== 'choice';
  return { verdict: 'wrong', expected: closest, reason, diff: longAnswer ? closestDiff : undefined, score: 0 };
}

export function checkChoice(ex: Extract<Exercise, { kind: 'choice' }>, chosen: number): CheckResult {
  if (chosen === 0) return { verdict: 'correct', expected: ex.options[0], score: 1 };
  return { verdict: 'wrong', expected: ex.options[0], reason: ex.why?.[chosen - 1], score: 0 };
}
