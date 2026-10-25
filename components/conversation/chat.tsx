'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronDown, Mic, RotateCcw, Send, Square, Volume2 } from 'lucide-react';
import { AiErrorNotice } from '@/components/ai/ai-ui';
import { UmlautKeys } from '@/components/exercise/umlaut-keys';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner, Switch } from '@/components/ui/misc';
import type { Scenario } from '@/content/conversation/scenarios';
import { useActivityTimer } from '@/lib/activity';
import { aiRequest } from '@/lib/ai/client';
import { cn } from '@/lib/cn';
import { logChatMistakes, updateMessages, useConversation } from '@/lib/conversation/store';
import { listen, recognitionSupported, type ListenHandle } from '@/lib/speech/stt';
import { useTts } from '@/lib/speech/use-tts';

export function ScenarioHeader({ scenario }: { scenario: Scenario }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="space-y-2">
      <p className="text-sm text-muted">{scenario.setting}</p>
      <p>
        <span className="font-semibold">Your goal:</span> {scenario.goal}
      </p>
      {scenario.focus && (
        <p className="text-sm">
          <span className="font-semibold">Focus:</span> {scenario.focus}
        </p>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex items-center gap-1 text-sm font-medium text-accent">
        Useful phrases <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul className="flex flex-wrap gap-1.5" lang="de">
          {scenario.phrases.map((p) => (
            <li key={p} className="rounded-lg bg-surface-2 px-2 py-1 text-sm">
              {p}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

/** AI role-play chat, persisted in IndexedDB. */
export function Chat({ scenario, conversationId, onRestart }: { scenario: Scenario; conversationId: string; onRestart: () => void }) {
  const conv = useConversation(conversationId);
  const tts = useTts();
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [autoRead, setAutoRead] = useState(true);
  const [recording, setRecording] = useState<ListenHandle | null>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const spokenCount = useRef(0);
  useActivityTimer('conversation', true);

  const messages = conv?.messages ?? [];
  const done = !!(conv?.summary as { done?: boolean } | undefined)?.done;
  const count = messages.length;
  const lastMessage = messages[count - 1];
  const { say, hasGerman } = tts;

  // scroll to the newest message and read new partner replies aloud (not the history on load)
  useEffect(() => {
    if (count === 0) return;
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    if (count > spokenCount.current) {
      if (spokenCount.current > 0 && lastMessage?.role === 'partner' && autoRead && hasGerman) say(lastMessage.text);
      spokenCount.current = count;
    }
  }, [count, lastMessage, autoRead, hasGerman, say]);

  const ask = async (history: { role: 'user' | 'partner'; text: string }[]) => {
    if (!conv) return;
    setBusy(true);
    setError(null);
    try {
      const out = await aiRequest('conversation', { scenarioId: scenario.id, level: conv.level, history: history.slice(-20) }, { cache: false });
      const lastUser = [...history].reverse().find((m) => m.role === 'user')?.text ?? '';
      await updateMessages(
        conv.id,
        (msgs) => {
          const copy = [...msgs];
          // attach the correction to the learner's last message
          for (let i = copy.length - 1; i >= 0; i--) {
            if (copy[i].role === 'user') {
              if (out.correction && out.correction.trim() !== copy[i].text.trim()) copy[i] = { ...copy[i], correction: out.correction, explanation: out.explanation };
              break;
            }
          }
          return [...copy, { role: 'partner', text: out.reply, at: Date.now() }];
        },
        out.done ? { summary: { done: true } } : {},
      );
      if (out.correction && out.correction.trim() !== lastUser.trim()) await logChatMistakes(out.tags, lastUser, out.correction);
    } catch (e) {
      setError(e);
    } finally {
      setBusy(false);
    }
  };

  const send = async () => {
    const text = draft.trim();
    if (!text || busy || !conv) return;
    recording?.stop();
    setDraft('');
    tts.stop();
    await updateMessages(conv.id, (msgs) => [...msgs, { role: 'user', text, at: Date.now() }]);
    await ask([...messages.map((m) => ({ role: m.role, text: m.text })), { role: 'user', text }]);
  };

  const toggleMic = async () => {
    if (recording) {
      recording.stop();
      return;
    }
    tts.stop();
    const base = draft ? `${draft.trim()} ` : '';
    const handle = listen((partial) => setDraft(base + partial));
    setRecording(handle);
    try {
      const text = await handle.result;
      if (text) setDraft(base + text);
    } catch {
      /* permission denied or no speech */
    } finally {
      setRecording(null);
    }
  };

  if (!conv) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted">
          You are talking to <span className="font-semibold text-fg">{scenario.partner.name}</span> ({scenario.partner.role})
        </p>
        {tts.hasGerman && <Switch checked={autoRead} onChange={setAutoRead} label="Read replies aloud" />}
      </div>

      <div className="space-y-3" aria-live="polite">
        {messages.map((m, i) =>
          m.role === 'partner' ? (
            <div key={i} className="flex max-w-[85%] items-start gap-2">
              <div className="rounded-2xl rounded-tl-sm border border-line bg-surface px-3.5 py-2.5" lang="de">
                {m.text}
              </div>
              {tts.hasGerman && (
                <button type="button" onClick={() => tts.say(m.text)} className="mt-1 rounded-lg p-1.5 text-muted hover:bg-surface-2" aria-label="Read aloud">
                  <Volume2 className="size-4" />
                </button>
              )}
            </div>
          ) : (
            <div key={i} className="ml-auto flex max-w-[85%] flex-col items-end gap-1">
              <div className="rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-accent-fg" lang="de">
                {m.text}
              </div>
              {m.correction && (
                <div className="rounded-xl border border-warning/40 bg-warning-soft px-3 py-2 text-sm">
                  <p lang="de">
                    <span className="font-semibold">Better:</span> {m.correction}
                  </p>
                  {m.explanation && <p className="text-muted">{m.explanation}</p>}
                </div>
              )}
            </div>
          ),
        )}
        {busy && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Spinner className="size-4" /> {scenario.partner.name} is typing …
          </div>
        )}
        <div ref={endRef} />
      </div>

      {error !== null && (
        <div className="space-y-2">
          <AiErrorNotice error={error} />
          <Button variant="secondary" size="sm" onClick={() => ask(messages.map((m) => ({ role: m.role, text: m.text })))}>
            <RotateCcw className="size-4" /> Try again
          </Button>
        </div>
      )}

      {done ? (
        <Card className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="size-8 text-success" />
          <p className="font-semibold">Scenario complete — gut gemacht!</p>
          <Button variant="secondary" onClick={onRestart}>
            <RotateCcw className="size-4" /> Start again
          </Button>
        </Card>
      ) : (
        <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] space-y-2 rounded-2xl border border-line bg-surface/95 p-3 backdrop-blur md:bottom-4">
          <div className="flex items-end gap-2">
            <textarea
              ref={areaRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              lang="de"
              aria-label="Your message"
              placeholder="Schreiben Sie auf Deutsch …"
              className="min-w-0 flex-1 resize-none rounded-xl border border-line bg-surface px-3 py-2 text-base focus:border-accent focus:outline-none"
            />
            {recognitionSupported() && (
              <Button variant={recording ? 'danger' : 'secondary'} onClick={toggleMic} aria-label={recording ? 'Stop recording' : 'Speak'}>
                {recording ? <Square className="size-4" /> : <Mic className="size-4" />}
              </Button>
            )}
            <Button onClick={send} disabled={!draft.trim() || busy} aria-label="Send">
              <Send className="size-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <UmlautKeys target={areaRef} onInsert={setDraft} />
            <button type="button" onClick={onRestart} className="text-xs text-muted hover:text-fg">
              New conversation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Practice without AI: listen to and read a model dialogue. */
export function ModelDialogue({ scenario }: { scenario: Scenario }) {
  const tts = useTts();
  const lines = scenario.model.map((l) => ({ speaker: l.speaker === 'A' ? scenario.partner.name : 'Du', text: l.text }));
  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">Model dialogue</p>
        {tts.hasGerman && (
          <Button variant="secondary" size="sm" onClick={() => (tts.speaking ? tts.stop() : tts.sayDialogue(lines))}>
            <Volume2 className="size-4" /> {tts.speaking ? 'Stop' : 'Listen'}
          </Button>
        )}
      </div>
      <p className="text-sm text-muted">Listen, then read your part (the right-hand lines) aloud — or cover them and try to say them yourself.</p>
      <ol className="space-y-2">
        {scenario.model.map((l, i) => (
          <li key={i} className={cn('flex', l.speaker === 'B' && 'justify-end')}>
            <span
              className={cn('max-w-[85%] rounded-2xl px-3.5 py-2', l.speaker === 'A' ? 'rounded-tl-sm border border-line bg-surface' : 'rounded-tr-sm bg-accent-soft')}
              lang="de"
            >
              {l.text}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
