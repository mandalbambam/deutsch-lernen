'use client';

import Link from 'next/link';
import { ChevronRight, GraduationCap, Layers, Mic, Volume2 } from 'lucide-react';
import { AiSettings } from '@/components/settings/ai-settings';
import { DataSettings } from '@/components/settings/data-settings';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, PageHeader } from '@/components/ui/card';
import { Notice, Segmented, Switch } from '@/components/ui/misc';
import { compareLevels } from '@/lib/cefr';
import { overallLevel, updateProfile, useProfile, useSkillStates } from '@/lib/db/profile';
import { useT } from '@/lib/i18n';
import { rebuildPlan } from '@/lib/plan/store';
import { recognitionSupported } from '@/lib/speech/stt';
import { useTts } from '@/lib/speech/use-tts';
import { useTheme, type ThemePref } from '@/lib/theme';
import { useClientValue } from '@/lib/use-client-value';

export function SettingsClient() {
  const t = useT();
  const profile = useProfile();
  const states = useSkillStates();
  const [theme, setTheme] = useTheme();
  const tts = useTts();
  const sttOk = useClientValue<boolean | null>(recognitionSupported, null);

  const level = overallLevel(states);
  const germanUnlocked = !!level && compareLevels(level, 'B2') >= 0;

  return (
    <>
      <PageHeader title={t.settings.title} />
      <div className="space-y-4">
        <Card className="space-y-4">
          <CardTitle>{t.settings.appearance}</CardTitle>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>{t.settings.theme}</span>
            <Segmented<ThemePref>
              ariaLabel={t.settings.theme}
              value={theme}
              onChange={setTheme}
              options={[
                { value: 'system', label: t.settings.themeSystem },
                { value: 'light', label: t.settings.themeLight },
                { value: 'dark', label: t.settings.themeDark },
              ]}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>{t.settings.language}</span>
            <Segmented<'en' | 'de'>
              ariaLabel={t.settings.language}
              value={profile.uiLang}
              onChange={(v) => updateProfile({ uiLang: v })}
              options={[
                { value: 'en', label: 'English' },
                { value: 'de', label: 'Deutsch', disabled: !germanUnlocked && profile.uiLang !== 'de' },
              ]}
            />
          </div>
          {!germanUnlocked && <p className="text-sm text-muted">{t.settings.languageLocked}</p>}
        </Card>

        <Card className="space-y-4">
          <CardTitle icon={<Volume2 className="size-5 text-accent" />}>{t.settings.speech}</CardTitle>
          {tts.ready && tts.voices.length === 0 ? (
            <Notice tone="warning">{t.settings.noVoices}</Notice>
          ) : (
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">{t.settings.voice}</span>
              <select
                className="w-full rounded-xl border border-line bg-surface px-3 py-2.5"
                value={profile.tts.voiceURI ?? ''}
                onChange={(e) => updateProfile({ tts: { ...profile.tts, voiceURI: e.target.value || undefined } })}
              >
                <option value="">Automatic (best available)</option>
                {tts.voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="block space-y-1.5">
            <span className="flex justify-between text-sm font-medium">
              {t.settings.rate} <span className="text-muted tabular-nums">{profile.tts.rate.toFixed(2)}×</span>
            </span>
            <input
              type="range"
              min={0.6}
              max={1.3}
              step={0.05}
              value={profile.tts.rate}
              onChange={(e) => updateProfile({ tts: { ...profile.tts, rate: Number(e.target.value) } })}
              className="w-full accent-[var(--accent)]"
            />
          </label>
          <Button variant="secondary" onClick={() => tts.say('Guten Tag! So klinge ich auf Deutsch.')} disabled={!tts.hasGerman}>
            <Volume2 className="size-4" /> {t.settings.test}
          </Button>
          <p className="flex items-center gap-2 text-sm text-muted">
            <Mic className="size-4" /> {t.settings.recognition}:{' '}
            {sttOk === null ? '…' : sttOk ? t.settings.supported : t.settings.unsupported}
          </p>
        </Card>

        <Card className="space-y-4">
          <CardTitle icon={<GraduationCap className="size-5 text-accent" />}>Learning plan</CardTitle>
          <p className="text-sm text-muted">
            {profile.dailyMinutes} min per day
            {profile.goals.length > 0 && ` · goals: ${profile.goals.join(', ')}`}
          </p>
          <Link href="/onboarding" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
            Change daily time, goals and interests <ChevronRight className="size-4" />
          </Link>
        </Card>

        <Card className="space-y-4">
          <CardTitle icon={<Layers className="size-5 text-accent" />}>Flashcards</CardTitle>
          <label className="block space-y-1.5">
            <span className="flex justify-between text-sm font-medium">
              Maximum new words per day <span className="text-muted tabular-nums">{profile.srs.maxNewPerDay}</span>
            </span>
            <input
              type="range"
              min={3}
              max={40}
              step={1}
              value={profile.srs.maxNewPerDay}
              onChange={(e) => updateProfile({ srs: { ...profile.srs, maxNewPerDay: Number(e.target.value) } })}
              onPointerUp={() => rebuildPlan()}
              className="w-full accent-[var(--accent)]"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="flex justify-between text-sm font-medium">
              Target recall <span className="text-muted tabular-nums">{Math.round(profile.srs.retention * 100)}%</span>
            </span>
            <input
              type="range"
              min={0.8}
              max={0.97}
              step={0.01}
              value={profile.srs.retention}
              onChange={(e) => updateProfile({ srs: { ...profile.srs, retention: Number(e.target.value) } })}
              className="w-full accent-[var(--accent)]"
            />
            <span className="block text-xs text-muted">Higher recall means more frequent reviews. 90% is a good balance.</span>
          </label>
          <Switch
            checked={profile.srs.genderDrill}
            onChange={(v) => updateProfile({ srs: { ...profile.srs, genderDrill: v } })}
            label="Article drill"
            description="Ask der/die/das before showing a noun."
          />
          <Switch
            checked={profile.srs.autoplay !== false}
            onChange={(v) => updateProfile({ srs: { ...profile.srs, autoplay: v } })}
            label="Read words aloud"
            description="Play the word when the answer is shown."
          />
        </Card>

        <AiSettings />

        <DataSettings />

        <Link href="/about" className="block">
          <Card className="flex items-center justify-between hover:bg-surface-2">
            <span className="font-medium">{t.nav.about}</span>
            <ChevronRight className="size-5 text-muted" />
          </Card>
        </Link>
      </div>
    </>
  );
}
