import { describe, expect, it } from 'vitest';
import { DEFAULT_PROFILE } from '@/lib/db/profile';
import type { Attempt, SkillState } from '@/lib/db/types';
import { adjustPlan, buildPlan, topicQueue, type PlanContext } from '@/lib/plan/plan';
import { buildSessionBlocks, inputKindFor } from '@/lib/plan/session';
import { computeStreak } from '@/lib/activity';
import { diffWords } from '@/lib/text/diff';
import { TOPIC_BY_ID } from '@/content/grammar/catalog';

const NOW = new Date('2026-10-15T10:00:00').getTime();

function state(skill: SkillState['skill'], theta: number): SkillState {
  return { skill, theta, se: 0.4, level: 'B1', updatedAt: NOW, source: 'placement' };
}

function ctx(over: Partial<PlanContext> = {}): PlanContext {
  return {
    profile: { ...DEFAULT_PROFILE, dailyMinutes: 30, goals: ['daily'], onboarded: true },
    skills: { grammar: state('grammar', 3.1), vocabulary: state('vocabulary', 3.4), reading: state('reading', 3.5), listening: state('listening', 2.6) },
    mistakes: [],
    topicProgress: [],
    attempts: [],
    reviews: [],
    avgReviewsPerDay: 30,
    now: NOW,
    ...over,
  };
}

describe('weekly plan', () => {
  it('fills the daily time budget and favours the weakest area', () => {
    const plan = buildPlan(ctx());
    const total = Object.values(plan.weights).reduce((a, b) => a + b, 0);
    expect(Math.abs(total - 30)).toBeLessThanOrEqual(2);
    expect(plan.inputSkill).toBe('listening');
    expect(plan.targets.listening).toBe('B1');
    expect(plan.targets.reading).toBe('B2');
  });

  it('prioritises grammar topics at the learner level and from mistakes', () => {
    const c = ctx({ mistakes: [{ tag: 'case.two-way', count: 5, firstAt: NOW, lastAt: NOW, examples: [] }] });
    const queue = topicQueue(c, 'B1');
    expect(queue[0]).toBe('a2-wechselpraepositionen');
    expect(queue.slice(0, 8).some((id) => TOPIC_BY_ID[id].level === 'B1')).toBe(true);
    expect(queue.some((id) => TOPIC_BY_ID[id].level === 'C2')).toBe(false);
  });

  it('adjusts difficulty from a week of results', () => {
    const plan = buildPlan(ctx());
    const attempts: Attempt[] = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      at: NOW,
      module: 'listening',
      skill: 'listening',
      itemId: `x${i}`,
      level: 'B1',
      correct: i % 2 === 0,
      errorTags: [],
    }));
    const next = adjustPlan(plan, ctx({ attempts, now: NOW + 8 * 86_400_000 }));
    expect(next.targets.listening).toBe('A2');
    expect(next.notes.join(' ')).toMatch(/Listening accuracy was 50%/);
  });

  it('orders session blocks weakest first and alternates input skills', () => {
    const plan = buildPlan(ctx());
    const blocks = buildSessionBlocks({ plan, profile: ctx().profile, skills: ctx().skills, date: '2026-10-15', ttsAvailable: true, sttAvailable: true });
    expect(blocks.map((b) => b.kind)).toHaveLength(4);
    expect(blocks.every((b) => b.minutes >= 2)).toBe(true);
    const kinds = ['2026-10-14', '2026-10-15', '2026-10-16'].map((d) => inputKindFor(plan, d, true));
    expect(kinds.filter((k) => k === 'listening').length).toBe(2);
    expect(inputKindFor(plan, '2026-10-15', false)).toBe('reading');
  });
});

describe('streak', () => {
  it('counts consecutive days with ≥ 5 minutes', () => {
    const d = (date: string, sec: number) => ({ date, seconds: { cards: sec }, reviews: 0, newCards: 0 });
    const days = [d('2026-10-12', 600), d('2026-10-13', 400), d('2026-10-14', 310), d('2026-10-15', 30)];
    expect(computeStreak(days, new Date('2026-10-15T20:00:00'))).toBe(3);
    expect(computeStreak([...days, d('2026-10-15', 900)], new Date('2026-10-15T20:00:00'))).toBe(4);
  });
});

describe('word diff', () => {
  it('scores dictation answers with case and umlaut tolerance', () => {
    const r = diffWords('Ich gehe heute über die Straße.', 'ich gehe heute ueber die strasse');
    expect(r.score).toBe(1);
    expect(r.exact).toBe(false);
    expect(r.caseErrors).toBe(2);
    expect(r.umlautSubstitutes).toBe(2);
  });
  it('marks wrong and missing words', () => {
    const r = diffWords('Ich habe keine Zeit.', 'Ich hat Zeit');
    expect(r.ops.map((o) => o.type)).toEqual(['equal', 'wrong', 'missing', 'equal']);
    expect(r.ops[1]).toMatchObject({ expected: 'habe', actual: 'hat' });
    expect(r.score).toBeCloseTo(0.5);
  });
});

describe('session order without measurements', () => {
  it('starts with flashcards when skills are equal or unmeasured', () => {
    const skills = { grammar: state('grammar', 1), vocabulary: state('vocabulary', 1), reading: state('reading', 1) };
    const c = ctx({ skills });
    const plan = buildPlan(c);
    const blocks = buildSessionBlocks({ plan, profile: c.profile, skills, date: '2026-10-15', ttsAvailable: false, sttAvailable: false });
    expect(blocks.map((b) => b.kind)).toEqual(['cards', 'grammar', 'reading', 'output']);
  });
});
