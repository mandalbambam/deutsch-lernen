'use client';

import { useEffect } from 'react';
import { startSync } from '@/lib/sync/client';

/** Keeps progress in step across devices when the server offers sync; does nothing otherwise. */
export function SyncRunner() {
  useEffect(() => startSync(), []);
  return null;
}
