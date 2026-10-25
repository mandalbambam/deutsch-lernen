'use client';

import { LEVELS, type Level } from '@/lib/cefr';
import { loadDeck } from '@/lib/data/load';
import type { DeckEntry } from '@/lib/data/types';
import { getVerbTable } from '@/lib/lexicon/verbs';
import { hashString, mulberry32, shuffled } from '@/lib/random';
import { buildDrills, isDrillNoun, type DrillPools } from './drills';
import type { DrillKind, Exercise } from './types';

const MODALS = ['können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen'];
const poolCache = new Map<Level, Promise<DrillPools>>();

/** Nouns and verbs up to a level (most frequent first), with verb tables. */
export function drillPools(level: Level): Promise<DrillPools> {
  let p = poolCache.get(level);
  if (!p) {
    p = (async () => {
      const levels = LEVELS.slice(0, LEVELS.indexOf(level) + 1);
      const entries: DeckEntry[] = (await Promise.all(levels.map((l) => loadDeck(l)))).flat();
      const nouns = entries.filter(isDrillNoun).slice(0, 1200);
      const verbEntries = entries.filter((e) => e.p === 'verb').slice(0, 260);
      const a1 = await loadDeck('A1');
      for (const m of MODALS) if (!verbEntries.some((v) => v.w === m)) {
        const e = a1.find((x) => x.w === m && x.p === 'verb');
        if (e) verbEntries.push(e);
      }
      const verbs = (await Promise.all(verbEntries.map(async (entry) => ({ entry, table: await getVerbTable(entry.w) }))))
        .filter((v): v is DrillPools['verbs'][number] => !!v.table && v.table.pres.every(Boolean) && v.table.prt.every(Boolean));
      return { nouns, verbs };
    })();
    p.catch(() => poolCache.delete(level));
    poolCache.set(level, p);
  }
  return p;
}

export async function generateDrills(kinds: DrillKind[], level: Level, count: number, seed: string): Promise<Exercise[]> {
  if (kinds.length === 0 || count <= 0) return [];
  const pools = await drillPools(level);
  const out: Exercise[] = [];
  kinds.forEach((kind, i) => {
    const n = Math.ceil(count / kinds.length);
    out.push(...buildDrills(kind, pools, mulberry32(hashString(`${seed}|${kind}|${i}`)), n));
  });
  return shuffled(out, mulberry32(hashString(seed))).slice(0, count);
}
