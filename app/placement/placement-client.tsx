'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Headphones, Volume2 } from 'lucide-react';
import { ListenPlayer } from '@/components/audio/listen-player';
import { ChoiceQuestion, type Selection } from '@/components/placement/choice-question';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, PageHeader } from '@/components/ui/card';
import { Loading, Notice, ProgressBar } from '@/components/ui/misc';
import { ITEM_BY_ID, PASSAGE_BY_ID } from '@/content/placement';
import type { Assessment, TestedSkill } from '@/lib/db/types';
import { useT } from '@/lib/i18n';
import { errorTagsFor, optionOrder } from '@/lib/placement/analysis';
import { advance, expectedLength, record, type EngineState } from '@/lib/placement/engine';
import {
  BANK,
  discardAssessment,
  finishAssessment,
  getInProgress,
  responseFor,
  saveProgress,
  startAssessment,
} from '@/lib/placement/store';
import { useTts } from '@/lib/speech/use-tts';

const MAX_PLAYS = 3;

type Phase = 'loading' | 'intro' | 'test' | 'finishing';

export function PlacementClient({
  kind = 'placement',
  priorTheta,
}: {
  kind?: Assessment['kind'];
  priorTheta?: number;
}) {
  const t = useT();
  const router = useRouter();
  const tts = useTts();
  const [phase, setPhase] = useState<Phase>('loading');
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [resumable, setResumable] = useState<Assessment | null>(null);
  const [skipListening, setSkipListening] = useState(false);
  const [selection, setSelection] = useState<{ id?: string; value: Selection }>({ value: null });
  const [plays, setPlays] = useState<Record<string, number>>({});
  const shownAt = useRef(0);

  // Load an unfinished test once. Pages stay mounted (hidden) between navigations and their
  // effects re-run when shown again, so this must not reset a test that is already running.
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    getInProgress(kind).then((a) => {
      setResumable(a ?? null);
      setPhase((p) => (p === 'loading' ? 'intro' : p));
    });
  }, [kind]);
  const [starting, setStarting] = useState(false);

  const noVoice = tts.ready && (!tts.supported || !tts.hasGerman);
  const skipListen = skipListening || noVoice;

  const engine = assessment?.engine as EngineState | undefined;
  const itemId = engine?.pending[0];
  const item = itemId ? ITEM_BY_ID[itemId] : undefined;
  const passage = item?.passageId ? PASSAGE_BY_ID[item.passageId] : undefined;
  const order = useMemo(() => (item && engine ? optionOrder(item, engine.seed) : []), [item, engine]);

  // the selection belongs to the item it was made for
  const selected: Selection = selection.id === itemId ? selection.value : null;
  const setSelected = useCallback((value: Selection) => setSelection({ id: itemId, value }), [itemId]);

  useEffect(() => {
    shownAt.current = Date.now();
  }, [itemId]);

  const begin = async () => {
    if (starting) return;
    setStarting(true);
    const skills: TestedSkill[] = ['grammar', 'vocabulary', 'reading', ...(skipListen ? [] : (['listening'] as const))];
    try {
      const a = await startAssessment(kind, skills, priorTheta);
      setPlays({});
      setAssessment(a);
      setPhase('test');
    } finally {
      setStarting(false);
    }
  };

  const resume = () => {
    if (!resumable) return;
    setAssessment(resumable);
    setPhase('test');
  };

  const restart = async () => {
    if (resumable) await discardAssessment(resumable.id);
    setResumable(null);
  };

  const submit = useCallback(async () => {
    if (!assessment || !engine || !item || selected === null) return;
    tts.stop();
    const choice = selected === 'dk' ? null : selected;
    const correct = choice === 0;
    const response = responseFor(item.id, choice, Date.now() - shownAt.current, errorTagsFor(item, choice, correct));
    let next = record(engine, {
      itemId: item.id,
      skill: item.skill,
      level: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(item.level) + 1,
      correct,
      guess: choice === null ? 0 : 1 / item.options.length,
    });
    next = advance(next, BANK);
    const updated: Assessment = { ...assessment, engine: next, responses: [...assessment.responses, response] };
    setAssessment(updated);
    if (next.finished) {
      setPhase('finishing');
      const done = await finishAssessment(updated);
      router.push(`/placement/results?id=${done.id}`);
    } else {
      await saveProgress(updated);
    }
  }, [assessment, engine, item, selected, router, tts]);

  if (phase === 'loading') return <Loading label={t.common.loading} />;
  if (phase === 'finishing') return <Loading label={t.placement.finishing} />;

  if (phase === 'intro') {
    const title = kind === 'placement' ? t.placement.title : 'Level check';
    return (
      <>
        <PageHeader title={title} subtitle={t.placement.sections} />
        <div className="space-y-4">
          <Card className="space-y-3">
            <p>{kind === 'placement' ? t.placement.intro : 'A short adaptive quiz (12–20 questions) to check whether your level has changed. Use “I don’t know” instead of guessing.'}</p>
            <p className="flex items-center gap-2 text-sm text-muted">
              <Clock className="size-4" /> {kind === 'placement' ? t.placement.duration : '≈ 10 minutes'}
            </p>
          </Card>

          <Card className="space-y-3">
            <h2 className="flex items-center gap-2 font-semibold">
              <Headphones className="size-5 text-accent" /> {t.placement.audioCheck}
            </h2>
            <p className="text-sm text-muted">{t.placement.audioCheckBody}</p>
            {noVoice ? (
              <Notice tone="warning">{t.placement.noVoice}</Notice>
            ) : (
              <Button variant="secondary" onClick={() => tts.say('Hallo! Können Sie mich gut hören? Dann kann es losgehen.')} disabled={!tts.ready}>
                <Volume2 className="size-4" /> {t.common.play}
              </Button>
            )}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="size-4 accent-[var(--accent)]"
                checked={skipListen}
                disabled={noVoice}
                onChange={(e) => setSkipListening(e.target.checked)}
              />
              {t.placement.skipListening}
            </label>
          </Card>

          {resumable ? (
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={resume}>
                {t.placement.resume} ({resumable.responses.length})
              </Button>
              <Button size="lg" variant="secondary" onClick={restart}>
                {t.placement.restart}
              </Button>
            </div>
          ) : (
            <Button size="lg" onClick={begin} disabled={starting}>
              {t.placement.begin}
            </Button>
          )}
        </div>
      </>
    );
  }

  if (!engine || !item) return <Loading label={t.common.loading} />;

  const answered = assessment!.responses.length;
  const total = expectedLength(engine);
  const skillLabel = t.skills[item.skill];
  const passagePlays = passage ? (plays[passage.id] ?? 0) : 0;

  return (
    <div className="animate-fade-in space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3 text-sm">
          <Badge tone="accent">
            {item.skill === 'listening' ? <Headphones className="size-3.5" /> : <BookOpen className="size-3.5" />}
            {skillLabel}
          </Badge>
          <span className="text-muted tabular-nums">
            {t.placement.question} {answered + 1} {t.placement.of} {total}
          </span>
        </div>
        <ProgressBar value={answered} max={total} label="Test progress" />
      </div>

      {passage && (
        <Card className="space-y-3">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">{passage.kind}</p>
          {passage.skill === 'reading' ? (
            <div className="reading-text whitespace-pre-line" lang="de">
              {passage.text}
            </div>
          ) : (
            <>
              {passage.context && (
                <p className="text-sm" lang="de">
                  {passage.context}
                </p>
              )}
              <p className="text-sm text-muted">{t.placement.listenFirst}</p>
              <ListenPlayer
                text={passage.text}
                lines={passage.lines}
                playsLeft={MAX_PLAYS - passagePlays}
                onPlayed={() => setPlays((p) => ({ ...p, [passage.id]: (p[passage.id] ?? 0) + 1 }))}
              />
            </>
          )}
        </Card>
      )}

      <Card>
        <ChoiceQuestion item={item} order={order} selected={selected} onSelect={setSelected} onSubmit={submit} />
      </Card>

      <div className="flex items-center justify-between gap-3">
        <p className="hidden text-xs text-muted sm:block">Keys: 1–{order.length} choose · 0 don’t know · Enter next</p>
        <Button size="lg" onClick={submit} disabled={selected === null} className="ml-auto">
          {t.common.next}
        </Button>
      </div>
    </div>
  );
}
