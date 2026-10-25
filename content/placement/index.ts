import { GRAMMAR_ITEMS } from './grammar';
import { LISTENING } from './listening';
import { READING } from './reading';
import type { BankItem, Passage } from './types';
import { VOCAB_ITEMS } from './vocabulary';

export type { BankItem, Passage } from './types';

export const PASSAGES: Passage[] = [...READING, ...LISTENING];

export const PASSAGE_BY_ID: Record<string, Passage> = Object.fromEntries(PASSAGES.map((p) => [p.id, p]));

export const ALL_ITEMS: BankItem[] = [...GRAMMAR_ITEMS, ...VOCAB_ITEMS, ...PASSAGES.flatMap((p) => p.questions)];

export const ITEM_BY_ID: Record<string, BankItem> = Object.fromEntries(ALL_ITEMS.map((i) => [i.id, i]));
