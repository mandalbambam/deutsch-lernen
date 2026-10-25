'use client';

import { PageHeader } from '@/components/ui/card';
import { useT } from '@/lib/i18n';

export function ResourcesHeader() {
  const t = useT();
  return <PageHeader title={t.nav.resources} subtitle={t.pages.resourcesSub} />;
}
