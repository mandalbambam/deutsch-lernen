/**
 * German-aware tokenisation shared by the data scripts and the app.
 */

export interface Token {
  /** original text of the token */
  text: string;
  /** true for words, false for punctuation / whitespace */
  word: boolean;
  /** index of the first character in the source string */
  start: number;
}

// Letters incl. umlauts/ß/accents, digits, inner apostrophes and hyphens (e.g. "E-Mail", "geht's").
const TOKEN_RE = /[\p{L}\p{M}\d]+(?:['’\-][\p{L}\p{M}\d]+)*|\s+|[^\s\p{L}\p{M}\d]/gu;

export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  for (const m of text.matchAll(TOKEN_RE)) {
    const t = m[0];
    tokens.push({ text: t, word: /[\p{L}\d]/u.test(t), start: m.index ?? 0 });
  }
  return tokens;
}

/** Just the words of a text, in order. */
export function words(text: string): string[] {
  return tokenize(text)
    .filter((t) => t.word)
    .map((t) => t.text);
}

/** Lowercase + normalise typographic apostrophes for dictionary lookup. */
export function normalizeWord(w: string): string {
  return w.toLowerCase().replace(/’/g, "'");
}

/** Normalise free-text answers: unify quotes/spaces, trim, drop final punctuation. */
export function normalizeAnswer(s: string): string {
  return s
    .replace(/[„“”«»]/g, '"')
    .replace(/[‚‘’`´]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim()
    .replace(/[.!?]+$/, '')
    .trim();
}
