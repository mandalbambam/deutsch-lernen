/**
 * Extracts a compact German lexicon from the kaikki.org (wiktextract) dump of English Wiktionary.
 */
import type { Gender, Pos, VerbInfo, VerbTable } from '../../lib/data/types';
import { readLines } from './lib/io';

export interface Candidate {
  id: number;
  w: string;
  p: Pos;
  genders: Set<Gender>;
  pl?: string;
  gs?: string;
  wk?: boolean;
  glosses: string[];
  v?: VerbInfo;
  table?: VerbTable;
  cmp?: string;
  sup?: string;
  ipa?: string;
  /** lowercase single-word forms, incl. the lemma */
  forms: Set<string>;
  /** 1 = has normal senses, 0.3 = only marked senses (rare, regional, colloquial…) */
  quality: number;
}

export interface KaikkiResult {
  candidates: Candidate[];
  /** lowercase inflected form → "lemmapos" keys from "form-of" entries */
  formOf: Map<string, Set<string>>;
  entries: number;
}

interface KForm {
  form: string;
  tags?: string[];
  source?: string;
}
interface KSense {
  glosses?: string[];
  tags?: string[];
  form_of?: { word: string }[];
}
interface KEntry {
  word: string;
  pos: string;
  lang_code?: string;
  head_templates?: { name: string; args?: Record<string, string>; expansion?: string }[];
  forms?: KForm[];
  senses?: KSense[];
  sounds?: { ipa?: string }[];
}

const POS_MAP: Record<string, Pos> = {
  noun: 'noun',
  verb: 'verb',
  adj: 'adj',
  adv: 'adv',
  prep: 'prep',
  postp: 'prep',
  circumpos: 'prep',
  contraction: 'prep',
  conj: 'conj',
  pron: 'pron',
  det: 'det',
  article: 'det',
  num: 'num',
  intj: 'intj',
  particle: 'part',
};

/** senses with these tags are dropped */
const DROP_TAGS = new Set(['archaic', 'obsolete', 'misspelling', 'dialectal', 'historical-spelling']);
/** senses with these tags are kept but ranked lower */
const LOW_TAGS = new Set([
  'rare',
  'dated',
  'regional',
  'Austria',
  'Switzerland',
  'Swiss',
  'Southern-Germany',
  'Northern-Germany',
  'East-Germany',
  'Bavaria',
  'Liechtenstein',
  'South-Tyrol',
  'Luxembourg',
  'slang',
  'vulgar',
  'derogatory',
  'offensive',
  'proscribed',
  'nonstandard',
  'uncommon',
  'poetic',
  'humorous',
  'euphemistic',
  'childish',
  'nonce-word',
  'Internet',
]);
/** form tags that are not inflections of this lemma */
const SKIP_FORM_TAGS = new Set([
  'table-tags',
  'inflection-template',
  'class',
  'auxiliary',
  'romanization',
  'diminutive',
  'feminine',
  'masculine-form',
  'archaic',
  'obsolete',
  'multiword-construction',
  'abbreviation',
]);

const INFLECTION_TAGS = new Set([
  'plural',
  'singular',
  'genitive',
  'dative',
  'accusative',
  'nominative',
  'comparative',
  'superlative',
  'participle',
  'past',
  'present',
  'preterite',
  'subjunctive-i',
  'subjunctive-ii',
  'imperative',
  'first-person',
  'second-person',
  'third-person',
  'infinitive',
  'zu-infinitive',
  'alternative',
  'strong',
  'weak',
  'mixed',
]);

function senseRank(s: KSense): number {
  const tags = s.tags ?? [];
  if (tags.some((t) => DROP_TAGS.has(t))) return 2;
  if (tags.some((t) => LOW_TAGS.has(t))) return 1;
  // "forms the present perfect …" is a poor first gloss for sein/haben/werden
  if (tags.includes('auxiliary') && /^(forms|used to form|used with)/i.test(s.glosses?.[0] ?? '')) return 1;
  return 0;
}

function cleanGloss(g: string): string {
  let s = g.replace(/\s+/g, ' ').trim().replace(/[.;:]$/, '');
  if (s.length > 90) {
    const cut = s.lastIndexOf(' ', 87);
    s = s.slice(0, cut > 40 ? cut : 87).replace(/[,;(]$/, '') + '…';
  }
  return s;
}

const PERSONS: [string, string][] = [
  ['first-person', 'singular'],
  ['second-person', 'singular'],
  ['third-person', 'singular'],
  ['first-person', 'plural'],
  ['second-person', 'plural'],
  ['third-person', 'plural'],
];

function personIndex(tags: string[]): number {
  return PERSONS.findIndex(([p, n]) => tags.includes(p) && tags.includes(n));
}

function hasAll(tags: string[] | undefined, want: string[]) {
  return !!tags && want.every((t) => tags.includes(t));
}

/** head forms are the summary forms without `source` */
function headForm(forms: KForm[], want: string[], exclude: string[] = []): string | undefined {
  return forms.find(
    (f) =>
      !f.source &&
      hasAll(f.tags, want) &&
      !(f.tags ?? []).some((t) => exclude.includes(t) || DROP_TAGS.has(t)) &&
      f.form !== '-',
  )?.form;
}

function extractVerb(e: KEntry, forms: KForm[], senseTags: string[]): { info: VerbInfo; table?: VerbTable } {
  const info: VerbInfo = {};
  info.p3 = headForm(forms, ['present', 'singular', 'third-person']);
  info.pt = headForm(forms, ['past']);
  info.pp = headForm(forms, ['participle', 'past']);
  const auxForms = forms.filter((f) => hasAll(f.tags, ['auxiliary'])).map((f) => f.form);
  const hasH = auxForms.some((a) => a.includes('haben'));
  const hasS = auxForms.some((a) => a.includes('sein'));
  if (hasH || hasS) info.aux = hasH && hasS ? 'hs' : hasS ? 's' : 'h';
  if (info.p3?.includes(' ')) info.sep = info.p3.split(' ').pop();
  const expansion = e.head_templates?.map((h) => h.expansion ?? '').join(' ') ?? '';
  if (/\b(strong|irregular|preterite-present)\b/.test(expansion) || senseTags.some((t) => /strong|irregular|preterite-present/.test(t)))
    info.irr = 1;
  if (senseTags.includes('reflexive')) info.refl = 1;

  const isRare = (tags: string[]) => tags.some((t) => t === 'rare' || t === 'archaic' || t === 'obsolete');
  // common forms first, so rare variants only fill gaps (e.g. weak-verb subjunctive II "kaufte")
  const conj = forms
    .filter((f) => f.source === 'conjugation' && !(f.tags ?? []).includes('multiword-construction'))
    .sort((a, b) => Number(isRare(a.tags ?? [])) - Number(isRare(b.tags ?? [])));
  const empty = () => ['', '', '', '', '', ''];
  const pres = empty();
  const prt = empty();
  const k1 = empty();
  const k2 = empty();
  const imp = ['', ''];
  let pa: string | undefined;
  for (const f of conj) {
    const tags = f.tags ?? [];
    if (tags.includes('subordinate-clause') || tags.includes('obsolete') || tags.includes('archaic')) continue;
    const pi = personIndex(tags);
    const set = (arr: string[]) => {
      if (pi >= 0 && !arr[pi]) arr[pi] = f.form;
    };
    if (tags.includes('imperative')) {
      if (tags.includes('singular') && !imp[0]) imp[0] = f.form;
      if (tags.includes('plural') && !imp[1]) imp[1] = f.form;
    } else if (tags.includes('subjunctive-ii')) {
      set(k2);
    } else if (tags.includes('subjunctive-i')) {
      set(k1);
    } else if (tags.includes('preterite') && tags.includes('indicative')) {
      set(prt);
    } else if (tags.includes('present') && tags.includes('indicative')) {
      set(pres);
    } else if (hasAll(tags, ['participle', 'present'])) {
      pa ??= f.form;
    }
  }
  let table: VerbTable | undefined;
  if (pres.every(Boolean) && prt.every(Boolean) && info.pp) {
    table = {
      inf: e.word,
      pres,
      prt,
      k1,
      k2,
      imp,
      pp: info.pp,
      pa,
      aux: info.aux ?? 'h',
      sep: info.sep,
    };
  }
  return { info, table };
}

const fold = (s: string) => s.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');

/**
 * Some compound entries list only the head word's form ("Börsenmantel": plural "Mäntel", genitive "s").
 * Rebuild the full form: "Börsenmäntel", "Börsenmantels".
 */
function fixCompoundForm(word: string, form: string | undefined): string | undefined {
  if (!form || form === '-') return undefined;
  if (form.length >= word.length - 2) return form;
  if (/^(s|es|n|en|ns|ens|e|er|ern)$/.test(form)) return word + form;
  const lowerForm = form.toLowerCase();
  for (let cut = Math.max(1, word.length - form.length - 2); cut <= word.length - 2; cut++) {
    const head = word.slice(cut);
    if (fold(head).slice(0, 3) === fold(lowerForm).slice(0, 3)) return word.slice(0, cut) + lowerForm;
  }
  return undefined;
}

function parseGenders(e: KEntry, senseTags: string[]): Set<Gender> {
  const g = new Set<Gender>();
  if (senseTags.includes('masculine')) g.add('m');
  if (senseTags.includes('feminine')) g.add('f');
  if (senseTags.includes('neuter')) g.add('n');
  if (senseTags.includes('plural-only')) g.add('pl');
  if (g.size === 0) {
    const arg = e.head_templates?.find((h) => h.name === 'de-noun')?.args?.['1'] ?? '';
    const m = arg.match(/(?:^|[<(,])\s*(m|f|n|p)(?=[.,>)\s:]|$)/);
    if (m) g.add(m[1] === 'p' ? 'pl' : (m[1] as Gender));
  }
  return g;
}

export async function extractKaikki(path: string): Promise<KaikkiResult> {
  const byKey = new Map<string, Candidate>();
  const formOf = new Map<string, Set<string>>();
  let entries = 0;
  let nextId = 0;

  for await (const line of readLines(path)) {
    if (!line) continue;
    entries++;
    const e = JSON.parse(line) as KEntry;
    if (e.lang_code !== 'de') continue;
    const pos = POS_MAP[e.pos];
    const senses = e.senses ?? [];

    if (senses.length > 0 && senses.every((s) => s.form_of && s.form_of.length > 0)) {
      if (senses.every((s) => senseRank(s) === 2)) continue;
      const key = e.word.toLowerCase();
      for (const s of senses) {
        if (senseRank(s) === 2) continue;
        // only true inflections / spelling variants, not e.g. "female equivalent of"
        if (!(s.tags ?? []).some((t) => INFLECTION_TAGS.has(t))) continue;
        for (const fo of s.form_of ?? []) {
          let set = formOf.get(key);
          if (!set) formOf.set(key, (set = new Set()));
          set.add(`${fo.word}${pos ?? ''}`);
        }
      }
      continue;
    }
    if (!pos) continue;
    if (/\s/.test(e.word) || e.word.length > 40) continue;

    const usable = senses
      .filter((s) => !s.form_of && senseRank(s) < 2 && (s.glosses?.length ?? 0) > 0)
      .map((s, i) => ({ s, rank: senseRank(s), i }))
      .sort((a, b) => a.rank - b.rank || a.i - b.i);
    if (usable.length === 0) continue;

    const senseTags = usable.flatMap((u) => u.s.tags ?? []);
    const glosses: string[] = [];
    for (const { s } of usable) {
      const raw = s.glosses![s.glosses!.length - 1];
      if (!raw || /^(inflection of|plural of|genitive of|alternative (form|spelling) of)/i.test(raw)) continue;
      let g = cleanGloss(raw);
      if (pos === 'verb' && (s.tags ?? []).includes('reflexive')) g = `(sich) ${g}`;
      if (!glosses.includes(g)) glosses.push(g);
      if (glosses.length >= 4) break;
    }
    if (glosses.length === 0) continue;

    const forms = e.forms ?? [];
    const key = `${e.word}|${pos}`;
    let c = byKey.get(key);
    if (!c) {
      c = {
        id: nextId++,
        w: e.word,
        p: pos,
        genders: new Set(),
        glosses: [],
        forms: new Set([e.word.toLowerCase()]),
        quality: 0.3,
      };
      byKey.set(key, c);
    }
    if (usable.some((u) => u.rank === 0)) c.quality = 1;
    for (const g of glosses) if (c.glosses.length < 4 && !c.glosses.includes(g)) c.glosses.push(g);
    c.ipa ??= e.sounds?.find((s) => s.ipa)?.ipa;

    if (pos === 'noun') {
      for (const g of parseGenders(e, senseTags)) c.genders.add(g);
      c.pl ??= fixCompoundForm(e.word, headForm(forms, ['plural'], ['definite', 'diminutive', 'rare']));
      c.gs ??= fixCompoundForm(e.word, headForm(forms, ['genitive'], ['definite', 'plural']));
      if (senseTags.includes('weak') || /\bweak\b/.test(e.head_templates?.[0]?.expansion ?? '')) c.wk = true;
    } else if (pos === 'verb') {
      const { info, table } = extractVerb(e, forms, senseTags);
      c.v ??= info;
      if (info.refl && c.v) c.v.refl = 1;
      c.table ??= table;
    } else if (pos === 'adj') {
      c.cmp ??= headForm(forms, ['comparative']);
      c.sup ??= headForm(forms, ['superlative']);
    }

    const minLen = pos === 'noun' || pos === 'adj' ? Math.max(2, e.word.length - 2) : 2;
    for (const f of forms) {
      const tags = f.tags ?? [];
      if (tags.some((t) => SKIP_FORM_TAGS.has(t))) continue;
      if (tags.includes('feminine') && tags.length === 1) continue;
      if (!f.form || /\s/.test(f.form) || f.form === '-' || f.form.length > 40) continue;
      // malformed compound forms in the source ("Börsenmantel" → plural "Mäntel", genitive "s")
      if (f.form.length < minLen) continue;
      c.forms.add(f.form.toLowerCase());
    }
    if (c.pl) c.forms.add(c.pl.toLowerCase());
    if (c.gs) c.forms.add(c.gs.toLowerCase());
  }

  return { candidates: [...byKey.values()], formOf, entries };
}
