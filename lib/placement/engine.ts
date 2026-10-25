/**
 * Adaptive CEFR placement engine (pure functions, serialisable state).
 *
 * Model: ability θ per skill on a 0.5–6.5 scale (A1 = 1 … C2 = 6). The probability of
 * answering an item of level l correctly follows a 3-parameter logistic curve:
 *   P = c + (1 − c − s) · σ(a · (θ − (l − 0.2)))
 * with guessing c = 1/#options (0 when the learner pressed "I don't know"), slip s = 0.03
 * and discrimination a = 2. A learner in the middle of band l answers ~70 % of level-l items.
 *
 * Estimation: grid-based Bayesian posterior (EAP) per skill. The prior for a skill is
 * centred on what the *other* skills suggest, so early estimates borrow strength.
 * Selection: next skill in rotation (skipping converged skills), level with maximum expected
 * Fisher information under the posterior, random unused item of that level.
 * Reading/listening passages are testlets: all of their questions are asked in a row.
 */
import type { BankItem, Passage } from '@/content/placement/types';
import { LEVELS, levelNumber, type Level } from '@/lib/cefr';
import type { TestedSkill } from '@/lib/db/types';
import { hashString, mulberry32 } from '@/lib/random';

export const GRID: number[] = Array.from({ length: 121 }, (_, i) => 0.5 + i * 0.05);
export const MODEL = { a: 2.0, offset: 0.2, slip: 0.03 } as const;

export function pCorrect(theta: number, level: number, guess: number): number {
  const p = 1 / (1 + Math.exp(-MODEL.a * (theta - (level - MODEL.offset))));
  return guess + (1 - guess - MODEL.slip) * p;
}

export interface Answer {
  itemId: string;
  skill: TestedSkill;
  level: number;
  correct: boolean;
  /** guessing probability used for this response (0 for "I don't know") */
  guess: number;
}

export interface EngineConfig {
  skills: TestedSkill[];
  minItems: number;
  maxItems: number;
  minPerSkill: number;
  maxPerSkill: number;
  targetSe: number;
  priorMean: number;
  priorSd: number;
}

export interface EngineState {
  seed: number;
  config: EngineConfig;
  answers: Answer[];
  /** queued question ids (current passage) */
  pending: string[];
  /** skill rotation pointer */
  turn: number;
  /** ids of items or passages that must not be used (e.g. seen in the last test) */
  exclude: string[];
  finished: boolean;
}

export interface Bank {
  items: BankItem[];
  passages: Passage[];
}

export function placementConfig(skills: TestedSkill[]): EngineConfig {
  return {
    skills,
    minItems: 8 * skills.length,
    maxItems: 10 * skills.length,
    minPerSkill: 6,
    maxPerSkill: 12,
    targetSe: 0.5,
    priorMean: 3,
    priorSd: 1.5,
  };
}

/** Short level check: ~3–5 items per skill, prior centred on the current level. */
export function levelCheckConfig(skills: TestedSkill[], priorMean: number): EngineConfig {
  return {
    skills,
    minItems: 3 * skills.length,
    maxItems: 5 * skills.length,
    minPerSkill: 3,
    maxPerSkill: 6,
    targetSe: 0.65,
    priorMean,
    priorSd: 0.9,
  };
}

export function startEngine(config: EngineConfig, seed: number, exclude: string[] = []): EngineState {
  return { seed, config, answers: [], pending: [], turn: 0, exclude, finished: false };
}

// ───────────────────────── estimation ─────────────────────────

function logLikelihood(answers: Answer[]): Float64Array {
  const ll = new Float64Array(GRID.length);
  for (const a of answers) {
    for (let g = 0; g < GRID.length; g++) {
      const p = pCorrect(GRID[g], a.level, a.guess);
      ll[g] += Math.log(a.correct ? p : 1 - p);
    }
  }
  return ll;
}

function normalLog(mean: number, sd: number): Float64Array {
  const out = new Float64Array(GRID.length);
  for (let g = 0; g < GRID.length; g++) out[g] = -0.5 * ((GRID[g] - mean) / sd) ** 2;
  return out;
}

function normalize(logp: Float64Array): Float64Array {
  let max = -Infinity;
  for (const v of logp) if (v > max) max = v;
  const p = new Float64Array(logp.length);
  let sum = 0;
  for (let g = 0; g < logp.length; g++) {
    p[g] = Math.exp(logp[g] - max);
    sum += p[g];
  }
  for (let g = 0; g < p.length; g++) p[g] /= sum;
  return p;
}

function moments(p: Float64Array): { mean: number; sd: number } {
  let mean = 0;
  for (let g = 0; g < p.length; g++) mean += p[g] * GRID[g];
  let v = 0;
  for (let g = 0; g < p.length; g++) v += p[g] * (GRID[g] - mean) ** 2;
  return { mean, sd: Math.sqrt(v) };
}

export interface SkillPosterior {
  dist: Float64Array;
  mean: number;
  sd: number;
  n: number;
}

export function skillPosterior(state: EngineState, skill: TestedSkill): SkillPosterior {
  const { priorMean, priorSd } = state.config;
  const own = state.answers.filter((a) => a.skill === skill);
  const others = state.answers.filter((a) => a.skill !== skill && state.config.skills.includes(a.skill));
  let center = priorMean;
  let sd = priorSd;
  if (others.length > 0) {
    // what the other skills suggest about the overall level
    const pOthers = normalize(add(normalLog(priorMean, priorSd), logLikelihood(others)));
    center = moments(pOthers).mean;
    sd = Math.max(1.0, Math.min(priorSd, 1.2));
  }
  const dist = normalize(add(normalLog(center, sd), logLikelihood(own)));
  const m = moments(dist);
  return { dist, mean: m.mean, sd: m.sd, n: own.length };
}

function add(a: Float64Array, b: Float64Array): Float64Array {
  const out = new Float64Array(a.length);
  for (let i = 0; i < a.length; i++) out[i] = a[i] + b[i];
  return out;
}

export interface SkillResult {
  theta: number;
  se: number;
  level: Level;
  correct: number;
  total: number;
}

export function estimates(state: EngineState): Partial<Record<TestedSkill, SkillResult>> {
  const out: Partial<Record<TestedSkill, SkillResult>> = {};
  for (const skill of state.config.skills) {
    const post = skillPosterior(state, skill);
    const own = state.answers.filter((a) => a.skill === skill);
    if (own.length === 0) continue;
    out[skill] = {
      theta: post.mean,
      se: post.sd,
      level: thetaLevel(post.mean),
      correct: own.filter((a) => a.correct).length,
      total: own.length,
    };
  }
  return out;
}

export function thetaLevel(theta: number): Level {
  return LEVELS[Math.min(5, Math.max(0, Math.floor(theta + 0.5) - 1))];
}

// ───────────────────────── selection ─────────────────────────

function expectedInformation(dist: Float64Array, level: number, guess: number): number {
  let info = 0;
  for (let g = 0; g < GRID.length; g++) {
    const p = pCorrect(GRID[g], level, guess);
    const i = (MODEL.a ** 2 * (p - guess) ** 2 * (1 - p)) / ((1 - guess) ** 2 * p);
    info += dist[g] * i;
  }
  return info;
}

function usedIds(state: EngineState, bank: Bank): Set<string> {
  const used = new Set<string>(state.exclude);
  for (const a of state.answers) used.add(a.itemId);
  for (const id of state.pending) used.add(id);
  // a passage counts as used once any of its questions was asked
  for (const p of bank.passages) if (p.questions.some((q) => used.has(q.id))) used.add(p.id);
  return used;
}

function countFor(state: EngineState, skill: TestedSkill) {
  return state.answers.filter((a) => a.skill === skill).length;
}

export function shouldStop(state: EngineState): boolean {
  const { config } = state;
  const total = state.answers.length;
  if (total >= config.maxItems) return true;
  if (total < config.minItems) return false;
  return config.skills.every((s) => {
    const n = countFor(state, s);
    return n >= config.minPerSkill && skillPosterior(state, s).sd <= config.targetSe;
  });
}

interface Candidate {
  level: number;
  /** item ids to queue (one item, or all questions of a passage) */
  ids: string[];
  guess: number;
}

function candidatesFor(skill: TestedSkill, bank: Bank, used: Set<string>): Candidate[] {
  if (skill === 'reading' || skill === 'listening') {
    return bank.passages
      .filter((p) => p.skill === skill && !used.has(p.id) && p.questions.length > 0)
      .map((p) => ({ level: levelNumber(p.level), ids: p.questions.map((q) => q.id), guess: 1 / p.questions[0].options.length }));
  }
  return bank.items
    .filter((i) => i.skill === skill && !i.passageId && !used.has(i.id))
    .map((i) => ({ level: levelNumber(i.level), ids: [i.id], guess: 1 / i.options.length }));
}

/** Fills `pending` with the next item(s), or marks the test finished. */
export function advance(state: EngineState, bank: Bank): EngineState {
  if (state.finished || state.pending.length > 0) return state;
  if (shouldStop(state)) return { ...state, finished: true };

  const { config } = state;
  const used = usedIds(state, bank);
  const rand = mulberry32(state.seed ^ hashString(String(state.answers.length)));
  const n = config.skills.length;
  const minReached = state.answers.length >= config.minItems;

  // pick the next skill in rotation that still needs (or can take) items
  const order = Array.from({ length: n }, (_, k) => config.skills[(state.turn + k) % n]);
  const open = order.filter((s) => countFor(state, s) < config.maxPerSkill && candidatesFor(s, bank, used).length > 0);
  if (open.length === 0) return { ...state, finished: true };
  const needy = open.filter((s) => {
    const cnt = countFor(state, s);
    return cnt < config.minPerSkill || skillPosterior(state, s).sd > config.targetSe;
  });
  const skill = (needy.length > 0 ? needy : minReached ? [] : open)[0];
  if (!skill) return { ...state, finished: true };

  const post = skillPosterior(state, skill);
  const cands = candidatesFor(skill, bank, used);
  const byLevel = new Map<number, Candidate[]>();
  for (const c of cands) byLevel.set(c.level, [...(byLevel.get(c.level) ?? []), c]);
  let bestLevel = -1;
  let bestInfo = -Infinity;
  for (const [level, list] of byLevel) {
    const info = expectedInformation(post.dist, level, list[0].guess) * (1 + 0.04 * rand());
    if (info > bestInfo) {
      bestInfo = info;
      bestLevel = level;
    }
  }
  const pool = byLevel.get(bestLevel)!;
  const chosen = pool[Math.floor(rand() * pool.length)];
  const nextTurn = (config.skills.indexOf(skill) + 1) % n;
  return { ...state, pending: chosen.ids, turn: nextTurn };
}

/** Records the answer to the current item. */
export function record(state: EngineState, answer: Answer): EngineState {
  return {
    ...state,
    answers: [...state.answers, answer],
    pending: state.pending.filter((id) => id !== answer.itemId),
  };
}

export function currentItemId(state: EngineState): string | undefined {
  return state.pending[0];
}

/** Rough number of items the test will have, for the progress display. */
export function expectedLength(state: EngineState): number {
  const { minItems, maxItems } = state.config;
  return Math.max(state.answers.length + state.pending.length, Math.round((minItems + maxItems) / 2));
}
