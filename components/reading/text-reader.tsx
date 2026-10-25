'use client';

import { useCallback, useMemo, useState } from 'react';
import { BookOpen, ChevronDown, Pause, Volume2 } from 'lucide-react';
import { ExerciseRunner } from '@/components/exercise/exercise-runner';
import type { PracticeResult } from '@/components/practice/shell';
import { LevelBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { ReadingText } from '@/content/reading';
import { useActivityTimer } from '@/lib/activity';
import { cn } from '@/lib/cn';
import { saveTextProgress, toExercises } from '@/lib/reading/progress';
import { wordCount } from '@/lib/reading/select';
import { useTts } from '@/lib/speech/use-tts';
import { InteractiveText, type WordTap } from './interactive-text';
import { WordSheet } from './word-sheet';

/** A graded text with tap-to-look-up, read-aloud and comprehension questions. */
export function TextReader({ text, onFinished, doneLabel }: { text: ReadingText; onFinished: (r: PracticeResult) => void; doneLabel?: string }) {
  const tts = useTts();
  const [stage, setStage] = useState<'read' | 'questions'>('read');
  const [tap, setTap] = useState<WordTap | null>(null);
  const [marked, setMarked] = useState<Set<string>>(() => new Set());
  const [showText, setShowText] = useState(false);
  useActivityTimer('reading', true);

  const exercises = useMemo(() => toExercises(text.questions, `text:${text.id}`, 'reading'), [text]);
  const words = wordCount(text.text);
  const minutes = Math.max(1, Math.round(words / 110));

  const onTap = useCallback((t: WordTap) => {
    setTap(t);
    setMarked((m) => new Set(m).add(t.key));
  }, []);

  const finish = async (r: PracticeResult) => {
    await saveTextProgress(text.id, 'reading', r, marked.size).catch(() => {});
    onFinished(r);
  };

  const listen = () => (tts.speaking ? tts.stop() : tts.say(text.text));

  const body = <InteractiveText text={text.text} onTap={onTap} marked={marked} />;

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <LevelBadge level={text.level} />
          <span>{text.genre}</span>
          <span aria-hidden>·</span>
          <span>
            {words} words · ~{minutes} min
          </span>
        </div>
        <h2 className="text-xl font-bold sm:text-2xl" lang="de">
          {text.title}
        </h2>
      </header>

      {stage === 'read' ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {tts.hasGerman && (
              <Button variant="secondary" size="sm" onClick={listen}>
                {tts.speaking ? <Pause className="size-4" /> : <Volume2 className="size-4" />} {tts.speaking ? 'Stop' : 'Listen'}
              </Button>
            )}
            <p className="text-sm text-muted">Tap any word to look it up and save it to your flashcards.</p>
          </div>
          <Card>{body}</Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted">{marked.size > 0 ? `${marked.size} word${marked.size === 1 ? '' : 's'} looked up` : ''}</p>
            <Button
              onClick={() => {
                tts.stop();
                setStage('questions');
                window.scrollTo({ top: 0 });
              }}
            >
              <BookOpen className="size-4" /> Answer {exercises.length} questions
            </Button>
          </div>
        </>
      ) : (
        <>
          <Card className="p-0 sm:p-0">
            <button
              type="button"
              onClick={() => setShowText((s) => !s)}
              aria-expanded={showText}
              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-sm font-medium sm:px-5"
            >
              {showText ? 'Hide the text' : 'Show the text again'}
              <ChevronDown className={cn('size-4 transition-transform', showText && 'rotate-180')} />
            </button>
            {showText && <div className="border-t border-line px-4 py-4 sm:px-5">{body}</div>}
          </Card>
          <ExerciseRunner
            exercises={exercises}
            title="Comprehension"
            module="reading"
            skill="reading"
            level={text.level}
            seed={text.id}
            onDone={finish}
            doneLabel={doneLabel}
          />
        </>
      )}
      <WordSheet tap={tap} onClose={() => setTap(null)} source="reading" />
    </div>
  );
}
