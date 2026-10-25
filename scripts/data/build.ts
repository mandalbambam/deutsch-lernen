/**
 * Builds the compact JSON data in public/data from the raw sources in .data-cache.
 * Usage: npm run data:build   (run `npm run data:download` first)
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { LEVELS, type Level } from '../../lib/cefr';
import type { DataManifest, DeckEntry, LexEntry, LexShard, SentenceRow, VerbShard } from '../../lib/data/types';
import { bucketOf } from '../../lib/lexicon/hash';
import { tokenize } from '../../lib/text/tokenize';
import type { LemmaRef } from './cefr';
import { extractKaikki } from './kaikki';
import { buildFormIndex, capitalShares, loadFrequencies, rankLemmas, subtitleScores, type Ranked } from './rank';
import { analyzePairs, corpusCounts, loadPairs, pickExamples, selectSentences } from './sentences';
import { CACHE_DIR, SOURCES } from './sources';

const OUT = 'public/data';
const LEX_BUCKETS = 32;
const VERB_BUCKETS = 8;
const LEMMA_LIMIT = 30000;
const DECK_POS = new Set(['noun', 'verb', 'adj', 'adv', 'prep', 'conj', 'num', 'intj']);

function t0() {
  const start = Date.now();
  return () => `${((Date.now() - start) / 1000).toFixed(1)}s`;
}

async function writeHashed(dir: string, name: string, data: unknown): Promise<{ path: string; bytes: number }> {
  const json = JSON.stringify(data);
  const hash = createHash('sha1').update(json).digest('hex').slice(0, 8);
  const file = `${name}.${hash}.json`;
  await writeFile(join(OUT, dir, file), json);
  return { path: `${dir}/${file}`, bytes: Buffer.byteLength(json) };
}

/** Words used in the app's hand-written content, so tap-to-look-up covers them even if rare. */
async function contentWords(): Promise<Set<string>> {
  const set = new Set<string>();
  async function walk(dir: string) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (/\.(ts|tsx)$/.test(e.name)) {
        const text = await readFile(p, 'utf8');
        for (const tok of tokenize(text)) if (tok.word && tok.text.length > 2) set.add(tok.text.toLowerCase());
      }
    }
  }
  await walk('content');
  return set;
}

function toEntry(c: Ranked): LexEntry {
  const e: LexEntry = { w: c.w, p: c.p, d: c.glosses.slice(0, 3), r: c.rank, l: c.level };
  if (c.p === 'noun') {
    const g = [...c.genders].filter((x) => x !== 'pl' || c.genders.size === 1);
    if (g.length) e.g = g.join(',');
    if (c.pl && c.pl !== '-') e.pl = c.pl;
    if (c.gs) e.gs = c.gs;
    if (c.wk) e.wk = 1;
  }
  if (c.v && Object.keys(c.v).length) e.v = c.v;
  if (c.cmp) e.cmp = c.cmp;
  if (c.sup) e.sup = c.sup;
  if (c.ipa && c.rank <= 12000) e.ipa = c.ipa;
  return e;
}

function makeLookup(ranked: Ranked[], formIndex: Map<string, number[]>) {
  const refById = new Map<number, LemmaRef>();
  for (const r of ranked) refById.set(r.id, { id: r.id, w: r.w, p: r.p, rank: r.rank, level: r.level });
  const lookup = (form: string): LemmaRef[] | undefined => {
    const ids = formIndex.get(form);
    if (!ids) return undefined;
    const refs = ids.map((id) => refById.get(id)).filter((x): x is LemmaRef => !!x);
    return refs.length ? refs : undefined;
  };
  return { refById, lookup };
}

async function main() {
  const time = t0();
  console.log('• Wiktionary (kaikki) …');
  const k = await extractKaikki(join(CACHE_DIR, 'kaikki-german.jsonl.gz'));
  const formIndex = buildFormIndex(k);
  console.log(`  ${k.entries} entries → ${k.candidates.length} lemma candidates, ${formIndex.size} forms (${time()})`);

  console.log('• Tatoeba pairs …');
  const pairs = await loadPairs(CACHE_DIR);
  const capShare = capitalShares(pairs.map((p) => p.de));
  console.log(`  ${pairs.length} pairs (${time()})`);

  console.log('• Subtitle frequencies …');
  const freq = await loadFrequencies(join(CACHE_DIR, 'de_full.txt'));
  const subtitle = subtitleScores(k, formIndex, freq, capShare);
  const zeros = new Float64Array(k.candidates.length);
  const prelim = rankLemmas(k, subtitle, zeros, 40000);
  const prelimAnalysis = analyzePairs(pairs, makeLookup(prelim, formIndex).lookup);
  const tatoeba = corpusCounts(prelimAnalysis, k.candidates.length);
  console.log(`  ${freq.size} forms (${time()})`);

  const top = rankLemmas(k, subtitle, tatoeba, LEMMA_LIMIT);
  // add rare lemmas used in our own content
  const used = await contentWords();
  const rankedIds = new Set(top.map((r) => r.id));
  const byId = new Map(k.candidates.map((c) => [c.id, c]));
  const ranked: Ranked[] = [...top];
  for (const w of used) {
    for (const id of formIndex.get(w) ?? []) {
      if (rankedIds.has(id)) continue;
      const c = byId.get(id)!;
      if (c.quality < 1) continue;
      rankedIds.add(id);
      ranked.push({ ...c, score: 0, rank: ranked.length + 1, level: 'C2' });
    }
  }
  console.log(`  ranked ${top.length} lemmas, +${ranked.length - top.length} from app content`);

  const { refById, lookup } = makeLookup(ranked, formIndex);
  const sentences = analyzePairs(pairs, lookup);
  const perLevel = Object.fromEntries(LEVELS.map((l) => [l, sentences.filter((s) => s.level === l).length]));
  console.log(`  ${sentences.length} levelled pairs`, perLevel, `(${time()})`);
  const selected = selectSentences(sentences);
  const examples = pickExamples(sentences, (id) => refById.get(id)?.level);

  console.log('• Writing files …');
  for (const dir of ['lex', 'verbs', 'sent', 'deck']) {
    await rm(join(OUT, dir), { recursive: true, force: true });
    await mkdir(join(OUT, dir), { recursive: true });
  }
  let bytes = 0;

  // lexicon shards
  const shards: LexShard[] = Array.from({ length: LEX_BUCKETS }, () => ({ e: {}, f: {} }));
  for (const r of ranked) {
    const shard = shards[bucketOf(r.w, LEX_BUCKETS)];
    (shard.e[r.w] ??= []).push(toEntry(r));
  }
  let formCount = 0;
  for (const [form, ids] of formIndex) {
    const lemmas = [...new Set(ids.map((id) => refById.get(id)?.w).filter((w): w is string => !!w))];
    if (!lemmas.length) continue;
    if (lemmas.length === 1 && lemmas[0].toLowerCase() === form) continue; // lemma itself: found via entries
    shards[bucketOf(form, LEX_BUCKETS)].f[form] = lemmas;
    formCount++;
  }
  const lexFiles: string[] = [];
  for (let i = 0; i < LEX_BUCKETS; i++) {
    const res = await writeHashed('lex', String(i).padStart(2, '0'), shards[i]);
    lexFiles.push(res.path);
    bytes += res.bytes;
  }

  // verb tables
  const verbShards: VerbShard[] = Array.from({ length: VERB_BUCKETS }, () => ({}));
  let verbCount = 0;
  for (const r of ranked) {
    if (r.p !== 'verb' || !r.table || r.rank > 15000) continue;
    verbShards[bucketOf(r.w, VERB_BUCKETS)][r.w] = r.table;
    verbCount++;
  }
  const verbFiles: string[] = [];
  for (let i = 0; i < VERB_BUCKETS; i++) {
    const res = await writeHashed('verbs', String(i), verbShards[i]);
    verbFiles.push(res.path);
    bytes += res.bytes;
  }

  // sentences
  const sentFiles = {} as Record<Level, string>;
  const sentCounts = {} as Record<Level, number>;
  for (const level of LEVELS) {
    const rows: SentenceRow[] = selected[level];
    const res = await writeHashed('sent', level, rows);
    sentFiles[level] = res.path;
    sentCounts[level] = rows.length;
    bytes += res.bytes;
  }

  // vocabulary decks: one card per word form, no participle adjectives ("aufgefangen")
  const participles = new Set(top.filter((r) => r.p === 'verb' && r.v?.pp).map((r) => r.v!.pp!));
  const deckWords = new Set<string>();
  const deckFiles = {} as Record<Level, string>;
  const deckCounts = {} as Record<Level, number>;
  const deckByLevel = new Map<Level, DeckEntry[]>(LEVELS.map((l) => [l, []]));
  for (const r of top) {
    if (!DECK_POS.has(r.p) || r.quality < 1 || deckWords.has(r.w)) continue;
    if (r.p === 'intj' && r.rank > 3000) continue;
    if (r.p === 'adj' && participles.has(r.w)) continue;
    deckWords.add(r.w);
    const e = toEntry(r);
    const d: DeckEntry = { w: r.w, p: r.p, d: e.d, r: r.rank, l: r.level };
    if (e.g) d.g = e.g;
    if (e.pl) d.pl = e.pl;
    if (e.gs) d.gs = e.gs;
    if (e.wk) d.wk = 1;
    if (e.v) d.v = e.v;
    const ex = examples.get(r.id);
    if (ex) d.ex = [ex.id, ex.de, ex.en];
    deckByLevel.get(r.level)!.push(d);
  }
  for (const level of LEVELS) {
    const entries = deckByLevel.get(level)!.sort((a, b) => a.r - b.r);
    const res = await writeHashed('deck', level, entries);
    deckFiles[level] = res.path;
    deckCounts[level] = entries.length;
    bytes += res.bytes;
  }

  const manifest: DataManifest = {
    version: new Date().toISOString().slice(0, 10),
    generatedAt: new Date().toISOString(),
    buckets: LEX_BUCKETS,
    files: { lex: lexFiles, verbs: verbFiles, verbBuckets: VERB_BUCKETS, sentences: sentFiles, decks: deckFiles },
    counts: { lemmas: ranked.length, forms: formCount, verbs: verbCount, sentences: sentCounts, deck: deckCounts },
    bytes,
    sources: SOURCES.filter((s) => s.id !== 'tatoeba-deu-tags' && s.id !== 'tatoeba-user-languages').map((s) => ({
      name: s.attribution,
      url: s.url,
      license: s.license,
    })),
  };
  await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(manifest.counts));
  console.log(`Done: ${(bytes / 1024 / 1024).toFixed(1)} MB in ${OUT} (${time()})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
