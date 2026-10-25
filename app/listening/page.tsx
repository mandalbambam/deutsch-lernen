import { Suspense } from 'react';
import { Loading } from '@/components/ui/misc';
import { ListeningClient } from './listening-client';

export const metadata = { title: 'Listening' };

export default function ListeningPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ListeningClient />
    </Suspense>
  );
}
