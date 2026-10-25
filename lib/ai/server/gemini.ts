/**
 * Minimal Gemini API client (server only — reads GEMINI_API_KEY).
 * Structured JSON output, model fallback, 429 back-off and daily-limit detection.
 */
import type { AiErrorCode } from '@/lib/ai/schemas';

if (typeof window !== 'undefined') throw new Error('lib/ai/server must not be imported in the browser');

const API = 'https://generativelanguage.googleapis.com/v1beta/models';

export class AiError extends Error {
  constructor(
    public code: AiErrorCode,
    message?: string,
    public retryAfter?: number,
  ) {
    super(message ?? code);
  }
}

export interface GeminiRequest {
  system: string;
  /** conversation turns; must start with a user turn */
  contents: { role: 'user' | 'model'; text: string }[];
  /** OpenAPI-style response schema (Gemini `responseSchema`) */
  schema: object;
  temperature?: number;
  maxOutputTokens?: number;
  /** use the cheaper/faster model first */
  lite?: boolean;
  /** less internal reasoning = much faster answers (long structured outputs otherwise take 20 s+) */
  thinking?: 'low' | 'medium' | 'high';
}

export function mainModel(): string {
  return process.env.GEMINI_MODEL?.trim() || 'gemini-3.8-flash';
}

export function liteModel(): string {
  return process.env.GEMINI_LITE_MODEL?.trim() || 'gemini-3.5-flash-lite';
}

/**
 * Models to try in order: the configured one, an older free model with its own quota, Google's
 * "-latest" alias (survives renames), then the other tier. Retired names (404) fall through.
 */
export function modelChain(lite: boolean): string[] {
  const chain = lite
    ? [liteModel(), 'gemini-flash-lite-latest', mainModel(), 'gemini-3.5-flash']
    : [mainModel(), 'gemini-3.5-flash', 'gemini-flash-latest', liteModel()];
  return [...new Set(chain)];
}

/** Stay below the route's maxDuration (45 s) even when several models have to be tried. */
const DEADLINE_MS = 40_000;

interface GoogleErrorBody {
  error?: { code?: number; message?: string; status?: string; details?: { '@type'?: string; retryDelay?: string; violations?: { quotaId?: string; quotaMetric?: string }[]; reason?: string }[] };
}

/** Reads a 429 body: is it the daily quota, and how long does Google ask us to wait? */
export function parseRateLimit(body: GoogleErrorBody): { daily: boolean; retryAfter?: number } {
  const details = body.error?.details ?? [];
  const violations = details.flatMap((d) => d.violations ?? []);
  const daily =
    violations.some((v) => /per\s*day|perday/i.test(`${v.quotaId ?? ''} ${v.quotaMetric ?? ''}`)) || /per\s*day|daily/i.test(body.error?.message ?? '');
  const delay = details.find((d) => d['@type']?.endsWith('RetryInfo'))?.retryDelay;
  const seconds = delay ? Number.parseFloat(delay) : Number.NaN;
  return { daily, retryAfter: Number.isFinite(seconds) ? Math.ceil(seconds) : undefined };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Extracts the JSON payload from a model answer (tolerates ```json fences). */
export function extractJson(text: string): unknown {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(trimmed);
}

export async function generateJson(req: GeminiRequest): Promise<{ data: unknown; model: string }> {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) throw new AiError('not_configured');
  let sawDaily = false;
  let lastError: AiError | undefined;
  const deadline = Date.now() + DEADLINE_MS;

  models: for (const model of modelChain(!!req.lite)) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const remaining = deadline - Date.now();
      if (remaining < 4_000) {
        lastError ??= new AiError('timeout', 'deadline reached');
        break models;
      }
      let res: Response;
      try {
        res = await fetch(`${API}/${encodeURIComponent(model)}:generateContent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: req.system }] },
            contents: req.contents.map((c) => ({ role: c.role, parts: [{ text: c.text }] })),
            generationConfig: {
              temperature: req.temperature ?? 0.4,
              maxOutputTokens: req.maxOutputTokens ?? 2048,
              responseMimeType: 'application/json',
              responseSchema: req.schema,
              ...(req.thinking ? { thinkingConfig: { thinkingLevel: req.thinking } } : {}),
            },
          }),
          signal: AbortSignal.timeout(Math.min(25_000, remaining)),
        });
      } catch (err) {
        lastError = new AiError((err as Error).name === 'TimeoutError' ? 'timeout' : 'upstream', String(err));
        break; // try the next model
      }

      if (res.ok) {
        const body = (await res.json().catch(() => null)) as {
          candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
          promptFeedback?: { blockReason?: string };
        } | null;
        if (body?.promptFeedback?.blockReason) throw new AiError('blocked', body.promptFeedback.blockReason);
        const cand = body?.candidates?.[0];
        if (cand?.finishReason && /SAFETY|PROHIBITED|BLOCKLIST|SPII/.test(cand.finishReason)) throw new AiError('blocked', cand.finishReason);
        const text = cand?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
        try {
          return { data: extractJson(text), model };
        } catch {
          lastError = new AiError('bad_output', `unparseable output (${cand?.finishReason ?? 'no finish reason'})`);
          if (attempt >= 1) break; // two broken answers: try the next model
          continue;
        }
      }

      const body = ((await res.json().catch(() => ({}))) ?? {}) as GoogleErrorBody;
      const message = body.error?.message ?? `HTTP ${res.status}`;
      if (res.status === 404) {
        lastError = new AiError('unavailable', `model ${model} not available`);
        break; // unknown model name: next in chain
      }
      if (res.status === 429) {
        const { daily, retryAfter } = parseRateLimit(body);
        if (daily) {
          sawDaily = true;
          break; // this model's daily quota is used up — another model may still have quota
        }
        if (attempt === 0 && (retryAfter ?? 0) <= 8) {
          await sleep(((retryAfter ?? 2) + 0.5) * 1000);
          continue;
        }
        throw new AiError('rate_limited', message, retryAfter ?? 30);
      }
      if (res.status === 400 && /API key|API_KEY/i.test(message)) throw new AiError('bad_key', message);
      if (res.status === 401 || res.status === 403) throw new AiError(/API key|API_KEY|permission/i.test(message) ? 'bad_key' : 'unavailable', message);
      // 503 "high demand" spikes are usually short: wait 1.5 s, then 3 s, before moving on
      if (res.status >= 500 && attempt < 2) {
        await sleep(attempt === 0 ? 1_500 : 3_000);
        continue;
      }
      lastError = new AiError(res.status >= 500 ? 'upstream' : 'bad_request', message);
      break;
    }
  }
  if (sawDaily) throw new AiError('daily_limit');
  throw lastError ?? new AiError('upstream');
}
