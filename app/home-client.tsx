'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { Check, ChevronRight, ClipboardCheck, Compass, Flame, Layers, Play } from 'lucide-react';
import { BlockIcon, blockTitle } from '@/components/session/block-meta';
import { LevelBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/misc';
import { LEVEL_NAMES } from '@/lib/cefr';
import { cn } from '@/lib/cn';
import { computeStreak, totalSeconds } from '@/lib/activity';
import { db, today } from '@/lib/db';
import { levelCheckStatus } from '@/lib/progress/stats';
import { useProfile } from '@/lib/db/profile';
import { TESTED_SKILLS } from '@/lib/db/types';
import { formatDate } from '@/lib/format';
import { useLang, useT } from '@/lib/i18n';
import { ensureTodaySession } from '@/lib/plan/today';
import { countDue } from '@/lib/srs/cards';
import { useClientValue } from '@/lib/use-client-value';

export function HomeClient() {
  const t = useT();
  const lang = useLang();
  const profile = useProfile();
  // client-only: the page is prerendered at build time, so the date must not be baked into the HTML
  const todayLabel = useClientValue(() => formatDate(Date.now(), lang, { weekday: 'long', day: 'numeric', month: 'long' }), '');
  const [prepared, setPrepared] = useState(false);
  const preparing = useRef(false);

  const data = useLiveQuery(async () => {
    const all = await db.assessments.toArray();
    const done = all.filter((a) => a.status === 'done').sort((a, b) => b.takenAt - a.takenAt);
    const inProgress = all.find((a) => a.status === 'in-progress' && a.kind === 'placement');
    const days = await db.days.toArray();
    return {
      latest: done[0],
      inProgress,
      day: days.find((d) => d.date === today()),
      streak: computeStreak(days),
      due: await countDue(),
      levelCheck: levelCheckStatus(all),
    };
  }, [prepared]);

  // create today's session once the learner has a level and a plan
  useEffect(() => {
    if (preparing.current || !data?.latest || !profile.onboarded) return;
    preparing.current = true;
    ensureTodaySession().then(() => setPrepared(true));
  }, [data?.latest, profile.onboarded]);

  if (!data) return <Loading label={t.common.loading} />;
  const { latest, inProgress, day, streak, due, levelCheck } = data;
  const session = day?.session;
  const doneBlocks = session?.blocks.filter((b) => b.done).length ?? 0;
  const sessionDone = !!session?.completedAt;

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="min-h-6 text-muted">{todayLabel}</p>
          <h1 className="text-3xl font-bold tracking-tight">{t.home.greeting}</h1>
        </div>
        {latest && (
          <div className="flex gap-2 text-sm">
            <span className="flex items-center gap-1 rounded-full bg-warning-soft px-3 py-1 font-semibold text-warning" title={t.home.streak}>
              <Flame className="size-4" /> {streak}
            </span>
            <Link href="/cards" className="flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent" title={t.home.due}>
              <Layers className="size-4" /> {due}
            </Link>
          </div>
        )}
      </header>

      {!latest && (
        <Card className="space-y-4 border-accent/30 bg-accent-soft">
          <div className="flex items-start gap-3">
            <Compass className="mt-0.5 size-6 shrink-0 text-accent" />
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{t.home.noTestTitle}</h2>
              <p className="text-sm">{t.home.noTestBody}</p>
            </div>
          </div>
          <ButtonLink href="/placement" size="lg" className="w-full sm:w-auto">
            <ClipboardCheck className="size-5" />
            {inProgress ? t.placement.resume : t.home.takeTest}
          </ButtonLink>
        </Card>
      )}

      {latest && !profile.onboarded && (
        <Card className="space-y-3 border-accent/30 bg-accent-soft">
          <h2 className="text-lg font-semibold">{t.home.planMissing}</h2>
          <p className="text-sm">{t.home.planMissingBody}</p>
          <ButtonLink href="/onboarding">{t.home.setUpPlan}</ButtonLink>
        </Card>
      )}

      {latest && profile.onboarded && (
        <Card className="space-y-4">
          <ButtonLink href="/session" size="lg" className="w-full text-lg" variant={sessionDone ? 'secondary' : 'primary'}>
            {sessionDone ? <Check className="size-5" /> : <Play className="size-5" />}
            {sessionDone ? t.home.sessionDone : doneBlocks > 0 ? t.home.continueSession : t.home.startSession}
          </ButtonLink>
          {session && (
            <ol className="space-y-1.5">
              {session.blocks.map((b, i) => (
                <li key={i} className={cn('flex items-center gap-3 text-sm', b.done && 'text-muted line-through')}>
                  <span className={cn('grid size-7 place-items-center rounded-lg', b.done ? 'bg-success-soft text-success' : 'bg-surface-2 text-muted')}>
                    {b.done ? <Check className="size-3.5" /> : <BlockIcon block={b} className="size-3.5" />}
                  </span>
                  <span className="flex-1 truncate">{blockTitle(b)}</span>
                  <span className="text-xs text-muted tabular-nums">{b.minutes} min</span>
                </li>
              ))}
            </ol>
          )}
          {day && totalSeconds(day) > 0 && <p className="text-xs text-muted">{Math.round(totalSeconds(day) / 60)} min practised today</p>}
        </Card>
      )}

      {levelCheck.due && (
        <Card className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm">
            <ClipboardCheck className="size-5 shrink-0 text-accent" />
            <span>
              <span className="font-semibold">Time for a level check</span> — {levelCheck.daysSince} days since your last test.
            </span>
          </span>
          <ButtonLink href="/placement?mode=check" size="sm" variant="secondary">
            Start (≈ 10 min)
          </ButtonLink>
        </Card>
      )}

      {latest?.overall && (
        <Link href={`/placement/results?id=${latest.id}`} className="block">
          <Card className="space-y-3 transition-colors hover:bg-surface-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <LevelBadge level={latest.overall.level} large />
                <div>
                  <p className="text-sm text-muted">{t.home.yourLevel}</p>
                  <p className="font-semibold">{LEVEL_NAMES[latest.overall.level]}</p>
                </div>
              </div>
              <ChevronRight className="size-5 text-muted" />
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              {TESTED_SKILLS.map((s) =>
                latest.skills[s] ? (
                  <span key={s} className="flex items-center gap-1.5">
                    {t.skills[s]} <LevelBadge level={latest.skills[s]!.level} />
                  </span>
                ) : null,
              )}
            </div>
          </Card>
        </Link>
      )}
    </div>
  );
}
