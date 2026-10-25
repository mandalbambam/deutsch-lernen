'use client';

import { memo, useMemo, type MouseEvent } from 'react';
import { cn } from '@/lib/cn';
import type { LookupContext } from '@/lib/lexicon/lookup';

export interface WordTap {
  surface: string;
  ctx: LookupContext;
  /** the whole sentence, used as the flashcard example */
  sentence: string;
  /** position key "p:s:w" (for marking looked-up words) */
  key: string;
}

interface Token {
  text: string;
  /** index of the word within its sentence (words only) */
  wi?: number;
}

interface Sentence {
  tokens: Token[];
  words: string[];
  after: string[];
  text: string;
}

const TOKEN = /([\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*)|([^\p{L}\p{N}]+)/gu;
const ABBREV = new Set(['dr', 'nr', 'ca', 'bzw', 'usw', 'etc', 'vgl', 'evtl', 'ggf', 'z', 'b', 'd', 'h', 'u', 'a', 'prof', 'st', 'mio', 'mrd', 'str', 'tel']);

/** Splits a paragraph into sentences of word/punctuation tokens (no split after "9." or "z. B."). */
export function parseParagraph(para: string): Sentence[] {
  const out: Sentence[] = [];
  let cur: Token[] = [];
  let lastWord = '';
  const flush = () => {
    if (!cur.length) return;
    const words: string[] = [];
    const after: string[] = [];
    for (const t of cur) {
      if (t.wi !== undefined) {
        words.push(t.text);
        after.push('');
      } else if (words.length) after[words.length - 1] += t.text;
    }
    out.push({ tokens: cur, words, after, text: cur.map((t) => t.text).join('').trim() });
    cur = [];
  };
  let wi = 0;
  for (const m of para.replace(/\s*\n\s*/g, ' ').matchAll(TOKEN)) {
    if (m[1]) {
      cur.push({ text: m[1], wi: wi++ });
      lastWord = m[1];
    } else {
      const punct = m[2];
      cur.push({ text: punct });
      const ends = /[.!?…]/.test(punct) && !/^\d+$/.test(lastWord) && !(punct.trimStart().startsWith('.') && ABBREV.has(lastWord.toLowerCase()));
      if (ends && /\s/.test(punct)) {
        flush();
        wi = 0;
      }
    }
  }
  flush();
  return out;
}

export function parseText(text: string): Sentence[][] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(parseParagraph);
}

/**
 * Renders German text where every word can be tapped to look it up.
 * One delegated click handler instead of hundreds of closures.
 */
export const InteractiveText = memo(function InteractiveText({
  text,
  onTap,
  marked,
  className,
}: {
  text: string;
  onTap: (tap: WordTap) => void;
  /** keys "p:s:w" of words that were looked up */
  marked?: Set<string>;
  className?: string;
}) {
  const paragraphs = useMemo(() => parseText(text), [text]);

  const handle = (e: MouseEvent<HTMLDivElement>) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-w]');
    if (!el) return;
    const [p, s, w] = (el.dataset.w ?? '').split(':').map(Number);
    const sentence = paragraphs[p]?.[s];
    if (!sentence) return;
    onTap({ surface: sentence.words[w], ctx: { words: sentence.words, after: sentence.after, index: w }, sentence: sentence.text, key: `${p}:${s}:${w}` });
  };

  return (
    <div className={cn('reading-text space-y-4', className)} lang="de" onClick={handle}>
      {paragraphs.map((sentences, p) => (
        <p key={p}>
          {sentences.map((sentence, s) =>
            sentence.tokens.map((t, ti) =>
              t.wi === undefined ? (
                <span key={`${s}-${ti}`}>{t.text}</span>
              ) : (
                <button
                  key={`${s}-${ti}`}
                  type="button"
                  data-w={`${p}:${s}:${t.wi}`}
                  className={cn(
                    'rounded-sm px-px text-left decoration-accent/40 decoration-dotted underline-offset-4 hover:bg-accent-soft hover:underline focus-visible:bg-accent-soft',
                    marked?.has(`${p}:${s}:${t.wi}`) && 'bg-warning-soft',
                  )}
                >
                  {t.text}
                </button>
              ),
            ),
          )}
        </p>
      ))}
    </div>
  );
});
