import { ImageResponse } from 'next/og';

/**
 * App icon: a speech bubble in German flag colours with "De".
 * `maskable` keeps the motif inside the safe zone (inner 80%).
 */
export function renderIcon(size: number, { maskable = false } = {}) {
  const pad = maskable ? size * 0.16 : size * 0.06;
  const inner = size - pad * 2;
  const radius = maskable ? 0 : size * 0.22;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#4f46e5',
          borderRadius: radius,
        }}
      >
        <div
          style={{
            width: inner,
            height: inner,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: inner * 0.82,
              height: inner * 0.62,
              borderRadius: inner * 0.14,
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: inner * 0.3,
                fontWeight: 800,
                color: '#111827',
                letterSpacing: -inner * 0.01,
                display: 'flex',
              }}
            >
              De
            </div>
            <div style={{ display: 'flex', width: inner * 0.46, height: inner * 0.05, marginTop: inner * 0.02 }}>
              <div style={{ flex: 1, background: '#111111' }} />
              <div style={{ flex: 1, background: '#dd0000' }} />
              <div style={{ flex: 1, background: '#ffce00' }} />
            </div>
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${inner * 0.09}px solid transparent`,
              borderRight: `${inner * 0.09}px solid transparent`,
              borderTop: `${inner * 0.12}px solid #ffffff`,
              marginTop: -2,
              marginLeft: -inner * 0.3,
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
