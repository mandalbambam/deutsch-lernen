import { connection } from 'next/server';
import type { AiStatus } from '@/lib/ai/schemas';
import { mainModel } from '@/lib/ai/server/gemini';

/** Tells the client whether AI is available — never reveals the key. Evaluated per request. */
export async function GET() {
  await connection();
  const mock = process.env.GEMINI_MOCK === '1';
  const configured = !!process.env.GEMINI_API_KEY?.trim() || mock;
  const status: AiStatus = { configured, passphrase: !!process.env.APP_PASSPHRASE, model: configured ? (mock ? 'mock' : mainModel()) : undefined, mock: mock || undefined };
  return Response.json(status, { headers: { 'Cache-Control': 'no-store' } });
}
