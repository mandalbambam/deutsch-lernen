import { cn } from '@/lib/cn';

export interface Bar {
  label: string;
  value: number;
  /** emphasised bar (e.g. today) */
  highlight?: boolean;
}

/** Minimal vertical bar chart (CSS only). */
export function BarChart({ bars, format = (v) => String(v), height = 120, ariaLabel }: { bars: Bar[]; format?: (v: number) => string; height?: number; ariaLabel: string }) {
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <div role="img" aria-label={`${ariaLabel}: ${bars.map((b) => `${b.label} ${format(b.value)}`).join(', ')}`}>
      <div className="flex items-end gap-1" style={{ height }}>
        {bars.map((b, i) => (
          <div key={i} className="flex h-full min-w-0 flex-1 flex-col justify-end" title={`${b.label}: ${format(b.value)}`}>
            <div
              className={cn('w-full rounded-t-md transition-all', b.value > 0 ? (b.highlight ? 'bg-accent' : 'bg-accent/45') : 'bg-line')}
              style={{ height: b.value > 0 ? `${Math.max(4, (b.value / max) * 100)}%` : 2 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-1">
        {bars.map((b, i) => (
          <span key={i} className={cn('min-w-0 flex-1 truncate text-center text-[10px] text-muted', b.highlight && 'font-semibold text-fg')}>
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
