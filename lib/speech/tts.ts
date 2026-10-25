'use client';

/**
 * German text-to-speech on top of the Web Speech API (speechSynthesis).
 * Long texts are split into sentences because some engines stop after ~15 s of continuous speech.
 */

export function ttsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function germanVoices(): SpeechSynthesisVoice[] {
  if (!ttsSupported()) return [];
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith('de'))
    .sort((a, b) => voiceScore(b) - voiceScore(a));
}

/** Prefer natural/online voices and Germany German. */
function voiceScore(v: SpeechSynthesisVoice): number {
  let s = 0;
  const name = v.name.toLowerCase();
  if (/natural|neural|online|premium|enhanced/.test(name)) s += 4;
  if (/google/.test(name)) s += 2;
  if (v.lang.replace('_', '-').toLowerCase() === 'de-de') s += 2;
  if (v.localService) s += 1;
  return s;
}

/** Resolves once the browser has loaded its voice list (Chrome loads it asynchronously). */
export function voicesReady(timeoutMs = 2500): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!ttsSupported()) return resolve([]);
    const now = germanVoices();
    if (window.speechSynthesis.getVoices().length > 0) return resolve(now);
    const done = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', done);
      resolve(germanVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', done);
    setTimeout(done, timeoutMs);
  });
}

export function pickVoice(preferredURI?: string, exclude?: SpeechSynthesisVoice): SpeechSynthesisVoice | undefined {
  const voices = germanVoices();
  if (preferredURI) {
    const v = voices.find((x) => x.voiceURI === preferredURI);
    if (v && v !== exclude) return v;
  }
  return voices.find((v) => v !== exclude) ?? voices[0];
}

export function splitSentences(text: string): string[] {
  const parts = text
    .replace(/\s+/g, ' ')
    .match(/[^.!?…]+(?:[.!?…]+["“”»«']?|$)/g);
  return (parts ?? [text]).map((s) => s.trim()).filter(Boolean);
}

export interface SpeakOptions {
  rate?: number;
  voiceURI?: string;
  voice?: SpeechSynthesisVoice;
  /** pause between sentences in ms */
  gap?: number;
  signal?: AbortSignal;
}

/** Bumped by every new playback and by stopSpeaking(); older playbacks notice and end. */
let generation = 0;

async function speakAs(gen: number, text: string, opts: SpeakOptions): Promise<void> {
  const synth = window.speechSynthesis;
  const voice = opts.voice ?? pickVoice(opts.voiceURI);
  for (const sentence of splitSentences(text)) {
    if (gen !== generation || opts.signal?.aborted) return;
    await new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(sentence);
      u.lang = voice?.lang ?? 'de-DE';
      if (voice) u.voice = voice;
      u.rate = opts.rate ?? 0.95;
      // Safari sometimes never fires onend for cancelled utterances
      const guard = setInterval(() => {
        if (gen !== generation || opts.signal?.aborted) finish();
      }, 250);
      function finish() {
        clearInterval(guard);
        resolve();
      }
      u.onend = finish;
      u.onerror = finish;
      synth.speak(u);
    });
    if (opts.gap) await new Promise((r) => setTimeout(r, opts.gap));
  }
}

/** Speaks text; resolves when finished (or stopped). */
export async function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  if (!ttsSupported() || !text.trim()) return;
  window.speechSynthesis.cancel();
  const gen = ++generation;
  await speakAs(gen, text, opts);
}

export interface DialogueLine {
  speaker: string;
  text: string;
}

/** Reads a dialogue, alternating between two German voices when available. */
export async function speakDialogue(lines: DialogueLine[], opts: SpeakOptions = {}): Promise<void> {
  if (!ttsSupported()) return;
  window.speechSynthesis.cancel();
  const gen = ++generation;
  const first = pickVoice(opts.voiceURI);
  const second = pickVoice(undefined, first) ?? first;
  const speakers = [...new Set(lines.map((l) => l.speaker))];
  for (const line of lines) {
    if (gen !== generation || opts.signal?.aborted) return;
    const idx = speakers.indexOf(line.speaker) % 2;
    const voice = idx === 0 ? first : second;
    // with a single voice, a slightly faster rate helps telling the speakers apart
    const rate = (opts.rate ?? 0.95) * (idx === 1 && voice === first ? 1.08 : 1);
    await speakAs(gen, line.text, { ...opts, voice, rate });
    await new Promise((r) => setTimeout(r, 350));
  }
}

export function stopSpeaking() {
  generation++;
  if (ttsSupported()) window.speechSynthesis.cancel();
}
