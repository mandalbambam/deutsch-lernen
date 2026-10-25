'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Toast {
  id: number;
  message: ReactNode;
  tone: 'info' | 'success' | 'danger';
  action?: { label: string; onClick: () => void };
  sticky?: boolean;
}

type ToastInput = Omit<Toast, 'id' | 'tone'> & { tone?: Toast['tone'] };

const ToastContext = createContext<(t: ToastInput) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((ts) => ts.filter((t) => t.id !== id)), []);

  const show = useCallback(
    (t: ToastInput) => {
      const id = nextId.current++;
      setToasts((ts) => [...ts.slice(-2), { ...t, id, tone: t.tone ?? 'info' }]);
      if (!t.sticky) setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-2 px-4 md:bottom-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'animate-fade-in pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg',
              t.tone === 'success' && 'border-success/30 bg-success-soft',
              t.tone === 'danger' && 'border-danger/30 bg-danger-soft',
              t.tone === 'info' && 'border-line bg-surface',
            )}
          >
            <div className="min-w-0 flex-1">{t.message}</div>
            {t.action && (
              <button
                type="button"
                className="shrink-0 font-semibold text-accent"
                onClick={() => {
                  t.action!.onClick();
                  dismiss(t.id);
                }}
              >
                {t.action.label}
              </button>
            )}
            <button type="button" aria-label="Dismiss" className="shrink-0 text-muted" onClick={() => dismiss(t.id)}>
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
