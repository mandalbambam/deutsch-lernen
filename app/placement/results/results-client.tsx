'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { CheckCircle2, ChevronRight, TrendingDown, TrendingUp, XCircle } from 'lucide-react';
import { LevelLineChart, type Series } from '@/components/charts/line-chart';
import { SkillScale } from '@/components/charts/skill-scale';
import { LevelBadge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { SKILL_COLORS } from '@/components/charts/colors';
import { WritingSample } from '@/components/placement/writing-sample';
import { Card, CardTitle, PageHeader } from '@/components/ui/card';
import { EmptyState, Loading } from '@/components/ui/misc';
import { errorTag } from '@/content/error-tags';
import { TOPIC_BY_ID } from '@/content/grammar/catalog';
import { ITEM_BY_ID, PASSAGE_BY_ID } from '@/content/placement';
import { LEVEL_DESCRIPTIONS, LEVEL_NAMES, subBand } from '@/lib/cefr';
import { SUB_BAND_LABEL } from '@/lib/cefr-scale';
import { db } from '@/lib/db';
import { useProfile } from '@/lib/db/profile';
import { TESTED_SKILLS, type Assessment } from '@/lib/db/types';
import { formatDate } from '@/lib/format';
import { useLang, useT } from '@/lib/i18n';



export function ResultsClient() {
  const t = useT();
  const lang = useLang();
  const fmtDate = (ms: number) => formatDate(ms, lang);
  const params = useSearchParams();
  const id = params.get('id');
  const profile = useProfile();
  const data = useLiveQuery(async () => {
    const done = (await db.assessments.where('status').equals('done').toArray()).sort((a, b) => a.takenAt - b.takenAt);
    const current = id ? done.find((a) => a.id === id) : done[done.length - 1];
    return { done, current };
  }, [id]);

  if (!data) return <Loading label={t.common.loading} />;
  const { done, current } = data;
  if (!current) {
    return (
      <>
        <PageHeader title={t.placement.results} />
        <EmptyState title="No test results yet">
          <ButtonLink href="/placement" className="mt-2">
            {t.home.takeTest}
          </ButtonLink>
        </EmptyState>
      </>
    );
  }

  const overall = current.overall;
  const analysis = current.analysis;
  return (
    <>
      <PageHeader
        title={t.placement.results}
        subtitle={`${current.kind === 'placement' ? t.placement.title : 'Level check'} · ${fmtDate(current.takenAt)}`}
      />
      <div className="space-y-4">
        {overall && (
          <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <LevelBadge level={overall.level} large className="self-start px-5 py-3 text-4xl" />
            <div className="space-y-1">
              <p className="text-sm text-muted">{t.placement.overall}</p>
              <p className="text-xl font-bold">
                {LEVEL_NAMES[overall.level]} · {SUB_BAND_LABEL[subBand(overall.theta)]} {overall.level}
              </p>
              <p className="text-sm text-muted">{LEVEL_DESCRIPTIONS[overall.level]}</p>
            </div>
          </Card>
        )}

        <Card className="space-y-5">
          <CardTitle>{t.placement.perSkill}</CardTitle>
          {TESTED_SKILLS.map((skill) => {
            const est = current.skills[skill];
            return (
              <div key={skill} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{t.skills[skill]}</span>
                  {est ? (
                    <span className="flex items-center gap-2 text-sm text-muted">
                      {SUB_BAND_LABEL[subBand(est.theta)]} <LevelBadge level={est.level} />
                      <span className="tabular-nums">
                        {est.correct}/{est.total}
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-muted">{t.common.notAssessed}</span>
                  )}
                </div>
                {est && <SkillScale theta={est.theta} se={est.se} />}
              </div>
            );
          })}
          {current.writing && (
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium">{t.skills.writing}</span>
              <LevelBadge level={current.writing.level} />
            </div>
          )}
          <p className="text-xs text-muted">The shaded band shows the uncertainty (± one standard error) of each estimate.</p>
        </Card>

        {analysis && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="space-y-2">
              <CardTitle icon={<TrendingUp className="size-5 text-success" />}>{t.placement.strengths}</CardTitle>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {analysis.strengths.length ? analysis.strengths.map((s) => <li key={s}>{s}</li>) : <li>—</li>}
              </ul>
            </Card>
            <Card className="space-y-2">
              <CardTitle icon={<TrendingDown className="size-5 text-warning" />}>{t.placement.weaknesses}</CardTitle>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {analysis.weaknesses.length ? analysis.weaknesses.map((s) => <li key={s}>{s}</li>) : <li>—</li>}
              </ul>
            </Card>
          </div>
        )}

        {analysis && (
          <Card className="space-y-3">
            <CardTitle>{t.placement.patterns}</CardTitle>
            {analysis.errorPatterns.length === 0 && <p className="text-sm text-muted">{t.placement.noPatterns}</p>}
            <ul className="divide-y divide-line">
              {analysis.errorPatterns.map((p) => {
                const tag = errorTag(p.tag);
                const example = ITEM_BY_ID[p.itemIds[0]];
                const resp = current.responses.find((r) => r.itemId === p.itemIds[0]);
                return (
                  <li key={p.tag} className="space-y-1.5 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{tag.label}</span>
                      <span className="text-sm text-muted tabular-nums">× {p.count}</span>
                    </div>
                    <p className="text-sm text-muted">{tag.hint}</p>
                    {example && resp && !example.passageId && (
                      <p className="text-sm" lang="de">
                        <span className="text-muted">e.g. </span>
                        {example.prompt.replace('___', `[${example.options[0]}]`)}
                        {resp.choice !== null && resp.choice !== 0 && (
                          <span className="text-danger"> — you chose „{example.options[resp.choice]}“</span>
                        )}
                      </p>
                    )}
                    {tag.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {tag.topics.slice(0, 3).map((topicId) => (
                          <Link
                            key={topicId}
                            href={`/grammar/topic?id=${topicId}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-accent-soft px-2 py-1 text-xs font-medium text-accent"
                          >
                            {t.placement.practice}: {TOPIC_BY_ID[topicId]?.title ?? topicId}
                            <ChevronRight className="size-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>
        )}

        <WritingSample assessment={current} />

        {done.length >= 2 && <HistoryCard done={done} />}

        <ReviewCard assessment={current} />

        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href={profile.onboarded ? '/' : '/onboarding'} size="lg">
            {profile.onboarded ? t.home.startSession : t.placement.buildPlan}
          </ButtonLink>
          <ButtonLink href="/placement" size="lg" variant="secondary">
            {t.placement.retake}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}

function HistoryCard({ done }: { done: Assessment[] }) {
  const t = useT();
  const lang = useLang();
  const fmtDate = (ms: number) => formatDate(ms, lang);
  const series: Series[] = [
    {
      name: 'overall',
      color: SKILL_COLORS.overall,
      points: done.filter((a) => a.overall).map((a) => ({ x: a.takenAt, y: a.overall!.theta })),
    },
    ...TESTED_SKILLS.map((s) => ({
      name: s,
      color: SKILL_COLORS[s],
      points: done.filter((a) => a.skills[s]).map((a) => ({ x: a.takenAt, y: a.skills[s]!.theta })),
    })),
  ];
  return (
    <Card className="space-y-3">
      <CardTitle>{t.placement.history}</CardTitle>
      <LevelLineChart series={series} formatX={(x) => fmtDate(x)} />
      <div className="flex flex-wrap gap-3 text-xs">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full" style={{ background: s.color }} />
            {s.name === 'overall' ? t.placement.overall : t.skills[s.name as keyof typeof t.skills]}
          </span>
        ))}
      </div>
      <ul className="divide-y divide-line text-sm">
        {[...done].reverse().map((a) => (
          <li key={a.id} className="flex items-center justify-between py-2">
            <Link href={`/placement/results?id=${a.id}`} className="hover:underline">
              {fmtDate(a.takenAt)} · {a.kind === 'placement' ? t.placement.title : 'Level check'}
            </Link>
            {a.overall && <LevelBadge level={a.overall.level} />}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ReviewCard({ assessment }: { assessment: Assessment }) {
  const t = useT();
  return (
    <Card>
      <details>
        <summary className="cursor-pointer font-semibold">
          {t.placement.review} ({assessment.responses.filter((r) => r.correct).length}/{assessment.responses.length})
        </summary>
        <ol className="mt-3 space-y-3">
          {assessment.responses.map((r, i) => {
            const item = ITEM_BY_ID[r.itemId];
            if (!item) return null;
            const passage = item.passageId ? PASSAGE_BY_ID[item.passageId] : undefined;
            return (
              <li key={r.itemId} className="rounded-xl border border-line p-3 text-sm">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted">
                  {r.correct ? <CheckCircle2 className="size-4 text-success" /> : <XCircle className="size-4 text-danger" />}
                  {i + 1}. {t.skills[r.skill]} · {r.level}
                  {passage && <span>· {passage.kind}</span>}
                </div>
                <p lang="de" className="font-medium">
                  {item.prompt}
                </p>
                {!r.correct && (
                  <p>
                    <span className="text-muted">{t.placement.yourAnswer}: </span>
                    <span className="text-danger" lang="de">
                      {r.choice === null ? t.common.dontKnow : item.options[r.choice]}
                    </span>
                  </p>
                )}
                <p>
                  <span className="text-muted">{t.placement.correctAnswer}: </span>
                  <span className="text-success" lang="de">
                    {item.options[0]}
                  </span>
                </p>
                <p className="mt-1 text-muted">{item.explain}</p>
              </li>
            );
          })}
        </ol>
      </details>
    </Card>
  );
}
