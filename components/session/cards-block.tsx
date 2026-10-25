'use client';

import { useEffect, useState } from 'react';
import { Reviewer } from '@/components/cards/reviewer';
import type { PracticeResult } from '@/components/practice/shell';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/misc';
import type { Card } from '@/lib/db/types';
import { todaysQueue } from '@/lib/srs/daily';

/** Flashcard part of the daily session: about four cards per planned minute. */
export function CardsBlock({ minutes, onDone }: { minutes: number; onDone: (r: PracticeResult) => void }) {
  const [queue, setQueue] = useState<Card[] | null>(null);

  useEffect(() => {
    todaysQueue().then((q) => setQueue(q.cards));
  }, []);

  if (!queue) return <Loading />;
  if (queue.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center">
        <p className="font-semibold">No flashcards due right now.</p>
        <p className="mt-1 text-sm text-muted">You have reached today’s limits — on to the next part.</p>
        <Button className="mt-4" onClick={() => onDone({ correct: 0, total: 0, note: 'nothing due' })}>
          Continue
        </Button>
      </div>
    );
  }
  return (
    <Reviewer
      initial={queue}
      limit={Math.max(8, minutes * 4)}
      onDone={(s) => onDone({ correct: s.reviewed - s.again, total: s.reviewed })}
      doneLabel="Continue"
    />
  );
}
