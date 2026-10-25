import type { NextConfig } from 'next';

// Changes on every deploy; versions the service-worker caches.
const buildId = (process.env.VERCEL_GIT_COMMIT_SHA ?? Date.now().toString(36)).slice(0, 12);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
      {
        // generated data files carry a content hash in their name
        source: '/data/:dir(lex|verbs|sent|deck)/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/data/manifest.json',
        headers: [{ key: 'Cache-Control', value: 'no-cache' }],
      },
    ];
  },
};

export default nextConfig;
