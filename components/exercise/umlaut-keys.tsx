'use client';

import type { RefObject } from 'react';

const KEYS = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];

/** Inserts German characters at the cursor — handy on keyboards without them. */
export function UmlautKeys({
  target,
  onInsert,
}: {
  target: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  onInsert: (value: string) => void;
}) {
  const insert = (ch: string) => {
    const el = target.current;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const value = el.value.slice(0, start) + ch + el.value.slice(end);
    onInsert(value);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + ch.length, start + ch.length);
    });
  };
  return (
    <div className="flex flex-wrap gap-1" aria-label="Insert special characters">
      {KEYS.map((k) => (
        <button
          key={k}
          type="button"
          tabIndex={-1}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => insert(k)}
          className="min-w-9 rounded-lg border border-line bg-surface px-2 py-1 text-sm font-medium hover:bg-surface-2"
        >
          {k}
        </button>
      ))}
    </div>
  );
}
