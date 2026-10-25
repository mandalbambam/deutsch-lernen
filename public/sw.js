/* Deutsch Lernen — service worker for offline use (hand-written, no build plugin).
 *
 * - Page shells: precached on install (all routes are static shells; content comes from
 *   IndexedDB and /data), served cache-first. A new deploy registers /sw.js?v=<build>,
 *   which installs a fresh page cache.
 * - /_next/static/*: immutable hashed assets, cache-first. Install also caches every asset
 *   referenced by the page shells, so all routes work offline after the first visit.
 * - /data/*: hashed JSON files, cache-first; manifest.json network-first.
 * - /api/*: never cached (AI features need the network).
 * - RSC requests are left to Next.js: when they fail offline, the router falls back to a
 *   full navigation, which this worker answers from the page cache.
 */
const VERSION = new URL(self.location.href).searchParams.get('v') || 'dev';
const PAGES_CACHE = `pages-${VERSION}`;
const ASSETS_CACHE = 'assets-v1';
const DATA_CACHE = 'data-v1';
const MISC_CACHE = 'misc-v1';

// Keep in sync with the routes in app/ (query parameters select content inside a page).
const PAGES = [
  '/',
  '/session',
  '/onboarding',
  '/placement',
  '/placement/results',
  '/cards',
  '/cards/browse',
  '/learn',
  '/grammar',
  '/grammar/topic',
  '/reading',
  '/reading/text',
  '/listening',
  '/writing',
  '/conversation',
  '/progress',
  '/resources',
  '/settings',
  '/about',
];

const ASSET_RE = /\/_next\/static\/[^"'\s)\\]+/g;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const pages = await caches.open(PAGES_CACHE);
      const assets = await caches.open(ASSETS_CACHE);
      const found = new Set();
      await Promise.all(
        PAGES.map(async (path) => {
          try {
            const res = await fetch(path, { cache: 'no-store', credentials: 'same-origin' });
            if (!res.ok) return;
            const html = await res.clone().text();
            await pages.put(path, res);
            for (const m of html.matchAll(ASSET_RE)) found.add(m[0]);
          } catch {
            /* offline during install: the page is cached on first visit instead */
          }
        }),
      );
      await Promise.all(
        [...found].map(async (url) => {
          if (await assets.match(url, { ignoreSearch: true })) return;
          try {
            const r = await fetch(url);
            if (r.ok) await assets.put(url, r);
          } catch {
            /* ignore */
          }
        }),
      );
      const misc = await caches.open(MISC_CACHE);
      await Promise.all(
        ['/manifest.webmanifest', '/pwa-icons/icon-192.png', '/pwa-icons/icon-512.png'].map((u) =>
          fetch(u)
            .then((r) => (r.ok ? misc.put(u, r) : undefined))
            .catch(() => undefined),
        ),
      );
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) {
        if (key.startsWith('pages-') && key !== PAGES_CACHE) await caches.delete(key);
      }
      // keep the asset cache bounded across many deploys (oldest entries first)
      const assets = await caches.open(ASSETS_CACHE);
      const keys = await assets.keys();
      const max = 800;
      if (keys.length > max) await Promise.all(keys.slice(0, keys.length - max).map((k) => assets.delete(k)));
      await self.clients.claim();
    })(),
  );
});

async function cacheFirst(request, cacheName, ignoreSearch = false) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request, { ignoreSearch });
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok && res.type === 'basic') cache.put(request, res.clone());
  return res;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch (e) {
    const hit = await cache.match(request);
    if (hit) return hit;
    throw e;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const update = fetch(request)
    .then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => hit);
  return hit || update;
}

async function page(request, url) {
  const cache = await caches.open(PAGES_CACHE);
  const key = PAGES.includes(url.pathname) ? url.pathname : null;
  if (key) {
    const hit = await cache.match(key);
    if (hit) return hit;
  }
  try {
    const res = await fetch(request);
    if (key && res.ok) cache.put(key, res.clone());
    return res;
  } catch {
    const fallback = (key && (await cache.match(key))) || (await cache.match('/'));
    if (fallback) return fallback;
    return new Response(
      '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Offline</title><body style="font-family:system-ui;padding:2rem"><h1>Offline</h1><p>Open the app once while online so it can be stored on this device.</p>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;
  if (request.headers.get('RSC') || url.searchParams.has('_rsc')) return;

  if (request.mode === 'navigate') {
    event.respondWith(page(request, url));
  } else if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, ASSETS_CACHE, true));
  } else if (url.pathname === '/data/manifest.json') {
    event.respondWith(networkFirst(request, DATA_CACHE));
  } else if (url.pathname.startsWith('/data/')) {
    event.respondWith(cacheFirst(request, DATA_CACHE));
  } else if (
    url.pathname === '/manifest.webmanifest' ||
    url.pathname.startsWith('/pwa-icons/') ||
    url.pathname.startsWith('/icon') ||
    url.pathname.startsWith('/apple-icon')
  ) {
    event.respondWith(staleWhileRevalidate(request, MISC_CACHE));
  }
});
