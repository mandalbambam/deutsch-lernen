/**
 * Approximate CEFR level of a German sentence from
 *  - the rarest lemmas it uses (frequency bands),
 *  - its length,
 *  - grammar markers (Konjunktiv, passive, relative clauses, connectors …).
 * Heuristic by design: good enough to order practice material, not an official rating.
 */
import { LEVELS, type Level } from '../../lib/cefr';
import type { Pos } from '../../lib/data/types';
import { tokenize } from '../../lib/text/tokenize';

export interface LemmaRef {
  id: number;
  w: string;
  p: Pos;
  rank: number;
  level: Level;
}

export interface SentenceAnalysis {
  level: Level;
  words: string[];
  /** best lemma per word (undefined = name/number/unknown) */
  lemmas: (LemmaRef | undefined)[];
  /** all candidate lemmas per word (for example-sentence indexing) */
  candidates: LemmaRef[][];
  unknown: number;
  names: number;
}

const L = (l: Level) => LEVELS.indexOf(l);

/** frequent first names in Tatoeba sentences; treated as level-neutral */
export const COMMON_NAMES = new Set(
  `Tom Maria Mary John Jim Ken Bob Mike Jack Ann Anna Paul Peter Hans Klaus Lisa Emily Mark Jane Kate Betty Lucy Tony
  Bill Fred Mayuko Yumi Linda Susan Kevin Nancy Dan Jean Pierre Marie Sami Layla Ziri Taninna Skura Rima Yanni Toms
  Maria's Tomás Elke Monika Michael Thomas Stefan Andreas Sabine Julia Laura Daniel Martin Jonas Lukas Felix Max
  Sophie Emma Mia Ben Leon Paul Tim Jan Kai Nina Lea Lena Sarah Hannah Anne Eva Petra Karl Fritz Heinz Otto`.split(/\s+/),
);

const SUBORD: [RegExp, Level][] = [
  [/\b(weil|dass|wenn|ob)\b/, 'A2'],
  [/\b(obwohl|nachdem|bevor|seitdem|damit|sodass|solange|sobald)\b/, 'B1'],
  [/,\s*(während|bis|als)\b/, 'B1'],
  [/\b(indem|falls|sofern|soweit|desto|umso|anstatt|insofern)\b/, 'B2'],
  [/\b(zumal|wohingegen|wenngleich|obgleich|demzufolge|infolgedessen|folglich)\b/, 'C1'],
  [/\b(obschon|wiewohl|gleichwohl|nichtsdestotrotz|nichtsdestoweniger|mithin|ungeachtet)\b/, 'C2'],
];

const GEN_PREP: [RegExp, Level][] = [
  [/\b(wegen|trotz|innerhalb|außerhalb)\b/, 'B1'],
  [/\b(aufgrund|statt|anstelle|bezüglich)\b/, 'B2'],
  [/\b(infolge|hinsichtlich|angesichts|anhand|mittels|zwecks|seitens|zugunsten|kraft|laut)\b/, 'C1'],
];

const WERDEN = new Set(['wird', 'werden', 'wurde', 'wurden', 'wirst', 'werdet', 'wurdest', 'wurdet']);
const PLUSQ = new Set(['hatte', 'hatten', 'hattest', 'hattet', 'war', 'waren', 'warst', 'wart']);
const K2_CORE = new Set(['wäre', 'wären', 'wärst', 'wärt', 'hätte', 'hätten', 'hättest', 'hättet', 'würde', 'würden', 'würdest', 'würdet']);
const K2_MODAL = new Set(['könnte', 'könnten', 'könntest', 'müsste', 'müssten', 'dürfte', 'dürften', 'bräuchte', 'käme', 'ginge', 'gäbe', 'wüsste', 'täte', 'bliebe', 'ließe', 'stünde', 'läge']);
const K1 = new Set(['sei', 'seien', 'seist', 'habe', 'könne', 'müsse', 'dürfe', 'solle', 'wolle', 'werde', 'gebe', 'komme', 'gehe', 'wisse', 'möge']);
const K1_SUBJ = new Set(['er', 'sie', 'es', 'man']);
const MODALS = new Set(['muss', 'müssen', 'kann', 'können', 'soll', 'sollen', 'darf', 'dürfen', 'will', 'wollen', 'musste', 'konnte', 'sollte', 'durfte', 'mussten', 'konnten', 'sollten', 'durften']);

function looksLikeParticiple(w: string): boolean {
  return /^(ge\p{L}{2,}(t|en)|\p{L}{3,}iert|(an|auf|aus|ein|mit|nach|vor|zu|ab|zurück|weg|fest|los|vorbei|um|über|unter|durch|be|ver|er|zer|ent|emp|miss)ge?\p{L}{2,}(t|en))$/u.test(w);
}

export function lengthLevel(n: number): Level {
  if (n <= 9) return 'A1';
  if (n <= 13) return 'A2';
  if (n <= 17) return 'B1';
  if (n <= 22) return 'B2';
  return 'C1';
}

export function grammarLevel(words: string[], text: string): Level {
  const lower = words.map((w) => w.toLowerCase());
  const t = text.toLowerCase();
  let lvl = 0;
  const bump = (l: Level) => {
    lvl = Math.max(lvl, L(l));
  };

  for (const [re, l] of SUBORD) if (re.test(t)) bump(l);
  for (const [re, l] of GEN_PREP) if (re.test(t)) bump(l);
  if (/,\s*(der|die|das|dem|den|deren|dessen|denen|welche[mnrs]?)\b/.test(t)) bump('B1');
  if (/,\s*(mit|von|zu|in|an|auf|für|bei|über|unter|aus|nach)\s+(dem|der|denen|deren|dessen|welche[mnrs]?)\b/.test(t)) bump('B1');
  if (/\bum\b.*\bzu\s+\p{L}+/u.test(t)) bump('B1');
  if (/\b(ohne|statt|anstatt)\b.*\bzu\s+\p{L}+/u.test(t)) bump('B2');
  if (/\bje\b.*\b(desto|umso)\b/.test(t)) bump('B2');

  const hasParticiple = lower.some(looksLikeParticiple);
  const last = lower[lower.length - 1] ?? '';
  const k2Core = lower.some((w) => K2_CORE.has(w));
  if (k2Core) {
    const polite = /\b(hätte|hätten|würde|würden)\b.*\bgern/.test(t) || /^(könnten|würden|hätten)\s+sie\b/.test(t);
    bump(polite ? 'A2' : 'B1');
    if (lower.some((w) => /^(hätte|hätten|hättest|hättet|wäre|wären|wärst|wärt)$/.test(w)) && hasParticiple) bump('B2');
  }
  if (lower.some((w) => K2_MODAL.has(w))) bump('B1');
  for (let i = 1; i < lower.length; i++) {
    if (K1.has(lower[i]) && K1_SUBJ.has(lower[i - 1])) bump('C1');
    if ((lower[i] === 'sei' || lower[i] === 'seien') && i > 0) bump('C1');
  }
  if (lower.some((w) => WERDEN.has(w)) && hasParticiple) bump('B1');
  if (lower.includes('worden')) bump('B2');
  if (last === 'werden' && lower.some((w) => MODALS.has(w)) && hasParticiple) bump('B2');
  if (lower.some((w) => PLUSQ.has(w)) && looksLikeParticiple(last)) bump('B1');
  // attributive present participle: "die steigenden Preise"
  if (lower.some((w) => /^\p{L}{3,}end(e|en|es|er|em)$/u.test(w) && !/^(ende|enden|elend\p{L}*|abend\p{L}*|jugend\p{L}*|tugend\p{L}*|gegend\p{L}*|legend\p{L}*)$/u.test(w))) bump('B2');
  return LEVELS[lvl];
}

export function analyzeSentence(
  text: string,
  lookup: (lowerForm: string) => LemmaRef[] | undefined,
): SentenceAnalysis | null {
  const toks = tokenize(text).filter((t) => t.word);
  const words = toks.map((t) => t.text);
  const lemmas: (LemmaRef | undefined)[] = [];
  const candidates: LemmaRef[][] = [];
  const levels: number[] = [];
  let unknown = 0;
  let names = 0;

  words.forEach((w, i) => {
    if (/^\d+([.,]\d+)?$/.test(w)) {
      lemmas.push(undefined);
      candidates.push([]);
      return;
    }
    if (COMMON_NAMES.has(w)) {
      names++;
      lemmas.push(undefined);
      candidates.push([]);
      return;
    }
    const lower = w.toLowerCase();
    let cands = lookup(lower) ?? [];
    // capitalised mid-sentence word: prefer nouns; lower-case word: prefer non-nouns
    const cap = /^\p{Lu}/u.test(w);
    if (i > 0 && cands.length > 1) {
      const pref = cands.filter((c) => (cap ? /^\p{Lu}/u.test(c.w) : !/^\p{Lu}/u.test(c.w)));
      if (pref.length) cands = pref;
    }
    if (cands.length === 0) {
      const compound = lower.length >= 7 ? decompound(lower, lookup) : undefined;
      if (compound) {
        lemmas.push(compound);
        candidates.push([]);
        levels.push(L(compound.level));
        return;
      }
      if (cap && i > 0 && lower.length < 10) {
        names++;
        lemmas.push(undefined);
        candidates.push([]);
        return;
      }
      unknown++;
      lemmas.push(undefined);
      candidates.push([]);
      return;
    }
    const best = cands.reduce((a, b) => (b.rank < a.rank ? b : a));
    lemmas.push(best);
    candidates.push(cands);
    levels.push(L(best.level));
  });

  if (unknown > 1) return null;
  const sorted = [...levels].sort((a, b) => b - a);
  let lex = 0;
  if (sorted.length >= 6) lex = Math.max(sorted[0] - 1, sorted[1] ?? 0);
  else lex = sorted[0] ?? 0;
  if (unknown === 1) lex = Math.max(lex, L('B2'));

  const lvl = Math.max(lex, L(lengthLevel(words.length)), L(grammarLevel(words, text)));
  return { level: LEVELS[lvl], words, lemmas, candidates, unknown, names };
}

const LINKERS = ['', 's', 'es', 'n', 'en', 'e', 'er'];

/** Splits an unknown compound into two known parts, e.g. "kinderzimmer" → Kinder + Zimmer. */
function decompound(lower: string, lookup: (f: string) => LemmaRef[] | undefined): LemmaRef | undefined {
  for (let cut = lower.length - 3; cut >= 3; cut--) {
    const head = lookup(lower.slice(cut));
    if (!head?.length) continue;
    const headBest = head.reduce((a, b) => (b.rank < a.rank ? b : a));
    for (const link of LINKERS) {
      const left = lower.slice(0, cut);
      if (link && !left.endsWith(link)) continue;
      const stem = link ? left.slice(0, -link.length) : left;
      if (stem.length < 3) continue;
      const mod = lookup(stem);
      if (!mod?.length) continue;
      const modBest = mod.reduce((a, b) => (b.rank < a.rank ? b : a));
      const lvl = Math.min(L('C1'), Math.max(L(headBest.level), L(modBest.level)) + 1);
      return { ...headBest, level: LEVELS[lvl] };
    }
  }
  return undefined;
}
