'use client';

import { useEffect, useState } from 'react';
import { ScriptPlayer } from '@/components/listening/script-player';
import { Cloze } from '@/components/practice/cloze';
import { Dictation } from '@/components/practice/dictation';
import type { PracticeResult } from '@/components/practice/shell';
import { TextReader } from '@/components/reading/text-reader';
import { Loading } from '@/components/ui/misc';
import type { ListeningScript } from '@/content/listening/scripts';
import type { ReadingText } from '@/content/reading';
import type { Level } from '@/lib/cefr';
import { getProfile } from '@/lib/db/profile';
import { completedIds } from '@/lib/reading/progress';
import { nextScript, nextText } from '@/lib/reading/select';
import { useTts } from '@/lib/speech/use-tts';

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(n)));

/** Reading in the daily session: the next graded text, or gap-filling with real sentences when all are read. */
export function ReadingBlock({ level, minutes, seed, onDone }: { level: Level; minutes: number; seed: string; onDone: (r: PracticeResult) => void }) {
  const [pick, setPick] = useState<{ text?: ReadingText } | null>(null);

  useEffect(() => {
    if (pick) return;
    let cancelled = false;
    Promise.all([getProfile(), completedIds('reading')]).then(([profile, done]) => {
      if (!cancelled) setPick({ text: nextText(level, profile.interests, done) });
    });
    return () => {
      cancelled = true;
    };
  }, [pick, level]);

  if (!pick) return <Loading />;
  if (pick.text) return <TextReader text={pick.text} onFinished={onDone} doneLabel="Continue" />;
  return <Cloze level={level} count={clamp(minutes * 1.2, 4, 10)} seed={seed} onDone={onDone} />;
}

/** Listening in the daily session: the next dialogue/talk, or dictation when all are done. */
export function ListeningBlock({ level, minutes, seed, onDone }: { level: Level; minutes: number; seed: string; onDone: (r: PracticeResult) => void }) {
  const tts = useTts();
  const [pick, setPick] = useState<{ script?: ListeningScript } | null>(null);

  useEffect(() => {
    if (pick) return;
    let cancelled = false;
    Promise.all([getProfile(), completedIds('listening')]).then(([profile, done]) => {
      if (!cancelled) setPick({ script: nextScript(level, profile.interests, done) });
    });
    return () => {
      cancelled = true;
    };
  }, [pick, level]);

  if (!pick) return <Loading />;
  if (pick.script) return <ScriptPlayer script={pick.script} onFinished={onDone} doneLabel="Continue" />;
  if (!tts.hasGerman) return <Cloze level={level} count={clamp(minutes * 1.2, 4, 10)} seed={seed} onDone={onDone} />;
  return <Dictation level={level} count={clamp(minutes * 0.8, 3, 8)} seed={seed} onDone={onDone} />;
}
