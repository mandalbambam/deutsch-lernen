import type { ErrorTagId } from '@/content/error-tags';
import type { Level } from '@/lib/cefr';
import type { TestedSkill } from '@/lib/db/types';

/**
 * One multiple-choice question. Authoring convention: the correct option is always listed
 * first; the test shuffles options deterministically per item.
 */
export interface ChoiceQuestion {
  id: string;
  prompt: string;
  /** options[0] is the correct answer */
  options: string[];
  /** why the correct answer is right (English) */
  explain: string;
  /** error tag for each wrong option (aligned with options[1..]); falls back to `tag` */
  wrong?: (ErrorTagId | undefined)[];
  tag: ErrorTagId;
}

export interface BankItem extends ChoiceQuestion {
  skill: TestedSkill;
  level: Level;
  /** grammar topic this item belongs to (grammar items) */
  topic?: string;
  /** reading/listening: id of the passage the question belongs to */
  passageId?: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface Passage {
  id: string;
  skill: 'reading' | 'listening';
  level: Level;
  /** short description shown above the text, e.g. "E-Mail", "Radio interview" */
  kind: string;
  /** for reading and monologues/announcements */
  text?: string;
  /** for dialogues: speakers alternate voices */
  lines?: DialogueLine[];
  /** optional context sentence for listening ("Sie hören eine Durchsage am Bahnhof.") */
  context?: string;
  questions: BankItem[];
}

type QType = 'gist' | 'detail' | 'inference';

/** Helper for grammar/vocabulary items. */
export function item(
  skill: 'grammar' | 'vocabulary',
  level: Level,
  n: number,
  tag: ErrorTagId,
  prompt: string,
  options: string[],
  explain: string,
  extra: { topic?: string; wrong?: (ErrorTagId | undefined)[] } = {},
): BankItem {
  const prefix = skill === 'grammar' ? 'g' : 'v';
  return {
    id: `${prefix}-${level.toLowerCase()}-${String(n).padStart(2, '0')}`,
    skill,
    level,
    prompt,
    options,
    explain,
    tag,
    ...extra,
  };
}

/** Helper for comprehension questions; question ids are `<passage>-q<n>`. */
export function q(qtype: QType | 'vocab', prompt: string, options: string[], explain: string): Omit<BankItem, 'id' | 'skill' | 'level'> & { qtype: QType | 'vocab' } {
  return { qtype, prompt, options, explain, tag: 'reading.detail' };
}

export function passage(
  skill: 'reading' | 'listening',
  level: Level,
  n: number,
  kind: string,
  body: { text?: string; lines?: DialogueLine[]; context?: string },
  questions: ReturnType<typeof q>[],
): Passage {
  const id = `${skill === 'reading' ? 'r' : 'l'}-${level.toLowerCase()}-${String(n).padStart(2, '0')}`;
  const base = skill === 'reading' ? 'reading' : 'listening';
  return {
    id,
    skill,
    level,
    kind,
    ...body,
    questions: questions.map(({ qtype, ...rest }, i) => ({
      ...rest,
      id: `${id}-q${i + 1}`,
      skill,
      level,
      passageId: id,
      tag: (qtype === 'vocab' ? `${base}.detail` : `${base}.${qtype}`) as ErrorTagId,
    })),
  };
}
