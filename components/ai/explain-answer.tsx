'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Spinner } from '@/components/ui/misc';
import type { Level } from '@/lib/cefr';
import { aiErrorMessage, aiRequest } from '@/lib/ai/client';
import { AiNotice, useAiState } from './ai-ui';

/** "Explain my answer": an AI explanation of the learner's specific mistake (optional, cached). */
export function ExplainAnswer({ task, expected, answer, rule, level }: { task: string; expected: string; answer: string; rule: string; level: Level }) {
  const ai = useAiState();
  const [state, setState] = useState<{ kind: 'idle' } | { kind: 'loading' } | { kind: 'done'; text: string; tip?: string } | { kind: 'error'; text: string } | { kind: 'notice' }>({ kind: 'idle' });

  if (ai.state !== 'ready' && ai.state !== 'needs-notice') return null;
  if (state.kind === 'notice' && ai.state === 'needs-notice') return <AiNotice compact />;

  const run = async () => {
    if (ai.state === 'needs-notice') {
      setState({ kind: 'notice' });
      return;
    }
    setState({ kind: 'loading' });
    try {
      const out = await aiRequest('explain-answer', { task, expected, answer, rule, level });
      setState({ kind: 'done', text: out.explanation, tip: out.tip });
    } catch (err) {
      const m = aiErrorMessage(err);
      setState({ kind: 'error', text: `${m.title}: ${m.text}` });
    }
  };

  if (state.kind === 'done') {
    return (
      <div className="space-y-1 rounded-lg bg-surface/70 px-2.5 py-2">
        <p className="flex items-center gap-1 text-xs font-semibold text-accent">
          <Sparkles className="size-3" /> AI explanation
        </p>
        <p>{state.text}</p>
        {state.tip && <p className="text-muted">Tip: {state.tip}</p>}
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={run}
        disabled={state.kind === 'loading'}
        className="inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-medium text-accent hover:bg-surface/70 disabled:opacity-60"
      >
        {state.kind === 'loading' ? <Spinner className="size-3.5" /> : <Sparkles className="size-3.5" />} Explain my answer
      </button>
      {state.kind === 'error' && <p className="text-xs text-muted">{state.text}</p>}
    </div>
  );
}
