import type { GrammarLesson } from '@/lib/exercise/types';

export const A2_LESSONS: GrammarLesson[] = [
  {
    id: 'a2-dativ',
    explanation: `The dative answers **Wem?** (to whom?). It is used for the **indirect object** (the person receiving something), after certain prepositions and after some verbs.

| | masculine | feminine | neuter | plural |
|---|---|---|---|---|
| nominative | der / ein | die / eine | das / ein | die |
| accusative | den / einen | die / eine | das / ein | die |
| dative | **dem / einem** | **der / einer** | **dem / einem** | **den** + noun**-n** |

Pronouns: mir, dir, ihm, ihr, ihm, uns, euch, ihnen / Ihnen.

*Ich gebe **dem Kind** einen Apfel.* — person (dative) before thing (accusative).
In the dative plural, the noun gets an extra **-n** (unless it already ends in -n or -s): *mit den Kinder**n***.

Verbs that take **only** a dative object: helfen, danken, gefallen, gehören, gratulieren, antworten, passen, schmecken, fehlen.
*Das Kleid **gefällt mir**.* (I like the dress.)`,
    examples: [
      { de: 'Ich helfe meiner Mutter.', en: 'I help my mother.' },
      { de: 'Das Buch gehört dem Lehrer.', en: 'The book belongs to the teacher.' },
      { de: 'Wie geht es Ihnen?', en: 'How are you? (polite)' },
    ],
    exercises: [
      { id: 'a2-dativ-1', kind: 'fill', prompt: 'Ich gebe ___ Kind ein Eis.', hint: 'das', answers: ['dem'], tag: 'case.dat', explain: 'The receiver is in the dative: dem Kind.', feedback: { das: 'Kind receives something → dative: dem Kind.', den: 'den is accusative masculine; Kind is neuter dative: dem.' } },
      { id: 'a2-dativ-2', kind: 'fill', prompt: 'Kannst du ___ helfen?', hint: 'ich', answers: ['mir'], tag: 'case.dat', explain: 'helfen takes the dative: mir.', feedback: { mich: 'helfen always takes the dative: mir.' } },
      { id: 'a2-dativ-3', kind: 'choice', prompt: 'Der Pullover gefällt ___ nicht.', options: ['ihr', 'sie', 'ihre', 'sich'], tag: 'case.dat', explain: 'gefallen takes the dative: es gefällt ihr (she likes it).', why: ['sie is nominative/accusative; gefallen needs the dative ihr.', 'ihre is a possessive.', 'sich is reflexive.'] },
      { id: 'a2-dativ-4', kind: 'fill', prompt: 'Ich danke ___ Kollegen für die Hilfe.', hint: 'die (Plural)', answers: ['den'], tag: 'case.dat', explain: 'Dative plural: den Kollegen.', feedback: { die: 'danken takes the dative; plural dative = den.' } },
      { id: 'a2-dativ-5', kind: 'choice', prompt: 'Wir spielen mit ___.', options: ['den Kindern', 'den Kinder', 'die Kinder', 'der Kindern'], tag: 'case.dat', explain: 'mit + dative plural: den + noun with -n → den Kindern.', why: ['Dative plural nouns add -n: Kindern.', 'mit takes the dative, not the accusative.', 'The dative plural article is den.'] },
      { id: 'a2-dativ-6', kind: 'correct', sentence: 'Das Auto gehört mein Vater.', answers: ['Das Auto gehört meinem Vater.'], tag: 'case.dat', explain: 'gehören takes the dative: meinem Vater.' },
      { id: 'a2-dativ-7', kind: 'transform', instruction: 'Replace „meiner Schwester“ with a pronoun.', source: 'Ich schreibe meiner Schwester eine E-Mail.', answers: ['Ich schreibe ihr eine E-Mail.'], tag: 'pronoun', explain: 'meiner Schwester (dative, feminine) → ihr.', feedback: [['\\bsie\\b', 'The receiver is in the dative: ihr, not sie.'], ['\\bihm\\b', 'Schwester is feminine: ihr.']] },
      { id: 'a2-dativ-8', kind: 'fill', prompt: 'Wie geht es ___, Herr Braun?', hint: 'Sie', answers: ['Ihnen'], tag: 'pronoun', explain: 'es geht + dative: Wie geht es Ihnen?', feedback: { sie: 'Dative of Sie: Ihnen (capitalised).', ihnen: 'The polite form is capitalised: Ihnen.' } },
    ],
    drills: ['case-dat'],
  },
  {
    id: 'a2-praepositionen-kasus',
    explanation: `Some prepositions always take the **dative**, others always the **accusative**:

| always dative | always accusative |
|---|---|
| **aus** – from, out of | **durch** – through |
| **bei** – at, near, with (someone) | **für** – for |
| **mit** – with, by (transport) | **gegen** – against |
| **nach** – to (cities/countries), after | **ohne** – without |
| **seit** – since, for | **um** – around, at (time) |
| **von** – from, of | |
| **zu** – to (people, places) | |
| **gegenüber** – opposite | |

Contractions: zu + dem = **zum**, zu + der = **zur**, bei + dem = **beim**, von + dem = **vom**.

> Memory trick: *aus bei mit nach seit von zu* sounds like a little song — sing it a few times!`,
    examples: [
      { de: 'Ich fahre mit dem Bus zur Arbeit.', en: 'I take the bus to work.' },
      { de: 'Das Geschenk ist für dich.', en: 'The present is for you.' },
      { de: 'Er kommt aus der Schweiz.', en: 'He comes from Switzerland.' },
    ],
    exercises: [
      { id: 'a2-praepositionen-kasus-1', kind: 'fill', prompt: 'Ich gehe heute ___ Arzt.', answers: ['zum'], tag: 'case.prep', explain: 'zu + dem Arzt = zum Arzt (zu takes the dative).', feedback: { 'zu der': 'Arzt is masculine: zu dem = zum.', zur: 'zur = zu der (feminine); Arzt is masculine: zum.', 'nach': 'nach is for cities/countries; people take zu: zum Arzt.' } },
      { id: 'a2-praepositionen-kasus-2', kind: 'choice', prompt: 'Wir gehen ___ den Park.', options: ['durch', 'mit', 'aus', 'von'], tag: 'case.prep', explain: '„den Park“ is accusative — of these prepositions only durch takes the accusative.', why: ['mit takes the dative (dem Park).', 'aus takes the dative (dem Park).', 'von takes the dative (dem Park).'] },
      { id: 'a2-praepositionen-kasus-3', kind: 'fill', prompt: 'Ich wohne ___ meinen Eltern.', hint: 'with', answers: ['bei'], tag: 'preposition', explain: 'Living at someone’s home: bei + dative.', feedback: { mit: 'mit means together with; living at someone’s place is bei.' } },
      { id: 'a2-praepositionen-kasus-4', kind: 'choice', prompt: 'Das ist ein Geschenk für ___.', options: ['meinen Bruder', 'meinem Bruder', 'mein Bruder', 'meines Bruders'], tag: 'case.prep', explain: 'für + accusative: für meinen Bruder.', why: ['für takes the accusative, not the dative.', 'Bruder is masculine accusative: meinen.', 'für takes the accusative, not the genitive.'] },
      { id: 'a2-praepositionen-kasus-5', kind: 'fill', prompt: 'Sie kommt gerade ___ der Schule.', hint: 'from', answers: ['aus', 'von'], tag: 'preposition', explain: 'aus der Schule (out of the building) or von der Schule (from the place) — both take the dative.' },
      { id: 'a2-praepositionen-kasus-6', kind: 'correct', sentence: 'Ich trinke Kaffee ohne der Milch.', answers: ['Ich trinke Kaffee ohne Milch.', 'Ich trinke Kaffee ohne die Milch.'], tag: 'case.prep', explain: 'ohne takes the accusative (and usually no article): ohne Milch.' },
      { id: 'a2-praepositionen-kasus-7', kind: 'fill', prompt: 'Wir fahren im Sommer ___ Italien.', answers: ['nach'], tag: 'preposition', explain: 'Countries and cities without article: nach.', feedback: { zu: 'For countries and cities use nach.', in: 'in is used for countries with an article (in die Schweiz).' } },
      { id: 'a2-praepositionen-kasus-8', kind: 'fill', prompt: 'Er arbeitet ___ einem Jahr bei Siemens.', answers: ['seit'], tag: 'preposition', explain: 'An action continuing since a point in the past: seit + dative.', feedback: { vor: 'vor einem Jahr = a year ago (finished). Still working → seit.', für: 'German uses seit for “for (a period up to now)”.' } },
    ],
    drills: ['case-prep'],
  },
  {
    id: 'a2-wechselpraepositionen',
    explanation: `Nine prepositions take **either** dative **or** accusative: **an, auf, hinter, in, neben, über, unter, vor, zwischen**.

| question | case | meaning | example |
|---|---|---|---|
| **Wo?** (where) | dative | position | *Das Bild hängt **an der** Wand.* |
| **Wohin?** (where to) | accusative | movement to a goal | *Ich hänge das Bild **an die** Wand.* |

Verb pairs help:

| Wohin? + accusative (movement) | Wo? + dative (position) |
|---|---|
| legen (lay) | liegen (lie) |
| stellen (put upright) | stehen (stand) |
| setzen (sit someone down) | sitzen (sit) |
| hängen (hang something) | hängen (be hanging) |

Contractions: in dem = **im**, in das = **ins**, an dem = **am**, an das = **ans**.`,
    examples: [
      { de: 'Ich lege das Buch auf den Tisch.', en: 'I put the book on the table.' },
      { de: 'Das Buch liegt auf dem Tisch.', en: 'The book is lying on the table.' },
      { de: 'Wir gehen ins Kino.', en: 'We are going to the cinema.' },
    ],
    exercises: [
      { id: 'a2-wechselpraepositionen-1', kind: 'fill', prompt: 'Die Katze schläft auf ___ Sofa.', hint: 'das', answers: ['dem'], tag: 'case.two-way', explain: 'Position (Wo?) → dative: auf dem Sofa.', feedback: { das: 'The cat is already there (Wo?) → dative: dem.', den: 'Sofa is neuter; dative: dem.' } },
      { id: 'a2-wechselpraepositionen-2', kind: 'fill', prompt: 'Die Katze springt auf ___ Sofa.', hint: 'das', answers: ['das'], tag: 'case.two-way', explain: 'Movement to a goal (Wohin?) → accusative: auf das Sofa.', feedback: { dem: 'springen auf … is movement to a goal (Wohin?) → accusative: das.' } },
      { id: 'a2-wechselpraepositionen-3', kind: 'choice', prompt: 'Ich stelle die Flasche in ___ Kühlschrank.', options: ['den', 'dem', 'der', 'das'], tag: 'case.two-way', explain: 'stellen = movement (Wohin?) → accusative masculine: den Kühlschrank.', why: ['dem would be position (Wo?); stellen is movement.', 'Kühlschrank is masculine.', 'Kühlschrank is masculine.'] },
      { id: 'a2-wechselpraepositionen-4', kind: 'choice', prompt: 'Die Flasche steht im ___.', options: ['Kühlschrank', 'Kühlschranks', 'Kühlschranke', 'Kühlschranken'], tag: 'case.two-way', explain: 'im = in dem (dative); masculine nouns keep their form: im Kühlschrank.', why: ['-s is a genitive ending.', 'No ending in the dative singular here.', 'No ending in the dative singular here.'] },
      { id: 'a2-wechselpraepositionen-5', kind: 'fill', prompt: 'Am Samstag gehen wir ___ Theater.', answers: ['ins'], tag: 'case.two-way', explain: 'gehen = movement → accusative: in das = ins Theater.', feedback: { im: 'im = in dem (Wo?). We go there → ins.', 'in das': 'Correct, but usually contracted: ins.' } },
      { id: 'a2-wechselpraepositionen-6', kind: 'choice', prompt: 'Wo ist mein Handy? – Es liegt ___ Bett.', options: ['neben dem', 'neben das', 'neben den', 'neben der'], tag: 'case.two-way', explain: 'liegen (Wo?) → dative; das Bett → neben dem Bett.', why: ['liegen describes position → dative.', 'Bett is neuter: dem.', 'Bett is neuter: dem.'] },
      { id: 'a2-wechselpraepositionen-7', kind: 'correct', sentence: 'Ich hänge die Lampe über dem Tisch.', answers: ['Ich hänge die Lampe über den Tisch.'], tag: 'case.two-way', explain: 'hängen with an object = movement to a goal (Wohin?) → accusative: über den Tisch.' },
      { id: 'a2-wechselpraepositionen-8', kind: 'transform', instruction: 'Answer with liegen: „Wohin legst du den Schlüssel?“ – „Auf den Tisch.“ – Now: Wo liegt der Schlüssel?', source: 'Der Schlüssel liegt auf … Tisch.', answers: ['Der Schlüssel liegt auf dem Tisch.'], tag: 'case.two-way', explain: 'liegen = position → dative: auf dem Tisch.', feedback: [['auf den', 'liegen describes a position (Wo?) → dative: auf dem Tisch.']] },
    ],
  },
  {
    id: 'a2-perfekt',
    explanation: `The **Perfekt** is the normal past tense in spoken German: **haben/sein** (position 2) + **past participle** (end).
*Ich **habe** gestern Pizza **gegessen**.*

**Participle forms**

| verb type | rule | examples |
|---|---|---|
| regular (weak) | **ge-** stem **-t** | machen → gemacht, kaufen → gekauft |
| irregular (strong) | **ge-** (new stem) **-en** | sehen → gesehen, gehen → gegangen, trinken → getrunken |
| separable | prefix + **ge** + verb | einkaufen → einge**kauft**, anrufen → ange**rufen** |
| -ieren & inseparable (be-, ver-, er- …) | **no ge-** | telefonieren → telefoniert, besuchen → besucht, verstehen → verstanden |

**sein** is used with verbs of **movement from A to B** (gehen, fahren, fliegen, kommen) and **change of state** (aufstehen, einschlafen, sterben, werden), plus **sein, bleiben, passieren**. All other verbs take **haben**.`,
    examples: [
      { de: 'Wir haben gestern Fußball gespielt.', en: 'We played football yesterday.' },
      { de: 'Sie ist nach Berlin gefahren.', en: 'She went to Berlin.' },
      { de: 'Ich bin um sieben aufgestanden.', en: 'I got up at seven.' },
    ],
    exercises: [
      { id: 'a2-perfekt-1', kind: 'fill', prompt: 'Ich habe gestern einen Film ___.', hint: 'sehen', answers: ['gesehen'], tag: 'verb.participle', explain: 'sehen is strong: gesehen.', feedback: { gesehent: 'Strong verbs end in -en: gesehen.', gesieht: 'The participle of sehen is gesehen.' } },
      { id: 'a2-perfekt-2', kind: 'choice', prompt: 'Wir ___ nach Hamburg geflogen.', options: ['sind', 'haben', 'hat', 'ist'], tag: 'verb.aux', explain: 'fliegen = movement from A to B → sein: wir sind geflogen.', why: ['Movement verbs take sein.', 'Movement verbs take sein; hat is also singular.', 'ist is singular; wir → sind.'] },
      { id: 'a2-perfekt-3', kind: 'fill', prompt: 'Hast du deine Oma ___?', hint: 'besuchen', answers: ['besucht'], tag: 'verb.participle', explain: 'be- verbs have no ge-: besucht.', feedback: { gebesucht: 'Verbs with be-, ver-, er- … have no ge-: besucht.' } },
      { id: 'a2-perfekt-4', kind: 'fill', prompt: 'Sie hat heute schon ___.', hint: 'einkaufen', answers: ['eingekauft'], tag: 'verb.participle', explain: 'Separable verbs: prefix + ge + verb: eingekauft.', feedback: { geeinkauft: 'The ge- goes between prefix and verb: eingekauft.', einkauft: 'Separable verbs keep ge-: eingekauft.' } },
      { id: 'a2-perfekt-5', kind: 'choice', prompt: 'Was ___ passiert?', options: ['ist', 'hat', 'wird', 'war'], tag: 'verb.aux', explain: 'passieren takes sein: Was ist passiert?', why: ['passieren forms the Perfekt with sein.', 'wird passiert would be passive — passieren cannot be passive.', 'war passiert is the Plusquamperfekt.'] },
      { id: 'a2-perfekt-6', kind: 'transform', instruction: 'Put the sentence into the Perfekt.', source: 'Ich trinke einen Kaffee.', answers: ['Ich habe einen Kaffee getrunken.'], tag: 'verb.participle', explain: 'trinken → getrunken, with haben.', feedback: [['getrinkt', 'trinken is strong: getrunken.'], ['bin', 'trinken takes haben.'], ['getrunken einen', 'The participle goes to the end of the sentence.']] },
      { id: 'a2-perfekt-7', kind: 'correct', sentence: 'Ich habe gestern lange getelefoniert.', answers: ['Ich habe gestern lange telefoniert.'], tag: 'verb.participle', explain: 'Verbs in -ieren have no ge-: telefoniert.' },
      { id: 'a2-perfekt-8', kind: 'choice', prompt: 'Er ___ um sechs Uhr aufgestanden.', options: ['ist', 'hat', 'habe', 'sind'], tag: 'verb.aux', explain: 'aufstehen is a change of state (lying → standing): sein.', why: ['Change of state takes sein.', 'Change of state takes sein; habe is also the wrong person.', 'er → ist.'] },
    ],
    drills: ['perfect'],
  },
  {
    id: 'a2-praeteritum-basis',
    explanation: `In speech, German uses the Perfekt for most verbs — but **sein, haben** and the **modal verbs** normally use the simple past (**Präteritum**):

| | sein | haben | können | müssen | wollen | dürfen | sollen |
|---|---|---|---|---|---|---|---|
| ich | war | hatte | konnte | musste | wollte | durfte | sollte |
| du | warst | hattest | konntest | musstest | wolltest | durftest | solltest |
| er / sie / es | war | hatte | konnte | musste | wollte | durfte | sollte |
| wir | waren | hatten | konnten | mussten | wollten | durften | sollten |
| ihr | wart | hattet | konntet | musstet | wolltet | durftet | solltet |
| sie / Sie | waren | hatten | konnten | mussten | wollten | durften | sollten |

Modal verbs lose their umlaut: können → konnte, müssen → musste. *möchten* has no past — use *wollte*.

**es gibt** → *es gab* (there was / there were).`,
    examples: [
      { de: 'Gestern war ich krank.', en: 'Yesterday I was ill.' },
      { de: 'Wir hatten keine Zeit.', en: 'We had no time.' },
      { de: 'Als Kind konnte ich nicht schwimmen.', en: 'As a child I couldn’t swim.' },
    ],
    exercises: [
      { id: 'a2-praeteritum-basis-1', kind: 'fill', prompt: 'Letztes Jahr ___ wir in Spanien.', hint: 'sein', answers: ['waren'], tag: 'verb.preterite', explain: 'sein → war; wir waren.', feedback: { war: 'wir → waren.', sind: 'Letztes Jahr → past: waren.' } },
      { id: 'a2-praeteritum-basis-2', kind: 'fill', prompt: 'Ich ___ gestern Kopfschmerzen.', hint: 'haben', answers: ['hatte'], tag: 'verb.preterite', explain: 'haben → hatte.', feedback: { habte: 'haben is irregular: ich hatte.', hätte: 'hätte (with ä) is Konjunktiv II — the past is hatte.' } },
      { id: 'a2-praeteritum-basis-3', kind: 'choice', prompt: 'Als Kind ___ ich jeden Tag Gemüse essen.', options: ['musste', 'müsste', 'muss', 'musstete'], tag: 'verb.preterite', explain: 'müssen → musste (no umlaut in the past).', why: ['müsste (with ü) is Konjunktiv II.', 'muss is present.', 'musste already has the -te ending.'] },
      { id: 'a2-praeteritum-basis-4', kind: 'fill', prompt: '___ du gestern auf der Party?', hint: 'sein', answers: ['Warst', 'warst'], tag: 'verb.preterite', explain: 'du → warst.', feedback: { war: 'du → warst.', wart: 'wart is the ihr form.' } },
      { id: 'a2-praeteritum-basis-5', kind: 'choice', prompt: 'Früher ___ es hier keinen Supermarkt.', options: ['gab', 'gibt', 'gebt', 'gegeben'], tag: 'verb.preterite', explain: 'es gibt → es gab.', why: ['gibt is present; früher → past.', 'gebt is not a form of es gibt.', 'gegeben needs hat: es hat gegeben.'] },
      { id: 'a2-praeteritum-basis-6', kind: 'correct', sentence: 'Wir konnten gestern nicht gekommen.', answers: ['Wir konnten gestern nicht kommen.'], tag: 'verb.modal', explain: 'After a modal verb the main verb stays in the infinitive: konnten … kommen.' },
      { id: 'a2-praeteritum-basis-7', kind: 'fill', prompt: 'Die Kinder ___ nicht ins Kino gehen.', hint: 'dürfen', answers: ['durften'], tag: 'verb.preterite', explain: 'dürfen → durften (plural, no umlaut).', feedback: { dürften: 'dürften (with ü) is Konjunktiv II; the past is durften.', durfte: 'Die Kinder is plural: durften.' } },
      { id: 'a2-praeteritum-basis-8', kind: 'transform', instruction: 'Put into the past (Präteritum).', source: 'Ich will dich anrufen, aber ich habe keine Zeit.', answers: ['Ich wollte dich anrufen, aber ich hatte keine Zeit.'], tag: 'verb.preterite', explain: 'will → wollte, habe → hatte.', feedback: [['willte', 'wollen → wollte.'], ['habte', 'haben → hatte.']] },
    ],
    drills: ['preterite'],
  },
  {
    id: 'a2-nebensaetze',
    explanation: `Conjunctions like **weil** (because), **dass** (that), **wenn** (if/when), **ob** (whether) introduce a **subordinate clause**: the conjugated verb goes to the **end**, and a comma separates the clauses.

*Ich bleibe zu Hause, **weil** ich krank **bin**.*
*Ich glaube, **dass** er heute **kommt**.*
*Wir gehen spazieren, **wenn** das Wetter schön **ist**.*

With separable verbs and modal verbs, the conjugated verb comes last: *…, weil ich früh **aufstehe**.* · *…, weil ich arbeiten **muss**.*

If the subordinate clause comes **first**, the main clause starts with the verb:
*Wenn das Wetter schön ist, **gehen** wir spazieren.*

> In casual speech you will hear *weil* with main-clause order (*weil ich bin müde*). Write it with the verb at the end.`,
    examples: [
      { de: 'Ich lerne Deutsch, weil ich in Wien arbeite.', en: 'I learn German because I work in Vienna.' },
      { de: 'Ich weiß, dass du recht hast.', en: 'I know that you are right.' },
      { de: 'Wenn du Zeit hast, ruf mich an.', en: 'If you have time, call me.' },
    ],
    exercises: [
      { id: 'a2-nebensaetze-1', kind: 'order', words: ['Ich komme nicht,', 'weil', 'ich', 'keine Zeit', 'habe'], tag: 'order.verb-final', explain: 'After weil the conjugated verb goes to the end: …, weil ich keine Zeit habe.' },
      { id: 'a2-nebensaetze-2', kind: 'choice', prompt: 'Ich hoffe, dass ___.', options: ['du bald wieder gesund bist', 'du bist bald wieder gesund', 'bist du bald wieder gesund', 'du bald bist wieder gesund'], tag: 'order.verb-final', explain: 'dass sends the verb to the end.', why: ['After dass, the conjugated verb goes to the end.', 'This is question order.', 'The verb must be the last element.'] },
      { id: 'a2-nebensaetze-3', kind: 'transform', instruction: 'Connect with weil.', source: 'Ich trinke Kaffee. Ich bin müde.', answers: ['Ich trinke Kaffee, weil ich müde bin.'], tag: 'order.verb-final', explain: 'weil + verb at the end: …, weil ich müde bin.', feedback: [['weil ich bin', 'In a weil clause the verb goes to the end: weil ich müde bin.']] },
      { id: 'a2-nebensaetze-4', kind: 'choice', prompt: 'Wenn es morgen regnet, ___.', options: ['bleiben wir zu Hause', 'wir bleiben zu Hause', 'wir zu Hause bleiben', 'zu Hause wir bleiben'], tag: 'order.v2', explain: 'The subordinate clause is position 1, so the main clause starts with its verb.', why: ['The whole wenn clause counts as position 1 — the verb must follow directly.', 'Verb-final order is only for the subordinate clause.', 'The verb must come right after the comma.'] },
      { id: 'a2-nebensaetze-5', kind: 'correct', sentence: 'Ich glaube, dass er kommt heute nicht.', answers: ['Ich glaube, dass er heute nicht kommt.'], tag: 'order.verb-final', explain: 'In a dass clause the conjugated verb goes to the end.' },
      { id: 'a2-nebensaetze-6', kind: 'transform', instruction: 'Connect with dass.', source: 'Er sagt: Er muss heute länger arbeiten.', answers: ['Er sagt, dass er heute länger arbeiten muss.'], tag: 'order.verb-final', explain: 'The modal verb is the conjugated verb → it goes last: … arbeiten muss.', feedback: [['muss arbeiten', 'In the subordinate clause the conjugated verb (muss) comes after the infinitive: arbeiten muss.']] },
      { id: 'a2-nebensaetze-7', kind: 'fill', prompt: 'Ich weiß nicht, ___ er heute kommt.', answers: ['ob'], tag: 'question', explain: 'A yes/no question in a subordinate clause: ob (whether).', feedback: { wenn: 'wenn means if/when (condition, time); “whether” is ob.', dass: 'dass states a fact; for an open yes/no question use ob.' } },
      { id: 'a2-nebensaetze-8', kind: 'order', words: ['Sie ist froh,', 'dass', 'sie', 'morgen', 'früh', 'aufstehen', 'kann'], tag: 'order.verb-final', explain: 'Modal verb last, infinitive (unseparated) before it: …, dass sie morgen früh aufstehen kann.' },
    ],
  },
  {
    id: 'a2-konjunktionen',
    explanation: `**und, aber, oder, denn, sondern** connect two main clauses **without** changing the word order — they stand in “position 0”:
*Ich bin müde, **denn** ich **habe** schlecht geschlafen.*

**deshalb** (therefore), **trotzdem** (nevertheless), **dann** (then), **danach** (after that) are **adverbs**: they take position 1, so the verb comes directly after them:
*Es regnet, **deshalb nehme** ich einen Schirm mit.*
*Es regnet, **trotzdem gehe** ich spazieren.*

| meaning | position 0 (no change) | position 1 (verb follows) | verb at the end |
|---|---|---|---|
| reason | denn | — | weil |
| consequence | — | deshalb, darum, deswegen | — |
| contrast | aber | trotzdem | obwohl (B1) |

**sondern** corrects after a negation: *Das ist nicht Tee, **sondern** Kaffee.*`,
    examples: [
      { de: 'Ich komme mit, aber ich habe nur eine Stunde Zeit.', en: 'I’ll come along, but I only have an hour.' },
      { de: 'Ich habe Hunger, deshalb koche ich jetzt.', en: 'I’m hungry, so I’m cooking now.' },
      { de: 'Er ist nicht dumm, sondern faul.', en: 'He isn’t stupid, but lazy.' },
    ],
    exercises: [
      { id: 'a2-konjunktionen-1', kind: 'choice', prompt: 'Ich gehe früh ins Bett, ___ ich bin müde.', options: ['denn', 'weil', 'deshalb', 'trotzdem'], tag: 'connector', explain: 'The verb follows the subject directly (ich bin) → denn (position 0).', why: ['weil would need the verb at the end: weil ich müde bin.', 'deshalb expresses a consequence, not a reason.', 'trotzdem expresses a contrast.'] },
      { id: 'a2-konjunktionen-2', kind: 'transform', instruction: 'Connect with deshalb.', source: 'Ich habe keine Zeit. Ich komme nicht.', answers: ['Ich habe keine Zeit, deshalb komme ich nicht.', 'Ich habe keine Zeit. Deshalb komme ich nicht.'], tag: 'connector', explain: 'deshalb takes position 1 → the verb follows: deshalb komme ich nicht.', feedback: [['deshalb ich komme', 'After deshalb the verb comes directly: deshalb komme ich …']] },
      { id: 'a2-konjunktionen-3', kind: 'fill', prompt: 'Das ist nicht mein Handy, ___ deins.', answers: ['sondern'], tag: 'connector', explain: 'After a negation: nicht …, sondern … (not …, but rather …).', feedback: { aber: 'After nicht/kein, “but rather” is sondern.' } },
      { id: 'a2-konjunktionen-4', kind: 'choice', prompt: 'Es ist kalt, ___ gehen wir schwimmen.', options: ['trotzdem', 'aber', 'denn', 'weil'], tag: 'connector', explain: 'The verb follows the connector directly → trotzdem (position 1).', why: ['aber would keep the normal order: aber wir gehen …', 'denn gives a reason and keeps the normal order.', 'weil would send the verb to the end.'] },
      { id: 'a2-konjunktionen-5', kind: 'correct', sentence: 'Ich lerne viel, deshalb ich spreche gut Deutsch.', answers: ['Ich lerne viel, deshalb spreche ich gut Deutsch.'], tag: 'connector', explain: 'After deshalb the verb comes next: deshalb spreche ich …' },
      { id: 'a2-konjunktionen-6', kind: 'fill', prompt: 'Möchtest du Tee ___ Kaffee?', answers: ['oder'], tag: 'connector', explain: 'A choice: oder.', feedback: { und: 'A choice between two things: oder.' } },
      { id: 'a2-konjunktionen-7', kind: 'order', words: ['Es regnet,', 'trotzdem', 'gehen', 'wir', 'spazieren'], tag: 'connector', explain: 'trotzdem in position 1 → verb next.' },
      { id: 'a2-konjunktionen-8', kind: 'choice', prompt: 'Ich mag Kaffee, ___ ich trinke lieber Tee.', options: ['aber', 'deshalb', 'sondern', 'trotzdem'], tag: 'connector', explain: 'Contrast with normal word order: aber.', why: ['deshalb would need the verb next (deshalb trinke ich …) and means “therefore”.', 'sondern only follows a negation.', 'trotzdem would need the verb next (trotzdem trinke ich …).'] },
    ],
  },
  {
    id: 'a2-komparativ',
    explanation: `| | regular | with umlaut | irregular |
|---|---|---|---|
| positive | schnell | alt, groß, jung, kalt | gut, viel, gern, hoch |
| comparative (+ **-er**) | schneller | älter, größer, jünger, kälter | besser, mehr, lieber, höher |
| superlative (**am** … **-sten**) | am schnellsten | am ältesten, am größten | am besten, am meisten, am liebsten, am höchsten |

- Comparing different things: **comparative + als** — *Paul ist größer **als** Tim.*
- Equal: **so … wie** — *Paul ist **so** groß **wie** Tim.*
- Before a noun the forms take adjective endings: *der schnell**ere** Zug, das größ**te** Haus.*
- Adjectives ending in -d, -t, -s, -ß, -z add **-esten**: *am ältesten, am heißesten.*`,
    examples: [
      { de: 'Mein Bruder ist älter als ich.', en: 'My brother is older than me.' },
      { de: 'Berlin ist nicht so groß wie London.', en: 'Berlin isn’t as big as London.' },
      { de: 'Am liebsten trinke ich Tee.', en: 'Most of all I like drinking tea.' },
    ],
    exercises: [
      { id: 'a2-komparativ-1', kind: 'fill', prompt: 'Ein Elefant ist ___ als ein Hund.', hint: 'groß', answers: ['größer'], tag: 'adj.comparison', explain: 'groß → größer (with umlaut).', feedback: { großer: 'groß takes an umlaut: größer.', 'mehr groß': 'German forms the comparative with -er: größer.' } },
      { id: 'a2-komparativ-2', kind: 'choice', prompt: 'Tim spielt ___ Fußball als Paul.', options: ['besser', 'guter', 'gut', 'am besten'], tag: 'adj.comparison', explain: 'gut → besser (irregular).', why: ['gut is irregular: besser.', 'With als we need the comparative: besser.', 'am besten is the superlative.'] },
      { id: 'a2-komparativ-3', kind: 'fill', prompt: 'Meine Schwester ist so alt ___ ich.', answers: ['wie'], tag: 'adj.comparison', explain: 'Equal comparison: so … wie.', feedback: { als: 'als follows a comparative (älter als); so … takes wie.' } },
      { id: 'a2-komparativ-4', kind: 'choice', prompt: 'Welcher Berg ist ___ in Deutschland? – Die Zugspitze.', options: ['am höchsten', 'höher', 'am hochsten', 'der hoch'], tag: 'adj.comparison', explain: 'hoch → höher → am höchsten.', why: ['We ask for the highest of all: superlative.', 'The superlative takes an umlaut: am höchsten.', 'The superlative is am höchsten.'] },
      { id: 'a2-komparativ-5', kind: 'fill', prompt: 'Ich trinke ___ Tee als Kaffee.', hint: 'gern', answers: ['lieber'], tag: 'adj.comparison', explain: 'gern → lieber → am liebsten.', feedback: { gerner: 'gern is irregular: lieber.', mehr: 'mehr is the comparative of viel; gern → lieber.' } },
      { id: 'a2-komparativ-6', kind: 'correct', sentence: 'Heute ist es kälter wie gestern.', answers: ['Heute ist es kälter als gestern.'], tag: 'adj.comparison', explain: 'After a comparative: als (wie is for so … wie).' },
      { id: 'a2-komparativ-7', kind: 'fill', prompt: 'Im Juli ist es am ___.', hint: 'heiß', answers: ['heißesten'], tag: 'adj.comparison', explain: 'Adjectives in -ß add -esten: am heißesten.', feedback: { heißsten: 'After -ß we add -esten: heißesten.', heissesten: 'Correct — written with ß: heißesten.' } },
      { id: 'a2-komparativ-8', kind: 'choice', prompt: 'Ich brauche ___ Zeit.', options: ['mehr', 'vieler', 'mehrer', 'meister'], tag: 'adj.comparison', explain: 'viel → mehr (no ending).', why: ['viel is irregular: mehr.', 'mehr never takes an ending.', 'The superlative is am meisten.'] },
    ],
    drills: ['comparison'],
  },
  {
    id: 'a2-reflexiv',
    explanation: `Reflexive verbs have a pronoun that refers back to the subject: *Ich freue **mich**.*

| | accusative | dative |
|---|---|---|
| ich | mich | mir |
| du | dich | dir |
| er / sie / es | **sich** | **sich** |
| wir | uns | uns |
| ihr | euch | euch |
| sie / Sie | **sich** | **sich** |

- Usually the reflexive pronoun is **accusative**: *Ich wasche **mich**.*
- If the sentence already has an accusative object, it becomes **dative**: *Ich wasche **mir** die Hände.* · *Ich putze **mir** die Zähne.*

Common reflexive verbs: sich freuen (auf/über), sich interessieren (für), sich ärgern (über), sich beeilen, sich anziehen, sich erholen, sich treffen, sich vorstellen, sich setzen, sich fühlen.`,
    examples: [
      { de: 'Ich freue mich auf das Wochenende.', en: 'I’m looking forward to the weekend.' },
      { de: 'Beeil dich!', en: 'Hurry up!' },
      { de: 'Ich wasche mir die Hände.', en: 'I wash my hands.' },
    ],
    exercises: [
      { id: 'a2-reflexiv-1', kind: 'fill', prompt: 'Interessierst du ___ für Politik?', answers: ['dich'], tag: 'reflexive', explain: 'du → dich (accusative).', feedback: { dir: 'There is no other object, so the reflexive pronoun is accusative: dich.', sich: 'sich is only for er/sie/es and sie/Sie.' } },
      { id: 'a2-reflexiv-2', kind: 'choice', prompt: 'Wir treffen ___ um acht vor dem Kino.', options: ['uns', 'sich', 'unsere', 'ihr'], tag: 'reflexive', explain: 'wir → uns.', why: ['sich is for er/sie/es/sie.', 'unsere is a possessive.', 'ihr is a different person.'] },
      { id: 'a2-reflexiv-3', kind: 'fill', prompt: 'Ich putze ___ die Zähne.', answers: ['mir'], tag: 'reflexive', explain: 'die Zähne is already the accusative object → reflexive pronoun in the dative: mir.', feedback: { mich: 'die Zähne is the accusative object, so the pronoun is dative: mir.' } },
      { id: 'a2-reflexiv-4', kind: 'fill', prompt: 'Die Kinder freuen ___ auf die Ferien.', answers: ['sich'], tag: 'reflexive', explain: 'sie (plural) → sich.', feedback: { ihnen: 'The reflexive pronoun for sie is sich.', uns: 'Die Kinder = sie → sich.' } },
      { id: 'a2-reflexiv-5', kind: 'choice', prompt: 'Setzen Sie ___ bitte!', options: ['sich', 'Sie', 'euch', 'Ihnen'], tag: 'reflexive', explain: 'The polite Sie has the reflexive pronoun sich (lower case).', why: ['The reflexive pronoun is sich, even for the polite Sie.', 'euch belongs to ihr (informal plural), not to Sie.', 'Ihnen is dative of Sie, not reflexive.'] },
      { id: 'a2-reflexiv-6', kind: 'correct', sentence: 'Ich habe mich die Haare gewaschen.', answers: ['Ich habe mir die Haare gewaschen.'], tag: 'reflexive', explain: 'die Haare is the accusative object → dative reflexive: mir.' },
      { id: 'a2-reflexiv-7', kind: 'order', words: ['Wir', 'müssen', 'uns', 'beeilen'], tag: 'reflexive', explain: 'The reflexive pronoun follows the conjugated verb; the infinitive goes last.' },
      { id: 'a2-reflexiv-8', kind: 'fill', prompt: 'Ärgerst du ___ über den Lärm?', answers: ['dich'], tag: 'reflexive', explain: 'sich ärgern über: du ärgerst dich.' },
    ],
  },
  {
    id: 'a2-adjektiv-basis',
    explanation: `An adjective **before a noun** gets an ending. Start with the two most common situations:

**After der / die / das** (definite article) the ending is **-e** or **-en**:

| | masculine | feminine | neuter | plural |
|---|---|---|---|---|
| nominative | der neu**e** Film | die neu**e** Jacke | das neu**e** Auto | die neu**en** Schuhe |
| accusative | den neu**en** Film | die neu**e** Jacke | das neu**e** Auto | die neu**en** Schuhe |
| dative | dem neu**en** Film | der neu**en** Jacke | dem neu**en** Auto | den neu**en** Schuhen |

**After ein / kein / mein** the adjective shows the gender where the article doesn’t:

| | masculine | feminine | neuter |
|---|---|---|---|
| nominative | ein neu**er** Film | eine neu**e** Jacke | ein neu**es** Auto |
| accusative | einen neu**en** Film | eine neu**e** Jacke | ein neu**es** Auto |
| dative | einem neu**en** Film | einer neu**en** Jacke | einem neu**en** Auto |

> Rule of thumb: once the article clearly shows case and gender, the adjective takes **-e/-en**. After *ein* (m/n nominative) and *ein* (n accusative) the adjective must show it: **-er / -es**.`,
    examples: [
      { de: 'Der neue Kollege ist sehr nett.', en: 'The new colleague is very nice.' },
      { de: 'Ich habe ein neues Fahrrad.', en: 'I have a new bike.' },
      { de: 'Wir wohnen in einem kleinen Dorf.', en: 'We live in a small village.' },
    ],
    exercises: [
      { id: 'a2-adjektiv-basis-1', kind: 'fill', prompt: 'Der ___ Mann ist mein Nachbar.', hint: 'alt', answers: ['alte'], tag: 'adj.ending', explain: 'After der (nominative singular): -e → der alte Mann.', feedback: { alter: 'der already shows masculine nominative, so the adjective takes -e.', alten: '-en is used in the accusative/dative; here nominative: alte.' } },
      { id: 'a2-adjektiv-basis-2', kind: 'fill', prompt: 'Ich kaufe einen ___ Pullover.', hint: 'warm', answers: ['warmen'], tag: 'adj.ending', explain: 'Masculine accusative after einen: -en.', feedback: { warmer: '-er is for masculine nominative after ein; here accusative: warmen.', warme: 'Masculine accusative takes -en: warmen.' } },
      { id: 'a2-adjektiv-basis-3', kind: 'choice', prompt: 'Das ist ein ___ Auto.', options: ['teures', 'teure', 'teurer', 'teuren'], tag: 'adj.ending', explain: 'Neuter after ein: the adjective shows the gender: -es. (teuer drops the e: teures.)', why: ['ein does not show neuter, so the adjective must: teures.', '-er would mark masculine.', '-en is for accusative masculine / dative.'] },
      { id: 'a2-adjektiv-basis-4', kind: 'fill', prompt: 'Wie findest du die ___ Schuhe?', hint: 'rot', answers: ['roten'], tag: 'adj.ending', explain: 'Plural after die: -en.', feedback: { rote: 'Plural after a definite article: -en.' } },
      { id: 'a2-adjektiv-basis-5', kind: 'choice', prompt: 'Wir wohnen in einem ___ Haus.', options: ['großen', 'großes', 'große', 'großem'], tag: 'adj.ending', explain: 'Dative after einem: -en.', why: ['einem already shows dative; the adjective takes -en.', 'einem already shows the case; the adjective takes -en.', 'Only one -em: einem großen Haus.'] },
      { id: 'a2-adjektiv-basis-6', kind: 'correct', sentence: 'Ich habe einen neues Computer.', answers: ['Ich habe einen neuen Computer.'], tag: 'adj.ending', explain: 'Masculine accusative after einen: neuen.' },
      { id: 'a2-adjektiv-basis-7', kind: 'fill', prompt: 'Das ist eine sehr ___ Idee.', hint: 'gut', answers: ['gute'], tag: 'adj.ending', explain: 'Feminine nominative after eine: -e.' },
      { id: 'a2-adjektiv-basis-8', kind: 'fill', prompt: 'Er spricht mit der ___ Lehrerin.', hint: 'neu', answers: ['neuen'], tag: 'adj.ending', explain: 'Dative after der: -en.', feedback: { neue: 'mit takes the dative; after der (dative) the adjective takes -en.' } },
    ],
    drills: ['adj-definite', 'adj-indefinite'],
  },
  {
    id: 'a2-konjunktiv-hoeflich',
    explanation: `The **Konjunktiv II** makes requests and wishes polite:

| direct | polite |
|---|---|
| Ich will einen Kaffee. | Ich **hätte gern** einen Kaffee. / Ich **möchte** einen Kaffee. |
| Können Sie mir helfen? | **Könnten** Sie mir helfen? |
| Geben Sie mir das Salz! | **Würden** Sie mir bitte das Salz geben? |
| Ist das möglich? | **Wäre** das möglich? |

Forms: hätte, wäre, könnte, würde (+ infinitive) — with the past-tense endings: ich hätte, du hättest, er hätte, wir hätten, ihr hättet, sie hätten.

> **dürfte** sounds very polite: *Dürfte ich kurz stören?* (May I interrupt for a moment?)`,
    examples: [
      { de: 'Ich hätte gern ein Glas Wasser.', en: 'I’d like a glass of water.' },
      { de: 'Könnten Sie das bitte wiederholen?', en: 'Could you repeat that, please?' },
      { de: 'Würdest du mir kurz helfen?', en: 'Would you help me for a moment?' },
    ],
    exercises: [
      { id: 'a2-konjunktiv-hoeflich-1', kind: 'fill', prompt: '(im Restaurant) Ich ___ gern die Speisekarte.', hint: 'haben', answers: ['hätte'], tag: 'mood.konj2', explain: 'Polite request: Ich hätte gern …', feedback: { habe: '„Ich habe gern“ means “I like having”. A polite order is: Ich hätte gern …', hatte: 'hatte (without umlaut) is the past tense; polite: hätte.' } },
      { id: 'a2-konjunktiv-hoeflich-2', kind: 'choice', prompt: '___ Sie mir bitte sagen, wo der Bahnhof ist?', options: ['Könnten', 'Konnten', 'Kann', 'Könntet'], tag: 'mood.konj2', explain: 'Polite question: Könnten Sie …?', why: ['konnten (without umlaut) is the past tense.', 'Sie needs the plural form; and Konjunktiv sounds more polite.', 'könntet is the ihr form.'] },
      { id: 'a2-konjunktiv-hoeflich-3', kind: 'transform', instruction: 'Make the request polite with würden.', source: 'Machen Sie bitte das Fenster zu!', answers: ['Würden Sie bitte das Fenster zumachen?', 'Würden Sie das Fenster bitte zumachen?'], tag: 'mood.konj2', explain: 'Würden Sie + infinitive (at the end): … zumachen?', feedback: [['zu machen', 'zumachen is written as one word in the infinitive.'], ['würden sie machen', 'The infinitive goes to the end: Würden Sie … zumachen?']] },
      { id: 'a2-konjunktiv-hoeflich-4', kind: 'fill', prompt: '___ es möglich, den Termin zu verschieben?', hint: 'sein', answers: ['Wäre', 'wäre'], tag: 'mood.konj2', explain: 'Polite: Wäre es möglich …?', feedback: { war: 'war is the past tense; polite: wäre.', ist: 'Correct but direct; the polite form is wäre.' } },
      { id: 'a2-konjunktiv-hoeflich-5', kind: 'choice', prompt: 'Was ___ Sie trinken? – Ein Wasser, bitte.', options: ['möchten', 'mögen', 'möchtet', 'möchte'], tag: 'mood.konj2', explain: 'Polite offer: Was möchten Sie …?', why: ['mögen means “like” in general; offering a drink: möchten.', 'möchtet is the ihr form.', 'Sie needs möchten.'] },
      { id: 'a2-konjunktiv-hoeflich-6', kind: 'correct', sentence: 'Würden Sie mir helfen bitte?', answers: ['Würden Sie mir bitte helfen?'], tag: 'order.bracket', explain: 'The infinitive closes the sentence: Würden Sie mir bitte helfen?' },
      { id: 'a2-konjunktiv-hoeflich-7', kind: 'fill', prompt: 'Wir ___ gern zwei Karten für heute Abend.', hint: 'haben', answers: ['hätten'], tag: 'mood.konj2', explain: 'wir → hätten.', feedback: { hätte: 'wir → hätten.', haben: 'Polite: wir hätten gern …' } },
      { id: 'a2-konjunktiv-hoeflich-8', kind: 'order', words: ['Könntest', 'du', 'mir', 'bitte', 'das Salz', 'geben?'], tag: 'mood.konj2', explain: 'Polite question: modal (Konjunktiv) first, infinitive at the end.' },
    ],
  },
  {
    id: 'a2-zeitangaben',
    explanation: `| preposition | meaning | case | example |
|---|---|---|---|
| **seit** | since / for (still going on) | dative | seit drei Jahren, seit Montag |
| **vor** | ago / before | dative | vor einer Woche, vor dem Essen |
| **nach** | after | dative | nach der Arbeit |
| **ab** | from … on (future) | dative | ab nächster Woche, ab Montag |
| **bis** | until | — | bis Freitag, bis morgen |
| **in** | in (future) | dative | in zwei Stunden |
| **für** | for (planned period) | accusative | für eine Woche |
| **während** | during | genitive | während der Ferien |

> English “for” has three translations: *seit* (still going on), *für* (a planned period), or no preposition (*Ich war zwei Wochen in Rom*).`,
    examples: [
      { de: 'Ich lerne seit zwei Jahren Deutsch.', en: 'I have been learning German for two years.' },
      { de: 'Vor einer Woche war ich in Paris.', en: 'A week ago I was in Paris.' },
      { de: 'Ab Montag arbeite ich wieder.', en: 'From Monday I’ll be working again.' },
    ],
    exercises: [
      { id: 'a2-zeitangaben-1', kind: 'fill', prompt: 'Ich wohne ___ fünf Jahren in Köln.', answers: ['seit'], tag: 'preposition', explain: 'Still living there → seit + dative.', feedback: { für: 'For a period that continues up to now German uses seit.', vor: 'vor fünf Jahren = five years ago.' } },
      { id: 'a2-zeitangaben-2', kind: 'fill', prompt: '___ zwei Tagen habe ich ihn getroffen.', answers: ['Vor', 'vor'], tag: 'preposition', explain: 'A point in the past (ago): vor + dative.', feedback: { seit: 'seit is for something that is still going on.' } },
      { id: 'a2-zeitangaben-3', kind: 'choice', prompt: 'Der Zug fährt ___ einer Stunde.', options: ['in', 'vor', 'seit', 'nach'], tag: 'preposition', explain: 'In the future after a period: in + dative.', why: ['vor = ago (past).', 'seit = since (until now).', 'nach einer Stunde = after an hour (usually for past events).'] },
      { id: 'a2-zeitangaben-4', kind: 'fill', prompt: 'Ich fahre ___ eine Woche nach Rom.', answers: ['für'], tag: 'preposition', explain: 'A planned period: für + accusative.', feedback: { seit: 'seit is for something that started in the past and continues.' } },
      { id: 'a2-zeitangaben-5', kind: 'choice', prompt: '___ dem Essen putze ich mir die Zähne.', options: ['Nach', 'Seit', 'Ab', 'Bis'], tag: 'preposition', explain: 'After a meal: nach dem Essen.', why: ['seit = since; it doesn’t fit a routine.', 'ab = from … onwards.', 'bis = until.'] },
      { id: 'a2-zeitangaben-6', kind: 'correct', en: 'I have been learning German for two years (and I still am).', sentence: 'Ich lerne Deutsch für zwei Jahre.', answers: ['Ich lerne seit zwei Jahren Deutsch.', 'Ich lerne Deutsch seit zwei Jahren.'], tag: 'preposition', explain: 'Still learning → seit + dative plural: seit zwei Jahren.' },
      { id: 'a2-zeitangaben-7', kind: 'fill', prompt: 'Das Geschäft ist ___ 20 Uhr geöffnet.', answers: ['bis'], tag: 'preposition', explain: 'until 8 pm: bis 20 Uhr.' },
      { id: 'a2-zeitangaben-8', kind: 'fill', prompt: '___ nächstem Monat habe ich eine neue Stelle.', answers: ['Ab', 'ab'], tag: 'preposition', explain: 'From a future point on: ab + dative.', feedback: { seit: 'seit looks back; for the future use ab.' } },
    ],
  },
];
