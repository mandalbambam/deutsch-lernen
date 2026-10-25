import { Suspense } from 'react';
import { Loading } from '@/components/ui/misc';
import { TopicClient } from './topic-client';

export const metadata = { title: 'Grammar topic' };

export default function GrammarTopicPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TopicClient />
    </Suspense>
  );
}
