import { LEVELS } from '@/lib/cefr';

export interface Series {
  name: string;
  /** css colour, e.g. var(--accent) */
  color: string;
  points: { x: number; y: number }[];
}

/**
 * Minimal SVG line chart for CEFR progress: y is θ (0.5–6.5) with A1–C2 gridlines, x is time.
 */
export function LevelLineChart({ series, height = 180, formatX }: { series: Series[]; height?: number; formatX?: (x: number) => string }) {
  const all = series.flatMap((s) => s.points);
  if (all.length === 0) return null;
  const width = 600;
  const pad = { l: 34, r: 12, t: 10, b: 24 };
  const xs = all.map((p) => p.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const ys = all.map((p) => p.y);
  const minY = Math.max(0.5, Math.floor(Math.min(...ys)) - 0.5);
  const maxY = Math.min(6.5, Math.ceil(Math.max(...ys)) + 0.5);
  const sx = (x: number) => pad.l + (maxX === minX ? (width - pad.l - pad.r) / 2 : ((x - minX) / (maxX - minX)) * (width - pad.l - pad.r));
  const sy = (y: number) => pad.t + (1 - (y - minY) / (maxY - minY)) * (height - pad.t - pad.b);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Level history chart">
      {LEVELS.map((l, i) => {
        const center = i + 1;
        if (center < minY || center > maxY) return null;
        return (
          <g key={l}>
            <line x1={pad.l} x2={width - pad.r} y1={sy(center)} y2={sy(center)} stroke="var(--line)" strokeDasharray="3 4" />
            <text x={4} y={sy(center) + 4} fontSize="11" fill="var(--muted)">
              {l}
            </text>
          </g>
        );
      })}
      {series.map((s) => {
        const pts = [...s.points].sort((a, b) => a.x - b.x);
        const d = pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ');
        return (
          <g key={s.name}>
            <path d={d} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" />
            {pts.map((p, i) => (
              <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={3.5} fill={s.color} />
            ))}
          </g>
        );
      })}
      {formatX && (
        <>
          <text x={pad.l} y={height - 6} fontSize="11" fill="var(--muted)">
            {formatX(minX)}
          </text>
          {maxX !== minX && (
            <text x={width - pad.r} y={height - 6} fontSize="11" fill="var(--muted)" textAnchor="end">
              {formatX(maxX)}
            </text>
          )}
        </>
      )}
    </svg>
  );
}
