'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { AiBadge, useAiState } from '@/components/ai/ai-ui';
import { WritingTaskView } from '@/components/writing/writing-task';
import { LevelBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card, PageHeader } from '@/components/ui/card';
import { EmptyState, Loading, Segmented } from '@/components/ui/misc';
import { WRITING_BY_ID, WRITING_TASKS } from '@/content/writing/tasks';
import { LEVELS, type Level } from '@/lib/cefr';
import { useT } from '@/lib/i18n';
import { useSkillStates } from '@/lib/db/profile';
import { useWritings } from '@/lib/writing/store';

export function WritingClient() {
  const id = useSearchParams().get('id');
  if (id) return <TaskPage key={id} id={id} />;
  return <WritingIndex />;
}

function WritingIndex() {
  const t = useT();
  const newLabel = t.pages.new;
  const writings = useWritings();
  const states = useSkillStates();
  const ai = useAiState();
  const [chosen, setChosen] = useState<Level | null>(null);
  const level = chosen ?? states?.writing?.level ?? states?.grammar?.level ?? 'A1';

  if (!writings) return <Loading />;
  const tasks = WRITING_TASKS.filter((t) => t.level === level);
  const byTask = new Map<string, number>();
  for (const w of writings) if (w.taskId) byTask.set(w.taskId, (byTask.get(w.taskId) ?? 0) + 1);

  return (
    <div className="space-y-5">
      <PageHeader
        title={t.nav.writing}
        subtitle={t.pages.writingSub}
        action={ai.state === 'ready' || ai.state === 'needs-notice' ? <AiBadge mock={ai.mock} /> : undefined}
      />
      <div className="overflow-x-auto">
        <Segmented ariaLabel="Level" value={level} onChange={setChosen} options={LEVELS.map((l) => ({ value: l, label: l }))} />
      </div>
      <ul className="space-y-2">
        {tasks.map((t) => {
          const n = byTask.get(t.id) ?? 0;
          return (
            <li key={t.id}>
              <Link href={`/writing?id=${t.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors hover:border-accent">
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-sm text-muted">
                    {t.genre} · {t.words[0]}–{t.words[1]} words
                  </p>
                </div>
                {n > 0 ? (
                  <span className="flex shrink-0 items-center gap-1 text-sm text-success">
                    <CheckCircle2 className="size-4" /> {n}×
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">{newLabel}</span>
                )}
                <ChevronRight className="size-4 shrink-0 text-muted" />
              </Link>
            </li>
          );
        })}
      </ul>
      {writings.length > 0 && (
        <Card className="space-y-2">
          <p className="font-semibold">Recent writing</p>
          <ul className="divide-y divide-line">
            {writings.slice(0, 5).map((w) => (
              <li key={w.id} className="flex items-center gap-2 py-2 text-sm">
                {w.level ? <LevelBadge level={w.level} /> : <span className="text-xs text-muted">self-check</span>}
                <span className="min-w-0 flex-1 truncate" lang="de">
                  {w.text}
                </span>
                <span className="shrink-0 text-xs text-muted">{new Date(w.at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

function TaskPage({ id }: { id: string }) {
  const task = WRITING_BY_ID[id];
  if (!task) {
    return (
      <EmptyState title="Writing task not found">
        <ButtonLink href="/writing" variant="secondary">
          All writing tasks
        </ButtonLink>
      </EmptyState>
    );
  }
  return (
    <div className="space-y-4">
      <Link href="/writing" className="flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Writing coach
      </Link>
      <WritingTaskView task={task} />
    </div>
  );
}
