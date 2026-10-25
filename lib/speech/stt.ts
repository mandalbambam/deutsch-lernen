'use client';

/**
 * Speech recognition (Web Speech API). Available in Chromium browsers and Safari;
 * Chrome/Edge send audio to the vendor's servers for recognition. Firefox has no support.
 */

interface RecognitionResultEvent {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string; confidence: number } }>;
}

interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

type RecognitionCtor = new () => Recognition;

function ctor(): RecognitionCtor | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function recognitionSupported(): boolean {
  return !!ctor();
}

export interface ListenHandle {
  stop: () => void;
  result: Promise<string>;
}

/** Listens for one German utterance; `onPartial` receives interim transcripts. */
export function listen(onPartial?: (text: string) => void): ListenHandle {
  const C = ctor();
  if (!C) return { stop: () => {}, result: Promise.reject(new Error('unsupported')) };
  const rec = new C();
  rec.lang = 'de-DE';
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;
  let finalText = '';
  const result = new Promise<string>((resolve, reject) => {
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      onPartial?.((finalText + interim).trim());
    };
    rec.onerror = (e) => {
      if (e.error === 'no-speech' || e.error === 'aborted') resolve(finalText.trim());
      else reject(new Error(e.error));
    };
    rec.onend = () => resolve(finalText.trim());
  });
  rec.start();
  return { stop: () => rec.stop(), result };
}
