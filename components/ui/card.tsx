import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('rounded-2xl border border-line bg-surface p-4 sm:p-5', className)} {...props} />;
}

export function CardTitle({ children, className, icon }: { children: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <h2 className={cn('flex items-center gap-2 text-base font-semibold', className)}>
      {icon}
      {children}
    </h2>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="mb-5 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
