import type { DrillKind, Exercise } from '@/lib/exercise/types';
import { A1_EXTRA } from './a1';
import { A2_EXTRA } from './a2';
import { B1_EXTRA } from './b1';
import { B2_EXTRA } from './b2';
import { C1_EXTRA } from './c1';
import { C2_EXTRA } from './c2';

/** Additional hand-written exercises per lesson id, appended after the lesson's own exercises. */
export const EXTRA_EXERCISES: Record<string, Exercise[]> = {
  ...A1_EXTRA,
  ...A2_EXTRA,
  ...B1_EXTRA,
  ...B2_EXTRA,
  ...C1_EXTRA,
  ...C2_EXTRA,
};

/** Generated drills added to lessons (B1–C2), so every advanced topic has unlimited practice. */
export const EXTRA_DRILLS: Record<string, DrillKind[]> = {
  'b1-plusquamperfekt': ['pluperfect'],
  'b1-relativsaetze': ['relative'],
  'b1-passiv': ['passive'],
  'b1-infinitiv-zu': ['zu-infinitive'],
  'b1-temporalsaetze': ['time-clause'],
  'b1-konzessiv': ['concessive'],
  'b1-indirekte-fragen': ['indirect-question'],
  'b1-verben-praepositionen': ['verb-prep'],
  'b1-futur': ['future'],
  'b1-zweiteilige-konnektoren': ['two-part'],
  'b1-lassen': ['lassen'],
  'b2-passiv-erweitert': ['passive-advanced'],
  'b2-passiversatz': ['passive-alt'],
  'b2-konjunktiv2-vergangenheit': ['konj2-past'],
  'b2-partizipien': ['participle'],
  'b2-konnektoren': ['connector-b2'],
  'b2-modalverben-vermutung': ['subjective-modal'],
  'b2-nominalisierung': ['nominalisation'],
  'b2-relativ-wer-was': ['relative-was'],
  'b2-modalpartikeln': ['particles-b2'],
  'b2-satzstellung': ['midfield'],
  'c1-konjunktiv1': ['konj1-report'],
  'c1-nominalstil': ['nominal-style'],
  'c1-funktionsverbgefuege': ['fvg-c1'],
  'c1-partizipialattribute': ['participle-ext'],
  'c1-passiv-varianten': ['passive-variants'],
  'c1-modalpartikeln': ['particles-c1'],
  'c1-konnektoren': ['connector-c1'],
  'c1-irreale-vergleiche': ['irreal-comparison'],
  'c1-rektion': ['rektion'],
  'c1-wortbildung': ['word-formation'],
  'c1-sollen-wollen': ['hearsay'],
  'c2-konjunktiv1-formell': ['konj1-formal'],
  'c2-partizipialsaetze': ['participle-clause'],
  'c2-funktionsverbgefuege': ['fvg-c2'],
  'c2-modalpartikeln': ['particles-c2'],
  'c2-register': ['register'],
  'c2-idiomatik': ['idioms'],
  'c2-konnektoren-nuance': ['connector-c2'],
  'c2-informationsstruktur': ['information-structure'],
  'c2-doppelinfinitiv': ['double-infinitive'],
  'c2-genitiv-gehoben': ['genitive-verbs'],
};
