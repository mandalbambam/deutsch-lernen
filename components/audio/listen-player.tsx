'use client';

import { Pause, Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { useT } from '@/lib/i18n';
import type { DialogueLine } from '@/lib/speech/tts';
import { useTts } from '@/lib/speech/use-tts';

/**
 * Big play button for listening tasks. `playsLeft` is controlled by the parent so the
 * limit survives re-renders; pass Infinity for unlimited replays.
 */
export function ListenPlayer({
  text,
  lines,
  playsLeft,
  onPlayed,
  rate,
  className,
}: {
  text?: string;
  lines?: DialogueLine[];
  playsLeft: number;
  onPlayed: () => void;
  rate?: number;
  className?: string;
}) {
  const t = useT();
  const tts = useTts();

  if (tts.ready && (!tts.supported || !tts.hasGerman)) {
    return (
      <p className={cn('rounded-xl bg-warning-soft p-3 text-sm', className)}>
        No German text-to-speech voice is available on this device, so this recording cannot be played.
      </p>
    );
  }

  const play = () => {
    if (tts.speaking) {
      tts.stop();
      return;
    }
    if (playsLeft <= 0) return;
    onPlayed();
    if (lines?.length) tts.sayDialogue(lines, rate);
    else if (text) tts.say(text, rate);
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <Button size="lg" onClick={play} disabled={!tts.speaking && playsLeft <= 0} aria-label={tts.speaking ? t.common.stop : t.common.play}>
        {tts.speaking ? <Pause className="size-5" /> : <Play className="size-5" />}
        {tts.speaking ? t.common.stop : t.common.play}
      </Button>
      {playsLeft !== Infinity && (
        <span className="flex items-center gap-1.5 text-sm text-muted">
          <Volume2 className="size-4" aria-hidden />
          {playsLeft} {t.placement.playsLeft}
        </span>
      )}
    </div>
  );
}
