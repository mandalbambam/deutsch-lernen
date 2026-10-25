/** Small hand-made lists used by the generated drills. */

export const COMPARISONS: { w: string; c: string; s: string; note?: string }[] = [
  { w: 'schnell', c: 'schneller', s: 'am schnellsten' },
  { w: 'klein', c: 'kleiner', s: 'am kleinsten' },
  { w: 'schön', c: 'schöner', s: 'am schönsten' },
  { w: 'billig', c: 'billiger', s: 'am billigsten' },
  { w: 'laut', c: 'lauter', s: 'am lautesten', note: 'Adjectives ending in -t add -esten.' },
  { w: 'alt', c: 'älter', s: 'am ältesten', note: 'Short adjectives with a, o, u often take an umlaut; -t → -esten.' },
  { w: 'jung', c: 'jünger', s: 'am jüngsten', note: 'Short adjectives with a, o, u often take an umlaut.' },
  { w: 'groß', c: 'größer', s: 'am größten', note: 'groß takes an umlaut; after ß only -ten.' },
  { w: 'kalt', c: 'kälter', s: 'am kältesten', note: 'Umlaut; -t → -esten.' },
  { w: 'warm', c: 'wärmer', s: 'am wärmsten', note: 'Short adjectives with a often take an umlaut.' },
  { w: 'lang', c: 'länger', s: 'am längsten', note: 'Short adjectives with a often take an umlaut.' },
  { w: 'kurz', c: 'kürzer', s: 'am kürzesten', note: 'Umlaut; -z → -esten.' },
  { w: 'stark', c: 'stärker', s: 'am stärksten', note: 'Umlaut.' },
  { w: 'arm', c: 'ärmer', s: 'am ärmsten', note: 'Umlaut.' },
  { w: 'gut', c: 'besser', s: 'am besten', note: 'Irregular.' },
  { w: 'viel', c: 'mehr', s: 'am meisten', note: 'Irregular.' },
  { w: 'gern', c: 'lieber', s: 'am liebsten', note: 'Irregular.' },
  { w: 'hoch', c: 'höher', s: 'am höchsten', note: 'hoch loses its c in the comparative: höher.' },
  { w: 'nah', c: 'näher', s: 'am nächsten', note: 'Irregular superlative: am nächsten.' },
  { w: 'teuer', c: 'teurer', s: 'am teuersten', note: 'Adjectives in -er drop the e in the comparative: teurer.' },
  { w: 'dunkel', c: 'dunkler', s: 'am dunkelsten', note: 'Adjectives in -el drop the e in the comparative: dunkler.' },
  { w: 'heiß', c: 'heißer', s: 'am heißesten', note: '-ß → -esten.' },
  { w: 'interessant', c: 'interessanter', s: 'am interessantesten', note: '-t → -esten.' },
  { w: 'wichtig', c: 'wichtiger', s: 'am wichtigsten' },
  { w: 'leicht', c: 'leichter', s: 'am leichtesten', note: '-t → -esten.' },
  { w: 'schwer', c: 'schwerer', s: 'am schwersten' },
  { w: 'dumm', c: 'dümmer', s: 'am dümmsten', note: 'Umlaut.' },
  { w: 'klug', c: 'klüger', s: 'am klügsten', note: 'Umlaut.' },
];

/** Weak masculine nouns (people and animals): nominative singular → all other singular forms. */
export const WEAK_NOUNS: { w: string; f: string; en: string }[] = [
  { w: 'Kollege', f: 'Kollegen', en: 'colleague' },
  { w: 'Junge', f: 'Jungen', en: 'boy' },
  { w: 'Kunde', f: 'Kunden', en: 'customer' },
  { w: 'Neffe', f: 'Neffen', en: 'nephew' },
  { w: 'Löwe', f: 'Löwen', en: 'lion' },
  { w: 'Affe', f: 'Affen', en: 'monkey' },
  { w: 'Zeuge', f: 'Zeugen', en: 'witness' },
  { w: 'Experte', f: 'Experten', en: 'expert' },
  { w: 'Student', f: 'Studenten', en: 'student' },
  { w: 'Präsident', f: 'Präsidenten', en: 'president' },
  { w: 'Patient', f: 'Patienten', en: 'patient' },
  { w: 'Assistent', f: 'Assistenten', en: 'assistant' },
  { w: 'Polizist', f: 'Polizisten', en: 'police officer' },
  { w: 'Journalist', f: 'Journalisten', en: 'journalist' },
  { w: 'Tourist', f: 'Touristen', en: 'tourist' },
  { w: 'Soldat', f: 'Soldaten', en: 'soldier' },
  { w: 'Kandidat', f: 'Kandidaten', en: 'candidate' },
  { w: 'Biologe', f: 'Biologen', en: 'biologist' },
  { w: 'Psychologe', f: 'Psychologen', en: 'psychologist' },
  { w: 'Mensch', f: 'Menschen', en: 'human being' },
  { w: 'Herr', f: 'Herrn', en: 'gentleman / Mr' },
  { w: 'Nachbar', f: 'Nachbarn', en: 'neighbour' },
  { w: 'Bauer', f: 'Bauern', en: 'farmer' },
  { w: 'Held', f: 'Helden', en: 'hero' },
  { w: 'Prinz', f: 'Prinzen', en: 'prince' },
];

/** General adjectives without stem changes that fit most nouns, for adjective-ending drills. */
export const DRILL_ADJECTIVES = ['neu', 'alt', 'gut', 'schön', 'groß', 'klein', 'wichtig', 'interessant', 'toll', 'schlecht', 'bekannt', 'typisch', 'normal', 'richtig', 'falsch', 'lang', 'kurz'];

/** Uncountable nouns that are natural without an article. */
export const MASS_NOUNS: { w: string; g: 'm' | 'f' | 'n' }[] = [
  { w: 'Kaffee', g: 'm' },
  { w: 'Tee', g: 'm' },
  { w: 'Wein', g: 'm' },
  { w: 'Käse', g: 'm' },
  { w: 'Wasser', g: 'n' },
  { w: 'Brot', g: 'n' },
  { w: 'Geld', g: 'n' },
  { w: 'Obst', g: 'n' },
  { w: 'Milch', g: 'f' },
  { w: 'Musik', g: 'f' },
  { w: 'Zeit', g: 'f' },
  { w: 'Luft', g: 'f' },
];

/** Reliable gender clues from noun endings. */
export const GENDER_RULES: { re: RegExp; g: 'm' | 'f' | 'n'; text: string; /** letters required before the ending (default 3) */ min?: number }[] = [
  { re: /^(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonnabend|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember|frühling|sommer|herbst|winter)$/, g: 'm', text: 'Days, months and seasons are masculine.', min: 0 },
  { re: /(ung|heit|keit|schaft|ion|tät|ik|ur|ei|enz|anz)$/, g: 'f', text: 'Nouns ending in -ung, -heit, -keit, -schaft, -ion, -tät, -ik, -ur, -ei, -enz, -anz are feminine.' },
  { re: /(chen|lein)$/, g: 'n', text: 'Diminutives in -chen and -lein are always neuter.' },
  { re: /(ment|um|ma)$/, g: 'n', text: 'Nouns in -ment, -um and -ma are usually neuter.' },
  { re: /(ling|ismus|ist|or|ant)$/, g: 'm', text: 'Nouns ending in -ling, -ismus, -ist, -or, -ant are usually masculine.' },
  { re: /e$/, g: 'f', text: 'Most nouns ending in -e are feminine (exceptions: der Junge, das Auge …).' },
];
