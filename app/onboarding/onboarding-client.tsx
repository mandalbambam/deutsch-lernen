'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { Briefcase, Check, Coffee, GraduationCap, Library } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card, CardTitle, PageHeader } from '@/components/ui/card';
import { Notice } from '@/components/ui/misc';
import { INTERESTS } from '@/content/interests';
import { LEVELS, type Level } from '@/lib/cefr';
import { cn } from '@/lib/cn';
import { db, today } from '@/lib/db';
import { updateProfile, useProfile } from '@/lib/db/profile';
import type { DailyMinutes, ExamType, Goal, Profile } from '@/lib/db/types';
import { rebuildPlan } from '@/lib/plan/store';

const GOALS: { id: Goal; label: string; text: string; icon: typeof Briefcase }[] = [
  { id: 'daily', label: 'Daily life', text: 'Conversations, errands, travel, friends', icon: Coffee },
  { id: 'work', label: 'Work', text: 'Emails, meetings, formal register', icon: Briefcase },
  { id: 'exam', label: 'Exam', text: 'Goethe, telc or TestDaF', icon: GraduationCap },
  { id: 'literature', label: 'Literature', text: 'Novels, essays, rich vocabulary', icon: Library },
];

const MINUTES: { value: DailyMinutes; label: string; text: string }[] = [
  { value: 15, label: '15 min', text: 'Light: keep the habit' },
  { value: 30, label: '30 min', text: 'Steady progress' },
  { value: 60, label: '60 min', text: 'Intensive' },
];

const EXAMS: { id: ExamType; label: string }[] = [
  { id: 'goethe', label: 'Goethe-Zertifikat' },
  { id: 'telc', label: 'telc Deutsch' },
  { id: 'testdaf', label: 'TestDaF' },
];

/** Form state is seeded from the stored profile once it has loaded (keyed remount). */
export function OnboardingClient() {
  const profile = useProfile();
  const loaded = useLiveQuery(() => db.profile.count(), []);
  if (loaded === undefined) return null;
  return <OnboardingForm key={profile.updatedAt} profile={profile} />;
}

function OnboardingForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const tested = useLiveQuery(() => db.skillState.count(), []);
  const [minutes, setMinutes] = useState<DailyMinutes>(profile.dailyMinutes);
  const [goals, setGoals] = useState<Goal[]>(profile.goals);
  const [exam, setExam] = useState<ExamType>(profile.exam?.type ?? 'goethe');
  const [examTarget, setExamTarget] = useState<Level>(profile.exam?.target ?? 'B2');
  const [interests, setInterests] = useState<string[]>(profile.interests);
  const [saving, setSaving] = useState(false);

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const save = async () => {
    setSaving(true);
    await updateProfile({
      dailyMinutes: minutes,
      goals,
      exam: goals.includes('exam') ? { type: exam, target: examTarget } : undefined,
      interests,
      onboarded: true,
    });
    await rebuildPlan();
    // a new plan means today's session should be rebuilt as well
    const day = await db.days.get(today());
    if (day?.session && !day.session.blocks.some((b) => b.done)) await db.days.put({ ...day, session: undefined });
    router.push('/');
  };

  return (
    <>
      <PageHeader title="Your learning plan" subtitle="Three quick questions — you can change them later in Settings." />
      <div className="space-y-4">
        {tested === 0 && (
          <Notice tone="info" title="Tip: take the placement test first">
            Your plan uses your test results to decide what to practise.{' '}
            <ButtonLink href="/placement" size="sm" variant="secondary" className="mt-2">
              Take the test
            </ButtonLink>
          </Notice>
        )}

        <Card className="space-y-3">
          <CardTitle>1 · How much time per day?</CardTitle>
          <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Daily time">
            {MINUTES.map((m) => (
              <button
                key={m.value}
                type="button"
                role="radio"
                aria-checked={minutes === m.value}
                onClick={() => setMinutes(m.value)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-colors',
                  minutes === m.value ? 'border-accent bg-accent-soft' : 'border-line hover:bg-surface-2',
                )}
              >
                <span className="block text-lg font-bold">{m.label}</span>
                <span className="text-sm text-muted">{m.text}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-3">
          <CardTitle>2 · What are you learning German for?</CardTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {GOALS.map((g) => {
              const on = goals.includes(g.id);
              const Icon = g.icon;
              return (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setGoals(toggle(goals, g.id))}
                  className={cn(
                    'flex items-start gap-3 rounded-xl border p-3 text-left transition-colors',
                    on ? 'border-accent bg-accent-soft' : 'border-line hover:bg-surface-2',
                  )}
                >
                  <Icon className={cn('mt-0.5 size-5 shrink-0', on ? 'text-accent' : 'text-muted')} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{g.label}</span>
                    <span className="text-sm text-muted">{g.text}</span>
                  </span>
                  {on && <Check className="size-5 text-accent" />}
                </button>
              );
            })}
          </div>
          {goals.includes('exam') && (
            <div className="flex flex-wrap gap-3 rounded-xl bg-surface-2 p-3">
              <label className="space-y-1 text-sm">
                <span className="block font-medium">Exam</span>
                <select value={exam} onChange={(e) => setExam(e.target.value as ExamType)} className="rounded-lg border border-line bg-surface px-3 py-2">
                  {EXAMS.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="block font-medium">Target level</span>
                <select value={examTarget} onChange={(e) => setExamTarget(e.target.value as Level)} className="rounded-lg border border-line bg-surface px-3 py-2">
                  {(exam === 'testdaf' ? (['B2', 'C1'] as Level[]) : LEVELS).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </Card>

        <Card className="space-y-3">
          <CardTitle>3 · What do you like reading and talking about?</CardTitle>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => {
              const on = interests.includes(i.id);
              return (
                <button
                  key={i.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setInterests(toggle(interests, i.id))}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    on ? 'border-accent bg-accent text-accent-fg' : 'border-line hover:bg-surface-2',
                  )}
                >
                  {i.label}
                </button>
              );
            })}
          </div>
        </Card>

        <Button size="lg" onClick={save} disabled={saving || goals.length === 0} className="w-full sm:w-auto">
          {saving ? 'Saving…' : 'Save and build my plan'}
        </Button>
        {goals.length === 0 && <p className="text-sm text-muted">Choose at least one goal.</p>}
      </div>
    </>
  );
}
