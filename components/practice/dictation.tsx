'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play, Snail } from 'lucide-react';
import { DiffView } from '@/components/exercise/diff-view';
import { UmlautKeys } from '@/components/exercise/umlaut-keys';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading, Notice } from '@/components/ui/misc';
import type { Level } from '@/lib/cefr';
import { pickSentences, type Sentence } from '@/lib/data/sentences';
import { recordAttempt } from '@/lib/exercise/attempts';
import { useTts } from '@/lib/speech/use-tts';
import { diffWords, type DiffResult } from '@/lib/text/diff';
import { PracticeHeader, PracticeSummary, type PracticeResult } from './shell';

/** Dictation on Tatoeba sentences: listen, type what you hear, compare word by word. */
export function Dictation({
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
  const [items, setItems] = useState<Sentence[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [diff, setDiff] = useState<DiffResult | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const shownAt = useRef(0);

  useEffect(() => {
    const maxWords = ['A1', 'A2'].includes(level) ? 10 : level === 'B1' ? 13 : 18;
    pickSentences(level, count, { seed, minWords: 3, maxWords }).then(setItems);
  }, [level, count, seed]);

  const item = items?.[index];
  useEffect(() => {
    shownAt.current = Date.now();
  }, [item?.id]);

  if (!items) return <Loading />;
  if (tts.ready && !tts.hasGerman) {
    return (
      <Notice tone="warning" title="Dictation needs a German voice">
        Your browser has no German text-to-speech voice. Try Chrome, Edge or Safari, or install a German voice in your system settings.
        <div className="mt-3">
          <Button size="sm" variant="secondary" onClick={() => onDone({ correct: 0, total: 0, note: 'skipped: no voice' })}>
            Skip
          </Button>
        </div>
      </Notice>
    );
  }
  if (!item) {
    const total = scores.length;
    return <PracticeSummary result={{ correct: scores.reduce((a, b) => a + b, 0), total }} onContinue={() => onDone({ correct: scores.reduce((a, b) => a + b, 0), total })} label={doneLabel} />;
  }

  const check = async () => {
    if (!answer.trim() || diff) return;
    const d = diffWords(item.de, answer);
    setDiff(d);
    setScores((s) => [...s, d.score]);
    await recordAttempt({
      module: 'listening',
      skill: 'listening',
      itemId: `dictation:${item.id}`,
      level: item.level,
      correct: d.score >= 0.9,
      score: d.score,
      errorTags: d.caseErrors > 0 ? ['capitalization'] : d.score < 0.9 ? ['listening.detail'] : [],
      ms: Date.now() - shownAt.current,
      mistake: { wrong: answer, right: item.de },
    });
  };

  const next = () => {
    setIndex((i) => i + 1);
    setAnswer('');
    setDiff(null);
    tts.stop();
  };

  return (
    <div className="space-y-4">
      <PracticeHeader title="Dictation" index={index} total={items.length} />
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => tts.say(item.de)}>
            <Play className="size-4" /> {tts.speaking ? 'Playing…' : 'Play'}
          </Button>
          <Button variant="secondary" onClick={() => tts.say(item.de, 0.7)}>
            <Snail className="size-4" /> Slowly
          </Button>
        </div>
        <textarea
          ref={inputRef}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (diff) next();
              else check();
            }
          }}
          disabled={!!diff}
          rows={2}
          lang="de"
          spellCheck={false}
          autoCapitalize="sentences"
          placeholder="Type what you hear…"
          className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-lg"
        />
        {!diff && <UmlautKeys target={inputRef} onInsert={setAnswer} />}
        {diff && (
          <div className="space-y-2 rounded-xl bg-surface-2 p-3">
            <DiffView diff={diff} />
            <p className="text-sm text-muted">{item.en}</p>
            <a
              href={`https://tatoeba.org/en/sentences/show/${item.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent"
            >
              Tatoeba #{item.id} <ExternalLink className="size-3" />
            </a>
          </div>
        )}
        <div className="flex justify-end">
          {diff ? <Button onClick={next}>Next</Button> : <Button onClick={check} disabled={!answer.trim()}>Check</Button>}
        </div>
      </Card>
    </div>
  );
}
