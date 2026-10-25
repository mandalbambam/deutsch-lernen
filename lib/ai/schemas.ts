/**
 * Shared request/response contracts for the optional AI features (used by the API route and the client).
 * The client only ever names a task and sends data — prompts are built on the server.
 */
import { z } from 'zod';
import { LEVELS, type Level } from '@/lib/cefr';

export const AI_TASKS = ['writing-feedback', 'grade-writing', 'conversation', 'explain-answer', 'grammar-exercises'] as const;
export type AiTask = (typeof AI_TASKS)[number];

/** AI-generated grammar exercises are offered from B2 upwards. */
export const AI_EXERCISE_LEVELS: readonly Level[] = ['B2', 'C1', 'C2'];

const level = z.enum(LEVELS);
const text = (max: number) => z.string().trim().min(1).max(max);

const errorItem = z.object({
  original: z.string(),
  correction: z.string(),
  explanation: z.string(),
  tag: z.string(),
});

export const inputSchemas = {
  'writing-feedback': z.object({ text: text(3000), prompt: text(1000), level }),
  'grade-writing': z.object({ text: text(3000), prompt: text(1000), level }),
  conversation: z.object({
    scenarioId: text(80),
    level,
    history: z
      .array(z.object({ role: z.enum(['user', 'partner']), text: text(800) }))
      .min(1)
      .max(30),
  }),
  'explain-answer': z.object({ task: text(800), expected: text(500), answer: text(500), rule: text(1000), level }),
  /** fresh exercises for a B2–C2 grammar topic; `avoid` lists prompts the learner has already seen */
  'grammar-exercises': z.object({ topicId: text(80), avoid: z.array(z.string().max(300)).max(40) }),
} satisfies Record<AiTask, z.ZodType>;

export const outputSchemas = {
  'writing-feedback': z.object({
    level,
    summary: z.string().min(1),
    corrected: z.string().min(1),
    rewrite: z.string().min(1),
    errors: z.array(errorItem).max(25),
    strengths: z.array(z.string()).max(5),
    tips: z.array(z.string()).max(5),
  }),
  'grade-writing': z.object({
    level,
    scores: z.object({ task: z.number().min(0).max(5), coherence: z.number().min(0).max(5), range: z.number().min(0).max(5), accuracy: z.number().min(0).max(5) }),
    summary: z.string().min(1),
    errors: z.array(errorItem).max(12),
  }),
  conversation: z.object({
    reply: z.string().min(1),
    correction: z.string().optional(),
    explanation: z.string().optional(),
    tags: z.array(z.string()).max(4).optional(),
    done: z.boolean().optional(),
  }),
  'explain-answer': z.object({ explanation: z.string().min(1), tip: z.string().optional() }),
  'grammar-exercises': z.object({
    exercises: z
      .array(
        z.object({
          kind: z.enum(['fill', 'choice', 'transform']),
          instruction: z.string().optional(),
          prompt: z.string().min(1).max(400),
          answers: z.array(z.string().min(1).max(300)).min(1).max(6),
          distractors: z.array(z.string().max(300)).max(6),
          explain: z.string().min(1).max(600),
        }),
      )
      .min(1)
      .max(15),
  }),
} satisfies Record<AiTask, z.ZodType>;

export type AiInput<T extends AiTask> = z.infer<(typeof inputSchemas)[T]>;
export type AiOutput<T extends AiTask> = z.infer<(typeof outputSchemas)[T]>;

export const AI_ERROR_CODES = ['not_configured', 'unauthorized', 'bad_request', 'rate_limited', 'daily_limit', 'bad_key', 'unavailable', 'blocked', 'bad_output', 'timeout', 'upstream', 'offline'] as const;
export type AiErrorCode = (typeof AI_ERROR_CODES)[number];

export interface AiStatus {
  configured: boolean;
  passphrase: boolean;
  model?: string;
  mock?: boolean;
}

/** Response body of POST /api/ai. */
export type AiResponse<T extends AiTask> = { ok: true; data: AiOutput<T>; model: string } | { ok: false; error: AiErrorCode; retryAfter?: number; message?: string };
