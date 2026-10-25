'use client';

import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { refreshAiStatus, useAiStatus } from '@/lib/ai/client';
import { db } from '@/lib/db';
import { updateProfile, useProfile } from '@/lib/db/profile';

/** AI status, passphrase, data notice and local cache. */
export function AiSettings() {
  const status = useAiStatus();
  const profile = useProfile();
  const cached = useLiveQuery(() => db.aiCache.count(), []);
  const [pass, setPass] = useState<string | null>(null);
  const passValue = pass ?? profile.ai.passphrase ?? '';

  return (
    <Card className="space-y-4">
      <CardTitle icon={<Sparkles className="size-5 text-accent" />}>AI features (optional)</CardTitle>
      <p className="text-sm">
        {status === undefined
          ? 'Checking …'
          : status === null
            ? 'Status unknown — you seem to be offline.'
            : status.configured
              ? `Available${status.mock ? ' (mock mode for testing)' : ''} — model ${status.model}.`
              : 'Not configured. Add a free Gemini API key as GEMINI_API_KEY on the server (see the README).'}
      </p>
      {status?.passphrase && (
        <form
          className="flex flex-wrap items-end gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await updateProfile({ ai: { ...profile.ai, passphrase: passValue.trim() || undefined } });
            setPass(null);
            void refreshAiStatus();
          }}
        >
          <label className="flex min-w-48 flex-1 flex-col gap-1 text-sm">
            <span className="font-medium">Passphrase</span>
            <input
              type="password"
              value={passValue}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              className="rounded-xl border border-line bg-surface px-3 py-2 text-base focus:border-accent focus:outline-none"
            />
          </label>
          <Button type="submit" variant="secondary">
            Save
          </Button>
        </form>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>Free-tier data notice: {profile.ai.noticeAccepted ? 'accepted' : 'not yet accepted'}</span>
        {profile.ai.noticeAccepted && (
          <Button variant="ghost" size="sm" onClick={() => updateProfile({ ai: { ...profile.ai, noticeAccepted: false } })}>
            Withdraw
          </Button>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>Cached AI answers on this device: {cached ?? '…'}</span>
        <Button variant="ghost" size="sm" disabled={!cached} onClick={() => db.aiCache.clear()}>
          Clear cache
        </Button>
      </div>
    </Card>
  );
}
