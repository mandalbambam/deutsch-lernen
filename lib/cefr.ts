export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type Level = (typeof LEVELS)[number];

/** A1 → 1 … C2 → 6 */
export function levelNumber(level: Level): number {
  return LEVELS.indexOf(level) + 1;
}

export function levelFromNumber(n: number): Level {
  const i = Math.min(6, Math.max(1, Math.round(n))) - 1;
  return LEVELS[i];
}

export function clampLevelIndex(i: number): number {
  return Math.min(5, Math.max(0, i));
}

export function shiftLevel(level: Level, by: number): Level {
  return LEVELS[clampLevelIndex(LEVELS.indexOf(level) + by)];
}

export function maxLevel(a: Level, b: Level): Level {
  return LEVELS.indexOf(a) >= LEVELS.indexOf(b) ? a : b;
}

export function minLevel(a: Level, b: Level): Level {
  return LEVELS.indexOf(a) <= LEVELS.indexOf(b) ? a : b;
}

export function compareLevels(a: Level, b: Level): number {
  return LEVELS.indexOf(a) - LEVELS.indexOf(b);
}

/**
 * Ability scale θ: A1 band = [0.5, 1.5), A2 = [1.5, 2.5) … C2 = [5.5, 6.5].
 */
export function levelFromTheta(theta: number): Level {
  return levelFromNumber(Math.min(6, Math.max(1, Math.floor(theta + 0.5))));
}

export type SubBand = 'low' | 'mid' | 'high';

/** Position inside the CEFR band, e.g. θ=3.3 → B1 high. */
export function subBand(theta: number): SubBand {
  const n = Math.min(6, Math.max(1, Math.floor(theta + 0.5)));
  const pos = theta - (n - 0.5); // 0..1 inside the band
  if (pos < 1 / 3) return 'low';
  if (pos > 2 / 3) return 'high';
  return 'mid';
}

export function isLevel(x: unknown): x is Level {
  return typeof x === 'string' && (LEVELS as readonly string[]).includes(x);
}

export const LEVEL_NAMES: Record<Level, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper intermediate',
  C1: 'Advanced',
  C2: 'Proficient',
};

export const LEVEL_DESCRIPTIONS: Record<Level, string> = {
  A1: 'You can understand and use familiar everyday expressions and very basic phrases, introduce yourself and ask simple personal questions.',
  A2: 'You can handle short routine exchanges about familiar topics — shopping, family, work, directions — and describe your background in simple terms.',
  B1: 'You can deal with most situations while travelling, understand the main points of clear standard speech, and write simple connected text on familiar topics.',
  B2: 'You can understand the main ideas of complex texts, interact with native speakers fluently enough that it is comfortable for both sides, and argue a viewpoint.',
  C1: 'You can understand demanding, longer texts and implicit meaning, express yourself fluently and spontaneously, and use language flexibly for social, academic and professional purposes.',
  C2: 'You can understand virtually everything you hear or read, summarise information from different sources, and express yourself precisely, distinguishing finer shades of meaning.',
};
