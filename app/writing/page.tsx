import { Suspense } from 'react';
import { Loading } from '@/components/ui/misc';
import { WritingClient } from './writing-client';

export const metadata = { title: 'Writing coach' };

export default function WritingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <WritingClient />
    </Suspense>
  );
}
