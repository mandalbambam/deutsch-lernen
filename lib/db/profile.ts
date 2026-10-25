import { useLiveQuery } from 'dexie-react-hooks';
import { LEVELS, type Level } from '@/lib/cefr';
import { db } from './index';
import type { Profile, Skill, SkillState } from './types';

export const DEFAULT_PROFILE: Profile = {
  id: 'me',
  createdAt: 0,
  updatedAt: 0,
  uiLang: 'en',
  dailyMinutes: 30,
  goals: [],
  interests: [],
  onboarded: false,
  tts: { rate: 0.95 },
  srs: { retention: 0.9, maxNewPerDay: 15, maxReviewsPerDay: 200, genderDrill: true, autoplay: true },
  ai: {},
};

export async function getProfile(): Promise<Profile> {
  const p = await db.profile.get('me');
  return p ? { ...DEFAULT_PROFILE, ...p, srs: { ...DEFAULT_PROFILE.srs, ...p.srs } } : { ...DEFAULT_PROFILE, createdAt: Date.now(), updatedAt: Date.now() };
}

export async function updateProfile(patch: Partial<Omit<Profile, 'id'>>): Promise<void> {
  const current = await getProfile();
  await db.profile.put({ ...current, ...patch, id: 'me', updatedAt: Date.now() });
}

/** Live profile (falls back to defaults until IndexedDB has answered). */
export function useProfile(): Profile {
  const p = useLiveQuery(() => db.profile.get('me'), []);
  return p ? { ...DEFAULT_PROFILE, ...p, srs: { ...DEFAULT_PROFILE.srs, ...p.srs } } : DEFAULT_PROFILE;
}

export function useSkillStates(): Partial<Record<Skill, SkillState>> | undefined {
  return useLiveQuery(async () => {
    const all = await db.skillState.toArray();
    return Object.fromEntries(all.map((s) => [s.skill, s])) as Partial<Record<Skill, SkillState>>;
  }, []);
}

/** Overall level = rounded mean of the tested skills' abilities. */
export function overallLevel(states: Partial<Record<Skill, SkillState>> | undefined): Level | undefined {
  if (!states) return undefined;
  const thetas = (['grammar', 'vocabulary', 'reading', 'listening'] as const)
    .map((s) => states[s]?.theta)
    .filter((t): t is number => typeof t === 'number');
  if (thetas.length === 0) return undefined;
  const mean = thetas.reduce((a, b) => a + b, 0) / thetas.length;
  return LEVELS[Math.min(5, Math.max(0, Math.floor(mean + 0.5) - 1))];
}
