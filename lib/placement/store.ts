import { ALL_ITEMS, ITEM_BY_ID, PASSAGES } from '@/content/placement';
import { db, uid } from '@/lib/db';
import { logMistakes } from '@/lib/db/mistakes';
import type { Assessment, ItemResponse, SkillEstimate, TestedSkill } from '@/lib/db/types';
import { analyze, overallFrom } from './analysis';
import {
  advance,
  estimates,
  levelCheckConfig,
  placementConfig,
  startEngine,
  type Bank,
  type EngineState,
} from './engine';

export const BANK: Bank = { items: ALL_ITEMS, passages: PASSAGES };

export async function getInProgress(kind: Assessment['kind']): Promise<Assessment | undefined> {
  const all = await db.assessments.where('status').equals('in-progress').toArray();
  return all.filter((a) => a.kind === kind).sort((a, b) => b.startedAt - a.startedAt)[0];
}

/** Items answered in the previous test of the same kind are excluded, so retakes see new questions. */
async function recentlySeen(kind: Assessment['kind']): Promise<string[]> {
  const done = await db.assessments.where('status').equals('done').toArray();
  const last = done.filter((a) => a.kind === kind || kind === 'levelcheck').sort((a, b) => b.takenAt - a.takenAt).slice(0, 2);
  return [...new Set(last.flatMap((a) => a.responses.map((r) => r.itemId)))];
}

export async function startAssessment(
  kind: Assessment['kind'],
  skills: TestedSkill[],
  priorTheta?: number,
): Promise<Assessment> {
  // remove abandoned attempts of the same kind
  const stale = (await db.assessments.where('status').equals('in-progress').toArray()).filter((a) => a.kind === kind);
  await db.assessments.bulkDelete(stale.map((a) => a.id));

  const seed = Math.floor(Math.random() * 2 ** 31);
  const exclude = await recentlySeen(kind);
  const config = kind === 'placement' ? placementConfig(skills) : levelCheckConfig(skills, priorTheta ?? 3);
  let engine = advance(startEngine(config, seed, exclude), BANK);
  if (engine.finished) {
    // the exclusion list was too strict (many retakes): start again without it
    engine = advance(startEngine(config, seed, []), BANK);
  }
  const a: Assessment = {
    id: uid(),
    kind,
    status: 'in-progress',
    startedAt: Date.now(),
    takenAt: Date.now(),
    skills: {},
    responses: [],
    engine,
    listeningSkipped: !skills.includes('listening'),
  };
  await db.assessments.put(a);
  return a;
}

export async function saveProgress(a: Assessment): Promise<void> {
  await db.assessments.put(a);
}

export async function discardAssessment(id: string): Promise<void> {
  await db.assessments.delete(id);
}

/** Computes the final result, stores it and updates the learner's skill levels and error profile. */
export async function finishAssessment(a: Assessment): Promise<Assessment> {
  const engine = a.engine as EngineState;
  const est = estimates(engine);
  const skills: Partial<Record<TestedSkill, SkillEstimate>> = {};
  for (const [k, v] of Object.entries(est)) {
    if (v) skills[k as TestedSkill] = { theta: v.theta, se: v.se, level: v.level, correct: v.correct, total: v.total };
  }
  const done: Assessment = {
    ...a,
    status: 'done',
    takenAt: Date.now(),
    skills,
    overall: overallFrom(skills),
    analysis: analyze(a.responses, skills),
  };
  const now = Date.now();
  await db.transaction('rw', db.assessments, db.skillState, async () => {
    await db.assessments.put(done);
    for (const [skill, s] of Object.entries(skills)) {
      await db.skillState.put({
        skill: skill as TestedSkill,
        theta: s!.theta,
        se: s!.se,
        level: s!.level,
        updatedAt: now,
        source: a.kind,
      });
    }
  });
  await logMistakes(
    a.responses
      .filter((r) => !r.correct)
      .flatMap((r) => {
        const item = ITEM_BY_ID[r.itemId];
        const right = item?.options[0] ?? '';
        const wrong = r.choice === null ? '—' : (item?.options[r.choice] ?? '');
        return r.errorTags.map((tag) => ({ tag, example: { wrong, right, context: item?.prompt } }));
      }),
    a.kind,
  );
  return done;
}

export function responseFor(
  itemId: string,
  choice: number | null,
  ms: number,
  errorTags: string[],
): ItemResponse {
  const item = ITEM_BY_ID[itemId];
  return {
    itemId,
    skill: item.skill,
    level: item.level,
    correct: choice === 0,
    choice,
    ms,
    errorTags,
    tag: item.tag,
  };
}
