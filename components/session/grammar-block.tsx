'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Volume2 } from 'lucide-react';
import { ExerciseRunner } from '@/components/exercise/exercise-runner';
import { Markdown } from '@/components/markdown';
import type { PracticeResult } from '@/components/practice/shell';
import { LevelBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/misc';
import { LESSON_BY_ID, TOPIC_BY_ID } from '@/content/grammar';
import { cn } from '@/lib/cn';
import { db } from '@/lib/db';
import { markExplanationSeen } from '@/lib/exercise/attempts';
import { generateDrills } from '@/lib/exercise/drill-data';
import type { Exercise } from '@/lib/exercise/types';
import { useTts } from '@/lib/speech/use-tts';

/** Missed exercises first, then new ones, topped up with generated drills, then solved ones. */
async function pickExercises(topicId: string, count: number, seed: string): Promise<Exercise[]> {
  const lesson = LESSON_BY_ID[topicId];
  const topic = TOPIC_BY_ID[topicId];
  if (!lesson || !topic) return [];
  const attempts = await db.attempts.where('itemId').anyOf(lesson.exercises.map((e) => e.id)).toArray();
  const latest = new Map<string, { at: number; correct: boolean }>();
  for (const a of attempts) {
    const cur = latest.get(a.itemId);
    if (!cur || a.at > cur.at) latest.set(a.itemId, { at: a.at, correct: a.correct });
  }
  const missed = lesson.exercises.filter((e) => latest.get(e.id)?.correct === false);
  const fresh = lesson.exercises.filter((e) => !latest.has(e.id));
  const solved = lesson.exercises.filter((e) => latest.get(e.id)?.correct === true);
  let list = [...missed, ...fresh].slice(0, count);
  if (list.length < count && lesson.drills?.length) {
    list = [...list, ...(await generateDrills(lesson.drills, topic.level, count - list.length, seed).catch(() => []))];
  }
  if (list.length < count) list = [...list, ...solved.slice(0, count - list.length)];
  return list;
}

/** Grammar part of the daily session: explanation (first time) and a short set of exercises. */
export function GrammarBlock({ topicId, minutes, seed, onDone }: { topicId?: string; minutes: number; seed: string; onDone: (r: PracticeResult) => void }) {
  const topic = topicId ? TOPIC_BY_ID[topicId] : undefined;
  const lesson = topicId ? LESSON_BY_ID[topicId] : undefined;
  const tts = useTts();
  const [data, setData] = useState<{ seen: boolean; exercises: Exercise[] } | null>(null);
  const [stage, setStage] = useState<'learn' | 'practice' | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!topicId || !lesson || data) return;
    let cancelled = false;
    const count = Math.max(5, Math.min(12, Math.round(minutes * 1.3)));
    Promise.all([db.topicProgress.get(topicId), pickExercises(topicId, count, seed)]).then(([progress, exercises]) => {
      if (!cancelled) setData({ seen: !!progress?.seenExplanation, exercises });
    });
    return () => {
      cancelled = true;
    };
  }, [topicId, lesson, minutes, seed, data]);

  if (!topic || !lesson) {
    return (
      <Card className="space-y-3">
        <p>No grammar topic is planned for today.</p>
        <Button onClick={() => onDone({ correct: 0, total: 0, note: 'no topic' })}>Continue</Button>
      </Card>
    );
  }
  if (!data) return <Loading />;

  const current = stage ?? (data.seen ? 'practice' : 'learn');
  const heading = (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <LevelBadge level={topic.level} />
        <h2 className="text-lg font-semibold">{topic.title}</h2>
      </div>
      <p className="text-sm text-muted" lang="de">
        {topic.de}
      </p>
    </div>
  );

  if (current === 'learn') {
    return (
      <div className="space-y-4">
        <Card className="space-y-4">
          {heading}
          <Markdown text={lesson.explanation} />
        </Card>
        <Card className="space-y-2.5">
          <p className="font-semibold">Examples</p>
          <ul className="space-y-2">
            {lesson.examples.map((ex, i) => (
              <li key={i} className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => tts.say(ex.de)}
                  disabled={!tts.hasGerman}
                  className="mt-0.5 rounded-lg p-1.5 text-muted hover:bg-surface-2 disabled:opacity-40"
                  aria-label={`Listen: ${ex.de}`}
                >
                  <Volume2 className="size-4" />
                </button>
                <div>
                  <p className="font-medium" lang="de">
                    {ex.de}
                  </p>
                  <p className="text-sm text-muted">{ex.en}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Button
          onClick={() => {
            markExplanationSeen(topic.id).catch(() => {});
            setStage('practice');
            window.scrollTo({ top: 0 });
          }}
        >
          Start exercises ({data.exercises.length})
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          {heading}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-sm text-muted hover:bg-surface-2"
          >
            Rule <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
          </button>
        </div>
        {open && <Markdown text={lesson.explanation} className="border-t border-line pt-3 text-sm" />}
      </Card>
      <ExerciseRunner
        exercises={data.exercises}
        title="Exercises"
        topicId={topic.id}
        level={topic.level}
        seed={seed}
        onDone={(r) => onDone(r)}
      />
    </div>
  );
}
