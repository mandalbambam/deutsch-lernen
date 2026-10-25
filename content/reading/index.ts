import { A_TEXTS } from './a';
import { B_TEXTS } from './b';
import { C_TEXTS } from './c';
import type { ReadingText } from './types';

export type { ComprehensionQ, ReadingText } from './types';

export const TEXTS: ReadingText[] = [...A_TEXTS, ...B_TEXTS, ...C_TEXTS];

export const TEXT_BY_ID: Record<string, ReadingText> = Object.fromEntries(TEXTS.map((t) => [t.id, t]));
