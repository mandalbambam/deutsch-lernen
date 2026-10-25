import { Suspense } from 'react';
import { Loading } from '@/components/ui/misc';
import { ResultsClient } from './results-client';

export const metadata = { title: 'Test results' };

export default function ResultsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResultsClient />
    </Suspense>
  );
}
