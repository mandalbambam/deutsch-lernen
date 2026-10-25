'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useProfile } from '@/lib/db/profile';
import { de, en, type Messages } from './messages';

const I18nContext = createContext<{ lang: 'en' | 'de'; t: Messages }>({ lang: 'en', t: en });

export function I18nProvider({ children }: { children: ReactNode }) {
  const profile = useProfile();
  const lang = profile.uiLang === 'de' ? 'de' : 'en';
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <I18nContext.Provider value={{ lang, t: lang === 'de' ? de : en }}>{children}</I18nContext.Provider>;
}

/** UI strings for the current interface language. */
export function useT(): Messages {
  return useContext(I18nContext).t;
}

export function useLang(): 'en' | 'de' {
  return useContext(I18nContext).lang;
}
