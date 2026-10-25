import { AI_TASKS, inputSchemas, outputSchemas, type AiErrorCode, type AiTask } from '@/lib/ai/schemas';
import { AiError, generateJson } from '@/lib/ai/server/gemini';
import { mockResponse } from '@/lib/ai/server/mock';
import { buildRequest } from '@/lib/ai/server/prompts';

/** Free-tier calls can take a while; Vercel Hobby allows up to 60 s. */
export const maxDuration = 45;

const STATUS: Record<AiErrorCode, number> = {
  not_configured: 503,
  unauthorized: 401,
  bad_request: 400,
  rate_limited: 429,
  daily_limit: 429,
  bad_key: 503,
  unavailable: 503,
  blocked: 422,
  bad_output: 502,
  timeout: 504,
  upstream: 502,
  offline: 503,
};

function fail(error: AiErrorCode, extra: { retryAfter?: number; message?: string } = {}) {
  const headers: Record<string, string> = { 'Cache-Control': 'no-store' };
  if (extra.retryAfter) headers['Retry-After'] = String(extra.retryAfter);
  return Response.json({ ok: false, error, ...extra }, { status: STATUS[error], headers });
}

// Soft per-instance limiter to protect the free quota from runaway clients.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 15;
const hits = new Map<string, number[]>();
function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}

export async function POST(request: Request) {
  const mock = process.env.GEMINI_MOCK === '1';
  if (!process.env.GEMINI_API_KEY && !mock) return fail('not_configured');

  const passphrase = process.env.APP_PASSPHRASE;
  if (passphrase && request.headers.get('x-app-passphrase') !== passphrase) return fail('unauthorized');

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (!allow(ip)) return fail('rate_limited', { retryAfter: 30 });

  const raw = await request.text();
  if (raw.length > 40_000) return fail('bad_request', { message: 'request too large' });
  let body: { task?: string; input?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return fail('bad_request', { message: 'invalid JSON' });
  }
  const task = body.task as AiTask;
  if (!AI_TASKS.includes(task)) return fail('bad_request', { message: 'unknown task' });
  const parsed = inputSchemas[task].safeParse(body.input);
  if (!parsed.success) return fail('bad_request', { message: parsed.error.issues[0]?.message });

  try {
    if (mock) {
      return Response.json({ ok: true, data: mockResponse(task, parsed.data as never), model: 'mock' }, { headers: { 'Cache-Control': 'no-store' } });
    }
    const req = buildRequest(task, parsed.data);
    // one retry if the model returns JSON that doesn't match the contract
    for (let attempt = 0; attempt < 2; attempt++) {
      const { data, model } = await generateJson(req);
      const out = outputSchemas[task].safeParse(data);
      if (out.success) return Response.json({ ok: true, data: out.data, model }, { headers: { 'Cache-Control': 'no-store' } });
    }
    return fail('bad_output');
  } catch (err) {
    if (err instanceof AiError) {
      if (err.code !== 'rate_limited' && err.code !== 'daily_limit') console.error(`[ai] ${task}: ${err.code} ${err.message}`);
      return fail(err.code, { retryAfter: err.retryAfter });
    }
    console.error('[ai] unexpected error', err);
    return fail('upstream');
  }
}
