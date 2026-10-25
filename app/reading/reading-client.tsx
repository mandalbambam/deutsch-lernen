'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, PenLine, Sparkles } from 'lucide-react';
import { Cloze } from '@/components/practice/cloze';
import { LevelBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, PageHeader } from '@/components/ui/card';
import { Loading, Segmented } from '@/components/ui/misc';
import { INTERESTS } from '@/content/interests';
import { TEXTS } from '@/content/reading';
import { useActivityTimer } from '@/lib/activity';
import { LEVELS, type Level } from '@/lib/cefr';
import { useT } from '@/lib/i18n';
import { useProfile, useSkillStates } from '@/lib/db/profile';
import { useTextProgress } from '@/lib/reading/progress';
import { nextText, wordCount } from '@/lib/reading/select';

const INTEREST_LABEL = Object.fromEntries(INTERESTS.map((i) => [i.id, i.label]));

export function ReadingClient() {
  const t = useT();
  const newLabel = t.pages.new;
  const progress = useTextProgress('reading');
  const states = useSkillStates();
  const profile = useProfile();
  const [chosen, setChosen] = useState<Level | null>(null);
  const [clozeSeed, setClozeSeed] = useState<string | null>(null);
  useActivityTimer('reading', clozeSeed !== null);

  const myLevel: Level = states?.reading?.level ?? 'A1';
  const level = chosen ?? myLevel;
  const done = useMemo(() => new Set([...(progress?.values() ?? [])].filter((p) => p.completedAt).map((p) => p.textId)), [progress]);

  if (clozeSeed) {
    return (
      <div className="space-y-4">
        <PageHeader title="Sentence practice" subtitle="Real sentences from Tatoeba — fill in the missing word." />
        <Cloze level={level} count={8} seed={clozeSeed} onDone={() => setClozeSeed(null)} doneLabel="Back to reading" />
      </div>
    );
  }
  if (!progress) return <Loading />;

  const next = nextText(myLevel, profile.interests, done);
  const texts = TEXTS.filter((t) => t.level === level);

  return (
    <div className="space-y-5">
      <PageHeader title={t.nav.reading} subtitle={t.pages.readingSub} />

      <div className="grid gap-3 sm:grid-cols-2">
        {next && (
          <Card className="space-y-2">
            <CardTitle icon={<Sparkles className="size-4 text-accent" />}>{t.pages.nextForYou}</CardTitle>
            <Link href={`/reading/text?id=${next.id}`} className="block rounded-xl border border-line bg-surface-2 px-3 py-2.5 hover:border-accent">
              <span className="flex items-center gap-2">
                <LevelBadge level={next.level} />
                <span className="font-semibold" lang="de">
                  {next.title}
                </span>
              </span>
              <span className="text-sm text-muted">
                {next.genre} · {wordCount(next.text)} words
              </span>
            </Link>
          </Card>
        )}
        <Card className="space-y-2">
          <CardTitle icon={<PenLine className="size-4 text-accent" />}>Sentence practice</CardTitle>
          <p className="text-sm text-muted">Fill the gap in eight real sentences at level {level}.</p>
          <Button variant="secondary" size="sm" onClick={() => setClozeSeed(`cloze|${level}|${Date.now()}`)}>
            Start
          </Button>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <Segmented ariaLabel="Level" value={level} onChange={setChosen} options={LEVELS.map((l) => ({ value: l, label: l }))} />
      </div>

      <ul className="space-y-2">
        {texts.map((t) => {
          const p = progress.get(t.id);
          return (
            <li key={t.id}>
              <Link href={`/reading/text?id=${t.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors hover:border-accent">
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="font-semibold" lang="de">
                    {t.title}
                  </p>
                  <p className="text-sm text-muted">
                    {t.genre} · {wordCount(t.text)} words · {t.topics.map((x) => INTEREST_LABEL[x]).join(', ')}
                  </p>
                </div>
                {p?.completedAt ? (
                  <span className="flex shrink-0 items-center gap-1 text-sm text-success">
                    <CheckCircle2 className="size-4" /> {Math.round((p.score ?? 0) * 100)}%
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">{newLabel}</span>
                )}
                <ChevronRight className="size-4 shrink-0 text-muted" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
