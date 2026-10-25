'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { Check, Flame, SkipForward, Sparkles } from 'lucide-react';
import { BlockIcon, blockTitle } from '@/components/session/block-meta';
import type { PracticeResult } from '@/components/practice/shell';
import { Speak } from '@/components/practice/speak';
import { Translate } from '@/components/practice/translate';
import { CardsBlock } from '@/components/session/cards-block';
import { GrammarBlock } from '@/components/session/grammar-block';
import { ListeningBlock, ReadingBlock } from '@/components/session/input-blocks';
import { WritingBlock } from '@/components/session/writing-block';
import { LevelBadge } from '@/components/ui/badge';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card, PageHeader } from '@/components/ui/card';
import { EmptyState, Loading, Notice } from '@/components/ui/misc';
import { computeStreak, totalSeconds, useActivityTimer } from '@/lib/activity';
import { cn } from '@/lib/cn';
import { db, today } from '@/lib/db';
import type { Module, SessionBlock, WeeklyPlan } from '@/lib/db/types';
import { useT } from '@/lib/i18n';
import { targetLevelFor } from '@/lib/plan/session';
import { latestPlan } from '@/lib/plan/store';
import { completeBlock, ensureTodaySession } from '@/lib/plan/today';

const MODULE_FOR: Record<SessionBlock['kind'], Module> = {
  cards: 'cards',
  grammar: 'grammar',
  reading: 'reading',
  listening: 'listening',
  output: 'output',
};

export function SessionClient() {
  const t = useT();
  const [state, setState] = useState<'loading' | 'no-plan' | 'ready'>('loading');
  const [notes, setNotes] = useState<string[] | undefined>();
  const [plan, setPlan] = useState<WeeklyPlan | undefined>();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    ensureTodaySession().then(async (res) => {
      if (!res) {
        setState('no-plan');
        return;
      }
      setNotes(res.adjustedNotes);
      setPlan(await latestPlan());
      setState('ready');
    });
  }, []);

  const day = useLiveQuery(() => db.days.get(today()), []);
  const streak = useLiveQuery(async () => computeStreak(await db.days.toArray()), [day?.session?.completedAt]);
  const blocks = day?.session?.blocks ?? [];
  const currentIndex = blocks.findIndex((b) => !b.done);
  const current = currentIndex >= 0 ? blocks[currentIndex] : undefined;
  useActivityTimer(current ? MODULE_FOR[current.kind] : 'cards', !!current);

  if (state === 'loading' || (state === 'ready' && !day?.session)) return <Loading label={t.common.loading} />;
  if (state === 'no-plan') {
    return (
      <>
        <PageHeader title={t.nav.session} />
        <EmptyState icon={<Sparkles className="size-8" />} title={t.home.noTestTitle}>
          {t.home.noTestBody}
          <div className="mt-4">
            <ButtonLink href="/placement">{t.home.takeTest}</ButtonLink>
          </div>
        </EmptyState>
      </>
    );
  }

  const totalMinutes = blocks.reduce((s, b) => s + b.minutes, 0);
  const finish = (result: PracticeResult) => completeBlock(currentIndex, result);

  return (
    <>
      <PageHeader title={t.nav.session} subtitle={`${totalMinutes} ${t.common.minutes} · ${blocks.filter((b) => b.done).length}/${blocks.length} done`} />
      <div className="space-y-4">
        {notes && (
          <Notice tone="info" title="Your plan was updated for this week">
            <ul className="list-disc pl-4">
              {notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Notice>
        )}

        <ol className="grid gap-2 sm:grid-cols-2">
          {blocks.map((b, i) => (
            <li
              key={`${b.kind}-${i}`}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-3 py-2 text-sm',
                i === currentIndex ? 'border-accent bg-accent-soft' : 'border-line bg-surface',
                b.done && 'opacity-70',
              )}
            >
              <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg', b.done ? 'bg-success text-white dark:text-bg' : 'bg-surface-2 text-muted')}>
                {b.done ? <Check className="size-4" /> : <BlockIcon block={b} className="size-4" />}
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">{blockTitle(b)}</span>
              {plan && <LevelBadge level={targetLevelFor(b.kind, plan)} />}
              <span className="text-xs text-muted tabular-nums">{b.minutes}′</span>
            </li>
          ))}
        </ol>

        {current && plan ? (
          <section aria-label={blockTitle(current)} className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <BlockIcon block={current} className="size-5 text-accent" /> {blockTitle(current)}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => finish({ correct: 0, total: 0, note: 'skipped' })}>
                <SkipForward className="size-4" /> {t.common.skip}
              </Button>
            </div>
            <BlockRunner key={`${day?.date}-${currentIndex}`} block={current} plan={plan} date={day!.date} onDone={finish} />
          </section>
        ) : (
          <Card className="flex flex-col items-center gap-3 py-10 text-center">
            <Flame className="size-10 text-warning" />
            <p className="text-xl font-bold">{t.home.sessionDone}</p>
            <p className="text-muted">
              {streak ? `${streak} ${t.home.streak}` : ''} · {Math.round(totalSeconds(day) / 60)} min today
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <ButtonLink href="/cards" variant="secondary">
                {t.nav.flashcards}
              </ButtonLink>
              <ButtonLink href="/learn" variant="secondary">
                {t.home.extraPractice}
              </ButtonLink>
            </div>
          </Card>
        )}
        {!current && (
          <p className="text-center text-sm text-muted">
            <Link href="/" className="hover:underline">
              {t.nav.today}
            </Link>
          </p>
        )}
      </div>
    </>
  );
}

function BlockRunner({ block, plan, date, onDone }: { block: SessionBlock; plan: WeeklyPlan; date: string; onDone: (r: PracticeResult) => void }) {
  const level = targetLevelFor(block.kind, plan);
  const seed = `${date}|${block.kind}|${block.ref ?? ''}`;
  const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(n)));
  switch (block.kind) {
    case 'cards':
      return <CardsBlock minutes={block.minutes} onDone={onDone} />;
    case 'grammar':
      return <GrammarBlock topicId={block.ref} minutes={block.minutes} seed={seed} onDone={onDone} />;
    case 'reading':
      return <ReadingBlock level={level} minutes={block.minutes} seed={seed} onDone={onDone} />;
    case 'listening':
      return <ListeningBlock level={level} minutes={block.minutes} seed={seed} onDone={onDone} />;
    case 'output':
      if (block.ref === 'speak') return <Speak level={level} count={clamp(block.minutes, 3, 6)} seed={seed} onDone={onDone} />;
      if (block.ref === 'write') return <WritingBlock level={level} seed={seed} onDone={onDone} />;
      return <Translate level={level} count={clamp(block.minutes, 3, 6)} seed={seed} onDone={onDone} />;
  }
}
