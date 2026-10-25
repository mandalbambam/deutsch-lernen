import type { GrammarLesson } from '@/lib/exercise/types';

export const C1_LESSONS: GrammarLesson[] = [
  {
    id: 'c1-konjunktiv1',
    explanation: `The **Konjunktiv I** marks **reported speech** — typical of news, reports and academic texts. It signals: *this is what someone said*, without the speaker vouching for it.

**Forms**: infinitive stem + **-e, -est, -e, -en, -et, -en**. In practice mostly the 3rd person singular is used:

| infinitive | er / sie / es | note |
|---|---|---|
| sein | **sei** (ich sei, du sei(e)st, wir seien, sie seien) | irregular |
| haben | **habe** | |
| werden | **werde** | |
| können / müssen / wollen | **könne / müsse / wolle** | |
| kommen / gehen / wissen | **komme / gehe / wisse** | |

**Tenses in reported speech**
| direct | indirect |
|---|---|
| „Ich **bin** krank.“ | Er sagte, er **sei** krank. |
| „Ich **war / bin** krank **gewesen**.“ | Er sagte, er **sei** krank **gewesen**. |
| „Ich **werde** kommen.“ | Er sagte, er **werde** kommen. |

**Ersatzform**: when the Konjunktiv I looks like the indicative (*sie haben, wir kommen*), use the **Konjunktiv II** instead: *Sie sagten, sie **hätten** keine Zeit.* (not *sie haben*). Questions: *Sie fragte, **ob** er Zeit **habe** / **wann** er **komme**.* Commands: *Er sagte, sie **solle** warten.*`,
    examples: [
      { de: 'Der Minister erklärte, die Lage sei unter Kontrolle.', en: 'The minister said the situation was under control.' },
      { de: 'Sie behauptete, sie habe nichts gewusst.', en: 'She claimed she had known nothing.' },
      { de: 'Die Experten meinten, die Preise würden weiter steigen.', en: 'The experts thought prices would keep rising.' },
    ],
    exercises: [
      { id: 'c1-konjunktiv1-1', kind: 'transform', instruction: 'Report the statement (Konjunktiv I).', source: 'Der Sprecher sagt: „Das Projekt ist ein Erfolg.“', answers: ['Der Sprecher sagt, das Projekt sei ein Erfolg.', 'Der Sprecher sagt, dass das Projekt ein Erfolg sei.'], tag: 'mood.konj1', explain: 'ist → sei.', feedback: [['\\bist\\b', 'Reported speech uses the Konjunktiv I: sei.'], ['wäre', 'wäre would suggest doubt; neutral reporting: sei.']] },
      { id: 'c1-konjunktiv1-2', kind: 'fill', prompt: 'Sie sagte, sie ___ den Brief nie bekommen.', hint: 'haben', answers: ['habe'], tag: 'mood.konj1', explain: 'Reported past: habe + participle.', feedback: { hat: 'Reported speech: Konjunktiv I → habe.', hätte: 'Possible, but standard (neutral) reporting uses habe here.' } },
      { id: 'c1-konjunktiv1-3', kind: 'choice', prompt: 'Die Studierenden erklärten, sie ___ keine Zeit.', options: ['hätten', 'haben', 'habe', 'hatten'], tag: 'mood.konj1', explain: '„sie haben“ (Konj. I) = indicative → replacement with Konjunktiv II: hätten.', why: ['Konjunktiv I „sie haben“ can’t be distinguished from the indicative → use hätten.', 'habe is singular.', 'hatten is indicative past.'] },
      { id: 'c1-konjunktiv1-4', kind: 'transform', instruction: 'Report the question.', source: 'Sie fragt ihn: „Kommst du morgen?“', answers: ['Sie fragt ihn, ob er morgen komme.', 'Sie fragt ihn, ob er morgen käme.', 'Sie fragt ihn, ob er morgen kommt.'], tag: 'mood.konj1', explain: 'Yes/no question → ob + Konjunktiv I: ob er komme.', feedback: [['ob du', 'In reported speech the person changes: du → er.']] },
      { id: 'c1-konjunktiv1-5', kind: 'fill', prompt: 'Der Arzt sagte, ich ___ mich schonen.', hint: 'sollen', answers: ['solle'], tag: 'mood.konj1', explain: 'Reported command: sollen in Konjunktiv I: ich solle.' },
      { id: 'c1-konjunktiv1-6', kind: 'transform', instruction: 'Report in the past (Konjunktiv I).', source: 'Er sagte: „Ich war gestern im Büro.“', answers: ['Er sagte, er sei gestern im Büro gewesen.'], tag: 'mood.konj1', explain: 'Past in reported speech: sei … gewesen.', feedback: [['er war', 'Reported speech uses the Konjunktiv I: sei … gewesen.'], ['sei gewesen gestern', 'The participle goes to the end: sei gestern im Büro gewesen.']] },
      { id: 'c1-konjunktiv1-7', kind: 'choice', prompt: 'Laut Pressemitteilung ___ das Unternehmen 200 neue Stellen schaffen.', options: ['werde', 'wird', 'würde', 'wurde'], tag: 'mood.konj1', explain: 'Reported future: werde + infinitive.', why: ['wird is indicative; the press release is being reported.', 'würde is the replacement form only when Konj. I is unclear (plural).', 'wurde is past passive.'] },
      { id: 'c1-konjunktiv1-8', kind: 'correct', sentence: 'Die Zeugen sagten, sie haben nichts gesehen.', answers: ['Die Zeugen sagten, sie hätten nichts gesehen.'], tag: 'mood.konj1', explain: '„sie haben“ is identical to the indicative → Konjunktiv II: hätten.' },
    ],
    drills: ['konj1'],
  },
  {
    id: 'c1-nominalstil',
    explanation: `**Nominalstil** packs information into noun phrases — typical of academic, administrative and journalistic writing. **Verbalstil** uses clauses — clearer, more spoken.

| verbal style | nominal style |
|---|---|
| Nachdem das Projekt abgeschlossen worden war, … | **Nach Abschluss des Projekts** … |
| Weil die Kosten gestiegen sind, … | **Aufgrund der gestiegenen Kosten** … |
| Wenn man die Regeln nicht beachtet, … | **Bei Nichtbeachtung der Regeln** … |
| Obwohl er sich bemühte, … | **Trotz seiner Bemühungen** … |
| Damit die Qualität verbessert wird, … | **Zur Verbesserung der Qualität** … |
| Indem man Daten analysiert, … | **Durch die Analyse von Daten** … |

**How to transform**
1. Verb → noun (*verbessern → die Verbesserung*).
2. Subject or object → genitive (*die Qualität wird verbessert → die Verbesserung der Qualität*) or *von* + dative.
3. Adverb → adjective (*schnell reagieren → die schnelle Reaktion*).
4. Conjunction → preposition (*weil → wegen/aufgrund, damit → zu/für, wenn → bei, obwohl → trotz*).

> Good style uses both: nominal style is precise but heavy — don’t stack more than two genitives.`,
    examples: [
      { de: 'Nach Ablauf der Frist ist eine Anmeldung nicht mehr möglich.', en: 'After the deadline has passed, registration is no longer possible.' },
      { de: 'Zur Vermeidung von Missverständnissen fasse ich zusammen.', en: 'To avoid misunderstandings, let me summarise.' },
      { de: 'Bei Rückfragen stehe ich Ihnen gern zur Verfügung.', en: 'If you have any questions, I’m happy to help.' },
    ],
    exercises: [
      { id: 'c1-nominalstil-1', kind: 'transform', instruction: 'Nominal style: wenn → bei.', source: 'Wenn es regnet, findet das Konzert im Saal statt.', answers: ['Bei Regen findet das Konzert im Saal statt.'], tag: 'nominal-style', explain: 'wenn es regnet → bei Regen.' },
      { id: 'c1-nominalstil-2', kind: 'transform', instruction: 'Nominal style: damit → zur/zum.', source: 'Damit die Umwelt geschützt wird, sollten wir weniger fliegen.', answers: ['Zum Schutz der Umwelt sollten wir weniger fliegen.', 'Zum Umweltschutz sollten wir weniger fliegen.'], tag: 'nominal-style', explain: 'damit … geschützt wird → zum Schutz der Umwelt.', feedback: [['zur schutz', 'der Schutz is masculine: zum Schutz.'], ['umwelt\\b(?! )', 'The object becomes a genitive: der Umwelt.']] },
      { id: 'c1-nominalstil-3', kind: 'transform', instruction: 'Verbal style: write a clause instead of the noun phrase.', source: 'Trotz intensiver Verhandlungen kam es zu keiner Einigung.', answers: ['Obwohl intensiv verhandelt wurde, kam es zu keiner Einigung.', 'Obwohl man intensiv verhandelt hatte, kam es zu keiner Einigung.', 'Obwohl intensiv verhandelt worden war, kam es zu keiner Einigung.', 'Obwohl man intensiv verhandelte, kam es zu keiner Einigung.'], tag: 'nominal-style', explain: 'trotz → obwohl; die Verhandlungen → verhandeln (often passive or man).' },
      { id: 'c1-nominalstil-4', kind: 'choice', prompt: 'Nachdem der Vertrag unterzeichnet worden war, … = ___ des Vertrags …', options: ['Nach Unterzeichnung', 'Nach Unterzeichnen', 'Nach unterzeichnetem', 'Bei Unterzeichnet'], tag: 'nominal-style', explain: 'unterzeichnen → die Unterzeichnung; nach (der) Unterzeichnung des Vertrags.', why: ['The noun is die Unterzeichnung.', 'An adjective needs a noun after it.', 'bei expresses simultaneity, and Unterzeichnet is not a noun.'] },
      { id: 'c1-nominalstil-5', kind: 'fill', prompt: 'Weil die Nachfrage gestiegen ist, … = Aufgrund der ___ Nachfrage …', answers: ['gestiegenen'], tag: 'nominal-style', explain: 'The verb becomes a participle attribute: der gestiegenen Nachfrage (genitive feminine -en).' },
      { id: 'c1-nominalstil-6', kind: 'transform', instruction: 'Nominal style: indem → durch.', source: 'Indem man die Prozesse vereinfacht, spart man Zeit.', answers: ['Durch die Vereinfachung der Prozesse spart man Zeit.', 'Durch Vereinfachung der Prozesse spart man Zeit.'], tag: 'nominal-style', explain: 'indem man … vereinfacht → durch die Vereinfachung der Prozesse.' },
      { id: 'c1-nominalstil-7', kind: 'choice', prompt: 'Welche Formulierung passt in einen wissenschaftlichen Text?', options: ['Nach Auswertung der Daten zeigte sich ein klarer Trend.', 'Als wir die Daten ausgewertet haben, hat man einen klaren Trend gesehen.', 'Wir haben die Daten ausgewertet und – zack – ein Trend war da.', 'Die Daten haben wir ausgewertet, da war halt ein Trend.'], tag: 'nominal-style', explain: 'Academic texts prefer nominal style and avoid personal/colloquial phrasing.', why: ['Correct but personal and wordy for an academic text.', 'Colloquial.', 'halt is a spoken particle.'] },
      { id: 'c1-nominalstil-8', kind: 'fill', prompt: 'Bei ___ der Regeln droht eine Strafe. (Wenn man die Regeln nicht beachtet …)', answers: ['Nichtbeachtung', 'Missachtung'], tag: 'nominal-style', explain: 'nicht beachten → die Nichtbeachtung (or die Missachtung).' },
    ],
  },
  {
    id: 'c1-funktionsverbgefuege',
    explanation: `A **Funktionsverbgefüge** (FVG) combines a noun carrying the meaning with a “light” verb (bringen, kommen, nehmen, stellen, stehen, treffen, üben, finden …). They are typical of formal language and often have a simple verb equivalent.

| Funktionsverbgefüge | meaning / simple verb |
|---|---|
| eine Entscheidung treffen | entscheiden |
| in Frage kommen | possible / eligible |
| in Frage stellen | bezweifeln |
| zur Verfügung stellen | bereitstellen |
| zur Verfügung stehen | verfügbar sein |
| Kritik üben (an + D) | kritisieren |
| in Kraft treten | gültig werden |
| zum Ausdruck bringen | ausdrücken |
| zur Sprache bringen / kommen | ansprechen / angesprochen werden |
| in Anspruch nehmen | nutzen, beanspruchen |
| Rücksicht nehmen (auf + A) | berücksichtigen |
| einen Antrag stellen | beantragen |
| Bescheid geben / sagen | informieren |
| auf Kritik stoßen | kritisiert werden |
| zu Ende bringen | beenden |
| Einfluss nehmen (auf + A) | beeinflussen |

> Many come in **active/passive pairs**: *etwas zur Diskussion **stellen*** (put up for discussion) – *zur Diskussion **stehen*** (be up for discussion); *in Gang **setzen*** – *in Gang **kommen***.`,
    examples: [
      { de: 'Wir müssen eine Entscheidung treffen.', en: 'We have to make a decision.' },
      { de: 'Das neue Gesetz tritt im Januar in Kraft.', en: 'The new law comes into force in January.' },
      { de: 'Die Firma stellt Laptops zur Verfügung.', en: 'The company provides laptops.' },
    ],
    exercises: [
      { id: 'c1-funktionsverbgefuege-1', kind: 'fill', prompt: 'Wir müssen bis Freitag eine Entscheidung ___.', answers: ['treffen', 'fällen'], tag: 'fvg', explain: 'eine Entscheidung treffen (formal also: fällen).', feedback: { machen: '„eine Entscheidung machen“ is an anglicism; German: treffen.' } },
      { id: 'c1-funktionsverbgefuege-2', kind: 'choice', prompt: 'Der Kandidat kommt für die Stelle nicht in ___.', options: ['Frage', 'Kraft', 'Gang', 'Ordnung'], tag: 'fvg', explain: 'in Frage kommen = be possible / eligible (synonym: in Betracht kommen).', why: ['in Kraft treten is used for laws and rules.', 'in Gang kommen = get going.', 'in Ordnung kommen = be sorted out.'] },
      { id: 'c1-funktionsverbgefuege-3', kind: 'transform', instruction: 'Replace the verb with a Funktionsverbgefüge (Kritik …).', source: 'Die Opposition kritisierte den Plan scharf.', answers: ['Die Opposition übte scharfe Kritik an dem Plan.', 'Die Opposition übte scharfe Kritik am Plan.'], tag: 'fvg', explain: 'kritisieren → Kritik üben an + dative.', feedback: [['kritik machte', 'The verb is üben: Kritik üben.'], ['kritik an den plan', 'Kritik üben an + dative: an dem (am) Plan.']] },
      { id: 'c1-funktionsverbgefuege-4', kind: 'fill', prompt: 'Das Gesetz tritt am 1. Januar in ___.', answers: ['Kraft'], tag: 'fvg', explain: 'in Kraft treten = come into force.' },
      { id: 'c1-funktionsverbgefuege-5', kind: 'choice', prompt: 'Die Frage ___ in der Sitzung nicht zur Sprache.', options: ['kam', 'brachte', 'stellte', 'nahm'], tag: 'fvg', explain: 'zur Sprache kommen (intransitive) – etwas zur Sprache bringen (transitive).', why: ['bringen needs an object: Er brachte die Frage zur Sprache.', 'stellen doesn’t combine with zur Sprache.', 'nehmen doesn’t combine with zur Sprache.'] },
      { id: 'c1-funktionsverbgefuege-6', kind: 'transform', instruction: 'Replace with a simple verb.', source: 'Er hat einen Antrag auf Elterngeld gestellt.', answers: ['Er hat Elterngeld beantragt.'], tag: 'fvg', explain: 'einen Antrag stellen auf → beantragen.' },
      { id: 'c1-funktionsverbgefuege-7', kind: 'fill', prompt: 'Bitte nehmen Sie ___ auf die anderen Gäste.', answers: ['Rücksicht'], tag: 'fvg', explain: 'Rücksicht nehmen auf + accusative.' },
      { id: 'c1-funktionsverbgefuege-8', kind: 'choice', prompt: 'Die Firma ___ ihren Mitarbeitern einen Dienstwagen zur Verfügung.', options: ['stellt', 'steht', 'bringt', 'gibt'], tag: 'fvg', explain: 'etwas zur Verfügung stellen (provide) – zur Verfügung stehen (be available).', why: ['stehen is intransitive: Ein Wagen steht zur Verfügung.', 'bringen doesn’t combine with zur Verfügung.', 'geben doesn’t combine with zur Verfügung.'] },
    ],
  },
  {
    id: 'c1-partizipialattribute',
    explanation: `An **extended participle attribute** puts a whole relative clause *before* the noun — very common in written German (news, science, law).

*die Maßnahmen, die von der Regierung beschlossen wurden*
→ *die **von der Regierung beschlossenen** Maßnahmen*

*der Zug, der gerade auf Gleis 3 einfährt*
→ *der **gerade auf Gleis 3 einfahrende** Zug*

**Reading strategy**: when an article is followed by something that isn’t a noun (*die von …, der seit …*), jump to the **noun** (the end of the phrase), then read the participle, then the details in between.

**Building one**:
1. Relative-clause verb → participle (Partizip I for active/ongoing, Partizip II for passive/completed).
2. Put the participle directly before the noun, with an adjective ending.
3. Move everything else between article and participle (in the same order).
4. The relative pronoun and the auxiliary disappear.`,
    examples: [
      { de: 'Die im letzten Jahr gestiegenen Preise belasten viele Familien.', en: 'The prices that rose last year are a burden for many families.' },
      { de: 'Der seit Wochen erwartete Bericht ist endlich da.', en: 'The report that has been expected for weeks is finally here.' },
      { de: 'Wir suchen eine gut Deutsch sprechende Mitarbeiterin.', en: 'We are looking for an employee who speaks good German.' },
    ],
    exercises: [
      { id: 'c1-partizipialattribute-1', kind: 'transform', instruction: 'Turn the relative clause into a participle attribute.', source: 'die Häuser, die nach dem Krieg gebaut wurden', answers: ['die nach dem Krieg gebauten Häuser'], tag: 'participle-attr', explain: 'Passive → Partizip II; plural after die → -en.', feedback: [['gebaute häuser', 'After die (plural) the ending is -en: gebauten.'], ['gebauten nach', 'Additions stand between article and participle: die nach dem Krieg gebauten Häuser.']] },
      { id: 'c1-partizipialattribute-2', kind: 'transform', instruction: 'Turn the relative clause into a participle attribute.', source: 'das Kind, das im Garten spielt', answers: ['das im Garten spielende Kind'], tag: 'participle-attr', explain: 'Active and ongoing → Partizip I: spielend + -e after das.', feedback: [['gespielte', 'The child is playing (active) → Partizip I: spielende.']] },
      { id: 'c1-partizipialattribute-3', kind: 'transform', instruction: 'Resolve the attribute into a relative clause.', source: 'der von allen bewunderte Künstler', answers: ['der Künstler, der von allen bewundert wird', 'der Künstler, der von allen bewundert wurde'], tag: 'participle-attr', explain: 'Partizip II = passive: der Künstler, der von allen bewundert wird.' },
      { id: 'c1-partizipialattribute-4', kind: 'choice', prompt: 'Die ___ Studie wurde viel diskutiert.', options: ['im März veröffentlichte', 'im März veröffentlichende', 'veröffentlichte im März', 'im März veröffentlicht'], tag: 'participle-attr', explain: 'Published (passive, completed) → Partizip II with ending -e: die im März veröffentlichte Studie.', why: ['Partizip I would mean the study is publishing something.', 'Additions come before the participle.', 'An attribute needs an ending: veröffentlichte.'] },
      { id: 'c1-partizipialattribute-5', kind: 'fill', prompt: 'der seit Jahren ___ Streit (der Streit, der seit Jahren andauert)', answers: ['andauernde'], tag: 'participle-attr', explain: 'Ongoing → Partizip I: andauernd + -e: der andauernde Streit.' },
      { id: 'c1-partizipialattribute-6', kind: 'correct', sentence: 'Die vom Minister angekündigte Reformen wurden verschoben.', answers: ['Die vom Minister angekündigten Reformen wurden verschoben.'], tag: 'adj.ending', explain: 'Plural after die: -en → angekündigten.' },
      { id: 'c1-partizipialattribute-7', kind: 'choice', prompt: '„Die in Berlin lebende Autorin“ bedeutet:', options: ['die Autorin, die in Berlin lebt', 'die Autorin, die in Berlin gelebt hat', 'die Autorin, die in Berlin leben soll', 'die Autorin, über die man in Berlin spricht'], tag: 'participle-attr', explain: 'Partizip I = simultaneous/ongoing: who lives in Berlin.', why: ['That would be Partizip II (gelebt).', 'That would need sollen.', 'Not expressed by the participle.'] },
      { id: 'c1-partizipialattribute-8', kind: 'transform', instruction: 'Turn the relative clause into a participle attribute.', source: 'die Kosten, die stark gestiegen sind', answers: ['die stark gestiegenen Kosten'], tag: 'participle-attr', explain: 'sein-verb, completed → Partizip II: die stark gestiegenen Kosten.' },
    ],
  },
  {
    id: 'c1-passiv-varianten',
    explanation: `**Agent: von or durch?**
- **von** + dative for the **acting person or institution**: *Das Bild wurde **von** Picasso gemalt.*
- **durch** + accusative for the **means, cause or intermediary**: *Die Stadt wurde **durch** ein Erdbeben zerstört.* · *Ich wurde **durch** einen Anruf geweckt.*

**Impersonal passive** — verbs without an accusative object can still be passive, with no subject (*es* only in position 1):
*Hier **wird** nicht **geraucht**.* · ***Es wird** viel **gelacht**.* · *Am Wochenende **wird** nicht **gearbeitet**.*

**Passive with dative verbs**: the dative stays dative — no subject: *Mir **wurde geholfen**.* (not *Ich wurde geholfen*)

**bekommen-Passiv** (spoken): the receiver becomes the subject: *Ich **bekam** ein Buch **geschenkt**.* (= Mir wurde ein Buch geschenkt.)

**Passive in subordinate clauses**: the auxiliary goes last: *…, weil das Haus renoviert **wird** / renoviert **worden ist** / renoviert werden **muss**.*`,
    examples: [
      { de: 'Ihm wurde sofort geholfen.', en: 'He was helped immediately.' },
      { de: 'Der Schaden wurde durch einen Sturm verursacht.', en: 'The damage was caused by a storm.' },
      { de: 'Bei uns wird viel diskutiert.', en: 'We discuss a lot.' },
    ],
    exercises: [
      { id: 'c1-passiv-varianten-1', kind: 'choice', prompt: 'Das Fenster wurde ___ den Sturm beschädigt.', options: ['durch', 'von', 'mit', 'bei'], tag: 'voice.passive', explain: 'den Sturm (accusative) is a cause → durch.', why: ['von would need the dative (vom Sturm) and is for actors.', 'mit is for instruments used by someone.', 'bei doesn’t express a cause in the passive.'] },
      { id: 'c1-passiv-varianten-2', kind: 'transform', instruction: 'Rewrite in the passive.', source: 'Man hilft den Flüchtlingen.', answers: ['Den Flüchtlingen wird geholfen.'], tag: 'voice.passive', explain: 'helfen takes the dative → no subject in the passive: Den Flüchtlingen wird geholfen.', feedback: [['die flüchtlinge werden', 'helfen takes the dative — the dative remains: Den Flüchtlingen wird geholfen.'], ['werden geholfen', 'Without a subject the verb is singular: wird geholfen.']] },
      { id: 'c1-passiv-varianten-3', kind: 'correct', sentence: 'Ich wurde von meinem Nachbarn geholfen.', answers: ['Mir wurde von meinem Nachbarn geholfen.'], tag: 'voice.passive', explain: 'helfen + dative: Mir wurde geholfen.' },
      { id: 'c1-passiv-varianten-4', kind: 'fill', prompt: 'In unserer Familie ___ am Wochenende lange gefrühstückt.', answers: ['wird'], tag: 'voice.passive', explain: 'Impersonal passive: wird gefrühstückt.' },
      { id: 'c1-passiv-varianten-5', kind: 'transform', instruction: 'Use the bekommen-Passiv.', source: 'Man schenkte ihr zum Geburtstag ein Fahrrad.', answers: ['Sie bekam zum Geburtstag ein Fahrrad geschenkt.', 'Sie hat zum Geburtstag ein Fahrrad geschenkt bekommen.'], tag: 'voice.passive', explain: 'The receiver becomes the subject: Sie bekam … geschenkt.' },
      { id: 'c1-passiv-varianten-6', kind: 'choice', prompt: 'Ich weiß nicht, ob das Problem schon ___.', options: ['gelöst worden ist', 'gelöst ist worden', 'ist gelöst worden', 'worden gelöst ist'], tag: 'voice.passive', explain: 'In a subordinate clause the conjugated auxiliary comes last: gelöst worden ist.', why: ['The conjugated verb (ist) must be last.', 'That is main-clause order.', 'Participle first, then worden, then ist.'] },
      { id: 'c1-passiv-varianten-7', kind: 'fill', prompt: 'Der Roman wurde ___ einer jungen Autorin geschrieben.', answers: ['von'], tag: 'voice.passive', explain: 'The acting person: von + dative.' },
      { id: 'c1-passiv-varianten-8', kind: 'transform', instruction: 'Rewrite as an impersonal passive starting with „Es“.', source: 'Auf der Party tanzten alle bis Mitternacht.', answers: ['Es wurde auf der Party bis Mitternacht getanzt.', 'Es wurde bis Mitternacht auf der Party getanzt.'], tag: 'voice.passive', explain: 'Es wurde … getanzt (es only in position 1).' },
    ],
  },
  {
    id: 'c1-modalpartikeln',
    explanation: `Beyond the basics (doch, ja, mal, denn, eben/halt), these particles add precise nuances:

| particle | function | example |
|---|---|---|
| **wohl** | assumption; in questions: doubt | *Er wird **wohl** krank sein.* · *Ob das **wohl** stimmt?* |
| **schon** | reassurance; concession (“admittedly”) | *Das klappt **schon**.* · *Das ist **schon** richtig, aber …* |
| **eigentlich** | “by the way / actually” — softens a question or topic change | *Wie heißt du **eigentlich**?* |
| **ruhig** | permission, encouragement | *Du kannst **ruhig** fragen.* |
| **bloß / nur** | warning; urgent wish | *Mach das **bloß** nicht!* · *Wenn er **nur** käme!* |
| **etwa** | yes/no questions hoping for “no” | *Hast du **etwa** mein Handy genommen?* |
| **denn** | questions: interest, reproach | *Warum hast du **denn** nicht angerufen?* |
| **ja** (stressed) | threat/warning in imperatives | *Komm **ja** nicht zu spät!* |
| **doch** (stressed) | contradicting | *Das stimmt **doch**!* |

Particles are unstressed (unless marked) and usually stand after the conjugated verb and pronouns.`,
    examples: [
      { de: 'Setz dich ruhig, ich mache das schon.', en: 'Feel free to sit down, I’ll take care of it.' },
      { de: 'Was machst du eigentlich beruflich?', en: 'By the way, what do you do for a living?' },
      { de: 'Lass bloß die Finger davon!', en: 'Don’t you dare touch that!' },
    ],
    exercises: [
      { id: 'c1-modalpartikeln-1', kind: 'choice', prompt: '(Erlaubnis) Du kannst ___ das Fenster aufmachen, wenn dir warm ist.', options: ['ruhig', 'etwa', 'bloß', 'denn'], tag: 'modal-particle', explain: 'ruhig = go ahead, feel free.', why: ['etwa is used in questions expecting “no”.', 'bloß warns or intensifies wishes.', 'denn is used in questions.'] },
      { id: 'c1-modalpartikeln-2', kind: 'choice', prompt: '(befürchtete Antwort) Hast du ___ schon wieder kein Geld?', options: ['etwa', 'ruhig', 'schon', 'halt'], tag: 'modal-particle', explain: 'etwa: the speaker hopes it is not so.', why: ['ruhig expresses permission.', 'schon reassures.', 'halt expresses resignation.'] },
      { id: 'c1-modalpartikeln-3', kind: 'fill', prompt: '(Themenwechsel) Wo wohnst du ___?', answers: ['eigentlich', 'denn'], tag: 'modal-particle', explain: 'eigentlich softens a question that changes the topic.' },
      { id: 'c1-modalpartikeln-4', kind: 'choice', prompt: '(Warnung) Fahr ___ vorsichtig, die Straßen sind glatt!', options: ['bloß', 'eigentlich', 'etwa', 'wohl'], tag: 'modal-particle', explain: 'bloß/nur in imperatives: urgent warning.', why: ['eigentlich doesn’t fit an urgent warning.', 'etwa is for questions.', 'wohl expresses an assumption.'] },
      { id: 'c1-modalpartikeln-5', kind: 'choice', prompt: '„Das ist schon richtig, aber …“ – schon bedeutet hier:', options: ['zugegeben', 'bereits', 'endlich', 'vielleicht'], tag: 'modal-particle', explain: 'Concessive schon = admittedly (before aber).', why: ['Temporal schon (already) doesn’t fit here.', 'endlich = finally.', 'vielleicht = maybe.'] },
      { id: 'c1-modalpartikeln-6', kind: 'fill', prompt: '(Wunsch) Wenn er ___ endlich anrufen würde!', answers: ['nur', 'bloß', 'doch'], tag: 'modal-particle', explain: 'Unreal wish intensified with nur/bloß/doch.' },
      { id: 'c1-modalpartikeln-7', kind: 'choice', prompt: '(Zweifel, Selbstgespräch) Ob er ___ noch kommt?', options: ['wohl', 'ruhig', 'mal', 'bloß'], tag: 'modal-particle', explain: 'wohl in self-directed questions: I wonder whether …', why: ['ruhig expresses permission.', 'mal softens requests.', 'bloß intensifies warnings/wishes.'] },
      { id: 'c1-modalpartikeln-8', kind: 'choice', prompt: '„Warum hast du denn nichts gesagt?“ klingt eher:', options: ['vorwurfsvoll', 'gleichgültig', 'begeistert', 'erleichtert'], tag: 'modal-particle', explain: 'denn in a why-question often carries a reproach.', why: ['The particle shows involvement, not indifference.', 'Nothing enthusiastic here.', 'Relief would be phrased differently.'] },
    ],
  },
  {
    id: 'c1-konnektoren',
    explanation: `Connectors structure arguments and give texts **cohesion**. Note the word order each one requires.

| function | subordinating (verb last) | adverb (verb next) |
|---|---|---|
| additional reason | **zumal** (especially since) | — |
| restriction | **insofern als**, **soweit**, **sofern** | **insofern** |
| contrast | **wohingegen**, **während** | **dagegen, hingegen, jedoch** |
| concession | **obgleich, wenngleich** | **allerdings, dennoch** |
| consequence | **sodass** | **folglich, demzufolge, infolgedessen, somit** |
| condition | **vorausgesetzt, dass** · **es sei denn** | |

- *Ich bleibe zu Hause, **zumal** ich erkältet bin.*
- *Er liebt den Sommer, **wohingegen** sie den Winter vorzieht.*
- *Die Kosten stiegen; **folglich** wurde das Projekt gestoppt.*
- ***Allerdings** gibt es ein Problem.* (= however, admittedly)
- *Wir fahren morgen los, **es sei denn**, es regnet.*

> **jedoch** can stand in position 1 (verb next) or in the middle field: *Er war müde; er arbeitete **jedoch** weiter.*`,
    examples: [
      { de: 'Das Angebot ist interessant, zumal der Preis stimmt.', en: 'The offer is interesting, especially since the price is right.' },
      { de: 'Die Nachfrage sank. Folglich wurden die Preise gesenkt.', en: 'Demand fell. Consequently prices were reduced.' },
      { de: 'Die Idee ist gut. Allerdings fehlt das Geld.', en: 'The idea is good. However, there is no money.' },
    ],
    exercises: [
      { id: 'c1-konnektoren-1', kind: 'fill', prompt: 'Ich nehme das Angebot an, ___ die Bezahlung gut ist.', answers: ['zumal'], tag: 'connector', explain: 'An additional, strong reason: zumal (+ verb at the end).' },
      { id: 'c1-konnektoren-2', kind: 'choice', prompt: 'Die Gewinne sind gesunken; ___ müssen Stellen abgebaut werden.', options: ['folglich', 'zumal', 'wohingegen', 'obgleich'], tag: 'connector', explain: 'Consequence with verb next: folglich.', why: ['zumal gives a reason and sends the verb to the end.', 'wohingegen expresses contrast and sends the verb to the end.', 'obgleich is concessive and sends the verb to the end.'] },
      { id: 'c1-konnektoren-3', kind: 'transform', instruction: 'Connect with wohingegen.', source: 'Mein Bruder liebt Sport. Ich lese lieber.', answers: ['Mein Bruder liebt Sport, wohingegen ich lieber lese.'], tag: 'connector', explain: 'wohingegen + verb at the end.', feedback: [['wohingegen ich lese lieber', 'wohingegen sends the verb to the end: wohingegen ich lieber lese.']] },
      { id: 'c1-konnektoren-4', kind: 'choice', prompt: 'Wir gehen wandern, ___ es regnet.', options: ['es sei denn', 'zumal', 'folglich', 'insofern'], tag: 'connector', explain: 'unless: es sei denn (+ main-clause order).', why: ['zumal gives an additional reason — doesn’t fit rain.', 'folglich is a consequence adverb.', 'insofern restricts a statement.'] },
      { id: 'c1-konnektoren-5', kind: 'fill', prompt: 'Der Plan ist gut. ___ ist er sehr teuer.', hint: 'however', answers: ['Allerdings', 'Jedoch', 'Aber'], tag: 'connector', explain: 'Restricting contrast in position 1: Allerdings ist er … (verb next).' },
      { id: 'c1-konnektoren-6', kind: 'correct', sentence: 'Die Reise war schön, zumal das Wetter war perfekt.', answers: ['Die Reise war schön, zumal das Wetter perfekt war.'], tag: 'order.verb-final', explain: 'zumal is subordinating: verb at the end.' },
      { id: 'c1-konnektoren-7', kind: 'choice', prompt: 'Das stimmt nur ___, als es um kleine Firmen geht.', options: ['insofern', 'zumal', 'sofern', 'somit'], tag: 'connector', explain: 'insofern … als = only to the extent that.', why: ['zumal doesn’t pair with als.', 'sofern doesn’t pair with als.', 'somit is a consequence adverb.'] },
      { id: 'c1-konnektoren-8', kind: 'order', words: ['Es', 'regnete', 'stark;', 'infolgedessen', 'wurde', 'das Spiel', 'abgesagt'], tag: 'connector', explain: 'Adverb in position 1 → verb next.' },
    ],
  },
  {
    id: 'c1-irreale-vergleiche',
    explanation: `An **unreal comparison** describes how something seems — but isn’t (or might not be) so. It uses the **Konjunktiv II** (in formal writing also Konjunktiv I).

| connector | word order | example |
|---|---|---|
| **als ob / als wenn** | verb at the end | *Er tut so, **als ob** er nichts **wüsste**.* |
| **als** | verb directly after als | *Er tut so, **als wüsste** er nichts.* |

Past: *Sie sah mich an, als **hätte** sie einen Geist **gesehen**.*

Typical main clauses: *so tun, als ob · aussehen, als ob · klingen, als ob · sich fühlen, als ob · es kommt mir vor, als ob*.

> In everyday speech you will also hear the indicative after *als ob* (*als ob er nichts weiß*) — in writing, prefer the Konjunktiv.`,
    examples: [
      { de: 'Es sieht aus, als würde es gleich regnen.', en: 'It looks as if it’s about to rain.' },
      { de: 'Er redet, als ob er der Chef wäre.', en: 'He talks as if he were the boss.' },
      { de: 'Mir ist, als hätte ich ihn schon einmal gesehen.', en: 'I feel as if I had seen him before.' },
    ],
    exercises: [
      { id: 'c1-irreale-vergleiche-1', kind: 'fill', prompt: 'Er tut so, als ob er krank ___.', hint: 'sein', answers: ['wäre', 'sei'], tag: 'irreal-comparison', explain: 'als ob + Konjunktiv II (or Konj. I in writing), verb at the end.', feedback: { ist: 'In writing use the Konjunktiv: als ob er krank wäre.' } },
      { id: 'c1-irreale-vergleiche-2', kind: 'transform', instruction: 'Rewrite with „als“ (without ob).', source: 'Sie lacht, als ob nichts passiert wäre.', answers: ['Sie lacht, als wäre nichts passiert.'], tag: 'irreal-comparison', explain: 'als + verb directly after: als wäre nichts passiert.', feedback: [['als nichts', 'Without ob, the verb follows als directly: als wäre …']] },
      { id: 'c1-irreale-vergleiche-3', kind: 'choice', prompt: 'Du siehst aus, als ___ du die ganze Nacht nicht geschlafen.', options: ['hättest', 'hast', 'würdest', 'wärst'], tag: 'irreal-comparison', explain: 'Unreal past after als: hättest … geschlafen.', why: ['After als (without ob) we need the Konjunktiv, verb first.', 'würdest … geschlafen is not a correct form.', 'schlafen takes haben.'] },
      { id: 'c1-irreale-vergleiche-4', kind: 'correct', sentence: 'Er spricht, als ob er wäre Experte.', answers: ['Er spricht, als ob er Experte wäre.', 'Er spricht, als wäre er Experte.'], tag: 'irreal-comparison', explain: 'als ob → verb at the end; als → verb directly after.' },
      { id: 'c1-irreale-vergleiche-5', kind: 'fill', prompt: 'Es kommt mir vor, als ___ ich hier schon einmal gewesen.', answers: ['wäre', 'sei'], tag: 'irreal-comparison', explain: 'als + Konjunktiv, verb directly after: als wäre ich …' },
      { id: 'c1-irreale-vergleiche-6', kind: 'choice', prompt: 'Welcher Satz ist korrekt?', options: ['Er tut, als hätte er nichts gehört.', 'Er tut, als er hätte nichts gehört.', 'Er tut, als ob hätte er nichts gehört.', 'Er tut, als ob er nichts gehört.'], tag: 'irreal-comparison', explain: 'als + verb first: als hätte er nichts gehört.', why: ['After als (without ob) the verb comes first.', 'After als ob the verb goes to the end.', 'The auxiliary (hätte) is missing.'] },
      { id: 'c1-irreale-vergleiche-7', kind: 'transform', instruction: 'Rewrite with als ob.', source: 'Das Wasser ist so kalt, als käme es direkt vom Gletscher.', answers: ['Das Wasser ist so kalt, als ob es direkt vom Gletscher käme.', 'Das Wasser ist so kalt, als ob es direkt vom Gletscher kommen würde.'], tag: 'irreal-comparison', explain: 'als ob → verb at the end: als ob es … käme.' },
      { id: 'c1-irreale-vergleiche-8', kind: 'fill', prompt: 'Der Himmel ist so dunkel, als ___ es gleich ein Gewitter geben.', answers: ['würde', 'werde'], tag: 'irreal-comparison', explain: 'als würde es … geben (Konjunktiv II with würde).' },
    ],
  },
  {
    id: 'c1-rektion',
    explanation: `Not only verbs — many **nouns and adjectives** also have fixed prepositions (**Rektion**). Noun and verb often share the preposition:

| verb | noun | adjective |
|---|---|---|
| sich interessieren **für** | das Interesse **an** + D (!) | interessiert **an** + D |
| Angst haben **vor** + D | die Angst **vor** + D | ängstlich |
| sich freuen **über/auf** + A | die Freude **über/auf** + A | froh **über** + A |
| sich auseinandersetzen **mit** | die Auseinandersetzung **mit** | — |
| abhängen **von** | die Abhängigkeit **von** | abhängig **von** |
| sich beschäftigen **mit** | die Beschäftigung **mit** | beschäftigt **mit** |
| — | der Stolz | stolz **auf** + A |
| — | die Bereitschaft **zu** | bereit **zu** |
| — | die Zufriedenheit | zufrieden **mit** |
| — | — | begeistert **von** |
| sich erinnern **an** + A | die Erinnerung **an** + A | — |
| teilnehmen **an** + D | die Teilnahme **an** + D | — |

> Careful: *sich interessieren **für*** but *das Interesse **an***.`,
    examples: [
      { de: 'Sie hat großes Interesse an Kunst.', en: 'She is very interested in art.' },
      { de: 'Wir sind stolz auf unsere Tochter.', en: 'We are proud of our daughter.' },
      { de: 'Die Teilnahme an der Konferenz ist kostenlos.', en: 'Participation in the conference is free.' },
    ],
    exercises: [
      { id: 'c1-rektion-1', kind: 'fill', prompt: 'Er hat kein Interesse ___ Politik.', answers: ['an'], tag: 'verb.prep', explain: 'das Interesse an + dative (verb: sich interessieren für).', feedback: { für: 'The noun takes an: Interesse an.' } },
      { id: 'c1-rektion-2', kind: 'choice', prompt: 'Die Kinder sind ganz begeistert ___ dem Zirkus.', options: ['von', 'über', 'für', 'an'], tag: 'verb.prep', explain: 'begeistert von + dative.', why: ['begeistert takes von.', 'begeistert takes von.', 'begeistert takes von.'] },
      { id: 'c1-rektion-3', kind: 'fill', prompt: 'Unser Erfolg ist abhängig ___ der Unterstützung der Stadt.', answers: ['von'], tag: 'verb.prep', explain: 'abhängig von + dative.' },
      { id: 'c1-rektion-4', kind: 'choice', prompt: 'Die Auseinandersetzung ___ dem Thema war spannend.', options: ['mit', 'über', 'an', 'zu'], tag: 'verb.prep', explain: 'die Auseinandersetzung mit (verb: sich auseinandersetzen mit).', why: ['The noun keeps the verb’s preposition: mit.', 'The noun keeps the verb’s preposition: mit.', 'The noun keeps the verb’s preposition: mit.'] },
      { id: 'c1-rektion-5', kind: 'fill', prompt: 'Sind Sie bereit ___ einem Kompromiss?', answers: ['zu'], tag: 'verb.prep', explain: 'bereit zu + dative.' },
      { id: 'c1-rektion-6', kind: 'correct', sentence: 'Ich bin sehr zufrieden über das Ergebnis.', answers: ['Ich bin sehr zufrieden mit dem Ergebnis.'], tag: 'verb.prep', explain: 'zufrieden mit + dative.' },
      { id: 'c1-rektion-7', kind: 'fill', prompt: 'Die Erinnerung ___ diesen Tag macht mich glücklich.', answers: ['an'], tag: 'verb.prep', explain: 'die Erinnerung an + accusative.' },
      { id: 'c1-rektion-8', kind: 'choice', prompt: 'Sie ist stolz ___ ihre Leistung.', options: ['auf', 'über', 'von', 'für'], tag: 'verb.prep', explain: 'stolz auf + accusative.', why: ['stolz takes auf.', 'stolz takes auf.', 'stolz takes auf.'] },
    ],
  },
  {
    id: 'c1-wortbildung',
    explanation: `Recognising word-formation patterns lets you understand (and build) thousands of words.

**Noun suffixes**
| suffix | gender | from | example |
|---|---|---|---|
| -ung | die | verbs | die Lösung, die Erfahrung |
| -heit / -keit | die | adjectives | die Freiheit, die Möglichkeit |
| -schaft | die | nouns | die Freundschaft, die Wissenschaft |
| -nis | die/das | verbs/adj. | das Ergebnis, die Erlaubnis |
| -er / -erin | der / die | verbs | der Lehrer, die Fahrerin |

**Adjective suffixes**
| suffix | meaning | example |
|---|---|---|
| -bar | can be done | lösbar, essbar |
| -lich | relating to / can be | ärztlich, verständlich |
| -los | without | arbeitslos, hilflos |
| -voll | full of | wertvoll, sinnvoll |
| -ig | having | ruhig, durstig |
| -haft | like | kindhaft, fehlerhaft |

**Prefixes**: **un-** (not: unklar), **miss-** (wrongly: missverstehen), **ver-** (often wrong/away: sich verlaufen, verschlafen), **ent-** (removal: entfernen), **zer-** (to pieces: zerbrechen), **über-** (too much/across: übertreiben).`,
    examples: [
      { de: 'Die Lösung ist leider nicht umsetzbar.', en: 'Unfortunately the solution can’t be implemented.' },
      { de: 'Er hat mich missverstanden.', en: 'He misunderstood me.' },
      { de: 'Ein sinnvoller Vorschlag!', en: 'A sensible suggestion!' },
    ],
    exercises: [
      { id: 'c1-wortbildung-1', kind: 'fill', prompt: 'möglich → die ___', answers: ['Möglichkeit'], tag: 'lexis.word-formation', explain: 'Adjectives in -lich take -keit: die Möglichkeit.', feedback: { möglichheit: 'After -lich the suffix is -keit.' } },
      { id: 'c1-wortbildung-2', kind: 'choice', prompt: 'Ohne Arbeit = ___', options: ['arbeitslos', 'arbeitsvoll', 'arbeitsbar', 'unarbeitlich'], tag: 'lexis.word-formation', explain: '-los = without: arbeitslos.', why: ['-voll = full of.', '-bar = can be done.', 'This word doesn’t exist.'] },
      { id: 'c1-wortbildung-3', kind: 'fill', prompt: 'Das Wasser kann man trinken. Es ist ___.', answers: ['trinkbar'], tag: 'lexis.word-formation', explain: '-bar = can be done: trinkbar.' },
      { id: 'c1-wortbildung-4', kind: 'choice', prompt: 'Ich habe dich falsch verstanden. = Ich habe dich ___.', options: ['missverstanden', 'unverstanden', 'zerverstanden', 'entverstanden'], tag: 'lexis.word-formation', explain: 'miss- = wrongly: missverstehen.', why: ['unverstanden means “not understood” (adjective).', 'zer- means “to pieces”.', 'ent- means removal.'] },
      { id: 'c1-wortbildung-5', kind: 'fill', prompt: 'frei → die ___', answers: ['Freiheit'], tag: 'lexis.word-formation', explain: 'Adjective + -heit: die Freiheit.' },
      { id: 'c1-wortbildung-6', kind: 'choice', prompt: 'Die Vase fiel herunter und ___.', options: ['zerbrach', 'entbrach', 'verbrach', 'missbrach'], tag: 'lexis.word-formation', explain: 'zer- = into pieces: zerbrechen.', why: ['ent- doesn’t combine with brechen.', 'verbrechen = to commit a crime.', 'This word doesn’t exist.'] },
      { id: 'c1-wortbildung-7', kind: 'fill', prompt: 'Das ist ein Vorschlag mit viel Sinn – ein ___ Vorschlag.', answers: ['sinnvoller'], tag: 'lexis.word-formation', explain: '-voll = full of: sinnvoll; masculine after ein: sinnvoller.' },
      { id: 'c1-wortbildung-8', kind: 'choice', prompt: 'ergeben → das ___', options: ['Ergebnis', 'Ergebung', 'Ergebheit', 'Ergebschaft'], tag: 'lexis.word-formation', explain: 'das Ergebnis (result).', why: ['Ergebung means submission/surrender.', 'This word doesn’t exist.', 'This word doesn’t exist.'] },
    ],
  },
  {
    id: 'c1-sollen-wollen',
    explanation: `**sollen** and **wollen** can report **claims** (subjective meaning):

| | meaning | example |
|---|---|---|
| **sollen** | **others say** that … (hearsay) | *Der Film **soll** sehr gut sein.* (People say the film is very good.) |
| **wollen** | the **subject claims** that … (often doubtful) | *Er **will** den Täter gesehen haben.* (He claims to have seen the culprit.) |

Past: modal + participle + haben/sein:
*Sie **soll** im Lotto gewonnen **haben**.* · *Er **will** gestern zu Hause gewesen **sein**.*

> Compare with the objective meaning: *Ich soll um 8 kommen* (I’m supposed to) · *Ich will um 8 kommen* (I want to). The perfect infinitive (… gewonnen haben) almost always signals the subjective meaning.`,
    examples: [
      { de: 'Das Restaurant soll ausgezeichnet sein.', en: 'The restaurant is said to be excellent.' },
      { de: 'Sie will nichts davon gewusst haben.', en: 'She claims not to have known anything about it.' },
      { de: 'Der Politiker soll Geld angenommen haben.', en: 'The politician is alleged to have accepted money.' },
    ],
    exercises: [
      { id: 'c1-sollen-wollen-1', kind: 'transform', instruction: 'Use sollen (hearsay).', source: 'Man sagt, dass das Hotel sehr teuer ist.', answers: ['Das Hotel soll sehr teuer sein.'], tag: 'modal.subjective', explain: 'man sagt, dass … → soll + infinitive.', feedback: [['will', 'Others say it → sollen.']] },
      { id: 'c1-sollen-wollen-2', kind: 'transform', instruction: 'Use wollen (the subject’s own claim).', source: 'Er behauptet, dass er die ganze Nacht gearbeitet hat.', answers: ['Er will die ganze Nacht gearbeitet haben.'], tag: 'modal.subjective', explain: 'He claims (himself) → wollen + perfect infinitive.', feedback: [['soll', 'He claims it himself → wollen.'], ['gearbeitet hat', 'After a modal: infinitive form → gearbeitet haben.']] },
      { id: 'c1-sollen-wollen-3', kind: 'choice', prompt: 'Laut Zeitung ___ der Minister zurücktreten.', options: ['soll', 'will', 'muss', 'darf'], tag: 'modal.subjective', explain: 'The newspaper reports it → sollen (hearsay).', why: ['wollen would be the minister’s own intention or claim.', 'müssen = obligation / certainty.', 'dürfen = permission.'] },
      { id: 'c1-sollen-wollen-4', kind: 'fill', prompt: 'Der Angeklagte ___ zur Tatzeit im Kino gewesen sein. (Er behauptet es.)', answers: ['will'], tag: 'modal.subjective', explain: 'The subject’s own (doubtful) claim: will.' },
      { id: 'c1-sollen-wollen-5', kind: 'choice', prompt: '„Sie soll sehr reich sein.“ bedeutet:', options: ['Man sagt, dass sie sehr reich ist.', 'Sie behauptet, sehr reich zu sein.', 'Sie muss sehr reich werden.', 'Sie möchte sehr reich sein.'], tag: 'modal.subjective', explain: 'sollen = hearsay.', why: ['That would be wollen.', 'That would be obligation.', 'That would be a wish.'] },
      { id: 'c1-sollen-wollen-6', kind: 'correct', sentence: 'Er will das Geld gefunden hat.', answers: ['Er will das Geld gefunden haben.'], tag: 'modal.subjective', explain: 'After a modal verb: perfect infinitive (gefunden haben).' },
      { id: 'c1-sollen-wollen-7', kind: 'fill', prompt: 'Bei dem Unfall ___ niemand verletzt worden sein. (Das berichtet das Radio.)', answers: ['soll'], tag: 'modal.subjective', explain: 'Reported by others: soll … worden sein.' },
      { id: 'c1-sollen-wollen-8', kind: 'choice', prompt: '„Er will dich gestern gesehen haben.“ Der Sprecher …', options: ['zweifelt eher an der Aussage.', 'ist sicher, dass es stimmt.', 'wünscht sich, dass es stimmt.', 'gibt einen Befehl.'], tag: 'modal.subjective', explain: 'Subjective wollen often expresses doubt about the claim.', why: ['wollen distances the speaker from the claim.', 'No wish is expressed.', 'No order is given.'] },
    ],
  },
];
