/**
 * Generated, rule-checked drills: unlimited practice built from the dictionary data,
 * each with an explanation derived from the grammar rule.
 */
import { COMPARISONS, DRILL_ADJECTIVES, GENDER_RULES, MASS_NOUNS, WEAK_NOUNS } from '@/content/grammar/drill-lists';
import type { DeckEntry, VerbTable } from '@/lib/data/types';
import { shuffled } from '@/lib/random';
import { buildAdvancedDrills } from './drills-advanced';
import { ADVANCED_DRILL_KINDS, type AdvancedDrillKind, type ChoiceExercise, type DrillKind, type Exercise, type FillExercise } from './types';

type G = 'm' | 'f' | 'n';
type Case = 'nom' | 'acc' | 'dat' | 'gen';

export interface DrillPools {
  nouns: DeckEntry[];
  verbs: { entry: DeckEntry; table: VerbTable }[];
}

const GENDER_NAME: Record<G | 'pl', string> = { m: 'masculine', f: 'feminine', n: 'neuter', pl: 'plural' };
const CASE_NAME: Record<Case, string> = { nom: 'nominative', acc: 'accusative', dat: 'dative', gen: 'genitive' };

export const DEF: Record<Case, Record<G | 'pl', string>> = {
  nom: { m: 'der', f: 'die', n: 'das', pl: 'die' },
  acc: { m: 'den', f: 'die', n: 'das', pl: 'die' },
  dat: { m: 'dem', f: 'der', n: 'dem', pl: 'den' },
  gen: { m: 'des', f: 'der', n: 'des', pl: 'der' },
};

export const INDEF: Record<Case, Record<G, string>> = {
  nom: { m: 'ein', f: 'eine', n: 'ein' },
  acc: { m: 'einen', f: 'eine', n: 'ein' },
  dat: { m: 'einem', f: 'einer', n: 'einem' },
  gen: { m: 'eines', f: 'einer', n: 'eines' },
};

/** Adjective endings: weak (after der), mixed (after ein), strong (no article). */
export const ADJ_ENDINGS: Record<'weak' | 'mixed' | 'strong', Record<Case, Record<G | 'pl', string>>> = {
  weak: {
    nom: { m: 'e', f: 'e', n: 'e', pl: 'en' },
    acc: { m: 'en', f: 'e', n: 'e', pl: 'en' },
    dat: { m: 'en', f: 'en', n: 'en', pl: 'en' },
    gen: { m: 'en', f: 'en', n: 'en', pl: 'en' },
  },
  mixed: {
    nom: { m: 'er', f: 'e', n: 'es', pl: 'en' },
    acc: { m: 'en', f: 'e', n: 'es', pl: 'en' },
    dat: { m: 'en', f: 'en', n: 'en', pl: 'en' },
    gen: { m: 'en', f: 'en', n: 'en', pl: 'en' },
  },
  strong: {
    nom: { m: 'er', f: 'e', n: 'es', pl: 'e' },
    acc: { m: 'en', f: 'e', n: 'es', pl: 'e' },
    dat: { m: 'em', f: 'er', n: 'em', pl: 'en' },
    gen: { m: 'en', f: 'er', n: 'en', pl: 'er' },
  },
};

const MODAL_FRAMES: Record<string, string> = {
  können: 'gut schwimmen',
  müssen: 'heute lange arbeiten',
  wollen: 'nach Berlin fahren',
  dürfen: 'hier nicht parken',
  sollen: 'mehr Wasser trinken',
  mögen: 'keinen Fisch',
};

export function singleGender(e: DeckEntry): G | undefined {
  const g = e.g;
  return g === 'm' || g === 'f' || g === 'n' ? g : undefined;
}

/** Accusative/dative and genitive singular of a weak noun; null when the data is not clearly weak (der Typ, des Typs). */
export function weakForms(e: DeckEntry): { obl: string; gen: string } | null {
  if (!e.gs) return null;
  if (e.gs.endsWith('ns')) return { obl: e.gs.slice(0, -1), gen: e.gs };
  if (e.gs.endsWith('n')) return { obl: e.gs, gen: e.gs };
  return null;
}

/** Nouns whose forms can be derived reliably — excludes adjectival nouns (der Deutsche / ein Deutscher) and odd entries. */
export function isDrillNoun(e: DeckEntry): boolean {
  const g = singleGender(e);
  if (!g || e.p !== 'noun' || !/^[A-ZÄÖÜ][a-zäöüß]{2,}$/.test(e.w)) return false;
  if (e.gs !== undefined && !/^[A-Za-zÄÖÜäöüß]+$/.test(e.gs)) return false;
  if (g === 'f') return !e.gs || e.gs === e.w;
  if (!e.gs) return false;
  if (e.wk) return weakForms(e) !== null;
  if (g === 'm' && e.w.endsWith('er') && e.pl === e.w.slice(0, -1)) return false;
  if (e.w.endsWith('e') && e.gs === `${e.w}n`) return false;
  return true;
}

export function dativePlural(pl: string): string {
  return /[ns]$/.test(pl) ? pl : `${pl}n`;
}

/** Singular noun form for a case. */
export function nounForm(e: DeckEntry, g: G, c: Case): string {
  if (c === 'nom') return e.w;
  if (e.wk) {
    const wf = weakForms(e);
    if (wf) return c === 'gen' ? wf.gen : wf.obl;
  }
  if (c === 'gen' && g !== 'f') return e.gs ?? (/[sßxz]$/.test(e.w) ? `${e.w}es` : `${e.w}s`);
  return e.w;
}

const NOT_A_SUFFIX = new Set(['kuchen', 'knochen', 'rachen', 'drachen', 'raum', 'baum', 'traum', 'schaum', 'sprung', 'schwung', 'ursprung']);

export function genderClue(word: string, g: G): string {
  const lower = word.toLowerCase();
  if (!NOT_A_SUFFIX.has(lower)) {
    for (const r of GENDER_RULES) {
      const m = lower.match(r.re);
      if (!m || lower.length < m[0].length + (r.min ?? 3)) continue;
      return r.g === g ? r.text : `Watch out: ${word} is ${GENDER_NAME[g]} — an exception to the usual rule for nouns in -${m[0]}.`;
    }
  }
  return 'No reliable ending rule — learn the noun together with its article.';
}

const UMLAUTS = /[äöüÄÖÜ]/g;
function deUmlaut(s: string) {
  return s.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/Ä/g, 'A').replace(/Ö/g, 'O').replace(/Ü/g, 'U');
}

export function pluralPattern(w: string, pl: string): string {
  if (pl === w) return 'No ending — the plural looks like the singular (typical for masculine and neuter nouns in -er, -el, -en and for -chen/-lein).';
  const umlaut = (pl.match(UMLAUTS)?.length ?? 0) > (w.match(UMLAUTS)?.length ?? 0);
  const base = deUmlaut(pl);
  const stem = deUmlaut(w);
  if (base === stem) return 'Umlaut only, no ending (like der Bruder → die Brüder).';
  if (!base.startsWith(stem)) return 'Irregular plural — typical for words from Latin or Greek (das Museum → die Museen, das Thema → die Themen).';
  const u = umlaut ? ' with umlaut' : '';
  switch (base.slice(stem.length)) {
    case 'e':
      return `Plural -e${u} — the most common ending for masculine and many neuter nouns (der Tag → die Tage, der Stuhl → die Stühle, das Jahr → die Jahre).`;
    case 'er':
      return `Plural -er${u} — typical for short neuter nouns (das Kind → die Kinder, das Buch → die Bücher).`;
    case 'n':
    case 'en':
      return 'Plural -(e)n — the most common ending, used by almost all feminine nouns (die Frau → die Frauen, die Lampe → die Lampen).';
    case 'nen':
      return 'Nouns in -in double the n: -innen (die Freundin → die Freundinnen).';
    case 's':
      return 'Plural -s — typical for foreign words and nouns ending in a vowel (das Auto → die Autos).';
    case 'se':
      return 'Plural -e with a doubled s (das Ergebnis → die Ergebnisse, der Bus → die Busse).';
    default:
      return `Plural: die ${pl}.`;
  }
}

function choice(id: string, prompt: string, correct: string, wrong: string[], explain: string, tag: Exercise['tag'], rand: () => number, en?: string): ChoiceExercise {
  const others = shuffled([...new Set(wrong.filter((w) => w !== correct))], rand).slice(0, 3);
  return { id, kind: 'choice', prompt, options: [correct, ...others], explain, tag, en };
}

function fill(id: string, prompt: string, answers: string[], explain: string, tag: Exercise['tag'], hint?: string, en?: string): FillExercise {
  return { id, kind: 'fill', prompt, answers: [...new Set(answers)], explain, tag, hint, en };
}

const PRONOUNS = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];
const PRONOUN_LABEL = ['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'];

const SEIN_FORMS = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'];
const HABEN_FORMS = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
const WUERDE = ['würde', 'würdest', 'würde', 'würden', 'würdet', 'würden'];
const CORE_KONJ2 = new Set(['sein', 'haben', 'werden', 'können', 'müssen', 'dürfen', 'sollen', 'wollen', 'mögen', 'wissen']);

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function regularStem(inf: string): string {
  return inf.replace(/(e?n)$/, '');
}

function irregularPresent(t: VerbTable): boolean {
  const stem = regularStem(t.inf);
  return !t.pres[2].startsWith(stem) || !t.pres[1].startsWith(stem);
}

/** Builds up to `count` drill exercises (synchronous; pools are injected). */
export function buildDrills(kind: DrillKind, pools: DrillPools, rand: () => number, count: number): Exercise[] {
  if ((ADVANCED_DRILL_KINDS as readonly string[]).includes(kind)) return buildAdvancedDrills(kind as AdvancedDrillKind, pools, rand, count);
  const out: Exercise[] = [];
  const nouns = shuffled(pools.nouns.filter(isDrillNoun), rand);
  const pluralNouns = nouns.filter((x) => x.pl);
  const verbs = shuffled(pools.verbs.filter((v) => !v.table.sep && !v.entry.v?.sep), rand);
  const irregular = verbs.filter((v) => irregularPresent(v.table));
  const modals = verbs.filter((v) => v.table.inf in MODAL_FRAMES);
  const konj1 = verbs.filter((v) => !!v.table.k1[2]);
  let guard = 0;
  while (out.length < count && guard++ < count * 6) {
    const i = out.length + guard;
    const pick = <T,>(arr: readonly T[]) => arr[(i * 7 + Math.floor(rand() * 1000)) % Math.max(1, arr.length)];
    switch (kind) {
      case 'gender': {
        const n = nouns[out.length % Math.max(1, nouns.length)];
        if (!n) return out;
        const g = singleGender(n)!;
        out.push(
          choice(`drill:gender:${n.w}`, `___ ${n.w}`, DEF.nom[g], ['der', 'die', 'das'], `${DEF.nom[g]} ${n.w} (${GENDER_NAME[g]}${n.pl ? `, plural: die ${n.pl}` : ''}). ${genderClue(n.w, g)}`, 'gender', rand, n.d[0]),
        );
        break;
      }
      case 'plural': {
        const n = pluralNouns[out.length % Math.max(1, pluralNouns.length)];
        if (!n?.pl) return out;
        const g = singleGender(n)!;
        out.push(fill(`drill:plural:${n.w}`, `${DEF.nom[g]} ${n.w} → die ___`, [n.pl], `die ${n.pl}. ${pluralPattern(n.w, n.pl)}`, 'plural', undefined, n.d[0]));
        break;
      }
      case 'case-akk':
      case 'case-dat':
      case 'case-gen':
      case 'case-prep': {
        const n = nouns[out.length % Math.max(1, nouns.length)];
        if (!n) return out;
        const g = singleGender(n)!;
        const useIndef = rand() < 0.4;
        let c: Case;
        let before: string;
        let reason: string;
        let end = '';
        if (kind === 'case-akk') {
          c = 'acc';
          [before, reason, end] = pick([
            ['Ich suche', 'suchen takes an accusative object', '.'],
            ['Wir brauchen', 'brauchen takes an accusative object', '.'],
            ['Er kauft', 'kaufen takes an accusative object', '.'],
            ['Kennst du', 'kennen takes an accusative object', '?'],
            ['Hier gibt es', 'es gibt always takes the accusative', '.'],
          ] as const);
        } else if (kind === 'case-dat') {
          c = 'dat';
          before = pick(['mit', 'mit', 'aus', 'nach', 'außer', 'gegenüber'] as const);
          reason = `${before} always takes the dative`;
        } else if (kind === 'case-gen') {
          c = 'gen';
          before = pick(['wegen', 'trotz', 'statt'] as const);
          reason = `${before} takes the genitive`;
        } else {
          const p = pick([
            ['für', 'acc'],
            ['ohne', 'acc'],
            ['durch', 'acc'],
            ['gegen', 'acc'],
            ['mit', 'dat'],
            ['aus', 'dat'],
            ['nach', 'dat'],
            ['außer', 'dat'],
            ['wegen', 'gen'],
            ['trotz', 'gen'],
          ] as const);
          before = p[0];
          c = p[1];
          reason = `${p[0]} takes the ${CASE_NAME[c]}`;
        }
        const art = useIndef ? INDEF[c][g] : DEF[c][g];
        const form = nounForm(n, g, c);
        const all = useIndef ? ['ein', 'eine', 'einen', 'einem', 'einer', 'eines'] : ['der', 'die', 'das', 'den', 'dem', 'des'];
        const notes: string[] = [];
        if (c === 'gen' && g !== 'f' && !n.wk) notes.push('Masculine and neuter nouns add -(e)s in the genitive.');
        if (n.wk) notes.push(`${n.w} is a weak noun (n-Deklination): ${form} in the ${CASE_NAME[c]}.`);
        out.push(
          choice(
            `drill:${kind}:${before}:${n.w}:${useIndef ? 'i' : 'd'}`,
            `${cap(before)} ___ ${form}${end}`,
            art,
            all,
            `${cap(reason)}: ${art} ${form} (${GENDER_NAME[g]}, ${CASE_NAME[c]}; ${DEF.nom[g]} ${n.w}).${notes.length ? ` ${notes.join(' ')}` : ''}`,
            kind === 'case-akk' ? 'case.acc' : kind === 'case-dat' ? 'case.dat' : kind === 'case-gen' ? 'case.gen' : 'case.prep',
            rand,
            n.d[0],
          ),
        );
        break;
      }
      case 'adj-definite':
      case 'adj-indefinite':
      case 'adj-all': {
        const type = kind === 'adj-definite' ? 'weak' : kind === 'adj-indefinite' ? 'mixed' : pick(['weak', 'mixed', 'strong'] as const);
        const adj = pick(DRILL_ADJECTIVES);
        const c = pick<Case>(type === 'strong' ? ['nom', 'acc', 'dat'] : ['nom', 'acc', 'dat', 'gen']);
        let g: G | 'pl';
        let noun: string;
        if (type === 'strong') {
          if (rand() < 0.5) {
            const m = pick(MASS_NOUNS);
            g = m.g;
            noun = m.w;
          } else {
            const n = pick(pluralNouns.filter((x) => x.pl !== x.w));
            if (!n?.pl) return out;
            g = 'pl';
            noun = c === 'dat' ? dativePlural(n.pl) : n.pl;
          }
        } else {
          const n = nouns[out.length % Math.max(1, nouns.length)];
          if (!n) return out;
          const sg = singleGender(n)!;
          if (n.pl && rand() < 0.2) {
            g = 'pl';
            noun = c === 'dat' ? dativePlural(n.pl) : n.pl;
          } else {
            g = sg;
            noun = nounForm(n, sg, c);
          }
        }
        const article =
          type === 'strong' ? '' : type === 'weak' ? DEF[c][g] : g === 'pl' ? (c === 'nom' || c === 'acc' ? 'keine' : c === 'dat' ? 'keinen' : 'keiner') : INDEF[c][g];
        const lead = c === 'nom' ? (g === 'pl' ? 'Das sind' : 'Das ist') : c === 'acc' ? 'Ich suche' : c === 'dat' ? 'mit' : 'wegen';
        const ending = ADJ_ENDINGS[type][c][g];
        const why =
          type === 'weak'
            ? `After „${article}“ the article already shows case and gender, so the adjective takes the weak ending -${ending}.`
            : type === 'mixed'
              ? ending === 'er' || ending === 'es'
                ? `„${article}“ has no ending here, so the adjective shows the gender: -${ending}.`
                : `After „${article}“ (${CASE_NAME[c]}) the adjective takes -${ending}.`
              : `No article: the adjective takes the ending the definite article would have (${DEF[c][g]} → -${ending}).`;
        const phrase = `${lead} ${article ? `${article} ` : ''}`;
        out.push(
          fill(`drill:adj:${type}:${c}:${g}:${adj}:${noun}`, `${phrase}${adj}___ ${noun}`, [ending], `${phrase}${adj}${ending} ${noun}. ${why} (${GENDER_NAME[g]}, ${CASE_NAME[c]})`, 'adj.ending', 'ending'),
        );
        break;
      }
      case 'present':
      case 'present-irregular':
      case 'modal': {
        const pool = kind === 'present-irregular' ? irregular : kind === 'modal' ? modals : verbs;
        const v = pool[out.length % Math.max(1, pool.length)];
        if (!v) return out;
        const t = v.table;
        const person = kind === 'present-irregular' ? (rand() < 0.5 ? 1 : 2) : Math.floor(rand() * 6);
        const rest = kind === 'modal' ? ` ${MODAL_FRAMES[t.inf]}` : '';
        const explain =
          kind === 'modal'
            ? `${t.inf}: ${PRONOUN_LABEL[person]} ${t.pres[person]}. Modal verbs: ich and er/sie/es have the same form without ending (ich ${t.pres[0]}, er ${t.pres[2]}).`
            : `${t.inf}: ${PRONOUN_LABEL[person]} ${t.pres[person]}.${irregularPresent(t) ? ` The stem changes in the du and er/sie/es forms: du ${t.pres[1]}, er ${t.pres[2]}.` : ''}`;
        out.push(fill(`drill:${kind}:${t.inf}:${person}`, `${cap(PRONOUNS[person])} ___${rest}.`, [t.pres[person]], explain, kind === 'modal' ? 'verb.modal' : 'verb.conjugation', t.inf, v.entry.d[0]));
        break;
      }
      case 'preterite': {
        const v = verbs[out.length % Math.max(1, verbs.length)];
        if (!v) return out;
        const t = v.table;
        const person = Math.floor(rand() * 6);
        const stem = regularStem(t.inf);
        const form = t.prt[2];
        const type = form.endsWith('te')
          ? form.startsWith(stem)
            ? 'Regular verb: stem + -te + ending.'
            : `Mixed verb: the stem changes and it takes -te (er ${form}).`
          : `Strong verb: the vowel changes and there is no -te; ich and er have no ending (er ${form}).`;
        out.push(fill(`drill:preterite:${t.inf}:${person}`, `Gestern ___ ${PRONOUNS[person]} …`, [t.prt[person]], `${t.inf} → Präteritum: ${PRONOUN_LABEL[person]} ${t.prt[person]}. ${type}`, 'verb.preterite', t.inf, v.entry.d[0]));
        break;
      }
      case 'perfect': {
        const v = verbs[out.length % Math.max(1, verbs.length)];
        if (!v) return out;
        const t = v.table;
        const person = Math.floor(rand() * 6);
        const auxes = t.aux === 'hs' ? [HABEN_FORMS[person], SEIN_FORMS[person]] : t.aux === 's' ? [SEIN_FORMS[person]] : [HABEN_FORMS[person]];
        const answers = auxes.flatMap((a) => [`${a} ${t.pp}`, `${PRONOUNS[person]} ${a} ${t.pp}`]);
        const auxNote = t.aux === 's' ? 'sein (movement or change of state)' : t.aux === 'hs' ? 'haben or sein, depending on the meaning' : 'haben';
        out.push(
          fill(
            `drill:perfect:${t.inf}:${person}`,
            `${cap(PRONOUNS[person])} (${t.inf}) → Perfekt: ___`,
            answers,
            `${PRONOUN_LABEL[person]} ${auxes[0]} … ${t.pp}. ${t.inf} forms the Perfekt with ${auxNote}; participle: ${t.pp}.`,
            'verb.participle',
            undefined,
            v.entry.d[0],
          ),
        );
        break;
      }
      case 'konj2': {
        const v = verbs[out.length % Math.max(1, verbs.length)];
        if (!v) return out;
        const t = v.table;
        const person = Math.floor(rand() * 6);
        const synthetic = t.k2[person];
        const analytic = `${WUERDE[person]} ${t.inf}`;
        let answers: string[];
        let explain: string;
        if (CORE_KONJ2.has(t.inf)) {
          answers = [synthetic];
          explain = `${t.inf} → ${PRONOUN_LABEL[person]} ${synthetic}. For sein, haben, werden, wissen and the modal verbs always use this form, not würde + infinitive.`;
        } else if (synthetic === t.prt[person]) {
          answers = [analytic, synthetic];
          explain = `${t.inf} → ${PRONOUN_LABEL[person]} ${analytic}. For regular verbs the Konjunktiv II looks exactly like the Präteritum (${synthetic}), so würde + infinitive is used.`;
        } else {
          answers = [synthetic, analytic];
          explain = `${t.inf} → ${PRONOUN_LABEL[person]} ${synthetic} or ${analytic}. Both are correct; würde + infinitive is more common in speech, except for frequent verbs like käme, ginge, gäbe.`;
        }
        out.push(fill(`drill:konj2:${t.inf}:${person}`, `${cap(PRONOUNS[person])} (${t.inf}) → Konjunktiv II: ___`, answers, explain, 'mood.konj2', undefined, v.entry.d[0]));
        break;
      }
      case 'konj1': {
        const v = konj1[out.length % Math.max(1, konj1.length)];
        if (!v) return out;
        const t = v.table;
        out.push(
          fill(
            `drill:konj1:${t.inf}`,
            'Sie sagt, er ___ … (Konjunktiv I)',
            [t.k1[2]],
            `${t.inf} → er/sie/es ${t.k1[2]}. ${t.inf === 'sein' ? 'sein is irregular: er sei.' : 'Konjunktiv I: infinitive stem + -e.'}`,
            'mood.konj1',
            t.inf,
            v.entry.d[0],
          ),
        );
        break;
      }
      case 'imperative': {
        const v = verbs[out.length % Math.max(1, verbs.length)];
        if (!v) return out;
        const t = v.table;
        const who = Math.floor(rand() * 3);
        if (who === 2) {
          const form = t.inf === 'sein' ? 'Seien Sie' : `${cap(t.inf)} Sie`;
          out.push(fill(`drill:imp:${t.inf}:Sie`, `(${t.inf}, Sie) ___ bitte!`, [form], `Polite imperative: infinitive + Sie → ${form}!`, 'verb.imperative', undefined, v.entry.d[0]));
          break;
        }
        const form = t.imp[who];
        if (!form) break;
        if (who === 1) {
          out.push(fill(`drill:imp:${t.inf}:ihr`, `(${t.inf}, ihr) ___ bitte!`, [cap(form)], `ihr-imperative = the present tense form without ihr: ${cap(form)}!`, 'verb.imperative', undefined, v.entry.d[0]));
          break;
        }
        const stem = regularStem(t.inf);
        const keepsStem = form.startsWith(stem);
        const variants = t.inf !== 'sein' && keepsStem && !form.endsWith('e') ? [form, `${form}e`] : [form];
        const explain = !keepsStem
          ? `${cap(form)}! Verbs that change e → i/ie in the du-form keep the change in the imperative (du ${t.pres[1]} → ${cap(form)}!) and never add -e.`
          : !t.pres[1].startsWith(stem)
            ? `${cap(form)}! The umlaut of the du-form (du ${t.pres[1]}) disappears in the imperative.`
            : `${cap(form)}! The du-imperative is the stem without -st and without du${variants.length > 1 ? ` (${cap(form)}e! is also correct)` : ''}.`;
        out.push(fill(`drill:imp:${t.inf}:du`, `(${t.inf}, du) ___ bitte!`, variants.map(cap), explain, 'verb.imperative', undefined, v.entry.d[0]));
        break;
      }
      case 'comparison': {
        const a = COMPARISONS[(out.length * 3 + Math.floor(rand() * COMPARISONS.length)) % COMPARISONS.length];
        const note = a.note ? ` ${a.note}` : '';
        if (rand() < 0.55) out.push(fill(`drill:comp:${a.w}:c`, `${a.w} → ___ als …`, [a.c], `${a.w} – ${a.c} – ${a.s}.${note}`, 'adj.comparison'));
        else out.push(fill(`drill:comp:${a.w}:s`, `${a.w} → am ___`, [a.s.replace(/^am /, ''), a.s], `${a.w} – ${a.c} – ${a.s}.${note}`, 'adj.comparison'));
        break;
      }
      case 'n-decl': {
        const n = WEAK_NOUNS[(out.length * 5 + Math.floor(rand() * WEAK_NOUNS.length)) % WEAK_NOUNS.length];
        const frame = pick([
          ['Ich kenne den', 'acc'],
          ['Wir sprechen mit dem', 'dat'],
          ['Das ist das Auto des', 'gen'],
          ['Ich frage den', 'acc'],
          ['Sie hilft dem', 'dat'],
        ] as const);
        out.push(
          fill(
            `drill:ndecl:${n.w}:${frame[1]}`,
            `${frame[0]} ___. (${n.w})`,
            [n.f],
            `${n.w} is a weak noun: every form except the nominative singular ends in -(e)n → ${n.f}.`,
            'n-decl',
            undefined,
            n.en,
          ),
        );
        break;
      }
    }
  }
  const seen = new Set<string>();
  return out.filter((e) => (seen.has(e.id) ? false : (seen.add(e.id), true)));
}
