'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Check, Eye, Volume2, X } from 'lucide-react';
import { ExplainAnswer } from '@/components/ai/explain-answer';
import { DiffView } from '@/components/exercise/diff-view';
import { UmlautKeys } from '@/components/exercise/umlaut-keys';
import { Prompt } from '@/components/placement/choice-question';
import { PracticeHeader, PracticeSummary, type PracticeResult } from '@/components/practice/shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Kbd } from '@/components/ui/misc';
import type { Level } from '@/lib/cefr';
import { cn } from '@/lib/cn';
import type { Module, Skill } from '@/lib/db/types';
import { recordAttempt } from '@/lib/exercise/attempts';
import { checkAnswer, checkChoice, type CheckResult } from '@/lib/exercise/check';
import type { Exercise } from '@/lib/exercise/types';
import { hashString, mulberry32, shuffled } from '@/lib/random';
import { useT } from '@/lib/i18n';
import { fmt, type Messages } from '@/lib/i18n/messages';
import { useTts } from '@/lib/speech/use-tts';

export interface Answered {
  ex: Exercise;
  answer: string;
  result: CheckResult;
}

/** The complete sentence with the gap(s) filled, for read-aloud — null when the prompt isn't a gap sentence. */
export function fillGaps(prompt: string, answer: string): string | null {
  const gaps = prompt.split('___').length - 1;
  if (gaps === 0 || /[→=]/.test(prompt)) return null;
  const parts = gaps === 1 ? [answer] : answer.split(/\s*…\s*/);
  if (parts.length !== gaps) return null;
  let i = 0;
  return prompt
    .replace(/___/g, () => {
      const p = parts[i++];
      return p === '–' ? '' : p;
    })
    .replace(/^\([^)]*\)\s*/, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/\s+([.,!?;:“])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function primaryAnswer(ex: Exercise): string {
  switch (ex.kind) {
    case 'choice':
      return ex.options[0];
    case 'order':
      return ex.answers?.[0] ?? ex.words.join(' ');
    default:
      return ex.answers[0];
  }
}

/** German text to read aloud after answering. */
function spokenSentence(ex: Exercise, expected: string): string | null {
  if (ex.kind === 'choice' || ex.kind === 'fill') {
    const filled = fillGaps(ex.prompt, expected);
    if (filled) return filled;
    return ex.kind === 'choice' && /[.!?]$/.test(expected) ? expected : null;
  }
  return expected;
}

function contextOf(ex: Exercise): string {
  switch (ex.kind) {
    case 'choice':
    case 'fill':
      return ex.prompt;
    case 'transform':
      return ex.source;
    case 'correct':
      return ex.sentence;
    case 'order':
      return ex.words.join(' / ');
  }
}

function kindTitle(t: Messages, kind: Exercise['kind']): string {
  return { choice: t.exercise.choose, fill: t.exercise.fill, transform: t.exercise.transform, correct: t.exercise.correct, order: t.exercise.order }[kind];
}

/**
 * Runs a list of rule-checked exercises with immediate feedback explaining *why*.
 * Every answer is stored (topic mastery + error profile).
 */
export function ExerciseRunner({
  exercises,
  title,
  topicId,
  level,
  module = 'grammar',
  skill = 'grammar',
  seed,
  onDone,
  doneLabel,
  summaryExtra,
}: {
  exercises: Exercise[];
  title: ReactNode;
  topicId?: string;
  level?: Level;
  module?: Module;
  skill?: Skill;
  seed: string;
  onDone: (r: PracticeResult, answered: Answered[]) => void;
  doneLabel?: string;
  summaryExtra?: ReactNode;
}) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState<Answered[]>([]);
  const ex = exercises[index];

  if (!ex) {
    const correct = answered.reduce((s, a) => s + a.result.score, 0);
    const result: PracticeResult = { correct, total: answered.length };
    const wrong = answered.filter((a) => a.result.verdict !== 'correct');
    return (
      <PracticeSummary result={result} onContinue={() => onDone(result, answered)} label={doneLabel}>
        {wrong.length > 0 && (
          <div className="w-full max-w-lg space-y-2 text-left">
            <p className="text-sm font-semibold">{t.exercise.review}</p>
            <ul className="space-y-2">
              {wrong.map((a, i) => (
                <li key={i} className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-sm">
                  <p className="text-muted" lang="de">
                    {contextOf(a.ex)}
                  </p>
                  <p>
                    {a.answer && (
                      <>
                        <s className="text-danger" lang="de">
                          {a.answer}
                        </s>{' '}
                        →{' '}
                      </>
                    )}
                    <span className="font-semibold text-success" lang="de">
                      {a.result.expected}
                    </span>
                  </p>
                  <p className="text-muted">{a.result.reason ?? a.ex.explain}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {summaryExtra}
      </PracticeSummary>
    );
  }

  const onAnswered = (answer: string, result: CheckResult, ms: number) => {
    setAnswered((list) => [...list, { ex, answer, result }]);
    recordAttempt({
      module,
      skill,
      itemId: ex.id,
      level,
      correct: result.verdict !== 'wrong',
      score: result.score,
      errorTags: result.verdict === 'wrong' && ex.tag ? [ex.tag] : [],
      ms,
      topicId,
      mistake: result.verdict === 'wrong' ? { wrong: answer || '—', right: result.expected, context: contextOf(ex) } : undefined,
    }).catch(() => {});
  };

  return (
    <div className="space-y-4">
      <PracticeHeader title={title} index={index} total={exercises.length} />
      <ExerciseItem
        key={`${index}:${ex.id}`}
        ex={ex}
        seed={seed}
        level={level}
        last={index === exercises.length - 1}
        onAnswered={onAnswered}
        onNext={() => setIndex((i) => i + 1)}
      />
    </div>
  );
}

function ExerciseItem({
  ex,
  seed,
  level,
  last,
  onAnswered,
  onNext,
}: {
  ex: Exercise;
  seed: string;
  level?: Level;
  last: boolean;
  onAnswered: (answer: string, result: CheckResult, ms: number) => void;
  onNext: () => void;
}) {
  const t = useT();
  const tts = useTts();
  const started = useRef(0);
  const [answer, setAnswer] = useState(ex.kind === 'correct' ? ex.sentence : '');
  const [chosen, setChosen] = useState<number | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<CheckResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  const order = useMemo(() => {
    const n = ex.kind === 'choice' ? ex.options.length : ex.kind === 'order' ? ex.words.length : 0;
    if (ex.kind === 'choice' && ex.display) return ex.display;
    const idx = Array.from({ length: n }, (_, i) => i);
    const rand = mulberry32(hashString(`${seed}|${ex.id}`));
    let s = shuffled(idx, rand);
    // never show the word-order puzzle already solved
    if (ex.kind === 'order' && n > 1 && s.every((v, i) => v === i)) s = [...s.slice(1), s[0]];
    return s;
  }, [ex, seed]);

  const finish = (given: string, res: CheckResult) => {
    setResult(res);
    onAnswered(given, res, Date.now() - started.current);
    requestAnimationFrame(() => nextRef.current?.focus());
  };

  const submitChoice = (original: number) => {
    if (result || ex.kind !== 'choice') return;
    setChosen(original);
    finish(ex.options[original], checkChoice(ex, original));
  };

  const orderAnswer = ex.kind === 'order' ? picked.map((i) => ex.words[i]).join(' ') : '';

  const submitText = () => {
    if (result) return;
    if (ex.kind === 'order') {
      if (picked.length !== ex.words.length) return;
      finish(orderAnswer, checkAnswer(ex, orderAnswer));
      return;
    }
    if (ex.kind === 'choice' || !answer.trim()) return;
    finish(answer.trim(), checkAnswer(ex, answer));
  };

  const reveal = () => {
    if (result) return;
    finish('', { verdict: 'wrong', expected: primaryAnswer(ex), score: 0 });
  };

  // keyboard: 1–n choose (choice), Enter = next after feedback
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (result) {
        if (e.key === 'Enter' && document.activeElement?.tagName !== 'BUTTON') {
          e.preventDefault();
          onNext();
        }
        return;
      }
      if (ex.kind === 'choice') {
        const n = Number(e.key);
        if (n >= 1 && n <= order.length) {
          e.preventDefault();
          submitChoice(order[n - 1]);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const spoken = result ? spokenSentence(ex, result.expected) : null;

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">{ex.heading ?? kindTitle(t, ex.kind)}</p>
        {ex.kind === 'transform' && <p className="text-sm">{ex.instruction}</p>}
        {ex.en && <p className="text-sm text-muted">{ex.en}</p>}
      </div>

      {ex.kind === 'choice' && (
        <>
          <Prompt text={ex.prompt} />
          <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Answer options">
            {order.map((original, pos) => {
              const isRight = result && original === 0;
              const isWrongChoice = result && chosen === original && original !== 0;
              return (
                <button
                  key={original}
                  type="button"
                  disabled={!!result}
                  onClick={() => submitChoice(original)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors',
                    !result && 'border-line bg-surface hover:border-accent hover:bg-accent-soft',
                    result && !isRight && !isWrongChoice && 'border-line opacity-60',
                    isRight && 'border-success bg-success-soft',
                    isWrongChoice && 'border-danger bg-danger-soft',
                  )}
                >
                  <Kbd className="hidden sm:inline-flex">{pos + 1}</Kbd>
                  <span lang="de" className="font-medium">
                    {ex.options[original]}
                  </span>
                  {isRight && <Check className="ml-auto size-4 text-success" aria-label="correct" />}
                  {isWrongChoice && <X className="ml-auto size-4 text-danger" aria-label="your answer" />}
                </button>
              );
            })}
          </div>
        </>
      )}

      {ex.kind === 'fill' && (
        <FillPrompt
          prompt={ex.prompt}
          hint={ex.hint}
          answer={answer}
          setAnswer={setAnswer}
          result={result}
          inputRef={inputRef}
          onSubmit={submitText}
        />
      )}

      {(ex.kind === 'transform' || ex.kind === 'correct') && (
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <p className="reading-text flex-1 font-medium" lang="de">
              {ex.kind === 'transform' ? ex.source : ex.sentence}
            </p>
            {tts.hasGerman && (
              <button type="button" onClick={() => tts.say(ex.kind === 'transform' ? ex.source : ex.sentence)} className="rounded-lg p-1.5 text-muted hover:bg-surface-2" aria-label="Listen">
                <Volume2 className="size-4" />
              </button>
            )}
          </div>
          {!result ? (
            <textarea
              ref={areaRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submitText();
                }
              }}
              rows={2}
              autoFocus
              lang="de"
              spellCheck={false}
              autoCapitalize="sentences"
              aria-label={ex.kind === 'correct' ? 'Corrected sentence' : 'Your sentence'}
              placeholder={ex.kind === 'correct' ? undefined : 'Type the new sentence…'}
              className="w-full resize-none rounded-xl border border-line bg-surface px-3 py-2 text-base focus:border-accent focus:outline-none"
            />
          ) : (
            <p className={cn('rounded-xl border px-3 py-2', result.verdict === 'correct' ? 'border-success bg-success-soft' : result.verdict === 'almost' ? 'border-warning bg-warning-soft' : 'border-danger bg-danger-soft')} lang="de">
              {answer.trim() || <span className="text-muted">(no answer)</span>}
            </p>
          )}
          {!result && <UmlautKeys target={areaRef} onInsert={setAnswer} />}
        </div>
      )}

      {ex.kind === 'order' && (
        <div className="space-y-3">
          <div
            className={cn(
              'flex min-h-12 flex-wrap gap-2 rounded-xl border border-dashed p-2',
              !result && 'border-line',
              result?.verdict === 'correct' && 'border-success bg-success-soft',
              result && result.verdict !== 'correct' && 'border-danger bg-danger-soft',
            )}
            aria-label="Your sentence"
          >
            {picked.length === 0 && <span className="px-1 py-1 text-sm text-muted">{t.exercise.tapWords}</span>}
            {picked.map((i, pos) => (
              <button
                key={`${i}-${pos}`}
                type="button"
                disabled={!!result}
                onClick={() => setPicked((p) => p.filter((_, k) => k !== pos))}
                className="rounded-lg border border-accent bg-accent-soft px-2.5 py-1 font-medium"
                lang="de"
              >
                {ex.words[i]}
              </button>
            ))}
          </div>
          {!result && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Word bank">
              {order.map((i) =>
                picked.includes(i) ? (
                  <span key={i} className="rounded-lg border border-transparent px-2.5 py-1 text-transparent select-none" aria-hidden>
                    {ex.words[i]}
                  </span>
                ) : (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPicked((p) => [...p, i])}
                    className="rounded-lg border border-line bg-surface px-2.5 py-1 font-medium hover:border-accent"
                    lang="de"
                  >
                    {ex.words[i]}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      )}

      {result && <Feedback ex={ex} result={result} answer={ex.kind === 'order' ? orderAnswer : answer.trim()} level={level} />}

      <div className="flex flex-wrap items-center justify-between gap-2">
        {!result ? (
          ex.kind !== 'choice' ? (
            <Button variant="ghost" onClick={reveal}>
              <Eye className="size-4" /> {t.exercise.showAnswer}
            </Button>
          ) : (
            <span className="text-xs text-muted">
              <span className="hidden sm:inline">{fmt(t.exercise.pressKeys, { n: order.length })}</span>
            </span>
          )
        ) : spoken && tts.hasGerman ? (
          <Button variant="ghost" onClick={() => tts.say(spoken)}>
            <Volume2 className="size-4" /> {t.exercise.listen}
          </Button>
        ) : (
          <span />
        )}
        {result ? (
          <Button ref={nextRef} onClick={onNext}>
            {last ? t.exercise.finish : t.common.next}
          </Button>
        ) : ex.kind !== 'choice' ? (
          <Button onClick={submitText} disabled={ex.kind === 'order' ? picked.length !== ex.words.length : !answer.trim()}>
            {t.common.check}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

function FillPrompt({
  prompt,
  hint,
  answer,
  setAnswer,
  result,
  inputRef,
  onSubmit,
}: {
  prompt: string;
  hint?: string;
  answer: string;
  setAnswer: (v: string) => void;
  result: CheckResult | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: () => void;
}) {
  const [before, after = ''] = prompt.split('___');
  return (
    <div className="space-y-3">
      <p className="text-lg leading-loose font-medium" lang="de">
        {before}
        {result ? (
          <span className={cn('mx-0.5 rounded px-1', result.verdict === 'correct' ? 'bg-success-soft text-success' : result.verdict === 'almost' ? 'bg-warning-soft' : 'bg-danger-soft text-danger')}>
            {answer.trim() ? result.verdict === 'wrong' ? <s>{answer.trim()}</s> : answer.trim() : '…'}
          </span>
        ) : (
          <input
            ref={inputRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSubmit();
              }
            }}
            size={Math.max(6, answer.length + 2)}
            autoFocus
            lang="de"
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            aria-label="Your answer"
            className="mx-1 inline-block max-w-full rounded-md border-b-2 border-accent bg-accent-soft px-1.5 py-0.5 text-base"
          />
        )}
        {after}
        {hint && <span className="ml-2 text-base font-normal text-muted">({hint})</span>}
      </p>
      {!result && <UmlautKeys target={inputRef} onInsert={setAnswer} />}
    </div>
  );
}

function Feedback({ ex, result, answer, level }: { ex: Exercise; result: CheckResult; answer: string; level?: Level }) {
  const t = useT();
  const tone = result.verdict === 'correct' ? 'success' : result.verdict === 'almost' ? 'warning' : 'danger';
  return (
    <div
      role="status"
      className={cn(
        'animate-fade-in space-y-1.5 rounded-xl border px-3 py-2.5 text-sm',
        tone === 'success' && 'border-success/40 bg-success-soft',
        tone === 'warning' && 'border-warning/40 bg-warning-soft',
        tone === 'danger' && 'border-danger/40 bg-danger-soft',
      )}
    >
      <p className="flex items-center gap-1.5 font-semibold">
        {result.verdict === 'correct' ? <Check className="size-4 text-success" /> : <X className={cn('size-4', tone === 'warning' ? 'text-warning' : 'text-danger')} />}
        {result.verdict === 'correct' ? t.exercise.correctLabel : result.verdict === 'almost' ? t.exercise.almost : t.exercise.wrong}
      </p>
      {result.note && <p>{result.note}</p>}
      {result.verdict !== 'correct' && (
        <p>
          {t.exercise.correctAnswer}{' '}
          <span className="font-semibold" lang="de">
            {result.expected}
          </span>
        </p>
      )}
      {result.diff && result.verdict === 'wrong' && <DiffView diff={result.diff} />}
      {result.reason && <p className="font-medium">{result.reason}</p>}
      <p className={cn(result.verdict !== 'correct' && 'text-muted')}>{ex.explain}</p>
      {result.verdict === 'wrong' && answer && ex.kind !== 'choice' && level && (
        <ExplainAnswer task={`${ex.kind === 'transform' ? `${ex.instruction} ` : ''}${contextOf(ex)}`} expected={result.expected} answer={answer} rule={ex.explain} level={level} />
      )}
    </div>
  );
}
