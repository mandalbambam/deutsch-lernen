'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Ear, Sparkles } from 'lucide-react';
import { ScriptPlayer } from '@/components/listening/script-player';
import { Dictation } from '@/components/practice/dictation';
import type { PracticeResult } from '@/components/practice/shell';
import { LevelBadge } from '@/components/ui/badge';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card, CardTitle, PageHeader } from '@/components/ui/card';
import { EmptyState, Loading, Notice, Segmented } from '@/components/ui/misc';
import { LISTENING, SCRIPT_BY_ID } from '@/content/listening/scripts';
import { useActivityTimer } from '@/lib/activity';
import { LEVELS, type Level } from '@/lib/cefr';
import { useT } from '@/lib/i18n';
import { useProfile, useSkillStates } from '@/lib/db/profile';
import { useTextProgress } from '@/lib/reading/progress';
import { nextScript } from '@/lib/reading/select';
import { useTts } from '@/lib/speech/use-tts';

export function ListeningClient() {
  const id = useSearchParams().get('id');
  if (id) return <ScriptPage key={id} id={id} />;
  return <ListeningIndex />;
}

function ListeningIndex() {
  const t = useT();
  const tts = useTts();
  const progress = useTextProgress('listening');
  const states = useSkillStates();
  const profile = useProfile();
  const [chosen, setChosen] = useState<Level | null>(null);
  const [dictationSeed, setDictationSeed] = useState<string | null>(null);
  useActivityTimer('listening', dictationSeed !== null);

  const myLevel: Level = states?.listening?.level ?? 'A1';
  const level = chosen ?? myLevel;
  const done = useMemo(() => new Set([...(progress?.values() ?? [])].filter((p) => p.completedAt).map((p) => p.textId)), [progress]);

  if (dictationSeed) {
    return (
      <div className="space-y-4">
        <PageHeader title="Dictation" subtitle="Listen to a real sentence and type what you hear." />
        <Dictation level={level} count={8} seed={dictationSeed} onDone={() => setDictationSeed(null)} doneLabel="Back to listening" />
      </div>
    );
  }
  if (!progress) return <Loading />;

  const next = nextScript(myLevel, profile.interests, done);
  const scripts = LISTENING.filter((s) => s.level === level);
  const noVoice = tts.ready && !tts.hasGerman;

  return (
    <div className="space-y-5">
      <PageHeader title={t.nav.listening} subtitle={t.pages.listeningSub} />
      {noVoice && (
        <Notice tone="warning" title="No German voice found">
          Your browser has no German text-to-speech voice. Listening tasks fall back to reading the transcript. Chrome, Edge and Safari usually include German voices; on Android install “Speech Services by Google”.
        </Notice>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {next && (
          <Card className="space-y-2">
            <CardTitle icon={<Sparkles className="size-4 text-accent" />}>{t.pages.nextForYou}</CardTitle>
            <Link href={`/listening?id=${next.id}`} className="block rounded-xl border border-line bg-surface-2 px-3 py-2.5 hover:border-accent">
              <span className="flex items-center gap-2">
                <LevelBadge level={next.level} />
                <span className="font-semibold" lang="de">
                  {next.title}
                </span>
              </span>
              <span className="text-sm text-muted">{next.situation}</span>
            </Link>
          </Card>
        )}
        <Card className="space-y-2">
          <CardTitle icon={<Ear className="size-4 text-accent" />}>Dictation</CardTitle>
          <p className="text-sm text-muted">Eight real sentences at level {level}: listen, type, compare.</p>
          <Button variant="secondary" size="sm" disabled={noVoice} onClick={() => setDictationSeed(`dict|${level}|${Date.now()}`)}>
            Start
          </Button>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <Segmented ariaLabel="Level" value={level} onChange={setChosen} options={LEVELS.map((l) => ({ value: l, label: l }))} />
      </div>

      <ul className="space-y-2">
        {scripts.map((s) => {
          const p = progress.get(s.id);
          return (
            <li key={s.id}>
              <Link href={`/listening?id=${s.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors hover:border-accent">
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="font-semibold" lang="de">
                    {s.title}
                  </p>
                  <p className="text-sm text-muted">
                    {s.kind === 'dialogue' ? 'Dialogue' : 'Monologue'} · {s.situation}
                  </p>
                </div>
                {p?.completedAt ? (
                  <span className="flex shrink-0 items-center gap-1 text-sm text-success">
                    <CheckCircle2 className="size-4" /> {Math.round((p.score ?? 0) * 100)}%
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">{t.pages.new}</span>
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

function ScriptPage({ id }: { id: string }) {
  const script = SCRIPT_BY_ID[id];
  const [result, setResult] = useState<PracticeResult | null>(null);
  const progress = useTextProgress('listening');
  const profile = useProfile();

  if (!script) {
    return (
      <EmptyState title="Listening task not found">
        <ButtonLink href="/listening" variant="secondary">
          All listening tasks
        </ButtonLink>
      </EmptyState>
    );
  }

  if (result) {
    const done = new Set([...(progress?.values() ?? [])].filter((p) => p.completedAt).map((p) => p.textId));
    done.add(script.id);
    const next = nextScript(script.level, profile.interests, done);
    const pct = result.total ? Math.round((result.correct / result.total) * 100) : 0;
    return (
      <div className="animate-fade-in flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-10 text-center">
        <CheckCircle2 className="size-10 text-success" />
        <p className="text-xl font-bold">Done · {pct}% correct</p>
        <div className="flex flex-wrap justify-center gap-2">
          {next && (
            <ButtonLink href={`/listening?id=${next.id}`}>
              Next: {next.title} <ArrowRight className="size-4" />
            </ButtonLink>
          )}
          <ButtonLink href="/listening" variant="secondary">
            All listening tasks
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/listening" className="flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Listening
      </Link>
      <ScriptPlayer script={script} onFinished={setResult} />
    </div>
  );
}
