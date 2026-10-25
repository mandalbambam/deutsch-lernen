import { Construction } from 'lucide-react';
import { PageHeader } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/misc';

/** Temporary placeholder for modules that are built in a later phase. */
export function ComingSoon({ title, phase }: { title: string; phase: number }) {
  return (
    <>
      <PageHeader title={title} />
      <EmptyState icon={<Construction className="size-8" />} title="Coming in the next build phase">
        This module is part of phase {phase} of the build.
      </EmptyState>
    </>
  );
}
