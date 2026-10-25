/**
 * Formats of the generated files in /public/data (written by scripts/data/build.ts).
 * Keys are kept short because these files are shipped to the browser.
 */
import type { Level } from '@/lib/cefr';

export type Pos =
  | 'noun'
  | 'verb'
  | 'adj'
  | 'adv'
  | 'prep'
  | 'conj'
  | 'pron'
  | 'det'
  | 'num'
  | 'intj'
  | 'part';

/** Gender of a noun; 'pl' = plural-only (die Eltern). Several genders are joined: 'm,n'. */
export type Gender = 'm' | 'f' | 'n' | 'pl';

export interface VerbInfo {
  /** 3rd person singular present (geht, steht auf) */
  p3?: string;
  /** preterite 1st/3rd sg (ging, stand auf) */
  pt?: string;
  /** past participle (gegangen, aufgestanden) */
  pp?: string;
  /** auxiliary: h = haben, s = sein, hs = both */
  aux?: 'h' | 's' | 'hs';
  /** separable prefix (auf) */
  sep?: string;
  /** strong/irregular verb */
  irr?: 1;
  /** has reflexive senses */
  refl?: 1;
}

export interface LexEntry {
  /** lemma */
  w: string;
  p: Pos;
  /** noun gender(s) joined with ',' */
  g?: string;
  /** plural (nouns) */
  pl?: string;
  /** genitive singular (nouns) */
  gs?: string;
  /** weak noun (n-Deklination) */
  wk?: 1;
  /** English glosses, most useful first */
  d: string[];
  /** frequency rank (1 = most frequent lemma) */
  r: number;
  /** approximate CEFR band */
  l: Level;
  v?: VerbInfo;
  /** adjective comparative / superlative */
  cmp?: string;
  sup?: string;
  /** IPA */
  ipa?: string;
}

/** One lexicon shard: lemma entries + inflected form → lemma index for words hashing into this bucket. */
export interface LexShard {
  /** lemma (exact case) → entries (one per part of speech) */
  e: Record<string, LexEntry[]>;
  /** lowercase form → lemmas (exact case) */
  f: Record<string, string[]>;
}

/** Full conjugation of a verb, 6 persons: ich, du, er/sie/es, wir, ihr, sie/Sie. */
export interface VerbTable {
  inf: string;
  pres: string[];
  prt: string[];
  k1: string[];
  k2: string[];
  /** imperative: du, ihr */
  imp: string[];
  pp: string;
  /** present participle */
  pa?: string;
  aux: 'h' | 's' | 'hs';
  sep?: string;
}

export interface VerbShard {
  [infinitive: string]: VerbTable;
}

/** [tatoebaId, german, english, clozeTokenIndex, clozeLemma, flags] — cloze fields may be -1/'' */
export type SentenceRow = [number, string, string, number, string, number];

export const SENT_FLAG_NATIVE = 1;
export const SENT_FLAG_COLLOQUIAL = 2;
export const SENT_FLAG_IDIOM = 4;
export const SENT_FLAG_MODAL_PARTICLE = 8;

/** Vocabulary deck entry (one future flashcard). */
export interface DeckEntry {
  w: string;
  p: Pos;
  g?: string;
  pl?: string;
  /** genitive singular (nouns) */
  gs?: string;
  /** weak noun (n-Deklination) */
  wk?: 1;
  d: string[];
  r: number;
  l: Level;
  v?: VerbInfo;
  /** example: [tatoebaId, german, english] */
  ex?: [number, string, string];
}

export interface DataManifest {
  version: string;
  generatedAt: string;
  buckets: number;
  files: {
    lex: string[];
    verbs: string[];
    verbBuckets: number;
    sentences: Record<Level, string>;
    decks: Record<Level, string>;
  };
  counts: {
    lemmas: number;
    forms: number;
    verbs: number;
    sentences: Record<Level, number>;
    deck: Record<Level, number>;
  };
  bytes: number;
  sources: { name: string; url: string; license: string }[];
}
