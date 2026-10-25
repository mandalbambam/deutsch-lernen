'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Modal that is a bottom sheet on phones and a centred dialog on larger screens.
 * Built on <dialog> for focus trapping and Escape handling.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // close when the component is hidden by an Activity boundary
  useEffect(() => {
    const d = ref.current;
    return () => {
      if (d?.open) d.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        'm-0 mt-auto w-full max-w-none rounded-t-2xl border border-line bg-surface p-0 text-fg shadow-2xl backdrop:bg-black/40',
        'sm:m-auto sm:max-w-lg sm:rounded-2xl',
        className,
      )}
    >
      <div className="max-h-[80vh] overflow-y-auto p-5 safe-bottom">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 text-lg font-semibold">{title}</div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-surface-2">
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
