'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Eye, PenLine, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import { AiErrorNotice, AiNotice, AiUnavailableNotice, useAiState } from '@/components/ai/ai-ui';
import { DiffView } from '@/components/exercise/diff-view';
import { UmlautKeys } from '@/components/exercise/umlaut-keys';
import type { PracticeResult } from '@/components/practice/shell';
import { LevelBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/misc';
import { ERROR_TAGS } from '@/content/error-tags';
import { generalChecks, type WritingTask } from '@/content/writing/tasks';
import { useActivityTimer } from '@/lib/activity';
import { aiRequest } from '@/lib/ai/client';
import { cn } from '@/lib/cn';
import { useTts } from '@/lib/speech/use-tts';
import { diffWords } from '@/lib/text/diff';
import { loadDraft, logFeedbackMistakes, saveDraft, saveWriting, updateWritingSkill, wordCountOf, type WritingFeedback } from '@/lib/writing/store';

type Stage = { kind: 'write' } | { kind: 'ai'; feedback?: WritingFeedback; error?: unknown } | { kind: 'self'; checked: Record<string, boolean>; showModel: boolean; saved: boolean };

/** One writing task: write, then AI feedback (optional) or a self-check with a model answer. */
export function WritingTaskView({ task, onFinished, doneLabel = 'Done' }: { task: WritingTask; onFinished?: (r: PracticeResult) => void; doneLabel?: string }) {
  const ai = useAiState();
  const [text, setText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [stage, setStage] = useState<Stage>({ kind: 'write' });
  const [askNotice, setAskNotice] = useState(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);
  useActivityTimer('writing', true);

  useEffect(() => {
    let cancelled = false;
    loadDraft(task.id).then((d) => {
      if (cancelled) return;
      setText((t) => t || d);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [task.id]);

  // autosave the draft
  useEffect(() => {
    if (!loaded) return;
    const id = setTimeout(() => saveDraft(task.id, text), 600);
    return () => clearTimeout(id);
  }, [text, loaded, task.id]);

  const words = wordCountOf(text);
  const [min, max] = task.words;
  const enough = words >= Math.max(5, Math.round(min * 0.4));

  const requestFeedback = async () => {
    if (ai.state === 'needs-notice') {
      setAskNotice(true);
      return;
    }
    setStage({ kind: 'ai' });
    try {
      const feedback = await aiRequest('writing-feedback', { text: text.trim(), prompt: `${task.prompt} Inhaltspunkte: ${task.points.join('; ')}.`, level: task.level });
      setStage({ kind: 'ai', feedback });
      await saveWriting({ taskId: task.id, prompt: task.prompt, text: text.trim(), level: feedback.level, feedback });
      await logFeedbackMistakes(feedback.errors, task.title);
      await updateWritingSkill(feedback.level);
    } catch (error) {
      setStage({ kind: 'ai', error });
    }
  };

  const finish = (score: number) => onFinished?.({ correct: score, total: 1 });

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <LevelBadge level={task.level} />
          <span>{task.genre}</span>
          <span aria-hidden>·</span>
          <span>
            {min}–{max} words
          </span>
        </div>
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="font-medium" lang="de">
          {task.prompt}
        </p>
        <p className="text-sm text-muted">{task.help}</p>
        <ul className="list-disc space-y-0.5 pl-5 text-sm">
          {task.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </Card>

      {stage.kind === 'write' && (
        <>
          <div className="space-y-2">
            <textarea
              ref={areaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              lang="de"
              spellCheck={false}
              aria-label="Your text"
              placeholder="Schreiben Sie hier Ihren Text …"
              className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-base leading-relaxed focus:border-accent focus:outline-none"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <UmlautKeys target={areaRef} onInsert={setText} />
              <span className={cn('text-sm tabular-nums', words < min ? 'text-muted' : words > max * 1.25 ? 'text-warning' : 'text-success')}>
                {words} / {min}–{max} words
              </span>
            </div>
          </div>
          {askNotice && ai.state === 'needs-notice' && <AiNotice compact />}
          {ai.state === 'unavailable' && <AiUnavailableNotice>You can still check your text yourself against a checklist and a model answer.</AiUnavailableNotice>}
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" disabled={!enough} onClick={() => setStage({ kind: 'self', checked: {}, showModel: false, saved: false })}>
              <ClipboardCheck className="size-4" /> Check it myself
            </Button>
            {(ai.state === 'ready' || ai.state === 'needs-notice') && (
              <Button disabled={!enough} onClick={requestFeedback}>
                <Sparkles className="size-4" /> Get AI feedback
              </Button>
            )}
          </div>
        </>
      )}

      {stage.kind === 'ai' && !stage.feedback && !stage.error && (
        <Card className="flex items-center gap-3">
          <Spinner className="size-5" /> <span>Gemini is reading your text … this can take up to half a minute on the free tier.</span>
        </Card>
      )}
      {stage.kind === 'ai' && stage.error !== undefined && (
        <>
          <AiErrorNotice error={stage.error} />
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={() => setStage({ kind: 'write' })}>
              <PenLine className="size-4" /> Back to my text
            </Button>
            <Button onClick={() => setStage({ kind: 'self', checked: {}, showModel: false, saved: false })}>
              <ClipboardCheck className="size-4" /> Check it myself instead
            </Button>
          </div>
        </>
      )}
      {stage.kind === 'ai' && stage.feedback && (
        <>
          <FeedbackView feedback={stage.feedback} original={text.trim()} task={task} />
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={() => setStage({ kind: 'write' })}>
              <RotateCcw className="size-4" /> Revise my text
            </Button>
            {onFinished && <Button onClick={() => finish(1)}>{doneLabel}</Button>}
          </div>
        </>
      )}

      {stage.kind === 'self' && (
        <SelfCheck
          task={task}
          text={text.trim()}
          stage={stage}
          onChange={setStage}
          onBack={() => setStage({ kind: 'write' })}
          onFinished={onFinished ? (score) => finish(score) : undefined}
          doneLabel={doneLabel}
        />
      )}
    </div>
  );
}

function SpeakText({ text }: { text: string }) {
  const tts = useTts();
  if (!tts.hasGerman) return null;
  return (
    <Button variant="ghost" size="sm" onClick={() => (tts.speaking ? tts.stop() : tts.say(text))}>
      <Volume2 className="size-4" /> {tts.speaking ? 'Stop' : 'Listen'}
    </Button>
  );
}

function FeedbackView({ feedback, original, task }: { feedback: WritingFeedback; original: string; task: WritingTask }) {
  const [showModel, setShowModel] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const diff = useMemo(() => diffWords(feedback.corrected, original), [feedback.corrected, original]);
  return (
    <div className="space-y-4">
      <Card className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Your text shows level</span>
          <LevelBadge level={feedback.level} large />
        </div>
        <p>{feedback.summary}</p>
      </Card>

      {feedback.errors.length > 0 && (
        <Card className="space-y-3">
          <CardTitle>Corrections ({feedback.errors.length})</CardTitle>
          <ol className="space-y-3">
            {feedback.errors.map((e, i) => (
              <li key={i} className="space-y-1 rounded-xl bg-surface-2 px-3 py-2">
                <p lang="de">
                  <s className="text-danger">{e.original}</s> → <span className="font-semibold text-success">{e.correction}</span>
                </p>
                <p className="text-sm">{e.explanation}</p>
                {e.tag in ERROR_TAGS && <p className="text-xs text-muted">{ERROR_TAGS[e.tag as keyof typeof ERROR_TAGS].label}</p>}
              </li>
            ))}
          </ol>
        </Card>
      )}

      <Card className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>Your text, corrected</CardTitle>
          <button type="button" onClick={() => setShowChanges((s) => !s)} className="text-sm font-medium text-accent" aria-pressed={showChanges}>
            {showChanges ? 'Show corrected text' : 'Show changes word by word'}
          </button>
        </div>
        {showChanges ? (
          <DiffView diff={diff} />
        ) : (
          <p className="whitespace-pre-line" lang="de">
            {feedback.corrected}
          </p>
        )}
      </Card>

      <Card className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>How a native speaker might write it</CardTitle>
          <SpeakText text={feedback.rewrite} />
        </div>
        <p className="whitespace-pre-line" lang="de">
          {feedback.rewrite}
        </p>
      </Card>

      {(feedback.strengths.length > 0 || feedback.tips.length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {feedback.strengths.length > 0 && (
            <Card className="space-y-2">
              <CardTitle icon={<CheckCircle2 className="size-4 text-success" />}>Strengths</CardTitle>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {feedback.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>
          )}
          {feedback.tips.length > 0 && (
            <Card className="space-y-2">
              <CardTitle icon={<Sparkles className="size-4 text-accent" />}>Next steps</CardTitle>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {feedback.tips.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      <Card className="space-y-2">
        <button type="button" onClick={() => setShowModel((s) => !s)} className="flex items-center gap-2 font-semibold" aria-expanded={showModel}>
          <Eye className="size-4" /> {showModel ? 'Hide' : 'Show'} the model answer
        </button>
        {showModel && <ModelAnswer text={task.model} />}
      </Card>
    </div>
  );
}

function ModelAnswer({ text }: { text: string }) {
  return (
    <div className="space-y-2">
      <SpeakText text={text} />
      <p className="whitespace-pre-line rounded-xl bg-surface-2 px-3 py-2" lang="de">
        {text}
      </p>
    </div>
  );
}

function SelfCheck({
  task,
  text,
  stage,
  onChange,
  onBack,
  onFinished,
  doneLabel,
}: {
  task: WritingTask;
  text: string;
  stage: Extract<Stage, { kind: 'self' }>;
  onChange: (s: Stage) => void;
  onBack: () => void;
  onFinished?: (score: number) => void;
  doneLabel: string;
}) {
  const items = [...task.points.map((p) => `Content: ${p}`), ...generalChecks(task.level)];
  const done = items.filter((i) => stage.checked[i]).length;

  const save = async () => {
    await saveWriting({ taskId: task.id, prompt: task.prompt, text, selfCheck: stage.checked });
    onChange({ ...stage, saved: true });
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <CardTitle icon={<ClipboardCheck className="size-4 text-accent" />}>Check your text</CardTitle>
        <p className="text-sm text-muted">Read your text again and tick what is true. Fix what isn’t before you look at the model answer.</p>
        <p className="whitespace-pre-line rounded-xl bg-surface-2 px-3 py-2" lang="de">
          {text}
        </p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-[var(--accent)]"
                  checked={!!stage.checked[item]}
                  onChange={(e) => onChange({ ...stage, checked: { ...stage.checked, [item]: e.target.checked } })}
                />
                <span className="text-sm">{item}</span>
              </label>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">
          {done} of {items.length} checked
        </p>
      </Card>
      <Card className="space-y-2">
        <button type="button" onClick={() => onChange({ ...stage, showModel: !stage.showModel })} className="flex items-center gap-2 font-semibold" aria-expanded={stage.showModel}>
          <Eye className="size-4" /> {stage.showModel ? 'Hide' : 'Show'} the model answer
        </button>
        {stage.showModel && <ModelAnswer text={task.model} />}
      </Card>
      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="secondary" onClick={onBack}>
          <PenLine className="size-4" /> Edit my text
        </Button>
        {!stage.saved ? (
          <Button onClick={save}>Save to my writing history</Button>
        ) : onFinished ? (
          <Button onClick={() => onFinished(items.length ? done / items.length : 1)}>{doneLabel}</Button>
        ) : (
          <span className="flex items-center gap-1.5 text-sm font-medium text-success">
            <CheckCircle2 className="size-4" /> Saved
          </span>
        )}
      </div>
    </div>
  );
}
