import { describe, expect, it } from 'vitest';
import { parseParagraph } from '@/components/reading/interactive-text';
import { validateGrammar, validateOutputContent, validatePlacementBank, validateTexts } from '@/lib/content-validation';
import { checkAnswer } from '@/lib/exercise/check';
import type { Exercise } from '@/lib/exercise/types';
import { nextText, pickNext, questionTag } from '@/lib/reading/select';

describe('content', () => {
  it('placement bank is consistent', () => {
    expect(validatePlacementBank().errors).toEqual([]);
  });
  it('grammar lessons are consistent and every accepted answer passes the checker', () => {
    expect(validateGrammar().errors).toEqual([]);
  });
  it('reading texts and listening scripts are consistent', () => {
    expect(validateTexts().errors).toEqual([]);
  });
  it('writing tasks and conversation scenarios are consistent', () => {
    expect(validateOutputContent().errors).toEqual([]);
  });
});

describe('capitalisation feedback', () => {
  it('explains the polite form instead of talking about nouns', () => {
    const ex: Exercise = { id: 'p', kind: 'fill', prompt: 'Ist das ___ Koffer?', answers: ['Ihr'], explain: '' };
    const r = checkAnswer(ex, 'ihr');
    expect(r.verdict).toBe('almost');
    expect(r.note).toMatch(/polite/);
    const low: Exercise = { id: 'l', kind: 'fill', prompt: 'Ich ___ müde.', answers: ['bin'], explain: '' };
    expect(checkAnswer(low, 'Bin').note).toMatch(/lower case/);
  });
});

describe('reading helpers', () => {
  it('splits sentences but not after ordinals or abbreviations', () => {
    const s = parseParagraph('Am 9. November fiel die Mauer. Das war z. B. ein Wunder! Danach kam alles anders.');
    expect(s).toHaveLength(3);
    expect(s[0].words).toEqual(['Am', '9', 'November', 'fiel', 'die', 'Mauer']);
    expect(s[1].after[s[1].words.length - 1]).toContain('!');
  });

  it('picks unread texts at the level, preferring interests', () => {
    const items = [
      { id: 'x1', level: 'B1' as const, topics: ['sport' as const] },
      { id: 'x2', level: 'B1' as const, topics: ['travel' as const] },
      { id: 'x3', level: 'A2' as const, topics: ['travel' as const] },
    ];
    expect(pickNext(items, 'B1', ['travel'], new Set())?.id).toBe('x2');
    expect(pickNext(items, 'B1', ['travel'], new Set(['x1', 'x2']))?.id).toBe('x3');
    expect(pickNext(items, 'B1', [], new Set(['x1', 'x2', 'x3']))).toBeUndefined();
    expect(nextText('A1', [], new Set())?.level).toBe('A1');
  });

  it('tags comprehension questions by type', () => {
    expect(questionTag({ kind: 'choice', q: 'Was bedeutet „abschalten“?', options: [], explain: '' }, 'reading')).toBe('lexis.meaning');
    expect(questionTag({ kind: 'choice', q: 'Welche These vertritt der Text?', options: [], explain: '' }, 'reading')).toBe('reading.gist');
    expect(questionTag({ kind: 'tf', q: 'Marie war müde.', answer: true, explain: '' }, 'listening')).toBe('listening.detail');
  });
});
