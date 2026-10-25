import type { GrammarLesson } from '@/lib/exercise/types';

export const B1_LESSONS: GrammarLesson[] = [
  {
    id: 'b1-praeteritum',
    explanation: `The **Präteritum** (simple past) is the tense of written narration — stories, reports, news. In speech it is mainly used for sein, haben, modal verbs and a few common verbs (es gab, ich dachte, ich wusste).

**Regular verbs**: stem + **-te** + ending:

| | machen | arbeiten |
|---|---|---|
| ich | mach**te** | arbeit**ete** |
| du | mach**test** | arbeit**etest** |
| er / sie / es | mach**te** | arbeit**ete** |
| wir | mach**ten** | arbeit**eten** |
| ihr | mach**tet** | arbeit**etet** |
| sie / Sie | mach**ten** | arbeit**eten** |

**Irregular verbs** change the stem; ich and er/sie/es have **no ending**: *gehen → ging, kommen → kam, sehen → sah, fahren → fuhr, nehmen → nahm, schreiben → schrieb, finden → fand, bleiben → blieb.*

**Mixed verbs** change the stem **and** add -te: *denken → dachte, bringen → brachte, wissen → wusste, kennen → kannte.*`,
    examples: [
      { de: 'Es war einmal ein König, der hatte drei Töchter.', en: 'Once upon a time there was a king who had three daughters.' },
      { de: 'Sie stand auf und ging zum Fenster.', en: 'She got up and went to the window.' },
      { de: 'Ich dachte, du kommst nicht.', en: 'I thought you weren’t coming.' },
    ],
    exercises: [
      { id: 'b1-praeteritum-1', kind: 'fill', prompt: 'Gestern ___ ich einen alten Freund.', hint: 'treffen', answers: ['traf'], tag: 'verb.preterite', explain: 'treffen → traf (irregular, no ending with ich).', feedback: { treffte: 'treffen is irregular: ich traf.', trafe: 'Irregular verbs have no ending with ich: traf.' } },
      { id: 'b1-praeteritum-2', kind: 'fill', prompt: 'Die Kinder ___ den ganzen Tag im Garten.', hint: 'spielen', answers: ['spielten'], tag: 'verb.preterite', explain: 'Regular: spiel + te + n → spielten.', feedback: { spielte: 'Plural subject: spielten.' } },
      { id: 'b1-praeteritum-3', kind: 'choice', prompt: 'Er ___ mir einen langen Brief.', options: ['schrieb', 'schreibte', 'schrob', 'geschrieben'], tag: 'verb.preterite', explain: 'schreiben → schrieb.', why: ['schreiben is irregular: schrieb.', 'There is no form schrob.', 'geschrieben is the participle (needs hat).'] },
      { id: 'b1-praeteritum-4', kind: 'fill', prompt: 'Ich ___, dass du schon weg bist.', hint: 'denken', answers: ['dachte'], tag: 'verb.preterite', explain: 'denken is mixed: dachte.', feedback: { denkte: 'denken is a mixed verb: dachte.', dacht: 'Mixed verbs add -te: dachte.' } },
      { id: 'b1-praeteritum-5', kind: 'choice', prompt: 'Wir ___ zu spät am Bahnhof an.', options: ['kamen', 'kommten', 'kamten', 'kammen'], tag: 'verb.preterite', explain: 'ankommen → kamen … an.', why: ['kommen is irregular: kamen.', 'Irregular verbs don’t add -te.', 'Single m: kamen.'] },
      { id: 'b1-praeteritum-6', kind: 'transform', instruction: 'Rewrite in the Präteritum.', source: 'Sie fährt nach Hause und liest ein Buch.', answers: ['Sie fuhr nach Hause und las ein Buch.'], tag: 'verb.preterite', explain: 'fahren → fuhr, lesen → las.', feedback: [['fahrte|fährte', 'fahren is irregular: fuhr.'], ['laste|lies\\b', 'lesen is irregular: las.']] },
      { id: 'b1-praeteritum-7', kind: 'correct', sentence: 'Gestern wisste ich die Antwort nicht.', answers: ['Gestern wusste ich die Antwort nicht.'], tag: 'verb.preterite', explain: 'wissen → wusste (mixed verb).' },
      { id: 'b1-praeteritum-8', kind: 'fill', prompt: 'Es ___ einmal ein armes Mädchen.', hint: 'geben', answers: ['gab'], tag: 'verb.preterite', explain: 'es gibt → es gab.' },
    ],
    drills: ['preterite'],
  },
  {
    id: 'b1-plusquamperfekt',
    explanation: `The **Plusquamperfekt** (past perfect) describes an action that happened **before** another past action: **hatte/war** + past participle.

*Nachdem ich **gegessen hatte**, ging ich spazieren.*
*Als wir ankamen, **war** der Zug schon **abgefahren**.*

haben or sein follows the same rules as in the Perfekt (movement and change of state → sein).

**nachdem** (after) needs a tense shift:
| main clause | nachdem clause |
|---|---|
| Präsens | Perfekt |
| Präteritum / Perfekt | Plusquamperfekt |

*Nachdem er **angerufen hat**, **geht** er.* · *Nachdem er **angerufen hatte**, **ging** er.*`,
    examples: [
      { de: 'Ich hatte den Film schon gesehen.', en: 'I had already seen the film.' },
      { de: 'Nachdem sie gefrühstückt hatte, fuhr sie los.', en: 'After she had had breakfast, she set off.' },
      { de: 'Als ich kam, war er schon gegangen.', en: 'When I came, he had already left.' },
    ],
    exercises: [
      { id: 'b1-plusquamperfekt-1', kind: 'fill', prompt: 'Nachdem wir gegessen ___, gingen wir ins Kino.', answers: ['hatten'], tag: 'verb.tense', explain: 'Earlier action in the past: Plusquamperfekt with hatten.', feedback: { haben: 'The main clause is Präteritum, so nachdem needs the Plusquamperfekt: hatten.', waren: 'essen takes haben: hatten gegessen.' } },
      { id: 'b1-plusquamperfekt-2', kind: 'choice', prompt: 'Als ich am Bahnhof ankam, ___ der Zug schon abgefahren.', options: ['war', 'hatte', 'ist', 'wurde'], tag: 'verb.tense', explain: 'abfahren takes sein; earlier action → war abgefahren.', why: ['abfahren is a movement verb → sein.', 'ist would be Perfekt; the action happened before the past moment.', 'wurde would be passive.'] },
      { id: 'b1-plusquamperfekt-3', kind: 'transform', instruction: 'Connect with nachdem (first action in the Plusquamperfekt).', source: 'Er duschte. Dann frühstückte er.', answers: ['Nachdem er geduscht hatte, frühstückte er.', 'Er frühstückte, nachdem er geduscht hatte.'], tag: 'verb.tense', explain: 'Nachdem + Plusquamperfekt (hatte geduscht), main clause Präteritum.', feedback: [['nachdem er duschte', 'The earlier action needs the Plusquamperfekt: nachdem er geduscht hatte.'], ['hatte geduscht', 'In the subordinate clause the conjugated verb goes last: geduscht hatte.']] },
      { id: 'b1-plusquamperfekt-4', kind: 'fill', prompt: 'Sie war müde, weil sie schlecht ___ hatte.', hint: 'schlafen', answers: ['geschlafen'], tag: 'verb.participle', explain: 'schlafen → geschlafen.' },
      { id: 'b1-plusquamperfekt-5', kind: 'correct', sentence: 'Nachdem ich die Hausaufgaben gemacht habe, ging ich raus.', answers: ['Nachdem ich die Hausaufgaben gemacht hatte, ging ich raus.'], tag: 'verb.tense', explain: 'Main clause in the Präteritum → nachdem clause in the Plusquamperfekt: hatte.' },
      { id: 'b1-plusquamperfekt-6', kind: 'choice', prompt: 'Ich konnte nicht ins Haus, denn ich ___ meinen Schlüssel vergessen.', options: ['hatte', 'war', 'habe', 'wurde'], tag: 'verb.tense', explain: 'Forgetting happened before → hatte vergessen.', why: ['vergessen takes haben.', 'Perfekt would not show that it happened earlier.', 'wurde would be passive.'] },
      { id: 'b1-plusquamperfekt-7', kind: 'order', words: ['Nachdem', 'sie', 'angekommen', 'war,', 'rief', 'sie', 'mich', 'an'], tag: 'verb.tense', explain: 'nachdem clause with verb at the end, then the main clause starts with the verb.' },
      { id: 'b1-plusquamperfekt-8', kind: 'fill', prompt: 'Wir ___ uns lange nicht gesehen.', answers: ['hatten'], tag: 'verb.tense', en: '(When we met last year …) We hadn’t seen each other for a long time.', explain: 'Earlier than a past moment → hatten … gesehen.' },
    ],
  },
  {
    id: 'b1-relativsaetze',
    explanation: `A relative clause describes a noun more closely. The relative pronoun takes its **gender and number from the noun** and its **case from its role in the relative clause**. The verb goes to the end; commas enclose the clause.

| | masculine | feminine | neuter | plural |
|---|---|---|---|---|
| nominative | der | die | das | die |
| accusative | den | die | das | die |
| dative | dem | der | dem | **denen** |
| genitive | **dessen** | **deren** | **dessen** | **deren** |

- *Der Mann, **der** dort steht, …* (subject → nominative)
- *Der Mann, **den** ich kenne, …* (object of kennen → accusative)
- *Der Mann, **dem** ich helfe, …* (helfen → dative)
- *Der Mann, **mit dem** ich arbeite, …* (preposition + case)
- *Die Frau, **deren** Auto kaputt ist, …* (whose)`,
    examples: [
      { de: 'Das ist der Film, den ich dir empfohlen habe.', en: 'That’s the film I recommended to you.' },
      { de: 'Die Kollegen, mit denen ich arbeite, sind nett.', en: 'The colleagues I work with are nice.' },
      { de: 'Wie heißt die Frau, deren Sohn Arzt ist?', en: 'What’s the name of the woman whose son is a doctor?' },
    ],
    exercises: [
      { id: 'b1-relativsaetze-1', kind: 'fill', prompt: 'Das ist der Kollege, ___ mir immer hilft.', answers: ['der'], tag: 'relative', explain: 'He is the subject of the relative clause → nominative masculine: der.', feedback: { den: 'The colleague helps (subject) → nominative: der.', dem: 'The colleague is the subject, not the receiver: der.' } },
      { id: 'b1-relativsaetze-2', kind: 'fill', prompt: 'Das ist der Kollege, ___ ich immer helfe.', answers: ['dem'], tag: 'relative', explain: 'helfen takes the dative → dem.', feedback: { den: 'helfen takes the dative: dem.', der: 'ich is the subject; the colleague is the dative object: dem.' } },
      { id: 'b1-relativsaetze-3', kind: 'choice', prompt: 'Die Wohnung, ___ wir gemietet haben, ist sehr hell.', options: ['die', 'der', 'den', 'das'], tag: 'relative', explain: 'Wohnung is feminine; object of mieten → accusative feminine: die.', why: ['der is masculine nominative or feminine dative.', 'den is masculine accusative.', 'das is neuter.'] },
      { id: 'b1-relativsaetze-4', kind: 'fill', prompt: 'Die Leute, mit ___ ich spreche, kommen aus Wien.', answers: ['denen'], tag: 'relative', explain: 'mit + dative plural: denen.', feedback: { den: 'The dative plural relative pronoun is denen.', die: 'mit takes the dative: denen.' } },
      { id: 'b1-relativsaetze-5', kind: 'choice', prompt: 'Das ist der Nachbar, ___ Hund immer bellt.', options: ['dessen', 'deren', 'der', 'dem'], tag: 'relative', explain: 'whose + masculine owner → dessen.', why: ['deren is for feminine or plural owners.', 'We need the possessive form (whose): dessen.', 'We need the possessive form (whose): dessen.'] },
      { id: 'b1-relativsaetze-6', kind: 'transform', instruction: 'Combine with a relative clause.', source: 'Ich lese ein Buch. Das Buch ist sehr spannend.', answers: ['Ich lese ein Buch, das sehr spannend ist.', 'Das Buch, das ich lese, ist sehr spannend.'], tag: 'relative', explain: 'Buch is neuter, subject of the relative clause → das; verb at the end.', feedback: [['das ist sehr spannend', 'In the relative clause the verb goes to the end: …, das sehr spannend ist.'], [', dass ', 'The relative pronoun is das (one s); dass is a conjunction.']] },
      { id: 'b1-relativsaetze-7', kind: 'correct', sentence: 'Die Frau, die ich gestern geholfen habe, ist meine Nachbarin.', answers: ['Die Frau, der ich gestern geholfen habe, ist meine Nachbarin.'], tag: 'relative', explain: 'helfen takes the dative; feminine dative: der.' },
      { id: 'b1-relativsaetze-8', kind: 'fill', prompt: 'Ich habe die Stadt besucht, in ___ du geboren bist.', answers: ['der'], tag: 'relative', explain: 'in + dative (Wo?) feminine: in der.', feedback: { die: 'Place (Wo?) → in + dative: der.' } },
    ],
  },
  {
    id: 'b1-passiv',
    explanation: `In the **passive** the action is more important than the person doing it. Process passive: **werden** + past participle.

| tense | form |
|---|---|
| Präsens | Das Haus **wird** gebaut. |
| Präteritum | Das Haus **wurde** gebaut. |

The doer can be added with **von** + dative: *Das Haus wird **von einer Firma** gebaut.*

From active to passive:
*Die Firma **baut** das Haus.* → *Das Haus **wird** (von der Firma) **gebaut**.*
The accusative object becomes the subject (nominative).

> Don’t confuse the three uses of **werden**: main verb “to become” (*Er wird Arzt*), future (*Er wird kommen*), passive (*Er wird gefragt*).`,
    examples: [
      { de: 'In Deutschland wird viel Brot gegessen.', en: 'A lot of bread is eaten in Germany.' },
      { de: 'Das Schloss wurde im 18. Jahrhundert gebaut.', en: 'The palace was built in the 18th century.' },
      { de: 'Die Briefe werden morgens verteilt.', en: 'The letters are delivered in the morning.' },
    ],
    exercises: [
      { id: 'b1-passiv-1', kind: 'fill', prompt: 'Die Straße ___ gerade repariert.', answers: ['wird'], tag: 'voice.passive', explain: 'Process passive, present: wird + participle.', feedback: { ist: '„ist repariert“ describes a finished state; something happening right now: wird repariert.', werden: 'Die Straße is singular: wird.' } },
      { id: 'b1-passiv-2', kind: 'choice', prompt: 'Das Auto ___ 1965 gebaut.', options: ['wurde', 'wird', 'würde', 'worden'], tag: 'voice.passive', explain: 'Past passive: wurde + participle.', why: ['1965 → past: wurde.', 'würde is Konjunktiv II.', 'worden appears only in the perfect passive (ist … worden).'] },
      { id: 'b1-passiv-3', kind: 'transform', instruction: 'Rewrite in the passive (present tense).', source: 'Der Arzt untersucht den Patienten.', answers: ['Der Patient wird vom Arzt untersucht.', 'Der Patient wird von dem Arzt untersucht.', 'Der Patient wird untersucht.'], tag: 'voice.passive', explain: 'The accusative object becomes the subject: der Patient; werden + participle.', feedback: [['den patienten wird', 'In the passive the object becomes the subject (nominative): der Patient.'], ['wird untersucht vom', 'The participle goes to the end: wird vom Arzt untersucht.']] },
      { id: 'b1-passiv-4', kind: 'fill', prompt: 'Die Fenster ___ jeden Monat geputzt.', answers: ['werden'], tag: 'voice.passive', explain: 'Plural subject: werden.', feedback: { wird: 'Die Fenster is plural: werden.' } },
      { id: 'b1-passiv-5', kind: 'choice', prompt: 'Der Brief wurde ___ meiner Schwester geschrieben.', options: ['von', 'durch', 'mit', 'bei'], tag: 'voice.passive', explain: 'The person doing the action: von + dative.', why: ['durch is for means/causes, not persons.', 'mit is the instrument (mit dem Stift).', 'bei does not mark the doer.'] },
      { id: 'b1-passiv-6', kind: 'correct', sentence: 'Das Museum wird im Jahr 1900 eröffnet.', en: 'The museum was opened in 1900.', answers: ['Das Museum wurde im Jahr 1900 eröffnet.'], tag: 'voice.passive', explain: 'A past event: wurde eröffnet.' },
      { id: 'b1-passiv-7', kind: 'transform', instruction: 'Rewrite in the passive (Präteritum), without naming the doer.', source: 'Man renovierte die Schule letztes Jahr.', answers: ['Die Schule wurde letztes Jahr renoviert.', 'Letztes Jahr wurde die Schule renoviert.'], tag: 'voice.passive', explain: 'man disappears; die Schule becomes the subject: wurde … renoviert.' },
      { id: 'b1-passiv-8', kind: 'choice', prompt: 'Welcher Satz ist Passiv?', options: ['Er wird oft gefragt.', 'Er wird Lehrer.', 'Er wird morgen anrufen.', 'Er wird müde.'], tag: 'voice.passive', explain: 'werden + participle = passive: Er wird oft gefragt.', why: ['werden + noun = become (Er wird Lehrer).', 'werden + infinitive = future.', 'werden + adjective = become.'] },
    ],
  },
  {
    id: 'b1-konjunktiv2',
    explanation: `The **Konjunktiv II** expresses what is **unreal or hypothetical**: wishes, conditions, advice.

Most verbs: **würde + infinitive**. Common verbs use their own form:

| | sein | haben | können | müssen | werden | wissen | geben | kommen |
|---|---|---|---|---|---|---|---|---|
| ich / er | wäre | hätte | könnte | müsste | würde | wüsste | gäbe | käme |

(Endings like the past: du wär(e)st, wir wären, ihr wär(e)t …)

- **Wishes**: *Wenn ich doch mehr Zeit **hätte**!* · *Ich **wäre** gern am Meer.*
- **Unreal conditions**: *Wenn ich reich **wäre**, **würde** ich die Welt bereisen.*
- **Advice**: *An deiner Stelle **würde** ich zum Arzt gehen.* · *Du **solltest** mehr schlafen.*
- **Politeness**: *Könnten Sie …?*

> In the *wenn* clause most speakers avoid *würde*: *Wenn ich Zeit **hätte** …* (not *wenn ich Zeit haben würde*).`,
    examples: [
      { de: 'Wenn ich Zeit hätte, würde ich dich besuchen.', en: 'If I had time, I would visit you.' },
      { de: 'Ich wäre jetzt gern am Strand.', en: 'I’d love to be at the beach now.' },
      { de: 'Du solltest weniger arbeiten.', en: 'You should work less.' },
    ],
    exercises: [
      { id: 'b1-konjunktiv2-1', kind: 'fill', prompt: 'Wenn ich mehr Geld ___, würde ich ein Haus kaufen.', hint: 'haben', answers: ['hätte'], tag: 'mood.konj2', explain: 'Unreal condition: hätte.', feedback: { hatte: 'hatte is the past tense; unreal: hätte.', habe: 'This is unreal (I don’t have it): hätte.' } },
      { id: 'b1-konjunktiv2-2', kind: 'choice', prompt: 'An deiner Stelle ___ ich das nicht machen.', options: ['würde', 'werde', 'wurde', 'wäre'], tag: 'mood.konj2', explain: 'Advice: An deiner Stelle würde ich …', why: ['werde is future/indicative.', 'wurde is the past tense.', 'wäre is Konjunktiv of sein; we need würde + machen.'] },
      { id: 'b1-konjunktiv2-3', kind: 'transform', instruction: 'Express the unreal condition with wenn.', source: 'Ich habe keine Zeit. Ich komme nicht mit.', answers: ['Wenn ich Zeit hätte, würde ich mitkommen.', 'Wenn ich Zeit hätte, käme ich mit.'], tag: 'mood.konj2', explain: 'Reality reversed: Wenn ich Zeit hätte, würde ich mitkommen.', feedback: [['keine zeit hätte', 'The unreal condition turns the reality around: Wenn ich Zeit hätte …'], ['wenn ich zeit habe', 'An unreal condition needs the Konjunktiv II: hätte.'], ['würde ich mit kommen', 'mitkommen is one word in the infinitive.']] },
      { id: 'b1-konjunktiv2-4', kind: 'fill', prompt: 'Ich ___ jetzt gern im Urlaub.', hint: 'sein', answers: ['wäre'], tag: 'mood.konj2', explain: 'Wish: ich wäre gern …', feedback: { war: 'war is past tense; a wish: wäre.' } },
      { id: 'b1-konjunktiv2-5', kind: 'choice', prompt: 'Wenn er die Antwort ___, würde er es sagen.', options: ['wüsste', 'wusste', 'weiß', 'wissen würde'], tag: 'mood.konj2', explain: 'wissen → wüsste.', why: ['wusste is the past tense.', 'weiß is present indicative — the situation is unreal.', 'Possible in speech, but in the wenn clause wüsste is preferred.'] },
      { id: 'b1-konjunktiv2-6', kind: 'fill', prompt: 'Du ___ mehr Wasser trinken. (Ratschlag)', hint: 'sollen', answers: ['solltest'], tag: 'mood.konj2', explain: 'Advice: du solltest …', feedback: { sollst: 'sollst is an order; advice: solltest.' } },
      { id: 'b1-konjunktiv2-7', kind: 'correct', sentence: 'Wenn ich du wäre, ich würde das Angebot annehmen.', answers: ['Wenn ich du wäre, würde ich das Angebot annehmen.'], tag: 'order.v2', explain: 'After the wenn clause, the main clause starts with the verb: würde ich …' },
      { id: 'b1-konjunktiv2-8', kind: 'fill', prompt: 'Es ___ schön, wenn du mitkommen könntest.', hint: 'sein', answers: ['wäre'], tag: 'mood.konj2', explain: 'Es wäre schön, wenn …', feedback: { ist: 'Hypothetical: es wäre schön.', würde: 'With sein we use wäre, not würde sein.' } },
    ],
    drills: ['konj2'],
  },
  {
    id: 'b1-infinitiv-zu',
    explanation: `Many verbs, nouns and adjectives are followed by an **infinitive with zu**, at the end of the clause:
*Ich versuche, pünktlich **zu sein**.* · *Es ist wichtig, regelmäßig **zu üben**.* · *Ich habe keine Lust, **aufzuräumen**.*

- Separable verbs: zu goes **between** prefix and verb: auf**zu**stehen, an**zu**rufen.
- **No zu** after modal verbs, werden, lassen and verbs of perception (sehen, hören): *Ich kann schwimmen.*

**Purpose**:
- **um … zu** when both parts have the **same subject**: *Ich lerne Deutsch, **um** in Wien **zu studieren**.*
- **damit** + clause when the subjects are **different**: *Ich spreche langsam, **damit** du mich **verstehst**.*

Common triggers: versuchen, anfangen, aufhören, vergessen, hoffen, vorhaben, Lust haben, Zeit haben, es ist leicht/schwer/wichtig …`,
    examples: [
      { de: 'Vergiss nicht, die Tür abzuschließen!', en: 'Don’t forget to lock the door!' },
      { de: 'Er spart, um ein Auto zu kaufen.', en: 'He is saving to buy a car.' },
      { de: 'Ich erkläre es dir, damit du es verstehst.', en: 'I’ll explain it to you so that you understand.' },
    ],
    exercises: [
      { id: 'b1-infinitiv-zu-1', kind: 'fill', prompt: 'Hast du Lust, ins Kino ___?', hint: 'gehen', answers: ['zu gehen'], tag: 'infinitive', explain: 'Lust haben + zu + infinitive: zu gehen.', feedback: { gehen: 'After „Lust haben“ we need zu: zu gehen.', 'zu gehst': 'After zu the verb is in the infinitive: zu gehen.' } },
      { id: 'b1-infinitiv-zu-2', kind: 'fill', prompt: 'Vergiss nicht, mich morgen ___!', hint: 'anrufen', answers: ['anzurufen'], tag: 'infinitive', explain: 'Separable verb: zu goes between prefix and verb: anzurufen.', feedback: { 'zu anrufen': 'With separable verbs zu goes inside: anzurufen.' } },
      { id: 'b1-infinitiv-zu-3', kind: 'choice', prompt: 'Ich kann heute nicht ___.', options: ['kommen', 'zu kommen', 'kommt', 'gekommen'], tag: 'infinitive', explain: 'No zu after modal verbs: Ich kann nicht kommen.', why: ['Modal verbs are followed by the infinitive without zu.', 'After a modal verb we need the infinitive.', 'After a modal verb we need the infinitive.'] },
      { id: 'b1-infinitiv-zu-4', kind: 'transform', instruction: 'Connect with um … zu.', source: 'Ich gehe in die Bibliothek. Ich will dort lernen.', answers: ['Ich gehe in die Bibliothek, um dort zu lernen.', 'Ich gehe in die Bibliothek, um zu lernen.'], tag: 'infinitive', explain: 'Same subject → um … zu; the modal verb disappears.', feedback: [['um zu dort', 'zu + infinitive go to the end: um dort zu lernen.'], ['damit', 'Both parts have the same subject → um … zu.']] },
      { id: 'b1-infinitiv-zu-5', kind: 'choice', prompt: 'Ich gebe dir meine Nummer, ___ du mich anrufen kannst.', options: ['damit', 'um', 'dass', 'weil'], tag: 'connector', explain: 'Different subjects (ich … du) → damit + clause.', why: ['um … zu only works with the same subject.', 'dass does not express purpose here.', 'weil gives a reason, not a purpose.'] },
      { id: 'b1-infinitiv-zu-6', kind: 'correct', sentence: 'Es ist nicht leicht, eine Wohnung finden.', answers: ['Es ist nicht leicht, eine Wohnung zu finden.'], tag: 'infinitive', explain: 'After „es ist leicht/schwer“ we need zu: zu finden.' },
      { id: 'b1-infinitiv-zu-7', kind: 'fill', prompt: 'Er hat aufgehört, ___.', hint: 'rauchen', answers: ['zu rauchen'], tag: 'infinitive', explain: 'aufhören + zu + infinitive.' },
      { id: 'b1-infinitiv-zu-8', kind: 'order', words: ['Ich', 'habe', 'keine Zeit,', 'die Wohnung', 'aufzuräumen'], tag: 'infinitive', explain: 'The zu-infinitive goes to the end of its clause.' },
    ],
  },
  {
    id: 'b1-temporalsaetze',
    explanation: `Time clauses (verb at the end):

| conjunction | use | example |
|---|---|---|
| **als** | one event or period **in the past** | *Als ich ein Kind war, …* |
| **wenn** | repeated events (immer wenn) or present/future | *(Immer) wenn ich nach Hamburg fahre, regnet es.* |
| **während** | at the same time (while) | *Während ich koche, hörst du Musik.* |
| **bevor** | before | *Bevor du gehst, mach das Licht aus.* |
| **nachdem** | after (+ tense shift) | *Nachdem ich gegessen hatte, …* |
| **bis** | until | *Warte, bis ich komme.* |
| **seit(dem)** | since | *Seitdem er in Berlin wohnt, …* |
| **sobald** | as soon as | *Sobald ich ankomme, rufe ich an.* |

> **wann** is only a question word (also in indirect questions): *Weißt du, wann der Film beginnt?*`,
    examples: [
      { de: 'Als ich nach Berlin kam, sprach ich kein Deutsch.', en: 'When I came to Berlin, I didn’t speak any German.' },
      { de: 'Wenn ich Zeit habe, lese ich.', en: 'When(ever) I have time, I read.' },
      { de: 'Bevor du losfährst, tank bitte.', en: 'Before you leave, please fill up the tank.' },
    ],
    exercises: [
      { id: 'b1-temporalsaetze-1', kind: 'fill', prompt: '___ ich 18 war, habe ich den Führerschein gemacht.', answers: ['Als', 'als'], tag: 'clause.time', explain: 'One event in the past: als.', feedback: { wenn: 'A single past event takes als.', wann: 'wann is a question word.' } },
      { id: 'b1-temporalsaetze-2', kind: 'fill', prompt: 'Immer ___ ich ihn sehe, lacht er.', answers: ['wenn'], tag: 'clause.time', explain: 'Repeated events: (immer) wenn.', feedback: { als: 'als is for a single past event; repeated: wenn.' } },
      { id: 'b1-temporalsaetze-3', kind: 'choice', prompt: 'Ich lese Zeitung, ___ ich frühstücke.', options: ['während', 'bevor', 'nachdem', 'bis'], tag: 'clause.time', explain: 'Two actions at the same time: während.', why: ['bevor = before.', 'nachdem = after.', 'bis = until.'] },
      { id: 'b1-temporalsaetze-4', kind: 'choice', prompt: 'Ruf mich an, ___ du in Berlin angekommen bist.', options: ['sobald', 'als', 'während', 'seit'], tag: 'clause.time', explain: 'as soon as: sobald.', why: ['als is for past events.', 'während = while (simultaneous).', 'seit = since.'] },
      { id: 'b1-temporalsaetze-5', kind: 'fill', prompt: 'Warte hier, ___ ich zurückkomme.', answers: ['bis'], tag: 'clause.time', explain: 'until: bis.' },
      { id: 'b1-temporalsaetze-6', kind: 'correct', sentence: 'Wenn ich gestern nach Hause kam, war niemand da.', answers: ['Als ich gestern nach Hause kam, war niemand da.'], tag: 'clause.time', explain: 'A single event in the past: als.' },
      { id: 'b1-temporalsaetze-7', kind: 'transform', instruction: 'Connect with bevor.', source: 'Ich gehe ins Bett. Vorher putze ich mir die Zähne.', answers: ['Bevor ich ins Bett gehe, putze ich mir die Zähne.', 'Ich putze mir die Zähne, bevor ich ins Bett gehe.'], tag: 'clause.time', explain: 'bevor + verb at the end; if the clause comes first, the main clause starts with the verb.', feedback: [['bevor ich gehe ins bett', 'In the bevor clause the verb goes to the end: bevor ich ins Bett gehe.']] },
      { id: 'b1-temporalsaetze-8', kind: 'fill', prompt: '___ er in Wien wohnt, geht er oft in die Oper.', answers: ['Seit', 'Seitdem', 'seit', 'seitdem'], tag: 'clause.time', explain: 'since (and still): seit(dem).' },
    ],
  },
  {
    id: 'b1-konzessiv',
    explanation: `Contrast and consequence — watch the word order:

| meaning | verb at the end (subordinate) | verb next (adverb in position 1) |
|---|---|---|
| contrast / concession | **obwohl** | **trotzdem** |
| reason | **weil**, da | — (denn: no change) |
| consequence | — | **deshalb, deswegen, darum, also** |

*Obwohl es regnet, gehen wir spazieren.* = *Es regnet. Trotzdem gehen wir spazieren.*
*Weil er krank ist, bleibt er zu Hause.* = *Er ist krank. Deshalb bleibt er zu Hause.*

> **trotz** + genitive is the preposition: *Trotz des Regens gehen wir spazieren.*`,
    examples: [
      { de: 'Obwohl sie müde war, arbeitete sie weiter.', en: 'Although she was tired, she kept working.' },
      { de: 'Das Hotel war teuer. Trotzdem haben wir dort gewohnt.', en: 'The hotel was expensive. We stayed there anyway.' },
      { de: 'Der Zug hatte Verspätung, deshalb kam ich zu spät.', en: 'The train was late, so I was late.' },
    ],
    exercises: [
      { id: 'b1-konzessiv-1', kind: 'fill', prompt: '___ er krank ist, geht er zur Arbeit.', answers: ['Obwohl', 'obwohl'], tag: 'connector', explain: 'Contrast with verb at the end of the first clause: obwohl.', feedback: { trotzdem: 'trotzdem would need the verb next; here the verb is at the end → obwohl.', weil: 'weil gives a reason; this is a contrast.' } },
      { id: 'b1-konzessiv-2', kind: 'choice', prompt: 'Es war kalt. ___ sind wir schwimmen gegangen.', options: ['Trotzdem', 'Obwohl', 'Deshalb', 'Weil'], tag: 'connector', explain: 'Contrast, verb directly after → trotzdem.', why: ['obwohl needs a subordinate clause with the verb at the end.', 'deshalb expresses a logical consequence, not a contrast.', 'weil gives a reason and needs the verb at the end.'] },
      { id: 'b1-konzessiv-3', kind: 'transform', instruction: 'Rewrite with obwohl.', source: 'Ich habe wenig Zeit. Trotzdem helfe ich dir.', answers: ['Obwohl ich wenig Zeit habe, helfe ich dir.', 'Ich helfe dir, obwohl ich wenig Zeit habe.'], tag: 'connector', explain: 'obwohl + verb at the end: obwohl ich wenig Zeit habe.', feedback: [['obwohl ich habe', 'In the obwohl clause the verb goes to the end.'], ['trotzdem', 'Replace trotzdem with obwohl.']] },
      { id: 'b1-konzessiv-4', kind: 'choice', prompt: 'Ich habe Hunger, ___ esse ich jetzt.', options: ['deshalb', 'trotzdem', 'obwohl', 'denn'], tag: 'connector', explain: 'Consequence with verb next: deshalb.', why: ['trotzdem would mean “nevertheless”.', 'obwohl means “although” and needs the verb at the end.', 'denn gives a reason and doesn’t change word order.'] },
      { id: 'b1-konzessiv-5', kind: 'correct', sentence: 'Obwohl das Wetter ist schlecht, machen wir einen Ausflug.', answers: ['Obwohl das Wetter schlecht ist, machen wir einen Ausflug.'], tag: 'order.verb-final', explain: 'In the obwohl clause the verb goes to the end.' },
      { id: 'b1-konzessiv-6', kind: 'fill', prompt: '___ des Regens spielten die Kinder draußen.', answers: ['Trotz', 'trotz'], tag: 'preposition', explain: 'Preposition + genitive: trotz des Regens.', feedback: { trotzdem: 'Before a noun phrase use the preposition trotz.', obwohl: 'obwohl needs a clause; before a noun use trotz.' } },
      { id: 'b1-konzessiv-7', kind: 'order', words: ['Das Essen', 'war', 'kalt,', 'trotzdem', 'hat', 'es', 'gut', 'geschmeckt'], tag: 'connector', explain: 'trotzdem in position 1 → hat (verb) next.' },
      { id: 'b1-konzessiv-8', kind: 'choice', prompt: 'Sie bekam die Stelle, ___ sie keine Erfahrung hatte.', options: ['obwohl', 'trotzdem', 'deshalb', 'weil'], tag: 'connector', explain: 'Contrast + verb at the end: obwohl.', why: ['trotzdem would need the verb next.', 'deshalb = consequence.', 'weil makes no sense here (no experience is not a reason to get a job).'] },
    ],
  },
  {
    id: 'b1-indirekte-fragen',
    explanation: `An indirect question is a **subordinate clause**: the verb goes to the end.

- **W-questions** keep the question word: *Wo ist der Bahnhof?* → *Können Sie mir sagen, **wo** der Bahnhof **ist**?*
- **Yes/no questions** use **ob**: *Kommt er?* → *Ich weiß nicht, **ob** er **kommt**.*

Polite openers: *Wissen Sie, …? · Können Sie mir sagen, …? · Ich frage mich, … · Ich möchte wissen, …*

> Put a question mark only if the whole sentence is a question: *Weißt du, wann er kommt?* — but *Ich weiß nicht, wann er kommt.*`,
    examples: [
      { de: 'Wissen Sie, wie spät es ist?', en: 'Do you know what time it is?' },
      { de: 'Ich frage mich, ob das richtig ist.', en: 'I wonder whether that is right.' },
      { de: 'Sag mir, was du denkst.', en: 'Tell me what you think.' },
    ],
    exercises: [
      { id: 'b1-indirekte-fragen-1', kind: 'transform', instruction: 'Make it an indirect question: „Können Sie mir sagen, …?“', source: 'Wann fährt der nächste Bus?', answers: ['Können Sie mir sagen, wann der nächste Bus fährt?'], tag: 'question', explain: 'Question word stays; verb goes to the end: …, wann der nächste Bus fährt?', feedback: [['wann fährt', 'In an indirect question the verb goes to the end: wann der nächste Bus fährt.']] },
      { id: 'b1-indirekte-fragen-2', kind: 'fill', prompt: 'Ich weiß nicht, ___ er heute kommt.', answers: ['ob'], tag: 'question', explain: 'Yes/no question → ob.', feedback: { wenn: 'wenn is a condition; whether = ob.', dass: 'dass states a fact; whether = ob.' } },
      { id: 'b1-indirekte-fragen-3', kind: 'choice', prompt: 'Weißt du, ___?', options: ['wo Lisa wohnt', 'wo wohnt Lisa', 'ob wohnt Lisa', 'Lisa wo wohnt'], tag: 'question', explain: 'Question word + subject + verb at the end.', why: ['The verb goes to the end in an indirect question.', 'ob is for yes/no questions; and the verb goes to the end.', 'The question word comes first.'] },
      { id: 'b1-indirekte-fragen-4', kind: 'transform', instruction: 'Make it an indirect question: „Ich frage mich, …“', source: 'Hat sie meine Nachricht gelesen?', answers: ['Ich frage mich, ob sie meine Nachricht gelesen hat.'], tag: 'question', explain: 'Yes/no → ob; conjugated verb (hat) at the end.', feedback: [['ob hat', 'After ob the verb goes to the end.'], ['hat gelesen', 'The conjugated verb comes last: gelesen hat.']] },
      { id: 'b1-indirekte-fragen-5', kind: 'correct', sentence: 'Kannst du mir sagen, wie viel kostet das?', answers: ['Kannst du mir sagen, wie viel das kostet?'], tag: 'question', explain: 'Indirect question: verb at the end.' },
      { id: 'b1-indirekte-fragen-6', kind: 'fill', prompt: 'Sie hat mich gefragt, ___ ich aus Spanien komme.', answers: ['ob'], tag: 'question', explain: 'Reported yes/no question: ob.' },
      { id: 'b1-indirekte-fragen-7', kind: 'order', words: ['Ich', 'möchte', 'wissen,', 'warum', 'du', 'so', 'traurig', 'bist'], tag: 'question', explain: 'warum + subject + … + verb at the end.' },
      { id: 'b1-indirekte-fragen-8', kind: 'choice', prompt: 'Ich habe vergessen, ___ der Kurs beginnt.', options: ['wann', 'wenn', 'als', 'ob'], tag: 'question', explain: 'A time question: wann.', why: ['wenn is not a question word.', 'als is not a question word.', 'ob asks yes/no; here we need a time.'] },
    ],
  },
  {
    id: 'b1-adjektivdeklination',
    explanation: `Three sets of adjective endings — the more the article shows, the less the adjective needs to:

**1. After der/die/das, dieser, jeder, welcher (weak):** -e in the five “small” forms, otherwise -en.

**2. After ein, kein, mein … (mixed):** like 1, but where *ein* has no ending the adjective shows gender: ein neu**er** Tisch, ein neu**es** Buch.

**3. Without article (strong):** the adjective takes the ending the article would have had:

| | masculine | feminine | neuter | plural |
|---|---|---|---|---|
| nominative | heiß**er** Tee | kalt**e** Milch | frisch**es** Brot | alt**e** Freunde |
| accusative | heiß**en** Tee | kalt**e** Milch | frisch**es** Brot | alt**e** Freunde |
| dative | heiß**em** Tee | kalt**er** Milch | frisch**em** Brot | alt**en** Freunden |
| genitive | heiß**en** Tees | kalt**er** Milch | frisch**en** Brotes | alt**er** Freunde |

> Key idea: **one signal per noun phrase**. If the article already shows -r, -s, -m, the adjective takes -e/-en.`,
    examples: [
      { de: 'Ich trinke gern schwarzen Tee.', en: 'I like drinking black tea.' },
      { de: 'Mit frischem Brot schmeckt alles besser.', en: 'Everything tastes better with fresh bread.' },
      { de: 'Das ist der Mann mit dem roten Hut.', en: 'That’s the man with the red hat.' },
    ],
    exercises: [
      { id: 'b1-adjektivdeklination-1', kind: 'fill', prompt: 'Ich wünsche dir ___ Glück!', hint: 'viel', answers: ['viel'], tag: 'adj.ending', explain: 'viel and wenig usually stay without ending in the singular: viel Glück.' },
      { id: 'b1-adjektivdeklination-2', kind: 'fill', prompt: 'Bei ___ Wetter bleiben wir zu Hause.', hint: 'schlecht', answers: ['schlechtem'], tag: 'adj.ending', explain: 'No article, dative neuter → strong ending -em.', feedback: { schlechten: 'Without article, the adjective shows the dative itself: -em.', schlechtes: 'bei takes the dative: schlechtem.' } },
      { id: 'b1-adjektivdeklination-3', kind: 'choice', prompt: 'Sie trägt ___ Schuhe.', options: ['neue', 'neuen', 'neuer', 'neues'], tag: 'adj.ending', explain: 'Plural accusative without article: -e.', why: ['-en would follow die (die neuen Schuhe).', '-er is masculine nominative/genitive plural.', '-es is neuter.'] },
      { id: 'b1-adjektivdeklination-4', kind: 'fill', prompt: 'Das ist ein ___ Problem.', hint: 'groß', answers: ['großes'], tag: 'adj.ending', explain: 'Neuter after ein: -es.' },
      { id: 'b1-adjektivdeklination-5', kind: 'fill', prompt: 'Ich habe mit einer ___ Freundin telefoniert.', hint: 'alt', answers: ['alten'], tag: 'adj.ending', explain: 'Dative after einer: -en.' },
      { id: 'b1-adjektivdeklination-6', kind: 'choice', prompt: 'Wir suchen eine Wohnung mit ___ Garten.', options: ['großem', 'großen', 'großer', 'großes'], tag: 'adj.ending', explain: 'mit + dative, masculine, no article → -em.', why: ['Without article the adjective must show the dative: -em.', '-er would be feminine dative.', 'mit takes the dative.'] },
      { id: 'b1-adjektivdeklination-7', kind: 'correct', sentence: 'Ich trinke morgens gern heiße Kaffee.', answers: ['Ich trinke morgens gern heißen Kaffee.'], tag: 'adj.ending', explain: 'Kaffee is masculine accusative without article → -en.' },
      { id: 'b1-adjektivdeklination-8', kind: 'fill', prompt: 'Dieses ___ Buch habe ich schon gelesen.', hint: 'dick', answers: ['dicke'], tag: 'adj.ending', explain: 'After dieses (like das): -e.' },
    ],
    drills: ['adj-all'],
  },
  {
    id: 'b1-genitiv',
    explanation: `The genitive expresses possession and relationships (*Wessen?* — whose?). It is more common in writing.

| | masculine | feminine | neuter | plural |
|---|---|---|---|---|
| definite | **des** Mann**es** | **der** Frau | **des** Kind**es** | **der** Kinder |
| indefinite | **eines** Mann**es** | **einer** Frau | **eines** Kind**es** | — |

- Masculine and neuter nouns add **-s** or **-es** (one-syllable nouns usually -es): des Vaters, des Buches.
- Names: *Annas Auto* (no apostrophe!).
- In speech, **von** + dative often replaces it: *das Auto von meinem Vater*.

Prepositions with the genitive: **wegen** (because of), **trotz** (despite), **während** (during), **statt** (instead of), **innerhalb** / **außerhalb** (inside/outside).`,
    examples: [
      { de: 'Das ist das Auto meines Vaters.', en: 'That is my father’s car.' },
      { de: 'Wegen des Regens bleiben wir hier.', en: 'Because of the rain we’re staying here.' },
      { de: 'Während der Ferien arbeite ich.', en: 'I work during the holidays.' },
    ],
    exercises: [
      { id: 'b1-genitiv-1', kind: 'fill', prompt: 'Das ist das Fahrrad ___ Bruders.', hint: 'mein', answers: ['meines'], tag: 'case.gen', explain: 'Masculine genitive: meines Bruders.', feedback: { meinem: 'meinem is dative; genitive: meines.', meinen: 'meinen is accusative; genitive: meines.' } },
      { id: 'b1-genitiv-2', kind: 'choice', prompt: 'Die Farbe ___ gefällt mir.', options: ['des Autos', 'des Auto', 'dem Auto', 'das Autos'], tag: 'case.gen', explain: 'Neuter genitive: des + noun + -s.', why: ['The noun needs the genitive -s: des Autos.', 'dem is dative.', 'das is nominative/accusative.'] },
      { id: 'b1-genitiv-3', kind: 'fill', prompt: '___ der Ferien habe ich viel gelesen.', answers: ['Während', 'während'], tag: 'case.gen', explain: 'during: während + genitive.' },
      { id: 'b1-genitiv-4', kind: 'fill', prompt: 'Wir bleiben wegen ___ Sturms zu Hause.', answers: ['des'], tag: 'case.gen', explain: 'wegen + genitive; der Sturm → des Sturms.', feedback: { dem: 'In standard German wegen takes the genitive: des Sturms.', den: 'wegen takes the genitive: des.' } },
      { id: 'b1-genitiv-5', kind: 'choice', prompt: 'Das ist ___ Handy.', options: ['Annas', 'Anna’s', 'Annas’', 'der Anna'], tag: 'case.gen', explain: 'Names take -s without apostrophe: Annas Handy.', why: ['German normally writes no apostrophe: Annas.', 'An apostrophe only after names ending in s/ß/x/z (Max’ Auto).', 'An article before names is colloquial and needs a different structure.'] },
      { id: 'b1-genitiv-6', kind: 'transform', instruction: 'Use the genitive instead of von.', source: 'das Haus von meinen Eltern', answers: ['das Haus meiner Eltern'], tag: 'case.gen', explain: 'Plural genitive: meiner Eltern.', feedback: [['meinen eltern', 'Genitive plural: meiner Eltern.'], ['meines', 'Eltern is plural: meiner.']] },
      { id: 'b1-genitiv-7', kind: 'correct', sentence: 'Das ist der Schlüssel des Wagen.', answers: ['Das ist der Schlüssel des Wagens.'], tag: 'case.gen', explain: 'Masculine genitive nouns add -s: des Wagens.' },
      { id: 'b1-genitiv-8', kind: 'fill', prompt: 'Das Ende ___ Films war überraschend.', answers: ['des'], tag: 'case.gen', explain: 'der Film → des Films.' },
    ],
    drills: ['case-gen'],
  },
  {
    id: 'b1-verben-praepositionen',
    explanation: `Many verbs (and adjectives) are tied to a fixed preposition with a fixed case. Learn them as units:

| verb | preposition | example |
|---|---|---|
| warten | **auf** + A | Ich warte auf den Bus. |
| sich freuen | **auf** + A (future) / **über** + A (now/past) | Ich freue mich auf den Urlaub. |
| denken | **an** + A | Ich denke an dich. |
| sich interessieren | **für** + A | Er interessiert sich für Kunst. |
| sich erinnern | **an** + A | Erinnerst du dich an ihn? |
| sprechen | **über** + A / **mit** + D | Wir sprechen über das Problem. |
| Angst haben | **vor** + D | Sie hat Angst vor Hunden. |
| teilnehmen | **an** + D | Ich nehme an dem Kurs teil. |
| sich kümmern | **um** + A | Wer kümmert sich um die Kinder? |

**Questions and references**
- For **things**: **wo(r)- / da(r)-** + preposition — *Worauf wartest du? – **Darauf**, dass …* (r before vowels: worüber, darauf)
- For **people**: preposition + pronoun — *Auf wen wartest du? – Auf **ihn**.*`,
    examples: [
      { de: 'Wir warten schon lange auf eine Antwort.', en: 'We’ve been waiting for an answer for a long time.' },
      { de: 'Worüber sprecht ihr? – Über den Film.', en: 'What are you talking about? – About the film.' },
      { de: 'Ich freue mich darauf, dich zu sehen.', en: 'I’m looking forward to seeing you.' },
    ],
    exercises: [
      { id: 'b1-verben-praepositionen-1', kind: 'fill', prompt: 'Ich interessiere mich sehr ___ Geschichte.', answers: ['für'], tag: 'verb.prep', explain: 'sich interessieren für + accusative.', feedback: { an: 'interessieren goes with für.', über: 'interessieren goes with für.' } },
      { id: 'b1-verben-praepositionen-2', kind: 'choice', prompt: 'Sie hat Angst ___ der Prüfung.', options: ['vor', 'für', 'über', 'von'], tag: 'verb.prep', explain: 'Angst haben vor + dative.', why: ['Angst haben goes with vor.', 'Angst haben goes with vor.', 'Angst haben goes with vor.'] },
      { id: 'b1-verben-praepositionen-3', kind: 'fill', prompt: '___ wartest du? – Auf den Bus.', answers: ['Worauf', 'worauf'], tag: 'verb.prep', explain: 'Question about a thing: wo(r) + auf = worauf.', feedback: { 'auf was': 'Colloquial; standard German: worauf.', 'auf wen': 'auf wen asks about a person; a bus is a thing: worauf.' } },
      { id: 'b1-verben-praepositionen-4', kind: 'choice', prompt: 'Denkst du an deinen Termin? – Ja, ich denke ___.', options: ['daran', 'an ihn', 'davon', 'darauf'], tag: 'verb.prep', explain: 'Reference to a thing: da(r) + an = daran.', why: ['an ihn would refer to a person.', 'denken goes with an: daran.', 'denken goes with an: daran.'] },
      { id: 'b1-verben-praepositionen-5', kind: 'fill', prompt: 'Ich freue mich schon ___ die Ferien.', answers: ['auf'], tag: 'verb.prep', explain: 'Looking forward (future): sich freuen auf.', feedback: { über: 'über is for something that already happened; future → auf.' } },
      { id: 'b1-verben-praepositionen-6', kind: 'correct', sentence: 'Ich warte für dich vor dem Kino.', answers: ['Ich warte auf dich vor dem Kino.', 'Ich warte vor dem Kino auf dich.'], tag: 'verb.prep', explain: 'warten auf + accusative (not für).' },
      { id: 'b1-verben-praepositionen-7', kind: 'fill', prompt: 'Erinnerst du dich noch ___ unseren ersten Urlaub?', answers: ['an'], tag: 'verb.prep', explain: 'sich erinnern an + accusative.' },
      { id: 'b1-verben-praepositionen-8', kind: 'choice', prompt: 'Mit wem hast du gesprochen? – ___.', options: ['Mit meiner Chefin', 'Damit', 'Womit', 'Mit ihr darüber'], tag: 'verb.prep', explain: 'A person: preposition + noun/pronoun.', why: ['damit refers to a thing.', 'womit is a question word.', 'The answer only needs the person.'] },
    ],
  },
  {
    id: 'b1-futur',
    explanation: `**Futur I**: **werden** + infinitive (at the end).

| ich werde | du wirst | er/sie/es wird | wir werden | ihr werdet | sie/Sie werden |
|---|---|---|---|---|---|

Uses:
- **Predictions and intentions**: *Morgen **wird** es **regnen**.* · *Ich **werde** dich **anrufen**.*
- **Assumptions about the present** (often with wohl): *Er **wird** (wohl) krank **sein**.*

For plans with a time expression, German usually prefers the **present tense**: *Morgen fahre ich nach Wien.*

**werden** at a glance:
| werden + | meaning | example |
|---|---|---|
| noun / adjective | to become | Er wird Lehrer. Es wird kalt. |
| infinitive | future / assumption | Er wird kommen. |
| participle | passive | Er wird gefragt. |`,
    examples: [
      { de: 'Ich werde dir morgen helfen.', en: 'I will help you tomorrow.' },
      { de: 'Es wird bald dunkel.', en: 'It’s getting dark soon.' },
      { de: 'Sie wird wohl im Büro sein.', en: 'She’s probably at the office.' },
    ],
    exercises: [
      { id: 'b1-futur-1', kind: 'fill', prompt: 'Morgen ___ es wahrscheinlich schneien.', answers: ['wird'], tag: 'verb.tense', explain: 'Futur I: wird + infinitive.', feedback: { würde: 'würde is Konjunktiv II; a prediction: wird.', werden: 'es → wird.' } },
      { id: 'b1-futur-2', kind: 'fill', prompt: '___ du mir helfen? – Ja, natürlich.', answers: ['Wirst', 'wirst'], tag: 'verb.tense', explain: 'du → wirst.', feedback: { wirdst: 'du wirst (irregular).', wird: 'du → wirst.' } },
      { id: 'b1-futur-3', kind: 'transform', instruction: 'Rewrite in the Futur I.', source: 'Wir besuchen dich nächste Woche.', answers: ['Wir werden dich nächste Woche besuchen.'], tag: 'verb.tense', explain: 'werden in position 2, infinitive at the end.', feedback: [['werden besuchen', 'The infinitive goes to the end: Wir werden dich nächste Woche besuchen.']] },
      { id: 'b1-futur-4', kind: 'choice', prompt: 'Er antwortet nicht. Er ___ wohl schlafen.', options: ['wird', 'würde', 'wurde', 'werde'], tag: 'modal.subjective', explain: 'Assumption about now: wird (wohl) + infinitive.', why: ['würde is hypothetical.', 'wurde is past.', 'werde is ich (or Konjunktiv I).'] },
      { id: 'b1-futur-5', kind: 'choice', prompt: 'Was bedeutet „Sie wird Ärztin“?', options: ['She is going to become a doctor.', 'She will be examined by a doctor.', 'She would be a doctor.', 'She was a doctor.'], tag: 'verb.tense', explain: 'werden + noun = to become.', why: ['That would be passive (wird untersucht).', 'That would be wäre.', 'That would be war.'] },
      { id: 'b1-futur-6', kind: 'correct', sentence: 'Ich werde dich morgen anrufe.', answers: ['Ich werde dich morgen anrufen.'], tag: 'verb.tense', explain: 'After werden: infinitive (anrufen).' },
      { id: 'b1-futur-7', kind: 'fill', prompt: 'Keine Sorge, alles ___ gut.', answers: ['wird'], tag: 'verb.tense', explain: 'werden as main verb (to become/turn out): alles wird gut.' },
      { id: 'b1-futur-8', kind: 'order', words: ['Ihr', 'werdet', 'die Prüfung', 'bestimmt', 'bestehen'], tag: 'verb.tense', explain: 'werden in position 2, infinitive at the end.' },
    ],
  },
  {
    id: 'b1-zweiteilige-konnektoren',
    explanation: `| connector | meaning | example |
|---|---|---|
| **sowohl … als auch** | both … and | Sie spricht sowohl Englisch als auch Spanisch. |
| **weder … noch** | neither … nor | Ich habe weder Zeit noch Geld. |
| **entweder … oder** | either … or | Entweder kommst du mit, oder du bleibst hier. |
| **nicht nur … sondern auch** | not only … but also | Er ist nicht nur klug, sondern auch witzig. |
| **zwar … aber** | admittedly … but | Das Hotel ist zwar teuer, aber sehr schön. |
| **je … desto** | the … the (B2) | Je mehr ich lerne, desto mehr weiß ich. |

> **weder … noch** already contains the negation — no extra *nicht/kein*: *Ich trinke weder Kaffee noch Tee.*`,
    examples: [
      { de: 'Wir können entweder heute oder morgen fahren.', en: 'We can go either today or tomorrow.' },
      { de: 'Er spielt sowohl Gitarre als auch Klavier.', en: 'He plays both guitar and piano.' },
      { de: 'Das Essen war zwar billig, aber gut.', en: 'The food was cheap, but good.' },
    ],
    exercises: [
      { id: 'b1-zweiteilige-konnektoren-1', kind: 'fill', prompt: 'Ich mag ___ Fleisch noch Fisch.', answers: ['weder'], tag: 'connector', explain: 'neither … nor: weder … noch.' },
      { id: 'b1-zweiteilige-konnektoren-2', kind: 'choice', prompt: 'Sie spricht ___ Deutsch ___ Französisch.', options: ['sowohl … als auch', 'weder … oder', 'entweder … noch', 'nicht nur … aber'], tag: 'connector', explain: 'both … and: sowohl … als auch.', why: ['weder pairs with noch.', 'entweder pairs with oder.', 'nicht nur pairs with sondern auch.'] },
      { id: 'b1-zweiteilige-konnektoren-3', kind: 'correct', sentence: 'Ich habe weder keine Zeit noch Lust.', answers: ['Ich habe weder Zeit noch Lust.'], tag: 'connector', explain: 'weder … noch already negates: no kein.' },
      { id: 'b1-zweiteilige-konnektoren-4', kind: 'fill', prompt: 'Er ist nicht nur Arzt, ___ auch Musiker.', answers: ['sondern'], tag: 'connector', explain: 'nicht nur … sondern auch.', feedback: { aber: 'nicht nur … sondern auch.' } },
      { id: 'b1-zweiteilige-konnektoren-5', kind: 'choice', prompt: '___ du hilfst mir, oder ich mache es allein.', options: ['Entweder', 'Weder', 'Sowohl', 'Zwar'], tag: 'connector', explain: 'either … or: entweder … oder.', why: ['weder pairs with noch.', 'sowohl pairs with als auch.', 'zwar pairs with aber.'] },
      { id: 'b1-zweiteilige-konnektoren-6', kind: 'transform', instruction: 'Combine with zwar … aber.', source: 'Die Wohnung ist klein. Sie ist sehr gemütlich.', answers: ['Die Wohnung ist zwar klein, aber sehr gemütlich.', 'Die Wohnung ist zwar klein, aber sie ist sehr gemütlich.'], tag: 'connector', explain: 'zwar stands after the verb in the first part; aber introduces the second.' },
      { id: 'b1-zweiteilige-konnektoren-7', kind: 'choice', prompt: 'Wir können ___ ins Kino ___ ins Theater gehen – du entscheidest.', options: ['entweder … oder', 'sowohl … als auch', 'weder … noch', 'zwar … aber'], tag: 'connector', explain: 'A choice between two options: entweder … oder.', why: ['sowohl … als auch means both — but you choose one.', 'weder … noch means neither.', 'zwar … aber expresses a concession.'] },
      { id: 'b1-zweiteilige-konnektoren-8', kind: 'order', words: ['Das Hotel', 'war', 'zwar', 'teuer,', 'aber', 'sehr', 'schön'], tag: 'connector', explain: 'zwar after the verb, aber at the start of the contrast.' },
    ],
  },
  {
    id: 'b1-lassen',
    explanation: `**lassen** has several meanings — always with an **infinitive without zu**:

| meaning | example |
|---|---|
| have something done (by someone else) | *Ich **lasse** mein Auto **reparieren**.* |
| allow / let | *Meine Eltern **lassen** mich nicht ausgehen.* |
| leave (something somewhere) | *Ich habe meine Tasche im Zug **gelassen**.* |
| let's (suggestion) | ***Lass** uns gehen! / **Lasst** uns anfangen!* |
| stop (doing) | ***Lass** das!* |

Forms: ich lasse, du **lässt**, er **lässt**, wir lassen, ihr lasst — Präteritum *ließ*.
In the Perfekt with an infinitive, the participle is **lassen** (double infinitive): *Ich habe mein Auto reparieren **lassen**.*`,
    examples: [
      { de: 'Ich lasse mir die Haare schneiden.', en: 'I’m having my hair cut.' },
      { de: 'Lass mich in Ruhe!', en: 'Leave me alone!' },
      { de: 'Wir haben das Dach reparieren lassen.', en: 'We had the roof repaired.' },
    ],
    exercises: [
      { id: 'b1-lassen-1', kind: 'fill', prompt: 'Er ___ sein Fahrrad reparieren.', answers: ['lässt'], tag: 'lassen', explain: 'er → lässt (with umlaut).', feedback: { lasst: 'er → lässt (umlaut); lasst is the ihr form.', lasse: 'lasse is the ich form; er → lässt.' } },
      { id: 'b1-lassen-2', kind: 'choice', prompt: '___ uns ins Kino gehen!', options: ['Lass', 'Lässt', 'Lassen', 'Ließ'], tag: 'lassen', explain: 'Suggestion to one friend: Lass uns …!', why: ['lässt is the er/du present form.', 'Lassen Sie uns … is the polite version.', 'ließ is the past tense.'] },
      { id: 'b1-lassen-3', kind: 'transform', instruction: 'Say that someone else does it for you (lassen).', source: 'Ich schneide mir die Haare nicht selbst.', answers: ['Ich lasse mir die Haare schneiden.'], tag: 'lassen', explain: 'lassen + infinitive (at the end).', feedback: [['zu schneiden', 'No zu after lassen.']] },
      { id: 'b1-lassen-4', kind: 'correct', sentence: 'Wir haben das Auto reparieren gelassen.', answers: ['Wir haben das Auto reparieren lassen.'], tag: 'lassen', explain: 'With an infinitive the Perfekt uses the double infinitive: reparieren lassen.' },
      { id: 'b1-lassen-5', kind: 'fill', prompt: 'Meine Eltern ___ mich nie lange fernsehen.', answers: ['ließen', 'lassen'], tag: 'lassen', explain: 'lassen = allow (past: ließen).' },
      { id: 'b1-lassen-6', kind: 'choice', prompt: 'Ich habe meinen Schirm im Bus ___.', options: ['gelassen', 'lassen', 'gelasst'], tag: 'lassen', explain: 'leave something somewhere: gelassen (participle). Also common: Ich habe ihn liegen lassen.', why: ['Without another infinitive in the sentence the participle is gelassen.', 'There is no form gelasst.'] },
      { id: 'b1-lassen-7', kind: 'fill', prompt: '___ Sie mich bitte ausreden!', answers: ['Lassen'], tag: 'lassen', explain: 'Polite imperative: Lassen Sie mich …!' },
      { id: 'b1-lassen-8', kind: 'order', words: ['Wir', 'lassen', 'die Wohnung', 'renovieren'], tag: 'lassen', explain: 'lassen in position 2, infinitive at the end.' },
    ],
  },
];
