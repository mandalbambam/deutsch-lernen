'use client';

import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Check, ExternalLink, Plus } from 'lucide-react';
import { POS_LABEL, SpeakButton } from '@/components/cards/card-face';
import { LevelBadge, NounWithArticle, articleFor } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/misc';
import { Sheet } from '@/components/ui/sheet';
import { cn } from '@/lib/cn';
import type { LexEntry } from '@/lib/data/types';
import { db } from '@/lib/db';
import { lookup, type LookupResult } from '@/lib/lexicon/lookup';
import { useTts } from '@/lib/speech/use-tts';
import { addCard, deckCardId } from '@/lib/srs/cards';
import type { WordTap } from './interactive-text';

function verbLine(e: LexEntry): string | null {
  const v = e.v;
  if (!v || (!v.p3 && !v.pt && !v.pp)) return null;
  const aux = v.aux === 's' ? 'ist' : v.aux === 'hs' ? 'hat/ist' : 'hat';
  return [v.p3, v.pt, v.pp ? `${aux} ${v.pp}` : undefined].filter(Boolean).join(' · ');
}

function spoken(e: LexEntry): string {
  const a = e.p === 'noun' ? articleFor(e.g) : null;
  return a ? `${a.article} ${e.w}` : e.w;
}

/** Bottom sheet with the dictionary entry for a tapped word, and "add to flashcards". */
export function WordSheet({ tap, onClose, source }: { tap: WordTap | null; onClose: () => void; source: 'reading' | 'listening' }) {
  const [result, setResult] = useState<{ key: string; data: LookupResult } | null>(null);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!tap) return;
    let cancelled = false;
    lookup(tap.surface, tap.ctx)
      .then((data) => {
        if (cancelled) return;
        setResult({ key: tap.key, data });
        setSelected(0);
        setError(false);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [tap]);

  const current = result && tap && result.key === tap.key ? result.data : null;
  const loading = !!tap && !current && !error;

  return (
    <Sheet open={!!tap} onClose={onClose} title={<span lang="de">{tap?.surface}</span>}>
      {loading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}
      {error && <p className="text-sm text-danger">The dictionary could not be loaded. Are you offline? Open the app once online to store the data.</p>}
      {current && tap && <LookupView result={current} selected={selected} onSelect={setSelected} tap={tap} source={source} />}
    </Sheet>
  );
}

function LookupView({
  result,
  selected,
  onSelect,
  tap,
  source,
}: {
  result: LookupResult;
  selected: number;
  onSelect: (i: number) => void;
  tap: WordTap;
  source: 'reading' | 'listening';
}) {
  const tts = useTts();
  const hit = result.hits[selected];

  if (!hit) {
    return (
      <div className="space-y-3 text-sm">
        {result.compound ? (
          <>
            <p className="text-muted">Not in the dictionary as one word — it looks like a compound:</p>
            <ul className="space-y-2">
              {result.compound.map((part, i) => (
                <li key={i} className="rounded-xl bg-surface-2 px-3 py-2">
                  <p className="font-semibold" lang="de">
                    {part.entry ? part.entry.p === 'noun' ? <NounWithArticle word={part.entry.w} gender={part.entry.g} /> : part.entry.w : part.text}
                  </p>
                  {part.entry && <p className="text-muted">{part.entry.d.slice(0, 2).join('; ')}</p>}
                </li>
              ))}
            </ul>
            <p className="text-muted">The last part decides the gender of the whole word.</p>
          </>
        ) : (
          <p className="text-muted">No dictionary entry found for this word.</p>
        )}
        <WiktionaryLink word={result.surface} />
      </div>
    );
  }

  const e = hit.entry;
  const forms = e.p === 'verb' ? verbLine(e) : null;
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold" lang="de">
            {e.p === 'noun' ? <NounWithArticle word={e.w} gender={e.g} /> : e.w}
          </p>
          {tts.hasGerman && <SpeakButton onClick={() => tts.say(spoken(e))} label="Play word" />}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>{POS_LABEL[e.p] ?? e.p}</span>
          <LevelBadge level={e.l} />
          {e.ipa && <span>{e.ipa}</span>}
          {e.p === 'noun' && e.pl && (
            <span lang="de">
              Plural: <span className="font-semibold text-plural">die {e.pl}</span>
            </span>
          )}
        </div>
        {hit.form && (
          <p className={cn('text-sm', hit.separable ? 'font-medium text-accent' : 'text-muted')} lang="de">
            {hit.separable ? `Separable verb: ${hit.form}` : `„${result.surface}“ is the ${hit.form}`}
          </p>
        )}
        {forms && (
          <p className="text-sm" lang="de">
            {forms}
          </p>
        )}
        {e.cmp && (
          <p className="text-sm" lang="de">
            {e.w} · {e.cmp} · {e.sup ?? ''}
          </p>
        )}
      </div>
      <ol className="list-decimal space-y-1 pl-5">
        {e.d.map((g, i) => (
          <li key={i} className={i === 0 ? 'font-medium' : 'text-muted'}>
            {g}
          </li>
        ))}
      </ol>
      <AddToCards entry={e} sentence={tap.sentence} source={source} />
      {result.hits.length > 1 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-muted uppercase">Other possibilities</p>
          <div className="flex flex-wrap gap-1.5">
            {result.hits.map((h, i) =>
              i === selected ? null : (
                <button
                  key={`${h.entry.w}|${h.entry.p}`}
                  type="button"
                  onClick={() => onSelect(i)}
                  className="rounded-lg border border-line px-2 py-1 text-sm hover:border-accent"
                  lang="de"
                >
                  {h.entry.w} <span className="text-muted">({POS_LABEL[h.entry.p] ?? h.entry.p})</span>
                </button>
              ),
            )}
          </div>
        </div>
      )}
      <WiktionaryLink word={e.w} />
    </div>
  );
}

function AddToCards({ entry, sentence, source }: { entry: LexEntry; sentence: string; source: 'reading' | 'listening' }) {
  const id = deckCardId(entry.w, entry.p);
  // null = no card yet, undefined = still loading
  const existing = useLiveQuery(async () => (await db.cards.get(id)) ?? null, [id]);
  const [busy, setBusy] = useState(false);
  const inCards = !!existing && !existing.suspended && !existing.known;

  const add = async () => {
    setBusy(true);
    try {
      await addCard({
        id,
        kind: 'word',
        word: entry.w,
        pos: entry.p,
        gender: entry.g,
        plural: entry.pl,
        glosses: entry.d,
        level: entry.l,
        rank: entry.r,
        verb: entry.v,
        example: sentence ? { de: sentence, en: '' } : undefined,
        source,
      });
    } finally {
      setBusy(false);
    }
  };

  if (inCards) {
    return (
      <p className="flex items-center gap-1.5 text-sm font-medium text-success">
        <Check className="size-4" /> In your flashcards
      </p>
    );
  }
  return (
    <Button onClick={add} disabled={busy || existing === undefined} className="w-full sm:w-auto">
      <Plus className="size-4" /> Add to flashcards
    </Button>
  );
}

function WiktionaryLink({ word }: { word: string }) {
  return (
    <p className="text-xs text-muted">
      Dictionary data: Wiktionary (CC BY-SA) via kaikki.org ·{' '}
      <a
        href={`https://en.wiktionary.org/wiki/${encodeURIComponent(word)}#German`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-0.5 underline-offset-2 hover:text-accent hover:underline"
      >
        Wiktionary <ExternalLink className="size-3" />
      </a>
    </p>
  );
}
