'use client';

import type { ReactNode } from 'react';
import { ToastProvider } from '@/components/ui/toast';
import { I18nProvider } from '@/lib/i18n';
import { AppShell } from './app-shell';
import { ServiceWorkerRegister } from './sw-register';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ToastProvider>
        <ServiceWorkerRegister />
        <AppShell>{children}</AppShell>
      </ToastProvider>
    </I18nProvider>
  );
}
