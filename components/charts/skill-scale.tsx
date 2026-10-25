import { LEVELS, subBand, thetaToPercent } from '@/lib/cefr-scale';
import { cn } from '@/lib/cn';

/** Horizontal A1–C2 scale with a marker at θ and a band for ±1 standard error. */
export function SkillScale({ theta, se, className, label }: { theta: number; se?: number; className?: string; label?: string }) {
  const pos = thetaToPercent(theta);
  const lo = thetaToPercent(theta - (se ?? 0));
  const hi = thetaToPercent(theta + (se ?? 0));
  return (
    <div className={cn('w-full', className)} role="img" aria-label={label ?? `Level ${theta.toFixed(1)} (${subBand(theta)})`}>
      <div className="relative h-3 rounded-full bg-surface-2">
        <div className="absolute inset-y-0 grid w-full grid-cols-6">
          {LEVELS.map((l, i) => (
            <div key={l} className={cn('h-full', i > 0 && 'border-l border-bg')} />
          ))}
        </div>
        {se !== undefined && (
          <div className="absolute inset-y-0 rounded-full bg-accent/25" style={{ left: `${lo}%`, width: `${Math.max(1, hi - lo)}%` }} />
        )}
        <div
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent shadow"
          style={{ left: `${pos}%` }}
        />
      </div>
      <div className="mt-1 grid grid-cols-6 text-center text-[11px] text-muted">
        {LEVELS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}
