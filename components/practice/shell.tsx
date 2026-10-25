'use client';

import type { ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/misc';
import { useT } from '@/lib/i18n';
import { fmt } from '@/lib/i18n/messages';

export interface PracticeResult {
  correct: number;
  total: number;
  note?: string;
}

export function PracticeHeader({ title, index, total, extra }: { title: ReactNode; index: number; total: number; extra?: ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">{title}</span>
        <span className="flex items-center gap-2 text-muted tabular-nums">
          {extra}
          {Math.min(index + 1, total)} / {total}
        </span>
      </div>
      <ProgressBar value={index} max={total} label="Exercise progress" />
    </div>
  );
}

export function PracticeSummary({
  result,
  onContinue,
  label,
  children,
}: {
  result: PracticeResult;
  onContinue: () => void;
  label?: string;
  children?: ReactNode;
}) {
  const t = useT();
  const pct = result.total ? Math.round((result.correct / result.total) * 100) : 0;
  return (
    <div className="animate-fade-in flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-10 text-center">
      <CheckCircle2 className="size-10 text-success" />
      <p className="text-xl font-bold">
        {result.total ? fmt(t.exercise.percentCorrect, { n: pct }) : t.common.done}
      </p>
      {result.total > 0 && (
        <p className="text-muted">
          {fmt(t.exercise.ofTotal, { a: Math.round(result.correct * 10) / 10, b: result.total })}
        </p>
      )}
      {children}
      <Button onClick={onContinue}>{label ?? t.common.continue}</Button>
    </div>
  );
}
