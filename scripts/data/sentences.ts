/**
 * Tatoeba German–English sentence pairs: quality filtering, CEFR levelling, selection.
 */
import { LEVELS, type Level } from '../../lib/cefr';
import {
  SENT_FLAG_COLLOQUIAL,
  SENT_FLAG_IDIOM,
  SENT_FLAG_MODAL_PARTICLE,
  SENT_FLAG_NATIVE,
  type SentenceRow,
} from '../../lib/data/types';
import { fnv1a } from '../../lib/lexicon/hash';
import { analyzeSentence, type LemmaRef } from './cefr';
import { readBz2Buffer, readLines, untar } from './lib/io';

const EXCLUDE_TAG =
  /^@|^by |quote|poe(m|try|tic|sie|tisch)|gedicht|lied|song|bibel|bible|archai|veralt|dialect|dialekt|swiss|schweiz|bavarian|bairisch|platt|austria|österreich|unnatural|nonsense|wrong grammar|incorrect|not a sentence|native check|vulgar|sexual|offensive|politically incorrect|slang|old orthography|alte rechtschreibung|wilhelm tell|don carlos|ambiguous|comment on sentence|sprüche/i;
const COLLOQUIAL_TAG = /colloquial|umgangssprach|jugendsprache|informal/i;
const IDIOM_TAG = /idiom|redensart|redewendung|proverb|sprichwort/i;
const MODAL_TAG = /modal particle|modalpartikel/i;

/** verbs that make boring cloze targets */
const CLOZE_SKIP = new Set([
  'sein', 'haben', 'werden', 'können', 'müssen', 'sollen', 'wollen', 'dürfen', 'mögen', 'möchten', 'lassen', 'tun',
]);

export interface Pair {
  id: number;
  de: string;
  en: string;
  flags: number;
}

export interface SentenceCandidate extends Pair {
  level: Level;
  words: number;
  clozeIdx: number;
  clozeLemma: string;
  /** best lemma id per word, -1 for names/numbers/unknown */
  bestIds: number[];
  /** every candidate lemma id (for example-sentence indexing) */
  lemmaIds: number[];
  names: number;
}

export async function loadPairs(cacheDir: string): Promise<Pair[]> {
  // native German speakers (self-reported level 5)
  const natives = new Set<string>();
  const tar = untar(await readBz2Buffer(`${cacheDir}/user_languages.tar.bz2`));
  for (const buf of tar.values()) {
    for (const line of buf.toString('utf8').split('\n')) {
      const [lang, level, user] = line.split('\t');
      if (lang === 'deu' && level === '5' && user) natives.add(user);
    }
  }

  const excluded = new Set<number>();
  const flagsById = new Map<number, number>();
  for await (const line of readLines(`${cacheDir}/deu_tags.tsv.bz2`)) {
    const [idStr, tag] = line.split('\t');
    const id = Number(idStr);
    if (!tag) continue;
    if (EXCLUDE_TAG.test(tag)) excluded.add(id);
    let f = flagsById.get(id) ?? 0;
    if (COLLOQUIAL_TAG.test(tag)) f |= SENT_FLAG_COLLOQUIAL;
    if (IDIOM_TAG.test(tag)) f |= SENT_FLAG_IDIOM;
    if (MODAL_TAG.test(tag)) f |= SENT_FLAG_MODAL_PARTICLE;
    if (f) flagsById.set(id, f);
  }

  // German id → lowest linked English id
  const engFor = new Map<number, number>();
  for await (const line of readLines(`${cacheDir}/deu-eng_links.tsv.bz2`)) {
    const [d, e] = line.split('\t').map(Number);
    if (excluded.has(d)) continue;
    const cur = engFor.get(d);
    if (cur === undefined || e < cur) engFor.set(d, e);
  }

  const german = new Map<number, { text: string; native: boolean }>();
  const seen = new Set<string>();
  for await (const line of readLines(`${cacheDir}/deu_sentences_detailed.tsv.bz2`)) {
    const [idStr, , text, user] = line.split('\t');
    const id = Number(idStr);
    if (!engFor.has(id) || excluded.has(id) || !text) continue;
    if (text.length < 3 || text.length > 180) continue;
    if (/[^\p{Script=Latin}\p{N}\p{P}\p{Zs}€$%°+=&§/]/u.test(text)) continue;
    if (/https?:|www\.|\.com\b/.test(text)) continue;
    if (text === text.toUpperCase()) continue;
    const key = text.toLowerCase().replace(/[^\p{L}\d]+/gu, ' ').trim();
    if (seen.has(key)) continue;
    seen.add(key);
    german.set(id, { text, native: natives.has(user) });
  }

  const neededEng = new Set<number>();
  for (const id of german.keys()) neededEng.add(engFor.get(id)!);
  const english = new Map<number, string>();
  for await (const line of readLines(`${cacheDir}/eng_sentences.tsv.bz2`)) {
    const t1 = line.indexOf('\t');
    const id = Number(line.slice(0, t1));
    if (!neededEng.has(id)) continue;
    const text = line.slice(line.indexOf('\t', t1 + 1) + 1);
    if (text.length <= 220) english.set(id, text);
  }

  const pairs: Pair[] = [];
  for (const [id, { text, native }] of german) {
    const en = english.get(engFor.get(id)!);
    if (!en) continue;
    pairs.push({ id, de: text, en, flags: (flagsById.get(id) ?? 0) | (native ? SENT_FLAG_NATIVE : 0) });
  }
  return pairs;
}

export function analyzePairs(pairs: Pair[], lookup: (lowerForm: string) => LemmaRef[] | undefined): SentenceCandidate[] {
  const out: SentenceCandidate[] = [];
  for (const pair of pairs) {
    const a = analyzeSentence(pair.de, lookup);
    if (!a || a.words.length < 2 || a.words.length > 28) continue;

    // cloze target: the rarest content word that is not above the sentence level
    let clozeIdx = -1;
    let clozeLemma = '';
    let bestScore = -Infinity;
    const sl = LEVELS.indexOf(a.level);
    a.lemmas.forEach((lem, i) => {
      if (!lem || a.candidates[i].length === 0) return;
      if (!['noun', 'verb', 'adj', 'adv'].includes(lem.p) || CLOZE_SKIP.has(lem.w)) return;
      if (a.words[i].length < 3 || LEVELS.indexOf(lem.level) > sl) return;
      const score = Math.log(lem.rank + 1) - (i === 0 ? 2 : 0);
      if (score > bestScore) {
        bestScore = score;
        clozeIdx = i;
        clozeLemma = lem.w;
      }
    });

    out.push({
      ...pair,
      level: a.level,
      words: a.words.length,
      clozeIdx,
      clozeLemma,
      // compounds resolved by decompounding have no candidates: don't count them for their head word
      bestIds: a.lemmas.map((l, i) => (l && a.candidates[i].length ? l.id : -1)),
      lemmaIds: [...new Set(a.candidates.flat().map((c) => c.id))],
      names: a.names,
    });
  }
  return out;
}

export const LEVEL_QUOTA: Record<Level, number> = {
  A1: 5000,
  A2: 6000,
  B1: 6000,
  B2: 5000,
  C1: 4000,
  C2: 2500,
};

/** Picks a varied, high-quality subset per level. */
export function selectSentences(all: SentenceCandidate[]): Record<Level, SentenceRow[]> {
  const result = {} as Record<Level, SentenceRow[]>;
  for (const level of LEVELS) {
    const pool = all
      .filter((s) => s.level === level)
      .map((s) => ({
        s,
        // native speakers first, then a deterministic pseudo-random order
        key: (s.flags & SENT_FLAG_NATIVE ? 0 : 1) * 2 ** 32 + fnv1a(String(s.id)),
      }))
      .sort((a, b) => a.key - b.key)
      .map((x) => x.s);

    const quota = LEVEL_QUOTA[level];
    const lemmaUse = new Map<number, number>();
    let nameSentences = 0;
    const picked: SentenceRow[] = [];
    for (const s of pool) {
      if (picked.length >= quota) break;
      if (s.names > 0 && nameSentences > quota * 0.25) continue;
      // skip sentences that add nothing new (all lemmas already used often)
      const ids = s.bestIds.filter((id) => id >= 0);
      if (!ids.some((id) => (lemmaUse.get(id) ?? 0) < 25)) continue;
      for (const id of ids) lemmaUse.set(id, (lemmaUse.get(id) ?? 0) + 1);
      if (s.names > 0) nameSentences++;
      picked.push([s.id, s.de, s.en, s.clozeIdx, s.clozeLemma, s.flags]);
    }
    result[level] = picked;
  }
  return result;
}

/** Best example sentence per lemma id: short, easy, native, at or below the lemma's level. */
export function pickExamples(
  all: SentenceCandidate[],
  lemmaLevel: (id: number) => Level | undefined,
): Map<number, SentenceCandidate> {
  const best = new Map<number, { s: SentenceCandidate; score: number }>();
  for (const s of all) {
    if (s.words < 3 || s.words > 14) continue;
    const sl = LEVELS.indexOf(s.level);
    for (const id of s.bestIds) {
      if (id < 0) continue;
      const ll = lemmaLevel(id);
      if (!ll) continue;
      const over = sl - LEVELS.indexOf(ll);
      const score =
        (over > 0 ? over * 10 : 0) +
        Math.abs(s.words - 7) +
        (s.flags & SENT_FLAG_NATIVE ? 0 : 2) +
        (s.names > 0 ? 1 : 0) +
        (s.flags & SENT_FLAG_COLLOQUIAL ? 1 : 0);
      const cur = best.get(id);
      if (!cur || score < cur.score) best.set(id, { s, score });
    }
  }
  return new Map([...best].map(([id, v]) => [id, v.s]));
}

/** How often each lemma id is the best reading of a token in the corpus. */
export function corpusCounts(all: SentenceCandidate[], n: number): Float64Array {
  const counts = new Float64Array(n);
  for (const s of all) for (const id of s.bestIds) if (id >= 0) counts[id] += 1;
  return counts;
}
