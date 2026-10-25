'use client';

import { useState, type ReactNode } from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Notice } from '@/components/ui/misc';
import { aiErrorMessage, useAiStatus } from '@/lib/ai/client';
import { getProfile, updateProfile, useProfile } from '@/lib/db/profile';

export type AiState = 'loading' | 'unavailable' | 'needs-notice' | 'ready';

/** Is AI usable right now, and has the learner accepted the free-tier data notice? */
export function useAiState(): { state: AiState; passphrase: boolean; mock: boolean } {
  const status = useAiStatus();
  const profile = useProfile();
  if (status === undefined) return { state: 'loading', passphrase: false, mock: false };
  if (!status?.configured) return { state: 'unavailable', passphrase: false, mock: false };
  return { state: profile.ai.noticeAccepted ? 'ready' : 'needs-notice', passphrase: status.passphrase, mock: !!status.mock };
}

/** The one-time notice about the Gemini free tier, required before the first AI request. */
export function AiNotice({ compact }: { compact?: boolean }) {
  const [saving, setSaving] = useState(false);
  return (
    <div className="space-y-3 rounded-2xl border border-warning/40 bg-warning-soft p-4 text-sm">
      <p className="flex items-center gap-2 font-semibold">
        <ShieldAlert className="size-4 text-warning" /> Before you use the AI features
      </p>
      <p>
        AI feedback uses Google’s Gemini API on its <strong>free tier</strong>. On the free tier, Google may use what you send (your texts and messages) and the answers to
        improve its products, and human reviewers may read them. Don’t enter names, addresses or anything private.
      </p>
      {!compact && <p className="text-muted">Answers are cached on this device, so the same text is never sent twice. Everything else in the app works without AI.</p>}
      <Button
        size="sm"
        disabled={saving}
        onClick={async () => {
          setSaving(true);
          const p = await getProfile();
          await updateProfile({ ai: { ...p.ai, noticeAccepted: true } });
          setSaving(false);
        }}
      >
        I understand — enable AI feedback
      </Button>
    </div>
  );
}

export function AiUnavailableNotice({ children }: { children?: ReactNode }) {
  return (
    <Notice tone="info" title="AI not configured">
      AI feedback is optional and needs a free Gemini API key on the server (see the README). {children}
    </Notice>
  );
}

export function AiErrorNotice({ error }: { error: unknown }) {
  const m = aiErrorMessage(error);
  return (
    <Notice tone="warning" title={m.title}>
      {m.text}
    </Notice>
  );
}

export function AiBadge({ mock }: { mock?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
      <Sparkles className="size-3" /> {mock ? 'AI (mock)' : 'AI'}
    </span>
  );
}

/** Small hook for the passphrase field in Settings. */
export function usePassphrase(): [string, (v: string) => Promise<void>] {
  const profile = useProfile();
  return [
    profile.ai.passphrase ?? '',
    async (v: string) => {
      await updateProfile({ ai: { ...profile.ai, passphrase: v || undefined } });
    },
  ];
}
