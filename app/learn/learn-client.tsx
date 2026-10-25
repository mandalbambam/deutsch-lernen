'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import { BookOpen, BookText, ChevronRight, ClipboardCheck, Headphones, Layers, Library, MessagesSquare, PenLine } from 'lucide-react';
import { PageHeader } from '@/components/ui/card';
import { TOPICS } from '@/content/grammar';
import { LISTENING } from '@/content/listening/scripts';
import { TEXTS } from '@/content/reading';
import { db } from '@/lib/db';
import { isMastered } from '@/lib/grammar/progress';
import { countDue } from '@/lib/srs/cards';
import { useT } from '@/lib/i18n';
import { fmt } from '@/lib/i18n/messages';

function Tile({ href, icon, title, text, stat }: { href: string; icon: ReactNode; title: string; text: string; stat?: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted">{text}</span>
        {stat && <span className="mt-0.5 block text-xs font-medium text-accent">{stat}</span>}
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted" />
    </Link>
  );
}

export function LearnClient() {
  const t = useT();
  const stats = useLiveQuery(async () => {
    const [topics, texts, due] = await Promise.all([db.topicProgress.toArray(), db.textProgress.toArray(), countDue()]);
    return {
      mastered: topics.filter(isMastered).length,
      read: texts.filter((x) => x.kind === 'reading' && x.completedAt).length,
      heard: texts.filter((x) => x.kind === 'listening' && x.completedAt).length,
      due,
    };
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader title={t.nav.learn} subtitle={t.pages.learnSub} />
      <div className="grid gap-3 md:grid-cols-2">
        <Tile href="/cards" icon={<Layers className="size-5" />} title={t.nav.flashcards} text={t.learn.cards} stat={stats ? fmt(t.learn.dueNow, { n: stats.due }) : undefined} />
        <Tile href="/grammar" icon={<BookText className="size-5" />} title={t.nav.grammar} text={t.learn.grammar} stat={stats ? fmt(t.learn.topicsMastered, { a: stats.mastered, b: TOPICS.length }) : undefined} />
        <Tile href="/reading" icon={<BookOpen className="size-5" />} title={t.nav.reading} text={t.learn.reading} stat={stats ? fmt(t.learn.textsRead, { a: stats.read, b: TEXTS.length }) : undefined} />
        <Tile href="/listening" icon={<Headphones className="size-5" />} title={t.nav.listening} text={t.learn.listening} stat={stats ? fmt(t.learn.tasksDone, { a: stats.heard, b: LISTENING.length }) : undefined} />
        <Tile href="/writing" icon={<PenLine className="size-5" />} title={t.nav.writing} text={t.learn.writing} />
        <Tile href="/conversation" icon={<MessagesSquare className="size-5" />} title={t.nav.conversation} text={t.learn.conversation} />
        <Tile href="/placement" icon={<ClipboardCheck className="size-5" />} title={t.nav.placement} text={t.learn.placement} />
        <Tile href="/resources" icon={<Library className="size-5" />} title={t.nav.resources} text={t.learn.resources} />
      </div>
    </div>
  );
}
