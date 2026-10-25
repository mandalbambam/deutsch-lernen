'use client';

import { useEffect, useRef, useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { UmlautKeys } from '@/components/exercise/umlaut-keys';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/misc';
import type { Level } from '@/lib/cefr';
import { pickSentences, type Sentence } from '@/lib/data/sentences';
import { recordAttempt } from '@/lib/exercise/attempts';
import { useTts } from '@/lib/speech/use-tts';
import { foldUmlauts } from '@/lib/text/diff';
import { tokenize } from '@/lib/text/tokenize';
import { PracticeHeader, PracticeSummary, type PracticeResult } from './shell';

type Verdict = 'right' | 'case' | 'wrong';

function split(s: Sentence) {
  const toks = tokenize(s.de);
  let w = -1;
  const idx = toks.findIndex((t) => t.word && ++w === s.clozeIdx);
  return { before: toks.slice(0, idx).map((t) => t.text).join(''), target: toks[idx]?.text ?? '', after: toks.slice(idx + 1).map((t) => t.text).join('') };
}

/** Fill the gap in a real sentence (Tatoeba); the English translation is the context. */
export function Cloze({
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
  const [hint, setHint] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    pickSentences(level, count, { seed, minWords: 4, maxWords: 16, needCloze: true }).then(setItems);
  }, [level, count, seed]);

  if (!items) return <Loading />;
  const item = items[index];
  if (!item) return <PracticeSummary result={{ correct: score, total: items.length }} onContinue={() => onDone({ correct: score, total: items.length })} label={doneLabel} />;

  const { before, target, after } = split(item);

  const check = async () => {
    if (!answer.trim() || verdict) return;
    const a = answer.trim();
    const v: Verdict = a === target ? 'right' : foldUmlauts(a) === foldUmlauts(target) ? (a.toLowerCase() === target.toLowerCase() ? 'case' : 'right') : 'wrong';
    setVerdict(v);
    const s = v === 'wrong' ? 0 : hint > 1 ? 0.5 : 1;
    setScore((x) => x + s);
    tts.say(item.de);
    await recordAttempt({
      module: 'reading',
      skill: 'vocabulary',
      itemId: `cloze:${item.id}`,
      level: item.level,
      correct: v !== 'wrong',
      score: s,
      errorTags: v === 'wrong' ? ['lexis.meaning'] : v === 'case' ? ['capitalization'] : [],
      mistake: { wrong: a, right: target, context: item.de },
    });
  };

  const next = () => {
    setIndex((i) => i + 1);
    setAnswer('');
    setHint(0);
    setVerdict(null);
  };

  return (
    <div className="space-y-4">
      <PracticeHeader title="Fill the gap" index={index} total={items.length} />
      <Card className="space-y-4">
        <p className="text-sm text-muted">{item.en}</p>
        <p className="reading-text" lang="de">
          {before}
          {verdict ? (
            <span className={verdict === 'wrong' ? 'font-semibold text-danger' : 'font-semibold text-success'}>
              {verdict === 'wrong' ? (
                <>
                  <s>{answer}</s> {target}
                </>
              ) : (
                target
              )}
            </span>
          ) : (
            <input
              ref={inputRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') check();
              }}
              size={Math.max(4, target.length + 1)}
              autoFocus
              lang="de"
              spellCheck={false}
              autoCapitalize="none"
              aria-label="Missing word"
              className="mx-1 inline-block rounded-md border-b-2 border-accent bg-accent-soft px-1.5 py-0.5"
            />
          )}
          {after}
        </p>
        {!verdict && hint > 0 && (
          <p className="text-sm text-muted">
            Hint: starts with „{target.slice(0, hint > 1 ? 2 : 1)}…“{hint > 1 && item.clozeLemma && item.clozeLemma !== target ? ` · dictionary form: ${item.clozeLemma}` : ''}
          </p>
        )}
        {verdict === 'case' && <p className="text-sm text-warning">Right word — mind the capitalisation.</p>}
        {!verdict && <UmlautKeys target={inputRef} onInsert={setAnswer} />}
        <div className="flex justify-between gap-2">
          {!verdict ? (
            <Button variant="ghost" onClick={() => setHint((h) => Math.min(2, h + 1))} disabled={hint >= 2}>
              <Lightbulb className="size-4" /> Hint
            </Button>
          ) : (
            <span />
          )}
          {verdict ? <Button onClick={next}>Next</Button> : <Button onClick={check} disabled={!answer.trim()}>Check</Button>}
        </div>
      </Card>
    </div>
  );
}
