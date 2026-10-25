import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { DataManifest, DeckEntry, VerbShard } from '@/lib/data/types';
import { checkAnswer, checkChoice } from '@/lib/exercise/check';
import { buildDrills, isDrillNoun, pluralPattern, type DrillPools } from '@/lib/exercise/drills';
import { regularPresent } from '@/lib/exercise/drills-combo';
import { LESSONS, TOPIC_BY_ID } from '@/content/grammar';
import { FVG_FRAMES, IDIOM_LIST, LIGHT_VERBS, PARTICLE_TEMPLATES, REKTION_FRAMES } from '@/content/grammar/drill-combos';
import * as BANK from '@/content/grammar/drill-items';
import { toExercise } from '@/lib/exercise/ai-convert';
import { ADVANCED_DRILL_KINDS, type DrillKind, type Exercise } from '@/lib/exercise/types';
import { bucketOf } from '@/lib/lexicon/hash';
import { mulberry32 } from '@/lib/random';

const manifest = JSON.parse(readFileSync('public/data/manifest.json', 'utf8')) as DataManifest;
const read = <T,>(p: string) => JSON.parse(readFileSync(`public/data/${p}`, 'utf8')) as T;

function pools(): DrillPools {
  const entries = (['A1', 'A2', 'B1'] as const).flatMap((l) => read<DeckEntry[]>(manifest.files.decks[l]));
  const shards = manifest.files.verbs.map((f) => read<VerbShard>(f));
  const verbs = entries
    .filter((e) => e.p === 'verb')
    .slice(0, 200)
    .map((entry) => ({ entry, table: shards[bucketOf(entry.w, manifest.files.verbBuckets)][entry.w] }))
    .filter((v) => v.table && v.table.pres.every(Boolean) && v.table.prt.every(Boolean));
  return { nouns: entries.filter(isDrillNoun), verbs };
}

const ALL: DrillKind[] = ['gender', 'plural', 'case-akk', 'case-dat', 'case-gen', 'case-prep', 'adj-definite', 'adj-indefinite', 'adj-all', 'present', 'present-irregular', 'modal', 'preterite', 'perfect', 'konj2', 'konj1', 'comparison', 'n-decl', 'imperative', ...ADVANCED_DRILL_KINDS];

function firstAnswer(e: Exercise): string {
  if (e.kind === 'choice') return e.options[0];
  if (e.kind === 'order') return e.words.join(' ');
  return e.answers[0];
}

describe('generated drills', () => {
  const p = pools();

  it('has data for nouns and verbs', () => {
    expect(p.nouns.length).toBeGreaterThan(300);
    expect(p.verbs.length).toBeGreaterThan(80);
    expect(p.verbs.some((v) => v.entry.w === 'können')).toBe(true);
  });

  for (const kind of ALL) {
    it(`builds ${kind} exercises that accept their own answer`, () => {
      const ex = buildDrills(kind, p, mulberry32(42), 40);
      expect(ex.length).toBeGreaterThan(5);
      for (const e of ex) {
        expect(e.explain.length).toBeGreaterThan(5);
        expect(e.id.startsWith('drill:')).toBe(true);
        const ans = firstAnswer(e);
        expect(ans.trim()).not.toBe('');
        if (e.kind === 'fill') expect(e.prompt.split('___').length - 1).toBe(1);
        if (e.kind === 'correct') expect(checkAnswer(e, e.sentence).verdict).not.toBe('correct');
        if (e.kind === 'choice') {
          expect(e.options.length).toBeGreaterThanOrEqual(2);
          expect(new Set(e.options.map((o) => o.toLowerCase())).size).toBe(e.options.length);
          expect(checkChoice(e, 0).verdict).toBe('correct');
        } else {
          expect(checkAnswer(e, ans).verdict).toBe('correct');
        }
      }
    });
  }

  it('gives every B1–C2 lesson unlimited generated practice', () => {
    for (const l of LESSONS) if (['B1', 'B2', 'C1', 'C2'].includes(TOPIC_BY_ID[l.id].level)) expect(l.drills?.length, l.id).toBeGreaterThan(0);
  });

  it('keeps the hand-written drill pools consistent', () => {
    for (const [name, items] of Object.entries(BANK)) {
      for (const [prompt, ans, wrong] of items as BANK.BankItem[]) {
        const answers = (Array.isArray(ans) ? ans : [ans]).map((a) => a.toLowerCase());
        expect(prompt.includes('___') || prompt.includes('?'), `${name}: ${prompt}`).toBe(true);
        for (const w of wrong) expect(answers, `${name}: ${prompt}`).not.toContain(w.toLowerCase());
      }
    }
  });

  it('keeps the combinable B2–C2 material consistent', () => {
    expect(regularPresent('warten')).toEqual(['warte', 'wartest', 'wartet', 'warten', 'wartet', 'warten']);
    expect(regularPresent('setzen')[1]).toBe('setzt');
    expect(regularPresent('kommen')[1]).toBe('kommst');
    expect(regularPresent('zweifeln')[0]).toBe('zweifle');
    expect(regularPresent('erinnern')[2]).toBe('erinnert');
    for (const f of FVG_FRAMES) {
      expect(LIGHT_VERBS[f.lv], f.tpl).toBeDefined();
      expect(f.tpl, f.tpl).toMatch(/\*\S/);
      expect(f.no ?? [], f.tpl).not.toContain(f.lv);
    }
    for (const [ctx, sentences, answers, wrong] of Object.values(PARTICLE_TEMPLATES).flat()) {
      for (const sentence of sentences) expect(sentence.split('___').length - 1, sentence).toBe(1);
      for (const w of wrong) expect(answers, ctx).not.toContain(w);
    }
    for (const [idiom, key] of IDIOM_LIST) expect(idiom.toLowerCase(), idiom).toContain(key.toLowerCase());
    for (const f of REKTION_FRAMES) expect(f.objs.length, f.name).toBeGreaterThan(2);
  });

  it('keeps producing new exercises for the B2–C2 lexical topics', () => {
    const kinds: DrillKind[] = ['rektion', 'fvg-c1', 'fvg-c2', 'genitive-verbs', 'idioms', 'register', 'word-formation', 'connector-b2', 'participle-clause', 'particles-b2', 'particles-c1', 'particles-c2'];
    for (const kind of kinds) {
      const ids = new Set<string>();
      for (let seed = 1; seed <= 60; seed++) for (const e of buildDrills(kind, p, mulberry32(seed), 10)) ids.add(e.id);
      expect(ids.size, kind).toBeGreaterThan(60);
    }
  });

  it('builds correct genitive phrases and prepositional cases', () => {
    for (const e of buildDrills('genitive-verbs', p, mulberry32(4), 80)) {
      if (e.kind === 'fill' && e.id.startsWith('drill:gen-x')) for (const a of e.answers) expect(a, e.prompt).toMatch(/^(des|der|eines|einer) |^\S+(er|en) /);
    }
    for (const e of buildDrills('rektion', p, mulberry32(8), 80)) {
      if (e.kind !== 'fill' || !e.id.endsWith(':a')) continue;
      if (/ (mit|von|nach|bei|zu) ___ /.test(e.prompt)) expect(['dem', 'der', 'den'], e.prompt).toContain(e.answers[0]);
      if (/ (für|um|gegen) ___ /.test(e.prompt)) expect(['den', 'die', 'das'], e.prompt).toContain(e.answers[0]);
    }
  });

  it('accepts only consistent AI-generated exercises', () => {
    const base = { distractors: [], explain: 'Rule.' };
    expect(toExercise({ ...base, kind: 'fill', prompt: 'Das Gesetz tritt in ___.', answers: ['Kraft'] }, 'c1-funktionsverbgefuege')?.kind).toBe('fill');
    expect(toExercise({ ...base, kind: 'fill', instruction: 'Use an FVG.', prompt: 'Es tritt in ___.', answers: ['Kraft'] }, 'c1-funktionsverbgefuege')?.heading).toBe('Use an FVG.');
    expect(toExercise({ ...base, kind: 'fill', prompt: 'Das ___ tritt in ___.', answers: ['Kraft'] }, 'c1-funktionsverbgefuege')).toBeNull();
    expect(toExercise({ ...base, kind: 'fill', prompt: 'Kein Gap.', answers: ['Kraft'] }, 'c1-funktionsverbgefuege')).toBeNull();
    expect(toExercise({ ...base, kind: 'choice', prompt: 'Er ___ krank.', answers: ['ist'], distractors: ['Ist', 'sind'] }, 'c1-funktionsverbgefuege')).toBeNull();
    const ch = toExercise({ ...base, kind: 'choice', prompt: 'Er ___ krank.', answers: ['ist'], distractors: ['sind', 'bist', 'ist'] }, 'c1-funktionsverbgefuege');
    expect(ch?.kind === 'choice' && ch.options).toEqual(['ist', 'sind', 'bist']);
    expect(toExercise({ ...base, kind: 'transform', prompt: 'Man baut das Haus.', answers: ['Das Haus wird gebaut.'] }, 'b2-passiv-erweitert')).toBeNull();
    expect(toExercise({ ...base, kind: 'transform', instruction: 'Passive.', prompt: 'Man baut das Haus.', answers: ['Das Haus wird gebaut.'] }, 'b2-passiv-erweitert')?.kind).toBe('transform');
  });

  it('builds correct forms in the structure drills', () => {
    const plu = buildDrills('pluperfect', p, mulberry32(5), 30) as Extract<Exercise, { kind: 'fill' }>[];
    for (const e of plu) expect(e.answers.every((a) => /\b(hatte|hattest|hatten|hattet|war|warst|waren|wart)\b/.test(a))).toBe(true);
    for (const e of buildDrills('relative', p, mulberry32(9), 40)) {
      if ((e.kind === 'fill' || e.kind === 'choice') && e.prompt.startsWith('Das sind')) expect(['die', 'denen', 'deren']).toContain(firstAnswer(e));
    }
    for (const e of buildDrills('passive', p, mulberry32(11), 40)) {
      if (e.kind === 'fill' && /^Die (Fenster|Gäste|Kinder|Briefe|Hausaufgaben|Waren|Geschenke|Daten|Kosten) /.test(e.prompt)) expect(['werden', 'wurden']).toContain(e.answers[0]);
    }
  });

  it('computes correct adjective endings and articles', () => {
    const ex = buildDrills('adj-indefinite', p, mulberry32(7), 30) as Extract<Exercise, { kind: 'fill' }>[];
    for (const e of ex) {
      if (e.prompt.startsWith('Das ist ein ')) expect(['er', 'es']).toContain(e.answers[0]);
      if (e.prompt.startsWith('mit einem ')) expect(e.answers[0]).toBe('en');
      if (e.prompt.startsWith('Ich sehe eine ')) expect(e.answers[0]).toBe('e');
    }
    const gen = buildDrills('gender', p, mulberry32(3), 20) as Extract<Exercise, { kind: 'choice' }>[];
    const haus = gen.find((g) => g.prompt === '___ Haus');
    if (haus) expect(haus.options[0]).toBe('das');
  });

  it('excludes adjectival nouns and explains plurals correctly', () => {
    expect(p.nouns.some((n) => n.w === 'Deutscher' || n.w === 'Erwachsener')).toBe(false);
    expect(pluralPattern('Bruder', 'Brüder')).toMatch(/Umlaut only/);
    expect(pluralPattern('Haus', 'Häuser')).toMatch(/-er with umlaut/);
    expect(pluralPattern('Freundin', 'Freundinnen')).toMatch(/-innen/);
    expect(pluralPattern('Museum', 'Museen')).toMatch(/Irregular/);
    expect(pluralPattern('Apfel', 'Äpfel')).toMatch(/Umlaut only/);
  });
});

describe('answer checker', () => {
  const fill: Exercise = { id: 'x', kind: 'fill', prompt: 'Ich ___ müde.', answers: ['bin'], explain: 'ich bin', feedback: { ist: 'ist goes with er.' } };
  it('accepts correct answers and explains wrong ones', () => {
    expect(checkAnswer(fill, 'bin').verdict).toBe('correct');
    expect(checkAnswer(fill, ' bin ').verdict).toBe('correct');
    const wrong = checkAnswer(fill, 'ist');
    expect(wrong.verdict).toBe('wrong');
    expect(wrong.reason).toBe('ist goes with er.');
  });
  it('treats capitalisation slips as almost and accepts ae/oe/ue', () => {
    const noun: Exercise = { id: 'y', kind: 'fill', prompt: 'zwei ___', answers: ['Bücher'], explain: '' };
    expect(checkAnswer(noun, 'bücher').verdict).toBe('almost');
    expect(checkAnswer(noun, 'Buecher').verdict).toBe('correct');
  });
  it('compares full sentences tolerantly and shows a diff when wrong', () => {
    const t: Exercise = { id: 'z', kind: 'transform', instruction: '', source: '', answers: ['Ich habe einen Kaffee getrunken.'], explain: '', feedback: [['getrinkt', 'trinken is strong: getrunken.']] };
    expect(checkAnswer(t, 'ich habe einen Kaffee getrunken').verdict).toBe('correct');
    const w = checkAnswer(t, 'Ich habe einen Kaffee getrinkt.');
    expect(w.verdict).toBe('wrong');
    expect(w.reason).toMatch(/getrunken/);
    expect(w.diff?.ops.some((o) => o.type === 'wrong')).toBe(true);
  });
  it('accepts alternative word orders for order exercises', () => {
    const o: Exercise = { id: 'o', kind: 'order', words: ['Heute', 'gehe', 'ich', 'ins Kino'], answers: ['Ich gehe heute ins Kino'], explain: '' };
    expect(checkAnswer(o, 'Heute gehe ich ins Kino').verdict).toBe('correct');
    expect(checkAnswer(o, 'Ich gehe heute ins Kino').verdict).toBe('correct');
    expect(checkAnswer(o, 'Heute ich gehe ins Kino').verdict).toBe('wrong');
  });
});
