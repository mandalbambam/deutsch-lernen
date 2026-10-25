import type { ReactNode } from 'react';
import type { Level } from '@/lib/cefr';
import { cn } from '@/lib/cn';

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'success' | 'danger' | 'warning';
  className?: string;
}) {
  const tones = {
    neutral: 'bg-surface-2 text-muted',
    accent: 'bg-accent-soft text-accent',
    success: 'bg-success-soft text-success',
    danger: 'bg-danger-soft text-danger',
    warning: 'bg-warning-soft text-warning',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  );
}

const LEVEL_STYLE: Record<Level, string> = {
  A1: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  A2: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
  B1: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
  B2: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
  C1: 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300',
  C2: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300',
};

export function LevelBadge({ level, className, large }: { level: Level; className?: string; large?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-bold tabular-nums',
        large ? 'px-3 py-1 text-2xl' : 'px-1.5 py-0.5 text-xs',
        LEVEL_STYLE[level],
        className,
      )}
    >
      {level}
    </span>
  );
}

/** der / die / das with the conventional colours (and the article text, so colour is never the only cue). */
export function articleFor(gender?: string): { article: string; cls: string } | null {
  if (!gender) return null;
  const g = gender.split(',')[0];
  if (g === 'm') return { article: 'der', cls: 'text-der' };
  if (g === 'f') return { article: 'die', cls: 'text-die' };
  if (g === 'n') return { article: 'das', cls: 'text-das' };
  if (g === 'pl') return { article: 'die', cls: 'text-plural' };
  return null;
}

export function NounWithArticle({ word, gender, className }: { word: string; gender?: string; className?: string }) {
  const a = articleFor(gender);
  if (!a) return <span className={className}>{word}</span>;
  const genders = gender!.split(',');
  return (
    <span className={cn(a.cls, className)}>
      <span className="font-semibold">{genders.length > 1 ? genders.map((g) => articleFor(g)!.article).join('/') : a.article}</span>{' '}
      {word}
    </span>
  );
}
