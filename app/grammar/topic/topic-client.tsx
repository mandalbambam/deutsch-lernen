'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Dumbbell, PenLine, Sparkles, Volume2 } from 'lucide-react';
import { AiErrorNotice, AiNotice, useAiState } from '@/components/ai/ai-ui';
import { ExerciseRunner } from '@/components/exercise/exercise-runner';
import { Markdown } from '@/components/markdown';
import { LevelBadge } from '@/components/ui/badge';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { EmptyState, ProgressBar, Spinner } from '@/components/ui/misc';
import { LESSON_BY_ID, TOPIC_BY_ID } from '@/content/grammar';
import { useActivityTimer } from '@/lib/activity';
import { AI_EXERCISE_LEVELS } from '@/lib/ai/schemas';
import { aiExercises } from '@/lib/exercise/ai-exercises';
import { markExplanationSeen } from '@/lib/exercise/attempts';
import { generateDrills } from '@/lib/exercise/drill-data';
import type { Exercise } from '@/lib/exercise/types';
import { neighbours, topicStatus, useTopicProgress } from '@/lib/grammar/progress';
import { hashString, mulberry32, shuffled } from '@/lib/random';
import { useTts } from '@/lib/speech/use-tts';
import { useT } from '@/lib/i18n';

type Mode = { kind: 'learn' } | { kind: 'practice'; exercises: Exercise[]; seed: string; drill: boolean; ai?: boolean };

export function TopicClient() {
  const id = useSearchParams().get('id') ?? '';
  // remount per topic so state never leaks between topics
  return <Topic key={id} id={id} />;
}

function Topic({ id }: { id: string }) {
  const topic = TOPIC_BY_ID[id];
  const lesson = LESSON_BY_ID[id];
  const t = useT();
  const tts = useTts();
  const progress = useTopicProgress();
  const [mode, setMode] = useState<Mode>({ kind: 'learn' });
  const [round, setRound] = useState(0);
  const [loadingDrill, setLoadingDrill] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<unknown>(null);
  const [showAiNotice, setShowAiNotice] = useState(false);
  const ai = useAiState();
  useActivityTimer('grammar', mode.kind === 'practice');

  if (!topic || !lesson) {
    return (
      <EmptyState title="Topic not found">
        <ButtonLink href="/grammar" variant="secondary">
          All grammar topics
        </ButtonLink>
      </EmptyState>
    );
  }

  const p = progress?.get(id);
  const status = topicStatus(p);
  const { prev, next } = neighbours(id);

  const practise = () => {
    markExplanationSeen(id).catch(() => {});
    const seed = `${id}|${round}`;
    const list = round === 0 ? lesson.exercises : shuffled(lesson.exercises, mulberry32(hashString(seed)));
    setRound((r) => r + 1);
    setMode({ kind: 'practice', exercises: list, seed, drill: false });
    window.scrollTo({ top: 0 });
  };

  const drill = async () => {
    if (!lesson.drills?.length) return;
    setLoadingDrill(true);
    try {
      const seed = `${id}|drill|${Date.now()}`;
      const exercises = await generateDrills(lesson.drills, topic.level, 10, seed);
      setMode({ kind: 'practice', exercises, seed, drill: true });
      window.scrollTo({ top: 0 });
    } finally {
      setLoadingDrill(false);
    }
  };

  const aiOffered = AI_EXERCISE_LEVELS.includes(topic.level) && (ai.state === 'ready' || ai.state === 'needs-notice');
  const aiPractice = async () => {
    if (ai.state !== 'ready') {
      setShowAiNotice(true);
      setMode({ kind: 'learn' });
      return;
    }
    setLoadingAi(true);
    setAiError(null);
    try {
      const exercises = await aiExercises(id);
      if (!exercises.length) throw new Error('no usable exercises');
      setMode({ kind: 'practice', exercises, seed: `${id}|ai|${Date.now()}`, drill: false, ai: true });
      window.scrollTo({ top: 0 });
    } catch (err) {
      setAiError(err);
      setMode({ kind: 'learn' });
    } finally {
      setLoadingAi(false);
    }
  };

  if (mode.kind === 'practice') {
    return (
      <div className="space-y-4">
        <button type="button" onClick={() => setMode({ kind: 'learn' })} className="flex items-center gap-1 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" /> {topic.title}
        </button>
        {mode.exercises.length === 0 ? (
          <EmptyState title="No exercises available offline yet">
            <Button variant="secondary" onClick={() => setMode({ kind: 'learn' })}>
              Back to the explanation
            </Button>
          </EmptyState>
        ) : (
          <ExerciseRunner
            key={mode.seed}
            exercises={mode.exercises}
            title={mode.ai ? `${topic.title} · AI` : mode.drill ? `${topic.title} · drill` : topic.title}
            topicId={id}
            level={topic.level}
            seed={mode.seed}
            onDone={() => setMode({ kind: 'learn' })}
            doneLabel="Back to the topic"
            summaryExtra={
              <div className="flex flex-wrap justify-center gap-2">
                {mode.ai ? (
                  <Button variant="secondary" onClick={aiPractice} disabled={loadingAi}>
                    {loadingAi ? <Spinner className="size-4" /> : <Sparkles className="size-4" />} 10 more (AI)
                  </Button>
                ) : mode.drill ? (
                  <Button variant="secondary" onClick={drill} disabled={loadingDrill}>
                    <Dumbbell className="size-4" /> 10 more
                  </Button>
                ) : (
                  <>
                    <Button variant="secondary" onClick={practise}>
                      <PenLine className="size-4" /> Practise again
                    </Button>
                    {lesson.drills?.length ? (
                      <Button variant="secondary" onClick={drill} disabled={loadingDrill}>
                        <Dumbbell className="size-4" /> Extra drill
                      </Button>
                    ) : null}
                  </>
                )}
                {next && (
                  <ButtonLink href={`/grammar/topic?id=${next.id}`} variant="ghost">
                    Next topic <ArrowRight className="size-4" />
                  </ButtonLink>
                )}
              </div>
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/grammar" className="flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Grammar
      </Link>
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <LevelBadge level={topic.level} />
          <h1 className="text-2xl font-bold">{topic.title}</h1>
        </div>
        <p className="text-muted" lang="de">
          {topic.de}
        </p>
        {progress && p && p.attempts > 0 && (
          <div className="flex items-center gap-3 text-sm">
            <ProgressBar value={p.mastery} max={1} className="max-w-56" label="Mastery" tone={status === 'mastered' ? 'success' : 'accent'} />
            <span className="text-muted tabular-nums">{status === 'mastered' ? 'Mastered' : `${Math.round(p.mastery * 100)}% mastery`}</span>
          </div>
        )}
      </header>

      <Card>
        <Markdown text={lesson.explanation} />
      </Card>

      <Card className="space-y-3">
        <CardTitle>Examples</CardTitle>
        <ul className="space-y-2.5">
          {lesson.examples.map((ex, i) => (
            <li key={i} className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => tts.say(ex.de)}
                disabled={!tts.hasGerman}
                className="mt-0.5 rounded-lg p-1.5 text-muted hover:bg-surface-2 disabled:opacity-40"
                aria-label={`Listen: ${ex.de}`}
              >
                <Volume2 className="size-4" />
              </button>
              <div>
                <p className="font-medium" lang="de">
                  {ex.de}
                </p>
                <p className="text-sm text-muted">{ex.en}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {showAiNotice && ai.state === 'needs-notice' && <AiNotice compact />}
      {aiError ? <AiErrorNotice error={aiError} /> : null}

      <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-10 flex flex-wrap gap-2 rounded-2xl border border-line bg-surface/95 p-3 backdrop-blur md:bottom-4">
        <Button onClick={practise} className="flex-1 sm:flex-none">
          <PenLine className="size-4" /> {t.exercise.practise} ({lesson.exercises.length})
        </Button>
        {lesson.drills?.length ? (
          <Button variant="secondary" onClick={drill} disabled={loadingDrill} className="flex-1 sm:flex-none">
            {loadingDrill ? <Spinner className="size-4" /> : <Dumbbell className="size-4" />} {t.exercise.drill}
          </Button>
        ) : null}
        {aiOffered && (
          <Button variant="secondary" onClick={aiPractice} disabled={loadingAi} className="flex-1 sm:flex-none">
            {loadingAi ? <Spinner className="size-4" /> : <Sparkles className="size-4" />} AI exercises
          </Button>
        )}
      </div>

      <nav className="flex justify-between gap-2 text-sm" aria-label="Other topics">
        {prev ? (
          <Link href={`/grammar/topic?id=${prev.id}`} className="flex items-center gap-1 text-muted hover:text-fg">
            <ArrowLeft className="size-4" /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/grammar/topic?id=${next.id}`} className="flex items-center gap-1 text-right text-muted hover:text-fg">
            {next.title} <ArrowRight className="size-4" />
          </Link>
        )}
      </nav>
    </div>
  );
}
