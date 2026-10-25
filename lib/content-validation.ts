/**
 * Consistency checks for the hand-written content (run by `npm run validate:content` and the tests).
 */
import { SCENARIOS } from '@/content/conversation/scenarios';
import { ERROR_TAGS } from '@/content/error-tags';
import { LESSONS } from '@/content/grammar';
import { TOPICS, TOPIC_BY_ID } from '@/content/grammar/catalog';
import { EXTRA_EXERCISES } from '@/content/grammar/extra';
import { INTERESTS } from '@/content/interests';
import { LISTENING } from '@/content/listening/scripts';
import { ALL_ITEMS, PASSAGES } from '@/content/placement';
import { TEXTS, type ComprehensionQ } from '@/content/reading';
import { WRITING_TASKS } from '@/content/writing/tasks';
import { LEVELS } from '@/lib/cefr';
import { TESTED_SKILLS } from '@/lib/db/types';
import { checkAnswer } from '@/lib/exercise/check';
import { ADVANCED_DRILL_KINDS } from '@/lib/exercise/types';
import { wordCount } from '@/lib/reading/select';

export interface ValidationReport {
  errors: string[];
  counts: Record<string, Record<string, number>>;
}

export function validatePlacementBank(): ValidationReport {
  const errors: string[] = [];
  const counts: Record<string, Record<string, number>> = {};
  const ids = new Set<string>();

  for (const item of ALL_ITEMS) {
    if (ids.has(item.id)) errors.push(`duplicate id ${item.id}`);
    ids.add(item.id);
    (counts[item.skill] ??= {})[item.level] = (counts[item.skill][item.level] ?? 0) + 1;
    if (!item.prompt.trim()) errors.push(`${item.id}: empty prompt`);
    if (item.options.length < 3 || item.options.length > 4) errors.push(`${item.id}: needs 3–4 options`);
    if (new Set(item.options.map((o) => o.trim().toLowerCase())).size !== item.options.length)
      errors.push(`${item.id}: duplicate options`);
    if (item.options.some((o) => !o.trim())) errors.push(`${item.id}: empty option`);
    if (!item.explain.trim()) errors.push(`${item.id}: missing explanation`);
    if (!(item.tag in ERROR_TAGS)) errors.push(`${item.id}: unknown tag ${item.tag}`);
    for (const t of item.wrong ?? []) if (t && !(t in ERROR_TAGS)) errors.push(`${item.id}: unknown wrong-tag ${t}`);
    if (item.wrong && item.wrong.length > item.options.length - 1) errors.push(`${item.id}: too many wrong-tags`);
    if (item.skill === 'grammar') {
      if (!item.topic) errors.push(`${item.id}: grammar item without topic`);
      else if (!TOPIC_BY_ID[item.topic]) errors.push(`${item.id}: unknown topic ${item.topic}`);
      if (!item.prompt.includes('___') && !item.prompt.includes('?')) errors.push(`${item.id}: no gap in prompt`);
    }
  }

  for (const p of PASSAGES) {
    if (!p.text && !p.lines?.length) errors.push(`${p.id}: passage without text`);
    if (p.questions.length === 0) errors.push(`${p.id}: passage without questions`);
  }

  for (const skill of TESTED_SKILLS) {
    for (const level of LEVELS) {
      const n = counts[skill]?.[level] ?? 0;
      if (n < 15) errors.push(`${skill} ${level}: only ${n} items (need ≥ 15)`);
    }
  }
  return { errors, counts };
}

const DRILL_KINDS = new Set<string>(['gender', 'plural', 'case-akk', 'case-dat', 'case-gen', 'case-prep', 'adj-definite', 'adj-indefinite', 'adj-all', 'present', 'present-irregular', 'modal', 'preterite', 'perfect', 'konj2', 'konj1', 'comparison', 'n-decl', 'imperative', ...ADVANCED_DRILL_KINDS]);

/** Grammar lessons: catalog coverage, ids, tags, gaps — and every accepted answer must pass the real checker. */
export function validateGrammar(): ValidationReport {
  const errors: string[] = [];
  const counts: Record<string, Record<string, number>> = { lessons: {}, exercises: {} };
  const exerciseIds = new Set<string>();
  const lessonIds = new Set(LESSONS.map((l) => l.id));
  for (const t of TOPICS) if (!lessonIds.has(t.id)) errors.push(`topic ${t.id} has no lesson`);
  for (const tag of Object.values(ERROR_TAGS)) for (const topic of tag.topics) if (!TOPIC_BY_ID[topic]) errors.push(`error tag links unknown topic ${topic}`);
  for (const id of Object.keys(EXTRA_EXERCISES)) if (!lessonIds.has(id)) errors.push(`extra exercises for unknown lesson ${id}`);

  for (const lesson of LESSONS) {
    const topic = TOPIC_BY_ID[lesson.id];
    if (!topic) {
      errors.push(`lesson ${lesson.id} is not in the catalog`);
      continue;
    }
    counts.lessons[topic.level] = (counts.lessons[topic.level] ?? 0) + 1;
    counts.exercises[topic.level] = (counts.exercises[topic.level] ?? 0) + lesson.exercises.length;
    if (lesson.explanation.trim().length < 80) errors.push(`${lesson.id}: explanation too short`);
    if (lesson.examples.length < 2) errors.push(`${lesson.id}: needs ≥ 2 examples`);
    if (lesson.exercises.length < 6) errors.push(`${lesson.id}: only ${lesson.exercises.length} exercises`);
    for (const d of lesson.drills ?? []) if (!DRILL_KINDS.has(d)) errors.push(`${lesson.id}: unknown drill ${d}`);

    for (const ex of lesson.exercises) {
      const where = `${lesson.id}/${ex.id}`;
      if (exerciseIds.has(ex.id)) errors.push(`${where}: duplicate exercise id`);
      exerciseIds.add(ex.id);
      if (!ex.id.startsWith(`${lesson.id}-`)) errors.push(`${where}: id should start with the lesson id`);
      if (!ex.explain.trim()) errors.push(`${where}: missing explanation`);
      if (ex.tag && !(ex.tag in ERROR_TAGS)) errors.push(`${where}: unknown tag ${ex.tag}`);
      switch (ex.kind) {
        case 'choice': {
          const gaps = ex.prompt.split('___').length - 1;
          if (ex.options.length < 2) errors.push(`${where}: needs ≥ 2 options`);
          if (new Set(ex.options.map((o) => o.trim().toLowerCase())).size !== ex.options.length) errors.push(`${where}: duplicate options`);
          if (ex.why && ex.why.length !== ex.options.length - 1) errors.push(`${where}: why[] must explain each wrong option`);
          if (gaps > 1 && !ex.options.every((o) => o.split(/\s*…\s*/).length === gaps || /[.!?]$/.test(o)))
            errors.push(`${where}: ${gaps} gaps but options are not split with " … "`);
          break;
        }
        case 'fill': {
          if (ex.prompt.split('___').length - 1 !== 1) errors.push(`${where}: fill needs exactly one gap`);
          if (!ex.answers.length) errors.push(`${where}: no answers`);
          // keys are matched lower-cased, so "ihr" may explain a missing capital in "Ihr" — only an exact accepted answer is a contradiction
          for (const k of Object.keys(ex.feedback ?? {})) if (ex.answers.includes(k)) errors.push(`${where}: feedback for an accepted answer (${k})`);
          for (const a of ex.answers) if (checkAnswer(ex, a).verdict !== 'correct') errors.push(`${where}: own answer „${a}“ not accepted`);
          break;
        }
        case 'transform':
        case 'correct': {
          if (!ex.answers.length) errors.push(`${where}: no answers`);
          for (const [re] of ex.feedback ?? []) {
            try {
              new RegExp(re, 'i');
            } catch {
              errors.push(`${where}: invalid feedback regex ${re}`);
            }
          }
          for (const a of ex.answers) if (checkAnswer(ex, a).verdict !== 'correct') errors.push(`${where}: own answer „${a}“ not accepted`);
          if (ex.kind === 'correct' && checkAnswer(ex, ex.sentence).verdict === 'correct') errors.push(`${where}: the uncorrected sentence is accepted`);
          break;
        }
        case 'order': {
          if (ex.words.length < 3) errors.push(`${where}: needs ≥ 3 words`);
          if (checkAnswer(ex, ex.words.join(' ')).verdict !== 'correct') errors.push(`${where}: canonical order not accepted`);
          const sorted = (s: string) => s.toLowerCase().split(/\s+/).sort().join(' ');
          for (const a of ex.answers ?? []) {
            if (sorted(a) !== sorted(ex.words.join(' '))) errors.push(`${where}: answer „${a}“ uses different words`);
            if (checkAnswer(ex, a).verdict !== 'correct') errors.push(`${where}: own answer „${a}“ not accepted`);
          }
          break;
        }
      }
    }
  }
  return { errors, counts };
}

// German packs more into fewer words (compounds, nominal style): a 270-word C1 text is a full page
const WORD_RANGE: Record<string, [number, number]> = { A1: [60, 170], A2: [110, 240], B1: [170, 330], B2: [200, 420], C1: [230, 480], C2: [250, 520] };
const INTEREST_IDS = new Set<string>(INTERESTS.map((i) => i.id));

function validateQuestions(where: string, questions: ComprehensionQ[], errors: string[]) {
  if (questions.length < 3) errors.push(`${where}: needs ≥ 3 questions`);
  questions.forEach((q, i) => {
    if (!q.q.trim() || !q.explain.trim()) errors.push(`${where}#${i}: empty question or explanation`);
    if (q.kind === 'choice') {
      if (q.options.length < 3) errors.push(`${where}#${i}: needs ≥ 3 options`);
      if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== q.options.length) errors.push(`${where}#${i}: duplicate options`);
    }
  });
}

/** Graded reading texts and listening scripts. */
export function validateTexts(): ValidationReport {
  const errors: string[] = [];
  const counts: Record<string, Record<string, number>> = { reading: {}, listening: {} };
  const ids = new Set<string>();
  for (const t of TEXTS) {
    if (ids.has(t.id)) errors.push(`duplicate text id ${t.id}`);
    ids.add(t.id);
    if (!t.id.startsWith(t.level.toLowerCase())) errors.push(`${t.id}: id should start with its level`);
    counts.reading[t.level] = (counts.reading[t.level] ?? 0) + 1;
    const words = wordCount(t.text);
    const [lo, hi] = WORD_RANGE[t.level];
    if (words < lo || words > hi) errors.push(`${t.id}: ${words} words, expected ${lo}–${hi} for ${t.level}`);
    if (t.text.includes('___')) errors.push(`${t.id}: text contains a gap`);
    for (const x of t.topics) if (!INTEREST_IDS.has(x)) errors.push(`${t.id}: unknown topic ${x}`);
    validateQuestions(t.id, t.questions, errors);
  }
  for (const s of LISTENING) {
    if (ids.has(s.id)) errors.push(`duplicate id ${s.id}`);
    ids.add(s.id);
    counts.listening[s.level] = (counts.listening[s.level] ?? 0) + 1;
    if (s.lines.length < 3) errors.push(`${s.id}: needs ≥ 3 lines`);
    if (s.lines.some((l) => !l.text.trim() || !l.speaker.trim())) errors.push(`${s.id}: empty line or speaker`);
    if (s.kind === 'dialogue' && new Set(s.lines.map((l) => l.speaker)).size < 2) errors.push(`${s.id}: dialogue needs ≥ 2 speakers`);
    for (const x of s.topics) if (!INTEREST_IDS.has(x)) errors.push(`${s.id}: unknown topic ${x}`);
    validateQuestions(s.id, s.questions, errors);
  }
  for (const level of LEVELS) {
    if ((counts.reading[level] ?? 0) < 6) errors.push(`reading ${level}: only ${counts.reading[level] ?? 0} texts (need ≥ 6)`);
    if ((counts.listening[level] ?? 0) < 4) errors.push(`listening ${level}: only ${counts.listening[level] ?? 0} scripts (need ≥ 4)`);
  }
  return { errors, counts };
}

/** Writing tasks (model answers within the word range) and conversation scenarios. */
export function validateOutputContent(): ValidationReport {
  const errors: string[] = [];
  const counts: Record<string, Record<string, number>> = { writing: {}, conversation: {} };
  const ids = new Set<string>();
  for (const t of WRITING_TASKS) {
    if (ids.has(t.id)) errors.push(`duplicate id ${t.id}`);
    ids.add(t.id);
    counts.writing[t.level] = (counts.writing[t.level] ?? 0) + 1;
    if (!t.id.startsWith(t.level.toLowerCase())) errors.push(`${t.id}: id should start with its level`);
    if (t.points.length < 2) errors.push(`${t.id}: needs ≥ 2 content points`);
    const words = wordCount(t.model);
    // model answers may exceed the target slightly (greeting and signature lines)
    if (words < t.words[0] || words > t.words[1] * 1.25) errors.push(`${t.id}: model answer has ${words} words, target ${t.words[0]}–${t.words[1]}`);
    for (const x of t.topics) if (!INTEREST_IDS.has(x)) errors.push(`${t.id}: unknown topic ${x}`);
  }
  for (const s of SCENARIOS) {
    if (ids.has(s.id)) errors.push(`duplicate id ${s.id}`);
    ids.add(s.id);
    counts.conversation[s.level] = (counts.conversation[s.level] ?? 0) + 1;
    if (s.phrases.length < 4) errors.push(`${s.id}: needs ≥ 4 useful phrases`);
    if (s.model.length < 4) errors.push(`${s.id}: model dialogue too short`);
    if (s.model[0]?.text !== s.opening) errors.push(`${s.id}: model dialogue should start with the opening line`);
    if (s.model.some((l, i) => i > 0 && l.speaker === s.model[i - 1].speaker)) errors.push(`${s.id}: model dialogue speakers should alternate`);
    for (const x of s.topics) if (!INTEREST_IDS.has(x)) errors.push(`${s.id}: unknown topic ${x}`);
  }
  for (const level of LEVELS) {
    if ((counts.writing[level] ?? 0) < 4) errors.push(`writing ${level}: only ${counts.writing[level] ?? 0} tasks (need ≥ 4)`);
    if ((counts.conversation[level] ?? 0) < 3) errors.push(`conversation ${level}: only ${counts.conversation[level] ?? 0} scenarios (need ≥ 3)`);
  }
  return { errors, counts };
}
