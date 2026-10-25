/**
 * Word-level comparison of a learner's answer with a reference sentence (dictation, translation,
 * transformation exercises). Tolerates punctuation and typing umlauts as ae/oe/ue/ss, but reports
 * capitalisation and umlaut substitutions so they can be pointed out.
 */
import { tokenize } from './tokenize';

export type DiffOp =
  | { type: 'equal'; expected: string; actual: string; caseError?: boolean; umlaut?: boolean }
  | { type: 'missing'; expected: string }
  | { type: 'extra'; actual: string }
  | { type: 'wrong'; expected: string; actual: string };

export interface DiffResult {
  ops: DiffOp[];
  /** share of reference words reproduced (0..1); case/umlaut slips count as correct */
  score: number;
  exact: boolean;
  caseErrors: number;
  umlautSubstitutes: number;
}

function wordsOf(s: string): string[] {
  return tokenize(s)
    .filter((t) => t.word)
    .map((t) => t.text);
}

/** "Strasse" → "straße", "ueber" → "über" (only for comparison). */
export function foldUmlauts(s: string): string {
  return s.toLowerCase().replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü').replace(/ss/g, 'ß');
}

function loose(s: string): string {
  return foldUmlauts(s).replace(/ß/g, 'ss');
}

function looselyEqual(expected: string, actual: string): boolean {
  return expected === actual || loose(expected) === loose(actual);
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

function similarity(a: string, b: string): number {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  return 1 - levenshtein(x, y) / Math.max(x.length, y.length, 1);
}

/** Order-preserving pairing of missing and extra words in a gap, preferring similar words. */
function alignGap(missing: string[], extra: string[]): DiffOp[] {
  const n = missing.length;
  const m = extra.length;
  const score: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const s = similarity(missing[i], extra[j]);
      const pair = s >= 0.34 ? s + score[i + 1][j + 1] : -Infinity;
      score[i][j] = Math.max(pair, score[i + 1][j], score[i][j + 1]);
    }
  }
  const out: DiffOp[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    const s = similarity(missing[i], extra[j]);
    if (s >= 0.34 && score[i][j] === s + score[i + 1][j + 1]) {
      out.push({ type: 'wrong', expected: missing[i++], actual: extra[j++] });
    } else if (score[i][j] === score[i + 1][j]) {
      out.push({ type: 'missing', expected: missing[i++] });
    } else {
      out.push({ type: 'extra', actual: extra[j++] });
    }
  }
  while (i < n) out.push({ type: 'missing', expected: missing[i++] });
  while (j < m) out.push({ type: 'extra', actual: extra[j++] });
  // a single missing + single extra word is a substitution even if dissimilar
  if (out.length === 2 && out[0].type === 'missing' && out[1].type === 'extra') {
    return [{ type: 'wrong', expected: out[0].expected, actual: out[1].actual }];
  }
  return out;
}

export function diffWords(expectedText: string, actualText: string): DiffResult {
  const e = wordsOf(expectedText);
  const a = wordsOf(actualText);
  const n = e.length;
  const m = a.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = looselyEqual(e[i], a[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const ops: DiffOp[] = [];
  let gapMissing: string[] = [];
  let gapExtra: string[] = [];
  const flush = () => {
    if (gapMissing.length || gapExtra.length) ops.push(...alignGap(gapMissing, gapExtra));
    gapMissing = [];
    gapExtra = [];
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (looselyEqual(e[i], a[j])) {
      flush();
      const caseError = e[i] !== a[j] && e[i][0] !== a[j][0] && e[i][0].toLowerCase() === a[j][0].toLowerCase();
      const umlaut = e[i].toLowerCase() !== a[j].toLowerCase() && loose(e[i]) === loose(a[j]);
      ops.push({ type: 'equal', expected: e[i], actual: a[j], caseError: caseError || undefined, umlaut: umlaut || undefined });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      gapMissing.push(e[i++]);
    } else {
      gapExtra.push(a[j++]);
    }
  }
  while (i < n) gapMissing.push(e[i++]);
  while (j < m) gapExtra.push(a[j++]);
  flush();

  const equal = ops.filter((o): o is Extract<DiffOp, { type: 'equal' }> => o.type === 'equal');
  const extras = ops.filter((o) => o.type === 'extra').length;
  const score = n === 0 ? (m === 0 ? 1 : 0) : Math.max(0, (equal.length - 0.5 * extras) / n);
  return {
    ops,
    score: Math.min(1, score),
    exact: ops.every((o) => o.type === 'equal' && o.expected === o.actual),
    caseErrors: equal.filter((o) => o.caseError).length,
    umlautSubstitutes: equal.filter((o) => o.umlaut).length,
  };
}
