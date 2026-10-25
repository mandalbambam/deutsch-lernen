import {
  BarChart3,
  BookOpen,
  BookText,
  ClipboardCheck,
  Headphones,
  Home,
  Info,
  Layers,
  Library,
  MessagesSquare,
  PenLine,
  Settings,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { Messages } from '@/lib/i18n/messages';

export interface NavItem {
  href: string;
  label: (t: Messages) => string;
  icon: LucideIcon;
}

export const SIDEBAR: NavItem[][] = [
  [
    { href: '/', label: (t) => t.nav.today, icon: Home },
    { href: '/session', label: (t) => t.nav.session, icon: Sparkles },
    { href: '/cards', label: (t) => t.nav.flashcards, icon: Layers },
  ],
  [
    { href: '/grammar', label: (t) => t.nav.grammar, icon: BookText },
    { href: '/reading', label: (t) => t.nav.reading, icon: BookOpen },
    { href: '/listening', label: (t) => t.nav.listening, icon: Headphones },
    { href: '/writing', label: (t) => t.nav.writing, icon: PenLine },
    { href: '/conversation', label: (t) => t.nav.conversation, icon: MessagesSquare },
  ],
  [
    { href: '/progress', label: (t) => t.nav.progress, icon: BarChart3 },
    { href: '/placement', label: (t) => t.nav.placement, icon: ClipboardCheck },
    { href: '/resources', label: (t) => t.nav.resources, icon: Library },
    { href: '/settings', label: (t) => t.nav.settings, icon: Settings },
    { href: '/about', label: (t) => t.nav.about, icon: Info },
  ],
];

export const BOTTOM: NavItem[] = [
  { href: '/', label: (t) => t.nav.today, icon: Home },
  { href: '/cards', label: (t) => t.nav.cards, icon: Layers },
  { href: '/learn', label: (t) => t.nav.learn, icon: BookOpen },
  { href: '/progress', label: (t) => t.nav.progress, icon: BarChart3 },
  { href: '/settings', label: (t) => t.nav.settings, icon: Settings },
];

/** Which bottom tab is active for a route. */
export function bottomTabFor(pathname: string): string {
  if (pathname === '/' || pathname.startsWith('/session') || pathname.startsWith('/onboarding')) return '/';
  if (pathname.startsWith('/cards')) return '/cards';
  if (pathname.startsWith('/progress')) return '/progress';
  if (pathname.startsWith('/settings') || pathname.startsWith('/about')) return '/settings';
  return '/learn';
}
