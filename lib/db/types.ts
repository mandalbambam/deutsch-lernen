import type { Level } from '@/lib/cefr';
import type { Pos, VerbInfo } from '@/lib/data/types';

export const TESTED_SKILLS = ['grammar', 'vocabulary', 'reading', 'listening'] as const;
export type TestedSkill = (typeof TESTED_SKILLS)[number];
export type Skill = TestedSkill | 'writing';
export const ALL_SKILLS: Skill[] = ['grammar', 'vocabulary', 'reading', 'listening', 'writing'];

export type Goal = 'work' | 'exam' | 'daily' | 'literature';
export type ExamType = 'goethe' | 'telc' | 'testdaf';
export type DailyMinutes = 15 | 30 | 60;

export interface Profile {
  id: 'me';
  createdAt: number;
  updatedAt: number;
  uiLang: 'en' | 'de';
  dailyMinutes: DailyMinutes;
  goals: Goal[];
  exam?: { type: ExamType; target?: Level; date?: string };
  interests: string[];
  onboarded: boolean;
  tts: { voiceURI?: string; rate: number };
  srs: {
    retention: number;
    maxNewPerDay: number;
    maxReviewsPerDay: number;
    genderDrill: boolean;
    /** read the word aloud when the answer is shown */
    autoplay?: boolean;
  };
  ai: { passphrase?: string; noticeAccepted?: boolean };
}

export interface SkillEstimate {
  theta: number;
  se: number;
  level: Level;
  correct: number;
  total: number;
}

export interface ItemResponse {
  itemId: string;
  skill: TestedSkill;
  level: Level;
  correct: boolean;
  /** chosen option index; null = "I don't know" */
  choice: number | null;
  ms: number;
  errorTags: string[];
  /** the main tag the item tests */
  tag?: string;
}

export interface ErrorPattern {
  tag: string;
  count: number;
  /** items where this pattern appeared */
  itemIds: string[];
}

export interface AssessmentAnalysis {
  strengths: string[];
  weaknesses: string[];
  errorPatterns: ErrorPattern[];
  /** per skill: accuracy per level */
  byLevel: Partial<Record<TestedSkill, Partial<Record<Level, { correct: number; total: number }>>>>;
}

export interface WritingAssessment {
  taskId: string;
  text: string;
  level: Level;
  scores: { task: number; coherence: number; range: number; accuracy: number };
  summary: string;
  errors: { original: string; correction: string; tag: string; explanation: string }[];
}

export interface Assessment {
  id: string;
  kind: 'placement' | 'levelcheck';
  status: 'in-progress' | 'done';
  startedAt: number;
  takenAt: number;
  overall?: { theta: number; level: Level };
  skills: Partial<Record<Skill, SkillEstimate>>;
  responses: ItemResponse[];
  analysis?: AssessmentAnalysis;
  writing?: WritingAssessment;
  /** serialized engine state to resume an interrupted test */
  engine?: unknown;
  listeningSkipped?: boolean;
}

export interface SkillState {
  skill: Skill;
  theta: number;
  se: number;
  level: Level;
  updatedAt: number;
  source: 'placement' | 'levelcheck' | 'practice';
}

/** FSRS state fields mirror ts-fsrs `Card` (dates as epoch ms). */
export interface CardSchedule {
  due: number;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  learningSteps: number;
  reps: number;
  lapses: number;
  /** 0 New, 1 Learning, 2 Review, 3 Relearning */
  state: 0 | 1 | 2 | 3;
  lastReview?: number;
}

export interface Card extends CardSchedule {
  id: string;
  kind: 'word' | 'sentence';
  word: string;
  pos?: Pos;
  gender?: string;
  plural?: string;
  glosses: string[];
  level?: Level;
  rank?: number;
  verb?: VerbInfo;
  example?: { de: string; en: string; tatoebaId?: number };
  source: 'deck' | 'reading' | 'listening' | 'mistake' | 'manual';
  /** user said "I already know this" */
  known?: boolean;
  suspended?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ReviewLog {
  id: string;
  cardId: string;
  at: number;
  /** 1 Again, 2 Hard, 3 Good, 4 Easy */
  rating: 1 | 2 | 3 | 4;
  state: 0 | 1 | 2 | 3;
  elapsedDays: number;
  scheduledDays: number;
  durationMs: number;
}

export type Module =
  | 'placement'
  | 'levelcheck'
  | 'cards'
  | 'grammar'
  | 'reading'
  | 'listening'
  | 'writing'
  | 'conversation'
  | 'output';

export interface Attempt {
  id: string;
  at: number;
  module: Module;
  skill: Skill;
  itemId: string;
  level?: Level;
  correct: boolean;
  /** 0..1 partial credit */
  score?: number;
  errorTags: string[];
  ms?: number;
}

export interface MistakeStat {
  tag: string;
  count: number;
  firstAt: number;
  lastAt: number;
  examples: { wrong: string; right: string; context?: string; source: Module; at: number }[];
}

export interface TopicProgress {
  topicId: string;
  attempts: number;
  correct: number;
  /** exponentially weighted accuracy 0..1 */
  mastery: number;
  seenExplanation: boolean;
  lastAt: number;
}

export interface TextProgress {
  textId: string;
  kind: 'reading' | 'listening';
  completedAt?: number;
  score?: number;
  lookups: number;
  updatedAt: number;
}

export interface PlanAdjustment {
  at: number;
  notes: string[];
}

export interface WeeklyPlan {
  weekStart: string;
  createdAt: number;
  /** relative time weights per practice area */
  weights: Record<'cards' | 'grammar' | 'input' | 'output', number>;
  /** target difficulty per skill */
  targets: Record<Skill, Level>;
  newCardsPerDay: number;
  /** grammar topics in priority order */
  topicQueue: string[];
  inputSkill: 'reading' | 'listening' | 'alternate';
  notes: string[];
}

export type SessionBlockKind = 'cards' | 'grammar' | 'reading' | 'listening' | 'output';

export interface SessionBlock {
  kind: SessionBlockKind;
  minutes: number;
  /** e.g. grammar topic id, text id, output task type */
  ref?: string;
  done: boolean;
  doneAt?: number;
  result?: { correct?: number; total?: number; note?: string };
}

export interface DayLog {
  date: string;
  session?: { blocks: SessionBlock[]; createdAt: number; completedAt?: number };
  seconds: Partial<Record<Module, number>>;
  reviews: number;
  newCards: number;
}

export interface Writing {
  id: string;
  at: number;
  taskId?: string;
  prompt: string;
  text: string;
  level?: Level;
  feedback?: unknown;
  selfCheck?: Record<string, boolean>;
}

export interface ChatMessage {
  role: 'user' | 'partner';
  text: string;
  correction?: string;
  explanation?: string;
  at: number;
}

export interface Conversation {
  id: string;
  scenarioId: string;
  level: Level;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  summary?: unknown;
}

export interface AiCacheEntry {
  key: string;
  task: string;
  at: number;
  value: unknown;
}

export interface MetaEntry {
  key: string;
  value: unknown;
}
