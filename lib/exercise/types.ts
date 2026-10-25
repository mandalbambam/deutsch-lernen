import type { ErrorTagId } from '@/content/error-tags';

/**
 * Hand-written grammar exercises. Every exercise explains the rule (`explain`) and can give
 * targeted feedback for typical wrong answers (`feedback`), so the learner sees *why* an
 * answer is wrong, not just that it is.
 */
interface Base {
  id: string;
  /** shown after answering (and as the explanation of a wrong answer) */
  explain: string;
  /** what a wrong answer to this exercise says about the learner */
  tag?: ErrorTagId;
  /** English translation or context line shown with the exercise */
  en?: string;
  /** overrides the default heading ("Fill the gap" …) */
  heading?: string;
}

/** Multiple choice; the first option is correct (options are shuffled when shown). */
export interface ChoiceExercise extends Base {
  kind: 'choice';
  prompt: string;
  options: string[];
  /** explanation per wrong option (aligned with options[1..]) */
  why?: string[];
  /** fixed display order (indices into options) instead of shuffling, e.g. Richtig before Falsch */
  display?: number[];
}

/** One gap (`___`) in a sentence; several answers may be accepted. */
export interface FillExercise extends Base {
  kind: 'fill';
  prompt: string;
  answers: string[];
  /** hint shown in brackets after the gap, e.g. the infinitive */
  hint?: string;
  /** wrong answer (lower case) → why it is wrong */
  feedback?: Record<string, string>;
}

/** Rewrite a sentence following an instruction (e.g. active → passive). */
export interface TransformExercise extends Base {
  kind: 'transform';
  instruction: string;
  source: string;
  answers: string[];
  /** regex (case-insensitive) matched against a wrong answer → message */
  feedback?: [string, string][];
}

/** Find and correct the mistake in a sentence. */
export interface CorrectExercise extends Base {
  kind: 'correct';
  sentence: string;
  answers: string[];
  feedback?: [string, string][];
}

/** Put the words in the right order. */
export interface OrderExercise extends Base {
  kind: 'order';
  /** words/chunks in the correct order (shuffled for display) */
  words: string[];
  /** extra accepted orders (full sentences); the joined `words` are always accepted */
  answers?: string[];
}

export type Exercise = ChoiceExercise | FillExercise | TransformExercise | CorrectExercise | OrderExercise;

export interface GrammarLesson {
  /** topic id from content/grammar/catalog.ts */
  id: string;
  /** explanation in a small Markdown subset (paragraphs, **bold**, *italic*, lists, tables, > notes) */
  explanation: string;
  examples: { de: string; en: string }[];
  exercises: Exercise[];
  /** generated drills that add unlimited rule-checked practice */
  drills?: DrillKind[];
}

/** Generated drills for B1–C2 topics (lib/exercise/drills-advanced.ts). */
export const ADVANCED_DRILL_KINDS = [
  'pluperfect',
  'relative',
  'passive',
  'zu-infinitive',
  'time-clause',
  'concessive',
  'indirect-question',
  'verb-prep',
  'future',
  'two-part',
  'lassen',
  'passive-advanced',
  'passive-alt',
  'konj2-past',
  'participle',
  'connector-b2',
  'subjective-modal',
  'nominalisation',
  'relative-was',
  'particles-b2',
  'midfield',
  'konj1-report',
  'nominal-style',
  'fvg-c1',
  'participle-ext',
  'passive-variants',
  'particles-c1',
  'connector-c1',
  'irreal-comparison',
  'rektion',
  'word-formation',
  'hearsay',
  'konj1-formal',
  'participle-clause',
  'fvg-c2',
  'particles-c2',
  'register',
  'idioms',
  'connector-c2',
  'information-structure',
  'double-infinitive',
  'genitive-verbs',
] as const;

export type AdvancedDrillKind = (typeof ADVANCED_DRILL_KINDS)[number];

export type DrillKind = BasicDrillKind | AdvancedDrillKind;

export type BasicDrillKind =
  | 'gender'
  | 'plural'
  | 'case-akk'
  | 'case-dat'
  | 'case-gen'
  | 'case-prep'
  | 'adj-definite'
  | 'adj-indefinite'
  | 'adj-all'
  | 'present'
  | 'present-irregular'
  | 'modal'
  | 'preterite'
  | 'perfect'
  | 'konj2'
  | 'konj1'
  | 'comparison'
  | 'n-decl'
  | 'imperative';
