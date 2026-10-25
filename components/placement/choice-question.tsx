'use client';

import { useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import type { BankItem } from '@/content/placement/types';
import { cn } from '@/lib/cn';
import { useT } from '@/lib/i18n';

export type Selection = number | 'dk' | null;

/** Renders a gap sentence with the gap highlighted. */
export function Prompt({ text, className }: { text: string; className?: string }) {
  const parts = text.split('___');
  return (
    <p className={cn('text-lg leading-relaxed font-medium', className)} lang="de">
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && (
            <span className="mx-1 inline-block min-w-12 border-b-2 border-accent align-baseline" aria-label="gap">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </p>
  );
}

/**
 * Multiple-choice question. `order[i]` is the original option index shown at position i.
 * Keys: 1–4 choose, 0 = "I don't know", Enter = submit.
 */
export function ChoiceQuestion({
  item,
  order,
  selected,
  onSelect,
  onSubmit,
  feedback,
}: {
  item: BankItem;
  order: number[];
  selected: Selection;
  onSelect: (s: Selection) => void;
  onSubmit: () => void;
  /** when set, show correct/incorrect colouring (practice mode) */
  feedback?: boolean;
}) {
  const t = useT();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= order.length) {
        e.preventDefault();
        onSelect(order[n - 1]);
      } else if (e.key === '0' || e.key === '?') {
        e.preventDefault();
        onSelect('dk');
      } else if (e.key === 'Enter' && selected !== null) {
        e.preventDefault();
        onSubmit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [order, selected, onSelect, onSubmit]);

  return (
    <div className="space-y-4">
      <Prompt text={item.prompt} />
      <div className="grid gap-2" role="radiogroup" aria-label="Answer options">
        {order.map((orig, i) => {
          const isSel = selected === orig;
          const isRight = feedback && orig === 0;
          const isWrong = feedback && isSel && orig !== 0;
          return (
            <button
              key={orig}
              type="button"
              role="radio"
              aria-checked={isSel}
              disabled={feedback}
              onClick={() => onSelect(orig)}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] transition-colors',
                'focus-visible:outline-2 focus-visible:outline-accent',
                isRight && 'border-success bg-success-soft',
                isWrong && 'border-danger bg-danger-soft',
                !feedback && isSel && 'border-accent bg-accent-soft',
                !feedback && !isSel && 'border-line bg-surface hover:bg-surface-2',
              )}
            >
              <span
                className={cn(
                  'grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold',
                  isSel ? 'bg-accent text-accent-fg' : 'bg-surface-2 text-muted',
                )}
              >
                {i + 1}
              </span>
              <span lang="de">{item.options[orig]}</span>
            </button>
          );
        })}
      </div>
      {!feedback && (
        <button
          type="button"
          onClick={() => onSelect('dk')}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm',
            selected === 'dk' ? 'bg-accent-soft font-semibold text-accent' : 'text-muted hover:bg-surface-2',
          )}
        >
          <HelpCircle className="size-4" /> {t.common.dontKnow}
        </button>
      )}
    </div>
  );
}
