'use client';

/**
 * Loads the generated data in /public/data (cached in memory; the service worker caches the files).
 */
import type { Level } from '@/lib/cefr';
import type { DataManifest, DeckEntry, LexShard, SentenceRow, VerbShard } from './types';

let manifestPromise: Promise<DataManifest> | null = null;
const fileCache = new Map<string, Promise<unknown>>();

export function loadManifest(): Promise<DataManifest> {
  manifestPromise ??= fetch('/data/manifest.json').then((r) => {
    if (!r.ok) throw new Error(`manifest: HTTP ${r.status}`);
    return r.json() as Promise<DataManifest>;
  });
  manifestPromise.catch(() => {
    manifestPromise = null;
  });
  return manifestPromise;
}

function loadFile<T>(path: string): Promise<T> {
  let p = fileCache.get(path) as Promise<T> | undefined;
  if (!p) {
    p = fetch(`/data/${path}`).then((r) => {
      if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
      return r.json() as Promise<T>;
    });
    p.catch(() => fileCache.delete(path));
    fileCache.set(path, p);
  }
  return p;
}

export async function loadDeck(level: Level): Promise<DeckEntry[]> {
  const m = await loadManifest();
  return loadFile<DeckEntry[]>(m.files.decks[level]);
}

export async function loadSentences(level: Level): Promise<SentenceRow[]> {
  const m = await loadManifest();
  return loadFile<SentenceRow[]>(m.files.sentences[level]);
}

export async function loadLexShard(index: number): Promise<LexShard> {
  const m = await loadManifest();
  return loadFile<LexShard>(m.files.lex[index]);
}

export async function loadVerbShard(index: number): Promise<VerbShard> {
  const m = await loadManifest();
  return loadFile<VerbShard>(m.files.verbs[index]);
}

/** All data file URLs (for "download everything for offline"). */
export async function allDataUrls(): Promise<string[]> {
  const m = await loadManifest();
  return [
    '/data/manifest.json',
    ...m.files.lex,
    ...m.files.verbs,
    ...Object.values(m.files.sentences),
    ...Object.values(m.files.decks),
  ].map((p) => (p.startsWith('/') ? p : `/data/${p}`));
}
