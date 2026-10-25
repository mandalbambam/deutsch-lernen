import { Suspense } from 'react';
import { Loading } from '@/components/ui/misc';
import { ConversationClient } from './conversation-client';

export const metadata = { title: 'Conversation partner' };

export default function ConversationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ConversationClient />
    </Suspense>
  );
}
