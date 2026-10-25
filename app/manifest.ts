import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Deutsch Lernen',
    short_name: 'Deutsch',
    description: 'Learn German from A1 to C2 — free, offline-capable, private.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#f5f6fa',
    theme_color: '#4f46e5',
    lang: 'en',
    categories: ['education'],
    icons: [
      { src: '/pwa-icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/pwa-icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/pwa-icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: "Today's session", url: '/session' },
      { name: 'Flashcards', url: '/cards' },
    ],
  };
}
