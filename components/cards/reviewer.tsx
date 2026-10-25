'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Eye, PartyPopper, Undo2 } from 'lucide-react';
import { articleFor } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Kbd, ProgressBar } from '@/components/ui/misc';
import { cn } from '@/lib/cn';
import { db } from '@/lib/db';
import { logMistakes } from '@/lib/db/mistakes';
import { useProfile } from '@/lib/db/profile';
import type { Card } from '@/lib/db/types';
import { markKnown, reviewCard, undoReview, type ReviewResult } from '@/lib/srs/cards';
import { formatInterval, previewDue, type ReviewRating } from '@/lib/srs/fsrs';
import { useTts } from '@/lib/speech/use-tts';
import { CardBack, CardHeadword } from './card-face';

type HistoryEntry = { kind: 'review'; result: ReviewResult; requeued: boolean; rating: ReviewRating } | { kind: 'known'; previous: Card };

const RATINGS: { r: ReviewRating; label: string; cls: string }[] = [
  { r: 1, label: 'Again', cls: 'border-danger/40 text-danger hover:bg-danger-soft' },
  { r: 2, label: 'Hard', cls: 'border-warning/40 text-warning hover:bg-warning-soft' },
  { r: 3, label: 'Good', cls: 'border-success/40 text-success hover:bg-success-soft' },
  { r: 4, label: 'Easy', cls: 'border-accent/40 text-accent hover:bg-accent-soft' },
];

const GENDER_KEYS: Record<string, 'm' | 'f' | 'n'> = { j: 'm', k: 'f', l: 'n' };

export interface ReviewStats {
  reviewed: number;
  again: number;
}

/** Spoken form of the headword (nouns with their article). */
function spokenWord(card: Card) {
  const a = articleFor(card.gender);
  return card.pos === 'noun' && a ? `${a.article} ${card.word}` : card.word;
}

export function Reviewer({
  initial,
  limit,
  onDone,
  doneLabel = 'Done',
}: {
  initial: Card[];
  limit?: number;
  onDone?: (stats: ReviewStats) => void;
  doneLabel?: string;
}) {
  const profile = useProfile();
  const tts = useTts();
  const [queue, setQueue] = useState<Card[]>(initial);
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [genderPick, setGenderPick] = useState<'m' | 'f' | 'n' | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ reviewed: 0, again: 0 });
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const shownAt = useRef(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const current = queue[0];
  const finished = !current || (limit !== undefined && stats.reviewed >= limit);
  const drillGender =
    !!current && current.pos === 'noun' && profile.srs.genderDrill && !!current.gender && ['m', 'f', 'n'].includes(current.gender);

  useEffect(() => {
    shownAt.current = Date.now();
  }, [current?.id, current?.reps]);

  // next-interval labels for the rating buttons, computed when the answer is revealed
  const [intervals, setIntervals] = useState<Record<ReviewRating, string> | null>(null);

  const sayWord = useCallback(() => current && tts.say(spokenWord(current)), [current, tts]);
  const sayExample = useCallback(() => current?.example && tts.say(current.example.de), [current, tts]);

  const flip = useCallback(() => {
    if (!current || side === 'back') return;
    const now = Date.now();
    const due = previewDue(current, new Date(now), profile.srs.retention);
    setIntervals(Object.fromEntries(Object.entries(due).map(([k, v]) => [k, formatInterval(v - now)])) as Record<ReviewRating, string>);
    setSide('back');
    if (profile.srs.autoplay && tts.hasGerman) tts.say(spokenWord(current));
  }, [current, side, profile.srs.autoplay, profile.srs.retention, tts]);

  const pickGender = useCallback(
    (g: 'm' | 'f' | 'n') => {
      if (!current || genderPick) return;
      setGenderPick(g);
      if (g !== current.gender) {
        const right = articleFor(current.gender)!.article;
        const wrong = articleFor(g)!.article;
        logMistakes([{ tag: 'gender', example: { wrong: `${wrong} ${current.word}`, right: `${right} ${current.word}` } }], 'cards');
      }
      flip();
    },
    [current, genderPick, flip],
  );

  const rate = useCallback(
    async (r: ReviewRating) => {
      if (!current || side !== 'back' || busy) return;
      setBusy(true);
      try {
        const result = await reviewCard(current, r, Date.now() - shownAt.current, profile.srs.retention);
        const soon = result.card.due - Date.now() < 20 * 60_000;
        setQueue((q) => {
          const rest = q.slice(1);
          if (!soon) return rest;
          const at = Math.min(rest.length, 4);
          return [...rest.slice(0, at), result.card, ...rest.slice(at)];
        });
        setHistory((h) => [...h.slice(-30), { kind: 'review', result, requeued: soon, rating: r }]);
        setStats((s) => ({ reviewed: s.reviewed + 1, again: s.again + (r === 1 ? 1 : 0) }));
        setSide('front');
        setGenderPick(null);
        tts.stop();
      } finally {
        setBusy(false);
      }
    },
    [current, side, busy, profile.srs.retention, tts],
  );

  const known = useCallback(async () => {
    if (!current || busy) return;
    setBusy(true);
    try {
      await markKnown(current);
      setQueue((q) => q.slice(1));
      setHistory((h) => [...h.slice(-30), { kind: 'known', previous: current }]);
      setSide('front');
      setGenderPick(null);
    } finally {
      setBusy(false);
    }
  }, [current, busy]);

  const undo = useCallback(async () => {
    const last = history[history.length - 1];
    if (!last || busy) return;
    setBusy(true);
    try {
      if (last.kind === 'review') {
        await undoReview(last.result);
        setQueue((q) => {
          const withoutCopy = last.requeued ? q.filter((c) => c.id !== last.result.card.id) : q;
          return [last.result.previous, ...withoutCopy];
        });
        setStats((s) => ({ reviewed: Math.max(0, s.reviewed - 1), again: Math.max(0, s.again - (last.rating === 1 ? 1 : 0)) }));
      } else {
        await db.cards.put(last.previous);
        setQueue((q) => [last.previous, ...q]);
      }
      setHistory((h) => h.slice(0, -1));
      setSide('front');
      setGenderPick(null);
    } finally {
      setBusy(false);
    }
  }, [history, busy]);

  useEffect(() => {
    if (finished) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (side === 'front' && drillGender && !genderPick && GENDER_KEYS[k]) {
        e.preventDefault();
        pickGender(GENDER_KEYS[k]);
      } else if ((k === ' ' || k === 'enter') && side === 'front') {
        e.preventDefault();
        flip();
      } else if ((k === ' ' || k === 'enter') && side === 'back') {
        e.preventDefault();
        rate(3);
      } else if (['1', '2', '3', '4'].includes(k) && side === 'back') {
        e.preventDefault();
        rate(Number(k) as ReviewRating);
      } else if (k === 'a') {
        sayWord();
      } else if (k === 's') {
        sayExample();
      } else if (k === 'k') {
        known();
      } else if (k === 'u' || (k === 'z' && e.ctrlKey)) {
        undo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finished, side, drillGender, genderPick, pickGender, flip, rate, sayWord, sayExample, known, undo]);

  // swipe: left Again, right Good, up Easy, down Hard (answer side only); tap shows the answer
  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current || side !== 'back') return;
    setDrag({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = dragStart.current;
    dragStart.current = null;
    setDrag(null);
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const moved = Math.hypot(dx, dy);
    if (side === 'front') {
      if (moved < 10 && !drillGender) flip();
      return;
    }
    if (moved < 80) return;
    if (Math.abs(dx) > Math.abs(dy)) rate(dx > 0 ? 3 : 1);
    else rate(dy < 0 ? 4 : 2);
  };

  const swipeHint = drag && Math.hypot(drag.x, drag.y) > 40
    ? Math.abs(drag.x) > Math.abs(drag.y)
      ? drag.x > 0
        ? 'Good'
        : 'Again'
      : drag.y < 0
        ? 'Easy'
        : 'Hard'
    : null;

  if (finished) {
    return (
      <div className="animate-fade-in flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-12 text-center">
        <PartyPopper className="size-10 text-accent" />
        <p className="text-xl font-bold">{stats.reviewed > 0 ? 'Nice work!' : 'Nothing to review right now'}</p>
        {stats.reviewed > 0 && (
          <p className="text-muted">
            {stats.reviewed} card{stats.reviewed === 1 ? '' : 's'} reviewed
            {stats.again > 0 ? ` · ${stats.again} to see again soon` : ''}
          </p>
        )}
        {onDone && <Button onClick={() => onDone(stats)}>{doneLabel}</Button>}
      </div>
    );
  }

  const remaining = limit !== undefined ? Math.min(queue.length, limit - stats.reviewed) : queue.length;
  const isNew = current.state === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <span>
          {remaining} left{isNew && <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">new</span>}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={undo} disabled={history.length === 0} aria-label="Undo last answer">
            <Undo2 className="size-4" /> Undo
          </Button>
          <Button variant="ghost" size="sm" onClick={known} aria-label="I already know this word">
            <Check className="size-4" /> I know it
          </Button>
        </div>
      </div>
      <ProgressBar value={stats.reviewed} max={stats.reviewed + remaining} label="Review progress" />

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStart.current = null;
          setDrag(null);
        }}
        className={cn(
          'relative min-h-72 touch-pan-y rounded-2xl border border-line bg-surface p-5 shadow-sm select-none sm:p-8',
          side === 'front' && !drillGender && 'cursor-pointer',
        )}
        style={drag ? { transform: `translate(${drag.x * 0.4}px, ${drag.y * 0.4}px) rotate(${drag.x * 0.03}deg)` } : undefined}
      >
        {swipeHint && (
          <div className="pointer-events-none absolute inset-x-0 top-3 text-center text-sm font-bold tracking-wide text-accent uppercase">{swipeHint}</div>
        )}
        <div className="flex min-h-60 flex-col justify-center gap-6">
          <CardHeadword card={current} hideArticle={drillGender && !genderPick && side === 'front'} onSpeak={sayWord} />

          {side === 'front' && drillGender && !genderPick && (
            <div className="flex justify-center gap-2" role="group" aria-label="Choose the article">
              {(['m', 'f', 'n'] as const).map((g, i) => {
                const a = articleFor(g)!;
                return (
                  <button
                    key={g}
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerUp={(e) => e.stopPropagation()}
                    onClick={() => pickGender(g)}
                    className={cn('min-w-20 rounded-xl border-2 border-current px-4 py-2 text-lg font-bold', a.cls)}
                  >
                    {a.article}
                    <span className="ml-1.5 hidden text-xs font-normal text-muted sm:inline">{['J', 'K', 'L'][i]}</span>
                  </button>
                );
              })}
            </div>
          )}

          {genderPick && (
            <p className={cn('text-center text-sm font-semibold', genderPick === current.gender ? 'text-success' : 'text-danger')}>
              {genderPick === current.gender ? 'Right article!' : `Not ${articleFor(genderPick)!.article} — it’s ${articleFor(current.gender)!.article} ${current.word}.`}
            </p>
          )}

          {side === 'back' && <CardBack card={current} onSpeakExample={current.example ? sayExample : undefined} />}
        </div>
      </div>

      {side === 'front' ? (
        !drillGender || genderPick ? (
          <Button size="lg" className="w-full" onClick={flip}>
            <Eye className="size-5" /> Show answer
          </Button>
        ) : (
          <p className="text-center text-sm text-muted">Which article? Tap it — or press J / K / L.</p>
        )
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {RATINGS.map(({ r, label, cls }) => (
            <button
              key={r}
              type="button"
              disabled={busy}
              onClick={() => rate(r)}
              className={cn('flex flex-col items-center rounded-xl border bg-surface py-2.5 font-semibold transition-colors disabled:opacity-50', cls)}
            >
              {label}
              <span className="text-xs font-normal text-muted">{intervals?.[r]}</span>
            </button>
          ))}
        </div>
      )}

      <p className="hidden text-center text-xs text-muted md:block">
        <Kbd>Space</Kbd> show / good · <Kbd>1</Kbd>–<Kbd>4</Kbd> rate · <Kbd>A</Kbd> word audio · <Kbd>S</Kbd> sentence audio · <Kbd>K</Kbd> I know it ·{' '}
        <Kbd>U</Kbd> undo
      </p>
      <p className="text-center text-xs text-muted md:hidden">Swipe the answer: ← again · → good · ↑ easy · ↓ hard</p>
    </div>
  );
}
