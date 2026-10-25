import type { GrammarLesson } from '@/lib/exercise/types';

export const C2_LESSONS: GrammarLesson[] = [
  {
    id: 'c2-konjunktiv1-formell',
    explanation: `Beyond reported speech, the **Konjunktiv I** appears in fixed formal uses:

| use | example |
|---|---|
| **instructions** (recipes, maths, manuals) | *Man **nehme** 200 g Mehl.* · *Gegeben **sei** ein Dreieck ABC.* |
| **wishes, toasts, formulas** | ***Es lebe** die Freiheit!* · ***Gott sei Dank!*** · ***Er ruhe in Frieden.*** |
| **es sei denn** (unless) | *Wir kommen, **es sei denn**, es regnet.* |
| **sei es … sei es** (whether … or) | ***Sei es** aus Neugier, **sei es** aus Langeweile – er las alles.* |
| **concessive** | ***Wie dem auch sei**, …* (be that as it may) · *Was er **auch** sage, …* |

**Distance in reporting** — journalists and academics use Konjunktiv I to mark that they are reporting, not asserting. Choosing Konjunktiv II instead (*Er sagte, er hätte …*) can signal doubt in formal writing.

**Long stretches of reported speech** keep the Konjunktiv I in every clause (no need to repeat *sagte er*):
*Der Sprecher erklärte, man **habe** die Vorwürfe geprüft. Es **gebe** keine Hinweise auf Fehler. Man **werde** jedoch die Abläufe überarbeiten.*`,
    examples: [
      { de: 'Man nehme zwei Eier und verrühre sie mit Zucker.', en: 'Take two eggs and beat them with sugar.' },
      { de: 'Es sei darauf hingewiesen, dass die Frist morgen endet.', en: 'Please note that the deadline ends tomorrow.' },
      { de: 'Wie dem auch sei, wir müssen eine Lösung finden.', en: 'Be that as it may, we have to find a solution.' },
    ],
    exercises: [
      { id: 'c2-konjunktiv1-formell-1', kind: 'fill', prompt: '(Rezept) Man ___ die Zwiebeln in kleine Würfel.', hint: 'schneiden', answers: ['schneide'], tag: 'mood.konj1', explain: 'Instructions with man: Konjunktiv I → man schneide.', feedback: { schneidet: 'Recipes in the classic style use Konjunktiv I: man schneide.' } },
      { id: 'c2-konjunktiv1-formell-2', kind: 'choice', prompt: 'Wir reisen morgen ab, es ___ denn, der Flug wird gestrichen.', options: ['sei', 'wäre', 'ist', 'werde'], tag: 'mood.konj1', explain: 'Fixed formula: es sei denn (unless).', why: ['The formula is es sei denn.', 'The formula is es sei denn.', 'The formula is es sei denn.'] },
      { id: 'c2-konjunktiv1-formell-3', kind: 'transform', instruction: 'Continue the reported speech in Konjunktiv I (without repeating „sagte sie“).', source: 'Die Ministerin sagte: „Wir haben alles geprüft. Es gibt keine Fehler.“', answers: ['Die Ministerin sagte, man habe alles geprüft. Es gebe keine Fehler.', 'Die Ministerin sagte, sie hätten alles geprüft. Es gebe keine Fehler.', 'Die Ministerin sagte, man habe alles geprüft, es gebe keine Fehler.'], tag: 'mood.konj1', explain: 'wir haben → man habe / sie hätten; es gibt → es gebe.', feedback: [['es gibt', 'Keep the Konjunktiv I in every reported sentence: es gebe.']] },
      { id: 'c2-konjunktiv1-formell-4', kind: 'fill', prompt: '___ es aus Pflichtgefühl, sei es aus Überzeugung – sie half allen.', answers: ['Sei'], tag: 'mood.konj1', explain: 'Paired formula: sei es …, sei es … (whether … or).' },
      { id: 'c2-konjunktiv1-formell-5', kind: 'choice', prompt: 'Gegeben ___ eine Gerade g.', options: ['sei', 'ist', 'wäre', 'werde'], tag: 'mood.konj1', explain: 'Mathematical instruction: Gegeben sei …', why: ['In mathematical definitions the Konjunktiv I is used: sei.', 'wäre would make it hypothetical.', 'werde is the future/passive auxiliary.'] },
      { id: 'c2-konjunktiv1-formell-6', kind: 'correct', sentence: 'Es lebt die Freiheit!', answers: ['Es lebe die Freiheit!'], tag: 'mood.konj1', explain: 'Exclamatory wish: Es lebe … (Konjunktiv I).' },
      { id: 'c2-konjunktiv1-formell-7', kind: 'choice', prompt: '„Er sagte, er hätte keine Zeit gehabt“ kann in einem formellen Bericht signalisieren, dass …', options: ['der Berichtende an der Aussage zweifelt.', 'die Aussage sicher stimmt.', 'es sich um eine Bitte handelt.', 'die Aussage in der Zukunft liegt.'], tag: 'mood.konj1', explain: 'Where Konjunktiv I (habe) is available, choosing Konjunktiv II can signal doubt.', why: ['Konjunktiv II marks distance, not certainty.', 'No request is expressed.', 'The time reference is past.'] },
      { id: 'c2-konjunktiv1-formell-8', kind: 'fill', prompt: '___ dem auch sei, wir machen weiter.', answers: ['Wie'], tag: 'mood.konj1', explain: 'Formula: Wie dem auch sei (be that as it may).' },
    ],
  },
  {
    id: 'c2-partizipialsaetze',
    explanation: `A **participle clause** shortens a subordinate clause to a participle phrase — elegant in writing, rare in speech.

| full clause | participle clause |
|---|---|
| Als sie am Bahnhof angekommen war, rief sie an. | **Am Bahnhof angekommen**, rief sie an. |
| Weil er vom Lärm geweckt worden war, stand er auf. | **Vom Lärm geweckt**, stand er auf. |
| Während er leise vor sich hin pfiff, ging er nach Hause. | **Leise vor sich hin pfeifend**, ging er nach Hause. |
| Wenn man es genau nimmt, … | **Genau genommen**, … |

- **Partizip II**: completed or passive (*angekommen, geweckt*).
- **Partizip I**: simultaneous and active (*pfeifend, lächelnd*).
- The (implied) subject must be the **same** as in the main clause.

Fixed participle phrases: *genau genommen, ehrlich gesagt, streng genommen, abgesehen davon, ausgehend von, verglichen mit, zugegeben, so gesehen.*`,
    examples: [
      { de: 'Zu Hause angekommen, legte sie sich sofort hin.', en: 'Having arrived home, she lay down immediately.' },
      { de: 'Ehrlich gesagt, habe ich keine Lust.', en: 'To be honest, I don’t feel like it.' },
      { de: 'Verglichen mit dem Vorjahr sind die Zahlen gestiegen.', en: 'Compared with last year, the figures have risen.' },
    ],
    exercises: [
      { id: 'c2-partizipialsaetze-1', kind: 'transform', instruction: 'Shorten to a participle clause.', source: 'Nachdem er im Hotel angekommen war, rief er seine Frau an.', answers: ['Im Hotel angekommen, rief er seine Frau an.'], tag: 'participle-attr', explain: 'Completed action → Partizip II; the subject and auxiliary disappear.', feedback: [['ankommend', 'The arrival was completed → Partizip II: angekommen.']] },
      { id: 'c2-partizipialsaetze-2', kind: 'fill', prompt: '___ vor Freude, umarmte sie ihre Mutter. (strahlen)', answers: ['Strahlend', 'strahlend'], tag: 'participle-attr', explain: 'Simultaneous and active → Partizip I: strahlend.' },
      { id: 'c2-partizipialsaetze-3', kind: 'choice', prompt: '___ von dem Lärm, konnte er nicht schlafen.', options: ['Gestört', 'Störend', 'Gestörte', 'Zu stören'], tag: 'participle-attr', explain: 'He was disturbed (passive) → Partizip II without ending.', why: ['Partizip I would mean he was disturbing.', 'In a participle clause there is no ending.', 'zu + infinitive doesn’t fit here.'] },
      { id: 'c2-partizipialsaetze-4', kind: 'transform', instruction: 'Expand into a full subordinate clause.', source: 'Streng genommen ist das nicht erlaubt.', answers: ['Wenn man es streng nimmt, ist das nicht erlaubt.', 'Wenn man es genau nimmt, ist das nicht erlaubt.'], tag: 'participle-attr', explain: 'streng genommen = wenn man es streng nimmt.' },
      { id: 'c2-partizipialsaetze-5', kind: 'correct', sentence: 'In Berlin angekommen, regnete es in Strömen.', answers: ['Als wir in Berlin ankamen, regnete es in Strömen.', 'Als ich in Berlin ankam, regnete es in Strömen.', 'Als wir in Berlin angekommen waren, regnete es in Strömen.'], tag: 'participle-attr', explain: 'The participle clause needs the same subject as the main clause — it can’t be “es” (the rain didn’t arrive). Use a full clause.' },
      { id: 'c2-partizipialsaetze-6', kind: 'fill', prompt: '___ vom Wetter, war der Urlaub perfekt. (absehen)', answers: ['Abgesehen', 'abgesehen'], tag: 'participle-attr', explain: 'Fixed phrase: abgesehen von (apart from).' },
      { id: 'c2-partizipialsaetze-7', kind: 'choice', prompt: '___ gesagt, ich finde die Idee nicht gut.', options: ['Ehrlich', 'Ehrlichen', 'Ehrlich sagend', 'Ehrlich zu sagen'], tag: 'participle-attr', explain: 'Fixed phrase: Ehrlich gesagt, …', why: ['The phrase has no ending.', 'The fixed phrase uses the Partizip II.', 'The fixed phrase is ehrlich gesagt.'] },
      { id: 'c2-partizipialsaetze-8', kind: 'transform', instruction: 'Shorten to a participle clause.', source: 'Während sie leise ein Lied summte, räumte sie die Küche auf.', answers: ['Leise ein Lied summend, räumte sie die Küche auf.'], tag: 'participle-attr', explain: 'Simultaneous → Partizip I: summend.' },
    ],
  },
  {
    id: 'c2-funktionsverbgefuege',
    explanation: `At C2 the key is choosing the right **light verb** — many Funktionsverbgefüge form **pairs** that differ in perspective:

| active / causative (transitive) | passive / resulting state (intransitive) |
|---|---|
| etwas **zur Diskussion stellen** | **zur Diskussion stehen** |
| etwas **in Gang setzen / bringen** | **in Gang kommen** |
| etwas **zum Abschluss bringen** | **zum Abschluss kommen** |
| jemanden **in Verlegenheit bringen** | **in Verlegenheit geraten** |
| etwas **in Kraft setzen** | **in Kraft treten** |
| etwas **zur Anwendung bringen** | **zur Anwendung kommen** |
| etwas **unter Beweis stellen** | — |
| etwas **in Betracht ziehen** | **in Betracht kommen** |
| jemanden **zur Verantwortung ziehen** | — |
| etwas **in Erwägung ziehen** | — |

**Aspect**: *in Bewegung **geraten*** (start, often unintentionally), *in Bewegung **sein*** (state), *in Bewegung **bleiben*** (continue).

> Overusing FVG makes texts stiff (*Amtsdeutsch*). Use them where they are the established term — law, administration, science.`,
    examples: [
      { de: 'Die Frage steht nicht zur Debatte.', en: 'The question is not up for debate.' },
      { de: 'Sie stellte ihr Können eindrucksvoll unter Beweis.', en: 'She demonstrated her skill impressively.' },
      { de: 'Wir ziehen alle Möglichkeiten in Betracht.', en: 'We are considering all possibilities.' },
    ],
    exercises: [
      { id: 'c2-funktionsverbgefuege-1', kind: 'choice', prompt: 'Der Vorstand ___ den Vorschlag morgen zur Abstimmung.', options: ['stellt', 'steht', 'kommt', 'gerät'], tag: 'fvg', explain: 'Transitive (with object): etwas zur Abstimmung stellen.', why: ['stehen is intransitive: Der Vorschlag steht zur Abstimmung.', 'kommen is intransitive.', 'geraten is intransitive and negative.'] },
      { id: 'c2-funktionsverbgefuege-2', kind: 'fill', prompt: 'Nach langen Verhandlungen kam das Projekt endlich in ___.', answers: ['Gang'], tag: 'fvg', explain: 'in Gang kommen = get going.' },
      { id: 'c2-funktionsverbgefuege-3', kind: 'choice', prompt: 'Mit dieser Frage hast du ihn ganz schön in Verlegenheit ___.', options: ['gebracht', 'geraten', 'gekommen', 'gestanden'], tag: 'fvg', explain: 'Causative: jemanden in Verlegenheit bringen.', why: ['geraten is intransitive: Er geriet in Verlegenheit.', 'kommen is intransitive.', 'stehen doesn’t combine here.'] },
      { id: 'c2-funktionsverbgefuege-4', kind: 'fill', prompt: 'Wir sollten auch andere Lösungen in Erwägung ___.', answers: ['ziehen'], tag: 'fvg', explain: 'etwas in Erwägung ziehen = consider.' },
      { id: 'c2-funktionsverbgefuege-5', kind: 'transform', instruction: 'Replace the FVG with a simple verb.', source: 'Der Plan stieß bei der Bevölkerung auf heftige Kritik.', answers: ['Der Plan wurde von der Bevölkerung heftig kritisiert.', 'Die Bevölkerung kritisierte den Plan heftig.'], tag: 'fvg', explain: 'auf Kritik stoßen = kritisiert werden.' },
      { id: 'c2-funktionsverbgefuege-6', kind: 'choice', prompt: 'Die Verantwortlichen müssen zur Verantwortung ___ werden.', options: ['gezogen', 'gestellt', 'gebracht', 'genommen'], tag: 'fvg', explain: 'jemanden zur Verantwortung ziehen = hold accountable.', why: ['The fixed verb is ziehen.', 'The fixed verb is ziehen.', 'in die Verantwortung nehmen exists, but zur Verantwortung goes with ziehen.'] },
      { id: 'c2-funktionsverbgefuege-7', kind: 'fill', prompt: 'Sie hat ihre Führungsqualitäten unter ___ gestellt.', answers: ['Beweis'], tag: 'fvg', explain: 'etwas unter Beweis stellen = demonstrate.' },
      { id: 'c2-funktionsverbgefuege-8', kind: 'choice', prompt: 'Diese Methode ___ nur in Ausnahmefällen zur Anwendung.', options: ['kommt', 'bringt', 'stellt', 'zieht'], tag: 'fvg', explain: 'Intransitive: zur Anwendung kommen (be applied).', why: ['bringen needs an object: man bringt sie zur Anwendung.', 'stellen doesn’t combine with zur Anwendung.', 'ziehen doesn’t combine with zur Anwendung.'] },
    ],
  },
  {
    id: 'c2-modalpartikeln',
    explanation: `Native speakers **combine particles**. The order is fixed: roughly *ja – denn – doch – eben/halt – wohl – mal – schon – auch*.

| combination | effect | example |
|---|---|---|
| **doch mal** | friendly, insistent invitation | *Komm **doch mal** vorbei!* |
| **ja wohl** | indignant certainty | *Das ist **ja wohl** ein Witz!* |
| **doch wohl** | expecting agreement (disbelief) | *Das kannst du **doch wohl** nicht ernst meinen!* |
| **denn eigentlich** | genuine curiosity | *Wie geht es dir **denn eigentlich**?* |
| **eben halt** / **halt eben** | strong resignation | *Das ist **halt eben** so.* |
| **mal eben** | quick, casual action | *Ich geh **mal eben** einkaufen.* |
| **auch schon** | irony: not a big deal | *Was ist **auch schon** dabei?* |
| **schon mal** | in advance, meanwhile | *Fang **schon mal** an!* |

Stress changes meaning: unstressed *doch* (softening) vs. stressed ***doch*** (contradiction): *Er kommt **DOCH**.*

> Particles are what make written dialogue sound real — in formal writing, leave them out.`,
    examples: [
      { de: 'Das hättest du ja wohl auch früher sagen können!', en: 'You could have said that earlier, surely!' },
      { de: 'Ruf doch mal an, wenn du Zeit hast.', en: 'Give me a call sometime when you have time.' },
      { de: 'Geh schon mal vor, ich komme gleich.', en: 'Go on ahead, I’ll be right there.' },
    ],
    exercises: [
      { id: 'c2-modalpartikeln-1', kind: 'choice', prompt: '(empört) Das ist ___ die Höhe!', options: ['ja wohl', 'mal eben', 'schon mal', 'denn eigentlich'], tag: 'modal-particle', explain: 'Indignation: ja wohl.', why: ['mal eben = quickly.', 'schon mal = in advance.', 'denn eigentlich expresses curiosity, and only in questions.'] },
      { id: 'c2-modalpartikeln-2', kind: 'fill', prompt: '(freundliche Einladung) Besuch uns ___ am Wochenende!', answers: ['doch mal'], tag: 'modal-particle', explain: 'Friendly invitation: doch mal (in this order).', feedback: { 'mal doch': 'The order is fixed: doch mal.' } },
      { id: 'c2-modalpartikeln-3', kind: 'choice', prompt: '(kurz, nebenbei) Ich bring ___ den Müll raus.', options: ['mal eben', 'ja wohl', 'auch schon', 'doch wohl'], tag: 'modal-particle', explain: 'A quick casual action: mal eben.', why: ['ja wohl expresses indignation.', 'auch schon is ironic.', 'doch wohl expects agreement.'] },
      { id: 'c2-modalpartikeln-4', kind: 'choice', prompt: 'Welche Reihenfolge ist richtig?', options: ['Das ist ja doch nicht möglich.', 'Das ist doch ja nicht möglich.', 'Das ist ja nicht doch möglich.', 'Das doch ist ja nicht möglich.'], tag: 'modal-particle', explain: 'ja comes before doch.', why: ['The fixed order is ja – doch.', 'Particles stand together before the negation.', 'Particles can’t stand between subject and verb.'] },
      { id: 'c2-modalpartikeln-5', kind: 'fill', prompt: '(Ironie) Was ist ___ dabei, wenn ich mal zu spät komme?', answers: ['auch schon', 'denn schon'], tag: 'modal-particle', explain: 'Rhetorical, downplaying: auch schon (What’s the big deal?).' },
      { id: 'c2-modalpartikeln-6', kind: 'choice', prompt: '„Er kommt DOCH.“ (betont) bedeutet:', options: ['Entgegen der Erwartung kommt er.', 'Er kommt hoffentlich.', 'Er kommt vielleicht.', 'Er soll kommen.'], tag: 'modal-particle', explain: 'Stressed DOCH contradicts an expectation.', why: ['Hope would be hoffentlich.', 'Possibility would be vielleicht.', 'That would be a reported order.'] },
      { id: 'c2-modalpartikeln-7', kind: 'fill', prompt: '(während du wartest) Setz dich ___, ich bin gleich so weit.', answers: ['schon mal', 'doch schon mal', 'ruhig schon mal'], tag: 'modal-particle', explain: 'schon mal = in the meantime.' },
      { id: 'c2-modalpartikeln-8', kind: 'choice', prompt: '(ehrliches Interesse) Was machst du ___ beruflich?', options: ['denn eigentlich', 'ja wohl', 'mal eben', 'auch schon'], tag: 'modal-particle', explain: 'Curious question: denn eigentlich.', why: ['ja wohl is indignant, not curious.', 'mal eben is about quick actions.', 'auch schon is ironic.'] },
    ],
  },
  {
    id: 'c2-register',
    explanation: `Native-like German means choosing the **right register** for the situation:

| colloquial (umgangssprachlich) | neutral | formal / written (gehoben, Amtsdeutsch) |
|---|---|---|
| kriegen | bekommen | erhalten |
| abhauen | weggehen | sich entfernen |
| quatschen | reden | sich unterhalten / erörtern |
| kapieren | verstehen | nachvollziehen / erfassen |
| Kohle, Knete | Geld | finanzielle Mittel |
| schnell mal | kurz | umgehend |
| Bescheid sagen | informieren | in Kenntnis setzen |
| machen (Antrag) | stellen | einreichen |

**Grammar signals register too**
- Colloquial: *haben* with *weil* + main-clause order, *tun* + infinitive (*Ich tu grad kochen*), dative for genitive (*wegen dem Wetter*), particles.
- Formal: Konjunktiv I, genitive, nominal style, passive and Passiversatz, *sich lassen*, *sein + zu*.

**Letters and e-mails**: *Sehr geehrte Frau Dr. Kunz,* · *Mit freundlichen Grüßen* (formal) — *Liebe Anna,* · *Viele Grüße* / *Liebe Grüße* (personal).`,
    examples: [
      { de: 'Ich habe Ihre Nachricht erhalten und melde mich umgehend.', en: 'I have received your message and will get back to you immediately.' },
      { de: 'Hast du meine Nachricht gekriegt?', en: 'Did you get my message? (casual)' },
      { de: 'Bitte setzen Sie uns in Kenntnis, falls sich etwas ändert.', en: 'Please inform us if anything changes. (very formal)' },
    ],
    exercises: [
      { id: 'c2-register-1', kind: 'choice', prompt: 'Welches Verb passt in einen formellen Brief? „Wir haben Ihre Bewerbung ___.“', options: ['erhalten', 'gekriegt', 'bekommen', 'gekricht'], tag: 'lexis.register', explain: 'Formal: erhalten.', why: ['kriegen is colloquial.', 'bekommen is neutral — acceptable, but erhalten is the formal choice.', 'This is a dialect spelling.'] },
      { id: 'c2-register-2', kind: 'transform', instruction: 'Rewrite in neutral/formal register.', source: 'Kapierst du das?', answers: ['Verstehen Sie das?', 'Verstehst du das?', 'Können Sie das nachvollziehen?'], tag: 'lexis.register', explain: 'kapieren (colloquial) → verstehen / nachvollziehen.' },
      { id: 'c2-register-3', kind: 'choice', prompt: 'Welche Grußformel passt zu „Sehr geehrter Herr Lang,“?', options: ['Mit freundlichen Grüßen', 'Liebe Grüße', 'Bis bald', 'Tschüss'], tag: 'lexis.register', explain: 'Formal letter: Mit freundlichen Grüßen.', why: ['Liebe Grüße is for people you know personally.', 'Bis bald is informal.', 'Tschüss is spoken and informal.'] },
      { id: 'c2-register-4', kind: 'transform', instruction: 'Rewrite in formal written style (genitive instead of dative).', source: 'Wegen dem Streik fallen alle Züge aus.', answers: ['Wegen des Streiks fallen alle Züge aus.', 'Aufgrund des Streiks fallen alle Züge aus.'], tag: 'lexis.register', explain: 'Written standard: wegen + genitive → des Streiks.' },
      { id: 'c2-register-5', kind: 'fill', prompt: '(Amtsdeutsch) Bitte reichen Sie die Unterlagen ___ ein. (= sofort)', answers: ['umgehend', 'unverzüglich'], tag: 'lexis.register', explain: 'Formal for sofort: umgehend / unverzüglich.' },
      { id: 'c2-register-6', kind: 'choice', prompt: 'Welcher Satz ist umgangssprachlich?', options: ['Ich tu grad noch die Wäsche aufhängen.', 'Ich hänge gerade die Wäsche auf.', 'Ich bin gerade dabei, die Wäsche aufzuhängen.', 'Die Wäsche wird gerade aufgehängt.'], tag: 'lexis.register', explain: '„tun“ + infinitive is colloquial/dialectal.', why: ['Neutral standard German.', 'Neutral standard German.', 'Neutral passive.'] },
      { id: 'c2-register-7', kind: 'transform', instruction: 'Make it formal.', source: 'Sag mir Bescheid, wenn du was Neues weißt.', answers: ['Bitte informieren Sie mich, wenn Sie Neues erfahren.', 'Bitte geben Sie mir Bescheid, sobald Sie Neues erfahren.', 'Bitte informieren Sie mich, sobald Sie Neues erfahren.', 'Bitte setzen Sie mich in Kenntnis, wenn Sie Neues erfahren.'], tag: 'lexis.register', explain: 'Formal: Sie, bitte, informieren / in Kenntnis setzen, etwas Neues erfahren.' },
      { id: 'c2-register-8', kind: 'choice', prompt: '„Knete“ ist ein umgangssprachliches Wort für:', options: ['Geld', 'Arbeit', 'Essen', 'Ärger'], tag: 'lexis.register', explain: 'Knete / Kohle = money (colloquial).', why: ['Colloquial for work is Maloche.', 'Colloquial for food is Futter.', 'Colloquial for trouble is Zoff.'] },
    ],
  },
  {
    id: 'c2-idiomatik',
    explanation: `Idioms (*Redewendungen*) carry figurative meanings — understanding them is a hallmark of C2. A selection of very common ones:

| idiom | meaning |
|---|---|
| etwas auf die lange Bank schieben | to put off |
| jemandem reinen Wein einschenken | to tell someone the plain truth |
| ins Fettnäpfchen treten | to put one’s foot in it |
| die Katze im Sack kaufen | to buy a pig in a poke |
| den Nagel auf den Kopf treffen | to hit the nail on the head |
| auf dem Holzweg sein | to be on the wrong track |
| Tomaten auf den Augen haben | to be blind to the obvious |
| jemandem auf den Keks gehen | to get on someone’s nerves |
| die Daumen drücken | to keep one’s fingers crossed |
| sich kein Blatt vor den Mund nehmen | not to mince one’s words |
| etwas aus dem Ärmel schütteln | to do something effortlessly |
| ins Gras beißen | to bite the dust |
| um den heißen Brei herumreden | to beat about the bush |
| unter vier Augen | in private |
| alles in Butter | everything’s fine |

> Idioms are **fixed**: you can’t change the words (*~~die lange Brücke~~*) — but verbs are conjugated normally.`,
    examples: [
      { de: 'Ich drücke dir die Daumen für die Prüfung!', en: 'Good luck with the exam! (I’m keeping my fingers crossed.)' },
      { de: 'Mit dieser Bemerkung ist er voll ins Fettnäpfchen getreten.', en: 'He really put his foot in it with that remark.' },
      { de: 'Red nicht um den heißen Brei herum!', en: 'Stop beating about the bush!' },
    ],
    exercises: [
      { id: 'c2-idiomatik-1', kind: 'fill', prompt: 'Du hast den Nagel auf den ___ getroffen!', answers: ['Kopf'], tag: 'lexis.idiom', explain: 'den Nagel auf den Kopf treffen = to hit the nail on the head.' },
      { id: 'c2-idiomatik-2', kind: 'choice', prompt: '„Er ist auf dem Holzweg“ bedeutet:', options: ['Er irrt sich.', 'Er geht spazieren.', 'Er arbeitet als Schreiner.', 'Er ist sehr erfolgreich.'], tag: 'lexis.idiom', explain: 'auf dem Holzweg sein = to be on the wrong track.', why: ['Figurative, not literal.', 'Figurative, not literal.', 'The opposite.'] },
      { id: 'c2-idiomatik-3', kind: 'fill', prompt: 'Sie nimmt sich kein ___ vor den Mund – sie sagt immer, was sie denkt.', answers: ['Blatt'], tag: 'lexis.idiom', explain: 'sich kein Blatt vor den Mund nehmen = not to mince one’s words.' },
      { id: 'c2-idiomatik-4', kind: 'choice', prompt: 'Hör auf, um den heißen ___ herumzureden!', options: ['Brei', 'Kaffee', 'Stein', 'Ofen'], tag: 'lexis.idiom', explain: 'um den heißen Brei herumreden = to beat about the bush.', why: ['The idiom uses Brei.', 'The idiom uses Brei.', 'The idiom uses Brei.'] },
      { id: 'c2-idiomatik-5', kind: 'fill', prompt: 'Können wir kurz unter vier ___ sprechen?', answers: ['Augen'], tag: 'lexis.idiom', explain: 'unter vier Augen = in private.' },
      { id: 'c2-idiomatik-6', kind: 'choice', prompt: '„Das schüttelt er aus dem Ärmel“ bedeutet:', options: ['Das macht er mühelos.', 'Das macht er heimlich.', 'Das macht er widerwillig.', 'Das macht er schlecht.'], tag: 'lexis.idiom', explain: 'aus dem Ärmel schütteln = to do something effortlessly.', why: ['Not secretly.', 'Not reluctantly.', 'The opposite.'] },
      { id: 'c2-idiomatik-7', kind: 'correct', sentence: 'Du gehst mir auf die Kekse!', answers: ['Du gehst mir auf den Keks!'], tag: 'lexis.idiom', explain: 'The idiom is fixed: jemandem auf den Keks gehen (singular).' },
      { id: 'c2-idiomatik-8', kind: 'choice', prompt: 'Ich habe die Wohnung ohne Besichtigung gemietet – ich habe die Katze im ___ gekauft.', options: ['Sack', 'Korb', 'Haus', 'Netz'], tag: 'lexis.idiom', explain: 'die Katze im Sack kaufen = buy something without seeing it.', why: ['The idiom uses Sack.', 'The idiom uses Sack.', 'The idiom uses Sack.'] },
    ],
  },
  {
    id: 'c2-konnektoren-nuance',
    explanation: `Elevated connectors give argumentative texts precision:

| connector | type | meaning | example |
|---|---|---|---|
| **gleichwohl** | adverb (verb next) | nevertheless | *Die Lage ist ernst; **gleichwohl** besteht Hoffnung.* |
| **nichtsdestotrotz / nichtsdestoweniger** | adverb | nonetheless | |
| **wenngleich / obgleich / obschon** | subordinating | although | *…, **wenngleich** die Kosten hoch sind.* |
| **ungeachtet** + G | preposition | regardless of | ***Ungeachtet** aller Warnungen …* |
| **mithin** | adverb | consequently, thus | *…; der Vertrag ist **mithin** gültig.* |
| **indes / indessen** | adverb | however / meanwhile | |
| **wiewohl** | subordinating | although (literary) | |
| **sofern / soweit** | subordinating | provided / as far as | ***Soweit** ich weiß, …* |
| **demnach** | adverb | accordingly | |
| **zumal** | subordinating | especially since | |

> Mind the grammar: **wenngleich** (verb last) vs. **gleichwohl** (verb next) vs. **ungeachtet** (+ genitive noun).`,
    examples: [
      { de: 'Die Ergebnisse sind vorläufig; gleichwohl lassen sie Schlüsse zu.', en: 'The results are preliminary; nevertheless, they allow conclusions.' },
      { de: 'Ungeachtet aller Kritik hielt sie an ihrem Plan fest.', en: 'Regardless of all criticism, she stuck to her plan.' },
      { de: 'Er nahm die Stelle an, wenngleich das Gehalt niedrig war.', en: 'He accepted the job, although the salary was low.' },
    ],
    exercises: [
      { id: 'c2-konnektoren-nuance-1', kind: 'choice', prompt: 'Die Studie ist klein; ___ liefert sie wertvolle Hinweise.', options: ['gleichwohl', 'wenngleich', 'ungeachtet', 'zumal'], tag: 'connector', explain: 'Adverb with verb next: gleichwohl.', why: ['wenngleich would send the verb to the end.', 'ungeachtet is a preposition.', 'zumal is subordinating and gives a reason.'] },
      { id: 'c2-konnektoren-nuance-2', kind: 'fill', prompt: '___ aller Bedenken wurde das Projekt genehmigt.', answers: ['Ungeachtet', 'Trotz'], tag: 'connector', explain: 'Preposition + genitive: ungeachtet (or trotz) aller Bedenken.' },
      { id: 'c2-konnektoren-nuance-3', kind: 'transform', instruction: 'Connect with wenngleich.', source: 'Der Vortrag war interessant. Er war etwas zu lang.', answers: ['Der Vortrag war interessant, wenngleich er etwas zu lang war.'], tag: 'connector', explain: 'wenngleich + verb at the end.', feedback: [['wenngleich er war', 'wenngleich sends the verb to the end: wenngleich er etwas zu lang war.']] },
      { id: 'c2-konnektoren-nuance-4', kind: 'choice', prompt: 'Alle Voraussetzungen sind erfüllt; der Antrag ist ___ genehmigt.', options: ['mithin', 'gleichwohl', 'wiewohl', 'indes'], tag: 'connector', explain: 'Consequence: mithin (thus).', why: ['gleichwohl expresses a contrast.', 'wiewohl is subordinating and concessive.', 'indes means however/meanwhile.'] },
      { id: 'c2-konnektoren-nuance-5', kind: 'fill', prompt: '___ ich informiert bin, ist die Sitzung verschoben worden.', answers: ['Soweit', 'Soviel'], tag: 'connector', explain: 'As far as I know: soweit (soviel) ich informiert bin.' },
      { id: 'c2-konnektoren-nuance-6', kind: 'correct', sentence: 'Wenngleich das Wetter war schlecht, fand das Fest statt.', answers: ['Wenngleich das Wetter schlecht war, fand das Fest statt.'], tag: 'order.verb-final', explain: 'wenngleich is subordinating: verb at the end.' },
      { id: 'c2-konnektoren-nuance-7', kind: 'choice', prompt: 'Die Lage bleibt schwierig. ___ gibt es erste Fortschritte.', options: ['Nichtsdestotrotz', 'Obschon', 'Sofern', 'Ungeachtet'], tag: 'connector', explain: 'Adverb in position 1: Nichtsdestotrotz gibt es …', why: ['obschon is subordinating.', 'sofern is subordinating and conditional.', 'ungeachtet needs a genitive noun.'] },
      { id: 'c2-konnektoren-nuance-8', kind: 'fill', prompt: 'Wir liefern pünktlich, ___ alle Unterlagen rechtzeitig vorliegen.', answers: ['sofern', 'vorausgesetzt', 'wenn', 'falls'], tag: 'connector', explain: 'Condition: sofern (provided that).' },
    ],
  },
  {
    id: 'c2-informationsstruktur',
    explanation: `German word order is flexible — and that flexibility carries meaning.

**The Vorfeld (position 1)** sets the topic or creates contrast:
- Neutral: *Ich habe das Buch gestern gelesen.*
- Topic/contrast: ***Das Buch*** *habe ich gestern gelesen (den Film noch nicht).*
- Scene-setting: ***Gestern*** *habe ich das Buch gelesen.*

**End-weight principle**: new, heavy or important information goes **late** in the middle field; pronouns and known information go early:
*Ich habe **ihm** gestern **ein sehr interessantes Buch über die Geschichte Berlins** geschenkt.*

**Ausklammerung**: placing material **after** the final verb part — natural for comparisons, long prepositional phrases and afterthoughts:
*Er ist größer geworden **als sein Vater**.* · *Wir haben lange gesprochen **über die Zukunft der Firma**.*

**Emphasis without stress**: *es* as a dummy in position 1 pushes the subject back as new information:
***Es*** *kamen viele Gäste.* (rather than *Viele Gäste kamen.*)`,
    examples: [
      { de: 'Den Kaffee trinke ich schwarz, den Tee mit Milch.', en: 'I drink coffee black, tea with milk.' },
      { de: 'Es meldeten sich über hundert Freiwillige.', en: 'Over a hundred volunteers came forward.' },
      { de: 'Sie hat mehr gearbeitet als alle anderen.', en: 'She worked more than everyone else.' },
    ],
    exercises: [
      { id: 'c2-informationsstruktur-1', kind: 'choice', prompt: 'Welcher Satz betont einen Kontrast zum Objekt?', options: ['Den Roman habe ich gelesen, den Film noch nicht.', 'Ich habe den Roman gelesen.', 'Gelesen habe ich.', 'Ich habe gelesen den Roman.'], tag: 'order.midfield', explain: 'The object in the Vorfeld sets up a contrast.', why: ['Neutral order, no contrast.', 'This focuses the action, and the object is missing.', 'Incorrect word order.'] },
      { id: 'c2-informationsstruktur-2', kind: 'transform', instruction: 'Start with a dummy „Es“ to present the subject as new information.', source: 'Viele Zuschauer kamen zum Konzert.', answers: ['Es kamen viele Zuschauer zum Konzert.'], tag: 'order.midfield', explain: 'Es in position 1; the verb agrees with the real subject (kamen).', feedback: [['es kam ', 'The verb agrees with the plural subject: es kamen.']] },
      { id: 'c2-informationsstruktur-3', kind: 'choice', prompt: 'Welche Stellung ist natürlich?', options: ['Sie ist schneller gelaufen als ihre Schwester.', 'Sie ist als ihre Schwester schneller gelaufen.', 'Sie ist schneller als ihre Schwester gelaufen.', 'Als ihre Schwester ist sie schneller gelaufen.'], tag: 'order.midfield', explain: 'Comparisons with als are usually placed after the participle (Ausklammerung).', why: ['Awkward: the comparison is split from schneller.', 'Possible but heavy; Ausklammerung is more natural.', 'Unusual and marked.'] },
      { id: 'c2-informationsstruktur-4', kind: 'order', words: ['Ich', 'habe', 'es', 'ihm', 'gestern', 'gegeben'], tag: 'order.midfield', explain: 'Pronouns first (acc. before dat.), then time.' },
      { id: 'c2-informationsstruktur-5', kind: 'choice', prompt: 'Welche Antwort passt auf „Wer hat angerufen?“', options: ['Angerufen hat deine Mutter.', 'Deine Mutter hat angerufen gestern.', 'Hat angerufen deine Mutter.', 'Deine Mutter angerufen hat.'], tag: 'order.midfield', explain: 'The new information (deine Mutter) goes to the end; the known part (angerufen) can open the sentence.', why: ['Ausklammerung of a bare time adverb sounds wrong.', 'The verb can’t be first in a statement.', 'The verb must be in position 2.'] },
      { id: 'c2-informationsstruktur-6', kind: 'transform', instruction: 'Put the time expression in the Vorfeld.', source: 'Wir haben im letzten Sommer eine Reise nach Island gemacht.', answers: ['Im letzten Sommer haben wir eine Reise nach Island gemacht.', 'Letzten Sommer haben wir eine Reise nach Island gemacht.'], tag: 'order.v2', explain: 'Time in position 1 → verb next, then subject.' },
      { id: 'c2-informationsstruktur-7', kind: 'choice', prompt: '„Es wurde viel gelacht.“ Warum steht „es“?', options: ['Als Platzhalter im Vorfeld, weil es kein Subjekt gibt.', 'Als Subjekt, das „das Lachen“ ersetzt.', 'Als Objekt.', 'Weil das Passiv immer „es“ braucht.'], tag: 'voice.passive', explain: 'es is a placeholder in the Vorfeld; impersonal passive has no subject.', why: ['es is not a real subject here.', 'es is not an object.', 'Only when nothing else is in the Vorfeld: Gestern wurde viel gelacht.'] },
      { id: 'c2-informationsstruktur-8', kind: 'order', words: ['Wir', 'haben', 'lange', 'gesprochen', 'über die Zukunft der Firma'], answers: ['Wir haben lange über die Zukunft der Firma gesprochen'], tag: 'order.midfield', explain: 'A long prepositional phrase may be placed after the participle (Ausklammerung) — or inside the bracket.' },
    ],
  },
  {
    id: 'c2-doppelinfinitiv',
    explanation: `With modal verbs (and *lassen, sehen, hören, helfen, brauchen*) the perfect tenses use the **infinitive instead of the participle** — the **double infinitive**:
*Ich habe gestern arbeiten **müssen**.* (not *gemusst*) · *Er hat sein Auto reparieren **lassen**.*

**In subordinate clauses** the finite verb does **not** go to the very end — it comes **before** the double infinitive:
- *…, dass ich gestern **habe** arbeiten müssen.*
- *…, obwohl er es **hätte** wissen müssen.*
- *…, weil wir das Haus **haben** renovieren lassen.*

**Konjunktiv II past with modals**:
*Du **hättest** früher anrufen **sollen**.* · *…, dass du früher **hättest** anrufen **sollen**.*

**Futur with modals**: *…, dass er nicht **wird** kommen können.*

> In southern German and Austrian usage you may also hear *…, dass er es wissen hätte müssen* — the standard places *hätte* first.`,
    examples: [
      { de: 'Ich weiß, dass ich mehr hätte lernen sollen.', en: 'I know that I should have studied more.' },
      { de: 'Wir haben den Fehler nicht finden können.', en: 'We weren’t able to find the mistake.' },
      { de: 'Sie sagt, dass sie das Kleid hat ändern lassen.', en: 'She says she had the dress altered.' },
    ],
    exercises: [
      { id: 'c2-doppelinfinitiv-1', kind: 'transform', instruction: 'Put into the Perfekt.', source: 'Ich musste lange warten.', answers: ['Ich habe lange warten müssen.'], tag: 'double-infinitive', explain: 'Perfekt with a modal + infinitive: habe … warten müssen (not gemusst).', feedback: [['gemusst', 'With another infinitive the modal stays an infinitive: warten müssen.']] },
      { id: 'c2-doppelinfinitiv-2', kind: 'choice', prompt: 'Ich weiß, dass er das ___.', options: ['hätte wissen müssen', 'wissen müssen hätte', 'hätte gewusst müssen', 'wissen hätte gemusst'], tag: 'double-infinitive', explain: 'Finite verb before the double infinitive: hätte wissen müssen.', why: ['With a double infinitive the finite verb comes first.', 'The participle can’t be combined with müssen like this.', 'Both a participle form and wrong order.'] },
      { id: 'c2-doppelinfinitiv-3', kind: 'transform', instruction: 'Make a subordinate clause with „…, weil“.', source: 'Wir haben das Dach reparieren lassen.', answers: ['…, weil wir das Dach haben reparieren lassen.', 'weil wir das Dach haben reparieren lassen'], tag: 'double-infinitive', explain: 'weil + subject … haben + double infinitive.', feedback: [['reparieren lassen haben', 'With a double infinitive the finite verb (haben) comes before it.']] },
      { id: 'c2-doppelinfinitiv-4', kind: 'correct', sentence: 'Er hat gestern nicht kommen gekonnt.', answers: ['Er hat gestern nicht kommen können.'], tag: 'double-infinitive', explain: 'Double infinitive: kommen können.' },
      { id: 'c2-doppelinfinitiv-5', kind: 'fill', prompt: 'Es tut mir leid, dass ich dich so lange ___ warten lassen.', answers: ['habe'], tag: 'double-infinitive', explain: 'Subordinate clause with double infinitive: habe … warten lassen.' },
      { id: 'c2-doppelinfinitiv-6', kind: 'choice', prompt: 'Sie befürchtet, dass sie die Prüfung nicht ___.', options: ['wird bestehen können', 'bestehen können wird', 'bestehen wird können', 'können wird bestehen'], tag: 'double-infinitive', explain: 'Future with modal in a subordinate clause: wird bestehen können.', why: ['The finite verb wird comes before the double infinitive.', 'The infinitives can’t be reversed.', 'Wrong order.'] },
      { id: 'c2-doppelinfinitiv-7', kind: 'transform', instruction: 'Express a reproach in the Konjunktiv II past.', source: 'Du hast nicht angerufen. (sollen)', answers: ['Du hättest anrufen sollen.'], tag: 'double-infinitive', explain: 'hätte + infinitive + modal infinitive: hättest anrufen sollen.' },
      { id: 'c2-doppelinfinitiv-8', kind: 'order', words: ['Ich', 'glaube,', 'dass', 'wir', 'früher', 'hätten', 'losfahren', 'müssen'], tag: 'double-infinitive', explain: 'Subordinate clause: hätten before the double infinitive.' },
    ],
  },
  {
    id: 'c2-genitiv-gehoben',
    explanation: `In elevated style, some **verbs and adjectives take a genitive object**:

| verb / adjective | example |
|---|---|
| **gedenken** | *Wir gedenken **der Opfer**.* (commemorate) |
| **bedürfen** | *Das bedarf **einer Erklärung**.* (require) |
| **sich bedienen** | *Sie bediente sich **eines Tricks**.* (make use of) |
| **sich enthalten** | *Er enthielt sich **der Stimme**.* (abstain) |
| **sich erfreuen** | *Das Café erfreut sich **großer Beliebtheit**.* (enjoy) |
| **sich schämen** | *Er schämte sich **seiner Tat**.* (be ashamed of) |
| **jemanden beschuldigen / anklagen** | *Man beschuldigte ihn **des Diebstahls**.* |
| **sich bewusst sein** | *Ich bin mir **der Gefahr** bewusst.* |
| **(einer Sache) mächtig / kundig** | *Er ist **des Deutschen** mächtig.* |
| **sich vergewissern** | *Sie vergewisserte sich **der Fakten**.* |

Elevated genitive constructions: *eines Tages, meines Erachtens* (in my opinion), *letzten Endes, gewissermaßen, des Weiteren*.

> In speech these are often replaced: *sich für etwas schämen*, *Das braucht eine Erklärung*.`,
    examples: [
      { de: 'Diese Frage bedarf einer genaueren Untersuchung.', en: 'This question requires a closer examination.' },
      { de: 'Sie ist sich der Risiken bewusst.', en: 'She is aware of the risks.' },
      { de: 'Meines Erachtens ist der Plan unrealistisch.', en: 'In my opinion the plan is unrealistic.' },
    ],
    exercises: [
      { id: 'c2-genitiv-gehoben-1', kind: 'fill', prompt: 'Wir gedenken heute ___ Verstorbenen.', answers: ['der'], tag: 'case.gen', explain: 'gedenken + genitive plural: der Verstorbenen.', feedback: { den: 'gedenken takes the genitive: der Verstorbenen.' } },
      { id: 'c2-genitiv-gehoben-2', kind: 'choice', prompt: 'Diese Entscheidung bedarf ___ Zustimmung des Rates.', options: ['der', 'die', 'den', 'dem'], tag: 'case.gen', explain: 'bedürfen + genitive: der Zustimmung.', why: ['bedürfen takes the genitive, not the accusative.', 'bedürfen takes the genitive.', 'bedürfen takes the genitive, not the dative.'] },
      { id: 'c2-genitiv-gehoben-3', kind: 'fill', prompt: 'Ich bin mir ___ Verantwortung bewusst.', hint: 'meine', answers: ['meiner'], tag: 'case.gen', explain: 'sich einer Sache bewusst sein: genitive → meiner Verantwortung.' },
      { id: 'c2-genitiv-gehoben-4', kind: 'choice', prompt: 'Der Angeklagte wurde ___ beschuldigt.', options: ['des Betrugs', 'den Betrug', 'dem Betrug', 'wegen Betrugs von'], tag: 'case.gen', explain: 'jemanden einer Sache beschuldigen: genitive.', why: ['beschuldigen takes the genitive of the charge.', 'beschuldigen takes the genitive of the charge.', 'Incomplete structure.'] },
      { id: 'c2-genitiv-gehoben-5', kind: 'transform', instruction: 'Rewrite in elevated style (sich + genitive).', source: 'Das Museum ist sehr beliebt.', answers: ['Das Museum erfreut sich großer Beliebtheit.'], tag: 'case.gen', explain: 'sich großer Beliebtheit erfreuen (genitive).' },
      { id: 'c2-genitiv-gehoben-6', kind: 'correct', sentence: 'Bei der Abstimmung enthielt sie sich die Stimme.', answers: ['Bei der Abstimmung enthielt sie sich der Stimme.'], tag: 'case.gen', explain: 'sich der Stimme enthalten (genitive).' },
      { id: 'c2-genitiv-gehoben-7', kind: 'fill', prompt: '___ Erachtens ist das eine schlechte Idee.', answers: ['Meines'], tag: 'case.gen', explain: 'Fixed genitive phrase: meines Erachtens (in my opinion).' },
      { id: 'c2-genitiv-gehoben-8', kind: 'choice', prompt: 'Er bediente sich ___, um die Tür zu öffnen.', options: ['eines Drahtes', 'einen Draht', 'einem Draht', 'mit einem Draht'], tag: 'case.gen', explain: 'sich einer Sache bedienen: genitive.', why: ['bedienen (= use) takes the genitive.', 'bedienen (= use) takes the genitive.', 'No preposition with sich bedienen.'] },
    ],
  },
];
