/**
 * Error taxonomy shared by the placement test, exercises, the writing coach and the dashboard.
 * Every tag links to the grammar topics that fix it.
 */
export interface ErrorTag {
  label: string;
  hint: string;
  topics: string[];
}

export const ERROR_TAGS = {
  // nouns, articles, cases
  gender: { label: 'Noun gender (der/die/das)', hint: 'Learn every noun together with its article.', topics: ['a1-artikel-genus'] },
  plural: { label: 'Plural forms', hint: 'Plurals are irregular — learn them with the noun.', topics: ['a1-plural'] },
  'case.acc': { label: 'Accusative', hint: 'Direct objects take the accusative: den/einen for masculine nouns.', topics: ['a1-akkusativ'] },
  'case.dat': { label: 'Dative', hint: 'Indirect objects and many verbs (helfen, gefallen) take the dative.', topics: ['a2-dativ'] },
  'case.gen': { label: 'Genitive', hint: 'Possession and some prepositions need the genitive: des/der … -(e)s.', topics: ['b1-genitiv', 'b2-praepositionen-genitiv'] },
  'case.prep': { label: 'Case after prepositions', hint: 'Each preposition governs a case: mit + D, für + A, wegen + G.', topics: ['a2-praepositionen-kasus', 'b2-praepositionen-genitiv'] },
  'case.two-way': { label: 'Two-way prepositions', hint: 'Location (wo?) → dative; movement to a goal (wohin?) → accusative.', topics: ['a2-wechselpraepositionen'] },
  'n-decl': { label: 'Weak nouns (n-declension)', hint: 'den/dem/des Kollegen, Menschen, Studenten, Herrn.', topics: ['b2-n-deklination'] },
  'adj.ending': { label: 'Adjective endings', hint: 'The ending depends on article type, gender, case and number.', topics: ['a2-adjektiv-basis', 'b1-adjektivdeklination'] },
  'adj.comparison': { label: 'Comparative & superlative', hint: 'schneller als, so schnell wie, am schnellsten.', topics: ['a2-komparativ'] },
  pronoun: { label: 'Pronouns', hint: 'Match pronoun form to case: er/ihn/ihm, sie/ihr.', topics: ['a1-sein-haben', 'a1-akkusativ', 'a2-dativ'] },
  possessive: { label: 'Possessive articles', hint: 'mein/meine/meinen … take the same endings as ein.', topics: ['a1-possessiv'] },
  reflexive: { label: 'Reflexive verbs', hint: 'sich freuen, sich etwas vorstellen — mich/mir, dich/dir.', topics: ['a2-reflexiv'] },
  negation: { label: 'Negation (nicht/kein)', hint: 'kein replaces ein/no article; nicht negates everything else.', topics: ['a1-negation'] },
  preposition: { label: 'Choice of preposition', hint: 'Prepositions rarely translate 1:1 — learn them in phrases.', topics: ['a1-praepositionen-zeit', 'a2-zeitangaben', 'b1-verben-praepositionen'] },

  // verbs
  'verb.conjugation': { label: 'Verb endings (present tense)', hint: 'ich -e, du -st, er -t, wir -en, ihr -t, sie -en.', topics: ['a1-praesens', 'a1-praesens-vokalwechsel', 'a1-sein-haben'] },
  'verb.modal': { label: 'Modal verbs', hint: 'Modal verb in position 2, infinitive at the end; no -t in ich/er kann.', topics: ['a1-modalverben'] },
  'verb.separable': { label: 'Separable verbs', hint: 'The prefix goes to the end of a main clause: Ich rufe dich an.', topics: ['a1-trennbare-verben'] },
  'verb.aux': { label: 'haben or sein in the perfect', hint: 'sein for movement/change of state (gehen, fahren, werden, bleiben).', topics: ['a2-perfekt'] },
  'verb.participle': { label: 'Past participles', hint: 'ge-…-t (regular), ge-…-en (strong); no ge- for -ieren and be-/ver- verbs.', topics: ['a2-perfekt'] },
  'verb.preterite': { label: 'Simple past forms', hint: 'Strong verbs change their vowel: ging, kam, nahm.', topics: ['a2-praeteritum-basis', 'b1-praeteritum'] },
  'verb.tense': { label: 'Tense choice and sequence', hint: 'Plusquamperfekt for the earlier of two past events; nachdem + Plusquamperfekt.', topics: ['b1-plusquamperfekt', 'b1-futur'] },
  'verb.prep': { label: 'Verbs with fixed prepositions', hint: 'warten auf, denken an, sich interessieren für — learn them as units.', topics: ['b1-verben-praepositionen', 'c1-rektion'] },
  'verb.imperative': { label: 'Imperative forms', hint: 'du: Komm! (no -st), ihr: Kommt!, Sie: Kommen Sie!', topics: ['a1-imperativ'] },
  'mood.konj2': { label: 'Konjunktiv II', hint: 'würde + infinitive, or hätte/wäre/könnte for unreal situations and politeness.', topics: ['a2-konjunktiv-hoeflich', 'b1-konjunktiv2', 'b2-konjunktiv2-vergangenheit'] },
  'mood.konj1': { label: 'Konjunktiv I / reported speech', hint: 'er sei, sie habe, es werde — replace by Konjunktiv II when forms coincide.', topics: ['c1-konjunktiv1', 'c2-konjunktiv1-formell'] },
  'voice.passive': { label: 'Passive voice', hint: 'werden + participle (process), sein + participle (state); worden in the perfect.', topics: ['b1-passiv', 'b2-passiv-erweitert', 'c1-passiv-varianten'] },
  'voice.passive-alt': { label: 'Passive alternatives', hint: 'man, sich lassen, sein + zu, -bar.', topics: ['b2-passiversatz'] },
  infinitive: { label: 'Infinitive with/without zu', hint: 'zu after most verbs and phrases, not after modal verbs; um … zu for purpose.', topics: ['b1-infinitiv-zu'] },
  'modal.subjective': { label: 'Modal verbs for assumptions and claims', hint: 'muss/dürfte/könnte for guesses; soll/will for reported claims.', topics: ['b2-modalverben-vermutung', 'c1-sollen-wollen'] },
  lassen: { label: 'lassen', hint: 'lassen + infinitive: have something done / allow.', topics: ['b1-lassen'] },

  // syntax
  'order.v2': { label: 'Verb-second word order', hint: 'In main clauses the conjugated verb is always the second element.', topics: ['a1-satzbau', 'a2-konjunktionen'] },
  'order.verb-final': { label: 'Verb at the end of subordinate clauses', hint: 'After weil, dass, wenn, obwohl … the conjugated verb goes last.', topics: ['a2-nebensaetze', 'b1-temporalsaetze'] },
  'order.bracket': { label: 'Sentence bracket', hint: 'Infinitive, participle and separable prefix go to the end.', topics: ['a1-modalverben', 'a1-trennbare-verben', 'a2-perfekt'] },
  'order.midfield': { label: 'Word order in the middle field', hint: 'Pronouns before nouns; time – cause – manner – place.', topics: ['b2-satzstellung', 'c2-informationsstruktur'] },
  connector: { label: 'Connectors', hint: 'Know which connectors change word order (weil) and which do not (denn).', topics: ['a2-konjunktionen', 'b1-konzessiv', 'b1-zweiteilige-konnektoren', 'b2-konnektoren', 'c1-konnektoren', 'c2-konnektoren-nuance'] },
  'clause.time': { label: 'als / wenn / während / nachdem', hint: 'als: one event in the past; wenn: repeated or future events.', topics: ['b1-temporalsaetze'] },
  relative: { label: 'Relative clauses', hint: 'Gender/number from the noun, case from the role in the relative clause.', topics: ['b1-relativsaetze', 'b2-relativ-wer-was'] },
  question: { label: 'Questions and indirect questions', hint: 'Indirect questions are subordinate clauses: …, ob/wann … verb.', topics: ['a1-satzbau', 'b1-indirekte-fragen'] },
  'participle-attr': { label: 'Participles as adjectives', hint: 'Partizip I = ongoing/active (die lachenden Kinder), Partizip II = completed/passive.', topics: ['b2-partizipien', 'c1-partizipialattribute', 'c2-partizipialsaetze'] },
  'nominal-style': { label: 'Nominal style', hint: 'Turn clauses into noun phrases: weil es regnete → wegen des Regens.', topics: ['b2-nominalisierung', 'c1-nominalstil'] },
  fvg: { label: 'Functional verb constructions', hint: 'Noun + light verb units: in Anspruch nehmen, zur Sprache bringen.', topics: ['c1-funktionsverbgefuege', 'c2-funktionsverbgefuege'] },
  'modal-particle': { label: 'Modal particles', hint: 'doch, ja, mal, eben, halt, wohl … colour the speaker’s attitude.', topics: ['b2-modalpartikeln', 'c1-modalpartikeln', 'c2-modalpartikeln'] },
  'irreal-comparison': { label: 'Unreal comparisons', hint: 'als ob + Konjunktiv II (verb last) or als + Konjunktiv II (verb second).', topics: ['c1-irreale-vergleiche'] },
  'double-infinitive': { label: 'Double infinitive', hint: 'hätte … machen sollen; in subordinate clauses hätte comes before the infinitives.', topics: ['c2-doppelinfinitiv'] },

  // vocabulary
  'lexis.meaning': { label: 'Word meaning', hint: 'Review the word with an example sentence.', topics: [] },
  'lexis.collocation': { label: 'Collocations', hint: 'Learn words in the combinations natives use: eine Entscheidung treffen.', topics: ['c1-funktionsverbgefuege'] },
  'lexis.idiom': { label: 'Idioms', hint: 'Idioms carry figurative meaning — learn the whole phrase.', topics: ['c2-idiomatik'] },
  'lexis.register': { label: 'Register and style', hint: 'Match formality to the situation.', topics: ['c2-register'] },
  'lexis.word-formation': { label: 'Word formation', hint: 'Prefixes and suffixes change meaning and word class.', topics: ['c1-wortbildung'] },
  'lexis.nuance': { label: 'Near-synonyms and nuance', hint: 'Similar words differ in connotation and usage.', topics: ['c2-register'] },
  'lexis.false-friend': { label: 'False friends', hint: 'German words that look like English ones but mean something else.', topics: [] },

  // comprehension
  'reading.gist': { label: 'Reading: main idea', hint: 'Read the whole text once for the overall message before details.', topics: [] },
  'reading.detail': { label: 'Reading: details', hint: 'Locate the exact sentence that answers the question.', topics: [] },
  'reading.inference': { label: 'Reading: implied meaning', hint: 'Ask what the author suggests but does not say directly.', topics: [] },
  'listening.gist': { label: 'Listening: main idea', hint: 'First listen for who, where and why.', topics: [] },
  'listening.detail': { label: 'Listening: details', hint: 'Numbers, times and names — note them while listening.', topics: [] },
  'listening.inference': { label: 'Listening: attitude and implication', hint: 'Tone, particles and word choice reveal the speaker’s opinion.', topics: ['c1-modalpartikeln'] },

  // writing (AI coach)
  spelling: { label: 'Spelling', hint: 'Watch ß/ss, umlauts and double consonants.', topics: [] },
  capitalization: { label: 'Capitalisation', hint: 'All nouns (and nominalised words) start with a capital letter.', topics: ['a1-artikel-genus'] },
  punctuation: { label: 'Punctuation', hint: 'Commas are required before subordinate and relative clauses.', topics: ['a2-nebensaetze', 'b1-relativsaetze'] },
  style: { label: 'Style and naturalness', hint: 'Grammatically fine, but a native speaker would say it differently.', topics: ['c2-register'] },
} satisfies Record<string, ErrorTag>;

export type ErrorTagId = keyof typeof ERROR_TAGS;

export function errorTag(id: string): ErrorTag {
  return (ERROR_TAGS as Record<string, ErrorTag>)[id] ?? { label: id, hint: '', topics: [] };
}

export const ERROR_TAG_IDS = Object.keys(ERROR_TAGS) as ErrorTagId[];
