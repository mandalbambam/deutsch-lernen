'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type ThemePref = 'system' | 'light' | 'dark';
const KEY = 'theme';

/** Inline script for <head>: applies the stored theme before first paint. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${KEY}')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

function read(): ThemePref {
  try {
    const t = localStorage.getItem(KEY);
    return t === 'light' || t === 'dark' ? t : 'system';
  } catch {
    return 'system';
  }
}

function apply(pref: ThemePref) {
  const dark = pref === 'dark' || (pref === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useTheme(): [ThemePref, (t: ThemePref) => void] {
  const pref = useSyncExternalStore(subscribe, read, () => 'system' as ThemePref);

  useEffect(() => {
    if (pref !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [pref]);

  const set = useCallback((t: ThemePref) => {
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* storage unavailable: still apply for this page */
    }
    apply(t);
    listeners.forEach((l) => l());
  }, []);

  return [pref, set];
}
