import type { GrammarLesson } from '@/lib/exercise/types';

export const B2_LESSONS: GrammarLesson[] = [
  {
    id: 'b2-passiv-erweitert',
    explanation: `**Passive in all tenses** (process passive with *werden*):

| tense | form |
|---|---|
| Präsens | Die Brücke **wird** renoviert. |
| Präteritum | Die Brücke **wurde** renoviert. |
| Perfekt | Die Brücke **ist** renoviert **worden**. |
| Plusquamperfekt | Die Brücke **war** renoviert **worden**. |
| with modal verb | Die Brücke **muss** renoviert **werden**. |
| modal + past | Die Brücke **hätte** renoviert **werden müssen**. |

In the passive Perfekt the participle of werden is **worden** (not *geworden*).

**State passive (Zustandspassiv)**: **sein** + participle describes the **result** of an action:
*Das Geschäft **wird** um 20 Uhr **geschlossen**.* (process: someone closes it)
*Das Geschäft **ist** jetzt **geschlossen**.* (state: it is closed)

**Impersonal passive** (no subject, often with *es* in position 1): *Hier **wird** nicht **geraucht**.* · *Es **wird** viel **gelacht**.*`,
    examples: [
      { de: 'Der Vertrag ist gestern unterschrieben worden.', en: 'The contract was signed yesterday.' },
      { de: 'Das Formular muss bis Freitag ausgefüllt werden.', en: 'The form must be filled in by Friday.' },
      { de: 'Die Tür ist abgeschlossen.', en: 'The door is locked.' },
    ],
    exercises: [
      { id: 'b2-passiv-erweitert-1', kind: 'fill', prompt: 'Das Haus ist 1920 gebaut ___.', answers: ['worden'], tag: 'voice.passive', explain: 'Passive Perfekt: ist … gebaut worden.', feedback: { geworden: 'In the passive the participle of werden is worden.', wurden: 'Perfekt passive: ist … worden.' } },
      { id: 'b2-passiv-erweitert-2', kind: 'transform', instruction: 'Rewrite in the passive with the modal verb.', source: 'Man muss die Rechnung bis Montag bezahlen.', answers: ['Die Rechnung muss bis Montag bezahlt werden.'], tag: 'voice.passive', explain: 'modal + participle + werden: muss … bezahlt werden.', feedback: [['bezahlt worden', 'With a modal verb in the present: bezahlt werden (infinitive).'], ['werden bezahlt', 'Order at the end: bezahlt werden.']] },
      { id: 'b2-passiv-erweitert-3', kind: 'choice', prompt: 'Keine Sorge, die Fenster ___ schon geputzt.', options: ['sind', 'werden', 'wurden', 'worden'], tag: 'voice.passive', explain: '„schon“ → result/state: sind geputzt (Zustandspassiv).', why: ['werden geputzt = the cleaning is happening now/regularly.', 'wurden geputzt = the action in the past, not the present state.', 'worden needs sein: sind … geputzt worden.'] },
      { id: 'b2-passiv-erweitert-4', kind: 'transform', instruction: 'Rewrite in the passive Perfekt.', source: 'Die Polizei hat den Dieb verhaftet.', answers: ['Der Dieb ist von der Polizei verhaftet worden.', 'Der Dieb ist verhaftet worden.'], tag: 'voice.passive', explain: 'Perfekt passive: ist … verhaftet worden; the object becomes the subject: der Dieb.', feedback: [['hat .* worden', 'The passive Perfekt is formed with sein: ist … worden.'], ['geworden', 'worden, not geworden.'], ['den dieb', 'The object becomes the subject (nominative): der Dieb.']] },
      { id: 'b2-passiv-erweitert-5', kind: 'fill', prompt: 'Am Sonntag ___ in Deutschland nicht gearbeitet.', answers: ['wird'], tag: 'voice.passive', explain: 'Impersonal passive: no subject, verb in the 3rd person singular: wird gearbeitet.', feedback: { werden: 'Impersonal passive takes the singular: wird.' } },
      { id: 'b2-passiv-erweitert-6', kind: 'correct', sentence: 'Das Problem ist schon gelöst geworden.', answers: ['Das Problem ist schon gelöst worden.', 'Das Problem ist schon gelöst.'], tag: 'voice.passive', explain: 'Passive Perfekt uses worden — or simply the state: ist gelöst.' },
      { id: 'b2-passiv-erweitert-7', kind: 'choice', prompt: 'Das Paket ___ morgen geliefert werden.', options: ['soll', 'wird geliefert', 'ist', 'worden'], tag: 'voice.passive', explain: 'modal verb + participle + werden: soll geliefert werden.', why: ['That would double the participle.', 'ist … werden is not a valid combination.', 'worden is only used in the Perfekt.'] },
      { id: 'b2-passiv-erweitert-8', kind: 'transform', instruction: 'Change to the state passive (sein).', source: 'Man hat das Restaurant geschlossen.', answers: ['Das Restaurant ist geschlossen.'], tag: 'voice.passive', explain: 'The result: Das Restaurant ist geschlossen.' },
    ],
  },
  {
    id: 'b2-passiversatz',
    explanation: `Instead of the passive, German often uses these **alternatives**:

| alternative | meaning | example | passive equivalent |
|---|---|---|---|
| **man** | people / one | *Man repariert das Auto.* | Das Auto wird repariert. |
| **sich lassen** + infinitive | can be done | *Das Problem **lässt sich** lösen.* | … kann gelöst werden. |
| **sein + zu** + infinitive | can / must be done | *Das Formular **ist** bis Montag **auszufüllen**.* | … muss ausgefüllt werden. |
| adjective in **-bar / -lich** | can be done | *Das Problem ist **lösbar**.* | … kann gelöst werden. |
| **bekommen/kriegen** + participle | receive | *Er **bekommt** das Paket **geschickt**.* | Ihm wird das Paket geschickt. |

> **sein + zu** is ambiguous (can or must) — the context decides: *Der Fehler ist leicht zu finden* (can) vs. *Die Gebühr ist sofort zu bezahlen* (must).`,
    examples: [
      { de: 'Die Tür lässt sich nicht öffnen.', en: 'The door can’t be opened.' },
      { de: 'Der Antrag ist bis Ende Mai einzureichen.', en: 'The application must be submitted by the end of May.' },
      { de: 'Diese Handschrift ist kaum lesbar.', en: 'This handwriting is barely legible.' },
    ],
    exercises: [
      { id: 'b2-passiversatz-1', kind: 'transform', instruction: 'Rewrite with sich lassen.', source: 'Das Fenster kann nicht geöffnet werden.', answers: ['Das Fenster lässt sich nicht öffnen.'], tag: 'voice.passive-alt', explain: 'kann … werden → lässt sich + infinitive.', feedback: [['geöffnet', 'sich lassen takes the infinitive: öffnen.'], ['zu öffnen', 'No zu after lassen.']] },
      { id: 'b2-passiversatz-2', kind: 'transform', instruction: 'Rewrite with sein + zu.', source: 'Die Hausaufgaben müssen bis morgen gemacht werden.', answers: ['Die Hausaufgaben sind bis morgen zu machen.'], tag: 'voice.passive-alt', explain: 'muss … werden → sein + zu + infinitive.', feedback: [['ist bis', 'Plural subject: sind.'], ['zu gemacht', 'zu + infinitive: zu machen.']] },
      { id: 'b2-passiversatz-3', kind: 'fill', prompt: 'Dieses Wasser ist nicht ___. (Man kann es nicht trinken.)', answers: ['trinkbar'], tag: 'voice.passive-alt', explain: '-bar = can be done: trinkbar.', feedback: { trinklich: 'The suffix here is -bar: trinkbar.' } },
      { id: 'b2-passiversatz-4', kind: 'choice', prompt: 'Die Gebühr ist sofort zu bezahlen. Das bedeutet:', options: ['Die Gebühr muss sofort bezahlt werden.', 'Die Gebühr kann sofort bezahlt werden.', 'Die Gebühr wurde schon bezahlt.', 'Man darf die Gebühr nicht bezahlen.'], tag: 'voice.passive-alt', explain: 'For rules and instructions, sein + zu means must.', why: ['In official instructions, sein + zu expresses an obligation.', 'zu bezahlen refers to the future, not a finished payment.', 'sein + zu never expresses a prohibition by itself.'] },
      { id: 'b2-passiversatz-5', kind: 'fill', prompt: 'Das ___ sich leicht erklären.', answers: ['lässt'], tag: 'voice.passive-alt', explain: 'sich lassen + infinitive: Das lässt sich leicht erklären.' },
      { id: 'b2-passiversatz-6', kind: 'correct', sentence: 'Das Problem lässt sich nicht gelöst.', answers: ['Das Problem lässt sich nicht lösen.'], tag: 'voice.passive-alt', explain: 'sich lassen + infinitive (not participle).' },
      { id: 'b2-passiversatz-7', kind: 'transform', instruction: 'Rewrite with man.', source: 'In dieser Firma wird viel Englisch gesprochen.', answers: ['In dieser Firma spricht man viel Englisch.', 'Man spricht in dieser Firma viel Englisch.'], tag: 'voice.passive-alt', explain: 'man + active verb (3rd person singular).' },
      { id: 'b2-passiversatz-8', kind: 'choice', prompt: 'Seine Erklärung war gut ___.', options: ['nachvollziehbar', 'nachvollziehlich', 'nachvollzogen', 'nachvollziehend'], tag: 'voice.passive-alt', explain: '-bar: something that can be followed/understood.', why: ['The suffix for this verb is -bar.', 'nachvollzogen describes a completed action, not possibility.', 'Partizip I means the subject is doing it.'] },
    ],
  },
  {
    id: 'b2-konjunktiv2-vergangenheit',
    explanation: `The Konjunktiv II of the past describes **unreal situations in the past** — regrets, reproaches, missed chances: **hätte / wäre + past participle**.

*Wenn ich das **gewusst hätte**, **wäre** ich früher **gekommen**.*
*Ich **hätte** dich **angerufen**, aber ich hatte keinen Empfang.*

haben/sein as in the Perfekt (gehen → wäre gegangen).

**With modal verbs**: hätte + infinitive + modal infinitive (**double infinitive**):
*Du **hättest** mich **anrufen sollen**!* (You should have called me!)
*Wir **hätten** früher **losfahren müssen**.*

> In a subordinate clause *hätte* goes **before** the two infinitives: *…, dass du mich **hättest anrufen sollen**.* (C2 topic)`,
    examples: [
      { de: 'Ich wäre gern mitgekommen.', en: 'I would have liked to come along.' },
      { de: 'Wenn du gefragt hättest, hätte ich dir geholfen.', en: 'If you had asked, I would have helped you.' },
      { de: 'Das hättest du nicht sagen sollen.', en: 'You shouldn’t have said that.' },
    ],
    exercises: [
      { id: 'b2-konjunktiv2-vergangenheit-1', kind: 'fill', prompt: 'Wenn ich früher aufgestanden ___, hätte ich den Bus erreicht.', answers: ['wäre'], tag: 'mood.konj2', explain: 'aufstehen takes sein → wäre aufgestanden.', feedback: { hätte: 'aufstehen forms the perfect with sein: wäre aufgestanden.', war: 'Unreal past: wäre (Konjunktiv II).' } },
      { id: 'b2-konjunktiv2-vergangenheit-2', kind: 'transform', instruction: 'Express regret with the Konjunktiv II of the past.', source: 'Ich habe nicht gelernt. (Ich bereue es.)', answers: ['Ich hätte lernen sollen.', 'Hätte ich doch gelernt!', 'Wenn ich doch gelernt hätte!', 'Ich hätte lernen müssen.'], tag: 'mood.konj2', explain: 'Regret: Ich hätte lernen sollen! / Hätte ich doch gelernt!', feedback: [['hätte gelernt sollen', 'With a modal verb: hätte + infinitive + modal infinitive: hätte lernen sollen.']] },
      { id: 'b2-konjunktiv2-vergangenheit-3', kind: 'choice', prompt: 'Du ___ mir das früher sagen müssen!', options: ['hättest', 'würdest', 'wärst', 'hattest'], tag: 'mood.konj2', explain: 'Reproach: hättest + infinitive + modal infinitive.', why: ['würdest … sagen müssen would be a future hypothesis, not a past reproach.', 'müssen forms the perfect with haben.', 'hattest is indicative.'] },
      { id: 'b2-konjunktiv2-vergangenheit-4', kind: 'fill', prompt: 'Ohne deine Hilfe ___ ich das nie geschafft.', answers: ['hätte'], tag: 'mood.konj2', explain: 'Unreal past with haben: hätte geschafft.' },
      { id: 'b2-konjunktiv2-vergangenheit-5', kind: 'correct', sentence: 'Wenn ich das gewusst hätte, würde ich gekommen.', answers: ['Wenn ich das gewusst hätte, wäre ich gekommen.'], tag: 'mood.konj2', explain: 'Past unreal: wäre gekommen (kommen takes sein).' },
      { id: 'b2-konjunktiv2-vergangenheit-6', kind: 'choice', prompt: 'Wir ___ gern länger geblieben, aber wir mussten los.', options: ['wären', 'hätten', 'würden', 'waren'], tag: 'mood.konj2', explain: 'bleiben takes sein → wären geblieben.', why: ['bleiben takes sein.', 'würden geblieben is not a valid form.', 'waren is indicative.'] },
      { id: 'b2-konjunktiv2-vergangenheit-7', kind: 'transform', instruction: 'Make an unreal condition in the past.', source: 'Es hat geregnet. Wir sind nicht gewandert.', answers: ['Wenn es nicht geregnet hätte, wären wir gewandert.'], tag: 'mood.konj2', explain: 'Reverse reality: wenn es nicht geregnet hätte, wären wir gewandert.' },
      { id: 'b2-konjunktiv2-vergangenheit-8', kind: 'order', words: ['Das', 'hätte', 'ich', 'nicht', 'tun', 'dürfen'], tag: 'double-infinitive', explain: 'hätte … tun dürfen (double infinitive at the end).' },
    ],
  },
  {
    id: 'b2-partizipien',
    explanation: `Participles can be used **like adjectives** (with adjective endings):

| | meaning | example |
|---|---|---|
| **Partizip I** (infinitive + **d**) | active, ongoing, simultaneous | *das **lachende** Kind* (the child that is laughing), *steigende Preise* |
| **Partizip II** | passive or completed | *das **reparierte** Auto* (the car that has been repaired), *die **gestohlene** Tasche* |

- Partizip I: *das schlafende Baby = das Baby, das schläft.*
- Partizip II of transitive verbs is passive: *der geschriebene Brief = der Brief, der geschrieben wurde.*
- Partizip II of sein-verbs is active/completed: *der angekommene Zug = der Zug, der angekommen ist.*

They can also be used as adverbs: *Sie kam **lachend** herein.*`,
    examples: [
      { de: 'Wegen der steigenden Mieten ziehen viele aufs Land.', en: 'Because of rising rents, many move to the countryside.' },
      { de: 'Das gestern bestellte Buch ist schon da.', en: 'The book ordered yesterday is already here.' },
      { de: 'Er antwortete lächelnd.', en: 'He answered with a smile.' },
    ],
    exercises: [
      { id: 'b2-partizipien-1', kind: 'fill', prompt: 'Vorsicht vor dem ___ Hund! (bellen)', answers: ['bellenden'], tag: 'participle-attr', explain: 'Ongoing action → Partizip I; dative masculine after dem → -en: dem bellenden Hund.', feedback: { gebellten: 'The dog itself is barking (active) → Partizip I: bellenden.', bellende: 'After dem (dative) the ending is -en.' } },
      { id: 'b2-partizipien-2', kind: 'fill', prompt: 'Das ___ Fahrrad wurde gefunden. (stehlen)', answers: ['gestohlene'], tag: 'participle-attr', explain: 'Passive/completed → Partizip II: das gestohlene Fahrrad.', feedback: { stehlende: 'The bike didn’t steal anything — it was stolen: gestohlene.', gestohlenes: 'After das the ending is -e.' } },
      { id: 'b2-partizipien-3', kind: 'transform', instruction: 'Replace the relative clause with a participle.', source: 'Die Kinder, die spielen, sind laut.', answers: ['Die spielenden Kinder sind laut.'], tag: 'participle-attr', explain: 'die Kinder, die spielen → die spielenden Kinder.', feedback: [['gespielten', 'Active and ongoing → Partizip I: spielenden.']] },
      { id: 'b2-partizipien-4', kind: 'choice', prompt: 'Der gerade ___ Zug fährt nach Hamburg weiter.', options: ['angekommene', 'ankommende', 'angekommen', 'ankommenden'], tag: 'participle-attr', explain: 'ankommen (sein-verb), completed: der angekommene Zug.', why: ['„gerade angekommen“ is completed → Partizip II.', 'An adjective before a noun needs an ending.', 'After der (nominative) the ending is -e.'] },
      { id: 'b2-partizipien-5', kind: 'transform', instruction: 'Replace the relative clause with a participle.', source: 'Ich habe den Brief, der gestern geschrieben wurde, abgeschickt.', answers: ['Ich habe den gestern geschriebenen Brief abgeschickt.'], tag: 'participle-attr', explain: 'den Brief, der geschrieben wurde → den geschriebenen Brief (accusative -en).', feedback: [['geschriebene brief', 'Accusative masculine after den: -en → geschriebenen.']] },
      { id: 'b2-partizipien-6', kind: 'correct', sentence: 'Die gestiegenden Preise machen allen Sorgen.', answers: ['Die gestiegenen Preise machen allen Sorgen.', 'Die steigenden Preise machen allen Sorgen.'], tag: 'participle-attr', explain: 'Either Partizip II (gestiegene, completed) or Partizip I (steigende, ongoing) — not a mix.' },
      { id: 'b2-partizipien-7', kind: 'fill', prompt: 'Sie verließ ___ den Raum. (weinen)', answers: ['weinend'], tag: 'participle-attr', explain: 'As an adverb the participle has no ending: weinend.' },
      { id: 'b2-partizipien-8', kind: 'choice', prompt: 'Was bedeutet „das renovierte Haus“?', options: ['das Haus, das renoviert worden ist', 'das Haus, das renoviert', 'das Haus, das gerade renoviert wird', 'das Haus, das renoviert werden muss'], tag: 'participle-attr', explain: 'Partizip II of a transitive verb = passive and completed.', why: ['A house cannot renovate something.', 'Ongoing renovation would be: das Haus, das gerade renoviert wird (no participle form for this).', 'Necessity would be: das zu renovierende Haus.'] },
    ],
  },
  {
    id: 'b2-konnektoren',
    explanation: `| connector | meaning | example |
|---|---|---|
| **je … desto / umso** | the … the | *Je länger ich warte, desto nervöser werde ich.* |
| **indem** | by (doing) — means | *Man lernt, indem man übt.* |
| **sodass / so …, dass** | so that (result) | *Es regnete, sodass wir drinnen blieben.* |
| **falls / sofern** | in case / provided that | *Falls es regnet, nehmen wir den Bus.* |
| **ohne dass / ohne … zu** | without | *Er ging, ohne sich zu verabschieden.* |
| **(an)statt dass / (an)statt … zu** | instead of | *Statt zu lernen, sah er fern.* |
| **damit / um … zu** | so that / in order to | (B1) |

**je … desto**: *je* + comparative + verb at the end, *desto* + comparative + verb next:
*Je **mehr** du übst, desto **besser** **sprichst** du.*

**ohne … zu / statt … zu** need the same subject; with different subjects use **ohne dass / statt dass** + clause.`,
    examples: [
      { de: 'Je früher wir losfahren, desto weniger Stau gibt es.', en: 'The earlier we leave, the less traffic there is.' },
      { de: 'Sie entspannt sich, indem sie Musik hört.', en: 'She relaxes by listening to music.' },
      { de: 'Er nahm mein Handy, ohne mich zu fragen.', en: 'He took my phone without asking me.' },
    ],
    exercises: [
      { id: 'b2-konnektoren-1', kind: 'transform', instruction: 'Connect with je … desto.', source: 'Man übt viel. Man wird schnell besser.', answers: ['Je mehr man übt, desto schneller wird man besser.', 'Je mehr man übt, desto besser wird man.'], tag: 'connector', explain: 'je + comparative + verb at the end; desto + comparative + verb next.', feedback: [['desto man', 'After desto + comparative, the verb comes next: desto besser wird man.'], ['je man', 'je is followed by the comparative: je mehr man übt.']] },
      { id: 'b2-konnektoren-2', kind: 'fill', prompt: 'Er hat Deutsch gelernt, ___ er jeden Tag Podcasts gehört hat.', answers: ['indem'], tag: 'connector', explain: 'The means (how?): indem.', feedback: { damit: 'damit expresses a purpose; the method is indem.', sodass: 'sodass gives a result; the method is indem.' } },
      { id: 'b2-konnektoren-3', kind: 'choice', prompt: 'Sie ging aus dem Haus, ___ einen Schirm mitzunehmen.', options: ['ohne', 'statt dass', 'indem', 'sodass'], tag: 'connector', explain: 'Same subject + zu-infinitive: ohne … zu.', why: ['statt dass needs a subordinate clause.', 'indem needs a subordinate clause.', 'sodass needs a subordinate clause.'] },
      { id: 'b2-konnektoren-4', kind: 'fill', prompt: '___ du mich brauchst, ruf einfach an.', answers: ['Falls', 'Wenn', 'falls', 'wenn', 'Sofern', 'sofern'], tag: 'connector', explain: 'Condition: falls / wenn (in case you need me).' },
      { id: 'b2-konnektoren-5', kind: 'choice', prompt: 'Er war so müde, ___ er sofort einschlief.', options: ['dass', 'damit', 'indem', 'ob'], tag: 'connector', explain: 'so …, dass expresses a result.', why: ['damit expresses a purpose.', 'indem expresses the means.', 'ob introduces an indirect question.'] },
      { id: 'b2-konnektoren-6', kind: 'transform', instruction: 'Rewrite with statt … zu.', source: 'Er hat nicht gelernt. Er hat Computerspiele gespielt.', answers: ['Statt zu lernen, hat er Computerspiele gespielt.', 'Anstatt zu lernen, hat er Computerspiele gespielt.', 'Er hat Computerspiele gespielt, statt zu lernen.', 'Er hat Computerspiele gespielt, anstatt zu lernen.'], tag: 'connector', explain: 'Same subject → statt zu + infinitive.' },
      { id: 'b2-konnektoren-7', kind: 'correct', sentence: 'Je älter er wird, desto er wird ruhiger.', answers: ['Je älter er wird, desto ruhiger wird er.'], tag: 'connector', explain: 'desto + comparative, then the verb: desto ruhiger wird er.' },
      { id: 'b2-konnektoren-8', kind: 'choice', prompt: 'Der Chef traf die Entscheidung, ___ das Team davon wusste.', options: ['ohne dass', 'ohne', 'statt', 'um'], tag: 'connector', explain: 'Different subjects (der Chef … das Team) → ohne dass + clause.', why: ['ohne … zu only works with the same subject.', 'statt alone is a preposition.', 'um … zu expresses purpose.'] },
    ],
  },
  {
    id: 'b2-praepositionen-genitiv',
    explanation: `Prepositions with the **genitive** are typical of written and formal German:

| preposition | meaning |
|---|---|
| **aufgrund** | due to |
| **wegen** | because of |
| **trotz** | despite |
| **während** | during |
| **innerhalb / außerhalb** | within / outside |
| **(an)statt** | instead of |
| **anstelle** | in place of |
| **infolge** | as a result of |
| **bezüglich / hinsichtlich** | regarding |
| **angesichts** | in view of |
| **mithilfe** | with the help of |
| **zugunsten** | in favour of |

*Aufgrund **des** schlechten Wetter**s** wurde das Spiel abgesagt.*
*Innerhalb **einer** Woche müssen Sie antworten.*

> In everyday speech *wegen, trotz, während* are often used with the dative — in writing, use the genitive.`,
    examples: [
      { de: 'Aufgrund eines Unfalls ist die Straße gesperrt.', en: 'Due to an accident the road is closed.' },
      { de: 'Innerhalb der Stadt gilt Tempo 30.', en: 'Within the city the speed limit is 30.' },
      { de: 'Bezüglich Ihrer Anfrage melden wir uns morgen.', en: 'We’ll get back to you about your enquiry tomorrow.' },
    ],
    exercises: [
      { id: 'b2-praepositionen-genitiv-1', kind: 'fill', prompt: 'Aufgrund ___ Streiks fallen viele Flüge aus.', answers: ['des', 'eines'], tag: 'case.gen', explain: 'aufgrund + genitive; der Streik → des/eines Streiks.', feedback: { dem: 'aufgrund takes the genitive: des.', der: 'Streik is masculine: des.' } },
      { id: 'b2-praepositionen-genitiv-2', kind: 'choice', prompt: '___ einer Woche müssen Sie die Rechnung bezahlen.', options: ['Innerhalb', 'Während', 'Seit', 'Infolge'], tag: 'preposition', explain: 'A deadline: innerhalb (within).', why: ['während = during an event.', 'seit = since (until now).', 'infolge = as a result of.'] },
      { id: 'b2-praepositionen-genitiv-3', kind: 'transform', instruction: 'Use a genitive preposition instead of the weil clause.', source: 'Weil es stark regnete, wurde das Konzert abgesagt.', answers: ['Wegen des starken Regens wurde das Konzert abgesagt.', 'Aufgrund des starken Regens wurde das Konzert abgesagt.', 'Infolge des starken Regens wurde das Konzert abgesagt.'], tag: 'nominal-style', explain: 'weil es regnete → wegen/aufgrund des Regens (genitive, masculine -s).', feedback: [['des starken regen\\b', 'Masculine genitive: des starken Regens.']] },
      { id: 'b2-praepositionen-genitiv-4', kind: 'fill', prompt: '___ des Vertrags haben wir noch Fragen.', hint: 'regarding', answers: ['Bezüglich', 'Hinsichtlich', 'bezüglich', 'hinsichtlich'], tag: 'preposition', explain: 'regarding: bezüglich / hinsichtlich + genitive.' },
      { id: 'b2-praepositionen-genitiv-5', kind: 'choice', prompt: 'Das Spiel fand trotz ___ statt.', options: ['des Regens', 'dem Regen', 'den Regen', 'der Regen'], tag: 'case.gen', explain: 'trotz + genitive (written standard): des Regens.', why: ['Colloquial; the written standard is the genitive.', 'den is accusative.', 'der Regen is nominative.'] },
      { id: 'b2-praepositionen-genitiv-6', kind: 'correct', sentence: 'Außerhalb die Öffnungszeiten ist das Büro geschlossen.', answers: ['Außerhalb der Öffnungszeiten ist das Büro geschlossen.'], tag: 'case.gen', explain: 'außerhalb + genitive; plural genitive: der Öffnungszeiten.' },
      { id: 'b2-praepositionen-genitiv-7', kind: 'fill', prompt: '___ meines Bruders ist meine Schwester gekommen.', hint: 'instead of', answers: ['Statt', 'Anstatt', 'Anstelle', 'statt', 'anstatt', 'anstelle'], tag: 'preposition', explain: 'instead of: (an)statt / anstelle + genitive.' },
      { id: 'b2-praepositionen-genitiv-8', kind: 'choice', prompt: '___ der hohen Kosten wurde das Projekt gestoppt.', options: ['Angesichts', 'Mithilfe', 'Zugunsten', 'Innerhalb'], tag: 'preposition', explain: 'in view of: angesichts.', why: ['mithilfe = with the help of.', 'zugunsten = in favour of.', 'innerhalb = within.'] },
    ],
    drills: ['case-gen'],
  },
  {
    id: 'b2-modalverben-vermutung',
    explanation: `Modal verbs can express **how sure** the speaker is (subjective use):

| certainty | form | example |
|---|---|---|
| ~100 % | **muss** | *Er **muss** krank sein.* (He must be ill.) |
| ~90 % | **dürfte** | *Sie **dürfte** schon zu Hause sein.* (She’s probably home.) |
| ~50 % | **kann / könnte** | *Das **könnte** stimmen.* (That might be true.) |
| ~0 % | **kann nicht** | *Das **kann nicht** sein!* |

Also: **werden (wohl)** + infinitive: *Er **wird** (wohl) im Stau **stehen**.*

**About the past**: modal + **participle + haben/sein**:
*Er **muss** den Zug **verpasst haben**.* · *Sie **könnte** schon **gegangen sein**.*

**Futur II** (werden + participle + haben/sein): something completed by a future point, or an assumption about the past:
*Bis morgen **werde** ich den Bericht **geschrieben haben**.* · *Er **wird** es **vergessen haben**.*`,
    examples: [
      { de: 'Das Licht ist an – sie muss zu Hause sein.', en: 'The light is on – she must be at home.' },
      { de: 'Er dürfte etwa 40 Jahre alt sein.', en: 'He’s probably about 40.' },
      { de: 'Sie könnte den Termin vergessen haben.', en: 'She might have forgotten the appointment.' },
    ],
    exercises: [
      { id: 'b2-modalverben-vermutung-1', kind: 'choice', prompt: 'Das Auto steht vor der Tür. Er ___ zu Hause sein.', options: ['muss', 'soll', 'darf', 'will'], tag: 'modal.subjective', explain: 'A logical conclusion (almost certain): muss.', why: ['soll reports what others say.', 'darf expresses permission.', 'will reports the subject’s own claim.'] },
      { id: 'b2-modalverben-vermutung-2', kind: 'fill', prompt: 'Sie ist nicht gekommen. Sie ___ den Termin vergessen haben.', hint: 'vielleicht', answers: ['könnte', 'kann', 'dürfte'], tag: 'modal.subjective', explain: 'A possibility about the past: könnte + participle + haben.' },
      { id: 'b2-modalverben-vermutung-3', kind: 'transform', instruction: 'Express the assumption with a modal verb (about the past).', source: 'Wahrscheinlich hat er den Zug verpasst.', answers: ['Er dürfte den Zug verpasst haben.', 'Er wird den Zug verpasst haben.', 'Er wird wohl den Zug verpasst haben.'], tag: 'modal.subjective', explain: 'wahrscheinlich ≈ dürfte; past → participle + haben.', feedback: [['dürfte .* verpassen', 'About the past: participle + haben: verpasst haben.']] },
      { id: 'b2-modalverben-vermutung-4', kind: 'choice', prompt: '„Das kann nicht sein!“ bedeutet:', options: ['Das ist sicher nicht so.', 'Das ist vielleicht so.', 'Das darf man nicht.', 'Das ist sehr wahrscheinlich.'], tag: 'modal.subjective', explain: 'kann nicht = impossible (speaker is sure it is not so).', why: ['vielleicht would be könnte.', 'Prohibition would be darf nicht.', 'Probable would be dürfte.'] },
      { id: 'b2-modalverben-vermutung-5', kind: 'fill', prompt: 'Bis nächste Woche ___ ich das Projekt abgeschlossen haben.', answers: ['werde'], tag: 'verb.tense', explain: 'Futur II: werde + participle + haben.' },
      { id: 'b2-modalverben-vermutung-6', kind: 'correct', sentence: 'Er muss gestern sehr müde gewesen haben.', answers: ['Er muss gestern sehr müde gewesen sein.'], tag: 'modal.subjective', explain: 'sein forms the perfect with sein: gewesen sein.' },
      { id: 'b2-modalverben-vermutung-7', kind: 'choice', prompt: 'Sie ist nicht da. Sie ___ schon nach Hause gegangen sein.', options: ['dürfte', 'darf', 'durfte', 'soll'], tag: 'modal.subjective', explain: 'Probability: dürfte + participle + sein.', why: ['darf expresses permission.', 'durfte is past permission.', 'soll would mean “people say she has gone”.'] },
      { id: 'b2-modalverben-vermutung-8', kind: 'order', words: ['Er', 'wird', 'wohl', 'im', 'Stau', 'stehen'], tag: 'modal.subjective', explain: 'Assumption about now: werden (wohl) + infinitive.' },
    ],
  },
  {
    id: 'b2-n-deklination',
    explanation: `A group of **masculine nouns** takes **-n** or **-en** in every case except the nominative singular (“weak nouns”):

| | singular | plural |
|---|---|---|
| nominative | der Kolleg**e** | die Kolleg**en** |
| accusative | den Kolleg**en** | die Kolleg**en** |
| dative | dem Kolleg**en** | den Kolleg**en** |
| genitive | des Kolleg**en** | der Kolleg**en** |

Which nouns?
- masculine nouns in **-e** for people and animals: der Junge, der Kunde, der Löwe, der Neffe
- foreign words in **-ant, -ent, -ist, -at, -oge, -ad**: der Student, der Präsident, der Polizist, der Soldat, der Biologe, der Kamerad
- some others: der Mensch, der Herr (den Herr**n**), der Nachbar, der Bauer, der Held, der Prinz

> der Name, der Gedanke, der Glaube, der Buchstabe add **-ns** in the genitive: des Namens.`,
    examples: [
      { de: 'Kennst du den neuen Kollegen?', en: 'Do you know the new colleague?' },
      { de: 'Ich habe mit dem Präsidenten gesprochen.', en: 'I spoke with the president.' },
      { de: 'Sehr geehrter Herr Braun, …', en: 'Dear Mr Braun, …' },
    ],
    exercises: [
      { id: 'b2-n-deklination-1', kind: 'fill', prompt: 'Ich helfe dem ___. (Junge)', answers: ['Jungen'], tag: 'n-decl', explain: 'Weak noun → dative: dem Jungen.', feedback: { junge: 'Weak nouns take -n outside the nominative: dem Jungen.' } },
      { id: 'b2-n-deklination-2', kind: 'choice', prompt: 'Wir haben einen ___ nach dem Weg gefragt.', options: ['Polizisten', 'Polizist', 'Polizists', 'Polizistem'], tag: 'n-decl', explain: '-ist nouns are weak: einen Polizisten.', why: ['Weak nouns need -en in the accusative.', 'Weak nouns never take -s.', 'There is no ending -em on nouns.'] },
      { id: 'b2-n-deklination-3', kind: 'fill', prompt: 'Das ist das Auto unseres ___. (Nachbar)', answers: ['Nachbarn'], tag: 'n-decl', explain: 'Nachbar is weak: des Nachbarn (genitive -n, no -s).', feedback: { nachbars: 'Weak nouns take -n, not -s: des Nachbarn.' } },
      { id: 'b2-n-deklination-4', kind: 'correct', sentence: 'Ich habe gestern einen interessanten Mensch kennengelernt.', answers: ['Ich habe gestern einen interessanten Menschen kennengelernt.'], tag: 'n-decl', explain: 'Mensch is weak: einen Menschen.' },
      { id: 'b2-n-deklination-5', kind: 'fill', prompt: 'Der Brief ist an Herrn Meyer adressiert. – Ich schreibe ___ Meyer. (Herr)', answers: ['Herrn'], tag: 'n-decl', explain: 'Herr → Herrn (accusative/dative/genitive singular).' },
      { id: 'b2-n-deklination-6', kind: 'choice', prompt: 'Wie ist der Name des ___?', options: ['Kunden', 'Kunde', 'Kundes', 'Kundens'], tag: 'n-decl', explain: 'Kunde is weak: des Kunden.', why: ['Genitive singular of a weak noun: -n.', 'Weak nouns don’t take -s.', 'Only a few nouns (Name, Gedanke …) take -ns.'] },
      { id: 'b2-n-deklination-7', kind: 'fill', prompt: 'Kennst du den Namen des ___? (Student)', answers: ['Studenten'], tag: 'n-decl', explain: '-ent nouns are weak: des Studenten.' },
      { id: 'b2-n-deklination-8', kind: 'choice', prompt: 'Ich kann mich nicht an seinen ___ erinnern.', options: ['Namen', 'Name', 'Names', 'Namens'], tag: 'n-decl', explain: 'Name is weak: den Namen (genitive des Namens).', why: ['Accusative of Name: Namen.', 'Name takes -ns only in the genitive.', 'The accusative is Namen.'] },
    ],
    drills: ['n-decl'],
  },
  {
    id: 'b2-nominalisierung',
    explanation: `Formal written German often turns **verbs and clauses into nouns** (nominalisation).

**Verb → noun**
| pattern | examples |
|---|---|
| infinitive as noun (das …) | essen → das Essen, lesen → das Lesen |
| -ung (die …) | entscheiden → die Entscheidung, erklären → die Erklärung |
| stem without ending | anfangen → der Anfang, besuchen → der Besuch |
| vowel change | ankommen → die Ankunft, abfahren → die Abfahrt, sprechen → die Sprache |

**Clause → prepositional phrase**
| verbal style | nominal style |
|---|---|
| als der Zug ankam | **bei** der Ankunft des Zuges |
| nachdem er das Studium abgeschlossen hatte | **nach** dem Abschluss des Studiums |
| weil es regnete | **wegen** des Regens |
| bevor sie abreiste | **vor** ihrer Abreise |
| während wir arbeiteten | **während** der Arbeit |

The subject of the clause becomes a **genitive** (or a possessive): *der Zug kommt an → die Ankunft des Zuges.*`,
    examples: [
      { de: 'Nach dem Essen machen wir einen Spaziergang.', en: 'After the meal we go for a walk.' },
      { de: 'Bei der Ankunft erhalten Sie einen Schlüssel.', en: 'On arrival you will receive a key.' },
      { de: 'Vor der Abfahrt bitte das Ticket entwerten.', en: 'Please validate your ticket before departure.' },
    ],
    exercises: [
      { id: 'b2-nominalisierung-1', kind: 'fill', prompt: 'abfahren → die ___', answers: ['Abfahrt'], tag: 'nominal-style', explain: 'ab|fahren → die Abfahrt.', feedback: { abfahrung: 'There is no Abfahrung; the noun is die Abfahrt.' } },
      { id: 'b2-nominalisierung-2', kind: 'choice', prompt: 'sich entscheiden → die ___', options: ['Entscheidung', 'Entscheid', 'Entschiedenheit', 'Entscheiden'], tag: 'nominal-style', explain: '-ung noun: die Entscheidung.', why: ['Der Entscheid exists (Swiss/legal), but the standard noun is die Entscheidung.', 'Entschiedenheit means determination.', 'das Entscheiden is the act of deciding.'] },
      { id: 'b2-nominalisierung-3', kind: 'transform', instruction: 'Rewrite in nominal style (bei + noun).', source: 'Als wir ankamen, regnete es.', answers: ['Bei unserer Ankunft regnete es.'], tag: 'nominal-style', explain: 'als wir ankamen → bei unserer Ankunft.', feedback: [['ankommen', 'The noun of ankommen is die Ankunft.']] },
      { id: 'b2-nominalisierung-4', kind: 'transform', instruction: 'Rewrite in nominal style (nach + noun).', source: 'Nachdem er das Studium beendet hatte, zog er nach Berlin.', answers: ['Nach dem Ende des Studiums zog er nach Berlin.', 'Nach Beendigung des Studiums zog er nach Berlin.', 'Nach dem Abschluss des Studiums zog er nach Berlin.', 'Nach Abschluss des Studiums zog er nach Berlin.', 'Nach dem Ende seines Studiums zog er nach Berlin.', 'Nach Abschluss seines Studiums zog er nach Berlin.'], tag: 'nominal-style', explain: 'nachdem … beendet hatte → nach dem Ende / Abschluss des Studiums.' },
      { id: 'b2-nominalisierung-5', kind: 'fill', prompt: 'Vor ___ Abreise müssen Sie das Zimmer räumen. (Sie)', answers: ['Ihrer'], tag: 'nominal-style', explain: 'vor + dative: vor Ihrer Abreise.', feedback: { ihre: 'vor takes the dative: Ihrer.', ihrer: 'The polite form is capitalised: Ihrer.' } },
      { id: 'b2-nominalisierung-6', kind: 'choice', prompt: 'Weil das Wetter schlecht war, … = ___ des schlechten Wetters …', options: ['Wegen', 'Trotz', 'Während', 'Statt'], tag: 'nominal-style', explain: 'weil → wegen / aufgrund.', why: ['trotz expresses a contrast (obwohl).', 'während is temporal.', 'statt = instead of.'] },
      { id: 'b2-nominalisierung-7', kind: 'fill', prompt: 'besuchen → der ___', answers: ['Besuch'], tag: 'nominal-style', explain: 'Stem without ending: der Besuch.' },
      { id: 'b2-nominalisierung-8', kind: 'transform', instruction: 'Rewrite with a verb (verbal style).', source: 'Während der Arbeit höre ich Musik.', answers: ['Während ich arbeite, höre ich Musik.'], tag: 'nominal-style', explain: 'während der Arbeit → während ich arbeite (verb at the end).', feedback: [['während ich arbeite höre', 'Add a comma after the subordinate clause.']] },
    ],
  },
  {
    id: 'b2-relativ-wer-was',
    explanation: `**wer** introduces a relative clause about an unspecified person (“whoever”). It is often picked up by *der* in the main clause:
*Wer zu spät kommt, (der) muss draußen warten.*
*Wer A sagt, muss auch B sagen.*

**was** is the relative pronoun after:
- indefinite pronouns: **alles, nichts, etwas, vieles, manches, weniges** — *Das ist alles, was ich weiß.*
- nominalised superlatives: **das Beste, das Schönste** — *Das ist das Beste, was mir je passiert ist.*
- a whole clause: *Er hat die Prüfung bestanden, **was** mich sehr freut.*

With a preposition, **was** becomes **wo(r)-** + preposition:
*Das ist etwas, **worüber** ich mich freue.* · *Es gibt nichts, **wovor** ich Angst habe.*

> Places: **wo** can replace *in dem/in der*: *die Stadt, **wo** ich wohne* (= in der ich wohne).`,
    examples: [
      { de: 'Wer Hunger hat, kann sich etwas nehmen.', en: 'Whoever is hungry can take something.' },
      { de: 'Das ist das Schönste, was ich je gesehen habe.', en: 'That’s the most beautiful thing I’ve ever seen.' },
      { de: 'Es gibt vieles, worüber wir sprechen müssen.', en: 'There is a lot we need to talk about.' },
    ],
    exercises: [
      { id: 'b2-relativ-wer-was-1', kind: 'fill', prompt: '___ viel liest, weiß viel.', answers: ['Wer'], tag: 'relative', explain: 'Unspecified person: wer.', feedback: { der: 'For an unspecified person (whoever) use wer.', was: 'was refers to things; for people use wer.' } },
      { id: 'b2-relativ-wer-was-2', kind: 'fill', prompt: 'Das ist alles, ___ ich dazu sagen kann.', answers: ['was'], tag: 'relative', explain: 'After alles: was.', feedback: { das: 'After alles/nichts/etwas the relative pronoun is was.', dass: 'dass is a conjunction; the relative pronoun is was.' } },
      { id: 'b2-relativ-wer-was-3', kind: 'choice', prompt: 'Er hat mir geholfen, ___ ich sehr nett fand.', options: ['was', 'das', 'der', 'wer'], tag: 'relative', explain: 'Refers to the whole clause: was.', why: ['das would refer to a neuter noun.', 'der would refer to a masculine noun.', 'wer refers to people.'] },
      { id: 'b2-relativ-wer-was-4', kind: 'fill', prompt: 'Das ist etwas, ___ ich mich sehr freue.', answers: ['worüber', 'worauf'], tag: 'relative', explain: 'was + preposition → wo(r)- + preposition: worüber (sich freuen über).' },
      { id: 'b2-relativ-wer-was-5', kind: 'choice', prompt: 'Das Beste, ___ du tun kannst, ist abzuwarten.', options: ['was', 'das', 'welches', 'wer'], tag: 'relative', explain: 'After a nominalised superlative: was.', why: ['After das Beste the relative pronoun is was.', 'After das Beste the relative pronoun is was.', 'wer refers to people.'] },
      { id: 'b2-relativ-wer-was-6', kind: 'correct', sentence: 'Es gibt nichts, das mich mehr ärgert.', answers: ['Es gibt nichts, was mich mehr ärgert.'], tag: 'relative', explain: 'After nichts: was.' },
      { id: 'b2-relativ-wer-was-7', kind: 'fill', prompt: 'Das ist die Stadt, ___ ich geboren bin.', answers: ['wo', 'in der'], tag: 'relative', explain: 'Place: wo (= in der).' },
      { id: 'b2-relativ-wer-was-8', kind: 'choice', prompt: '___ das nicht versteht, soll fragen.', options: ['Wer', 'Was', 'Der', 'Welcher'], tag: 'relative', explain: 'Unspecified person: wer.', why: ['was refers to things.', 'der needs a noun to refer back to.', 'welcher needs a noun.'] },
    ],
  },
  {
    id: 'b2-modalpartikeln',
    explanation: `**Modal particles** are small unstressed words that express the speaker’s attitude. They are typical of spoken German and can’t be translated word for word.

| particle | typical use | example |
|---|---|---|
| **doch** | reminding, insisting, softening imperatives | *Das weißt du **doch**!* · *Komm **doch** mit!* |
| **ja** | shared knowledge, surprise | *Das ist **ja** bekannt.* · *Du bist **ja** schon da!* |
| **mal** | softens requests | *Hör **mal** zu!* · *Kannst du **mal** kommen?* |
| **denn** | interest/surprise in questions | *Was ist **denn** los?* |
| **eben / halt** | resignation: it is how it is | *Das ist **eben** so.* · *Dann müssen wir **halt** warten.* |
| **schon** | reassurance | *Das wird **schon** klappen.* |
| **wohl** | assumption | *Er ist **wohl** krank.* |

They stand in the middle field, usually after pronouns and before the new information.`,
    examples: [
      { de: 'Setz dich doch!', en: 'Do sit down!' },
      { de: 'Wo bist du denn?', en: 'Where are you, then?' },
      { de: 'Das ist halt so.', en: 'That’s just the way it is.' },
    ],
    exercises: [
      { id: 'b2-modalpartikeln-1', kind: 'choice', prompt: '(freundliche Einladung) Komm ___ mit!', options: ['doch', 'denn', 'wohl', 'ja'], tag: 'modal-particle', explain: 'doch softens an imperative into a friendly invitation.', why: ['denn is used in questions.', 'wohl expresses an assumption.', 'ja in imperatives sounds like a threat (Komm ja nicht zu spät!).'] },
      { id: 'b2-modalpartikeln-2', kind: 'fill', prompt: '(überrascht) Was machst du ___ hier?', answers: ['denn'], tag: 'modal-particle', explain: 'denn in questions: interest or surprise.' },
      { id: 'b2-modalpartikeln-3', kind: 'choice', prompt: '(Resignation) Der Zug fällt aus. Dann nehmen wir ___ den Bus.', options: ['eben', 'denn', 'etwa', 'mal'], tag: 'modal-particle', explain: 'eben/halt: accepting the situation.', why: ['denn is for questions.', 'etwa is for questions expecting “no”.', 'mal softens requests.'] },
      { id: 'b2-modalpartikeln-4', kind: 'fill', prompt: '(bekannte Tatsache) Wir kennen uns ___ schon lange.', answers: ['ja', 'doch'], tag: 'modal-particle', explain: 'ja/doch mark something both speakers know.' },
      { id: 'b2-modalpartikeln-5', kind: 'choice', prompt: '(Bitte) Kannst du ___ das Fenster aufmachen?', options: ['mal', 'denn', 'eben', 'wohl'], tag: 'modal-particle', explain: 'mal makes a request sound casual and friendly.', why: ['denn would express surprise.', 'eben expresses resignation.', 'wohl expresses an assumption.'] },
      { id: 'b2-modalpartikeln-6', kind: 'choice', prompt: '(Beruhigung) Keine Sorge, das klappt ___.', options: ['schon', 'denn', 'etwa', 'mal'], tag: 'modal-particle', explain: 'schon = reassurance (it will work out).', why: ['denn is used in questions.', 'etwa is used in questions.', 'mal is used in requests.'] },
      { id: 'b2-modalpartikeln-7', kind: 'choice', prompt: '„Du hast ja ein neues Auto!“ drückt aus:', options: ['Überraschung', 'Ärger', 'eine Bitte', 'Zweifel'], tag: 'modal-particle', explain: 'ja in an exclamation shows surprise.', why: ['Annoyance would be doch: Das hast du doch gewusst!', 'A request would use mal.', 'Doubt would use wohl or etwa.'] },
      { id: 'b2-modalpartikeln-8', kind: 'fill', prompt: '(Annahme) Er ist ___ schon nach Hause gegangen.', answers: ['wohl'], tag: 'modal-particle', explain: 'wohl = probably (assumption).' },
    ],
  },
  {
    id: 'b2-satzstellung',
    explanation: `In the **middle field** (between the conjugated verb and the end of the clause) German follows these tendencies:

**1. Pronouns before nouns.** Two pronouns: accusative before dative.
*Ich gebe **ihm** das Buch.* · *Ich gebe **es** dem Mann.* · *Ich gebe **es ihm**.*

**2. Two nouns: dative before accusative.**
*Ich gebe **dem Mann das Buch**.*

**3. Adverbials: Te – Ka – Mo – Lo** (time – cause – manner – place):
*Ich fahre **morgen** (Te) **wegen eines Termins** (Ka) **mit dem Zug** (Mo) **nach Köln** (Lo).*

**4. nicht** stands before the element it negates; for the whole sentence it goes near the end — but before adverbs of manner, place phrases and the second verb part: *Ich fahre heute nicht mit dem Auto.*

**5. New / important information** goes towards the end; known information first.`,
    examples: [
      { de: 'Ich habe es ihm gestern gegeben.', en: 'I gave it to him yesterday.' },
      { de: 'Sie fährt jeden Tag mit dem Rad zur Arbeit.', en: 'She cycles to work every day.' },
      { de: 'Wir treffen uns heute wegen des Projekts im Büro.', en: 'We’re meeting at the office today about the project.' },
    ],
    exercises: [
      { id: 'b2-satzstellung-1', kind: 'order', words: ['Ich', 'gebe', 'es', 'ihm', 'morgen'], tag: 'order.midfield', explain: 'Two pronouns: accusative (es) before dative (ihm).' },
      { id: 'b2-satzstellung-2', kind: 'order', words: ['Ich', 'fahre', 'morgen', 'mit dem Zug', 'nach Berlin'], tag: 'order.midfield', explain: 'Time – manner – place.' },
      { id: 'b2-satzstellung-3', kind: 'choice', prompt: 'Ich habe ___ geschenkt.', options: ['meiner Schwester ein Buch', 'ein Buch meiner Schwester', 'es meiner Schwester ein Buch', 'meiner Schwester es'], tag: 'order.midfield', explain: 'Two nouns: dative before accusative.', why: ['With two nouns the dative comes first.', 'es and ein Buch would both be the object.', 'A pronoun comes before a noun: es meiner Schwester.'] },
      { id: 'b2-satzstellung-4', kind: 'correct', sentence: 'Ich habe ihm es gestern erzählt.', answers: ['Ich habe es ihm gestern erzählt.'], tag: 'order.midfield', explain: 'Accusative pronoun before dative pronoun: es ihm.' },
      { id: 'b2-satzstellung-5', kind: 'order', words: ['Wir', 'treffen', 'uns', 'heute', 'wegen des Projekts', 'im Büro'], tag: 'order.midfield', explain: 'Te (heute) – Ka (wegen des Projekts) – Lo (im Büro).' },
      { id: 'b2-satzstellung-6', kind: 'choice', prompt: 'Wo steht nicht? „Ich fahre heute ___ mit dem Auto ___.“', options: ['Ich fahre heute nicht mit dem Auto.', 'Ich fahre heute mit dem Auto nicht.', 'Ich fahre nicht heute mit dem Auto.', 'Nicht ich fahre heute mit dem Auto.'], tag: 'negation', explain: 'nicht stands before adverbials of manner: nicht mit dem Auto.', why: ['nicht goes before the manner phrase.', 'nicht heute would contrast the time (… sondern morgen).', 'That would contrast the person.'] },
      { id: 'b2-satzstellung-7', kind: 'order', words: ['Kannst', 'du', 'mir', 'das Salz', 'geben?'], tag: 'order.midfield', explain: 'Pronoun (mir) before noun (das Salz).' },
      { id: 'b2-satzstellung-8', kind: 'correct', sentence: 'Sie hat dem Kollegen ihn vorgestellt.', answers: ['Sie hat ihn dem Kollegen vorgestellt.'], tag: 'order.midfield', explain: 'Pronouns come before nouns: ihn dem Kollegen.' },
    ],
  },
];
