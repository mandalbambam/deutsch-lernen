'use client';

import { ExternalLink, Volume2 } from 'lucide-react';
import { articleFor, LevelBadge, NounWithArticle } from '@/components/ui/badge';
import type { Card } from '@/lib/db/types';
import { cn } from '@/lib/cn';

export const POS_LABEL: Record<string, string> = {
  noun: 'noun',
  verb: 'verb',
  adj: 'adjective',
  adv: 'adverb',
  prep: 'preposition',
  conj: 'conjunction',
  pron: 'pronoun',
  det: 'determiner',
  num: 'number',
  intj: 'interjection',
  part: 'particle',
};

export function verbForms(card: Card): string | null {
  const v = card.verb;
  if (!v || (!v.p3 && !v.pt && !v.pp)) return null;
  const aux = v.aux === 's' ? 'ist' : v.aux === 'hs' ? 'hat/ist' : 'hat';
  return [v.p3, v.pt, v.pp ? `${aux} ${v.pp}` : undefined].filter(Boolean).join(' · ');
}

export function SpeakButton({ onClick, label, className }: { onClick: () => void; label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      title={label}
      className={cn('inline-grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-muted hover:text-accent', className)}
    >
      <Volume2 className="size-4.5" />
    </button>
  );
}

/** The word as shown on the front of a card. */
export function CardHeadword({ card, hideArticle, onSpeak }: { card: Card; hideArticle?: boolean; onSpeak?: () => void }) {
  const isNoun = card.pos === 'noun';
  return (
    <div className="flex items-center justify-center gap-3">
      <p className="text-center text-3xl font-bold break-words sm:text-4xl" lang="de">
        {isNoun && !hideArticle ? (
          <NounWithArticle word={card.word} gender={card.gender} />
        ) : isNoun && hideArticle ? (
          <span>
            <span className="text-muted">___</span> {card.word}
          </span>
        ) : (
          <>
            {card.verb?.refl && card.glosses.every((g) => g.startsWith('(sich)')) ? 'sich ' : ''}
            {card.word}
          </>
        )}
      </p>
      {onSpeak && <SpeakButton onClick={onSpeak} label="Play word" />}
    </div>
  );
}

/** Answer side: forms, meanings and the example sentence. */
export function CardBack({ card, onSpeakExample }: { card: Card; onSpeakExample?: () => void }) {
  const a = articleFor(card.gender);
  const forms = verbForms(card);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
        {card.pos && <span>{POS_LABEL[card.pos] ?? card.pos}</span>}
        {card.level && <LevelBadge level={card.level} />}
        {card.pos === 'noun' && card.plural && (
          <span lang="de">
            Plural: <span className="font-semibold text-plural">die {card.plural}</span>
          </span>
        )}
        {card.pos === 'noun' && !card.plural && card.gender !== 'pl' && <span>no plural</span>}
        {a && card.gender && card.gender.includes(',') && <span>gender varies by meaning</span>}
      </div>
      {forms && (
        <p className="text-center text-sm" lang="de">
          {forms}
        </p>
      )}
      <ul className="space-y-1 text-center">
        {card.glosses.map((g, i) => (
          <li key={i} className={cn(i === 0 ? 'text-lg font-medium' : 'text-sm text-muted')}>
            {g}
          </li>
        ))}
      </ul>
      {card.example && (
        <div className="rounded-xl bg-surface-2 p-3 text-sm">
          <div className="flex items-start gap-2">
            <p className="flex-1" lang="de">
              {card.example.de}
            </p>
            {onSpeakExample && <SpeakButton onClick={onSpeakExample} label="Play sentence" className="size-8" />}
          </div>
          {card.example.en && <p className="mt-1 text-muted">{card.example.en}</p>}
          {card.example.tatoebaId && (
            <a
              href={`https://tatoeba.org/en/sentences/show/${card.example.tatoebaId}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-muted hover:text-accent"
              onClick={(e) => e.stopPropagation()}
            >
              Tatoeba #{card.example.tatoebaId} <ExternalLink className="size-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
