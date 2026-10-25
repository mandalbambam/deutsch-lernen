/**
 * Builds today's session from the weekly plan: flashcards, one grammar topic, reading or
 * listening, and an output task — ordered so the weakest skill comes first.
 */
import type { Level } from '@/lib/cefr';
import type { Profile, SessionBlock, SessionBlockKind, Skill, SkillState, WeeklyPlan } from '@/lib/db/types';
import { areaTheta } from './plan';

export type OutputTask = 'translate' | 'speak' | 'write';

export interface SessionInputs {
  plan: WeeklyPlan;
  profile: Profile;
  skills: Partial<Record<Skill, SkillState>>;
  date: string;
  /** first grammar topic of the queue that was not practised in the last two days */
  grammarTopic?: string;
  ttsAvailable: boolean;
  sttAvailable: boolean;
}

export function dayIndex(date: string): number {
  return Math.floor(new Date(`${date}T12:00:00Z`).getTime() / 86_400_000);
}

export function inputKindFor(plan: WeeklyPlan, date: string, ttsAvailable: boolean): 'reading' | 'listening' {
  if (!ttsAvailable) return 'reading';
  const d = dayIndex(date);
  if (plan.inputSkill === 'alternate') return d % 2 === 0 ? 'reading' : 'listening';
  // the weaker input skill gets two days out of three
  const other = plan.inputSkill === 'reading' ? 'listening' : 'reading';
  return d % 3 === 2 ? other : plan.inputSkill;
}

export function outputTaskFor(date: string, sttAvailable: boolean): OutputTask {
  const tasks: OutputTask[] = sttAvailable ? ['translate', 'speak', 'write'] : ['translate', 'write'];
  return tasks[dayIndex(date) % tasks.length];
}

export function buildSessionBlocks(input: SessionInputs): SessionBlock[] {
  const { plan, skills } = input;
  const inputKind = inputKindFor(plan, input.date, input.ttsAvailable);
  const blocks: (SessionBlock & { theta: number })[] = [
    { kind: 'cards', minutes: plan.weights.cards, done: false, theta: areaTheta('cards', skills) },
    { kind: 'grammar', minutes: plan.weights.grammar, ref: input.grammarTopic ?? plan.topicQueue[0], done: false, theta: areaTheta('grammar', skills) },
    { kind: inputKind, minutes: plan.weights.input, done: false, theta: areaTheta(inputKind, skills) },
    { kind: 'output', minutes: plan.weights.output, ref: outputTaskFor(input.date, input.sttAvailable), done: false, theta: areaTheta('output', skills) },
  ];
  // weakest skill first; on (near) ties keep the natural order: cards → grammar → input → output
  return blocks
    .map((b, order) => ({ ...b, order }))
    .sort((a, b) => (Math.abs(a.theta - b.theta) < 0.05 ? a.order - b.order : a.theta - b.theta))
    .map((b) => ({ kind: b.kind, minutes: b.minutes, ref: b.ref, done: b.done }));
}

export function targetLevelFor(kind: SessionBlockKind, plan: WeeklyPlan): Level {
  switch (kind) {
    case 'cards':
      return plan.targets.vocabulary;
    case 'grammar':
      return plan.targets.grammar;
    case 'reading':
      return plan.targets.reading;
    case 'listening':
      return plan.targets.listening;
    case 'output':
      return plan.targets.writing;
  }
}
