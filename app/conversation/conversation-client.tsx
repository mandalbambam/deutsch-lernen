'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ChevronRight, MessagesSquare } from 'lucide-react';
import { AiBadge, AiNotice, AiUnavailableNotice, useAiState } from '@/components/ai/ai-ui';
import { Chat, ModelDialogue, ScenarioHeader } from '@/components/conversation/chat';
import { LevelBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/card';
import { EmptyState, Loading, Segmented } from '@/components/ui/misc';
import { SCENARIO_BY_ID, SCENARIOS, type Scenario } from '@/content/conversation/scenarios';
import { LEVELS, type Level } from '@/lib/cefr';
import { useT } from '@/lib/i18n';
import { latestConversation, startConversation, useConversationCounts } from '@/lib/conversation/store';
import { useSkillStates } from '@/lib/db/profile';

export function ConversationClient() {
  const id = useSearchParams().get('id');
  if (id) return <ScenarioPage key={id} id={id} />;
  return <ConversationIndex />;
}

function ConversationIndex() {
  const t = useT();
  const ai = useAiState();
  const counts = useConversationCounts();
  const states = useSkillStates();
  const [chosen, setChosen] = useState<Level | null>(null);
  const level = chosen ?? states?.listening?.level ?? states?.grammar?.level ?? 'A1';
  if (!counts) return <Loading />;
  const scenarios = SCENARIOS.filter((s) => s.level === level);

  return (
    <div className="space-y-5">
      <PageHeader
        title={t.nav.conversation}
        subtitle={t.pages.conversationSub}
        action={ai.state === 'ready' || ai.state === 'needs-notice' ? <AiBadge mock={ai.mock} /> : undefined}
      />
      {ai.state === 'unavailable' && <AiUnavailableNotice>Without AI, each scenario offers a model dialogue to listen to and useful phrases.</AiUnavailableNotice>}
      <div className="overflow-x-auto">
        <Segmented ariaLabel="Level" value={level} onChange={setChosen} options={LEVELS.map((l) => ({ value: l, label: l }))} />
      </div>
      <ul className="space-y-2">
        {scenarios.map((s) => (
          <li key={s.id}>
            <Link href={`/conversation?id=${s.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-colors hover:border-accent">
              <MessagesSquare className="size-5 shrink-0 text-accent" />
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-muted">{s.setting}</p>
              </div>
              {(counts.get(s.id) ?? 0) > 0 && <span className="shrink-0 text-xs text-muted">{counts.get(s.id)}×</span>}
              <ChevronRight className="size-4 shrink-0 text-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScenarioPage({ id }: { id: string }) {
  const scenario = SCENARIO_BY_ID[id];
  const ai = useAiState();
  if (!scenario) {
    return (
      <EmptyState title="Scenario not found">
        <ButtonLink href="/conversation" variant="secondary">
          All scenarios
        </ButtonLink>
      </EmptyState>
    );
  }
  return (
    <div className="space-y-4">
      <Link href="/conversation" className="flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4" /> Conversation partner
      </Link>
      <header className="flex flex-wrap items-center gap-2">
        <LevelBadge level={scenario.level} />
        <h1 className="text-xl font-bold sm:text-2xl">{scenario.title}</h1>
      </header>
      <ScenarioHeader scenario={scenario} />
      {ai.state === 'loading' && <Loading />}
      {ai.state === 'unavailable' && (
        <>
          <AiUnavailableNotice>Here is a model dialogue to practise with instead.</AiUnavailableNotice>
          <ModelDialogue scenario={scenario} />
        </>
      )}
      {ai.state === 'needs-notice' && <AiNotice />}
      {ai.state === 'ready' && <LiveChat scenario={scenario} />}
    </div>
  );
}

function LiveChat({ scenario }: { scenario: Scenario }) {
  const [convId, setConvId] = useState<string | null>(null);
  // one shared promise: re-run effects (StrictMode, <Activity>) re-attach instead of creating twice
  const pending = useRef<Promise<string> | null>(null);

  useEffect(() => {
    if (convId) return;
    pending.current ??= latestConversation(scenario.id)
      .then((c) => (c && !(c.summary as { done?: boolean } | undefined)?.done ? c : startConversation(scenario, scenario.level)))
      .then((c) => c.id);
    let active = true;
    pending.current.then((id) => {
      if (active) setConvId(id);
    });
    return () => {
      active = false;
    };
  }, [convId, scenario]);

  if (!convId) return <Loading />;
  return <Chat key={convId} scenario={scenario} conversationId={convId} onRestart={() => startConversation(scenario, scenario.level).then((c) => setConvId(c.id))} />;
}
