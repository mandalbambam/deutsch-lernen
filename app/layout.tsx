import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/shell/providers';
import { THEME_SCRIPT } from '@/lib/theme';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Deutsch Lernen', template: '%s · Deutsch Lernen' },
  description: 'Free, offline-capable German learning app from A1 to C2: placement test, spaced repetition, grammar, reading, listening and an optional AI coach.',
  applicationName: 'Deutsch Lernen',
  appleWebApp: { capable: true, title: 'Deutsch', statusBarStyle: 'default' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f6fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f19' },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
