/**
 * Canned answers for GEMINI_MOCK=1 — lets you try and test the AI screens without an API key.
 */
import type { AiInput, AiOutput, AiTask } from '@/lib/ai/schemas';

if (typeof window !== 'undefined') throw new Error('lib/ai/server must not be imported in the browser');

export function mockResponse<T extends AiTask>(task: T, input: AiInput<T>): AiOutput<T> {
  switch (task) {
    case 'writing-feedback': {
      const i = input as AiInput<'writing-feedback'>;
      const first = i.text.split(/\s+/)[0] ?? '';
      return {
        level: i.level,
        summary: 'Mock feedback: the text answers the task and is easy to follow. A few small mistakes remain.',
        corrected: i.text,
        rewrite: i.text,
        errors: [{ original: first, correction: first, explanation: 'Mock explanation — with a real API key you get real corrections here.', tag: 'order.v2' }],
        strengths: ['Clear structure', 'All content points covered'],
        tips: ['Use more connectors such as außerdem or deshalb.'],
      } as AiOutput<T>;
    }
    case 'grade-writing': {
      const i = input as AiInput<'grade-writing'>;
      return { level: i.level, scores: { task: 3, coherence: 3, range: 3, accuracy: 3 }, summary: 'Mock assessment of the writing sample.', errors: [] } as AiOutput<T>;
    }
    case 'conversation': {
      const i = input as AiInput<'conversation'>;
      const last = [...i.history].reverse().find((m) => m.role === 'user')?.text ?? '';
      const needsDot = last && !/[.!?]$/.test(last.trim());
      return {
        reply: 'Das klingt interessant! Erzählen Sie mir doch ein bisschen mehr.',
        ...(needsDot ? { correction: `${last.trim()}.`, explanation: 'Mock correction: end the sentence with a full stop.', tags: ['order.v2'] } : {}),
        done: i.history.filter((m) => m.role === 'user').length >= 4,
      } as AiOutput<T>;
    }
    case 'explain-answer': {
      const i = input as AiInput<'explain-answer'>;
      return { explanation: `Mock explanation: „${i.answer}“ does not follow the rule here — the correct form is „${i.expected}“.`, tip: 'Mock tip.' } as AiOutput<T>;
    }
    case 'grammar-exercises':
      return {
        exercises: [
          { kind: 'fill', prompt: 'Das Gesetz tritt morgen in ___.', answers: ['Kraft'], distractors: [], explain: 'Mock: in Kraft treten = come into force.' },
          { kind: 'choice', prompt: 'Er tat so, ___ er nichts wüsste.', answers: ['als ob'], distractors: ['wenn', 'obwohl', 'damit'], explain: 'Mock: als ob + Konjunktiv II.' },
          { kind: 'transform', instruction: 'Rewrite in the passive.', prompt: 'Man baut hier ein Haus.', answers: ['Hier wird ein Haus gebaut.', 'Ein Haus wird hier gebaut.'], distractors: [], explain: 'Mock: werden + Partizip II.' },
        ],
      } as AiOutput<T>;
  }
  throw new Error('unknown task');
}
