import { describe, expect, it } from 'vitest';
import { ALL_ITEMS, ITEM_BY_ID, PASSAGES } from '@/content/placement';
import { levelNumber } from '@/lib/cefr';
import { validatePlacementBank } from '@/lib/content-validation';
import type { TestedSkill } from '@/lib/db/types';
import { analyze, errorTagsFor, optionOrder } from '@/lib/placement/analysis';
import { advance, estimates, placementConfig, record, startEngine, thetaLevel, type EngineState } from '@/lib/placement/engine';
import { hashString, mulberry32 } from '@/lib/random';

const bank = { items: ALL_ITEMS, passages: PASSAGES };
const SKILLS: TestedSkill[] = ['grammar', 'vocabulary', 'reading', 'listening'];

/**
 * Simulated learner whose answers follow a *noisier* model than the engine assumes:
 * every item has its own hidden difficulty shift (±0.4 levels) and discrimination (1.4–2.6).
 * Unknown items are either guessed or answered with "I don't know".
 */
function simulate(trueTheta: Record<TestedSkill, number>, seed: number, skills = SKILLS): EngineState {
  const rand = mulberry32(seed * 7919 + 17);
  let state = advance(startEngine(placementConfig(skills), seed), bank);
  for (let guard = 0; !state.finished && guard < 80; guard++) {
    const id = state.pending[0];
    const item = ITEM_BY_ID[id];
    const lvl = levelNumber(item.level);
    const h = hashString(id);
    const shift = ((h % 1000) / 1000 - 0.5) * 0.8;
    const a = 1.4 + (((h >>> 10) % 1000) / 1000) * 1.2;
    const pKnow = 0.97 / (1 + Math.exp(-a * (trueTheta[item.skill] - (lvl - 0.2 + shift))));
    let correct = false;
    let dontKnow = false;
    if (rand() < pKnow) correct = true;
    else if (rand() < 0.5) dontKnow = true;
    else correct = rand() < 1 / item.options.length;
    state = record(state, { itemId: id, skill: item.skill, level: lvl, correct, guess: dontKnow ? 0 : 1 / item.options.length });
    state = advance(state, bank);
  }
  return state;
}

describe('placement bank', () => {
  it('passes content validation (≥ 15 items per level per skill, consistent tags)', () => {
    const report = validatePlacementBank();
    expect(report.errors).toEqual([]);
  });

  it('shuffles options deterministically and keeps every option', () => {
    const item = ALL_ITEMS[0];
    const order = optionOrder(item, 42);
    expect([...order].sort()).toEqual(item.options.map((_, i) => i));
    expect(optionOrder(item, 42)).toEqual(order);
  });

  it('maps wrong choices to error tags', () => {
    const item = ITEM_BY_ID['g-a2-05'];
    expect(errorTagsFor(item, 0, true)).toEqual([]);
    expect(errorTagsFor(item, 1, false)).toEqual(['case.two-way']);
    expect(errorTagsFor(item, null, false)).toEqual([item.tag]);
  });
});

describe('adaptive engine', () => {
  it('asks 30–42 questions and covers all four skills', () => {
    for (let seed = 1; seed <= 10; seed++) {
      const s = simulate({ grammar: 3, vocabulary: 3, reading: 3, listening: 3 }, seed);
      expect(s.answers.length).toBeGreaterThanOrEqual(32);
      expect(s.answers.length).toBeLessThanOrEqual(42);
      for (const skill of SKILLS) expect(s.answers.filter((x) => x.skill === skill).length).toBeGreaterThanOrEqual(6);
      expect(new Set(s.answers.map((x) => x.itemId)).size).toBe(s.answers.length);
    }
  });

  it('starts around B1', () => {
    const s = advance(startEngine(placementConfig(SKILLS), 3), bank);
    expect(ITEM_BY_ID[s.pending[0]].level).toBe('B1');
  });

  it('places simulated learners at their true level', () => {
    let exact = 0;
    let within1 = 0;
    let skillWithin1 = 0;
    let skillTotal = 0;
    let runs = 0;
    for (let level = 1; level <= 6; level++) {
      for (let seed = 1; seed <= 25; seed++) {
        // true ability in the middle of the band, skills spread a little around it
        const rand = mulberry32(level * 1000 + seed);
        const t = () => Math.min(6.4, Math.max(0.6, level + (rand() - 0.5) * 0.6));
        const truth = { grammar: t(), vocabulary: t(), reading: t(), listening: t() };
        const s = simulate(truth, level * 100 + seed);
        const est = estimates(s);
        const mean = SKILLS.reduce((sum, k) => sum + est[k]!.theta, 0) / 4;
        const trueMean = SKILLS.reduce((sum, k) => sum + truth[k], 0) / 4;
        const diff = Math.abs(levelNumber(thetaLevel(mean)) - levelNumber(thetaLevel(trueMean)));
        if (diff === 0) exact++;
        if (diff <= 1) within1++;
        for (const k of SKILLS) {
          skillTotal++;
          if (Math.abs(levelNumber(est[k]!.level) - levelNumber(thetaLevel(truth[k]))) <= 1) skillWithin1++;
        }
        runs++;
      }
    }
    // overall level: mostly exact, practically always within one band
    expect(exact / runs).toBeGreaterThan(0.7);
    expect(within1 / runs).toBeGreaterThan(0.97);
    expect(skillWithin1 / skillTotal).toBeGreaterThan(0.9);
  });

  it('works without the listening section', () => {
    const s = simulate({ grammar: 4, vocabulary: 4, reading: 4, listening: 4 }, 7, ['grammar', 'vocabulary', 'reading']);
    expect(s.answers.some((a) => a.skill === 'listening')).toBe(false);
    expect(s.answers.length).toBeGreaterThanOrEqual(24);
    expect(estimates(s).listening).toBeUndefined();
  });

  it('produces an analysis with error patterns', () => {
    const s = simulate({ grammar: 2.5, vocabulary: 4, reading: 3.5, listening: 3 }, 11);
    const est = estimates(s);
    const responses = s.answers.map((a) => {
      const item = ITEM_BY_ID[a.itemId];
      return {
        itemId: a.itemId,
        skill: a.skill,
        level: item.level,
        correct: a.correct,
        choice: a.correct ? 0 : 1,
        ms: 1000,
        errorTags: errorTagsFor(item, a.correct ? 0 : 1, a.correct),
        tag: item.tag,
      };
    });
    const skillEst = Object.fromEntries(
      Object.entries(est).map(([k, v]) => [k, { theta: v!.theta, se: v!.se, level: v!.level, correct: v!.correct, total: v!.total }]),
    );
    const analysis = analyze(responses, skillEst);
    expect(analysis.errorPatterns.length).toBeGreaterThan(0);
    expect(analysis.strengths.length + analysis.weaknesses.length).toBeGreaterThan(0);
  });
});
