'use client';

import { useSyncExternalStore } from 'react';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/db/profile';
import type { AiErrorCode, AiInput, AiOutput, AiResponse, AiStatus, AiTask } from './schemas';

export class AiRequestError extends Error {
  constructor(
    public code: AiErrorCode,
    public retryAfter?: number,
  ) {
    super(code);
  }
}

// ── status (one request per page load, shared by all components) ─────────────
type StatusSnapshot = AiStatus | null | undefined; // undefined = loading, null = unknown (offline/error)
let snapshot: StatusSnapshot;
let started = false;
const listeners = new Set<() => void>();

export function refreshAiStatus(): Promise<void> {
  started = true;
  return fetch('/api/ai/status', { cache: 'no-store' })
    .then((r) => (r.ok ? (r.json() as Promise<AiStatus>) : null))
    .catch(() => null)
    .then((s) => {
      snapshot = s;
      listeners.forEach((l) => l());
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) void refreshAiStatus();
  return () => listeners.delete(listener);
}

/** undefined while loading, null when the server can't be reached. */
export function useAiStatus(): StatusSnapshot {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => undefined,
  );
}

// ── requests ─────────────────────────────────────────────────────────────────
async function cacheKey(task: string, input: unknown): Promise<string> {
  const json = JSON.stringify({ task, input });
  if (globalThis.crypto?.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(json));
    return `${task}:${Array.from(new Uint8Array(buf).slice(0, 16), (b) => b.toString(16).padStart(2, '0')).join('')}`;
  }
  let h = 0x811c9dc5;
  for (let i = 0; i < json.length; i++) h = Math.imul(h ^ json.charCodeAt(i), 0x01000193);
  return `${task}:${(h >>> 0).toString(16)}:${json.length}`;
}

async function prune() {
  const count = await db.aiCache.count();
  if (count <= 400) return;
  const oldest = await db.aiCache.orderBy('at').limit(count - 300).primaryKeys();
  await db.aiCache.bulkDelete(oldest);
}

/**
 * Calls the AI route. Identical requests are answered from the local cache (saves the free quota).
 * Throws AiRequestError with a code for friendly messages.
 */
export async function aiRequest<T extends AiTask>(task: T, input: AiInput<T>, opts: { cache?: boolean } = {}): Promise<AiOutput<T>> {
  const useCache = opts.cache !== false;
  const key = useCache ? await cacheKey(task, input) : null;
  if (key) {
    const hit = await db.aiCache.get(key);
    if (hit) return hit.value as AiOutput<T>;
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) throw new AiRequestError('offline');
  const profile = await getProfile();
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(profile.ai.passphrase ? { 'x-app-passphrase': profile.ai.passphrase } : {}) },
    body: JSON.stringify({ task, input }),
  }).catch(() => null);
  if (!res) throw new AiRequestError('offline');
  const body = (await res.json().catch(() => null)) as AiResponse<T> | null;
  if (!body) throw new AiRequestError('upstream');
  if (!body.ok) throw new AiRequestError(body.error, body.retryAfter);
  if (key) {
    await db.aiCache.put({ key, task, at: Date.now(), value: body.data });
    void prune();
  }
  return body.data;
}

export function aiErrorMessage(err: unknown): { title: string; text: string } {
  const code = err instanceof AiRequestError ? err.code : 'upstream';
  const retry = err instanceof AiRequestError ? err.retryAfter : undefined;
  switch (code) {
    case 'not_configured':
      return { title: 'AI not configured', text: 'Add a free Gemini API key (see the README) to get AI feedback. Everything else works without it.' };
    case 'daily_limit':
      return { title: 'Daily free limit reached', text: 'The free Gemini quota for today is used up. It resets at midnight Pacific Time (9:00 in Germany). Until then, use the self-check and model answers.' };
    case 'rate_limited':
      return { title: 'Too many requests', text: `The free tier allows only a few requests per minute. Please try again in ${retry ?? 30} seconds.` };
    case 'unauthorized':
      return { title: 'Passphrase required', text: 'This installation is protected. Enter the passphrase in Settings → AI.' };
    case 'offline':
      return { title: 'You’re offline', text: 'AI feedback needs an internet connection. Everything else works offline.' };
    case 'bad_key':
      return { title: 'API key not accepted', text: 'Google rejected the Gemini API key. Check GEMINI_API_KEY in your environment variables.' };
    case 'blocked':
      return { title: 'Request blocked', text: 'The AI service declined to answer this text. Try rephrasing it.' };
    case 'timeout':
      return { title: 'The AI took too long', text: 'Please try again — free-tier responses are sometimes slow.' };
    case 'bad_request':
      return { title: 'Request not accepted', text: 'The text may be too long or empty. Please shorten it and try again.' };
    default:
      return { title: 'AI temporarily unavailable', text: 'The AI service didn’t respond properly. Please try again later.' };
  }
}
