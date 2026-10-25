import { Suspense } from 'react';
import { Loading } from '@/components/ui/misc';
import { TextClient } from './text-client';

export const metadata = { title: 'Reading' };

export default function ReadingTextPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TextClient />
    </Suspense>
  );
}
