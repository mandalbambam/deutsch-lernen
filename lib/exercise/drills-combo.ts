/**
 * Combinatorial generators for the B2–C2 topics whose drills used to come only from fixed pools
 * (rektion, Funktionsverbgefüge, genitive, modal particles, idioms, register, word formation,
 * B2 connectors, participle clauses). Each exercise combines a frame from content/grammar/drill-combos.ts
 * with persons, tenses, objects, articles, adjectives or randomly drawn distractors; the hand-written
 * pools still contribute about a quarter of the items.
 */
import type { G4 } from '@/content/grammar/drill-bank';
import {
  ADJ_NOUNS,
  BAR_ADJECTIVES,
  COLLOQUIAL,
  FORMAL,
  FVG_FRAMES,
  FVG_SUBJECTS,
  GEN_SCENES,
  IDIOM_LIST,
  INDEM,
  JE_DESTO,
  LIGHT_VERBS,
  PARTICIPLE_PHRASES,
  PARTICLE_TEMPLATES,
  REKTION_FRAMES,
  SODASS,
  VERB_NOUNS,
  type FvgFrame,
} from '@/content/grammar/drill-combos';
import * as BANK from '@/content/grammar/drill-items';
import { cap, choice, correct, fill, fromBank, order, transform, uniq, type Ctx } from './drill-helpers';
import { DEF, dativePlural } from './drills';
import type { Exercise } from './types';

const SEIN = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'];
const HABEN = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
const KANN = ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'];
const REFL = ['mich', 'dich', 'sich', 'uns', 'euch', 'sich'];
const PEOPLE: [string, number][] = [
  ['ich', 0],
  ['du', 1],
  ['er', 2],
  ['sie', 2],
  ['wir', 3],
  ['ihr', 4],
  ['mein Bruder', 2],
  ['die Studierenden', 5],
];
const PREPS = ['auf', 'an', 'über', 'für', 'um', 'von', 'mit', 'nach', 'vor', 'zu', 'unter', 'in', 'bei', 'gegen'];
/** prepositional objects that are people: replaced by preposition + pronoun, not by a da-word */
const PERSON_OBJECTS = new Set(['Kinder', 'Eltern', 'Politiker', 'Gäste', 'Kollegin', 'Kunden', 'Freunde', 'Team', 'Publikum']);
const CASE_EN = { acc: 'accusative', dat: 'dative' } as const;

/** Present tense of a regular verb (ich, du, er, wir, ihr, sie). */
export function regularPresent(inf: string): string[] {
  if (/eln$/.test(inf)) {
    const st = inf.slice(0, -1);
    return [`${inf.slice(0, -3)}le`, `${st}st`, `${st}t`, inf, `${st}t`, inf];
  }
  if (/ern$/.test(inf)) {
    const st = inf.slice(0, -1);
    return [`${st}e`, `${st}st`, `${st}t`, inf, `${st}t`, inf];
  }
  const st = inf.slice(0, -2);
  const e = /[td]$/.test(st) || /[^aeiouäöülrhmn][mn]$/.test(st) ? 'e' : '';
  const du = /[sßzx]$/.test(st) ? `${st}t` : `${st}${e}st`;
  return [`${st}e`, du, `${st}${e}t`, inf, `${st}${e}t`, inf];
}

const idx = (c: Ctx, n: number) => Math.floor(c.rand() * n);
const isVowel = (p: string) => /^[aeiouäöü]/.test(p);
const daWord = (p: string) => `da${isVowel(p) ? 'r' : ''}${p}`;
const woWord = (p: string) => `wo${isVowel(p) ? 'r' : ''}${p}`;
/** draws up to n distinct values from a list, never one of `not` (case-insensitive) */
function others(c: Ctx, list: string[], not: string[], n = 3): string[] {
  const block = new Set(not.map((x) => x.toLowerCase()));
  const pool = uniq(list).filter((x) => !block.has(x.toLowerCase()));
  const out: string[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(idx(c, pool.length), 1)[0]);
  return out;
}

// ── Rektion ─────────────────────────────────────────────────────────────────

function rektion(c: Ctx): Exercise {
  if (c.chance(0.2)) return fromBank('rektion', BANK.REKTION, 'verb.prep', c, true, PREPS);
  const fi = idx(c, REKTION_FRAMES.length);
  const f = REKTION_FRAMES[fi];
  const [g, n] = c.pick(f.objs);
  const [subj, pi] = c.pick(PEOPLE);
  const fin = (f.v === 'sein' ? SEIN : Array.isArray(f.v) ? f.v : regularPresent(f.v))[pi];
  const art = DEF[f.cs][g];
  const noun = g === 'pl' && f.cs === 'dat' ? dativePlural(n) : n;
  const refl = f.refl ? REFL[pi] : '';
  const mid = [refl, f.pre ?? ''].filter(Boolean).join(' ');
  const head = `${cap(subj)} ${fin}${mid ? ` ${mid}` : ''}`;
  const tail = f.post ? ` ${f.post}` : '';
  const rule = `${f.name} + ${CASE_EN[f.cs]}`;
  const key = `${fi}:${n}:${pi}`;
  const sentence = `${head} ${f.prep} ${art} ${noun}${tail}.`;
  const thing = !PERSON_OBJECTS.has(n);
  const r = c.rand();
  if (r < 0.28) return fill(`drill:rektion-x:${key}:p`, `${head} ___ ${art} ${noun}${tail}.`, [f.prep], `${rule}.`, 'verb.prep');
  if (r < 0.48) return choice(`drill:rektion-x:${key}:c`, `${head} ___ ${art} ${noun}${tail}.`, f.prep, PREPS, `${rule}.`, 'verb.prep', c.rand);
  if (r < 0.72 || !thing) {
    const wrongCase = DEF[f.cs === 'acc' ? 'dat' : 'acc'][g];
    return fill(`drill:rektion-x:${key}:a`, `${head} ${f.prep} ___ ${noun}${tail}.`, [art], `${rule}: ${f.prep} ${art} ${noun}.`, 'verb.prep', `${DEF.nom[g]} ${n}`, { [wrongCase]: `${f.name} takes the ${CASE_EN[f.cs]}.` });
  }
  if (r < 0.86 || pi === 0) {
    return transform(`drill:rektion-x:${key}:da`, 'Replace the prepositional object with a da-word.', sentence, [`${head} ${daWord(f.prep)}${tail}.`], `For things, ${f.prep} + noun becomes da(r) + preposition: ${daWord(f.prep)}.`, 'verb.prep', [
      [`${f.prep} (es|ihm|ihn|ihr|sie)\\b`, `For things use ${daWord(f.prep)}, not ${f.prep} + pronoun.`],
    ]);
  }
  // question: Wo(r)+preposition, verb second
  const rest = [f.pre ?? ''].filter(Boolean).join(' ');
  const parts = (a: string[]) => a.filter(Boolean).join(' ');
  const pronoun = /^(du|er|sie|wir|ihr)$/.test(subj);
  const answers = [parts([cap(woWord(f.prep)), fin, subj, refl, rest]) + `${tail}?`];
  if (refl && !pronoun) answers.push(parts([cap(woWord(f.prep)), fin, refl, subj, rest]) + `${tail}?`);
  return transform(`drill:rektion-x:${key}:wo`, 'Ask about the prepositional object.', sentence, answers, `Asking about a thing after ${f.prep}: wo(r) + preposition → ${cap(woWord(f.prep))} …? (verb in second position).`, 'verb.prep', [
    [`^${f.prep} was`, `Standard German uses ${cap(woWord(f.prep))}.`],
  ]);
}

// ── Funktionsverbgefüge ─────────────────────────────────────────────────────

type Tense = 'pres' | 'perf' | 'modal';

function lvForm(lv: string, tense: Tense, pi: number): { fin: string; end: string } {
  const L = LIGHT_VERBS[lv];
  if (tense === 'pres') return { fin: (L.pres ?? regularPresent(lv))[pi], end: '' };
  if (tense === 'perf') return { fin: (L.aux === 's' ? SEIN : HABEN)[pi], end: L.pp };
  return { fin: KANN[pi], end: lv };
}
const fvgMid = (f: FvgFrame, o: string) => f.tpl.replace('{o}', o).replace('*', '').replace(/\s+/g, ' ').trim();
const fvgPhrase = (f: FvgFrame) => `${f.tpl.replace('{o}', '').replace('*', '').replace(/\s+/g, ' ').trim()} ${f.lv}`;
const fvgKey = (f: FvgFrame) => f.tpl.match(/\*(\S+)/)![1];

function fvg(c: Ctx, level: 'c1' | 'c2'): Exercise {
  if (c.chance(0.2)) return level === 'c1' ? fromBank('fvg-c1', BANK.FVG_C1, 'fvg', c, true) : fromBank('fvg-c2', BANK.FVG_C2, 'fvg', c, true);
  // mostly the level's own frames, sometimes revision of the other level
  const pool = FVG_FRAMES.filter((f) => (c.chance(0.8) ? f.level === level : true));
  const fi = idx(c, pool.length);
  const f = pool[fi];
  const [S, pi] = c.pick(f.subj ?? FVG_SUBJECTS);
  const o = c.pick(f.objs);
  const tense = c.pick<Tense>(['pres', 'pres', 'perf', 'modal']);
  const { fin, end } = lvForm(f.lv, tense, pi);
  const mid = fvgMid(f, o);
  const key = fvgKey(f);
  const sentence = `${S} ${fin} ${mid}${end ? ` ${end}` : ''}.`;
  const id = `drill:fvg-x:${f.tpl}:${S}:${o}:${tense}`;
  const explain = `${fvgPhrase(f)} ≈ ${f.mean}.`;
  const r = c.rand();
  if (r < 0.35) {
    // which light verb?
    const wrongVerbs = Object.keys(LIGHT_VERBS).filter((v) => v !== f.lv && !(f.no ?? []).includes(v));
    const form = (v: string) => (tense === 'pres' ? lvForm(v, tense, pi).fin : lvForm(v, tense, pi).end);
    const right = tense === 'pres' ? fin : end;
    const prompt = tense === 'pres' ? `${S} ___ ${mid}.` : `${S} ${fin} ${mid} ___.`;
    const wrong = others(c, wrongVerbs.map(form), [right]);
    if (tense === 'perf') {
      // the auxiliary is already given, so only verbs with the same auxiliary are fair distractors
      const sameAux = wrongVerbs.filter((v) => LIGHT_VERBS[v].aux === LIGHT_VERBS[f.lv].aux).map(form);
      return choice(`${id}:v`, prompt, right, others(c, sameAux, [right]), explain, 'fvg', c.rand);
    }
    return choice(`${id}:v`, prompt, right, wrong, explain, 'fvg', c.rand);
  }
  const gapped = `${S} ${fin} ${mid.replace(key, '___')}${end ? ` ${end}` : ''}.`;
  if (r < 0.55) return fill(`${id}:n`, gapped, [key], explain, 'fvg', `= ${f.mean}`);
  if (r < 0.72) {
    const otherKeys = FVG_FRAMES.filter((x) => x.lv !== f.lv).map(fvgKey);
    return choice(`${id}:nc`, gapped, key, others(c, otherKeys, [key]), explain, 'fvg', c.rand);
  }
  if (r < 0.86 && tense !== 'modal') {
    const wrongLv = c.pick(['machen', 'geben', ...Object.keys(LIGHT_VERBS)].filter((v) => v !== f.lv && !(f.no ?? []).includes(v) && LIGHT_VERBS[v].aux === LIGHT_VERBS[f.lv].aux));
    const w = lvForm(wrongLv, tense, pi);
    return correct(`${id}:x:${wrongLv}`, `${S} ${w.fin} ${mid}${w.end ? ` ${w.end}` : ''}.`, [sentence], `The noun decides the verb: ${fvgPhrase(f)}.`, 'fvg');
  }
  const phrase = fvgPhrase(f);
  const means = FVG_FRAMES.filter((x) => x.mean !== f.mean).map((x) => x.mean);
  return choice(`drill:fvg-x:${f.tpl}:mean`, `Was bedeutet „${phrase}“?`, f.mean, others(c, means, [f.mean]), explain, 'fvg', c.rand);
}

// ── Genitive ─────────────────────────────────────────────────────────────────

type Art = 'def' | 'indef' | 'none';

function genPhrase(g: G4, n: string, genForms: string[], art: Art, adj: string): { nom: string; gen: string[]; wrong: string[] } {
  const A = (end: string) => (adj ? `${adj}${end} ` : '');
  if (art === 'def') {
    const nom = `${DEF.nom[g]} ${A(g === 'pl' ? 'en' : 'e')}${n}`;
    const gen = genForms.map((f) => `${DEF.gen[g]} ${A('en')}${f}`);
    const wrong = [nom, `${DEF.dat[g]} ${A('en')}${g === 'pl' ? dativePlural(n) : n}`, `${DEF.acc[g]} ${A(g === 'm' || g === 'pl' ? 'en' : 'e')}${n}`];
    if (g === 'm' || g === 'n') wrong.push(`${DEF.gen[g]} ${A('en')}${n}`, `der ${A('en')}${genForms[0]}`);
    else wrong.push(`des ${A('en')}${n}`, `${DEF.gen[g]} ${A('e')}${n}`);
    return { nom, gen, wrong };
  }
  if (art === 'indef') {
    const nom = g === 'm' ? `ein ${A('er')}${n}` : g === 'f' ? `eine ${A('e')}${n}` : `ein ${A('es')}${n}`;
    if (g === 'f') return { nom, gen: [`einer ${A('en')}${n}`], wrong: [nom, `eines ${A('en')}${n}`, `einer ${A('e')}${n}`, `einer ${A('er')}${n}`] };
    return { nom, gen: genForms.map((f) => `eines ${A('en')}${f}`), wrong: [nom, `einem ${A('en')}${n}`, `eines ${A('en')}${n}`, `eines ${A('es')}${genForms[0]}`] };
  }
  // no article: the adjective carries the case (strong ending)
  const nom = `${adj}${g === 'm' ? 'er' : g === 'n' ? 'es' : 'e'} ${n}`;
  if (g === 'f' || g === 'pl') return { nom, gen: [`${adj}er ${n}`], wrong: [nom, `${adj}en ${n}`, `${adj}em ${n}`] };
  return { nom, gen: genForms.map((f) => `${adj}en ${f}`), wrong: [nom, `${adj}es ${genForms[0]}`, `${adj}em ${n}`, `${adj}en ${n}`] };
}

const GEN_RULE: Record<Art, string> = {
  def: 'Genitive: des (masculine/neuter, noun + -(e)s) or der (feminine/plural); an adjective after the article ends in -en.',
  indef: 'Genitive: eines (masculine/neuter, noun + -(e)s) or einer (feminine); the adjective ends in -en.',
  none: 'Without an article the adjective shows the case: -er for feminine and plural, -en for masculine and neuter (the noun takes -(e)s).',
};

function genitive(c: Ctx): Exercise {
  if (c.chance(0.2)) return fromBank('gen-verbs', BANK.GENITIVE_VERBS, 'case.gen', c, true);
  const si = idx(c, GEN_SCENES.length);
  const sc = GEN_SCENES[si];
  const [g, n, genForms, adjs] = c.pick(sc.nps);
  const adj = adjs.length && (c.chance(0.75) || sc.arts.length > 1) ? c.pick(adjs) : '';
  let art = c.pick(sc.arts);
  if (art === 'indef' && g === 'pl') art = 'none';
  if (art === 'none' && !adj) art = 'def';
  const lead = c.pick(sc.leads);
  const { nom, gen, wrong } = genPhrase(g, n, genForms, art, adj);
  const prompt = `${lead} ___${sc.rest === '.' ? '' : ' '}${sc.rest}`;
  const leadWord = lead.split(' ').slice(-1)[0];
  const explain = `${/^[A-ZÄÖÜ][a-zäöüß]+$/.test(lead) ? `${lead} + genitive. ` : ''}${GEN_RULE[art]} → ${gen[0]}.`;
  const id = `drill:gen-x:${si}:${lead}:${n}:${art}:${adj}`;
  if (c.chance(0.55)) return fill(`${id}:f`, prompt, gen, explain, 'case.gen', nom);
  return choice(`${id}:c:${leadWord}`, prompt.replace('___', `___ (${nom})`), gen[0], wrong, explain, 'case.gen', c.rand, gen);
}

// ── Modal particles ─────────────────────────────────────────────────────────

function particles(c: Ctx, level: 'b2' | 'c1' | 'c2'): Exercise {
  if (c.chance(0.25)) {
    const bank = level === 'b2' ? BANK.PARTICLES_B2 : level === 'c1' ? BANK.PARTICLES_C1 : BANK.PARTICLES_C2;
    return fromBank(`part-${level}`, bank, 'modal-particle', c, false);
  }
  const list = PARTICLE_TEMPLATES[level];
  const ti = idx(c, list.length);
  const [context, sentences, answers, wrong, explain] = list[ti];
  const si = idx(c, sentences.length);
  const prompt = `(${context}) ${sentences[si]}`;
  const id = `drill:part-x:${level}:${ti}:${si}`;
  if (c.chance(0.3)) return fill(`${id}:f`, prompt, answers, explain, 'modal-particle');
  return choice(`${id}:c`, prompt, c.pick(answers), wrong, explain, 'modal-particle', c.rand, answers);
}

// ── Idioms ──────────────────────────────────────────────────────────────────

/** idiom, key word, meaning — the list plus the idioms explained in the hand-written pool */
function idiomGlossary(): [string, string, string][] {
  const out = [...IDIOM_LIST];
  const seen = new Set(out.map(([i]) => i.toLowerCase()));
  for (const [, ans, , explain] of BANK.IDIOMS) {
    const m = explain.match(/^(.+?) = (.+?)\.?$/);
    if (!m || seen.has(m[1].toLowerCase())) continue;
    seen.add(m[1].toLowerCase());
    out.push([m[1], Array.isArray(ans) ? ans[0] : ans, m[2]]);
  }
  return out;
}
let glossary: [string, string, string][] | null = null;

function idioms(c: Ctx): Exercise {
  if (c.chance(0.25)) return fromBank('idioms', BANK.IDIOMS, 'lexis.idiom', c, true);
  glossary ??= idiomGlossary();
  const gi = idx(c, glossary.length);
  const [idiom, key, meaning] = glossary[gi];
  const explain = `${idiom} = ${meaning}.`;
  const r = c.rand();
  const keyRe = new RegExp(`(^|\\s)${key}(?=\\s|$)`);
  if (r < 0.35 && keyRe.test(idiom)) {
    const prompt = `${idiom.replace(keyRe, '$1___')} (= ${meaning})`;
    if (c.chance(0.5)) return fill(`drill:idiom-x:${gi}:k`, prompt, [key], explain, 'lexis.idiom');
    return choice(`drill:idiom-x:${gi}:kc`, prompt, key, others(c, glossary.map((x) => x[1]), [key]), explain, 'lexis.idiom', c.rand);
  }
  if (r < 0.7) return choice(`drill:idiom-x:${gi}:m`, `What does „${idiom}“ mean?`, meaning, others(c, glossary.map((x) => x[2]), [meaning]), explain, 'lexis.idiom', c.rand);
  return choice(`drill:idiom-x:${gi}:i`, `Which expression means “${meaning}”?`, idiom, others(c, glossary.filter((x) => x[2] !== meaning).map((x) => x[0]), [idiom]), explain, 'lexis.idiom', c.rand);
}

// ── Register ────────────────────────────────────────────────────────────────

function register(c: Ctx): Exercise {
  if (c.chance(0.25)) return fromBank('register', BANK.REGISTER, 'lexis.register', c, false);
  const formal = c.chance(0.45);
  const list = formal ? FORMAL : COLLOQUIAL;
  const i = idx(c, list.length);
  const [low, high] = list[i];
  const label = formal ? ['neutral', 'formal'] : ['colloquial', 'neutral'];
  const de = formal ? ['neutral', 'formell'] : ['umgangssprachlich', 'neutral'];
  const explain = `„${low}“ (${label[0]}) ↔ „${high}“ (${label[1]}).`;
  const id = `drill:register-x:${formal ? 'f' : 'c'}:${i}`;
  if (c.chance(0.5)) {
    const wrong = list.filter(([l, h]) => h !== high && l !== low).map(([, h]) => h);
    return choice(`${id}:up`, `Welches Wort ist ${de[1]} für „${low}“?`, high, others(c, wrong, [high]), explain, 'lexis.register', c.rand);
  }
  const wrong = list.filter(([l, h]) => h !== high && l !== low).map(([l]) => l);
  return choice(`${id}:down`, `Welches Wort ist ${de[0]} für „${high}“?`, low, others(c, wrong, [low]), explain, 'lexis.register', c.rand);
}

// ── Word formation ──────────────────────────────────────────────────────────

function verbStem(v: string): string {
  if (/eln$/.test(v)) return `${v.slice(0, -3)}l`;
  if (/ern$/.test(v)) return v.slice(0, -1);
  return v.slice(0, -2);
}

function wordFormation(c: Ctx): Exercise {
  const r = c.rand();
  if (r < 0.2) return fromBank('wordform', BANK.WORD_FORMATION, 'lexis.word-formation', c, true);
  if (r < 0.5) {
    const i = idx(c, ADJ_NOUNS.length);
    const [adj, noun] = ADJ_NOUNS[i];
    const stem = cap(adj.replace(/e$/, ''));
    const suffix = noun.slice(stem.length);
    const explain = /igkeit$/.test(noun) ? `${adj} → die ${noun} (-igkeit, typical after -los, -haft and some short adjectives).` : /keit$/.test(noun) ? `${adj} → die ${noun} (-keit after -lich, -ig, -bar, -sam, -er, -el).` : `${adj} → die ${noun} (-heit with most short adjectives and participles).`;
    if (c.chance(0.4)) return fill(`drill:wordform-x:a:${i}`, `${adj} → die ___`, [noun], explain, 'lexis.word-formation', '-heit, -keit or -igkeit');
    const wrong = ['heit', 'keit', 'igkeit'].filter((s) => s !== suffix).map((s) => `${stem}${s}`);
    return choice(`drill:wordform-x:a:${i}:c`, `${adj} → die ___`, noun, wrong, explain, 'lexis.word-formation', c.rand);
  }
  if (r < 0.75) {
    const i = idx(c, VERB_NOUNS.length);
    const [verb, withArt] = VERB_NOUNS[i];
    const noun = withArt.split(' ')[1];
    const stem = cap(verbStem(verb));
    const wrong = ['ung', 'heit', 'tum'].map((s) => `${stem}${s}`);
    const explain = `${verb} → ${withArt}${noun.endsWith('ung') ? ' (nouns in -ung are feminine)' : ' (no -ung here: the noun is formed from the stem)'}.`;
    return choice(`drill:wordform-x:v:${i}`, `Which noun belongs to „${verb}“?`, noun, wrong, explain, 'lexis.word-formation', c.rand);
  }
  const i = idx(c, BAR_ADJECTIVES.length);
  const [objs, verb, bar] = BAR_ADJECTIVES[i];
  const o = c.pick(objs);
  const subj = cap(o.replace(/^den /, 'der '));
  return fill(`drill:wordform-x:b:${i}:${o}`, `Man kann ${o} ${verb}. = ${subj} ist ___.`, [bar], `verb stem + -bar = can be done: ${bar}.`, 'lexis.word-formation');
}

// ── B2 connectors ───────────────────────────────────────────────────────────

function connectorB2(c: Ctx): Exercise {
  const r = c.rand();
  if (r < 0.2) return fromBank('conn-b2', BANK.CONNECTORS_B2, 'connector', c, false);
  if (r < 0.6) {
    const i = idx(c, JE_DESTO.length);
    const [[c1, s1, v1], [c2, v2, r2], src1, src2] = JE_DESTO[i];
    const je = `Je ${c1} ${s1} ${v1}`;
    const answers = ['desto', 'umso'].map((d) => `${je}, ${d} ${c2} ${v2} ${r2}.`);
    const explain = 'je + comparative … verb at the end, desto/umso + comparative + verb straight after.';
    const q = c.rand();
    if (q < 0.25) return fill(`drill:je-desto:${i}:f`, `${je}, ___ ${c2} ${v2} ${r2}.`, ['desto', 'umso'], explain, 'connector');
    if (q < 0.5) return correct(`drill:je-desto:${i}:x`, `${je}, desto ${c2} ${r2} ${v2}.`, [answers[0], answers[1]], explain, 'connector');
    if (q < 0.7) return order(`drill:je-desto:${i}:o`, ['Je', c1, s1, `${v1},`, 'desto', c2, v2, r2], explain, 'connector', [answers[1].replace(/\.$/, '')]);
    return transform(`drill:je-desto:${i}:t`, 'Connect with je … desto.', `${src1} ${src2}`, answers, explain, 'connector', [
      [`desto ${c2} ${r2}`, `After desto + comparative the verb comes next: desto ${c2} ${v2} …`],
      [`je ${c1} ${v1}`, `After je + comparative the verb goes to the end: je ${c1} ${s1} ${v1}.`],
    ]);
  }
  const means = c.chance(0.55);
  const list = means ? INDEM : SODASS;
  const i = idx(c, list.length);
  const [main, vf, asMain] = list[i];
  const conj = means ? 'indem' : 'sodass';
  const explain = means ? 'indem = by (doing): it names the means; verb at the end.' : 'sodass = so that (result); verb at the end.';
  if (c.chance(0.55)) return choice(`drill:conn-b2-x:${conj}:${i}:c`, `${main}, ___ ${vf}.`, conj, ['indem', 'sodass', 'damit', 'ohne dass', 'statt dass'], explain, 'connector', c.rand);
  const answers = means ? [`${main}, indem ${vf}.`] : [`${main}, sodass ${vf}.`, `${main}, so dass ${vf}.`];
  return transform(`drill:conn-b2-x:${conj}:${i}:t`, `Connect with ${conj}.`, `${main}. ${asMain}`, answers, explain, 'connector', [[`${conj} ${asMain.split(' ')[0].toLowerCase()} ${asMain.split(' ')[1]}`, `After ${conj} the verb goes to the end: ${conj} ${vf}.`]]);
}

// ── Participle clauses ──────────────────────────────────────────────────────

function participleClause(c: Ctx): Exercise {
  if (c.chance(0.25)) return fromBank('part-clause', BANK.PARTICIPLE_CLAUSES, 'participle-attr', c, true);
  const i = idx(c, PARTICIPLE_PHRASES.length);
  const [phrase, part, wrong, explain, mains] = PARTICIPLE_PHRASES[i];
  const mi = idx(c, mains.length);
  const prompt = `${phrase}, ${mains[mi]}.`;
  if (c.chance(0.4)) return fill(`drill:part-clause-x:${i}:${mi}:f`, prompt, [part], explain, 'participle-attr', wrong[2]);
  return choice(`drill:part-clause-x:${i}:${mi}:c`, prompt, part, wrong, explain, 'participle-attr', c.rand);
}

/** Generators that replace the pool-only drills of these kinds. */
export const COMBO_GEN = {
  rektion,
  'fvg-c1': (c: Ctx) => fvg(c, 'c1'),
  'fvg-c2': (c: Ctx) => fvg(c, 'c2'),
  'genitive-verbs': genitive,
  'particles-b2': (c: Ctx) => particles(c, 'b2'),
  'particles-c1': (c: Ctx) => particles(c, 'c1'),
  'particles-c2': (c: Ctx) => particles(c, 'c2'),
  idioms,
  register,
  'word-formation': wordFormation,
  'connector-b2': connectorB2,
  'participle-clause': participleClause,
} satisfies Record<string, (c: Ctx) => Exercise>;
