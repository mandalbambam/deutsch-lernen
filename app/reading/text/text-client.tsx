'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { PracticeResult } from '@/components/practice/shell';
import { TextReader } from '@/components/reading/text-reader';
import { ButtonLink } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/misc';
import { TEXT_BY_ID } from '@/content/reading';
import { useProfile } from '@/lib/db/profile';
import { useTextProgress } from '@/lib/reading/progress';
import { nextText } from '@/lib/reading/select';

export function TextClient() {
  const id = useSearchParams().get('id') ?? '';
  return <TextPage key={id} id={id} />;
}

function TextPage({ id }: { id: string }) {
  const text = TEXT_BY_ID[id];
  const [result, setResult] = useState<PracticeResult | null>(null);
  const progress = useTextProgress('reading');
  const profile = useProfile();

  if (!text) {
    return (
      <EmptyState title="Text not found">
        <ButtonLink href="/reading" variant="secondary">
          All texts
        </ButtonLink>
      </EmptyState>
    );
  }

  if (result) {
    const done = new Set([...(progress?.values() ?? [])].filter((p) => p.completedAt).map((p) => p.textId));
    done.add(text.id);
    const next = nextText(text.level, profile.interests, done);
    const pct = result.total ? Math.round((result.correct / result.total) * 100) : 0;
    return (
      <div className="animate-fade-in flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-10 text-center">
        <CheckCircle2 className="size-10 text-success" />
        <p className="text-xl font-bold">Text finished · {pct}% correct</p>
        <p className="text-muted">Words you added are waiting in your flashcards.</p>
        <div className="flex flex-wrap justify-center gap-2">
          {next && (
            <ButtonLink href={`/reading/text?id=${next.id}`}>
              Next: {next.title} <ArrowRight className="size-4" />
            </ButtonLink>
          )}
          <ButtonLink href="/reading" variant="secondary">
            All texts
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/reading" className="flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Reading
      </Link>
      <TextReader text={text} onFinished={setResult} doneLabel="Finish" />
    </div>
  );
}
