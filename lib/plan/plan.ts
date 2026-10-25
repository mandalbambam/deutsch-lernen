/**
 * The weekly learning plan: time weights per practice area, difficulty targets per skill,
 * new-card rate and a prioritised grammar-topic queue. Rebuilt every 7 days from performance.
 */
import { ERROR_TAGS, type ErrorTag } from '@/content/error-tags';
import { TOPICS } from '@/content/grammar/catalog';
import { LEVELS, levelNumber, shiftLevel, type Level } from '@/lib/cefr';
import type {
  Attempt,
  DailyMinutes,
  Goal,
  MistakeStat,
  Profile,
  ReviewLog,
  Skill,
  SkillState,
  TopicProgress,
  WeeklyPlan,
} from '@/lib/db/types';
import { pCorrect, thetaLevel } from '@/lib/placement/engine';

export type Area = 'cards' | 'grammar' | 'input' | 'output';

export const BASE_MINUTES: Record<DailyMinutes, Record<Area, number>> = {
  15: { cards: 5, grammar: 4, input: 4, output: 2 },
  30: { cards: 9, grammar: 8, input: 8, output: 5 },
  60: { cards: 15, grammar: 15, input: 18, output: 12 },
};

const NEW_CARDS: Record<DailyMinutes, number> = { 15: 8, 30: 15, 60: 25 };

export interface PlanContext {
  profile: Profile;
  skills: Partial<Record<Skill, SkillState>>;
  mistakes: MistakeStat[];
  topicProgress: TopicProgress[];
  /** attempts and reviews of the past 7 days (for adjustments) */
  attempts: Attempt[];
  reviews: ReviewLog[];
  /** average reviews per day during the past week */
  avgReviewsPerDay: number;
  now: number;
}

function theta(skills: PlanContext['skills'], s: Skill, fallback: number): number {
  return skills[s]?.theta ?? fallback;
}

function meanTheta(skills: PlanContext['skills']): number {
  const vals = (['grammar', 'vocabulary', 'reading', 'listening'] as const).map((s) => skills[s]?.theta).filter((x): x is number => x !== undefined);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 1;
}

/** θ of the skill each practice area trains; skills without a measurement count as average. */
export function areaTheta(area: Area | 'reading' | 'listening', skills: PlanContext['skills']): number {
  const mean = meanTheta(skills);
  switch (area) {
    case 'cards':
      return theta(skills, 'vocabulary', mean);
    case 'grammar':
      return theta(skills, 'grammar', mean);
    case 'reading':
      return theta(skills, 'reading', mean);
    case 'listening':
      return theta(skills, 'listening', mean);
    case 'input':
      return Math.min(theta(skills, 'reading', mean), theta(skills, 'listening', mean));
    case 'output':
      return theta(skills, 'writing', mean);
  }
}

const GOAL_WEIGHTS: Record<Goal, Partial<Record<Area, number>>> = {
  exam: { output: 1.15, input: 1.1 },
  work: { output: 1.15, grammar: 1.05 },
  daily: { input: 1.1, output: 1.1, cards: 1.05 },
  literature: { input: 1.2, cards: 1.05 },
};

function weightsFor(ctx: PlanContext, bias?: Partial<Record<Area, number>>): Record<Area, number> {
  const base = BASE_MINUTES[ctx.profile.dailyMinutes] ?? BASE_MINUTES[30];
  const mean = meanTheta(ctx.skills);
  const w = {} as Record<Area, number>;
  for (const area of Object.keys(base) as Area[]) {
    // weaker areas get up to 40 % more time, stronger ones down to 75 %
    let f = Math.min(1.4, Math.max(0.75, 1 + 0.25 * (mean - areaTheta(area, ctx.skills))));
    for (const goal of ctx.profile.goals) f *= GOAL_WEIGHTS[goal]?.[area] ?? 1;
    f *= bias?.[area] ?? 1;
    w[area] = base[area] * f;
  }
  // normalise to the daily budget
  const total = Object.values(w).reduce((a, b) => a + b, 0);
  for (const area of Object.keys(w) as Area[]) w[area] = Math.max(2, Math.round((w[area] / total) * ctx.profile.dailyMinutes));
  return w;
}

function inputSkillFor(ctx: PlanContext): WeeklyPlan['inputSkill'] {
  if (!ctx.skills.listening) return ctx.profile.goals.includes('literature') ? 'reading' : 'alternate';
  const r = areaTheta('reading', ctx.skills);
  const l = areaTheta('listening', ctx.skills);
  if (l < r - 0.3) return 'listening';
  if (r < l - 0.3) return 'reading';
  if (ctx.profile.goals.includes('literature')) return 'reading';
  if (ctx.profile.goals.includes('daily')) return 'listening';
  return 'alternate';
}

const EXAM_TOPICS = ['b1-konjunktiv2', 'b2-konnektoren', 'c1-nominalstil', 'c1-konnektoren', 'b2-passiv-erweitert', 'c1-konjunktiv1'];
const WORK_TOPICS = ['a2-konjunktiv-hoeflich', 'b1-passiv', 'b2-nominalisierung', 'c1-funktionsverbgefuege', 'c2-register'];
const LIT_TOPICS = ['b1-praeteritum', 'b1-plusquamperfekt', 'c1-partizipialattribute', 'c2-partizipialsaetze', 'c1-konjunktiv1'];

/** Grammar topics in priority order: recurring mistakes, gaps at the current level, then the next level. */
export function topicQueue(ctx: PlanContext, grammarTarget: Level): string[] {
  const g = levelNumber(grammarTarget);
  const progress = new Map(ctx.topicProgress.map((p) => [p.topicId, p]));
  const fromMistakes = new Map<string, number>();
  for (const m of ctx.mistakes) {
    const tag = (ERROR_TAGS as Record<string, ErrorTag>)[m.tag];
    if (!tag) continue;
    for (const topic of tag.topics) fromMistakes.set(topic, (fromMistakes.get(topic) ?? 0) + Math.min(m.count, 6));
  }
  const goalTopics = new Set<string>([
    ...(ctx.profile.goals.includes('exam') ? EXAM_TOPICS : []),
    ...(ctx.profile.goals.includes('work') ? WORK_TOPICS : []),
    ...(ctx.profile.goals.includes('literature') ? LIT_TOPICS : []),
  ]);

  const scored = TOPICS.map((t, index) => {
    const lvl = levelNumber(t.level);
    let score = 0;
    if (lvl === g) score += 2;
    else if (lvl === g - 1) score += 1.6;
    else if (lvl === g + 1) score += 0.9;
    else if (lvl < g - 1) score += 0.4;
    else score -= 1; // two or more levels above: not yet
    // mistakes only count for topics that are not far above the learner
    if (lvl <= g + 1) score += 0.8 * (fromMistakes.get(t.id) ?? 0);
    if (goalTopics.has(t.id) && lvl <= g + 1) score += 0.6;
    const p = progress.get(t.id);
    if (p) {
      if (p.attempts >= 8 && p.mastery >= 0.85) score -= 5;
      else if (p.mastery >= 0.7) score -= 1;
      if (ctx.now - p.lastAt < 2 * 86_400_000) score -= 1.5;
    }
    // keep the natural order within a level as a tie-breaker
    return { id: t.id, score: score - index * 0.001 };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 24)
    .map((s) => s.id);
}

/** Monday of the week containing `ms`, as YYYY-MM-DD (local time). */
export function weekStartOf(ms: number): string {
  const d = new Date(ms);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function targetsFrom(skills: PlanContext['skills']): Record<Skill, Level> {
  const mean = meanTheta(skills);
  const t = (s: Skill, fb: number) => thetaLevel(skills[s]?.theta ?? fb);
  return {
    grammar: t('grammar', mean),
    vocabulary: t('vocabulary', mean),
    reading: t('reading', mean),
    listening: t('listening', mean),
    writing: t('writing', mean),
  };
}

export function buildPlan(ctx: PlanContext): WeeklyPlan {
  const targets = targetsFrom(ctx.skills);
  const notes = ['Plan created from your placement test results.'];
  const inputSkill = inputSkillFor(ctx);
  if (inputSkill !== 'alternate') notes.push(`${inputSkill === 'listening' ? 'Listening' : 'Reading'} is your weaker input skill, so it gets more sessions.`);
  return {
    weekStart: weekStartOf(ctx.now),
    createdAt: ctx.now,
    weights: weightsFor(ctx),
    targets,
    newCardsPerDay: Math.min(NEW_CARDS[ctx.profile.dailyMinutes] ?? 15, ctx.profile.srs.maxNewPerDay),
    topicQueue: topicQueue(ctx, targets.grammar),
    inputSkill,
    notes,
  };
}

// ───────────────────── weekly adjustment ─────────────────────

const MODULE_AREA: Record<string, Area | 'reading' | 'listening'> = {
  grammar: 'grammar',
  reading: 'reading',
  listening: 'listening',
  output: 'output',
  writing: 'output',
};

export interface WeekStats {
  accuracy: Partial<Record<Area | 'reading' | 'listening', { correct: number; total: number }>>;
  retention?: number;
  reviews: number;
}

export function weekStats(ctx: PlanContext): WeekStats {
  const accuracy: WeekStats['accuracy'] = {};
  for (const a of ctx.attempts) {
    const area = MODULE_AREA[a.module];
    if (!area) continue;
    const cell = (accuracy[area] ??= { correct: 0, total: 0 });
    cell.total++;
    cell.correct += a.score ?? (a.correct ? 1 : 0);
  }
  // FSRS true retention: share of review-state cards remembered (rating ≥ Hard)
  const reviewState = ctx.reviews.filter((r) => r.state === 2);
  const retention = reviewState.length >= 20 ? reviewState.filter((r) => r.rating >= 2).length / reviewState.length : undefined;
  return { accuracy, retention, reviews: ctx.reviews.length };
}

/** Elo-style update of skill estimates from a week of practice (max ±0.5 per week). */
export function practiceUpdates(ctx: PlanContext): Partial<Record<Skill, number>> {
  const out: Partial<Record<Skill, number>> = {};
  for (const skill of ['grammar', 'reading', 'listening', 'writing'] as const) {
    const st = ctx.skills[skill];
    if (!st) continue;
    let th = st.theta;
    for (const a of ctx.attempts) {
      if (a.skill !== skill || !a.level) continue;
      const expected = pCorrect(th, levelNumber(a.level), 0.15);
      th += 0.04 * ((a.score ?? (a.correct ? 1 : 0)) - expected);
    }
    out[skill] = Math.max(st.theta - 0.5, Math.min(st.theta + 0.5, th));
  }
  return out;
}

export function adjustPlan(prev: WeeklyPlan, ctx: PlanContext): WeeklyPlan {
  const stats = weekStats(ctx);
  const notes: string[] = [];
  const targets = { ...targetsFrom(ctx.skills) };
  const bias: Partial<Record<Area, number>> = {};
  const label: Record<string, string> = { grammar: 'Grammar', reading: 'Reading', listening: 'Listening', output: 'Writing/speaking', input: 'Reading/listening' };

  for (const [area, cell] of Object.entries(stats.accuracy)) {
    if (!cell || cell.total < 8) continue;
    const acc = cell.correct / cell.total;
    const pct = Math.round(acc * 100);
    const skill: Skill | undefined = area === 'output' ? 'writing' : area === 'grammar' || area === 'reading' || area === 'listening' ? area : undefined;
    if (acc >= 0.85) {
      if (skill) {
        targets[skill] = shiftLevel(prev.targets[skill] ?? targets[skill], 1);
        // never more than one level above the measured level
        if (levelNumber(targets[skill]) > levelNumber(thetaLevel(ctx.skills[skill]?.theta ?? 1)) + 1) targets[skill] = shiftLevel(thetaLevel(ctx.skills[skill]?.theta ?? 1), 1);
      }
      notes.push(`${label[area]} accuracy was ${pct}% → harder material${skill ? ` (${targets[skill]})` : ''}.`);
    } else if (acc <= 0.6) {
      if (skill) targets[skill] = shiftLevel(prev.targets[skill] ?? targets[skill], -1);
      const a: Area = area === 'reading' || area === 'listening' ? 'input' : (area as Area);
      bias[a] = (bias[a] ?? 1) * 1.15;
      notes.push(`${label[area]} accuracy was ${pct}% → easier material${skill ? ` (${targets[skill]})` : ''} and a little more time.`);
    } else if (skill) {
      targets[skill] = prev.targets[skill] ?? targets[skill];
    }
  }

  let newCards = prev.newCardsPerDay;
  const budgetReviews = ctx.profile.dailyMinutes * 6;
  if (ctx.avgReviewsPerDay > budgetReviews) {
    newCards = Math.round(newCards * 0.7);
    notes.push(`About ${Math.round(ctx.avgReviewsPerDay)} reviews a day is a lot for ${ctx.profile.dailyMinutes} minutes → fewer new words (${newCards}/day).`);
  } else if (stats.retention !== undefined && stats.retention < 0.8) {
    newCards = Math.round(newCards * 0.8);
    notes.push(`Flashcard recall was ${Math.round(stats.retention * 100)}% → fewer new words (${newCards}/day) to consolidate.`);
  } else if (stats.retention !== undefined && stats.retention > 0.92) {
    newCards = Math.round(newCards * 1.2 + 1);
    notes.push(`Flashcard recall was ${Math.round(stats.retention * 100)}% → more new words (${newCards}/day).`);
  }
  newCards = Math.max(3, Math.min(ctx.profile.srs.maxNewPerDay, newCards));

  if (notes.length === 0) notes.push('Not enough practice data this week for changes — keep going!');
  return {
    weekStart: weekStartOf(ctx.now),
    createdAt: ctx.now,
    weights: weightsFor(ctx, bias),
    targets,
    newCardsPerDay: newCards,
    topicQueue: topicQueue(ctx, targets.grammar),
    inputSkill: inputSkillFor(ctx),
    notes,
  };
}

export const ALL_LEVELS = LEVELS;
