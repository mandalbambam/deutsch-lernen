'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';
import { DiffView } from '@/components/exercise/diff-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading, Notice } from '@/components/ui/misc';
import type { Level } from '@/lib/cefr';
import { pickSentences, type Sentence } from '@/lib/data/sentences';
import { recordAttempt } from '@/lib/exercise/attempts';
import { listen, recognitionSupported, type ListenHandle } from '@/lib/speech/stt';
import { useTts } from '@/lib/speech/use-tts';
import { diffWords, type DiffResult } from '@/lib/text/diff';
import { useClientValue } from '@/lib/use-client-value';
import { PracticeHeader, PracticeSummary, type PracticeResult } from './shell';

/** Read aloud / shadowing with speech recognition: listen to the model, say it, see what was understood. */
export function Speak({
  level,
  count,
  seed,
  onDone,
  doneLabel,
}: {
  level: Level;
  count: number;
  seed: string;
  onDone: (r: PracticeResult) => void;
  doneLabel?: string;
}) {
  const tts = useTts();
  const supported = useClientValue(recognitionSupported, true);
  const [items, setItems] = useState<Sentence[] | null>(null);
  const [index, setIndex] = useState(0);
  const [heard, setHeard] = useState('');
  const [listening, setListening] = useState(false);
  const [diff, setDiff] = useState<DiffResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const handle = useRef<ListenHandle | null>(null);

  useEffect(() => {
    pickSentences(level, count, { seed, minWords: 4, maxWords: 12 }).then(setItems);
  }, [level, count, seed]);
  useEffect(() => () => handle.current?.stop(), []);

  if (!supported) {
    return (
      <Notice tone="warning" title="Speech recognition is not available in this browser">
        Use Chrome, Edge or Safari for speaking practice.
        <div className="mt-3">
          <Button size="sm" variant="secondary" onClick={() => onDone({ correct: 0, total: 0, note: 'skipped: no speech recognition' })}>
            Skip
          </Button>
        </div>
      </Notice>
    );
  }
  if (!items) return <Loading />;
  const item = items[index];
  if (!item) return <PracticeSummary result={{ correct: score, total: items.length }} onContinue={() => onDone({ correct: score, total: items.length })} label={doneLabel} />;

  const start = async () => {
    setError(null);
    setHeard('');
    setDiff(null);
    tts.stop();
    setListening(true);
    try {
      handle.current = listen(setHeard);
      const text = await handle.current.result;
      setHeard(text);
      if (text) {
        const d = diffWords(item.de, text);
        setDiff(d);
      } else {
        setError('Nothing was recognised — try again a little louder.');
      }
    } catch (e) {
      const msg = String((e as Error).message);
      setError(msg === 'not-allowed' ? 'Microphone access was blocked. Allow it in the browser’s site settings.' : `Recognition failed (${msg}).`);
    } finally {
      setListening(false);
      handle.current = null;
    }
  };

  const next = async () => {
    const s = diff ? diff.score : 0;
    setScore((x) => x + s);
    await recordAttempt({
      module: 'output',
      skill: 'writing',
      itemId: `speak:${item.id}`,
      level: item.level,
      correct: s >= 0.85,
      score: s,
    });
    setIndex((i) => i + 1);
    setHeard('');
    setDiff(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <PracticeHeader title="Say it aloud" index={index} total={items.length} />
      <Card className="space-y-4">
        <div className="flex items-start gap-2">
          <p className="reading-text flex-1 font-medium" lang="de">
            {item.de}
          </p>
          <button type="button" onClick={() => tts.say(item.de)} aria-label="Listen to the model" className="rounded-full p-2 text-muted hover:text-accent">
            <Volume2 className="size-5" />
          </button>
        </div>
        <p className="text-sm text-muted">{item.en}</p>
        <div className="flex flex-wrap items-center gap-3">
          {listening ? (
            <Button variant="danger" onClick={() => handle.current?.stop()}>
              <Square className="size-4" /> Stop
            </Button>
          ) : (
            <Button onClick={start}>
              <Mic className="size-4" /> {diff ? 'Try again' : 'Speak'}
            </Button>
          )}
          {listening && <span className="animate-pulse text-sm text-accent">Listening…</span>}
        </div>
        {heard && !diff && <p className="text-muted italic">{heard}</p>}
        {error && <p className="text-sm text-danger">{error}</p>}
        {diff && (
          <div className="space-y-1 rounded-xl bg-surface-2 p-3">
            <p className="text-xs font-semibold text-muted uppercase">What the recogniser understood</p>
            <DiffView diff={diff} />
            <p className="text-sm">{diff.score >= 0.85 ? 'Very clear!' : diff.score >= 0.6 ? 'Mostly understood — listen again and repeat.' : 'Listen to the model and try again.'}</p>
          </div>
        )}
        <div className="flex justify-end">
          <Button variant={diff ? 'primary' : 'ghost'} onClick={next} disabled={listening}>
            {diff ? 'Next' : 'Skip sentence'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
