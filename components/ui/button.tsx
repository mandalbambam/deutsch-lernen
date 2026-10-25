import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:opacity-90 active:opacity-80 shadow-sm',
  secondary: 'bg-surface border border-line text-fg hover:bg-surface-2',
  ghost: 'text-fg hover:bg-surface-2',
  danger: 'bg-danger text-white hover:opacity-90',
  success: 'bg-success text-white hover:opacity-90 dark:text-bg',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-[15px]',
  lg: 'h-14 px-6 text-base',
};

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra?: string) {
  return cn(base, variants[variant], sizes[size], extra);
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ComponentProps<'button'> & { variant?: Variant; size?: Size }) {
  return <button type="button" className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & { href: string; variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
