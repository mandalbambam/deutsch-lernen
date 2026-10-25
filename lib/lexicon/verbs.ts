'use client';

import { loadManifest, loadVerbShard } from '@/lib/data/load';
import type { VerbTable } from '@/lib/data/types';
import { bucketOf } from './hash';

/** Full conjugation table of a verb (infinitive as in the dictionary), if available. */
export async function getVerbTable(infinitive: string): Promise<VerbTable | undefined> {
  const m = await loadManifest();
  const shard = await loadVerbShard(bucketOf(infinitive, m.files.verbBuckets));
  return shard[infinitive];
}
