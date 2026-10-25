import type { Level } from '@/lib/cefr';

export interface TopicMeta {
  id: string;
  level: Level;
  title: string;
  /** German grammar term */
  de: string;
  summary: string;
}

/** All grammar topics, A1 → C2, in a sensible learning order within each level. */
export const TOPICS: TopicMeta[] = [
  // A1
  { id: 'a1-sein-haben', level: 'A1', title: 'Personal pronouns, sein & haben', de: 'Personalpronomen, sein und haben', summary: 'ich bin, du hast … the two most important verbs.' },
  { id: 'a1-praesens', level: 'A1', title: 'Present tense: regular verbs', de: 'Präsens: regelmäßige Verben', summary: 'Stem + ending: ich lerne, du lernst, er lernt.' },
  { id: 'a1-praesens-vokalwechsel', level: 'A1', title: 'Present tense: stem-changing verbs', de: 'Präsens: Verben mit Vokalwechsel', summary: 'fahren → du fährst, lesen → er liest, nehmen → du nimmst.' },
  { id: 'a1-artikel-genus', level: 'A1', title: 'Articles and gender', de: 'Artikel und Genus', summary: 'der, die, das · ein, eine · gender clues from word endings.' },
  { id: 'a1-akkusativ', level: 'A1', title: 'The accusative case', de: 'Der Akkusativ', summary: 'den/einen for masculine objects; mich, dich, ihn …' },
  { id: 'a1-plural', level: 'A1', title: 'Plural of nouns', de: 'Pluralbildung', summary: 'The main plural patterns: -e, -er, -(e)n, -s, umlaut.' },
  { id: 'a1-satzbau', level: 'A1', title: 'Word order: statements and questions', de: 'Satzbau: Aussage und Frage', summary: 'The verb in position 2; W-questions; yes/no questions.' },
  { id: 'a1-negation', level: 'A1', title: 'Negation: nicht and kein', de: 'Negation: nicht und kein', summary: 'kein negates nouns with an indefinite or no article; nicht does the rest.' },
  { id: 'a1-modalverben', level: 'A1', title: 'Modal verbs', de: 'Modalverben', summary: 'können, müssen, wollen, möchten, dürfen, sollen + infinitive at the end.' },
  { id: 'a1-trennbare-verben', level: 'A1', title: 'Separable verbs', de: 'Trennbare Verben', summary: 'aufstehen → Ich stehe um sieben auf.' },
  { id: 'a1-possessiv', level: 'A1', title: 'Possessive articles', de: 'Possessivartikel', summary: 'mein, dein, sein, ihr, unser, euer, Ihr – with endings like ein.' },
  { id: 'a1-imperativ', level: 'A1', title: 'The imperative', de: 'Der Imperativ', summary: 'Komm! Kommt! Kommen Sie!' },
  { id: 'a1-praepositionen-zeit', level: 'A1', title: 'Time expressions: am, um, im', de: 'Temporale Präpositionen: am, um, im', summary: 'am Montag, um acht Uhr, im Mai.' },

  // A2
  { id: 'a2-dativ', level: 'A2', title: 'The dative case', de: 'Der Dativ', summary: 'dem/der/den…n; mir, dir, ihm; verbs like helfen, gefallen, gehören.' },
  { id: 'a2-praepositionen-kasus', level: 'A2', title: 'Prepositions with dative or accusative', de: 'Präpositionen mit Dativ oder Akkusativ', summary: 'aus, bei, mit, nach, seit, von, zu (+D) · durch, für, gegen, ohne, um (+A).' },
  { id: 'a2-wechselpraepositionen', level: 'A2', title: 'Two-way prepositions', de: 'Wechselpräpositionen', summary: 'Wo? → dative (im Park), Wohin? → accusative (in den Park).' },
  { id: 'a2-perfekt', level: 'A2', title: 'The perfect tense', de: 'Das Perfekt', summary: 'haben/sein + past participle: Ich habe gegessen. Wir sind gefahren.' },
  { id: 'a2-praeteritum-basis', level: 'A2', title: 'Simple past of sein, haben and modals', de: 'Präteritum: sein, haben, Modalverben', summary: 'war, hatte, konnte, musste, wollte, durfte, sollte.' },
  { id: 'a2-nebensaetze', level: 'A2', title: 'Subordinate clauses: weil, dass, wenn', de: 'Nebensätze mit weil, dass, wenn', summary: 'The conjugated verb goes to the end: …, weil ich müde bin.' },
  { id: 'a2-konjunktionen', level: 'A2', title: 'Linking sentences: und, aber, denn, deshalb, trotzdem', de: 'Konnektoren: und, aber, denn, deshalb, trotzdem', summary: 'Position 0 conjunctions vs. adverbs that take position 1.' },
  { id: 'a2-komparativ', level: 'A2', title: 'Comparison of adjectives', de: 'Komparativ und Superlativ', summary: 'schnell – schneller – am schnellsten; so … wie / als.' },
  { id: 'a2-reflexiv', level: 'A2', title: 'Reflexive verbs', de: 'Reflexive Verben', summary: 'sich freuen, sich waschen; mich/mir, dich/dir.' },
  { id: 'a2-adjektiv-basis', level: 'A2', title: 'Adjective endings: the basics', de: 'Adjektivdeklination: Grundlagen', summary: 'der neue Film, ein neuer Film – endings after der and ein.' },
  { id: 'a2-konjunktiv-hoeflich', level: 'A2', title: 'Polite requests', de: 'Höfliche Bitten mit Konjunktiv II', summary: 'Könnten Sie …? Ich hätte gern … Würden Sie …?' },
  { id: 'a2-zeitangaben', level: 'A2', title: 'Time prepositions: seit, vor, nach, ab, bis', de: 'Zeitangaben: seit, vor, nach, ab, bis', summary: 'seit drei Jahren, vor einer Woche, nach dem Essen.' },

  // B1
  { id: 'b1-praeteritum', level: 'B1', title: 'Simple past (Präteritum)', de: 'Das Präteritum', summary: 'Narrative past: ich ging, sie kam, wir machten.' },
  { id: 'b1-plusquamperfekt', level: 'B1', title: 'Past perfect', de: 'Das Plusquamperfekt', summary: 'Nachdem ich gegessen hatte, …' },
  { id: 'b1-relativsaetze', level: 'B1', title: 'Relative clauses', de: 'Relativsätze', summary: 'der Mann, der/den/dem …; mit dem, deren, dessen.' },
  { id: 'b1-passiv', level: 'B1', title: 'Passive voice: present and past', de: 'Passiv: Präsens und Präteritum', summary: 'Das Haus wird gebaut. Das Haus wurde 1990 gebaut.' },
  { id: 'b1-konjunktiv2', level: 'B1', title: 'Konjunktiv II: wishes, conditions, advice', de: 'Konjunktiv II: Wünsche, Bedingungen, Ratschläge', summary: 'Wenn ich Zeit hätte, würde ich … An deiner Stelle würde ich …' },
  { id: 'b1-infinitiv-zu', level: 'B1', title: 'Infinitive with zu; um … zu / damit', de: 'Infinitiv mit zu; um … zu / damit', summary: 'Ich versuche, pünktlich zu sein. Ich lerne, um … zu …' },
  { id: 'b1-temporalsaetze', level: 'B1', title: 'Time clauses: als, wenn, während, bevor, nachdem, bis, seit', de: 'Temporalsätze', summary: 'als vs. wenn; the order of events.' },
  { id: 'b1-konzessiv', level: 'B1', title: 'obwohl, trotzdem, deshalb', de: 'Konzessive und kausale Konnektoren', summary: 'Obwohl es regnet, … / Es regnet. Trotzdem …' },
  { id: 'b1-indirekte-fragen', level: 'B1', title: 'Indirect questions', de: 'Indirekte Fragen', summary: 'Weißt du, wann der Zug kommt? Ich frage mich, ob …' },
  { id: 'b1-adjektivdeklination', level: 'B1', title: 'Adjective endings: complete', de: 'Adjektivdeklination komplett', summary: 'All cases, including adjectives without an article: mit frischem Brot.' },
  { id: 'b1-genitiv', level: 'B1', title: 'The genitive', de: 'Der Genitiv', summary: 'das Auto meines Vaters; wegen, trotz, während + Genitiv.' },
  { id: 'b1-verben-praepositionen', level: 'B1', title: 'Verbs with prepositions; da- and wo- compounds', de: 'Verben mit Präpositionen; Präpositionaladverbien', summary: 'warten auf, sich freuen über/auf; darauf, worauf.' },
  { id: 'b1-futur', level: 'B1', title: 'Future I and uses of werden', de: 'Futur I und die Verwendung von werden', summary: 'Ich werde anrufen. werden as main verb, future and passive auxiliary.' },
  { id: 'b1-zweiteilige-konnektoren', level: 'B1', title: 'Two-part connectors', de: 'Zweiteilige Konnektoren', summary: 'sowohl … als auch, weder … noch, entweder … oder, nicht nur … sondern auch.' },
  { id: 'b1-lassen', level: 'B1', title: 'The verb lassen', de: 'Das Verb lassen', summary: 'Ich lasse mein Auto reparieren. Lass mich in Ruhe!' },

  // B2
  { id: 'b2-passiv-erweitert', level: 'B2', title: 'Passive: modal verbs, perfect, state passive', de: 'Passiv mit Modalverben, Perfekt und Zustandspassiv', summary: 'muss repariert werden · ist renoviert worden · ist geschlossen.' },
  { id: 'b2-passiversatz', level: 'B2', title: 'Alternatives to the passive', de: 'Passiversatzformen', summary: 'man · sich lassen · sein + zu · -bar/-lich.' },
  { id: 'b2-konjunktiv2-vergangenheit', level: 'B2', title: 'Konjunktiv II in the past', de: 'Konjunktiv II der Vergangenheit', summary: 'Ich hätte es gewusst. Du hättest anrufen sollen.' },
  { id: 'b2-partizipien', level: 'B2', title: 'Participles as adjectives', de: 'Partizip I und II als Adjektiv', summary: 'die steigenden Preise, das reparierte Auto.' },
  { id: 'b2-konnektoren', level: 'B2', title: 'Connectors: je … desto, indem, sodass, ohne dass, (an)statt', de: 'Konnektoren: je … desto, indem, sodass, ohne dass, statt', summary: 'Expressing manner, consequence and alternatives.' },
  { id: 'b2-praepositionen-genitiv', level: 'B2', title: 'Prepositions with the genitive', de: 'Präpositionen mit Genitiv', summary: 'aufgrund, innerhalb, außerhalb, anstelle, bezüglich, infolge.' },
  { id: 'b2-modalverben-vermutung', level: 'B2', title: 'Modal verbs for assumptions; Futur II', de: 'Modalverben der Vermutung; Futur II', summary: 'Er muss krank sein. Sie dürfte schon da sein. Er wird es vergessen haben.' },
  { id: 'b2-n-deklination', level: 'B2', title: 'Weak nouns (n-declension)', de: 'Die n-Deklination', summary: 'der Kollege → den/dem/des Kollegen; Herr, Mensch, Student.' },
  { id: 'b2-nominalisierung', level: 'B2', title: 'Nominalisation: the basics', de: 'Nominalisierung: Grundlagen', summary: 'ankommen → die Ankunft; bei der Ankunft = als … ankam.' },
  { id: 'b2-relativ-wer-was', level: 'B2', title: 'Relative clauses with wer, was, wo(r)-', de: 'Relativsätze mit wer, was, wo(r)-', summary: 'Wer …, (der) … · alles, was … · das Beste, was …' },
  { id: 'b2-modalpartikeln', level: 'B2', title: 'Modal particles: the basics', de: 'Modalpartikeln: Grundlagen', summary: 'doch, mal, ja, eben, halt, denn – what they add to a sentence.' },
  { id: 'b2-satzstellung', level: 'B2', title: 'Word order in the middle field', de: 'Satzstellung im Mittelfeld', summary: 'TeKaMoLo, pronoun before noun, position of nicht.' },

  // C1
  { id: 'c1-konjunktiv1', level: 'C1', title: 'Konjunktiv I: reported speech', de: 'Konjunktiv I: indirekte Rede', summary: 'Er sagte, er sei krank. Ersatzformen with Konjunktiv II.' },
  { id: 'c1-nominalstil', level: 'C1', title: 'Nominal style vs. verbal style', de: 'Nominalstil und Verbalstil', summary: 'Nach Abschluss des Projekts ↔ Nachdem das Projekt abgeschlossen war.' },
  { id: 'c1-funktionsverbgefuege', level: 'C1', title: 'Functional verb constructions', de: 'Funktionsverbgefüge', summary: 'in Frage kommen, zur Verfügung stellen, Kritik üben, in Kraft treten.' },
  { id: 'c1-partizipialattribute', level: 'C1', title: 'Extended participle attributes', de: 'Erweiterte Partizipialattribute', summary: 'die von der Regierung beschlossenen Maßnahmen.' },
  { id: 'c1-passiv-varianten', level: 'C1', title: 'Passive variants', de: 'Passivvarianten', summary: 'Impersonal passive, von vs. durch, bekommen-passive.' },
  { id: 'c1-modalpartikeln', level: 'C1', title: 'Modal particles in depth', de: 'Modalpartikeln vertieft', summary: 'wohl, schon, eigentlich, ruhig, bloß, nur, etwa, denn.' },
  { id: 'c1-konnektoren', level: 'C1', title: 'Connectors for cohesion', de: 'Konnektoren für Textzusammenhang', summary: 'zumal, insofern, wohingegen, folglich, demzufolge, allerdings.' },
  { id: 'c1-irreale-vergleiche', level: 'C1', title: 'Unreal comparisons', de: 'Irreale Vergleichssätze', summary: 'als ob er krank wäre · als wäre nichts passiert.' },
  { id: 'c1-rektion', level: 'C1', title: 'Fixed prepositions of nouns and adjectives', de: 'Rektion von Nomen und Adjektiven', summary: 'die Angst vor, stolz auf, die Auseinandersetzung mit …' },
  { id: 'c1-wortbildung', level: 'C1', title: 'Word formation', de: 'Wortbildung', summary: 'Prefixes and suffixes: -ung, -heit, -keit, -schaft, un-, miss-, -bar.' },
  { id: 'c1-sollen-wollen', level: 'C1', title: 'Reported claims with sollen and wollen', de: 'Redewiedergabe mit sollen und wollen', summary: 'Er soll reich sein. Sie will nichts gesehen haben.' },

  // C2
  { id: 'c2-konjunktiv1-formell', level: 'C2', title: 'Konjunktiv I in formal and academic texts', de: 'Konjunktiv I in formellen Texten', summary: 'Distance in reporting; Man nehme …; es sei denn.' },
  { id: 'c2-partizipialsaetze', level: 'C2', title: 'Participle clauses', de: 'Partizipialsätze', summary: 'Am Bahnhof angekommen, rief er an. Vom Lärm geweckt, …' },
  { id: 'c2-funktionsverbgefuege', level: 'C2', title: 'Functional verb constructions: advanced', de: 'Funktionsverbgefüge: vertieft', summary: 'zur Diskussion stellen vs. stehen; aktivische und passivische Varianten.' },
  { id: 'c2-modalpartikeln', level: 'C2', title: 'Particle combinations and nuance', de: 'Partikelkombinationen und Nuancen', summary: 'doch mal, ja wohl, eben halt, denn eigentlich.' },
  { id: 'c2-register', level: 'C2', title: 'Register: colloquial, standard, formal', de: 'Register: umgangssprachlich, neutral, gehoben', summary: 'Choosing words and structures for the situation.' },
  { id: 'c2-idiomatik', level: 'C2', title: 'Idioms and fixed expressions', de: 'Redewendungen und feste Wendungen', summary: 'jemandem reinen Wein einschenken, etwas auf die lange Bank schieben.' },
  { id: 'c2-konnektoren-nuance', level: 'C2', title: 'Nuanced concessive and adversative connectors', de: 'Konzessive und adversative Konnektoren im gehobenen Stil', summary: 'gleichwohl, wenngleich, nichtsdestotrotz, mithin, ungeachtet.' },
  { id: 'c2-informationsstruktur', level: 'C2', title: 'Information structure: Vorfeld and emphasis', de: 'Informationsstruktur: Vorfeld, Ausklammerung, Betonung', summary: 'What goes first, what goes last – and why.' },
  { id: 'c2-doppelinfinitiv', level: 'C2', title: 'Double infinitive and verb clusters', de: 'Doppelinfinitiv und Verbalkomplexe', summary: '…, obwohl er es hätte wissen müssen.' },
  { id: 'c2-genitiv-gehoben', level: 'C2', title: 'Genitive objects and elevated style', de: 'Genitivobjekte und gehobener Stil', summary: 'gedenken, bedürfen, sich einer Sache bedienen/enthalten.' },
];

export const TOPIC_BY_ID: Record<string, TopicMeta> = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
