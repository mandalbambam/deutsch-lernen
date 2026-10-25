export { LEVELS, subBand } from './cefr';

/** θ (0.5–6.5) → 0–100 % along an A1–C2 scale. */
export function thetaToPercent(theta: number): number {
  return Math.max(0, Math.min(100, ((theta - 0.5) / 6) * 100));
}

export const SUB_BAND_LABEL = { low: 'lower', mid: 'solid', high: 'upper' } as const;
