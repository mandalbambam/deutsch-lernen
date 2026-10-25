/**
 * Generated drills for the B1–C2 lessons. Verb-based drills draw on the full verb tables from the
 * dictionary data; structure drills combine sentence templates with word lists (content/grammar/drill-bank.ts);
 * lexical drills draw items from hand-written pools (content/grammar/drill-items.ts) as gap-fills or multiple choice.
 */
import {
  ALS_WENN,
  ASSUMPTION_PREDICATES,
  CLAUSE_PAIRS,
  CONTRAST_PAIRS,
  HEARSAY_PREDICATES,
  HEARSAY_SUBJECTS,
  INDIRECT_INTROS,
  INDIRECT_QUESTIONS,
  IRREAL_PREDICATES,
  LASSEN_ITEMS,
  MIDFIELD_PERSONS,
  MIDFIELD_THINGS,
  MIDFIELD_VERBS,
  NOMINAL,
  PARTICIPLE_I,
  PASSIVE_ALT,
  PASSIVE_ITEMS,
  REL_FRAMES,
  REL_NOUNS,
  VERB_PREPS,
  WAS_ANTECEDENTS,
  WAS_CLAUSES,
  ZU_FRAMES,
  ZU_PHRASES,
  type G4,
} from '@/content/grammar/drill-bank';
import * as BANK from '@/content/grammar/drill-items';
import type { VerbTable } from '@/lib/data/types';
import { ADJ_ENDINGS, DEF, dativePlural, type DrillPools } from './drills';
import { COMBO_GEN } from './drills-combo';
import { cap, choice, correct, fill, fromBank, lc, order, transform, uniq, type Case, type Ctx } from './drill-helpers';
import type { AdvancedDrillKind, Exercise } from './types';



// ich, du, er/sie/es, wir, ihr, sie/Sie
const HATTE = ['hatte', 'hattest', 'hatte', 'hatten', 'hattet', 'hatten'];
const WAR = ['war', 'warst', 'war', 'waren', 'wart', 'waren'];
const HAETTE = ['hätte', 'hättest', 'hätte', 'hätten', 'hättet', 'hätten'];
const WAERE = ['wäre', 'wärst', 'wäre', 'wären', 'wärt', 'wären'];
const WAERE_ALT = ['wäre', 'wärest', 'wäre', 'wären', 'wäret', 'wären'];
const WERDE = ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'];
const WUERDE = ['würde', 'würdest', 'würde', 'würden', 'würdet', 'würden'];
const WUESSTE = ['wüsste', 'wüsstest', 'wüsste', 'wüssten', 'wüsstet', 'wüssten'];
const HABEN = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
const LASSEN = ['lasse', 'lässt', 'lässt', 'lassen', 'lasst', 'lassen'];
const TUN = ['tue', 'tust', 'tut', 'tun', 'tut', 'tun'];
const PERSONS: { s: string; i: number }[] = [
  { s: 'ich', i: 0 },
  { s: 'du', i: 1 },
  { s: 'er', i: 2 },
  { s: 'sie', i: 2 },
  { s: 'wir', i: 3 },
  { s: 'ihr', i: 4 },
];
const CASE_NAME: Record<Case, string> = { nom: 'nominative', acc: 'accusative', dat: 'dative', gen: 'genitive' };
const GENDER_NAME: Record<G4, string> = { m: 'masculine', f: 'feminine', n: 'neuter', pl: 'plural' };
const REL: Record<Case, Record<G4, string>> = {
  nom: { m: 'der', f: 'die', n: 'das', pl: 'die' },
  acc: { m: 'den', f: 'die', n: 'das', pl: 'die' },
  dat: { m: 'dem', f: 'der', n: 'dem', pl: 'denen' },
  gen: { m: 'dessen', f: 'deren', n: 'dessen', pl: 'deren' },
};
const PREPS = ['auf', 'an', 'über', 'für', 'um', 'von', 'mit', 'nach', 'vor', 'zu', 'unter', 'in', 'bei'];
const MODALS = new Set(['können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen', 'möchten']);
const IMPERSONAL = new Set(['regnen', 'schneien', 'geschehen', 'passieren', 'gelingen', 'misslingen', 'stattfinden', 'gefallen', 'gehören', 'kosten', 'dauern', 'klappen']);
/** zu-infinitives of separable verbs that are not recognisable from the data lists */
const ZU_INF: Record<string, string> = { umsetzen: 'umzusetzen', vorhersagen: 'vorherzusagen' };

const auxes = (t: VerbTable): ('h' | 's')[] => (t.aux === 'hs' ? ['h', 's'] : [t.aux]);
const auxWord = (a: 'h' | 's') => (a === 'h' ? 'haben' : 'sein');
const auxNote = (t: VerbTable) => (t.aux === 'hs' ? 'haben or sein (depending on the meaning)' : t.aux === 's' ? 'sein' : 'haben');


function zuInf(v: string, sep?: string): string {
  if (ZU_INF[v]) return ZU_INF[v];
  return sep ? `${sep}zu${v.slice(sep.length)}` : `zu ${v}`;
}

function nounIn(n: string, g: G4, c: Case, obl?: string): string {
  if (g === 'pl') return c === 'dat' ? dativePlural(n) : n;
  if (c === 'nom') return n;
  if (obl) return obl;
  if (c === 'gen' && g !== 'f') return /[sßxz]$/.test(n) ? `${n}es` : `${n}s`;
  return n;
}
const np = (g: G4, n: string, c: Case = 'nom', obl?: string) => `${DEF[c][g]} ${nounIn(n, g, c, obl)}`;


// ---------------------------------------------------------------- verb-table drills

function pluperfect(c: Ctx): Exercise {
  const t = c.pick(c.verbs);
  const p = c.pick(PERSONS);
  const forms = auxes(t).map((a) => (a === 'h' ? HATTE : WAR)[p.i]);
  const explain = `${t.inf} forms its perfect tenses with ${auxNote(t)} → ${p.s} ${forms[0]} … ${t.pp}. Plusquamperfekt = hatte/war + participle.`;
  if (c.chance(0.5)) {
    return fill(`drill:pluperfect:${t.inf}:${p.s}:nachdem`, `Nachdem ${p.s} ___, … (${t.inf})`, forms.map((f) => `${t.pp} ${f}`), `${explain} In a nachdem clause the conjugated verb goes to the end: ${t.pp} ${forms[0]}.`, 'verb.tense');
  }
  return fill(`drill:pluperfect:${t.inf}:${p.s}`, `${cap(p.s)} (${t.inf}) → Plusquamperfekt: ___`, forms.flatMap((f) => [`${f} ${t.pp}`, `${p.s} ${f} ${t.pp}`]), explain, 'verb.tense');
}

function future(c: Ctx): Exercise {
  const t = c.pick(c.verbs);
  const p = c.pick(PERSONS);
  const w = WERDE[p.i];
  if (c.chance(0.4)) {
    return fill(`drill:future:${t.inf}:${p.s}:weil`, `…, weil ${p.s} morgen ___ (${t.inf}, Futur I)`, [`${t.inf} ${w}`], `Futur I = werden + infinitive. In a weil clause the conjugated verb (${w}) goes to the very end: ${t.inf} ${w}.`, 'verb.tense');
  }
  return fill(`drill:future:${t.inf}:${p.s}`, `${cap(p.s)} (${t.inf}) → Futur I: ___`, [`${w} ${t.inf}`, `${p.s} ${w} ${t.inf}`], `Futur I = werden + infinitive: ${p.s} ${w} … ${t.inf}.`, 'verb.tense');
}

function konj2Past(c: Ctx): Exercise {
  const t = c.pick(c.verbs);
  const p = c.pick(PERSONS);
  const forms = auxes(t).flatMap((a) => (a === 'h' ? [HAETTE[p.i]] : uniq([WAERE[p.i], WAERE_ALT[p.i]])));
  const explain = `Konjunktiv II of the past = hätte/wäre + participle. ${t.inf} takes ${auxNote(t)} → ${p.s} ${forms[0]} … ${t.pp}.`;
  const r = c.rand();
  if (r < 0.35) return fill(`drill:konj2-past:${t.inf}:${p.s}`, `${cap(p.s)} (${t.inf}) → Konjunktiv II der Vergangenheit: ___`, forms.flatMap((f) => [`${f} ${t.pp}`, `${p.s} ${f} ${t.pp}`]), explain, 'mood.konj2');
  if (r < 0.7) return fill(`drill:konj2-past:${t.inf}:${p.s}:wenn`, `Wenn ${p.s} ___, … (${t.inf}, Konjunktiv II der Vergangenheit)`, forms.map((f) => `${t.pp} ${f}`), `${explain} In the wenn clause the conjugated verb goes to the end.`, 'mood.konj2');
  return fill(
    `drill:konj2-past:${t.inf}:${p.s}:sollen`,
    `${cap(p.s)} ___ früher ${t.inf} sollen. (Vorwurf)`,
    [HAETTE[p.i]],
    `A reproach about the past: hätte + infinitive + sollen (double infinitive). Modal verbs always take haben: ${p.s} ${HAETTE[p.i]} … sollen.`,
    'mood.konj2',
    undefined,
    { [WAERE[p.i]]: 'Modal verbs form the perfect with haben: hätte … sollen.', [HATTE[p.i]]: 'A reproach needs Konjunktiv II: hätte (with umlaut).' },
  );
}

function doubleInfinitive(c: Ctx): Exercise {
  const t = c.pick(c.verbs);
  const p = c.pick(PERSONS);
  const m = c.pick(['müssen', 'können', 'wollen', 'dürfen', 'sollen']);
  const h = HABEN[p.i];
  const explain = `With another infinitive, a modal verb in the Perfekt uses its infinitive instead of the participle (double infinitive): ${h} … ${t.inf} ${m}. Modal verbs always take haben.`;
  const r = c.rand();
  if (r < 0.4) return fill(`drill:double-inf:${t.inf}:${m}:${p.s}`, `${cap(p.s)} (${t.inf}, ${m}) → Perfekt: ___`, [`${h} ${t.inf} ${m}`, `${p.s} ${h} ${t.inf} ${m}`], explain, 'double-infinitive');
  if (r < 0.75) {
    return fill(`drill:double-inf:${t.inf}:${m}:${p.s}:weil`, `…, weil ${p.s} ___ (${t.inf}, ${m}, Perfekt)`, [`${h} ${t.inf} ${m}`], `${explain} In a subordinate clause the auxiliary goes before the double infinitive: ${h} ${t.inf} ${m}.`, 'double-infinitive');
  }
  return fill(`drill:double-inf:${t.inf}:${p.s}:k2`, `${cap(p.s)} ___ (${t.inf}, sollen, Konjunktiv II der Vergangenheit)`, [`${HAETTE[p.i]} ${t.inf} sollen`], `Reproach: hätte + infinitive + sollen → ${p.s} ${HAETTE[p.i]} ${t.inf} sollen.`, 'double-infinitive');
}

function subjectiveModal(c: Ctx): Exercise {
  const r = c.rand();
  if (r < 0.4) {
    const t = c.pick(c.verbs);
    const s = c.pick(['Er', 'Sie']);
    const m = c.pick(['muss', 'dürfte', 'könnte']);
    return fill(
      `drill:subj-modal:${t.inf}:${m}`,
      `${s} ${m} … ___ (${t.inf} – Vermutung über die Vergangenheit)`,
      auxes(t).map((a) => `${t.pp} ${auxWord(a)}`),
      `An assumption about the past: modal + Infinitiv Perfekt (participle + haben/sein). ${t.inf} takes ${auxNote(t)}.`,
      'modal.subjective',
    );
  }
  if (r < 0.75) {
    const cues: [string, string, string][] = [
      ['Ich bin fast sicher.', 'muss', 'müssen = near certainty'],
      ['Wahrscheinlich.', 'dürfte', 'dürfte = probably'],
      ['Vielleicht.', 'könnte', 'könnte = possibly'],
      ['Das halte ich für ausgeschlossen.', 'kann unmöglich', 'kann unmöglich / kann nicht = impossible'],
    ];
    const [cue, ans, why] = c.pick(cues);
    const pred = c.pick(ASSUMPTION_PREDICATES);
    return choice(`drill:subj-modal:${pred}:${ans}`, `(${cue}) Sie ___ ${pred}.`, ans, cues.map((x) => x[1]), `${cap(why)}.`, 'modal.subjective', c.rand);
  }
  const t = c.pick(c.verbs);
  const p = c.pick(PERSONS);
  return fill(
    `drill:subj-modal:${t.inf}:${p.s}:f2`,
    `${cap(p.s)} (${t.inf}) → Futur II: ___`,
    auxes(t).flatMap((a) => [`${WERDE[p.i]} ${t.pp} ${auxWord(a)}`, `${p.s} ${WERDE[p.i]} ${t.pp} ${auxWord(a)}`]),
    `Futur II = werden + participle + haben/sein (an action completed in the future, or an assumption about the past). ${t.inf} takes ${auxNote(t)}.`,
    'verb.tense',
  );
}

function konj1Form(t: VerbTable, i: number): { answers: string[]; explain: string } {
  if (t.k1[i] && t.k1[i] !== t.pres[i]) return { answers: [t.k1[i]], explain: `Konjunktiv I: ${t.k1[i]}.` };
  const wuerde = `${WUERDE[i]} ${t.inf}`;
  if (t.k2[i] && t.k2[i] !== t.prt[i]) {
    return { answers: [t.k2[i], wuerde], explain: `The Konjunktiv I (${t.k1[i] || t.pres[i]}) looks like the indicative, so the Konjunktiv II is used instead: ${t.k2[i]} (or ${wuerde}).` };
  }
  return { answers: [wuerde], explain: `Both Konjunktiv I and II look like indicative forms here, so würde + infinitive is used: ${wuerde}.` };
}

function konj1Report(c: Ctx): Exercise | null {
  const t = c.pick(c.verbs.filter((v) => !v.sep && v.k1?.length === 6 && v.k2?.length === 6));
  if (!t) return null;
  const who = c.pick([
    { lead: 'Er sagte, er', i: 2 },
    { lead: 'Sie sagte, sie', i: 2 },
    { lead: 'Sie sagten, sie', i: 5 },
    { lead: 'Ich sagte, ich', i: 0 },
  ]);
  if (c.chance(0.3)) {
    // past in reported speech: habe/sei (+ replacements) + participle
    const a = auxes(t)[0];
    const auxTable: VerbTable = a === 'h'
      ? { inf: 'haben', pres: HABEN, k1: ['habe', 'habest', 'habe', 'haben', 'habet', 'haben'], k2: HAETTE, prt: HATTE, imp: [], pp: 'gehabt', aux: 'h' }
      : { inf: 'sein', pres: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'], k1: ['sei', 'seiest', 'sei', 'seien', 'seiet', 'seien'], k2: WAERE, prt: WAR, imp: [], pp: 'gewesen', aux: 's' };
    const f = konj1Form(auxTable, who.i);
    const answers = f.answers.filter((x) => !x.includes(' ')).map((x) => `${x} ${t.pp}`);
    return fill(`drill:konj1:${t.inf}:${who.i}:past`, `${who.lead} ___ … (${t.inf}, Vergangenheit, indirekte Rede)`, answers, `Past in reported speech: auxiliary in the Konjunktiv + participle. ${t.inf} takes ${auxWord(a)} → ${answers[0]}${who.i === 2 ? '' : ' (the Konjunktiv I form would look like the indicative, so the Konjunktiv II is used)'}.`, 'mood.konj1');
  }
  const f = konj1Form(t, who.i);
  return fill(`drill:konj1:${t.inf}:${who.i}`, `${who.lead} ___ … (${t.inf}, indirekte Rede)`, f.answers, `${t.inf} in reported speech. ${f.explain}`, 'mood.konj1');
}

// ---------------------------------------------------------------- structure drills

function relative(c: Ctx): Exercise {
  const n = c.pick(REL_NOUNS);
  const frames = REL_FRAMES.filter((f) => f.k === 'b' || f.k === n.k);
  const f = c.pick(frames);
  const plural = c.chance(0.3);
  const g: G4 = plural ? 'pl' : n.g;
  const word = plural ? n.pl : n.w;
  const clause = plural && f.pl ? f.pl : f.sg;
  const prompt = `${plural ? 'Das sind' : 'Das ist'} ${DEF.nom[g]} ${word}, ${clause}.`;
  const ans = REL[f.c][g];
  const explain = `${DEF.nom[g]} ${word} is ${GENDER_NAME[g]}; ${f.why} → ${CASE_NAME[f.c]}: ${ans}.`;
  const id = `drill:relative:${word}:${f.sg}`;
  if (c.chance(0.5)) return fill(id, prompt, [ans], explain, 'relative', undefined, ans === 'das' ? { dass: 'The relative pronoun das is spelt with one s.' } : undefined);
  return choice(`${id}:c`, prompt, ans, ['der', 'die', 'das', 'den', 'dem', 'denen', 'dessen', 'deren'], explain, 'relative', c.rand);
}

function relativeWas(c: Ctx): Exercise {
  const r = c.rand();
  if (r < 0.5) {
    const [ant, why] = c.pick(WAS_ANTECEDENTS);
    const cl = c.pick(WAS_CLAUSES);
    const prompt = `${ant} ${cl}.`;
    if (c.chance(0.5)) return fill(`drill:rel-was:${ant}:${cl}`, prompt, ['was'], why, 'relative', undefined, { das: why, dass: 'dass is a conjunction; here you need the relative pronoun was.' });
    return choice(`drill:rel-was:${ant}:${cl}:c`, prompt, 'was', ['das', 'dass', 'welches', 'wo'], why, 'relative', c.rand);
  }
  if (r < 0.75) {
    const n = c.pick(REL_NOUNS.filter((x) => x.k === 't'));
    const cl = c.pick(['___ mich interessiert', '___ mir Sorgen macht']);
    const ans = REL.nom[n.g];
    return choice(`drill:rel-was:${n.w}:${cl}`, `Das ist ${DEF.nom[n.g]} ${n.w}, ${cl}.`, ans, ['was', 'der', 'die', 'das', 'wo'], `After a concrete noun use der/die/das, not was. ${n.w} is ${GENDER_NAME[n.g]} and the subject of the clause → ${ans}.`, 'relative', c.rand);
  }
  const items: [string, string, string][] = [
    ['___ zu spät kommt, muss draußen warten.', 'Wer', 'For an unspecified person who is the subject: wer.'],
    ['___ das nicht versteht, soll fragen.', 'Wer', 'For an unspecified person who is the subject: wer.'],
    ['___ das nicht gefällt, der kann gehen.', 'Wem', 'gefallen takes the dative: wem … , der …'],
    ['___ man vertraut, dem hilft man gern.', 'Wem', 'vertrauen takes the dative: wem.'],
    ['___ man liebt, den vermisst man.', 'Wen', 'lieben takes the accusative: wen.'],
    ['___ rastet, der rostet.', 'Wer', 'Proverb: wer = whoever (subject).'],
    ['___ A sagt, muss auch B sagen.', 'Wer', 'Proverb: wer = whoever (subject).'],
    ['___ man nicht kennt, dem glaubt man nicht.', 'Wen', 'kennen takes the accusative: wen.'],
  ];
  const idx = Math.floor(c.rand() * items.length);
  const [p, a, e] = items[idx];
  return choice(`drill:rel-was:wer:${idx}`, p, a, ['Wer', 'Wen', 'Wem', 'Was', 'Der'], e, 'relative', c.rand);
}

function passiveParts(it: (typeof PASSIVE_ITEMS)[number]) {
  const pl = it.g === 'pl';
  return { pl, nom: np(it.g, it.n), acc: np(it.g, it.n, 'acc', it.obl) };
}

function passive(c: Ctx): Exercise {
  const it = c.pick(PASSIVE_ITEMS);
  const { pl, nom, acc } = passiveParts(it);
  const present = c.chance(0.5);
  const adv = present ? c.pick(['heute', 'gerade', 'jetzt']) : c.pick(['gestern', 'letzte Woche', 'vor einer Stunde']);
  const aux = present ? (pl ? 'werden' : 'wird') : pl ? 'wurden' : 'wurde';
  const explain = `Passive = werden + participle. ${cap(nom)} is ${pl ? 'plural' : 'singular'}, ${present ? 'present' : 'past'} → ${aux} … ${it.pp}.`;
  if (c.chance(0.5)) {
    const prompt = `${cap(nom)} ___ ${adv} ${it.pp}.`;
    if (c.chance(0.5)) return fill(`drill:passive:${it.n}:${adv}`, prompt, [aux], explain, 'voice.passive', undefined, { ist: 'The process passive uses werden, not sein.', sind: 'The process passive uses werden, not sein.', hat: 'The passive is formed with werden.' });
    return choice(`drill:passive:${it.n}:${adv}:c`, prompt, aux, ['wird', 'werden', 'wurde', 'wurden', pl ? 'sind' : 'ist', pl ? 'haben' : 'hat'], explain, 'voice.passive', c.rand);
  }
  const verb = present ? it.pres : it.past;
  const source = `Man ${verb} ${acc} ${adv}${it.sep ? ` ${it.sep}` : ''}.`;
  return transform(
    `drill:passive:${it.n}:${adv}:t`,
    `Rewrite in the passive (${present ? 'present' : 'Präteritum'}), without „man“.`,
    source,
    [`${cap(nom)} ${aux} ${adv} ${it.pp}.`, `${cap(adv)} ${aux} ${nom} ${it.pp}.`],
    `The object becomes the subject (${nom}); man disappears. ${explain}`,
    'voice.passive',
    [['\\bman\\b', 'man disappears in the passive.'], [present ? '\\bwurden?\\b' : '\\bwird\\b|\\bwerden\\b', present ? 'Keep the present tense: wird/werden.' : 'Keep the past: wurde/wurden.']],
  );
}

function passiveAdvanced(c: Ctx): Exercise {
  const it = c.pick(PASSIVE_ITEMS.filter((x) => x.modal !== false));
  const { pl, nom, acc } = passiveParts(it);
  const [msg, mpl] = c.pick([['muss', 'müssen'], ['kann', 'können'], ['soll', 'sollen']] as const);
  const m = pl ? mpl : msg;
  const r = c.rand();
  if (r < 0.3) {
    return choice(`drill:passive-adv:${it.n}:${m}`, `${cap(nom)} ${m} heute ${it.pp} ___.`, 'werden', ['worden', 'geworden', 'sein', 'wurde'], `Passive with a modal verb: modal + participle + werden (infinitive).`, 'voice.passive', c.rand);
  }
  if (r < 0.55) {
    const aux = pl ? 'sind' : 'ist';
    return choice(`drill:passive-adv:${it.n}:perf`, `${cap(nom)} ${aux} gestern ${it.pp} ___.`, 'worden', ['geworden', 'werden', 'gewesen', 'wurde'], `Passive Perfekt: sein + participle + worden (without ge-).`, 'voice.passive', c.rand);
  }
  if (r < 0.8) {
    return transform(
      `drill:passive-adv:${it.n}:${m}:t`,
      'Rewrite in the passive with the modal verb.',
      `Man ${msg} ${acc} heute ${it.inf}.`,
      [`${cap(nom)} ${m} heute ${it.pp} werden.`, `Heute ${m} ${nom} ${it.pp} werden.`],
      `Modal + participle + werden; the modal agrees with the new subject (${nom} → ${m}).`,
      'voice.passive',
      [['worden', 'With a modal verb: werden, not worden.'], [`\\b${it.inf}\\b werden`, `Use the participle: ${it.pp} werden.`]],
    );
  }
  const aux = pl ? 'werden' : 'wird';
  return transform(
    `drill:passive-adv:${it.n}:toperf`,
    'Put into the Perfekt (passive).',
    `${cap(nom)} ${aux} ${it.pp}.`,
    [`${cap(nom)} ${pl ? 'sind' : 'ist'} ${it.pp} worden.`],
    `Passive Perfekt: ${pl ? 'sind' : 'ist'} + participle + worden.`,
    'voice.passive',
    [['geworden', 'In the passive the participle of werden is worden.'], ['\\bhat\\b|\\bhaben\\b', 'The passive Perfekt is formed with sein.']],
  );
}

function passiveAlt(c: Ctx): Exercise {
  const it = c.pick(PASSIVE_ALT);
  const pl = it.g === 'pl';
  const nom = cap(np(it.g, it.n));
  const kann = pl ? 'können' : 'kann';
  const r = c.rand();
  if (r < 0.3) {
    return transform(`drill:passive-alt:${it.n}:lassen`, 'Rewrite with sich lassen.', `${nom} ${kann} ${it.pp} werden.`, [`${nom} ${pl ? 'lassen' : 'lässt'} sich ${it.inf}.`], 'können + passive → sich lassen + infinitive.', 'voice.passive-alt', [[it.pp, `With sich lassen use the infinitive: ${it.inf}.`]]);
  }
  if (r < 0.55) {
    return transform(`drill:passive-alt:${it.n}:zu`, 'Rewrite with sein + zu.', `${nom} ${kann} ${it.pp} werden.`, [`${nom} ${pl ? 'sind' : 'ist'} ${zuInf(it.inf)}.`], 'können/müssen + passive → sein + zu + infinitive.', 'voice.passive-alt', [[`zu ${it.pp}`, 'Use the infinitive after zu.']]);
  }
  if (r < 0.8) {
    return fill(`drill:passive-alt:${it.n}:bar`, `${nom} ${kann} ${it.pp} werden. = ${nom} ${pl ? 'sind' : 'ist'} ___.`, [it.bar], `-bar adjectives express a possibility: ${it.bar} = ${kann} ${it.pp} werden.`, 'voice.passive-alt');
  }
  return fill(`drill:passive-alt:${it.n}:sich`, `${nom} ___ sich leicht ${it.inf}.`, [pl ? 'lassen' : 'lässt'], `sich lassen + infinitive = can be done; ${pl ? 'plural' : 'singular'} subject → ${pl ? 'lassen' : 'lässt'}.`, 'voice.passive-alt');
}

function attrCase(c: Ctx): { cs: 'nom' | 'acc' | 'dat'; lead: (pl: boolean) => string; end: string } {
  return c.pick([
    { cs: 'nom' as const, lead: (pl: boolean) => (pl ? 'Das sind' : 'Das ist'), end: '.' },
    { cs: 'acc' as const, lead: () => 'Ich sehe', end: '.' },
    { cs: 'dat' as const, lead: () => 'Was ist mit', end: '?' },
  ]);
}

function participle(c: Ctx, extended: boolean): Exercise {
  const usePI = c.chance(0.5);
  const r = c.rand();
  if (usePI) {
    const it = c.pick(PARTICIPLE_I);
    const pl = it.g === 'pl';
    if (r < 0.5) {
      const { cs, lead, end } = attrCase(c);
      const ending = ADJ_ENDINGS.weak[cs][it.g];
      const pre = extended ? `${it.ext} ` : '';
      return fill(
        `drill:participle:${it.n}:${cs}:${extended ? 'x' : ''}`,
        `${lead(pl)} ${DEF[cs][it.g]} ${pre}___ ${nounIn(it.n, it.g, cs)}${end} (${it.pa.slice(0, -1)} – Partizip I)`,
        [`${it.pa}${ending}`],
        `Partizip I (infinitive + d) = an action happening at the same time, done by the noun itself. After ${DEF[cs][it.g]} (${CASE_NAME[cs]}) the ending is -${ending}: ${it.pa}${ending}.`,
        'participle-attr',
      );
    }
    const rel = REL.nom[it.g];
    const src = extended ? `${np(it.g, it.n)}, ${rel} ${it.ext} ${it.v}` : `${np(it.g, it.n)}, ${rel} ${it.v}`;
    const ans = `${DEF.nom[it.g]} ${extended ? `${it.ext} ` : ''}${it.pa}${ADJ_ENDINGS.weak.nom[it.g]} ${it.n}`;
    return transform(`drill:participle:${it.n}:t${extended ? 'x' : ''}`, 'Replace the relative clause with a participle attribute.', src, [ans], `Active and simultaneous → Partizip I${extended ? '; the extension goes before the participle' : ''}: ${ans}.`, 'participle-attr', [[`ge\\w+${ADJ_ENDINGS.weak.nom[it.g]} ${it.n}`, 'Active and ongoing → Partizip I (infinitive + d).']]);
  }
  const it = c.pick(PASSIVE_ITEMS);
  const pl = it.g === 'pl';
  if (r < 0.4) {
    const { cs, lead, end } = attrCase(c);
    const ending = ADJ_ENDINGS.weak[cs][it.g];
    const pre = extended ? 'gestern ' : '';
    return fill(
      `drill:participle:${it.n}:pp:${cs}:${extended ? 'x' : ''}`,
      `${lead(pl)} ${DEF[cs][it.g]} ${pre}___ ${nounIn(it.n, it.g, cs, it.obl)}${end} (${it.inf} – Partizip II)`,
      [`${it.pp}${ending}`],
      `Partizip II = passive / completed. After ${DEF[cs][it.g]} (${CASE_NAME[cs]}) the ending is -${ending}: ${it.pp}${ending}.`,
      'participle-attr',
    );
  }
  const rel = REL.nom[it.g];
  const ans = `${DEF.nom[it.g]} ${extended ? 'gestern ' : ''}${it.pp}${ADJ_ENDINGS.weak.nom[it.g]} ${it.n}`;
  if (extended && r < 0.7 && it.modal !== false) {
    const g = `${DEF.nom[it.g]} ${zuInf(it.inf, it.sep)}d${ADJ_ENDINGS.weak.nom[it.g]} ${it.n}`;
    return transform(`drill:participle:${it.n}:gerund`, 'Replace the relative clause with „zu“ + Partizip I.', `${np(it.g, it.n)}, ${rel} ${it.pp} werden ${pl ? 'müssen' : 'muss'}`, [g], `Necessity + passive → zu + Partizip I (Gerundiv): ${g}.`, 'participle-attr');
  }
  if (extended && r < 0.85) {
    return transform(
      `drill:participle:${it.n}:resolve`,
      'Resolve the attribute into a relative clause.',
      ans,
      [`${np(it.g, it.n)}, ${rel} gestern ${it.pp} ${pl ? 'wurden' : 'wurde'}`, `${np(it.g, it.n)}, ${rel} gestern ${it.pp} worden ${pl ? 'sind' : 'ist'}`],
      'Partizip II of a transitive verb → passive relative clause.',
      'participle-attr',
    );
  }
  return transform(
    `drill:participle:${it.n}:pp:t${extended ? 'x' : ''}`,
    'Replace the relative clause with a participle attribute.',
    `${np(it.g, it.n)}, ${rel} ${extended ? 'gestern ' : ''}${it.pp} ${pl ? 'wurden' : 'wurde'}`,
    [ans],
    `Passive / completed → Partizip II + adjective ending: ${ans}.`,
    'participle-attr',
  );
}

function lassen(c: Ctx): Exercise {
  const [obj, inf] = c.pick(LASSEN_ITEMS);
  const p = c.pick(PERSONS);
  if (c.chance(0.6)) {
    return fill(`drill:lassen:${inf}:${obj}:${p.s}`, `${cap(p.s)} ___ ${obj} ${inf}.`, [LASSEN[p.i]], `Having something done by someone else: lassen + infinitive. lassen changes a → ä with du and er/sie/es: ${p.s} ${LASSEN[p.i]}.`, 'lassen');
  }
  return fill(`drill:lassen:${inf}:${obj}:${p.s}:perf`, `${cap(p.s)} ${HABEN[p.i]} ${obj} ${inf} ___.`, ['lassen'], 'With another infinitive, the Perfekt of lassen uses the infinitive lassen (double infinitive), not gelassen.', 'lassen', undefined, { gelassen: 'With another infinitive the participle is replaced by lassen.' });
}

function zuInfinitive(c: Ctx): Exercise {
  const ph = c.pick(ZU_PHRASES);
  const zu = zuInf(ph.v, ph.sep);
  if (c.chance(0.6)) {
    const raw = c.pick(ZU_FRAMES);
    const frame = /[?!]$/.test(raw) ? raw : `${raw}.`;
    return fill(
      `drill:zu-inf:${ph.v}:${frame}`,
      frame.replace('…', `${ph.p} ___`),
      [zu],
      ph.sep ? `Separable verb: zu goes between prefix and stem → ${zu}.` : `zu + infinitive at the end of the clause → ${zu}.`,
      'infinitive',
      ph.v,
      ph.sep ? { [`zu ${ph.v}`]: `With separable verbs zu goes in the middle: ${zu}.`, [ph.v]: `This verb needs zu: ${zu}.` } : { [ph.v]: `This verb needs zu: ${zu}.` },
    );
  }
  const modal = c.chance(0.5);
  const lead = modal ? c.pick(['Ich muss', 'Du solltest', 'Wir wollen', 'Er kann']) : c.pick(['Ich versuche,', 'Er hat vergessen,', 'Es ist wichtig,']);
  const ans = modal ? ph.v : zu;
  const wrong = ph.sep ? [ph.v, zu, `zu ${ph.v}`] : [ph.v, zu, `${ph.v} zu`];
  return choice(`drill:zu-inf:${ph.v}:${lead}`, `${lead} ${ph.p} ___.`, ans, wrong, modal ? 'Modal verbs take the infinitive without zu.' : `After ${lead.replace(',', '')} the infinitive needs zu: ${zu}.`, 'infinitive', c.rand);
}

function timeClause(c: Ctx): Exercise {
  if (c.chance(0.3)) return fromBank('time', BANK.TIME_CLAUSES, 'clause.time', c, false);
  const [pr, pt, mpr, mpt] = c.pick(ALS_WENN);
  const mode = c.pick(['single', 'single', 'repeat', 'present', 'future'] as const);
  let prompt: string;
  let ans: string;
  let why: string;
  if (mode === 'single') {
    const cue = c.pick(['gestern', 'letzten Sonntag', 'damals']);
    prompt = `___ ich ${cue} ${pt}, ${mpt}.`;
    ans = 'Als';
    why = `A single event in the past (${cue}) → als.`;
  } else if (mode === 'repeat') {
    prompt = `Jedes Mal, ___ ich ${pt}, ${mpt}.`;
    ans = 'wenn';
    why = 'Repeated events in the past (jedes Mal) → wenn.';
  } else if (mode === 'present') {
    prompt = `___ ich ${pr}, ${mpr}.`;
    ans = 'Wenn';
    why = 'Present (also repeated) → wenn.';
  } else {
    const cue = c.pick(['morgen', 'nächste Woche']);
    prompt = `___ ich ${cue} ${pr}, ${mpr}.`;
    ans = 'Wenn';
    why = `Future (${cue}) → wenn.`;
  }
  const opts = mode === 'repeat' ? ['als', 'wann', 'ob'] : ['Als', 'Wenn', 'Wann', 'Ob'];
  return choice(`drill:time:${pr}:${mode}`, prompt, ans, opts, `${why} als is only used for one event or period in the past.`, 'clause.time', c.rand);
}

function clauseConnectors(c: Ctx, level: 'b1' | 'c1' | 'c2'): Exercise {
  const [A, Avf, B, Binv, type] = c.pick(CLAUSE_PAIRS);
  const S = level === 'b1'
    ? { cVf: 'obwohl', cInv: 'trotzdem', rVf: 'weil', rInv: 'deshalb' }
    : level === 'c1'
      ? { cVf: 'obgleich', cInv: 'dennoch', rVf: 'da', rInv: 'folglich' }
      : { cVf: 'wenngleich', cInv: 'gleichwohl', rVf: 'zumal', rInv: 'infolgedessen' };
  const vf = type === 'c' ? S.cVf : S.rVf;
  const inv = type === 'c' ? S.cInv : S.rInv;
  const pool = [S.cVf, S.cInv, S.rVf, S.rInv];
  const meaning = type === 'c' ? 'a contrast (the result is unexpected)' : 'a reason and its consequence';
  const v = c.rand();
  const key = `${A}|${B}`;
  if (v < 0.25) return choice(`drill:conn-${level}:${key}:inv`, `${A}, ___ ${Binv}.`, inv, pool, `The two clauses express ${meaning}. The verb follows the gap directly, so you need an adverb in position 1: ${inv}.`, 'connector', c.rand);
  if (v < 0.5) return choice(`drill:conn-${level}:${key}:vf`, `${B}, ___ ${Avf}.`, vf, pool, `The two clauses express ${meaning}. The verb is at the end, so you need a subordinating conjunction: ${vf}.`, 'connector', c.rand);
  if (v < 0.65 && vf !== 'zumal') return choice(`drill:conn-${level}:${key}:front`, `___ ${Avf}, ${Binv}.`, cap(vf), pool.map(cap), `Subordinate clause first (verb at the end), then the main verb: ${cap(vf)} …, ${Binv}.`, 'connector', c.rand);
  if (level === 'b1' && type === 'r' && v < 0.75) {
    return choice(`drill:conn-b1:${key}:denn`, `${B}, ___ ${lc(A)}.`, 'denn', ['weil', 'deshalb', 'obwohl'], 'Normal word order after the gap (verb in position 2) and a reason → denn (position 0).', 'connector', c.rand);
  }
  if (v < 0.85) {
    return transform(`drill:conn-${level}:${key}:tvf`, `Connect with ${vf}.`, `${A}. ${B}.`, [`${cap(vf)} ${Avf}, ${Binv}.`, `${B}, ${vf} ${Avf}.`], `${vf} sends the verb to the end; if the clause comes first, the main verb follows directly.`, 'connector', [[`${vf} ${lc(A)}\\b`, `After ${vf} the verb goes to the end: ${vf} ${Avf}.`]]);
  }
  return transform(`drill:conn-${level}:${key}:tinv`, `Connect with ${inv}.`, `${A}. ${B}.`, [`${A}, ${inv} ${Binv}.`, `${A}. ${cap(inv)} ${Binv}.`, `${A}; ${inv} ${Binv}.`], `${inv} takes position 1 → the verb comes next: ${inv} ${Binv}.`, 'connector', [[`${inv} ${lc(B)}`, `After ${inv} the verb comes next: ${inv} ${Binv}.`]]);
}

function contrast(c: Ctx): Exercise {
  const [A, , B, Bvf] = c.pick(CONTRAST_PAIRS);
  if (c.chance(0.5)) return choice(`drill:contrast:${A}`, `${A}, ___ ${Bvf}.`, 'wohingegen', ['zumal', 'folglich', 'insofern', 'sodass'], 'A contrast between two facts: wohingegen (or während) + verb at the end.', 'connector', c.rand, ['während']);
  return transform(`drill:contrast:${A}:t`, 'Connect with wohingegen.', `${A}. ${B}.`, [`${A}, wohingegen ${Bvf}.`], 'wohingegen + verb at the end.', 'order.verb-final', [[`wohingegen ${lc(B)}\\b`, `The verb goes to the end: wohingegen ${Bvf}.`]]);
}

function indirectQuestion(c: Ctx): Exercise {
  const qi = Math.floor(c.rand() * INDIRECT_QUESTIONS.length);
  const [direct, clause] = INDIRECT_QUESTIONS[qi];
  const intro = c.pick(INDIRECT_INTROS);
  const full = intro.replace('…', clause);
  const yesNo = clause.startsWith('ob ');
  const explain = `${yesNo ? 'A yes/no question becomes an ob clause' : 'The question word introduces the clause'}; the conjugated verb goes to the end: ${clause}.`;
  const r = c.rand();
  if (r < 0.45) return transform(`drill:indirect:${qi}:${intro}`, `Make it an indirect question: „${intro}“`, direct, [full], explain, 'question', [[`${lc(direct.replace(/\?$/, ''))}`, 'In an indirect question the verb goes to the end.']]);
  if (yesNo && r < 0.7) {
    return fill(`drill:indirect:${qi}:${intro}:ob`, intro.replace('…', `___ ${clause.slice(3)}`), ['ob'], explain, 'question', undefined, { wenn: 'Indirect yes/no questions use ob, not wenn.', dass: 'This is a question, not a statement: ob.' });
  }
  const wrongOrder = yesNo ? `ob ${lc(direct.replace(/\?$/, ''))}` : lc(direct.replace(/\?$/, ''));
  const wrong = [intro.replace('…', wrongOrder)];
  if (yesNo) wrong.push(intro.replace('…', clause.replace(/^ob /, 'wenn ')), intro.replace('…', clause.replace(/^ob /, 'dass ')));
  return choice(`drill:indirect:${qi}:${intro}:c`, 'Which sentence is correct?', full, wrong, explain, 'question', c.rand);
}

function verbPrep(c: Ctx): Exercise {
  const idx = Math.floor(c.rand() * VERB_PREPS.length);
  const [stmt, prep, cs, daStmt, q] = VERB_PREPS[idx];
  const vowel = /^[aeiouäöü]/.test(prep);
  const da = `da${vowel ? 'r' : ''}${prep}`;
  const wo = `Wo${vowel ? 'r' : ''}${prep}`;
  const caseNote = `${prep} + ${CASE_NAME[cs]}`;
  const r = c.rand();
  if (r < 0.3) return fill(`drill:verb-prep:${idx}:f`, stmt, [prep], `This verb takes ${caseNote}.`, 'verb.prep');
  if (r < 0.55) return choice(`drill:verb-prep:${idx}:c`, stmt, prep, PREPS, `This verb takes ${caseNote}.`, 'verb.prep', c.rand);
  if (r < 0.8) return fill(`drill:verb-prep:${idx}:da`, daStmt, [da], `For things, „${prep} + noun“ is replaced by da(r) + preposition: ${da} (r before a vowel).`, 'verb.prep', undefined, { [prep]: `Replace the thing with a da-word: ${da}.`, [`${prep} es`]: `For things use ${da}, not ${prep} es.` });
  return fill(`drill:verb-prep:${idx}:wo`, q, [wo], `Asking about a thing with ${prep}: wo(r) + preposition → ${wo}.`, 'verb.prep', undefined, { [`${prep} was`]: `Colloquial. Standard German: ${wo}.` });
}

function nominal(c: Ctx, style: 'b2' | 'c1'): Exercise {
  const it = c.pick(NOMINAL);
  const inf = it.c.replace(/^uns /, 'sich ');
  const gen = it.g === 'f' ? it.n : `${it.n}s`;
  if (style === 'b2') {
    const r = c.rand();
    if (r < 0.45) return fill(`drill:nominal:${it.n}:n`, `${inf} → ${DEF.nom[it.g]} ___`, [it.n], `${inf} → ${DEF.nom[it.g]} ${it.n}.`, 'nominal-style');
    if (r < 0.75) return choice(`drill:nominal:${it.n}:g`, `___ ${it.n} (${inf})`, DEF.nom[it.g], ['der', 'die', 'das'], `${DEF.nom[it.g]} ${it.n}${it.n.endsWith('ung') ? ' – nouns in -ung are always feminine' : ''}.`, 'nominal-style', c.rand);
  }
  const conv = c.pick([
    { conj: 'Wenn', prep: 'Bei', cs: 'dat' as const },
    { conj: 'Bevor', prep: 'Vor', cs: 'dat' as const },
    { conj: 'Während', prep: 'Während', cs: 'gen' as const },
    { conj: 'Weil', prep: 'Wegen', cs: 'gen' as const },
  ]);
  const poss = conv.cs === 'dat' ? (it.g === 'f' ? 'unserer' : 'unserem') : it.g === 'f' ? 'unserer' : 'unseres';
  const noun = conv.cs === 'gen' ? gen : it.n;
  const target = `${conv.prep} ${poss} ${noun}`;
  const explain = `${conv.conj.toLowerCase()} → ${conv.prep.toLowerCase()} + ${CASE_NAME[conv.cs]}; ${it.c.replace(/^uns /, '')} → ${DEF.nom[it.g]} ${it.n}; wir → unser: ${target}.`;
  const src = `${conv.conj} wir ${it.c}, …`;
  if (style === 'b2') return choice(`drill:nominal:${it.n}:${conv.prep}`, `${src} = ___ ${poss} ${noun} …`, conv.prep, ['Bei', 'Vor', 'Während', 'Wegen', 'Nach', 'Seit'], explain, 'nominal-style', c.rand);
  if (c.chance(0.5)) return transform(`drill:nominal-c1:${it.n}:${conv.prep}`, `Nominal style: ${conv.conj.toLowerCase()} → ${conv.prep.toLowerCase()}.`, src, [`${target} …`, target], explain, 'nominal-style');
  return fill(`drill:nominal-c1:${it.n}:${conv.prep}:poss`, `${src} = ${conv.prep} ___ ${noun} … (wir)`, [poss], explain, 'nominal-style');
}

function midfield(c: Ctx): Exercise {
  const per = c.pick(MIDFIELD_PERSONS);
  const th = c.pick(MIDFIELD_THINGS);
  const [pres, perf] = c.pick(MIDFIELD_VERBS);
  const pattern = c.pick(['pp', 'pn', 'np'] as const);
  const objs = pattern === 'pp' ? [th.p, per.p] : pattern === 'pn' ? [per.p, th.n] : [th.p, per.n];
  const rule = pattern === 'pp' ? 'Two pronouns: accusative before dative.' : 'A pronoun comes before a noun in the middle field.';
  const usePerf = c.chance(0.4);
  const [aux, pp] = perf.split(' … ');
  const words = usePerf ? ['Ich', aux, ...objs, pp] : ['Ich', pres, ...objs];
  if (c.chance(0.7)) return order(`drill:midfield:${words.join(' ')}`, words, rule, 'order.midfield');
  const wrong = usePerf ? ['Ich', aux, objs[1], objs[0], pp] : ['Ich', pres, objs[1], objs[0]];
  return correct(`drill:midfield:${words.join(' ')}:c`, `${wrong.join(' ')}.`, [`${words.join(' ')}.`], rule, 'order.midfield');
}

function informationStructure(c: Ctx): Exercise {
  if (c.chance(0.3)) return fromBank('info', BANK.INFO_STRUCTURE, 'order.midfield', c, false);
  if (c.chance(0.3)) return midfield(c);
  const it = c.pick(PASSIVE_ITEMS);
  const acc = np(it.g, it.n, 'acc', it.obl);
  const src = `Ich habe ${acc} gestern ${it.pp}.`;
  if (c.chance(0.5)) {
    return transform(`drill:info:${it.n}:time`, 'Put „gestern“ in the Vorfeld.', src, [`Gestern habe ich ${acc} ${it.pp}.`], 'Whatever fills the Vorfeld, the finite verb stays in position 2 and the subject moves behind it.', 'order.v2', [['gestern ich', 'The verb stays in position 2: Gestern habe ich …']]);
  }
  return transform(`drill:info:${it.n}:obj`, 'Put the object in the Vorfeld (contrast).', src, [`${cap(acc)} habe ich gestern ${it.pp}.`], 'A contrasted object can fill the Vorfeld; the verb stays in position 2.', 'order.v2', [[`${acc} ich`, 'The verb stays in position 2.']]);
}

function irreal(c: Ctx): Exercise {
  const [pred, k] = c.pick(IRREAL_PREDICATES);
  const p = c.pick(PERSONS);
  const forms = k === 'sein' || k === 'sp' ? uniq([WAERE[p.i], WAERE_ALT[p.i]]) : k === 'haben' || k === 'hp' ? [HAETTE[p.i]] : k === 'wissen' ? [WUESSTE[p.i]] : [WUERDE[p.i]];
  const lead = `${cap(p.s)} ${TUN[p.i]} so,`;
  const explain = `Unreal comparison: Konjunktiv II. With als ob the verb goes to the end; with als alone it comes directly after als (${forms[0]}).`;
  if (c.chance(0.55)) return fill(`drill:irreal:${pred}:${p.s}:ob`, `${lead} als ob ${p.s} ${pred} ___.`, forms, explain, 'irreal-comparison');
  return fill(`drill:irreal:${pred}:${p.s}:als`, `${lead} als ___ ${p.s} ${pred}.`, forms, explain, 'irreal-comparison');
}

function hearsay(c: Ctx): Exercise {
  const [subj, pl] = c.pick(HEARSAY_SUBJECTS);
  const pred = c.pick(HEARSAY_PREDICATES);
  const own = c.chance(0.5);
  const cue = own ? '(Das ist die eigene Behauptung.)' : c.pick(['(Das sagt man.)', '(Das steht in der Zeitung.)', '(Das habe ich gehört.)']);
  const ans = own ? (pl ? 'wollen' : 'will') : pl ? 'sollen' : 'soll';
  return choice(
    `drill:hearsay:${subj}:${pred}:${own}`,
    `${subj} ___ ${pred}. ${cue}`,
    ans,
    pl ? ['sollen', 'wollen', 'müssen', 'können'] : ['soll', 'will', 'muss', 'kann'],
    own ? 'The subject claims it about themselves → wollen (the speaker doubts it).' : 'Other people say it (hearsay) → sollen.',
    'modal.subjective',
    c.rand,
  );
}

// ---------------------------------------------------------------- registry

const GEN: Record<AdvancedDrillKind, (c: Ctx) => Exercise | null> = {
  pluperfect,
  relative,
  passive,
  'zu-infinitive': zuInfinitive,
  'time-clause': timeClause,
  concessive: (c) => clauseConnectors(c, 'b1'),
  'indirect-question': indirectQuestion,
  'verb-prep': verbPrep,
  future,
  'two-part': (c) => fromBank('two-part', BANK.TWO_PART, 'connector', c, false),
  lassen,
  'passive-advanced': passiveAdvanced,
  'passive-alt': passiveAlt,
  'konj2-past': konj2Past,
  participle: (c) => participle(c, false),
  'connector-b2': (c) => COMBO_GEN['connector-b2'](c),
  'subjective-modal': subjectiveModal,
  nominalisation: (c) => nominal(c, 'b2'),
  'relative-was': relativeWas,
  'particles-b2': (c) => COMBO_GEN['particles-b2'](c),
  midfield,
  'konj1-report': konj1Report,
  'nominal-style': (c) => nominal(c, 'c1'),
  'fvg-c1': (c) => COMBO_GEN['fvg-c1'](c),
  'participle-ext': (c) => participle(c, true),
  'passive-variants': passiveVariants,
  'particles-c1': (c) => COMBO_GEN['particles-c1'](c),
  'connector-c1': (c) => (c.chance(0.35) ? fromBank('conn-c1', BANK.CONNECTORS_C1, 'connector', c, false) : c.chance(0.3) ? contrast(c) : clauseConnectors(c, 'c1')),
  'irreal-comparison': irreal,
  rektion: (c) => COMBO_GEN.rektion(c),
  'word-formation': (c) => COMBO_GEN['word-formation'](c),
  hearsay,
  'konj1-formal': (c) => (c.chance(0.4) ? fromBank('konj1-formal', BANK.KONJ1_FORMAL, 'mood.konj1', c, true) : konj1Report(c)),
  'participle-clause': (c) => COMBO_GEN['participle-clause'](c),
  'fvg-c2': (c) => COMBO_GEN['fvg-c2'](c),
  'particles-c2': (c) => COMBO_GEN['particles-c2'](c),
  register: (c) => COMBO_GEN.register(c),
  idioms: (c) => COMBO_GEN.idioms(c),
  'connector-c2': (c) => (c.chance(0.4) ? fromBank('conn-c2', BANK.CONNECTORS_C2, 'connector', c, false) : clauseConnectors(c, 'c2')),
  'information-structure': informationStructure,
  'double-infinitive': doubleInfinitive,
  'genitive-verbs': (c) => COMBO_GEN['genitive-verbs'](c),
};

function passiveVariants(c: Ctx): Exercise {
  const r = c.rand();
  if (r < 0.3) return fromBank('agents', BANK.PASSIVE_AGENTS, 'voice.passive', c, true);
  if (r < 0.65) {
    const verb = c.pick([
      ['geholfen', 'helfen'],
      ['gedankt', 'danken'],
      ['gratuliert', 'gratulieren'],
      ['gekündigt', 'kündigen'],
      ['geantwortet', 'antworten'],
      ['widersprochen', 'widersprechen'],
    ] as const);
    const who = c.pick(['Mir', 'Dir', 'Ihm', 'Ihr', 'Uns', 'Euch', 'Den Kindern', 'Allen Teilnehmern', 'Der Kollegin']);
    const past = c.chance(0.6);
    const aux = past ? 'wurde' : 'wird';
    return choice(`drill:passive-var:${verb[1]}:${who}:${aux}`, `${who} ___ ${past ? 'gestern' : 'sofort'} ${verb[0]}.`, aux, past ? ['wurden', 'wurdet', 'bin', 'hat'] : ['werden', 'werdet', 'bin', 'hat'], `${verb[1]} takes the dative, so the passive has no subject: the verb stays in the 3rd person singular (${aux}), whoever receives the action.`, 'voice.passive', c.rand);
  }
  const p = c.pick(PERSONS);
  const obj = c.pick([
    ['ein Buch', 'geschenkt'],
    ['einen Preis', 'verliehen'],
    ['die Haare', 'geschnitten'],
    ['den Weg', 'gezeigt'],
    ['ein Paket', 'geschickt'],
    ['den Vertrag', 'erklärt'],
    ['die Rechnung', 'geschickt'],
  ] as const);
  const BEKAM = ['bekam', 'bekamst', 'bekam', 'bekamen', 'bekamt', 'bekamen'];
  return fill(`drill:passive-var:bekommen:${obj[0]}:${p.s}`, `${cap(p.s)} ___ ${obj[0]} ${obj[1]}. (bekommen-Passiv, Präteritum)`, [BEKAM[p.i]], `bekommen-Passiv: the receiver is the subject; bekommen (Präteritum: ${p.s} ${BEKAM[p.i]}) + participle.`, 'voice.passive');
}

const VERB_KINDS = new Set<AdvancedDrillKind>(['pluperfect', 'future', 'konj2-past', 'double-infinitive', 'konj1-report']);

/** Builds up to `count` exercises of an advanced drill kind. */
export function buildAdvancedDrills(kind: AdvancedDrillKind, pools: DrillPools, rand: () => number, count: number): Exercise[] {
  const verbs = pools.verbs.map((v) => v.table).filter((t) => t.pp && !MODALS.has(t.inf) && !IMPERSONAL.has(t.inf));
  const ctx: Ctx = {
    rand,
    pick: <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)],
    chance: (p) => rand() < p,
    verbs,
  };
  const out: Exercise[] = [];
  const seen = new Set<string>();
  for (let guard = 0; out.length < count && guard < count * 10; guard++) {
    const ex = ctx.verbs.length || !VERB_KINDS.has(kind) ? GEN[kind](ctx) : null;
    if (!ex || seen.has(ex.id)) continue;
    seen.add(ex.id);
    out.push(ex);
  }
  return out;
}

