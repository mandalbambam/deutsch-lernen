/** Interest tags: chosen during onboarding, used to pick texts, sentences and role-plays. */
export const INTERESTS = [
  { id: 'travel', label: 'Travel', de: 'Reisen' },
  { id: 'food', label: 'Food & cooking', de: 'Essen & Kochen' },
  { id: 'work', label: 'Work & career', de: 'Arbeit & Beruf' },
  { id: 'tech', label: 'Technology', de: 'Technik' },
  { id: 'science', label: 'Science', de: 'Wissenschaft' },
  { id: 'society', label: 'Politics & society', de: 'Politik & Gesellschaft' },
  { id: 'culture', label: 'Culture & art', de: 'Kultur & Kunst' },
  { id: 'literature', label: 'Books & literature', de: 'Literatur' },
  { id: 'history', label: 'History', de: 'Geschichte' },
  { id: 'sport', label: 'Sport', de: 'Sport' },
  { id: 'nature', label: 'Nature & environment', de: 'Natur & Umwelt' },
  { id: 'health', label: 'Health', de: 'Gesundheit' },
  { id: 'film', label: 'Film & music', de: 'Film & Musik' },
  { id: 'people', label: 'Family & relationships', de: 'Familie & Beziehungen' },
  { id: 'economy', label: 'Economy & money', de: 'Wirtschaft & Geld' },
] as const;

export type InterestId = (typeof INTERESTS)[number]['id'];
