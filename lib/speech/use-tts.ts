'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useProfile } from '@/lib/db/profile';
import { germanVoices, speak, speakDialogue, stopSpeaking, ttsSupported, voicesReady, type DialogueLine } from './tts';

interface VoiceSnapshot {
  ready: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
}

const SERVER_SNAPSHOT: VoiceSnapshot = { ready: false, supported: false, voices: [] };
let snapshot: VoiceSnapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();
let started = false;

function publish(next: VoiceSnapshot) {
  snapshot = next;
  listeners.forEach((l) => l());
}

function startWatching() {
  if (started) return;
  started = true;
  if (!ttsSupported()) {
    publish({ ready: true, supported: false, voices: [] });
    return;
  }
  voicesReady().then((voices) => publish({ ready: true, supported: true, voices }));
  window.speechSynthesis.addEventListener('voiceschanged', () =>
    publish({ ready: true, supported: true, voices: germanVoices() }),
  );
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  startWatching();
  return () => listeners.delete(cb);
}

/** German voices available in this browser (loaded asynchronously by most engines). */
export function useGermanVoices(): VoiceSnapshot {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => SERVER_SNAPSHOT,
  );
}

export function useTts() {
  const profile = useProfile();
  const { ready, supported, voices } = useGermanVoices();
  const [speaking, setSpeaking] = useState(false);
  const active = useRef(0);

  // stop any playback when the component unmounts or is hidden
  useEffect(() => () => stopSpeaking(), []);

  const run = useCallback(async (fn: () => Promise<void>) => {
    const id = ++active.current;
    setSpeaking(true);
    try {
      await fn();
    } finally {
      if (active.current === id) setSpeaking(false);
    }
  }, []);

  const say = useCallback(
    (text: string, rate?: number) =>
      run(() => speak(text, { rate: rate ?? profile.tts.rate, voiceURI: profile.tts.voiceURI, gap: 120 })),
    [run, profile.tts.rate, profile.tts.voiceURI],
  );

  const sayDialogue = useCallback(
    (lines: DialogueLine[], rate?: number) =>
      run(() => speakDialogue(lines, { rate: rate ?? profile.tts.rate, voiceURI: profile.tts.voiceURI })),
    [run, profile.tts.rate, profile.tts.voiceURI],
  );

  const stop = useCallback(() => {
    active.current++;
    stopSpeaking();
    setSpeaking(false);
  }, []);

  return { supported, ready, voices, hasGerman: voices.length > 0, speaking, say, sayDialogue, stop };
}
