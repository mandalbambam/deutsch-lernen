import { Suspense } from 'react';
import { Loading } from '@/components/ui/misc';
import { PlacementEntry } from './placement-entry';

export const metadata = { title: 'Placement test' };

export default function PlacementPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PlacementEntry />
    </Suspense>
  );
}
