import { BookOpen, BookText, Headphones, Layers, Mic, PenLine } from 'lucide-react';
import { TOPIC_BY_ID } from '@/content/grammar/catalog';
import type { SessionBlock } from '@/lib/db/types';

export function blockTitle(b: SessionBlock): string {
  switch (b.kind) {
    case 'cards':
      return 'Flashcards';
    case 'grammar':
      return b.ref && TOPIC_BY_ID[b.ref] ? `Grammar: ${TOPIC_BY_ID[b.ref].title}` : 'Grammar';
    case 'reading':
      return 'Reading';
    case 'listening':
      return 'Listening';
    case 'output':
      return b.ref === 'speak' ? 'Speaking' : b.ref === 'write' ? 'Writing' : 'Translation';
  }
}

export function BlockIcon({ block, className }: { block: SessionBlock; className?: string }) {
  const Icon =
    block.kind === 'cards'
      ? Layers
      : block.kind === 'grammar'
        ? BookText
        : block.kind === 'reading'
          ? BookOpen
          : block.kind === 'listening'
            ? Headphones
            : block.ref === 'speak'
              ? Mic
              : PenLine;
  return <Icon className={className} aria-hidden />;
}
