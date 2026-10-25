'use client';

import { useEffect, useState } from 'react';
import type { PracticeResult } from '@/components/practice/shell';
import { Loading } from '@/components/ui/misc';
import { WritingTaskView } from '@/components/writing/writing-task';
import { WRITING_TASKS, type WritingTask } from '@/content/writing/tasks';
import type { Level } from '@/lib/cefr';
import { db } from '@/lib/db';
import { hashString } from '@/lib/random';

/** Output block of the daily session: one writing task at the learner's level (new tasks first). */
export function WritingBlock({ level, seed, onDone }: { level: Level; seed: string; onDone: (r: PracticeResult) => void }) {
  const [task, setTask] = useState<WritingTask | null>(null);

  useEffect(() => {
    if (task) return;
    let active = true;
    db.writings.toArray().then((writings) => {
      const done = new Set(writings.map((w) => w.taskId));
      const atLevel = WRITING_TASKS.filter((t) => t.level === level);
      const fresh = atLevel.filter((t) => !done.has(t.id));
      const pool = fresh.length ? fresh : atLevel;
      if (active && pool.length) setTask(pool[hashString(seed) % pool.length]);
    });
    return () => {
      active = false;
    };
  }, [task, level, seed]);

  if (!task) return <Loading />;
  return <WritingTaskView task={task} onFinished={onDone} doneLabel="Continue" />;
}
