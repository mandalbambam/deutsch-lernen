'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { LESSON_BY_ID, TOPICS, type TopicMeta } from '@/content/grammar';
import { db } from '@/lib/db';
import type { TopicProgress } from '@/lib/db/types';
import { latestPlan } from '@/lib/plan/store';

export type TopicStatus = 'new' | 'started' | 'mastered';

export function isMastered(p: TopicProgress | undefined): boolean {
  return !!p && p.attempts >= 6 && p.mastery >= 0.8;
}

export function topicStatus(p: TopicProgress | undefined): TopicStatus {
  if (!p || p.attempts === 0) return 'new';
  return isMastered(p) ? 'mastered' : 'started';
}

export function useTopicProgress(): Map<string, TopicProgress> | undefined {
  return useLiveQuery(async () => new Map((await db.topicProgress.toArray()).map((p) => [p.topicId, p])), []);
}

/** Topics the weekly plan suggests next (only ones with a lesson), skipping mastered ones. */
export function useRecommendedTopics(limit = 3): TopicMeta[] | undefined {
  return useLiveQuery(async () => {
    const plan = await latestPlan();
    if (!plan) return [];
    const progress = new Map((await db.topicProgress.toArray()).map((p) => [p.topicId, p]));
    return plan.topicQueue
      .filter((id) => LESSON_BY_ID[id] && !isMastered(progress.get(id)))
      .slice(0, limit)
      .map((id) => TOPICS.find((t) => t.id === id)!)
      .filter(Boolean);
  }, [limit]);
}

export function neighbours(topicId: string): { prev?: TopicMeta; next?: TopicMeta } {
  const i = TOPICS.findIndex((t) => t.id === topicId);
  if (i < 0) return {};
  return { prev: TOPICS[i - 1], next: TOPICS[i + 1] };
}
