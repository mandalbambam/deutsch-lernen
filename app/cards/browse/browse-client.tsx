'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Pause, Play, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { LevelBadge, NounWithArticle } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/card';
import { EmptyState, Loading, Segmented } from '@/components/ui/misc';
import { LEVELS, type Level } from '@/lib/cefr';
import { loadDeck } from '@/lib/data/load';
import type { DeckEntry } from '@/lib/data/types';
import { db } from '@/lib/db';
import type { Card as CardT } from '@/lib/db/types';
import { cardFromDeck, deckCardId, resetCard, setSuspended } from '@/lib/srs/cards';
import { useClientValue } from '@/lib/use-client-value';
import { formatInterval } from '@/lib/srs/fsrs';

type Filter = 'all' | 'new' | 'learning' | 'review' | 'known' | 'suspended';

function status(c: CardT, now: number): string {
  if (c.suspended) return 'suspended';
  if (c.known) return 'known';
  if (c.state === 0) return 'new';
  if (c.due <= now) return 'due now';
  return `in ${formatInterval(c.due - now)}`;
}

function matches(c: CardT, f: Filter) {
  switch (f) {
    case 'all':
      return true;
    case 'new':
      return c.state === 0 && !c.known && !c.suspended;
    case 'learning':
      return (c.state === 1 || c.state === 3) && !c.suspended;
    case 'review':
      return c.state === 2 && !c.known && !c.suspended;
    case 'known':
      return !!c.known;
    case 'suspended':
      return !!c.suspended;
  }
}

export function BrowseClient() {
  const [tab, setTab] = useState<'mine' | 'add'>('mine');
  return (
    <>
      <PageHeader title="Browse words" />
      <Segmented
        value={tab}
        onChange={setTab}
        ariaLabel="View"
        className="mb-4"
        options={[
          { value: 'mine', label: 'My cards' },
          { value: 'add', label: 'Add words' },
        ]}
      />
      {tab === 'mine' ? <MyCards /> : <AddWords />}
    </>
  );
}

function MyCards() {
  const cards = useLiveQuery(() => db.cards.toArray(), []);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [shown, setShown] = useState(60);
  const now = useClientValue(() => Math.floor(Date.now() / 60_000) * 60_000, 0);

  if (!cards) return <Loading />;
  const q = query.trim().toLowerCase();
  const list = cards
    .filter((c) => matches(c, filter))
    .filter((c) => !q || c.word.toLowerCase().includes(q) || c.glosses.some((g) => g.toLowerCase().includes(q)))
    .sort((a, b) => (a.rank ?? 1e9) - (b.rank ?? 1e9));

  if (cards.length === 0) {
    return <EmptyState title="No cards yet">Start a review on the Flashcards page — new words are added automatically.</EmptyState>;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <label className="relative min-w-48 flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search German or English"
            className="w-full rounded-xl border border-line bg-surface py-2.5 pr-3 pl-9"
          />
        </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)} className="rounded-xl border border-line bg-surface px-3" aria-label="Filter">
          {(['all', 'new', 'learning', 'review', 'known', 'suspended'] as Filter[]).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <p className="text-sm text-muted">{list.length} cards</p>
      <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
        {list.slice(0, shown).map((c) => (
          <li key={c.id} className="flex items-center gap-3 px-4 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium" lang="de">
                {c.pos === 'noun' ? <NounWithArticle word={c.word} gender={c.gender} /> : c.word}
              </p>
              <p className="truncate text-sm text-muted">{c.glosses[0]}</p>
            </div>
            {c.level && <LevelBadge level={c.level} />}
            <span className="hidden w-20 text-right text-xs text-muted sm:block">{status(c, now)}</span>
            <div className="flex">
              <IconButton label={c.suspended ? 'Resume' : 'Suspend'} onClick={() => setSuspended(c, !c.suspended)}>
                {c.suspended ? <Play className="size-4" /> : <Pause className="size-4" />}
              </IconButton>
              <IconButton label="Reset progress" onClick={() => resetCard(c)}>
                <RotateCcw className="size-4" />
              </IconButton>
              <IconButton
                label="Delete"
                onClick={() => {
                  if (confirm(`Delete the card “${c.word}”?`)) db.cards.delete(c.id);
                }}
              >
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
      {list.length > shown && (
        <Button variant="secondary" onClick={() => setShown((s) => s + 100)}>
          Show more
        </Button>
      )}
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-fg">
      {children}
    </button>
  );
}

function AddWords() {
  const [level, setLevel] = useState<Level>('A1');
  const [deck, setDeck] = useState<{ level: Level; entries: DeckEntry[] } | null>(null);
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(80);
  const ids = useLiveQuery(async () => new Set(await db.cards.toCollection().primaryKeys()), []);

  useEffect(() => {
    let alive = true;
    loadDeck(level).then((entries) => alive && setDeck({ level, entries }));
    return () => {
      alive = false;
    };
  }, [level]);

  const q = query.trim().toLowerCase();
  const list = useMemo(
    () =>
      (deck?.entries ?? []).filter((e) => !q || e.w.toLowerCase().includes(q) || e.d.some((g) => g.toLowerCase().includes(q))),
    [deck, q],
  );

  const add = async (entries: DeckEntry[]) => {
    await db.cards.bulkPut(entries.filter((e) => !ids?.has(deckCardId(e.w, e.p))).map((e) => cardFromDeck(e)));
  };

  const ready = deck && deck.level === level && ids;
  const notAdded = ready ? list.filter((e) => !ids.has(deckCardId(e.w, e.p))) : [];

  return (
    <div className="space-y-3">
      <Segmented value={level} onChange={(l) => { setLevel(l); setShown(80); }} ariaLabel="Level" options={LEVELS.map((l) => ({ value: l, label: l }))} />
      <label className="relative block">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${level} words`} className="w-full rounded-xl border border-line bg-surface py-2.5 pr-3 pl-9" />
      </label>
      {!ready ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted">
              {list.length} words · {notAdded.length} not in your cards yet
            </p>
            <Button size="sm" variant="secondary" onClick={() => add(notAdded.slice(0, 10))} disabled={notAdded.length === 0}>
              <Plus className="size-4" /> Add next 10
            </Button>
          </div>
          <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {list.slice(0, shown).map((e) => {
              const have = ids.has(deckCardId(e.w, e.p));
              return (
                <li key={`${e.w}|${e.p}`} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium" lang="de">
                      {e.p === 'noun' ? <NounWithArticle word={e.w} gender={e.g} /> : e.w}
                      {e.p === 'noun' && e.pl && <span className="ml-2 text-sm font-normal text-muted">pl. {e.pl}</span>}
                    </p>
                    <p className="truncate text-sm text-muted">{e.d.join('; ')}</p>
                  </div>
                  <Button size="sm" variant={have ? 'ghost' : 'secondary'} disabled={have} onClick={() => add([e])}>
                    {have ? 'Added' : <><Plus className="size-4" /> Add</>}
                  </Button>
                </li>
              );
            })}
          </ul>
          {list.length > shown && (
            <Button variant="secondary" onClick={() => setShown((s) => s + 120)}>
              Show more
            </Button>
          )}
        </>
      )}
    </div>
  );
}
