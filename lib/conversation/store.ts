'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import type { Scenario } from '@/content/conversation/scenarios';
import { ERROR_TAGS } from '@/content/error-tags';
import type { Level } from '@/lib/cefr';
import { db, uid } from '@/lib/db';
import { logMistakes } from '@/lib/db/mistakes';
import type { ChatMessage, Conversation } from '@/lib/db/types';

export async function startConversation(scenario: Scenario, level: Level): Promise<Conversation> {
  const now = Date.now();
  const conv: Conversation = {
    id: uid(),
    scenarioId: scenario.id,
    level,
    messages: [{ role: 'partner', text: scenario.opening, at: now }],
    createdAt: now,
    updatedAt: now,
  };
  await db.conversations.put(conv);
  return conv;
}

export async function latestConversation(scenarioId: string): Promise<Conversation | undefined> {
  const all = await db.conversations.orderBy('updatedAt').reverse().toArray();
  return all.find((c) => c.scenarioId === scenarioId);
}

export function useConversation(id: string | undefined): Conversation | undefined {
  return useLiveQuery(() => (id ? db.conversations.get(id) : undefined), [id]);
}

export function useConversationCounts(): Map<string, number> | undefined {
  return useLiveQuery(async () => {
    const counts = new Map<string, number>();
    for (const c of await db.conversations.toArray()) counts.set(c.scenarioId, (counts.get(c.scenarioId) ?? 0) + 1);
    return counts;
  }, []);
}

export async function updateMessages(id: string, update: (messages: ChatMessage[]) => ChatMessage[], extra: Partial<Conversation> = {}): Promise<void> {
  await db.transaction('rw', db.conversations, async () => {
    const conv = await db.conversations.get(id);
    if (!conv) return;
    await db.conversations.put({ ...conv, ...extra, messages: update(conv.messages), updatedAt: Date.now() });
  });
}

export async function logChatMistakes(tags: string[] | undefined, wrong: string, right: string): Promise<void> {
  const known = (tags ?? []).filter((t) => t in ERROR_TAGS);
  await logMistakes(
    known.map((tag) => ({ tag, example: { wrong, right } })),
    'conversation',
  );
}
