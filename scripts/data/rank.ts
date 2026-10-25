/**
 * Frequency ranking of lemmas and CEFR banding.
 *
 * The subtitle frequency list contains lowercase word *forms* that are often ambiguous
 * ("heute" = today / preterite of "heuen"). Counts are distributed over candidate lemmas with a
 * few rounds of expectation-maximisation, so a form's mass flows to lemmas that are frequent overall.
 * The resulting subtitle frequencies are then blended with lemma counts from the Tatoeba corpus,
 * which corrects the crime-drama bias of subtitles.
 */
import type { Level } from '../../lib/cefr';
import type { Candidate, KaikkiResult } from './kaikki';
import { readLines } from './lib/io';
import { CORE_A1, CORE_A2 } from './overrides/core-vocab';

/** upper rank bound (inclusive) for each level */
export const RANK_BANDS: [Level, number][] = [
  ['A1', 750],
  ['A2', 1750],
  ['B1', 3500],
  ['B2', 6500],
  ['C1', 12000],
  ['C2', Infinity],
];

export function levelForRank(rank: number): Level {
  return RANK_BANDS.find(([, max]) => rank <= max)![0];
}

export async function loadFrequencies(path: string): Promise<Map<string, number>> {
  const freq = new Map<string, number>();
  for await (const line of readLines(path)) {
    const sp = line.lastIndexOf(' ');
    if (sp <= 0) continue;
    const count = Number(line.slice(sp + 1));
    if (count < 3) continue;
    const w = line.slice(0, sp).trim().toLowerCase();
    if (!w) continue;
    freq.set(w, (freq.get(w) ?? 0) + count);
  }
  return freq;
}

/** lowercase form → candidate ids */
export function buildFormIndex(k: KaikkiResult): Map<string, number[]> {
  const byWord = new Map<string, Candidate[]>();
  for (const c of k.candidates) {
    const list = byWord.get(c.w);
    if (list) list.push(c);
    else byWord.set(c.w, [c]);
  }
  const formIndex = new Map<string, number[]>();
  const add = (form: string, id: number) => {
    const list = formIndex.get(form);
    if (!list) formIndex.set(form, [id]);
    else if (!list.includes(id)) list.push(id);
  };
  for (const c of k.candidates) for (const f of c.forms) add(f, c.id);
  for (const [form, keys] of k.formOf) {
    for (const key of keys) {
      const [lemma, pos] = key.split('');
      const all = byWord.get(lemma) ?? [];
      const samePos = all.filter((c) => c.p === pos);
      for (const c of samePos.length ? samePos : all) add(form, c.id);
    }
  }
  return formIndex;
}

/**
 * Share of capitalised (noun) uses per lowercase form, measured mid-sentence in the corpus.
 * Lets "zeit" go to "Zeit" (noun) and "muss" to "müssen" instead of "das Muss".
 */
export function capitalShares(sentences: string[]): Map<string, number> {
  const cap = new Map<string, number>();
  const low = new Map<string, number>();
  for (const s of sentences) {
    for (const m of s.matchAll(/\p{L}+/gu)) {
      // skip sentence starts, also after quotes/colons/inner sentence ends ("Er sagte: „Nein!“")
      const before = s.slice(0, m.index).trimEnd();
      if (!before || /[.!?:"„“”»«'‚‘–-]$/.test(before)) continue;
      const w = m[0];
      const key = w.toLowerCase();
      if (/^\p{Lu}/u.test(w)) cap.set(key, (cap.get(key) ?? 0) + 1);
      else low.set(key, (low.get(key) ?? 0) + 1);
    }
  }
  const out = new Map<string, number>();
  for (const key of new Set([...cap.keys(), ...low.keys()])) {
    const c = cap.get(key) ?? 0;
    const l = low.get(key) ?? 0;
    out.set(key, (c + 0.5) / (c + l + 1));
  }
  return out;
}

/** Subtitle-based frequency per candidate id (EM over ambiguous forms). */
export function subtitleScores(
  k: KaikkiResult,
  formIndex: Map<string, number[]>,
  freq: Map<string, number>,
  capShare: Map<string, number>,
): Float64Array {
  const n = k.candidates.length;
  const FUNCTION_POS = new Set(['det', 'pron', 'prep', 'conj', 'part', 'num']);
  const lowerPos = new Map<string, Set<string>>();
  for (const c of k.candidates) {
    if (c.p === 'noun') continue;
    const key = c.w.toLowerCase();
    const set = lowerPos.get(key) ?? new Set<string>();
    set.add(c.p);
    lowerPos.set(key, set);
  }
  const weight = new Float64Array(n);
  const citation: string[] = [];
  for (const c of k.candidates) {
    let w = c.quality;
    if (FUNCTION_POS.has(c.p)) w *= 3;
    // nominalised words share all their forms with the base word:
    // "das Ich", "das Aber" (function words) are rare; "das Essen", "das Leben" are common
    const base = c.p === 'noun' ? lowerPos.get(c.w.toLowerCase()) : undefined;
    if (base) w *= base.has('verb') || base.has('adj') ? 0.5 : 0.2;
    if (c.w.length === 1) w *= 0.01;
    weight[c.id] = w;
    citation[c.id] = c.w.toLowerCase();
  }
  const capitalised = k.candidates.map((c) => /^\p{Lu}/u.test(c.w));

  const bonus = (id: number, form: string) => (citation[id] === form ? 2 : 1);
  const distribute = (next: Float64Array, s: Float64Array, ids: number[], count: number, form: string) => {
    let denom = 0;
    for (const id of ids) denom += s[id] * weight[id] * bonus(id, form);
    if (denom <= 0) return;
    for (const id of ids) next[id] += (count * s[id] * weight[id] * bonus(id, form)) / denom;
  };

  let s = new Float64Array(n).fill(1);
  for (let iter = 0; iter < 8; iter++) {
    const next = new Float64Array(n);
    for (const [form, ids] of formIndex) {
      const count = freq.get(form);
      if (!count) continue;
      const upper = ids.filter((id) => capitalised[id]);
      const lower = ids.filter((id) => !capitalised[id]);
      if (upper.length && lower.length) {
        // the subtitle list is lowercase: split by how often the form is capitalised in running text
        const share = capShare.get(form) ?? 0.5;
        distribute(next, s, upper, count * share, form);
        distribute(next, s, lower, count * (1 - share), form);
      } else {
        distribute(next, s, ids, count, form);
      }
    }
    for (let i = 0; i < n; i++) next[i] += 1e-9;
    s = next;
  }
  return s;
}

export interface Ranked extends Candidate {
  score: number;
  rank: number;
  level: Level;
}

/** Blends subtitle and Tatoeba frequencies, ranks lemmas and assigns CEFR bands. */
export function rankLemmas(
  k: KaikkiResult,
  subtitle: Float64Array,
  tatoeba: Float64Array,
  limit: number,
): Ranked[] {
  const sumS = subtitle.reduce((a, b) => a + b, 0) || 1;
  const sumT = tatoeba.reduce((a, b) => a + b, 0) || 1;
  const coreA1 = new Set(CORE_A1.split(/\s+/).filter(Boolean));
  const coreA2 = new Set(CORE_A2.split(/\s+/).filter(Boolean));
  const score = (c: Candidate) => 0.5 * (subtitle[c.id] / sumS) + 0.5 * (tatoeba[c.id] / sumT);

  const sorted = k.candidates
    .filter((c) => c.w.length > 1)
    .filter((c) => score(c) > 1e-9 || coreA1.has(c.w) || coreA2.has(c.w))
    .filter((c) => !/^[A-ZÄÖÜ]{2,}$/.test(c.w)) // acronyms
    .filter((c) => !/\d/.test(c.w))
    .sort((a, b) => score(b) - score(a));

  const ranked: Ranked[] = [];
  for (const c of sorted.slice(0, limit)) {
    const rank = ranked.length + 1;
    let level = levelForRank(rank);
    if (coreA1.has(c.w) && level !== 'A1') level = 'A1';
    else if (coreA2.has(c.w) && !['A1', 'A2'].includes(level)) level = 'A2';
    ranked.push({ ...c, score: score(c), rank, level });
  }
  return ranked;
}
