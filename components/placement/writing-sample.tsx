'use client';

import { useState } from 'react';
import { PenLine, Sparkles } from 'lucide-react';
import { AiErrorNotice, AiNotice, useAiState } from '@/components/ai/ai-ui';
import { LevelBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/misc';
import { WRITING_BY_ID } from '@/content/writing/tasks';
import { aiRequest } from '@/lib/ai/client';
import type { Level } from '@/lib/cefr';
import { db } from '@/lib/db';
import type { Assessment } from '@/lib/db/types';
import { logFeedbackMistakes, updateWritingSkill, wordCountOf } from '@/lib/writing/store';

/** One writing task per level for the optional, AI-graded writing part of the placement test. */
const PLACEMENT_TASK: Record<Level, string> = {
  A1: 'a1-w-vorstellung',
  A2: 'a2-w-wochenende',
  B1: 'b1-w-handyverbot',
  B2: 'b2-w-homeoffice',
  C1: 'c1-w-soziale-medien',
  C2: 'c2-w-essay',
};

const CRITERIA: [keyof NonNullable<Assessment['writing']>['scores'], string][] = [
  ['task', 'Task'],
  ['coherence', 'Coherence'],
  ['range', 'Range'],
  ['accuracy', 'Accuracy'],
];

/** Optional writing sample after the placement test, graded by AI (only shown when AI is configured). */
export function WritingSample({ assessment }: { assessment: Assessment }) {
  const ai = useAiState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const level: Level = assessment.overall?.level ?? 'B1';
  const task = WRITING_BY_ID[PLACEMENT_TASK[level]];

  if (assessment.writing) {
    const w = assessment.writing;
    return (
      <Card className="space-y-3">
        <CardTitle icon={<PenLine className="size-4 text-accent" />}>Writing sample</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">Assessed writing level</span>
          <LevelBadge level={w.level} large />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CRITERIA.map(([key, label]) => (
            <div key={key} className="rounded-xl bg-surface-2 px-3 py-2 text-center">
              <p className="text-xs text-muted">{label}</p>
              <p className="font-semibold tabular-nums">{w.scores[key]} / 5</p>
            </div>
          ))}
        </div>
        <p className="text-sm">{w.summary}</p>
      </Card>
    );
  }
  if (ai.state !== 'ready' && ai.state !== 'needs-notice') return null;
  if (!task) return null;

  const grade = async () => {
    setBusy(true);
    setError(null);
    try {
      const out = await aiRequest('grade-writing', { text: text.trim(), prompt: `${task.prompt} Inhaltspunkte: ${task.points.join('; ')}.`, level });
      await db.assessments.update(assessment.id, {
        writing: { taskId: task.id, text: text.trim(), level: out.level, scores: out.scores, summary: out.summary, errors: out.errors },
      });
      await updateWritingSkill(out.level, 1, 'placement');
      await logFeedbackMistakes(out.errors, 'Placement writing');
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="space-y-3">
      <CardTitle icon={<Sparkles className="size-4 text-accent" />}>Optional: writing sample</CardTitle>
      <p className="text-sm text-muted">Add a short text to also get a writing level. It is assessed by AI against CEFR criteria (task, coherence, range, accuracy).</p>
      {!open ? (
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <PenLine className="size-4" /> Write a sample
        </Button>
      ) : ai.state === 'needs-notice' ? (
        <AiNotice compact />
      ) : (
        <>
          <p className="font-medium" lang="de">
            {task.prompt}
          </p>
          <ul className="list-disc pl-5 text-sm">
            {task.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            lang="de"
            aria-label="Writing sample"
            className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-base focus:border-accent focus:outline-none"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-muted tabular-nums">
              {wordCountOf(text)} / {task.words[0]}–{task.words[1]} words
            </span>
            <Button onClick={grade} disabled={busy || wordCountOf(text) < Math.round(task.words[0] * 0.5)}>
              {busy ? <Spinner className="size-4" /> : <Sparkles className="size-4" />} Assess my writing
            </Button>
          </div>
          {error !== null && <AiErrorNotice error={error} />}
        </>
      )}
    </Card>
  );
}
