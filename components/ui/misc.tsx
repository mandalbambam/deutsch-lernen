import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-block size-5 animate-spin rounded-full border-2 border-line border-t-accent', className)}
    />
  );
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-muted">
      <Spinner /> {label}
    </div>
  );
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd className={cn('rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-muted', className)}>{children}</kbd>
  );
}

export function Notice({
  tone = 'info',
  title,
  children,
  className,
}: {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const styles = {
    info: 'bg-accent-soft text-fg border-accent/20',
    success: 'bg-success-soft text-fg border-success/30',
    warning: 'bg-warning-soft text-fg border-warning/30',
    danger: 'bg-danger-soft text-fg border-danger/30',
  };
  const icons = {
    info: <Info className="size-5 shrink-0 text-accent" />,
    success: <CheckCircle2 className="size-5 shrink-0 text-success" />,
    warning: <AlertTriangle className="size-5 shrink-0 text-warning" />,
    danger: <XCircle className="size-5 shrink-0 text-danger" />,
  };
  return (
    <div className={cn('flex gap-3 rounded-xl border p-3 text-sm', styles[tone], className)}>
      {icons[tone]}
      <div className="min-w-0 space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="text-fg/90">{children}</div>}
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, children }: { icon?: ReactNode; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-12 text-center">
      {icon && <div className="text-muted">{icon}</div>}
      <p className="font-semibold">{title}</p>
      {children && <div className="max-w-md text-sm text-muted">{children}</div>}
    </div>
  );
}

export function ProgressBar({
  value,
  max = 1,
  className,
  tone = 'accent',
  label,
}: {
  value: number;
  max?: number;
  className?: string;
  tone?: 'accent' | 'success' | 'warning';
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  const tones = { accent: 'bg-accent', success: 'bg-success', warning: 'bg-warning' };
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-2', className)}
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={cn('h-full rounded-full transition-[width] duration-300', tones[tone])} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  className,
  ariaLabel,
}: {
  value: T;
  options: { value: T; label: ReactNode; disabled?: boolean }[];
  onChange: (v: T) => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn('inline-flex rounded-xl bg-surface-2 p-1', className)}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          disabled={o.disabled}
          onClick={() => onChange(o.value)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40',
            o.value === value ? 'bg-surface text-fg shadow-sm dark:bg-accent-soft dark:text-accent' : 'text-muted hover:text-fg',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}) {
  return (
    <label className={cn('flex cursor-pointer items-start justify-between gap-4', disabled && 'opacity-50')}>
      <span>
        <span className="block font-medium">{label}</span>
        {description && <span className="block text-sm text-muted">{description}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors',
          checked ? 'bg-accent' : 'bg-line',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </label>
  );
}
