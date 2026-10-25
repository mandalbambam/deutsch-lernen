import { readFileSync } from 'node:fs';
import { beforeAll, describe, expect, it } from 'vitest';
import { lookup, type LookupContext } from '@/lib/lexicon/lookup';

beforeAll(() => {
  globalThis.fetch = (async (url: string) => {
    const body = readFileSync(`public${url}`, 'utf8');
    return { ok: true, status: 200, json: async () => JSON.parse(body) } as Response;
  }) as typeof fetch;
});

function ctx(sentence: string, word: string): LookupContext {
  const parts = sentence.split(/\s+/);
  const words = parts.map((p) => p.replace(/[^\p{L}\p{N}]+$/u, '').replace(/^[^\p{L}\p{N}]+/u, ''));
  const after = parts.map((p) => p.match(/[^\p{L}\p{N}]+$/u)?.[0] ?? '');
  return { words, after, index: words.indexOf(word) };
}

describe('lookup', () => {
  it('finds lemmas of inflected forms and describes the form', async () => {
    const r = await lookup('ging', ctx('Er ging nach Hause.', 'ging'));
    expect(r.hits[0].entry.w).toBe('gehen');
    expect(r.hits[0].form).toMatch(/Präteritum/);
    const h = await lookup('Häuser', ctx('Die alten Häuser sind schön.', 'Häuser'));
    expect(h.hits[0].entry.w).toBe('Haus');
    expect(h.hits[0].form).toBe('plural of Haus');
  });

  it('uses capitalisation to tell nouns from verbs', async () => {
    expect((await lookup('rufe', ctx('Ich rufe laut.', 'rufe'))).hits[0].entry.w).toBe('rufen');
    expect((await lookup('stand', ctx('Er stand lange dort.', 'stand'))).hits[0].entry.w).toBe('stehen');
    expect((await lookup('gefahren', ctx('Wir sind gefahren.', 'gefahren'))).hits[0].entry.w).toBe('fahren');
    expect((await lookup('schönen', ctx('Die schönen Häuser.', 'schönen'))).hits[0].entry.w).toBe('schön');
  });

  it('recognises separable verbs split across the clause', async () => {
    const c = ctx('Ich rufe dich morgen an.', 'rufe');
    expect((await lookup('rufe', c)).hits[0].entry.w).toBe('anrufen');
    const p = ctx('Ich rufe dich morgen an.', 'an');
    expect((await lookup('an', p)).hits[0].entry.w).toBe('anrufen');
    const s = ctx('Morgen stehe ich früh auf, weil ich arbeite.', 'stehe');
    expect((await lookup('stehe', s)).hits[0].entry.w).toBe('aufstehen');
  });

  it('handles pronouns, contractions and function words', async () => {
    expect((await lookup('mich', ctx('Er sieht mich.', 'mich'))).hits[0].entry.w).toBe('ich');
    expect((await lookup('ins', ctx('Wir gehen ins Kino.', 'ins'))).hits[0].entry.w).toBe('ins');
    expect(['der', 'das']).toContain((await lookup('dem', ctx('Mit dem Bus.', 'dem'))).hits[0].entry.w);
  });

  it('splits unknown compounds', async () => {
    const r = await lookup('Bahnhofsuhr');
    expect(r.hits).toHaveLength(0);
    expect(r.compound?.map((p) => p.entry?.w)).toEqual(['Bahnhof', 'Uhr']);
  });
});
