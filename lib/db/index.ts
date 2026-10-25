import Dexie, { type EntityTable } from 'dexie';
import type {
  AiCacheEntry,
  Assessment,
  Attempt,
  Card,
  Conversation,
  DayLog,
  MetaEntry,
  MistakeStat,
  Profile,
  ReviewLog,
  SkillState,
  TextProgress,
  TopicProgress,
  WeeklyPlan,
  Writing,
} from './types';

export class AppDB extends Dexie {
  profile!: EntityTable<Profile, 'id'>;
  assessments!: EntityTable<Assessment, 'id'>;
  skillState!: EntityTable<SkillState, 'skill'>;
  cards!: EntityTable<Card, 'id'>;
  reviews!: EntityTable<ReviewLog, 'id'>;
  attempts!: EntityTable<Attempt, 'id'>;
  mistakes!: EntityTable<MistakeStat, 'tag'>;
  topicProgress!: EntityTable<TopicProgress, 'topicId'>;
  textProgress!: EntityTable<TextProgress, 'textId'>;
  plans!: EntityTable<WeeklyPlan, 'weekStart'>;
  days!: EntityTable<DayLog, 'date'>;
  writings!: EntityTable<Writing, 'id'>;
  conversations!: EntityTable<Conversation, 'id'>;
  aiCache!: EntityTable<AiCacheEntry, 'key'>;
  meta!: EntityTable<MetaEntry, 'key'>;

  constructor(name = 'deutsch-lernen') {
    super(name);
    this.version(1).stores({
      profile: 'id',
      assessments: 'id, takenAt, kind, status',
      skillState: 'skill',
      cards: 'id, due, state, kind, level, source, updatedAt, word',
      reviews: 'id, cardId, at',
      attempts: 'id, at, module, skill, itemId',
      mistakes: 'tag, count, lastAt',
      topicProgress: 'topicId, lastAt',
      textProgress: 'textId, kind, updatedAt',
      plans: 'weekStart',
      days: 'date',
      writings: 'id, at',
      conversations: 'id, updatedAt',
      aiCache: 'key, at, task',
      meta: 'key',
    });
  }
}

export const db = new AppDB();

export const TABLE_NAMES = [
  'profile',
  'assessments',
  'skillState',
  'cards',
  'reviews',
  'attempts',
  'mistakes',
  'topicProgress',
  'textProgress',
  'plans',
  'days',
  'writings',
  'conversations',
  'aiCache',
  'meta',
] as const;

export type TableName = (typeof TABLE_NAMES)[number];

export function uid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Local calendar date as YYYY-MM-DD. */
export function today(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
