'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/toast';
import { useT } from '@/lib/i18n';

/**
 * Registers /sw.js in production builds. A new deploy changes the script URL (?v=build id),
 * which installs a new worker; we offer a reload once it is waiting.
 */
export function ServiceWorkerRegister() {
  const toast = useToast();
  const t = useT();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    let cancelled = false;
    const version = process.env.NEXT_PUBLIC_BUILD_ID ?? 'dev';
    // Reload only when the user accepted an update. On a first visit the new worker also
    // takes control (clients.claim), which must not reload a page the user is working in.
    let updateAccepted = false;

    const offerUpdate = (worker: ServiceWorker) => {
      toast({
        message: t.common.updateReady,
        sticky: true,
        action: {
          label: t.common.reload,
          onClick: () => {
            updateAccepted = true;
            worker.postMessage({ type: 'SKIP_WAITING' });
          },
        },
      });
    };

    navigator.serviceWorker
      .register(`/sw.js?v=${version}`, { scope: '/', updateViaCache: 'none' })
      .then((reg) => {
        if (cancelled) return;
        if (reg.waiting && navigator.serviceWorker.controller) offerUpdate(reg.waiting);
        reg.addEventListener('updatefound', () => {
          const w = reg.installing;
          w?.addEventListener('statechange', () => {
            if (w.state === 'installed' && navigator.serviceWorker.controller) offerUpdate(w);
          });
        });
      })
      .catch(() => {
        /* offline support is optional */
      });

    let reloading = false;
    const onControllerChange = () => {
      if (!updateAccepted || reloading) return;
      reloading = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    // ask the browser not to evict our IndexedDB data under storage pressure
    navigator.storage?.persist?.().catch(() => {});

    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
