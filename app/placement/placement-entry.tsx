'use client';

import { useSearchParams } from 'next/navigation';
import { Loading } from '@/components/ui/misc';
import { useSkillStates } from '@/lib/db/profile';
import { TESTED_SKILLS } from '@/lib/db/types';
import { PlacementClient } from './placement-client';

/** /placement → full placement test; /placement?mode=check → short level check around the current level. */
export function PlacementEntry() {
  const check = useSearchParams().get('mode') === 'check';
  const states = useSkillStates();
  if (!check) return <PlacementClient key="placement" />;
  if (!states) return <Loading />;
  const thetas = TESTED_SKILLS.map((s) => states[s]?.theta).filter((t): t is number => typeof t === 'number');
  // without any previous result a level check makes no sense: run the placement test
  if (!thetas.length) return <PlacementClient key="placement" />;
  const prior = thetas.reduce((a, b) => a + b, 0) / thetas.length;
  return <PlacementClient key="levelcheck" kind="levelcheck" priorTheta={prior} />;
}
