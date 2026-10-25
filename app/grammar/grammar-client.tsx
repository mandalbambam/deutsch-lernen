'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { LevelBadge } from '@/components/ui/badge';
import { Card, CardTitle, PageHeader } from '@/components/ui/card';
import { Loading, ProgressBar, Segmented } from '@/components/ui/misc';
import { LESSON_BY_ID, TOPICS } from '@/content/grammar';
import { LEVELS, type Level } from '@/lib/cefr';
import { useT } from '@/lib/i18n';
import { useSkillStates } from '@/lib/db/profile';
import { topicStatus, useRecommendedTopics, useTopicProgress } from '@/lib/grammar/progress';

export function GrammarClient() {
  const t = useT();
  const newLabel = t.pages.new;
  const masteredLabel = t.pages.mastered;
  const progress = useTopicProgress();
  const states = useSkillStates();
  const recommended = useRecommendedTopics(3);
  const [chosen, setChosen] = useState<Level | null>(null);
  const level: Level = chosen ?? states?.grammar?.level ?? 'A1';

  if (!progress) return <Loading />;

  const topics = TOPICS.filter((t) => t.level === level && LESSON_BY_ID[t.id]);
  const done = (l: Level) => TOPICS.filter((t) => t.level === l && topicStatus(progress.get(t.id)) === 'mastered').length;

  return (
    <div className="space-y-5">
      <PageHeader title={t.nav.grammar} subtitle={t.pages.grammarSub} />

      {recommended && recommended.length > 0 && (
        <Card className="space-y-3">
          <CardTitle icon={<Sparkles className="size-4 text-accent" />}>{t.pages.recommended}</CardTitle>
          <ul className="grid gap-2 sm:grid-cols-3">
            {recommended.map((t) => (
              <li key={t.id}>
                <Link href={`/grammar/topic?id=${t.id}`} className="flex h-full flex-col gap-1 rounded-xl border border-line bg-surface-2 px-3 py-2.5 hover:border-accent">
                  <span className="flex items-center gap-2">
                    <LevelBadge level={t.level} />
                    <span className="font-semibold">{t.title}</span>
                  </span>
                  <span className="text-sm text-muted">{t.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="overflow-x-auto">
        <Segmented
          ariaLabel="Level"
          value={level}
          onChange={setChosen}
          options={LEVELS.map((l) => ({ value: l, label: l }))}
        />
      </div>

      <section aria-label={`${level} topics`} className="space-y-2">
        <p className="text-sm text-muted">
          {done(level)} of {topics.length} topics mastered at {level}
        </p>
        <ul className="space-y-2">
          {topics.map((t) => {
            const p = progress.get(t.id);
            const status = topicStatus(p);
            return (
              <li key={t.id}>
                <Link
                  href={`/grammar/topic?id=${t.id}`}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors hover:border-accent"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-semibold">{t.title}</span>
                      <span className="text-sm text-muted" lang="de">
                        {t.de}
                      </span>
                    </p>
                    <p className="text-sm text-muted">{t.summary}</p>
                    {status === 'started' && p && <ProgressBar value={p.mastery} max={1} className="max-w-48" label={`${t.title} mastery`} />}
                  </div>
                  {status === 'mastered' ? (
                    <CheckCircle2 className="size-5 shrink-0 text-success" aria-label={masteredLabel} />
                  ) : status === 'new' ? (
                    <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">{newLabel}</span>
                  ) : (
                    <span className="shrink-0 text-xs text-muted tabular-nums">{Math.round((p?.mastery ?? 0) * 100)}%</span>
                  )}
                  <ChevronRight className="size-4 shrink-0 text-muted" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
