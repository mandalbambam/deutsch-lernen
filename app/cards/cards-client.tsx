'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { Layers, Library, Play, Sparkles } from 'lucide-react';
import { Reviewer } from '@/components/cards/reviewer';
import { Button } from '@/components/ui/button';
import { Card, PageHeader } from '@/components/ui/card';
import { Loading } from '@/components/ui/misc';
import { useActivityTimer } from '@/lib/activity';
import { db } from '@/lib/db';
import type { Card as CardT } from '@/lib/db/types';
import { useT } from '@/lib/i18n';
import { dailyAllowance, todaysQueue } from '@/lib/srs/daily';

export function CardsClient() {
  const t = useT();
  const [queue, setQueue] = useState<CardT[] | null>(null);
  const [loading, setLoading] = useState(false);
  useActivityTimer('cards', queue !== null);

  const stats = useLiveQuery(async () => {
    const now = Date.now();
    const cards = await db.cards.toArray();
    const activeCards = cards.filter((c) => !c.suspended && !c.known);
    const allow = await dailyAllowance();
    return {
      total: cards.length,
      due: activeCards.filter((c) => c.state !== 0 && c.due <= now).length,
      learned: cards.filter((c) => c.known || (c.state === 2 && c.scheduledDays >= 21)).length,
      newLeft: allow.newLeft,
      newPerDay: allow.newPerDay,
    };
  }, [queue]);

  const start = async () => {
    setLoading(true);
    try {
      const q = await todaysQueue();
      setQueue(q.cards);
    } finally {
      setLoading(false);
    }
  };

  if (queue) {
    return (
      <>
        <PageHeader title={t.nav.flashcards} />
        <Reviewer initial={queue} onDone={() => setQueue(null)} doneLabel="Back to overview" />
      </>
    );
  }

  if (!stats) return <Loading label={t.common.loading} />;

  const nothing = stats.due === 0 && stats.newLeft === 0;
  return (
    <>
      <PageHeader title={t.nav.flashcards} subtitle="Spaced repetition (FSRS): review just before you would forget." />
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Stat value={stats.due} label="due now" />
          <Stat value={stats.newLeft} label={`new today (of ${stats.newPerDay})`} />
          <Stat value={stats.learned} label="words learned" />
        </div>
        <Button size="lg" className="w-full" onClick={start} disabled={loading || nothing}>
          <Play className="size-5" />
          {nothing ? 'All done for today' : loading ? t.common.loading : `Review ${stats.due + stats.newLeft} cards`}
        </Button>
        {nothing && (
          <p className="text-center text-sm text-muted">
            Come back tomorrow — or add extra words in the browser below.
          </p>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/cards/browse" className="block">
            <Card className="flex h-full items-center gap-3 hover:bg-surface-2">
              <Library className="size-6 text-accent" />
              <div>
                <p className="font-semibold">Browse & add words</p>
                <p className="text-sm text-muted">{stats.total} cards in your collection</p>
              </div>
            </Card>
          </Link>
          <Link href="/session" className="block">
            <Card className="flex h-full items-center gap-3 hover:bg-surface-2">
              <Sparkles className="size-6 text-accent" />
              <div>
                <p className="font-semibold">{t.nav.session}</p>
                <p className="text-sm text-muted">Cards + grammar + reading/listening + output</p>
              </div>
            </Card>
          </Link>
        </div>
        <Card className="flex items-start gap-3 text-sm text-muted">
          <Layers className="mt-0.5 size-5 shrink-0" />
          <p>
            New words come from a frequency list, starting at your vocabulary level. Nouns appear with their article in colour:{' '}
            <span className="font-semibold text-der">der</span> · <span className="font-semibold text-die">die</span> ·{' '}
            <span className="font-semibold text-das">das</span> · <span className="font-semibold text-plural">die (plural)</span>.
          </p>
        </Card>
      </div>
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <Card className="text-center">
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </Card>
  );
}
