'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { DiffView } from '@/components/exercise/diff-view';
import { UmlautKeys } from '@/components/exercise/umlaut-keys';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/misc';
import type { Level } from '@/lib/cefr';
import { pickSentences, type Sentence } from '@/lib/data/sentences';
import { recordAttempt } from '@/lib/exercise/attempts';
import { useTts } from '@/lib/speech/use-tts';
import { diffWords, type DiffResult } from '@/lib/text/diff';
import { PracticeHeader, PracticeSummary, type PracticeResult } from './shell';

/**
 * Output practice: translate an English sentence into German, then compare with a native
 * reference and judge yourself (there are often several correct translations).
 */
export function Translate({
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
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    pickSentences(level, count, { seed, minWords: 4, maxWords: ['A1', 'A2'].includes(level) ? 10 : 15 }).then(setItems);
  }, [level, count, seed]);

  if (!items) return <Loading />;
  const item = items[index];
  if (!item) return <PracticeSummary result={{ correct: score, total: items.length }} onContinue={() => onDone({ correct: score, total: items.length })} label={doneLabel} />;

  const reveal = () => {
    if (!answer.trim()) return;
    setDiff(diffWords(item.de, answer));
  };

  const judge = async (s: 0 | 0.5 | 1) => {
    setScore((x) => x + s);
    await recordAttempt({
      module: 'output',
      skill: 'writing',
      itemId: `translate:${item.id}`,
      level: item.level,
      correct: s === 1,
      score: s,
      mistake: { wrong: answer, right: item.de, context: item.en },
    });
    setIndex((i) => i + 1);
    setAnswer('');
    setDiff(null);
  };

  return (
    <div className="space-y-4">
      <PracticeHeader title="Translate into German" index={index} total={items.length} />
      <Card className="space-y-4">
        <p className="text-lg font-medium">{item.en}</p>
        <textarea
          ref={inputRef}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !diff) {
              e.preventDefault();
              reveal();
            }
          }}
          disabled={!!diff}
          rows={2}
          lang="de"
          spellCheck={false}
          placeholder="Deine Übersetzung …"
          className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-lg"
        />
        {!diff && <UmlautKeys target={inputRef} onInsert={setAnswer} />}
        {diff && (
          <div className="space-y-3 rounded-xl bg-surface-2 p-3">
            <div className="flex items-start gap-2">
              <p className="flex-1 font-medium" lang="de">
                {item.de}
              </p>
              <button type="button" onClick={() => tts.say(item.de)} aria-label="Play" className="rounded-full p-1.5 text-muted hover:text-accent">
                <Volume2 className="size-4.5" />
              </button>
            </div>
            <div className="text-sm">
              <p className="mb-1 text-xs font-semibold text-muted uppercase">Your version compared with this reference</p>
              <DiffView diff={diff} />
            </div>
            <p className="text-sm text-muted">Other wordings can be just as correct. How did you do?</p>
          </div>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          {!diff ? (
            <Button onClick={reveal} disabled={!answer.trim()}>
              Compare
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => judge(0)}>
                Not right
              </Button>
              <Button variant="secondary" onClick={() => judge(0.5)}>
                Almost
              </Button>
              <Button variant="success" onClick={() => judge(1)}>
                Correct
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
