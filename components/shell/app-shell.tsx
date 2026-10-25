'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { WifiOff } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useT } from '@/lib/i18n';
import { useOnline } from '@/lib/use-online';
import { BOTTOM, SIDEBAR, bottomTabFor } from './nav-items';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const t = useT();
  const online = useOnline();
  const tab = bottomTabFor(pathname);

  return (
    <div className="flex min-h-dvh">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-surface px-3 py-5 md:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2">
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-sm font-black text-accent-fg">De</span>
          <span className="font-bold tracking-tight">{t.appName}</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-4 overflow-y-auto" aria-label="Main">
          {SIDEBAR.map((group, i) => (
            <ul key={i} className="space-y-0.5">
              {group.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                        active ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-surface-2 hover:text-fg',
                      )}
                    >
                      <Icon className="size-4.5" aria-hidden />
                      {item.label(t)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {!online && (
          <div className="safe-top flex items-center justify-center gap-2 bg-warning-soft px-4 py-2 text-center text-sm">
            <WifiOff className="size-4 shrink-0" aria-hidden /> {t.common.offline}
          </div>
        )}
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-5 pb-28 md:px-8 md:pt-10 md:pb-16">{children}</main>
      </div>

      <nav
        aria-label="Main"
        className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur md:hidden"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {BOTTOM.map((item) => {
            const active = tab === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium',
                    active ? 'text-accent' : 'text-muted',
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  {item.label(t)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
