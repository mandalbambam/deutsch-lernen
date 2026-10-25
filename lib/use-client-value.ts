'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/** Reads a browser-only value after hydration (returns `fallback` during prerendering). */
export function useClientValue<T>(read: () => T, fallback: T): T {
  return useSyncExternalStore(noopSubscribe, read, () => fallback);
}
