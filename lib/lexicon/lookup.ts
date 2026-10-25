'use client';

/**
 * Tap-to-look-up: finds dictionary entries (Wiktionary data) for a word as it appears in a text.
 * Handles inflected forms, capitalisation, separable verbs split across the clause and compounds.
 */
import { loadLexShard, loadManifest } from '@/lib/data/load';
import type { LexEntry, Pos } from '@/lib/data/types';
import { bucketOf } from './hash';

export interface LookupHit {
  entry: LexEntry;
  /** how the tapped form relates to the dictionary form, e.g. "plural of Haus" */
  form?: string;
  /** assembled from a split separable verb (stehe … auf → aufstehen) */
  separable?: boolean;
}

export interface CompoundPart {
  text: string;
  entry?: LexEntry;
}

export interface LookupResult {
  surface: string;
  hits: LookupHit[];
  /** when the word itself is unknown: its parts (Bahnhofs|uhr) */
  compound?: CompoundPart[];
}

export interface LookupContext {
  /** the words of the sentence, in order */
  words: string[];
  /** index of the tapped word in `words` */
  index: number;
  /** punctuation after each word ('' if none), same length as words */
  after?: string[];
}

const FUNCTION_POS = new Set<Pos>(['prep', 'conj', 'pron', 'det', 'part']);

/** Object/oblique pronoun forms → the pronoun learners look for. */
const PRONOUNS: Record<string, string> = {
  mich: 'ich',
  mir: 'ich',
  dich: 'du',
  dir: 'du',
  ihn: 'er',
  ihm: 'er',
  uns: 'wir',
  euch: 'ihr',
  ihnen: 'sie',
  meiner: 'ich',
  deiner: 'du',
  seiner: 'er',
  dies: 'dieser',
};

/** Separable verb particles that can stand at the end of a clause. */
const PARTICLES = new Set([
  'ab', 'an', 'auf', 'aus', 'bei', 'ein', 'fest', 'fort', 'her', 'heraus', 'herein', 'hin', 'hinaus', 'hinein', 'los', 'mit', 'nach', 'vor', 'vorbei', 'weg', 'weiter', 'zu', 'zurück', 'zusammen', 'um', 'durch', 'fern', 'statt', 'teil', 'kennen', 'spazieren', 'frei', 'heim', 'wieder',
]);

async function shardFor(word: string) {
  const m = await loadManifest();
  return loadLexShard(bucketOf(word, m.buckets));
}

/** Dictionary entries whose lemma is exactly `lemma` (case-sensitive). */
export async function entriesFor(lemma: string): Promise<LexEntry[]> {
  return (await shardFor(lemma)).e[lemma] ?? [];
}

/** Lemmas that list `form` as one of their forms. */
async function lemmasForForm(form: string): Promise<string[]> {
  return (await shardFor(form)).f[form.toLowerCase()] ?? [];
}

function describeForm(surface: string, e: LexEntry): string | undefined {
  const s = surface.toLowerCase();
  const w = e.w.toLowerCase();
  if (s === w) return undefined;
  if (e.p === 'noun') {
    const pl = e.pl?.toLowerCase();
    if (pl && s === pl) return `plural of ${e.w}`;
    if (pl && s === `${pl}n`) return `dative plural of ${e.w}`;
    if (e.gs && s === e.gs.toLowerCase()) return `genitive of ${e.w}`;
    return `form of ${e.w}`;
  }
  if (e.p === 'verb') {
    const v = e.v ?? {};
    const strip = (x?: string) => x?.split(' ')[0]?.toLowerCase();
    if (strip(v.p3) === s) return `present tense of ${e.w}`;
    if (strip(v.pt) === s) return `Präteritum of ${e.w}`;
    if (v.pp?.toLowerCase() === s) return `Partizip II of ${e.w}`;
    return `form of ${e.w}`;
  }
  if (e.p === 'adj' || e.p === 'adv') {
    if (e.cmp && s.startsWith(e.cmp.toLowerCase())) return `comparative of ${e.w}`;
    if (e.sup && s.startsWith(e.sup.replace(/^am\s+/, '').replace(/en$/, '').toLowerCase())) return `superlative of ${e.w}`;
    return `inflected form of ${e.w}`;
  }
  return `form of ${e.w}`;
}

function rankScore(e: LexEntry, surface: string, sentenceInitial: boolean): number {
  const exact = e.w === surface || (sentenceInitial && e.w.toLowerCase() === surface.toLowerCase());
  const capital = /^[A-ZÄÖÜ]/.test(surface);
  let s = Math.log(e.r + 1);
  if (exact && FUNCTION_POS.has(e.p)) s -= 20;
  else if (exact) s -= 1;
  // German nouns are always capitalised: a lowercase word is not a noun
  if (e.p === 'noun' && !capital) s += 30;
  // a capitalised word in mid-sentence is almost always a noun (or Sie/Ihr)
  if (e.p !== 'noun' && capital && !sentenceInitial && e.w !== surface) s += 8;
  return s;
}

/** All candidate entries for a single surface form, best first. */
async function rawLookup(surface: string, sentenceInitial: boolean): Promise<LookupHit[]> {
  const lower = surface.toLowerCase();
  const cap = lower.charAt(0).toUpperCase() + lower.slice(1);
  const lemmaNames = new Set<string>([surface]);
  if (sentenceInitial || surface === surface.toUpperCase()) {
    lemmaNames.add(lower);
    lemmaNames.add(cap);
  }
  if (PRONOUNS[lower]) lemmaNames.add(PRONOUNS[lower]);
  for (const l of await lemmasForForm(surface)) lemmaNames.add(l);
  const seen = new Set<string>();
  const hits: { hit: LookupHit; score: number }[] = [];
  for (const name of lemmaNames) {
    for (const e of await entriesFor(name)) {
      const key = `${e.w}|${e.p}`;
      if (seen.has(key)) continue;
      seen.add(key);
      let score = rankScore(e, surface, sentenceInitial);
      if (PRONOUNS[lower] === e.w) score -= 25;
      hits.push({ hit: { entry: e, form: describeForm(surface, e) }, score });
    }
  }
  return hits.sort((a, b) => a.score - b.score).map((h) => h.hit);
}

/** Finds the end of the clause the word is in (index of its last word). */
function clauseEnd(ctx: LookupContext): number {
  for (let i = ctx.index; i < ctx.words.length; i++) {
    if (ctx.after && /[.,;:!?–—]/.test(ctx.after[i] ?? '')) return i;
  }
  return ctx.words.length - 1;
}

function clauseStart(ctx: LookupContext): number {
  for (let i = ctx.index - 1; i >= 0; i--) {
    if (ctx.after && /[.,;:!?–—]/.test(ctx.after[i] ?? '')) return i + 1;
  }
  return 0;
}

/** stehe … auf → aufstehen: verb + particle at the end of the clause. */
async function separableHits(ctx: LookupContext, verbHits: LookupHit[]): Promise<LookupHit[]> {
  const out: LookupHit[] = [];
  const word = ctx.words[ctx.index];
  const end = clauseEnd(ctx);
  const particle = ctx.words[end]?.toLowerCase();
  if (end > ctx.index && particle && PARTICLES.has(particle)) {
    for (const h of verbHits.filter((x) => x.entry.p === 'verb').slice(0, 3)) {
      const candidate = `${particle}${h.entry.w}`;
      for (const e of await entriesFor(candidate)) if (e.p === 'verb') out.push({ entry: e, separable: true, form: `${word} … ${ctx.words[end]} → ${e.w}` });
    }
  }
  // tapped the particle itself: look for the finite verb earlier in the clause
  if (PARTICLES.has(word.toLowerCase()) && end === ctx.index) {
    const start = clauseStart(ctx);
    for (let i = start; i < ctx.index && out.length === 0; i++) {
      const w = ctx.words[i];
      if (/^[A-ZÄÖÜ]/.test(w) && i !== start) continue; // nouns are not verbs
      const verbs = (await rawLookup(w, i === 0)).filter((x) => x.entry.p === 'verb').slice(0, 2);
      for (const h of verbs) {
        for (const e of await entriesFor(`${word.toLowerCase()}${h.entry.w}`)) {
          if (e.p === 'verb') out.push({ entry: e, separable: true, form: `${w} … ${word} → ${e.w}` });
        }
      }
    }
  }
  return out;
}

/** Splits an unknown compound into a known final noun and a known first part (Bahnhofs|uhr). */
async function splitCompound(word: string): Promise<CompoundPart[] | undefined> {
  if (word.includes('-')) {
    // Vokabel-Apps, Streaming-Plattformen: look up each part
    const parts: CompoundPart[] = [];
    for (const p of word.split('-').filter(Boolean)) parts.push({ text: p, entry: (await rawLookup(p, true))[0]?.entry });
    return parts.some((p) => p.entry) ? parts : undefined;
  }
  if (word.length < 7) return undefined;
  for (let i = 3; i <= word.length - 3; i++) {
    const tailRaw = word.slice(i);
    const tail = tailRaw.charAt(0).toUpperCase() + tailRaw.slice(1).toLowerCase();
    const tailEntries = (await entriesFor(tail)).filter((e) => e.p === 'noun');
    // the last part may be inflected (Wild|bienen → Biene)
    if (!tailEntries.length) {
      for (const lemma of await lemmasForForm(tail)) tailEntries.push(...(await entriesFor(lemma)).filter((e) => e.p === 'noun'));
    }
    if (!tailEntries.length) continue;
    const head = word.slice(0, i);
    const variants = [head, head.replace(/s$/, ''), head.replace(/es$/, ''), head.replace(/n$/, ''), head.replace(/en$/, ''), `${head}e`, head.replace(/er$/, '')];
    for (const v of [...new Set(variants)].filter((x) => x.length >= 2)) {
      const capV = v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
      const lowV = v.toLowerCase();
      const headEntry = (await entriesFor(capV))[0] ?? (await entriesFor(lowV))[0] ?? (await entriesFor(`${lowV}en`)).find((e) => e.p === 'verb');
      if (headEntry) return [{ text: head, entry: headEntry }, { text: tailRaw, entry: tailEntries[0] }];
    }
    return [{ text: head }, { text: tailRaw, entry: tailEntries[0] }];
  }
  return undefined;
}

export function cleanWord(raw: string): string {
  return raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
}

export async function lookup(rawSurface: string, ctx?: LookupContext): Promise<LookupResult> {
  const surface = cleanWord(rawSurface);
  if (!surface) return { surface, hits: [] };
  const sentenceInitial = !ctx || clauseStart({ ...ctx, after: ctx.after?.map((a) => (/[.!?:]/.test(a) ? a : '')) }) === ctx.index;
  let hits = await rawLookup(surface, sentenceInitial);
  if (ctx) {
    const sep = await separableHits(ctx, hits);
    if (sep.length) {
      const keys = new Set(sep.map((h) => `${h.entry.w}|${h.entry.p}`));
      hits = [...sep, ...hits.filter((h) => !keys.has(`${h.entry.w}|${h.entry.p}`))];
    }
  }
  if (hits.length) return { surface, hits: hits.slice(0, 5) };
  const fallback = await fallbackHits(surface);
  if (fallback.length) return { surface, hits: fallback };
  const compound = await splitCompound(surface);
  return { surface, hits: [], compound };
}

const MONTHS: Record<string, string> = {
  Januar: 'January',
  Februar: 'February',
  März: 'March',
  April: 'April',
  Mai: 'May',
  Juni: 'June',
  Juli: 'July',
  August: 'August',
  September: 'September',
  Oktober: 'October',
  November: 'November',
  Dezember: 'December',
};

function deUmlaut(s: string) {
  return s.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');
}

/** When nothing matches directly: nominalised words, feminine -in forms, inflected participles, month names. */
async function fallbackHits(surface: string): Promise<LookupHit[]> {
  const lower = surface.toLowerCase();
  if (/^[A-ZÄÖÜ]/.test(surface)) {
    // das Schwimmen, Deutsch, das Vertrauen → schwimmen, deutsch, vertrauen
    const hits = await rawLookup(lower, true);
    if (hits.length) return hits.slice(0, 3).map((h) => ({ ...h, form: h.entry.w.toLowerCase() === lower ? `capitalised use of ${h.entry.w}` : h.form }));
    // Freundin, Köchin, Kolleginnen → Freund, Koch, Kollege
    const m = surface.match(/^(.+?)in(nen)?$/);
    if (m) {
      const base = m[1];
      for (const b of [base, `${base}e`, deUmlaut(base), `${deUmlaut(base)}e`]) {
        const nouns = (await entriesFor(b)).filter((e) => e.p === 'noun');
        if (nouns.length) return [{ entry: nouns[0], form: `feminine form${m[2] ? ' (plural)' : ''} of ${nouns[0].w}` }];
      }
    }
    if (MONTHS[surface]) return [{ entry: { w: surface, p: 'noun', g: 'm', d: [MONTHS[surface]], r: 900, l: 'A1' } }];
    // des Denkens, des Einkommens → Denken / denken, Einkommen
    const gen = surface.match(/^(.{3,}?)(es|s)$/)?.[1];
    if (gen) {
      for (const candidate of [gen, gen.toLowerCase()]) {
        const hits = await rawLookup(candidate, true);
        if (hits.length) return hits.slice(0, 2).map((h) => ({ ...h, form: `genitive of ${surface.slice(0, gen.length)}` }));
      }
    }
  }
  // mitgebrachte, generelles → mitgebracht, generell
  const stem = lower.match(/^(.{4,}?)(e|en|er|es|em)$/)?.[1];
  if (stem) {
    const hits = await rawLookup(stem, false);
    const useful = hits.filter((h) => h.entry.p !== 'noun').slice(0, 3);
    if (useful.length) return useful.map((h) => ({ ...h, form: h.form ? `inflected ${h.form}` : `inflected form of ${h.entry.w}` }));
  }
  return [];
}
