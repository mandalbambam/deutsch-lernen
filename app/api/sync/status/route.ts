import { connection } from 'next/server';
import { syncDir } from '@/lib/sync/server';

/** Tells the client whether this server offers sync. Evaluated per request. */
export async function GET() {
  await connection();
  return Response.json({ enabled: !!syncDir() }, { headers: { 'Cache-Control': 'no-store' } });
}
