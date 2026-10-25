'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight, ClipboardCheck, Flame, Clock, Layers, PenLine, CalendarDays } from 'lucide-react';
import { BarChart } from '@/components/charts/bar-chart';
import { SKILL_COLORS } from '@/components/charts/colors';
import { LevelLineChart, type Series } from '@/components/charts/line-chart';
import { SkillScale } from '@/components/charts/skill-scale';
import { LevelBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardTitle, PageHeader } from '@/components/ui/card';
import { Loading, Notice, ProgressBar } from '@/components/ui/misc';
import { ERROR_TAGS } from '@/content/error-tags';
import { TOPIC_BY_ID } from '@/content/grammar';
import { LEVELS } from '@/lib/cefr';
import { ALL_SKILLS, TESTED_SKILLS, type Module } from '@/lib/db/types';
import { formatDate } from '@/lib/format';
import { useLang, useT } from '@/lib/i18n';
import { LEVEL_CHECK_INTERVAL_DAYS, useProgressStats } from '@/lib/progress/stats';

const MODULE_LABEL: Partial<Record<Module, string>> = {
  cards: 'Flashcards',
  grammar: 'Grammar',
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
  conversation: 'Conversation',
  output: 'Speaking & translating',
  placement: 'Placement test',
  levelcheck: 'Level checks',
};

const SOURCE_LABEL = { placement: 'placement test', levelcheck: 'level check', practice: 'practice' } as const;

function fmtMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

function Tile({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <Card className="flex items-center gap-3 p-4 sm:p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs text-muted">{label}</span>
        <span className="block text-xl font-bold tabular-nums">{value}</span>
        {sub && <span className="block text-xs text-muted">{sub}</span>}
      </span>
    </Card>
  );
}

export function ProgressClient() {
  const t = useT();
  const lang = useLang();
  const stats = useProgressStats();
  if (!stats) return <Loading />;

  const weekday = (date: string) => new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(new Date(`${date}T12:00:00`));
  const history: Series[] = [
    { name: 'overall', color: SKILL_COLORS.overall, points: stats.assessments.filter((a) => a.overall).map((a) => ({ x: a.takenAt, y: a.overall!.theta })) },
    ...TESTED_SKILLS.map((s) => ({ name: s, color: SKILL_COLORS[s], points: stats.assessments.filter((a) => a.skills[s]).map((a) => ({ x: a.takenAt, y: a.skills[s]!.theta })) })),
  ];
  const weekTotal = Object.values(stats.weekByModule).reduce((a, b) => a + (b ?? 0), 0);
  const dueNow = stats.forecast[0];

  return (
    <div className="space-y-5">
      <PageHeader title={t.nav.progress} subtitle={t.pages.progressSub} />

      {!stats.levelCheck.hasPlacement ? (
        <Notice tone="info" title="No placement test yet">
          Take the placement test to see your level per skill. <Link href="/placement" className="font-medium text-accent underline-offset-2 hover:underline">Start now</Link>
        </Notice>
      ) : stats.levelCheck.due ? (
        <Card className="flex flex-wrap items-center justify-between gap-3 border-accent/40 bg-accent-soft">
          <span className="flex items-center gap-2">
            <ClipboardCheck className="size-5 text-accent" />
            <span>
              <span className="font-semibold">Time for a level check.</span> Your last test was {stats.levelCheck.daysSince} days ago — a 10-minute quiz shows how far you’ve come.
            </span>
          </span>
          <ButtonLink href="/placement?mode=check" size="sm">
            Start level check
          </ButtonLink>
        </Card>
      ) : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile icon={<Flame className="size-5" />} label="Streak" value={`${stats.streak} ${stats.streak === 1 ? 'day' : 'days'}`} sub={`${stats.daysActive} active days in total`} />
        <Tile icon={<Clock className="size-5" />} label="Time studied" value={fmtMinutes(stats.totalMinutes)} sub={`${fmtMinutes(Math.round(weekTotal / 60))} this week`} />
        <Tile icon={<Layers className="size-5" />} label="Words learned" value={String(stats.cards.learned)} sub={`${stats.cards.learning} in progress`} />
        <Tile icon={<BookOpen className="size-5" />} label="Grammar mastered" value={`${stats.grammar.mastered}`} sub={`of ${Object.values(stats.grammar.byLevel).reduce((a, b) => a + b.total, 0)} topics`} />
      </div>

      <Card className="space-y-4">
        <CardTitle>Levels per skill</CardTitle>
        <ul className="space-y-4">
          {ALL_SKILLS.map((skill) => {
            const s = stats.skills[skill];
            return (
              <li key={skill} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="inline-block size-2.5 rounded-full" style={{ background: SKILL_COLORS[skill] }} />
                    {t.skills[skill as keyof typeof t.skills] ?? skill}
                  </span>
                  {s ? (
                    <span className="flex items-center gap-2 text-xs text-muted">
                      from {SOURCE_LABEL[s.source]} · {formatDate(s.updatedAt, lang)}
                      <LevelBadge level={s.level} />
                    </span>
                  ) : (
                    <span className="text-xs text-muted">{skill === 'writing' ? 'not measured yet — use the writing coach' : 'not measured yet'}</span>
                  )}
                </div>
                {s && <SkillScale theta={s.theta} se={s.se} label={`${skill} level`} />}
              </li>
            );
          })}
        </ul>
        {stats.levelCheck.hasPlacement && !stats.levelCheck.due && stats.levelCheck.daysSince !== undefined && (
          <p className="text-xs text-muted">
            Next level check suggested in {Math.max(0, LEVEL_CHECK_INTERVAL_DAYS - stats.levelCheck.daysSince)} days ·{' '}
            <Link href="/placement?mode=check" className="text-accent hover:underline">
              take one now
            </Link>
          </p>
        )}
      </Card>

      {history[0].points.length >= 2 && (
        <Card className="space-y-3">
          <CardTitle>Level history</CardTitle>
          <LevelLineChart series={history} formatX={(x) => formatDate(x, lang, { day: 'numeric', month: 'short' })} />
          <div className="flex flex-wrap gap-3 text-xs">
            {history.map((s) => (
              <span key={s.name} className="flex items-center gap-1.5">
                <span className="inline-block size-2.5 rounded-full" style={{ background: s.color }} />
                {s.name === 'overall' ? t.placement.overall : t.skills[s.name as keyof typeof t.skills]}
              </span>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="space-y-3">
          <CardTitle icon={<CalendarDays className="size-4 text-accent" />}>Study time · last 14 days</CardTitle>
          <BarChart
            ariaLabel="Minutes studied per day"
            bars={stats.minutesByDay.map((d, i) => ({ label: weekday(d.date).slice(0, 2), value: d.minutes, highlight: i === stats.minutesByDay.length - 1 }))}
            format={(v) => `${v} min`}
          />
          {weekTotal > 0 && (
            <ul className="space-y-1 text-sm">
              {Object.entries(stats.weekByModule)
                .filter(([, s]) => (s ?? 0) >= 60)
                .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
                .map(([m, s]) => (
                  <li key={m} className="flex items-center justify-between gap-2">
                    <span>{MODULE_LABEL[m as Module] ?? m}</span>
                    <span className="text-muted tabular-nums">{fmtMinutes(Math.round((s ?? 0) / 60))}</span>
                  </li>
                ))}
            </ul>
          )}
        </Card>

        <Card className="space-y-3">
          <CardTitle icon={<Layers className="size-4 text-accent" />}>Flashcard reviews · next 14 days</CardTitle>
          <BarChart
            ariaLabel="Reviews due per day"
            bars={stats.forecast.map((n, i) => ({ label: weekday(stats.forecastDates[i]).slice(0, 2), value: n, highlight: i === 0 }))}
          />
          <p className="text-sm text-muted">
            {dueNow > 0 ? `${dueNow} reviews due now · ` : 'Nothing due right now · '}
            {stats.cards.total} cards in total, {stats.cards.fresh} not started yet.
          </p>
          {dueNow > 0 && (
            <ButtonLink href="/cards" size="sm" variant="secondary">
              Review now
            </ButtonLink>
          )}
        </Card>
      </div>

      <Card className="space-y-3">
        <CardTitle>Recurring mistakes</CardTitle>
        {stats.mistakes.length === 0 ? (
          <p className="text-sm text-muted">No mistakes recorded yet. They appear here from tests, exercises, writing and conversations.</p>
        ) : (
          <ul className="space-y-3">
            {stats.mistakes.map((m) => {
              const tag = ERROR_TAGS[m.tag as keyof typeof ERROR_TAGS];
              const ex = m.examples[0];
              return (
                <li key={m.tag} className="space-y-1 rounded-xl bg-surface-2 px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{tag?.label ?? m.tag}</span>
                    <span className="shrink-0 text-xs text-muted tabular-nums">{m.count}×</span>
                  </div>
                  {tag && <p className="text-sm text-muted">{tag.hint}</p>}
                  {ex && (
                    <p className="text-sm" lang="de">
                      <s className="text-danger">{ex.wrong}</s> → <span className="text-success">{ex.right}</span>
                    </p>
                  )}
                  {tag && tag.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {tag.topics.slice(0, 3).map((id) => (
                        <Link key={id} href={`/grammar/topic?id=${id}`} className="inline-flex items-center gap-1 rounded-lg bg-accent-soft px-2 py-1 text-xs font-medium text-accent">
                          Practise: {TOPIC_BY_ID[id]?.title ?? id}
                          <ChevronRight className="size-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="space-y-3">
          <CardTitle>Grammar mastery by level</CardTitle>
          <ul className="space-y-2">
            {LEVELS.map((l) => {
              const g = stats.grammar.byLevel[l];
              return (
                <li key={l} className="flex items-center gap-3">
                  <LevelBadge level={l} />
                  <ProgressBar value={g.mastered} max={Math.max(1, g.total)} className="flex-1" label={`${l} grammar mastered`} tone="success" />
                  <span className="w-12 text-right text-xs text-muted tabular-nums">
                    {g.mastered}/{g.total}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
        <Card className="space-y-3">
          <CardTitle icon={<PenLine className="size-4 text-accent" />}>Practice so far</CardTitle>
          <ul className="space-y-1.5 text-sm">
            <li className="flex justify-between">
              <span>Texts read</span>
              <span className="tabular-nums">{stats.texts.reading}</span>
            </li>
            <li className="flex justify-between">
              <span>Listening tasks</span>
              <span className="tabular-nums">{stats.texts.listening}</span>
            </li>
            <li className="flex justify-between">
              <span>Texts written</span>
              <span className="tabular-nums">{stats.writings}</span>
            </li>
            <li className="flex justify-between">
              <span>Conversations</span>
              <span className="tabular-nums">{stats.conversations}</span>
            </li>
            <li className="flex justify-between">
              <span>Grammar topics started</span>
              <span className="tabular-nums">{stats.grammar.started}</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
