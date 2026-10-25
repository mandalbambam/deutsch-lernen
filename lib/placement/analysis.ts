import { errorTag } from '@/content/error-tags';
import type { BankItem } from '@/content/placement/types';
import { LEVELS, levelNumber, type Level } from '@/lib/cefr';
import type { AssessmentAnalysis, ItemResponse, SkillEstimate, TestedSkill } from '@/lib/db/types';
import { hashString, mulberry32, shuffled } from '@/lib/random';

const SKILL_NAMES: Record<TestedSkill, string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
};

/** Error tags implied by a response (the chosen distractor's tag, or the item tag). */
export function errorTagsFor(item: BankItem, choice: number | null, correct: boolean): string[] {
  if (correct) return [];
  if (choice === null || choice === 0) return [item.tag];
  return [item.wrong?.[choice - 1] ?? item.tag];
}

/** Deterministic option order for an item: displayed[i] = original index. */
export function optionOrder(item: BankItem, seed: number): number[] {
  const rand = mulberry32(seed ^ hashString(item.id));
  return shuffled(
    item.options.map((_, i) => i),
    rand,
  );
}

export function analyze(
  responses: ItemResponse[],
  skills: Partial<Record<TestedSkill, SkillEstimate>>,
): AssessmentAnalysis {
  const byLevel: AssessmentAnalysis['byLevel'] = {};
  for (const r of responses) {
    const s = (byLevel[r.skill] ??= {});
    const cell = (s[r.level] ??= { correct: 0, total: 0 });
    cell.total++;
    if (r.correct) cell.correct++;
  }

  const tested = (Object.keys(skills) as TestedSkill[]).filter((s) => skills[s]);
  const mean = tested.reduce((sum, s) => sum + skills[s]!.theta, 0) / Math.max(1, tested.length);
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const sorted = [...tested].sort((a, b) => skills[b]!.theta - skills[a]!.theta);
  for (const s of sorted) {
    const est = skills[s]!;
    if (est.theta >= mean + 0.35) strengths.push(`${SKILL_NAMES[s]} is ahead of your other skills (${est.level}).`);
    if (est.theta <= mean - 0.35) weaknesses.push(`${SKILL_NAMES[s]} is behind your other skills (${est.level}).`);
  }
  if (strengths.length === 0 && weaknesses.length === 0 && sorted.length > 1) {
    strengths.push(`Your skills are well balanced; ${SKILL_NAMES[sorted[0]].toLowerCase()} is slightly strongest.`);
    weaknesses.push(`${SKILL_NAMES[sorted[sorted.length - 1]]} is slightly behind — a good place to focus.`);
  }

  // patterns: tags of wrong answers on items that should be within reach weigh more
  const weights = new Map<string, { w: number; count: number; items: string[] }>();
  for (const r of responses) {
    if (r.correct) continue;
    const own = skills[r.skill];
    const reach = own ? levelNumber(r.level) <= Math.floor(own.theta + 0.5) : true;
    for (const tag of r.errorTags) {
      const e = weights.get(tag) ?? { w: 0, count: 0, items: [] };
      e.w += reach ? 1 : 0.4;
      e.count++;
      e.items.push(r.itemId);
      weights.set(tag, e);
    }
  }
  // grammar/vocabulary patterns are actionable; comprehension tags only fill in when nothing else shows up
  const isComprehension = (tag: string) => tag.startsWith('reading.') || tag.startsWith('listening.');
  const ranked = [...weights.entries()].sort((a, b) => b[1].w - a[1].w);
  const specific = ranked.filter(([tag]) => !isComprehension(tag));
  const errorPatterns = (specific.length > 0 ? specific : ranked)
    .slice(0, 6)
    .map(([tag, e]) => ({ tag, count: e.count, itemIds: e.items }));

  // tag-level strengths: tags answered correctly ≥ 2 times at or above the learner's level
  const solid = new Map<string, number>();
  for (const r of responses) {
    if (!r.correct) continue;
    const own = skills[r.skill];
    if (!own || levelNumber(r.level) < Math.floor(own.theta + 0.5)) continue;
    if (r.tag && !r.tag.startsWith('reading.') && !r.tag.startsWith('listening.')) {
      solid.set(r.tag, (solid.get(r.tag) ?? 0) + 1);
    }
  }
  for (const [tag, n] of solid) {
    if (n >= 2 && !weights.has(tag)) strengths.push(`Solid: ${errorTag(tag).label.toLowerCase()}.`);
  }

  return { strengths, weaknesses, errorPatterns, byLevel };
}

export function overallFrom(skills: Partial<Record<TestedSkill, SkillEstimate>>): { theta: number; level: Level } | undefined {
  const vals = Object.values(skills).filter(Boolean) as SkillEstimate[];
  if (vals.length === 0) return undefined;
  const theta = vals.reduce((s, v) => s + v.theta, 0) / vals.length;
  return { theta, level: LEVELS[Math.min(5, Math.max(0, Math.floor(theta + 0.5) - 1))] };
}
