'use client';

import { useCallback, useMemo, useState } from 'react';
import { Headphones, Pause, Play, Volume2 } from 'lucide-react';
import { ExerciseRunner } from '@/components/exercise/exercise-runner';
import type { PracticeResult } from '@/components/practice/shell';
import { InteractiveText, type WordTap } from '@/components/reading/interactive-text';
import { WordSheet } from '@/components/reading/word-sheet';
import { LevelBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Notice, Segmented } from '@/components/ui/misc';
import type { ListeningScript } from '@/content/listening/scripts';
import { useActivityTimer } from '@/lib/activity';
import { useProfile } from '@/lib/db/profile';
import { saveTextProgress, toExercises } from '@/lib/reading/progress';
import { useTts } from '@/lib/speech/use-tts';

type Speed = 'normal' | 'slow';

/**
 * Listening comprehension with text-to-speech: read the questions, listen (as often as you like),
 * answer, then check the transcript.
 */
export function ScriptPlayer({ script, onFinished, doneLabel = 'Finish' }: { script: ListeningScript; onFinished: (r: PracticeResult) => void; doneLabel?: string }) {
  const tts = useTts();
  const profile = useProfile();
  const [stage, setStage] = useState<'listen' | 'questions' | 'review'>('listen');
  const [speed, setSpeed] = useState<Speed>('normal');
  const [plays, setPlays] = useState(0);
  const [result, setResult] = useState<PracticeResult | null>(null);
  const [tap, setTap] = useState<WordTap | null>(null);
  const [lookups, setLookups] = useState(0);
  useActivityTimer('listening', true);

  const exercises = useMemo(() => toExercises(script.questions, `listen:${script.id}`, 'listening'), [script]);
  const canListen = tts.supported && tts.hasGerman;
  const rate = profile.tts.rate * (speed === 'slow' ? 0.8 : 1);

  const play = () => {
    if (tts.speaking) {
      tts.stop();
      return;
    }
    setPlays((n) => n + 1);
    tts.sayDialogue(script.lines, rate);
  };

  const onTap = useCallback((t: WordTap) => {
    setTap(t);
    setLookups((n) => n + 1);
  }, []);

  const controls = canListen && (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={play} size="lg">
        {tts.speaking ? <Pause className="size-5" /> : <Play className="size-5" />}
        {tts.speaking ? 'Stop' : plays === 0 ? 'Play' : 'Play again'}
      </Button>
      <Segmented
        ariaLabel="Speed"
        value={speed}
        onChange={setSpeed}
        options={[
          { value: 'normal', label: 'Normal' },
          { value: 'slow', label: 'Slower' },
        ]}
      />
      {plays > 0 && <span className="text-sm text-muted">Played {plays}×</span>}
    </div>
  );

  const transcript = (
    <ol className="space-y-3">
      {script.lines.map((l, i) => (
        <li key={i} className="flex gap-2">
          {canListen && (
            <button
              type="button"
              onClick={() => tts.say(l.text, rate)}
              className="mt-0.5 h-fit rounded-lg p-1.5 text-muted hover:bg-surface-2"
              aria-label={`Play line ${i + 1}`}
            >
              <Volume2 className="size-4" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            {script.kind === 'dialogue' && <p className="text-xs font-semibold text-muted">{l.speaker}</p>}
            <InteractiveText text={l.text} onTap={onTap} className="space-y-0" />
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <LevelBadge level={script.level} />
          <span>{script.kind === 'dialogue' ? 'Dialogue' : 'Monologue'}</span>
        </div>
        <h2 className="text-xl font-bold sm:text-2xl" lang="de">
          {script.title}
        </h2>
        <p className="text-muted">{script.situation}</p>
      </header>

      {stage === 'listen' && (
        <>
          {!canListen && (
            <Notice tone="warning" title="No German voice available">
              Your browser can’t read German aloud, so this becomes a reading exercise: read the transcript, then answer the questions. Chrome, Edge and Safari usually include German voices.
            </Notice>
          )}
          <Card className="space-y-3">
            <p className="flex items-center gap-2 font-semibold">
              <Headphones className="size-4 text-accent" /> First read the questions, then listen.
            </p>
            <ol className="list-decimal space-y-1 pl-5 text-sm" lang="de">
              {script.questions.map((q, i) => (
                <li key={i}>{q.q}</li>
              ))}
            </ol>
          </Card>
          {canListen ? controls : <Card>{transcript}</Card>}
          <div className="flex justify-end">
            <Button
              variant={plays > 0 || !canListen ? 'primary' : 'secondary'}
              onClick={() => {
                setStage('questions');
                window.scrollTo({ top: 0 });
              }}
            >
              Answer the questions
            </Button>
          </div>
        </>
      )}

      {stage === 'questions' && (
        <>
          {canListen ? controls : <Card>{transcript}</Card>}
          <ExerciseRunner
            exercises={exercises}
            title="Comprehension"
            module="listening"
            skill="listening"
            level={script.level}
            seed={script.id}
            doneLabel="Show transcript"
            onDone={(r) => {
              tts.stop();
              setResult(r);
              setStage('review');
              window.scrollTo({ top: 0 });
            }}
          />
        </>
      )}

      {stage === 'review' && (
        <>
          <Card className="space-y-3">
            <p className="font-semibold">Transcript</p>
            <p className="text-sm text-muted">Listen line by line and tap any word you didn’t catch.</p>
            {transcript}
          </Card>
          <div className="flex justify-end">
            <Button
              onClick={async () => {
                tts.stop();
                const r = result ?? { correct: 0, total: 0 };
                await saveTextProgress(script.id, 'listening', r, lookups).catch(() => {});
                onFinished(r);
              }}
            >
              {doneLabel}
            </Button>
          </div>
        </>
      )}
      <WordSheet tap={tap} onClose={() => setTap(null)} source="listening" />
    </div>
  );
}
