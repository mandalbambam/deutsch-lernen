import type { GrammarLesson } from '@/lib/exercise/types';

export const A1_LESSONS: GrammarLesson[] = [
  {
    id: 'a1-sein-haben',
    explanation: `The two most important verbs are irregular — learn them by heart:

| | sein (to be) | haben (to have) |
|---|---|---|
| ich | bin | habe |
| du | bist | hast |
| er / sie / es | ist | hat |
| wir | sind | haben |
| ihr | seid | habt |
| sie / Sie | sind | haben |

**du** is for friends, family and children; **Sie** (always with a capital S) is the polite form for adults you don’t know well. *Sie* uses the same verb form as *sie* (they).

> Age is expressed with **sein**: *Ich bin 30 (Jahre alt).* Hunger, thirst and time use **haben**: *Ich habe Hunger. Hast du Zeit?*`,
    examples: [
      { de: 'Ich bin Lehrerin.', en: 'I am a teacher.' },
      { de: 'Hast du heute Zeit?', en: 'Do you have time today?' },
      { de: 'Wir sind müde.', en: 'We are tired.' },
      { de: 'Haben Sie ein Auto?', en: 'Do you have a car? (polite)' },
    ],
    exercises: [
      { id: 'a1-sein-haben-1', kind: 'fill', prompt: 'Du ___ sehr nett.', hint: 'sein', answers: ['bist'], tag: 'verb.conjugation', explain: 'sein with du: du bist.', feedback: { ist: 'ist goes with er/sie/es. With du it is bist.', bin: 'bin goes with ich.' } },
      { id: 'a1-sein-haben-2', kind: 'fill', prompt: 'Wir ___ zwei Katzen.', hint: 'haben', answers: ['haben'], tag: 'verb.conjugation', explain: 'haben with wir: wir haben.', feedback: { habt: 'habt is the ihr form.', hat: 'hat is the er/sie/es form.' } },
      { id: 'a1-sein-haben-3', kind: 'choice', prompt: '___ ihr heute Abend Zeit?', options: ['Habt', 'Hat', 'Haben', 'Hast'], tag: 'verb.conjugation', explain: 'haben with ihr: ihr habt.', why: ['hat is the er/sie/es form.', 'haben goes with wir and sie/Sie.', 'hast goes with du.'] },
      { id: 'a1-sein-haben-4', kind: 'fill', prompt: 'Frau Müller, ___ Sie Kinder?', hint: 'haben', answers: ['haben'], tag: 'verb.conjugation', explain: 'The polite Sie takes the same form as sie (they): Sie haben.', feedback: { hat: 'Sie (polite) is grammatically plural: Sie haben.', habt: 'habt is the ihr form.' } },
      { id: 'a1-sein-haben-5', kind: 'choice', prompt: 'Mein Bruder ___ 25 Jahre alt.', options: ['ist', 'hat', 'sind', 'bist'], tag: 'verb.conjugation', explain: 'In German age is expressed with sein: Er ist 25 Jahre alt.', why: ['Unlike in some languages, German uses sein (not haben) for age.', 'sind is plural.', 'bist goes with du.'] },
      { id: 'a1-sein-haben-6', kind: 'correct', sentence: 'Ich habe 30 Jahre alt.', answers: ['Ich bin 30 Jahre alt.'], tag: 'verb.conjugation', explain: 'Age uses sein: Ich bin 30 Jahre alt.' },
      { id: 'a1-sein-haben-7', kind: 'fill', prompt: 'Ihr ___ heute sehr laut!', hint: 'sein', answers: ['seid'], tag: 'verb.conjugation', explain: 'sein with ihr: ihr seid (with d).', feedback: { seit: 'seit (since) is a preposition. The verb is spelt seid.', sind: 'sind is for wir and sie/Sie.' } },
      { id: 'a1-sein-haben-8', kind: 'order', words: ['Hast', 'du', 'heute', 'Zeit?'], tag: 'order.v2', explain: 'A yes/no question starts with the verb: Hast du heute Zeit?' },
    ],
    drills: ['present'],
  },
  {
    id: 'a1-praesens',
    explanation: `Most verbs are regular. Remove **-en** (or **-n**) from the infinitive to get the stem, then add the ending:

| | lernen | arbeiten | heißen |
|---|---|---|---|
| ich | lern**e** | arbeit**e** | heiß**e** |
| du | lern**st** | arbeit**est** | heiß**t** |
| er / sie / es | lern**t** | arbeit**et** | heiß**t** |
| wir | lern**en** | arbeit**en** | heiß**en** |
| ihr | lern**t** | arbeit**et** | heiß**t** |
| sie / Sie | lern**en** | arbeit**en** | heiß**en** |

- Stems ending in **-t / -d** (arbeiten, finden) add an **e**: du arbeit**e**st, er find**e**t.
- Stems ending in **-s / -ß / -z** (heißen, tanzen) only add **-t** with du: du heißt, du tanzt.
- The present tense is also used for the future: *Morgen fahre ich nach Wien.*`,
    examples: [
      { de: 'Ich wohne in Hamburg.', en: 'I live in Hamburg.' },
      { de: 'Was machst du heute?', en: 'What are you doing today?' },
      { de: 'Sie arbeitet in einer Bank.', en: 'She works in a bank.' },
    ],
    exercises: [
      { id: 'a1-praesens-1', kind: 'fill', prompt: 'Ich ___ in Berlin.', hint: 'wohnen', answers: ['wohne'], tag: 'verb.conjugation', explain: 'ich → -e: ich wohne.', feedback: { wohnen: 'wohnen is the infinitive / wir form. ich → -e.', wohnt: 'wohnt goes with er/sie/es or ihr.' } },
      { id: 'a1-praesens-2', kind: 'fill', prompt: 'Was ___ du am Wochenende?', hint: 'machen', answers: ['machst'], tag: 'verb.conjugation', explain: 'du → -st: du machst.', feedback: { macht: 'macht is the er/sie/es or ihr form. With du: machst.', mache: 'mache is the ich form.' } },
      { id: 'a1-praesens-3', kind: 'fill', prompt: 'Meine Schwester ___ in einer Bank.', hint: 'arbeiten', answers: ['arbeitet'], tag: 'verb.conjugation', explain: 'Stems ending in -t add an extra e: sie arbeitet.', feedback: { arbeitt: 'Stems ending in -t need an extra e: arbeitet.', arbeit: 'er/sie/es needs an ending: arbeitet.' } },
      { id: 'a1-praesens-4', kind: 'choice', prompt: 'Wie ___ du? – Ich heiße Tom.', options: ['heißt', 'heißst', 'heiße', 'heißen'], tag: 'verb.conjugation', explain: 'After -ß only -t is added for du: du heißt.', why: ['The stem already ends in ß, so du only adds -t.', 'heiße is the ich form.', 'heißen goes with wir and sie/Sie.'] },
      { id: 'a1-praesens-5', kind: 'fill', prompt: 'Wir ___ jeden Tag Deutsch.', hint: 'lernen', answers: ['lernen'], tag: 'verb.conjugation', explain: 'wir → -en: wir lernen.', feedback: { lernt: 'lernt goes with er/sie/es or ihr.' } },
      { id: 'a1-praesens-6', kind: 'fill', prompt: 'Ihr ___ sehr gut!', hint: 'tanzen', answers: ['tanzt'], tag: 'verb.conjugation', explain: 'ihr → -t: ihr tanzt.', feedback: { tanzen: 'tanzen goes with wir and sie/Sie.', tanzst: 'There is no -st with ihr: ihr tanzt.' } },
      { id: 'a1-praesens-7', kind: 'correct', sentence: 'Er wohnen in Hamburg.', answers: ['Er wohnt in Hamburg.'], tag: 'verb.conjugation', explain: 'er/sie/es → -t: er wohnt.' },
      { id: 'a1-praesens-8', kind: 'fill', prompt: '___ du den Weg?', hint: 'finden', answers: ['Findest', 'findest'], tag: 'verb.conjugation', explain: 'Stems ending in -d add an extra e: du findest.', feedback: { findst: 'Stems ending in -d need an extra e: findest.', findet: 'findet goes with er/sie/es or ihr.' } },
    ],
    drills: ['present'],
  },
  {
    id: 'a1-praesens-vokalwechsel',
    explanation: `Some strong verbs change their stem vowel — **only with du and er/sie/es**:

| change | infinitive | du | er / sie / es |
|---|---|---|---|
| e → i | sprechen, helfen, geben, essen | sprichst, hilfst, gibst, isst | spricht, hilft, gibt, isst |
| e → ie | lesen, sehen | liest, siehst | liest, sieht |
| a → ä | fahren, schlafen, tragen | fährst, schläfst, trägst | fährt, schläft, trägt |
| au → äu | laufen | läufst | läuft |

All other forms are regular: *ich spreche, wir sprechen, ihr sprecht.*

> **nehmen** also changes its consonants: du nimmst, er nimmt. **wissen**: ich weiß, du weißt, er weiß.`,
    examples: [
      { de: 'Du sprichst sehr gut Deutsch.', en: 'You speak German very well.' },
      { de: 'Er fährt jeden Tag mit dem Rad.', en: 'He cycles every day.' },
      { de: 'Was liest du gerade?', en: 'What are you reading at the moment?' },
    ],
    exercises: [
      { id: 'a1-praesens-vokalwechsel-1', kind: 'fill', prompt: 'Du ___ sehr schnell.', hint: 'fahren', answers: ['fährst'], tag: 'verb.conjugation', explain: 'fahren changes a → ä with du and er: du fährst.', feedback: { fahrst: 'fahren changes a → ä with du: fährst.', faehrst: 'Correct, but write it with ä: fährst.' } },
      { id: 'a1-praesens-vokalwechsel-2', kind: 'fill', prompt: 'Er ___ jeden Tag die Zeitung.', hint: 'lesen', answers: ['liest'], tag: 'verb.conjugation', explain: 'lesen changes e → ie: er liest.', feedback: { lest: 'lesen changes e → ie: er liest.', liesst: 'After -s only -t is added: er liest.' } },
      { id: 'a1-praesens-vokalwechsel-3', kind: 'fill', prompt: 'Was ___ du? – Ich nehme die Pizza.', hint: 'nehmen', answers: ['nimmst'], tag: 'verb.conjugation', explain: 'nehmen: du nimmst, er nimmt.', feedback: { nehmst: 'nehmen is irregular: du nimmst.', nimst: 'Double m: du nimmst.' } },
      { id: 'a1-praesens-vokalwechsel-4', kind: 'choice', prompt: 'Meine Tochter ___ gern Spaghetti.', options: ['isst', 'esst', 'ist', 'essen'], tag: 'verb.conjugation', explain: 'essen changes e → i: sie isst.', why: ['essen changes its vowel with er/sie/es: isst.', 'ist is a form of sein (to be).', 'essen is the infinitive / plural form.'] },
      { id: 'a1-praesens-vokalwechsel-5', kind: 'fill', prompt: 'Wir ___ Englisch und Deutsch.', hint: 'sprechen', answers: ['sprechen'], tag: 'verb.conjugation', explain: 'The vowel change only happens with du and er/sie/es — wir sprechen.', feedback: { sprichen: 'No vowel change with wir: wir sprechen.' } },
      { id: 'a1-praesens-vokalwechsel-6', kind: 'fill', prompt: 'Das Baby ___ schon.', hint: 'schlafen', answers: ['schläft'], tag: 'verb.conjugation', explain: 'schlafen changes a → ä: es schläft.', feedback: { schlaft: 'schlafen changes a → ä with er/sie/es: schläft.' } },
      { id: 'a1-praesens-vokalwechsel-7', kind: 'correct', sentence: 'Ich hilfe dir gern.', answers: ['Ich helfe dir gern.'], tag: 'verb.conjugation', explain: 'There is no vowel change with ich: ich helfe.' },
      { id: 'a1-praesens-vokalwechsel-8', kind: 'fill', prompt: '___ ihr den Bus da drüben?', hint: 'sehen', answers: ['Seht', 'seht'], tag: 'verb.conjugation', explain: 'No vowel change with ihr: ihr seht.', feedback: { sieht: 'The vowel change does not apply to ihr: ihr seht.' } },
    ],
    drills: ['present-irregular'],
  },
  {
    id: 'a1-artikel-genus',
    explanation: `Every noun has a grammatical gender: masculine (**der**), feminine (**die**) or neuter (**das**). In the plural the article is always **die**. The indefinite article is **ein** (masculine/neuter) and **eine** (feminine); there is no plural indefinite article.

| | masculine | feminine | neuter | plural |
|---|---|---|---|---|
| definite | der Tisch | die Lampe | das Buch | die Bücher |
| indefinite | ein Tisch | eine Lampe | ein Buch | Bücher |

Nouns are always written with a capital letter. Learn every noun **together with its article** — your flashcards colour them: **der** blue, **die** red, **das** green.

Some endings are reliable clues:
- **die**: -ung, -heit, -keit, -schaft, -ion, -tät, -ik, -ur and most nouns in -e (die Lampe)
- **das**: -chen, -lein (diminutives), -ment, -um, verbs used as nouns (das Essen)
- **der**: -er for people and tools (der Lehrer, der Computer), -ling, -ismus, days, months, seasons

> Grammatical gender is not biological: *das Mädchen* (the girl) is neuter because of -chen.`,
    examples: [
      { de: 'Der Tisch ist neu.', en: 'The table is new.' },
      { de: 'Das ist eine gute Idee.', en: 'That is a good idea.' },
      { de: 'Die Zeitung liegt dort.', en: 'The newspaper is over there.' },
    ],
    exercises: [
      { id: 'a1-artikel-genus-1', kind: 'choice', prompt: '___ Zeitung liegt auf dem Tisch.', options: ['Die', 'Der', 'Das'], tag: 'gender', explain: 'Nouns in -ung are feminine: die Zeitung.', why: ['Nouns in -ung are always feminine.', 'Nouns in -ung are always feminine.'] },
      { id: 'a1-artikel-genus-2', kind: 'choice', prompt: 'Das ist ___ Mädchen.', options: ['ein', 'eine', 'einen'], tag: 'gender', explain: 'Mädchen ends in -chen, so it is neuter (das Mädchen) → ein.', why: ['Grammatical gender follows the ending -chen (neuter), not biology.', 'einen is the accusative masculine form.'] },
      { id: 'a1-artikel-genus-3', kind: 'fill', prompt: '___ Freiheit ist wichtig.', answers: ['Die'], tag: 'gender', explain: 'Nouns in -heit are feminine: die Freiheit.', feedback: { der: 'Nouns in -heit are feminine.', das: 'Nouns in -heit are feminine.' } },
      { id: 'a1-artikel-genus-4', kind: 'choice', prompt: '___ Lehrer ist sehr nett.', options: ['Der', 'Die', 'Das'], tag: 'gender', explain: 'Lehrer is masculine (people ending in -er): der Lehrer. A female teacher is die Lehrerin.', why: ['die would be die Lehrerin (female) or the plural die Lehrer — but the verb ist is singular.', 'Nouns for people in -er are masculine.'] },
      { id: 'a1-artikel-genus-5', kind: 'fill', prompt: 'Wie heißt ___ Kind? – Es heißt Lena.', answers: ['das'], tag: 'gender', explain: 'Kind is neuter: das Kind (hence es in the answer).', feedback: { der: 'Kind is neuter: das Kind.', die: 'Kind is neuter: das Kind.' } },
      { id: 'a1-artikel-genus-6', kind: 'choice', prompt: 'Welcher Artikel? ___ Information', options: ['die', 'der', 'das'], tag: 'gender', explain: 'Nouns in -ion are feminine: die Information.', why: ['Nouns in -ion are feminine.', 'Nouns in -ion are feminine.'] },
      { id: 'a1-artikel-genus-7', kind: 'choice', prompt: '___ Häuschen am See ist sehr alt.', options: ['Das', 'Die', 'Der'], tag: 'gender', explain: 'Diminutives in -chen are always neuter: das Häuschen.', why: ['-chen nouns are always neuter.', '-chen nouns are always neuter.'] },
      { id: 'a1-artikel-genus-8', kind: 'correct', sentence: 'Der Buch ist interessant.', answers: ['Das Buch ist interessant.'], tag: 'gender', explain: 'Buch is neuter: das Buch.' },
    ],
    drills: ['gender'],
  },
  {
    id: 'a1-akkusativ',
    explanation: `The **direct object** of most verbs is in the accusative case (*Wen? Was?* — whom? what?). Only the **masculine** article changes:

| | masculine | feminine | neuter | plural |
|---|---|---|---|---|
| nominative | der / ein | die / eine | das / ein | die / – |
| accusative | **den / einen** | die / eine | das / ein | die / – |

*Der Mann kauft einen Apfel.* — der Mann is the subject (nominative), einen Apfel the object (accusative).

Personal pronouns in the accusative: **mich, dich, ihn, sie, es, uns, euch, sie / Sie**.

Common verbs with an accusative object: haben, brauchen, kaufen, sehen, essen, trinken, besuchen, lieben, suchen, nehmen — and **es gibt**: *Hier gibt es einen Park.*`,
    examples: [
      { de: 'Ich brauche einen Stift.', en: 'I need a pen.' },
      { de: 'Siehst du den Hund?', en: 'Do you see the dog?' },
      { de: 'Ich liebe dich.', en: 'I love you.' },
    ],
    exercises: [
      { id: 'a1-akkusativ-1', kind: 'fill', prompt: 'Ich brauche ___ Stift.', hint: 'ein', answers: ['einen'], tag: 'case.acc', explain: 'Stift is masculine and the object of brauchen → accusative: einen Stift.', feedback: { ein: 'Masculine objects take einen in the accusative.', eine: 'Stift is masculine: einen.' } },
      { id: 'a1-akkusativ-2', kind: 'choice', prompt: 'Siehst du ___ Frau dort?', options: ['die', 'den', 'der', 'dem'], tag: 'case.acc', explain: 'Only masculine articles change in the accusative; Frau stays die.', why: ['den is accusative masculine — Frau is feminine.', 'der is nominative masculine (or dative/genitive feminine).', 'dem is dative.'] },
      { id: 'a1-akkusativ-3', kind: 'fill', prompt: 'Wir besuchen heute ___ Großvater.', hint: 'unser', answers: ['unseren', 'unsern'], tag: 'case.acc', explain: 'Großvater is masculine and the object → unseren.', feedback: { unser: 'Masculine accusative needs -en: unseren.' } },
      { id: 'a1-akkusativ-4', kind: 'fill', prompt: 'Kennst du Paul? – Ja, ich kenne ___ gut.', hint: 'er', answers: ['ihn'], tag: 'pronoun', explain: 'As an object, er becomes ihn.', feedback: { er: 'er is the subject form; the object form is ihn.', ihm: 'ihm is dative; kennen takes the accusative: ihn.' } },
      { id: 'a1-akkusativ-5', kind: 'choice', prompt: 'Hier gibt es ___ Supermarkt.', options: ['einen', 'ein', 'eine', 'einem'], tag: 'case.acc', explain: 'es gibt takes the accusative; Supermarkt is masculine → einen.', why: ['es gibt is followed by the accusative: einen.', 'eine is feminine.', 'einem is dative.'] },
      { id: 'a1-akkusativ-6', kind: 'correct', sentence: 'Ich habe ein Bruder und eine Schwester.', answers: ['Ich habe einen Bruder und eine Schwester.'], tag: 'case.acc', explain: 'Bruder is masculine and the object of haben → einen Bruder.' },
      { id: 'a1-akkusativ-7', kind: 'fill', prompt: 'Liebst du ___? – Ja, ich liebe dich.', hint: 'ich', answers: ['mich'], tag: 'pronoun', explain: 'lieben takes the accusative: ich → mich.', feedback: { mir: 'mir is dative; lieben takes the accusative: mich.' } },
      { id: 'a1-akkusativ-8', kind: 'order', words: ['Der Hund', 'sucht', 'den Ball'], answers: ['Den Ball sucht der Hund'], tag: 'case.acc', explain: 'The articles show who does what: der Hund (subject) sucht den Ball (object), even if the order changes.' },
    ],
    drills: ['case-akk'],
  },
  {
    id: 'a1-plural',
    explanation: `There are several plural patterns; the article is always **die**. Learn the plural with each noun — these tendencies help:

| pattern | typical for | examples |
|---|---|---|
| -e (often with umlaut) | many masculine one-syllable nouns | der Tag → die Tage, der Stuhl → die Stühle |
| -(e)n | almost all feminine nouns | die Frau → die Frauen, die Lampe → die Lampen |
| -er (with umlaut) | many neuter one-syllable nouns | das Kind → die Kinder, das Buch → die Bücher |
| no ending / umlaut only | masculine/neuter in -er, -el, -en, -chen | der Lehrer → die Lehrer, der Vater → die Väter |
| -s | foreign words, words ending in a vowel | das Auto → die Autos, das Handy → die Handys |

> Feminine nouns in **-in** double the n: die Lehrerin → die Lehrerin**nen**.`,
    examples: [
      { de: 'Ich habe zwei Kinder.', en: 'I have two children.' },
      { de: 'Die Bücher sind auf dem Tisch.', en: 'The books are on the table.' },
      { de: 'Wir brauchen drei Stühle.', en: 'We need three chairs.' },
    ],
    exercises: [
      { id: 'a1-plural-1', kind: 'fill', prompt: 'ein Buch – zwei ___', answers: ['Bücher'], tag: 'plural', explain: 'Many neuter one-syllable nouns take -er with umlaut: Bücher.', feedback: { buchs: 'Neuter one-syllable nouns usually take -er with umlaut: Bücher.', büchern: 'Büchern is the dative plural.' } },
      { id: 'a1-plural-2', kind: 'fill', prompt: 'eine Lampe – zwei ___', answers: ['Lampen'], tag: 'plural', explain: 'Feminine nouns in -e add -n: Lampen.', feedback: { lampes: 'Feminine nouns in -e add -n: Lampen.' } },
      { id: 'a1-plural-3', kind: 'choice', prompt: 'ein Auto – zwei ___', options: ['Autos', 'Autoen', 'Auten', 'Auto'], tag: 'plural', explain: 'Words ending in a vowel (except -e) usually take -s: Autos.', why: ['Words ending in -o take -s.', 'Words ending in -o take -s.', 'Auto does change in the plural: Autos.'] },
      { id: 'a1-plural-4', kind: 'fill', prompt: 'eine Freundin – zwei ___', answers: ['Freundinnen'], tag: 'plural', explain: 'Nouns in -in double the n: Freundinnen.', feedback: { freundinen: 'Nouns in -in double the n: Freundinnen.' } },
      { id: 'a1-plural-5', kind: 'choice', prompt: 'ein Lehrer – zwei ___', options: ['Lehrer', 'Lehrers', 'Lehreren', 'Lehrern'], tag: 'plural', explain: 'Masculine nouns in -er take no ending: die Lehrer.', why: ['-s is only for foreign words and some others.', 'No extra ending for nouns in -er.', 'Lehrern is the dative plural.'] },
      { id: 'a1-plural-6', kind: 'fill', prompt: 'der Tag – die ___', answers: ['Tage'], tag: 'plural', explain: 'Tag takes -e: Tage.' },
      { id: 'a1-plural-7', kind: 'choice', prompt: 'ein Haus – zwei ___', options: ['Häuser', 'Hause', 'Häuse', 'Hauses'], tag: 'plural', explain: 'das Haus → die Häuser (-er with umlaut).', why: ['Hause is an old dative form (nach Hause).', 'The plural ending is -er: Häuser.', 'Hauses is the genitive singular.'] },
      { id: 'a1-plural-8', kind: 'correct', sentence: 'Ich habe zwei Kind.', answers: ['Ich habe zwei Kinder.'], tag: 'plural', explain: 'After zwei the noun is plural: zwei Kinder.' },
    ],
    drills: ['plural'],
  },
  {
    id: 'a1-satzbau',
    explanation: `In a German main clause the **conjugated verb is always the second element** (V2). Position 1 can be the subject or anything else — the subject then follows the verb:

| position 1 | verb | rest |
|---|---|---|
| Ich | trinke | morgens Kaffee. |
| Morgens | trinke | ich Kaffee. |
| Kaffee | trinke | ich nur morgens. |

**W-questions**: question word + verb + subject — *Wo wohnst du? Was machst du heute?*
**Yes/no questions** start with the verb — *Wohnst du in Berlin? Hast du Zeit?*

Question words: **wer** (who), **was** (what), **wo** (where), **woher** (where from), **wohin** (where to), **wann** (when), **wie** (how), **warum** (why), **wie viel** (how much).`,
    examples: [
      { de: 'Heute gehe ich ins Kino.', en: 'Today I am going to the cinema.' },
      { de: 'Woher kommst du?', en: 'Where are you from?' },
      { de: 'Sprichst du Englisch?', en: 'Do you speak English?' },
    ],
    exercises: [
      { id: 'a1-satzbau-1', kind: 'order', words: ['Heute', 'gehe', 'ich', 'ins Kino'], answers: ['Ich gehe heute ins Kino'], tag: 'order.v2', explain: 'The verb is in position 2: Heute gehe ich … / Ich gehe heute …' },
      { id: 'a1-satzbau-2', kind: 'choice', prompt: 'Am Wochenende ___.', options: ['spielen wir Fußball', 'wir spielen Fußball', 'spielen Fußball wir', 'wir Fußball spielen'], tag: 'order.v2', explain: '„Am Wochenende“ is position 1, so the verb comes next, then the subject.', why: ['After a time expression in position 1, the verb must come before the subject.', 'The subject comes directly after the verb.', 'That is subordinate-clause order.'] },
      { id: 'a1-satzbau-3', kind: 'order', words: ['Woher', 'kommst', 'du?'], tag: 'question', explain: 'W-question: question word, verb, subject.' },
      { id: 'a1-satzbau-4', kind: 'fill', prompt: '___ wohnst du? – In Köln.', answers: ['Wo'], tag: 'question', explain: 'Asking for a place: wo.', feedback: { woher: 'woher asks where someone comes from.', wohin: 'wohin asks for a direction (where to).' } },
      { id: 'a1-satzbau-5', kind: 'fill', prompt: '___ kommst du? – Aus Spanien.', answers: ['Woher'], tag: 'question', explain: 'Origin: woher (where from).', feedback: { wo: 'wo asks for a place; for origin use woher.', wohin: 'wohin asks where to.' } },
      { id: 'a1-satzbau-6', kind: 'correct', sentence: 'Morgen ich fahre nach Wien.', answers: ['Morgen fahre ich nach Wien.', 'Ich fahre morgen nach Wien.'], tag: 'order.v2', explain: 'After „Morgen“ the verb comes second, then the subject: Morgen fahre ich …' },
      { id: 'a1-satzbau-7', kind: 'order', words: ['Hast', 'du', 'heute Abend', 'Zeit?'], tag: 'question', explain: 'Yes/no questions start with the conjugated verb.' },
      { id: 'a1-satzbau-8', kind: 'fill', prompt: '___ kostet das? – Fünf Euro.', answers: ['Wie viel', 'Was'], tag: 'question', explain: 'Asking for a price: Wie viel kostet das? (also: Was kostet das?)', feedback: { wie: 'For prices: Wie viel kostet das?' } },
    ],
  },
  {
    id: 'a1-negation',
    explanation: `**kein** negates nouns that would otherwise have **ein** or no article. It takes the endings of *ein* — and has a plural *keine*:
- *Ich habe ein Auto.* → *Ich habe **kein** Auto.*
- *Ich habe Zeit.* → *Ich habe **keine** Zeit.*
- *Wir haben Kinder.* → *Wir haben **keine** Kinder.*

**nicht** negates everything else: verbs, adjectives, adverbs, nouns with a definite article or possessive, and names:
- *Ich schwimme **nicht**.* · *Das ist **nicht** teuer.* · *Das ist **nicht** mein Auto.*

Position of **nicht**: at the end of the clause, but **before** adjectives, prepositional phrases and the second verb part: *Ich komme heute nicht.* · *Ich fahre nicht nach Hause.* · *Ich kann nicht schwimmen.*

> Answering *yes* to a negative question: **doch** — *Kommst du nicht? – Doch, ich komme!*`,
    examples: [
      { de: 'Ich habe keine Zeit.', en: 'I don’t have time.' },
      { de: 'Das ist nicht teuer.', en: 'That is not expensive.' },
      { de: 'Hast du keinen Hunger? – Doch!', en: 'Aren’t you hungry? – Yes, I am!' },
    ],
    exercises: [
      { id: 'a1-negation-1', kind: 'fill', prompt: 'Ich habe ___ Hunger.', answers: ['keinen'], tag: 'negation', explain: 'Hunger is a masculine noun without article in the accusative → keinen.', feedback: { nicht: 'A noun without article is negated with kein-: keinen Hunger.', kein: 'Hunger is masculine accusative: keinen.' } },
      { id: 'a1-negation-2', kind: 'choice', prompt: 'Das Essen ist ___ gut.', options: ['nicht', 'kein', 'keine', 'nein'], tag: 'negation', explain: 'Adjectives are negated with nicht.', why: ['kein negates nouns, not adjectives.', 'keine negates nouns, not adjectives.', 'nein is the answer word “no”.'] },
      { id: 'a1-negation-3', kind: 'fill', prompt: 'Hast du ___ Geschwister? – Nein, ich bin Einzelkind.', answers: ['keine'], tag: 'negation', explain: 'Plural noun without article → keine.', feedback: { kein: 'Geschwister is plural: keine.', nicht: 'Nouns without an article are negated with kein-.' } },
      { id: 'a1-negation-4', kind: 'choice', prompt: 'Ist das dein Fahrrad? – Nein, das ist ___ Fahrrad.', options: ['nicht mein', 'kein mein', 'mein nicht', 'keine mein'], tag: 'negation', explain: 'With a possessive (mein), the negation is nicht: nicht mein Fahrrad.', why: ['kein cannot be combined with mein.', 'nicht stands before the part it negates.', 'kein cannot be combined with mein.'] },
      { id: 'a1-negation-5', kind: 'choice', prompt: 'Kommst du nicht mit? – ___, ich komme mit!', options: ['Doch', 'Ja', 'Nein', 'Nicht'], tag: 'negation', explain: 'Contradicting a negative question: doch.', why: ['After a negative question, “yes” is doch.', 'Nein would mean you are not coming.', 'nicht is not an answer word.'] },
      { id: 'a1-negation-6', kind: 'correct', sentence: 'Ich spreche kein Französisch nicht.', answers: ['Ich spreche kein Französisch.', 'Ich spreche nicht Französisch.'], tag: 'negation', explain: 'One negation is enough (both kein Französisch and nicht Französisch are possible for languages).' },
      { id: 'a1-negation-7', kind: 'order', words: ['Ich', 'kann', 'heute', 'nicht', 'kommen'], tag: 'negation', explain: 'nicht stands before the infinitive at the end.' },
      { id: 'a1-negation-8', kind: 'fill', prompt: 'Er trinkt ___ Alkohol.', answers: ['keinen'], tag: 'negation', explain: 'Alkohol is masculine, without article, accusative → keinen.', feedback: { kein: 'Alkohol is masculine accusative: keinen.', nicht: 'Nouns without article are negated with kein-.' } },
    ],
  },
  {
    id: 'a1-modalverben',
    explanation: `Modal verbs express ability, wishes, obligation or permission. The modal verb is in position 2; the main verb goes to the **end as an infinitive** (the sentence bracket):
*Ich **kann** heute nicht **kommen**.*

| | können | müssen | wollen | dürfen | sollen | möchten |
|---|---|---|---|---|---|---|
| ich | kann | muss | will | darf | soll | möchte |
| du | kannst | musst | willst | darfst | sollst | möchtest |
| er / sie / es | kann | muss | will | darf | soll | möchte |
| wir | können | müssen | wollen | dürfen | sollen | möchten |
| ihr | könnt | müsst | wollt | dürft | sollt | möchtet |
| sie / Sie | können | müssen | wollen | dürfen | sollen | möchten |

- **ich** and **er/sie/es** have no ending, and most modal verbs change their vowel in the singular.
- können = can, müssen = must/have to, wollen = want, dürfen = may/be allowed, sollen = should, möchten = would like.

> **nicht müssen** = not have to; **nicht dürfen** = must not: *Du musst nicht kommen* (not necessary) ≠ *Du darfst nicht kommen* (forbidden).`,
    examples: [
      { de: 'Ich kann gut schwimmen.', en: 'I can swim well.' },
      { de: 'Wir müssen jetzt gehen.', en: 'We have to go now.' },
      { de: 'Darf ich hier parken?', en: 'May I park here?' },
    ],
    exercises: [
      { id: 'a1-modalverben-1', kind: 'fill', prompt: 'Er ___ sehr gut kochen.', hint: 'können', answers: ['kann'], tag: 'verb.modal', explain: 'er/sie/es + modal verb: no ending → er kann.', feedback: { kannt: 'Modal verbs have no ending with er/sie/es: er kann.', könnt: 'könnt is the ihr form.' } },
      { id: 'a1-modalverben-2', kind: 'fill', prompt: '___ ich hier rauchen? – Nein, das ist verboten.', hint: 'dürfen', answers: ['Darf', 'darf'], tag: 'verb.modal', explain: 'Asking for permission: dürfen → darf ich …?', feedback: { dürfe: 'ich darf (no ending, vowel change).' } },
      { id: 'a1-modalverben-3', kind: 'choice', prompt: 'Du ___ nicht kommen, wenn du keine Zeit hast. Das ist kein Problem.', options: ['musst', 'darfst', 'willst', 'sollst'], tag: 'verb.modal', explain: 'nicht müssen = it is not necessary.', why: ['nicht dürfen means it is forbidden — that contradicts “kein Problem”.', 'nicht wollen = not want; the speaker is releasing you from an obligation.', 'nicht sollen = should not; the context says it is fine either way.'] },
      { id: 'a1-modalverben-4', kind: 'correct', sentence: 'Ich will gehen ins Kino.', answers: ['Ich will ins Kino gehen.'], tag: 'order.bracket', explain: 'The infinitive goes to the end: Ich will ins Kino gehen.' },
      { id: 'a1-modalverben-5', kind: 'order', words: ['Wir', 'müssen', 'heute', 'lange', 'arbeiten'], tag: 'order.bracket', explain: 'Modal verb in position 2, infinitive at the end.' },
      { id: 'a1-modalverben-6', kind: 'fill', prompt: 'Ihr ___ hier nicht parken.', hint: 'dürfen', answers: ['dürft'], tag: 'verb.modal', explain: 'dürfen with ihr: ihr dürft.', feedback: { dürfen: 'ihr → dürft.', darft: 'The plural forms keep the ü: ihr dürft.' } },
      { id: 'a1-modalverben-7', kind: 'choice', prompt: 'Was ___ Sie trinken? – Einen Tee, bitte.', options: ['möchten', 'möchtet', 'möchtest', 'möchte'], tag: 'verb.modal', explain: 'Sie (polite) → möchten.', why: ['möchtet is the ihr form.', 'möchtest is the du form.', 'möchte is the ich / er form.'] },
      { id: 'a1-modalverben-8', kind: 'fill', prompt: 'Der Arzt sagt, du ___ mehr Wasser trinken.', hint: 'sollen', answers: ['sollst'], tag: 'verb.modal', explain: 'sollen with du: du sollst.', feedback: { soll: 'soll is the ich / er form.', sollt: 'sollt is the ihr form.' } },
    ],
    drills: ['modal'],
  },
  {
    id: 'a1-trennbare-verben',
    explanation: `Many verbs have a stressed prefix that **separates** in main clauses and goes to the **end**:
- *aufstehen* → *Ich **stehe** um sieben **auf**.*
- *einkaufen* → *Wir **kaufen** im Supermarkt **ein**.*

Common separable prefixes: **ab-, an-, auf-, aus-, ein-, mit-, nach-, vor-, weg-, zu-, zurück-, fern-** (fernsehen).

With a modal verb the verb stays in one piece at the end: *Ich muss früh **aufstehen**.*

Inseparable prefixes **never** separate and are unstressed: **be-, emp-, ent-, er-, ge-, miss-, ver-, zer-** — *bekommen, verstehen, erzählen*.

> Dictionaries often mark separable verbs: auf|stehen, ein|kaufen.`,
    examples: [
      { de: 'Ich rufe dich morgen an.', en: 'I will call you tomorrow.' },
      { de: 'Der Zug kommt um 10 Uhr an.', en: 'The train arrives at 10.' },
      { de: 'Kannst du das Fenster zumachen?', en: 'Can you close the window?' },
    ],
    exercises: [
      { id: 'a1-trennbare-verben-1', kind: 'choice', prompt: 'Der Film ___ um 20 Uhr ___.', options: ['fängt … an', 'anfängt … –', 'fängt an … –', 'an … fängt'], tag: 'verb.separable', explain: 'anfangen separates: Der Film fängt um 20 Uhr an.', why: ['In a main clause the prefix separates.', 'The prefix goes to the very end of the clause.', 'The conjugated verb is in position 2, the prefix at the end.'] },
      { id: 'a1-trennbare-verben-2', kind: 'transform', instruction: 'Make a sentence with ich in the present tense.', source: 'heute Abend fernsehen', answers: ['Ich sehe heute Abend fern', 'Heute Abend sehe ich fern'], tag: 'verb.separable', explain: 'fern- separates: Ich sehe heute Abend fern.', feedback: [['fernsehe', 'The prefix fern- separates and goes to the end: Ich sehe … fern.']] },
      { id: 'a1-trennbare-verben-3', kind: 'order', words: ['Wann', 'kommst', 'du', 'zurück?'], tag: 'verb.separable', explain: 'zurückkommen: the prefix goes to the end of the question.' },
      { id: 'a1-trennbare-verben-4', kind: 'correct', sentence: 'Ich aufstehe jeden Tag um 7 Uhr.', answers: ['Ich stehe jeden Tag um 7 Uhr auf.'], tag: 'verb.separable', explain: 'auf- separates in the main clause: Ich stehe … auf.', feedback: [['aufstehe', 'auf- separates in the main clause: ich stehe … auf.']] },
      { id: 'a1-trennbare-verben-5', kind: 'choice', prompt: 'Ich möchte heute ___.', options: ['einkaufen', 'kaufen ein', 'ein kaufen', 'einkaufe'], tag: 'verb.separable', explain: 'After a modal verb the infinitive stays together: einkaufen.', why: ['After a modal verb the verb is not split.', 'Separable verbs are written as one word in the infinitive.', 'After möchten we need the infinitive.'] },
      { id: 'a1-trennbare-verben-6', kind: 'choice', prompt: 'Was ist richtig?', options: ['Ich verstehe das nicht.', 'Ich stehe das nicht ver.', 'Ich verstehe das nicht ver.'], tag: 'verb.separable', explain: 'ver- is inseparable: ich verstehe.', why: ['ver- never separates.', 'ver- never separates.'] },
      { id: 'a1-trennbare-verben-7', kind: 'transform', instruction: 'Write the sentence with du.', source: 'Ich rufe meine Mutter an.', answers: ['Du rufst deine Mutter an.'], tag: 'verb.separable', explain: 'du rufst … an — and meine becomes deine.', feedback: [['anrufst', 'an- separates: du rufst … an.'], ['meine', 'With du the possessive is deine.']] },
      { id: 'a1-trennbare-verben-8', kind: 'order', words: ['Der Zug', 'kommt', 'um 10 Uhr', 'in Berlin', 'an'], tag: 'verb.separable', explain: 'ankommen: the prefix closes the sentence.' },
    ],
  },
  {
    id: 'a1-possessiv',
    explanation: `Possessive articles take the same endings as **ein / kein**:

| person | possessive |
|---|---|
| ich | mein |
| du | dein |
| er / es | sein |
| sie (she) | ihr |
| wir | unser |
| ihr | euer |
| sie (they) / Sie | ihr / Ihr |

| | masculine | feminine | neuter | plural |
|---|---|---|---|---|
| nominative | mein Vater | mein**e** Mutter | mein Kind | mein**e** Eltern |
| accusative | mein**en** Vater | mein**e** Mutter | mein Kind | mein**e** Eltern |

The possessive depends on the **owner** (sein/ihr), the ending on the **noun** (gender, case).

> euer drops its e before an ending: eure Schwester, euren Bruder.`,
    examples: [
      { de: 'Das ist mein Bruder.', en: 'This is my brother.' },
      { de: 'Anna sucht ihren Schlüssel.', en: 'Anna is looking for her key.' },
      { de: 'Ist das Ihr Koffer?', en: 'Is that your suitcase? (polite)' },
    ],
    exercises: [
      { id: 'a1-possessiv-1', kind: 'fill', prompt: 'Das ist ___ Bruder.', hint: 'ich', answers: ['mein'], tag: 'possessive', explain: 'Bruder is masculine nominative → mein.', feedback: { meinen: 'After “Das ist” we need the nominative: mein Bruder.', meine: 'Bruder is masculine: mein.' } },
      { id: 'a1-possessiv-2', kind: 'fill', prompt: 'Wie heißt ___ Schwester?', hint: 'du', answers: ['deine'], tag: 'possessive', explain: 'Schwester is feminine → deine.', feedback: { dein: 'Schwester is feminine: deine.' } },
      { id: 'a1-possessiv-3', kind: 'choice', prompt: 'Anna sucht ___ Schlüssel.', options: ['ihren', 'seinen', 'ihr', 'ihre'], tag: 'possessive', explain: 'Owner Anna (female) → ihr-; Schlüssel is masculine accusative → ihren.', why: ['sein- is used for a male owner.', 'Masculine accusative needs -en: ihren.', 'ihre is feminine or plural.'] },
      { id: 'a1-possessiv-4', kind: 'fill', prompt: 'Wir besuchen ___ Großeltern.', hint: 'wir', answers: ['unsere'], tag: 'possessive', explain: 'Plural → unsere.', feedback: { unser: 'Plural needs -e: unsere.', unseren: 'unseren is masculine accusative; Großeltern is plural.' } },
      { id: 'a1-possessiv-5', kind: 'choice', prompt: 'Kinder, wo ist ___ Lehrerin?', options: ['eure', 'euere', 'euer', 'ihre'], tag: 'possessive', explain: 'ihr (you all) → euer; feminine → eure (the e drops).', why: ['euer drops its e before an ending: eure.', 'Lehrerin is feminine: eure.', 'ihre would be her/their teacher.'] },
      { id: 'a1-possessiv-6', kind: 'fill', prompt: 'Herr Weber, ist das ___ Koffer?', hint: 'Sie', answers: ['Ihr'], tag: 'possessive', explain: 'The polite possessive is written with a capital I: Ihr Koffer.', feedback: { ihr: 'The polite form is capitalised: Ihr.', ihren: 'After “ist das” we need the nominative: Ihr Koffer.' } },
      { id: 'a1-possessiv-7', kind: 'correct', sentence: 'Tom ruft ihr Vater an.', answers: ['Tom ruft seinen Vater an.', 'Tom ruft ihren Vater an.'], tag: 'possessive', explain: 'Vater is the accusative object → -en: seinen (his) or ihren (her) Vater.' },
      { id: 'a1-possessiv-8', kind: 'fill', prompt: 'Das sind ___ Kinder.', hint: 'er', answers: ['seine'], tag: 'possessive', explain: 'Owner er → sein-; plural → seine.', feedback: { ihre: 'The owner is er (male): seine.', sein: 'Plural needs -e: seine.' } },
    ],
  },
  {
    id: 'a1-imperativ',
    explanation: `The imperative gives instructions or makes requests. There are three forms:

| | kommen | warten | nehmen | sein |
|---|---|---|---|---|
| du | Komm! | Warte! | Nimm! | Sei! |
| ihr | Kommt! | Wartet! | Nehmt! | Seid! |
| Sie | Kommen Sie! | Warten Sie! | Nehmen Sie! | Seien Sie! |

- **du**: the present-tense stem without ending and without *du*. The e → i/ie change stays (*nehmen → nimm, lesen → lies*), but **a → ä does not happen** (*fahren → fahr!*).
- **ihr**: like the present tense, without *ihr*.
- **Sie**: verb first, then *Sie*.
- Separable verbs: the prefix goes to the end — *Steh auf! Ruf mich an!*

> Add **bitte** and **mal** to sound friendly: *Komm bitte mal her!*`,
    examples: [
      { de: 'Komm bitte her!', en: 'Please come here!' },
      { de: 'Warten Sie einen Moment!', en: 'Wait a moment! (polite)' },
      { de: 'Seid bitte leise!', en: 'Please be quiet! (to several people)' },
    ],
    exercises: [
      { id: 'a1-imperativ-1', kind: 'fill', prompt: '___ bitte das Fenster!', hint: 'du, schließen', answers: ['Schließ', 'Schließe'], tag: 'verb.imperative', explain: 'du imperative: stem (+ optional e): Schließ / Schließe das Fenster!', feedback: { schließt: 'The du imperative has no -t: Schließ!', 'schließ du': 'No pronoun in the du imperative.' } },
      { id: 'a1-imperativ-2', kind: 'fill', prompt: '___ bitte langsamer, Frau Lang!', hint: 'sprechen', answers: ['Sprechen Sie'], tag: 'verb.imperative', explain: 'Polite imperative: Sprechen Sie …!', feedback: { sprich: 'Frau Lang is addressed with Sie: Sprechen Sie!', sprechen: 'The polite imperative needs Sie: Sprechen Sie!' } },
      { id: 'a1-imperativ-3', kind: 'choice', prompt: '___ das Buch, Paul!', options: ['Lies', 'Les', 'Liest', 'Lese'], tag: 'verb.imperative', explain: 'lesen keeps the e → ie change in the du imperative: Lies!', why: ['lesen changes e → ie: lies.', 'liest is the present tense (du liest).', 'lesen changes e → ie: lies.'] },
      { id: 'a1-imperativ-4', kind: 'fill', prompt: 'Kinder, ___ leise!', hint: 'sein', answers: ['seid'], tag: 'verb.imperative', explain: 'ihr imperative of sein: Seid leise!', feedback: { sind: 'ihr imperative of sein: seid.', sei: 'sei is the du imperative; Kinder = ihr: seid.' } },
      { id: 'a1-imperativ-5', kind: 'choice', prompt: '___ nicht so schnell!', options: ['Fahr', 'Fähr', 'Fährst', 'Fahrst'], tag: 'verb.imperative', explain: 'a → ä does not happen in the imperative: Fahr!', why: ['The umlaut of du fährst disappears in the imperative.', 'fährst is the present tense.', 'No -st in the imperative.'] },
      { id: 'a1-imperativ-6', kind: 'transform', instruction: 'Make it a request to a friend (du).', source: 'Du rufst mich morgen an.', answers: ['Ruf mich morgen an', 'Rufe mich morgen an', 'Ruf mich bitte morgen an', 'Bitte ruf mich morgen an'], tag: 'verb.imperative', explain: 'du imperative: Ruf mich morgen an! (prefix at the end)', feedback: [['^du ', 'Leave out du in the imperative.'], ['rufst', 'No -st in the imperative: ruf!'], ['anruf', 'The prefix an- goes to the end: Ruf mich … an!']] },
      { id: 'a1-imperativ-7', kind: 'correct', sentence: 'Nehmst euch etwas zu essen!', answers: ['Nehmt euch etwas zu essen!'], tag: 'verb.imperative', explain: 'ihr imperative = ihr present tense: nehmt.' },
      { id: 'a1-imperativ-8', kind: 'order', words: ['Steh', 'bitte', 'endlich', 'auf!'], answers: ['Bitte steh endlich auf!'], tag: 'verb.imperative', explain: 'aufstehen: the prefix goes to the end.' },
    ],
    drills: ['imperative'],
  },
  {
    id: 'a1-praepositionen-zeit',
    explanation: `| when? | preposition | examples |
|---|---|---|
| clock times | **um** | um 8 Uhr, um halb neun |
| days, parts of the day, dates | **am** (= an dem) | am Montag, am Abend, am 3. Mai, am Wochenende |
| months, seasons | **im** (= in dem) | im Juli, im Winter, im Jahr 2020 |
| years | — | 2020 / im Jahr 2020 (never *in 2020*) |
| night | **in der** | in der Nacht |
| from … to | **von … bis** | von 9 bis 17 Uhr |

> *gegen 8 Uhr* = around 8 o’clock.`,
    examples: [
      { de: 'Der Kurs beginnt am Montag um 9 Uhr.', en: 'The course starts on Monday at 9.' },
      { de: 'Im Sommer fahren wir ans Meer.', en: 'In summer we go to the seaside.' },
      { de: 'Sie ist 1995 geboren.', en: 'She was born in 1995.' },
    ],
    exercises: [
      { id: 'a1-praepositionen-zeit-1', kind: 'fill', prompt: 'Wir treffen uns ___ Freitag.', answers: ['am'], tag: 'preposition', explain: 'Days of the week take am.', feedback: { im: 'im is for months and seasons; days take am.', um: 'um is for clock times.' } },
      { id: 'a1-praepositionen-zeit-2', kind: 'fill', prompt: 'Der Kurs beginnt ___ 9 Uhr.', answers: ['um'], tag: 'preposition', explain: 'Clock times take um.', feedback: { am: 'am is for days; clock times take um.' } },
      { id: 'a1-praepositionen-zeit-3', kind: 'fill', prompt: '___ Sommer fahren wir ans Meer.', answers: ['Im', 'im'], tag: 'preposition', explain: 'Seasons take im.', feedback: { am: 'Seasons and months take im.', in: 'in + dem = im.' } },
      { id: 'a1-praepositionen-zeit-4', kind: 'choice', prompt: 'Sie ist ___ geboren.', options: ['1995', 'in 1995', 'im 1995', 'am 1995'], tag: 'preposition', explain: 'Years stand without a preposition (or: im Jahr 1995).', why: ['“in 1995” is English style; German uses no preposition.', 'im only with “Jahr”: im Jahr 1995.', 'am is for days and dates.'] },
      { id: 'a1-praepositionen-zeit-5', kind: 'choice', prompt: 'Ich arbeite ___ 8 ___ 16 Uhr.', options: ['von … bis', 'um … bis', 'am … bis', 'von … zu'], tag: 'preposition', explain: 'A period of time: von … bis.', why: ['um marks a single point in time.', 'am is for days.', 'The end point is marked with bis.'] },
      { id: 'a1-praepositionen-zeit-6', kind: 'fill', prompt: 'Was machst du ___ Wochenende?', answers: ['am'], tag: 'preposition', explain: 'am Wochenende (in Austria/Switzerland also: über das Wochenende).', feedback: { im: 'Wochenende takes am.' } },
      { id: 'a1-praepositionen-zeit-7', kind: 'correct', sentence: 'Ich habe in Montag Zeit.', answers: ['Ich habe am Montag Zeit.'], tag: 'preposition', explain: 'Days take am: am Montag.' },
      { id: 'a1-praepositionen-zeit-8', kind: 'choice', prompt: 'Mein Geburtstag ist ___ 12. Juli.', options: ['am', 'im', 'um', 'in'], tag: 'preposition', explain: 'Dates take am: am 12. Juli.', why: ['im is for a whole month (im Juli), but a date takes am.', 'um is for clock times.', 'Dates take am.'] },
    ],
  },
];
