/** Dates follow the interface language (English → day month year, German → TT. Monat JJJJ). */
export function formatDate(ms: number, lang: 'en' | 'de' = 'en', opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }): string {
  return new Date(ms).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', opts);
}
