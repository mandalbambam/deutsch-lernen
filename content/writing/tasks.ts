import type { InterestId } from '@/content/interests';
import type { Level } from '@/lib/cefr';

export interface WritingTask {
  id: string;
  level: Level;
  title: string;
  /** e-mail, forum post, essay … */
  genre: string;
  /** the task as it would appear in an exam (German) */
  prompt: string;
  /** English help for the learner */
  help: string;
  /** content points the text must cover (English) */
  points: string[];
  words: [number, number];
  /** a model answer at the task's level */
  model: string;
  topics: InterestId[];
}

/** General self-check items by level band. */
export const GENERAL_CHECKS: Record<'A' | 'B' | 'C', string[]> = {
  A: [
    'In every main clause the verb is in position 2.',
    'All nouns start with a capital letter.',
    'The verb endings match the subject (ich -e, du -st, er -t …).',
    'Greeting and closing fit the reader (Liebe/Lieber … / Viele Grüße).',
  ],
  B: [
    'After weil, dass, wenn, obwohl … the verb is at the end.',
    'Connectors link the ideas (außerdem, deshalb, trotzdem, zum Beispiel).',
    'du or Sie is used consistently, with the matching greeting.',
    'Each paragraph has one main idea.',
    'Articles and adjective endings agree with the nouns.',
  ],
  C: [
    'The text has a clear structure: introduction, argumentation, conclusion.',
    'Connectors are varied and precise (zwar … aber, folglich, gleichwohl).',
    'The register is consistent and fits the genre.',
    'Nominal style is used where it makes the text more precise — but not everywhere.',
    'Repetition is avoided by synonyms and pronouns.',
  ],
};

export const WRITING_TASKS: WritingTask[] = [
  // ───────────── A1 ─────────────
  {
    id: 'a1-w-vorstellung',
    level: 'A1',
    title: 'Introduce yourself',
    genre: 'E-mail',
    prompt: 'Sie haben einen neuen Tandempartner. Schreiben Sie ihm eine E-Mail und stellen Sie sich vor.',
    help: 'Write to Jonas, your new language-exchange partner.',
    points: ['your name and age', 'where you come from and where you live', 'your job or studies', 'a hobby'],
    words: [30, 60],
    model: `Hallo Jonas,

ich heiße Sara und bin 25 Jahre alt. Ich komme aus Italien, aber jetzt wohne ich in München. Ich bin Studentin und studiere Informatik. In meiner Freizeit spiele ich gern Tennis, und ich koche gern. Ich lerne seit drei Monaten Deutsch.

Viele Grüße
Sara`,
    topics: ['people'],
  },
  {
    id: 'a1-w-einladung',
    level: 'A1',
    title: 'Accepting an invitation',
    genre: 'Text message',
    prompt: 'Ihre Freundin Lisa hat am Samstag Geburtstag und lädt Sie zur Party ein. Antworten Sie ihr.',
    help: 'Reply to Lisa’s invitation to her birthday party.',
    points: ['say thank you and that you are coming', 'ask what you can bring', 'say when you will arrive'],
    words: [25, 50],
    model: `Hallo Lisa,

vielen Dank für die Einladung! Ich komme sehr gern zu deiner Party. Was kann ich mitbringen? Ich kann einen Kuchen backen. Ich arbeite am Samstag bis 18 Uhr. Ich komme dann um 19 Uhr.

Bis Samstag!
Tom`,
    topics: ['people', 'food'],
  },
  {
    id: 'a1-w-mein-tag',
    level: 'A1',
    title: 'My day',
    genre: 'Short text',
    prompt: 'Beschreiben Sie Ihren normalen Tag. Was machen Sie wann?',
    help: 'Describe a normal day with times: morning, afternoon, evening.',
    points: ['when you get up', 'what you do in the morning', 'what you do in the afternoon', 'what you do in the evening'],
    words: [35, 60],
    model: `Ich stehe um sieben Uhr auf. Dann frühstücke ich und trinke einen Kaffee. Um acht Uhr fahre ich mit dem Bus zur Arbeit. Ich arbeite bis vier Uhr. Am Nachmittag gehe ich einkaufen oder ich treffe Freunde. Am Abend koche ich und sehe fern. Um elf Uhr gehe ich ins Bett.`,
    topics: ['work', 'people'],
  },
  {
    id: 'a1-w-postkarte',
    level: 'A1',
    title: 'A holiday postcard',
    genre: 'Postcard',
    prompt: 'Sie sind im Urlaub. Schreiben Sie eine Postkarte an Ihre Familie.',
    help: 'Write a postcard home from your holiday.',
    points: ['where you are', 'how the weather is', 'what you do there', 'when you come back'],
    words: [30, 55],
    model: `Liebe Mama, lieber Papa,

viele Grüße aus Wien! Das Wetter ist super, es ist warm und sonnig. Die Stadt ist sehr schön. Heute besuche ich ein Museum, und morgen fahre ich mit dem Fahrrad an die Donau. Das Essen ist lecker! Am Sonntag komme ich zurück.

Liebe Grüße
Anna`,
    topics: ['travel', 'people'],
  },

  // ───────────── A2 ─────────────
  {
    id: 'a2-w-wochenende',
    level: 'A2',
    title: 'Last weekend',
    genre: 'E-mail',
    prompt: 'Schreiben Sie einer Freundin eine E-Mail über Ihr letztes Wochenende.',
    help: 'Use the Perfekt: what did you do, with whom, how was it?',
    points: ['what you did on Saturday', 'what you did on Sunday', 'who you were with', 'how you liked it'],
    words: [60, 100],
    model: `Liebe Mia,

wie geht es dir? Ich hatte ein tolles Wochenende! Am Samstag habe ich mit meinem Bruder eine Radtour an den See gemacht. Das Wetter war sehr schön, und wir sind sogar geschwommen. Am Abend haben wir zusammen gegrillt.

Am Sonntag habe ich lange geschlafen. Am Nachmittag bin ich mit Freunden ins Kino gegangen. Der Film war lustig, aber ein bisschen zu lang. Danach haben wir noch Pizza gegessen.

Und du? Was hast du am Wochenende gemacht?

Viele Grüße
Lena`,
    topics: ['people', 'sport'],
  },
  {
    id: 'a2-w-absage',
    level: 'A2',
    title: 'Cancelling an appointment',
    genre: 'Formal e-mail',
    prompt: 'Sie haben morgen einen Termin bei Ihrer Zahnärztin, aber Sie können nicht kommen. Schreiben Sie der Praxis.',
    help: 'Cancel politely, give a reason and ask for a new appointment.',
    points: ['cancel the appointment', 'give a reason', 'ask for a new appointment', 'say when you have time'],
    words: [50, 90],
    model: `Sehr geehrte Damen und Herren,

ich habe morgen um 10 Uhr einen Termin bei Frau Dr. Weber. Leider kann ich nicht kommen, weil ich krank bin und Fieber habe. Es tut mir sehr leid.

Können Sie mir bitte einen neuen Termin geben? Ich habe nächste Woche am Montag und am Mittwoch Zeit, am besten am Nachmittag.

Vielen Dank und freundliche Grüße
Peter Klein`,
    topics: ['health'],
  },
  {
    id: 'a2-w-wohnung',
    level: 'A2',
    title: 'My flat and my neighbourhood',
    genre: 'E-mail',
    prompt: 'Ein Freund besucht Sie bald. Beschreiben Sie Ihre Wohnung und Ihr Viertel.',
    help: 'Describe your flat and what there is near it.',
    points: ['how big your flat is and what rooms it has', 'what you like about it', 'what there is in your neighbourhood', 'what you can do there together'],
    words: [60, 100],
    model: `Hallo Paul,

ich freue mich schon auf deinen Besuch! Meine Wohnung ist nicht sehr groß, aber gemütlich. Sie hat zwei Zimmer, eine kleine Küche und einen Balkon. Du kannst im Wohnzimmer auf dem Sofa schlafen.

Mein Viertel gefällt mir sehr. In der Nähe gibt es einen Park, viele Cafés und einen Markt. Am Samstag können wir auf den Markt gehen und dann zusammen kochen. Abends können wir in eine Kneipe gehen, die ist nur fünf Minuten entfernt.

Bis bald!
Jonas`,
    topics: ['people', 'travel'],
  },
  {
    id: 'a2-w-hobby',
    level: 'A2',
    title: 'My hobby',
    genre: 'Forum post',
    prompt: 'In einem Forum fragen Leute nach Hobbys. Schreiben Sie über Ihr Hobby.',
    help: 'Write a short forum post about your hobby.',
    points: ['what your hobby is', 'since when you do it', 'why you like it', 'a tip for beginners'],
    words: [60, 100],
    model: `Mein Hobby ist Fotografieren. Ich fotografiere seit fünf Jahren. Am Anfang habe ich nur mit dem Handy fotografiert, aber vor zwei Jahren habe ich eine richtige Kamera gekauft.

Ich fotografiere am liebsten in der Natur, zum Beispiel Bäume, Seen und Tiere. Das macht mir Spaß, weil ich dabei ruhig werde und die Welt anders sehe.

Mein Tipp für Anfänger: Ihr braucht keine teure Kamera. Geht einfach früh am Morgen raus, dann ist das Licht am schönsten!`,
    topics: ['culture', 'nature'],
  },

  // ───────────── B1 ─────────────
  {
    id: 'b1-w-beschwerde',
    level: 'B1',
    title: 'Complaining to an online shop',
    genre: 'Formal e-mail',
    prompt: 'Sie haben im Internet eine Kaffeemaschine bestellt. Sie ist kaputt angekommen. Schreiben Sie dem Kundenservice.',
    help: 'Complain politely and say clearly what you expect.',
    points: ['what you ordered and when', 'what the problem is', 'what you have already tried', 'what you expect now (exchange or refund)'],
    words: [100, 150],
    model: `Sehr geehrte Damen und Herren,

am 3. März habe ich in Ihrem Onlineshop eine Kaffeemaschine bestellt (Bestellnummer 48213). Das Paket ist gestern angekommen, aber leider funktioniert die Maschine nicht. Wenn ich sie einschalte, leuchtet zwar das Licht, aber das Wasser wird nicht heiß.

Ich habe die Bedienungsanleitung genau gelesen und die Maschine auch an einer anderen Steckdose ausprobiert. Leider ohne Erfolg.

Ich bin sehr enttäuscht, weil ich die Maschine als Geschenk für meine Mutter gekauft habe. Deshalb bitte ich Sie, mir so schnell wie möglich ein neues Gerät zu schicken. Falls das nicht möglich ist, möchte ich mein Geld zurück.

Ich freue mich auf Ihre baldige Antwort.

Mit freundlichen Grüßen
Martina Schulz`,
    topics: ['economy'],
  },
  {
    id: 'b1-w-handyverbot',
    level: 'B1',
    title: 'Phones at school: your opinion',
    genre: 'Forum post',
    prompt: 'In einem Forum wird diskutiert: „Sollen Handys an Schulen verboten werden?“ Schreiben Sie Ihre Meinung.',
    help: 'Give your opinion with reasons and an example.',
    points: ['your opinion', 'two reasons', 'an example from your experience', 'a suggestion or conclusion'],
    words: [100, 150],
    model: `Ich finde, dass Handys im Unterricht nicht benutzt werden sollten, aber ein komplettes Verbot halte ich für übertrieben.

Einerseits lenken Handys stark ab. Wenn ein Handy vibriert, kann sich niemand mehr konzentrieren. Außerdem schauen viele Schüler in den Pausen nur noch auf ihr Display, statt miteinander zu reden.

Andererseits kann man das Handy auch sinnvoll nutzen, zum Beispiel für Recherchen oder Vokabel-Apps. In meiner Schule durften wir das Handy nur benutzen, wenn der Lehrer es erlaubt hat. Das hat gut funktioniert.

Deshalb schlage ich klare Regeln vor: Im Unterricht bleibt das Handy in der Tasche, außer der Lehrer braucht es für eine Aufgabe.`,
    topics: ['tech', 'society'],
  },
  {
    id: 'b1-w-reise',
    level: 'B1',
    title: 'An unforgettable trip',
    genre: 'Blog post',
    prompt: 'Erzählen Sie in Ihrem Blog von einer Reise, die Sie nie vergessen werden.',
    help: 'Tell the story in the past: where, what happened, why you remember it.',
    points: ['where and when you travelled', 'what happened', 'how you felt', 'why you will never forget it'],
    words: [100, 150],
    model: `Vor drei Jahren bin ich mit meiner Schwester nach Norwegen gereist. Wir wollten zwei Wochen lang wandern und in einem Zelt schlafen.

Am dritten Tag ist etwas passiert, das ich nie vergessen werde. Wir waren gerade auf einem Berg, als plötzlich dichter Nebel kam. Wir konnten den Weg nicht mehr sehen und hatten ziemlich Angst. Zum Glück trafen wir einen älteren Mann, der dort Schafe hütete. Er brachte uns zu seiner Hütte, machte uns einen heißen Tee und erzählte stundenlang Geschichten.

Am nächsten Morgen war der Himmel wieder blau. Ich werde diese Reise nie vergessen, weil ich gelernt habe, wie hilfsbereit fremde Menschen sein können.`,
    topics: ['travel', 'nature'],
  },
  {
    id: 'b1-w-ferienjob',
    level: 'B1',
    title: 'Applying for a summer job',
    genre: 'Application e-mail',
    prompt: 'Ein Café sucht für den Sommer eine Aushilfe. Schreiben Sie eine kurze Bewerbung.',
    help: 'Say why you are interested, what experience you have and when you can work.',
    points: ['why you are writing', 'your experience', 'why you are suitable', 'when you are available'],
    words: [100, 150],
    model: `Sehr geehrte Frau Möller,

in Ihrer Anzeige habe ich gelesen, dass Sie für die Sommermonate eine Aushilfe suchen. Ich interessiere mich sehr für die Stelle.

Ich bin 21 Jahre alt und studiere Tourismus an der Hochschule Bremen. Letzten Sommer habe ich bereits drei Monate in einer Eisdiele gearbeitet. Dort habe ich Kunden bedient, die Kasse gemacht und mich um die Bestellungen gekümmert.

Ich arbeite gern im Team, bin freundlich und auch in stressigen Situationen ruhig. Außerdem spreche ich Englisch und Spanisch, was bei Touristen hilfreich sein kann.

Ich kann vom 1. Juli bis zum 15. September arbeiten, auch am Wochenende. Über eine Einladung zu einem Gespräch würde ich mich sehr freuen.

Mit freundlichen Grüßen
Daniel Ortega`,
    topics: ['work'],
  },

  // ───────────── B2 ─────────────
  {
    id: 'b2-w-homeoffice',
    level: 'B2',
    title: 'Home office: pros and cons',
    genre: 'Argumentative text',
    prompt: 'Schreiben Sie einen Text zum Thema „Homeoffice – Zukunft der Arbeit?“. Nennen Sie Vor- und Nachteile und begründen Sie Ihre eigene Meinung.',
    help: 'Structure: introduction, advantages, disadvantages, your position.',
    points: ['an introduction to the topic', 'at least two advantages', 'at least two disadvantages', 'your own reasoned opinion'],
    words: [130, 190],
    model: `Seit einigen Jahren arbeiten immer mehr Menschen regelmäßig von zu Hause aus. Doch ist das Homeoffice tatsächlich die Zukunft der Arbeit?

Für das Homeoffice spricht vor allem die gewonnene Zeit: Wer nicht pendeln muss, hat mehr Raum für Familie und Freizeit. Darüber hinaus können sich viele Beschäftigte zu Hause besser konzentrieren, weil sie seltener unterbrochen werden. Nicht zuletzt profitieren auch Umwelt und Verkehr, wenn weniger Menschen täglich ins Auto steigen.

Allerdings hat die Arbeit am heimischen Schreibtisch auch Schattenseiten. Der persönliche Austausch mit Kolleginnen und Kollegen geht verloren, und neue Mitarbeitende lassen sich nur schwer einarbeiten. Hinzu kommt, dass Beruf und Privatleben zunehmend verschwimmen: Wer abends noch schnell E-Mails beantwortet, kann kaum abschalten.

Meiner Meinung nach liegt die Lösung in einem Mittelweg. Zwei bis drei Tage im Büro ermöglichen Teamarbeit und spontane Gespräche, während die übrigen Tage für konzentriertes Arbeiten zu Hause genutzt werden können. Entscheidend ist jedoch, dass klare Regeln zur Erreichbarkeit vereinbart werden.`,
    topics: ['work', 'society'],
  },
  {
    id: 'b2-w-leserbrief',
    level: 'B2',
    title: 'Letter to the editor',
    genre: 'Letter to the editor',
    prompt: 'Ihre Lokalzeitung berichtet, dass die Innenstadt autofrei werden soll. Schreiben Sie einen Leserbrief.',
    help: 'Refer to the article, state your position, give reasons and a suggestion.',
    points: ['refer to the article', 'your position', 'two arguments', 'a concrete suggestion'],
    words: [130, 190],
    model: `Zu Ihrem Artikel „Innenstadt bald ohne Autos?“ vom 12. Mai möchte ich Stellung nehmen.

Grundsätzlich begrüße ich die Pläne des Stadtrats. Eine autofreie Innenstadt wäre deutlich ruhiger und sicherer, vor allem für Kinder und ältere Menschen. Außerdem würde die Luftqualität spürbar besser, was angesichts der hohen Belastung an der Hauptstraße dringend nötig ist.

Allerdings darf man die Bedenken der Geschäftsleute nicht einfach ignorieren. Viele Kundinnen und Kunden aus dem Umland kommen bisher mit dem Auto. Wenn sie keine Parkmöglichkeit mehr finden, kaufen sie womöglich lieber im Einkaufszentrum am Stadtrand ein.

Deshalb schlage ich vor, die Sperrung schrittweise einzuführen und gleichzeitig das Angebot an Bussen deutlich auszubauen. Park-and-Ride-Plätze am Stadtrand mit einem günstigen Shuttle könnten ein guter Kompromiss sein. So würde die Innenstadt lebenswerter, ohne dass der Handel darunter leiden müsste.

Sabine Krüger, Lindenbach`,
    topics: ['society', 'nature'],
  },
  {
    id: 'b2-w-vermieter',
    level: 'B2',
    title: 'Formal complaint to the landlord',
    genre: 'Formal letter',
    prompt: 'Die Heizung in Ihrer Wohnung ist seit einer Woche kaputt. Ihr Vermieter reagiert nicht. Schreiben Sie ihm einen Brief.',
    help: 'Describe the problem, refer to earlier contact, set a deadline and mention consequences.',
    points: ['describe the problem and since when', 'mention your earlier attempts to contact him', 'set a deadline for the repair', 'mention the consequences (rent reduction)'],
    words: [130, 190],
    model: `Sehr geehrter Herr Wendt,

hiermit möchte ich Sie darauf hinweisen, dass die Heizung in meiner Wohnung in der Lindenstraße 8 seit dem 2. November nicht mehr funktioniert. Trotz der niedrigen Außentemperaturen steigt die Raumtemperatur kaum über 14 Grad.

Ich habe Sie bereits am 3. November telefonisch und am 5. November per E-Mail über den Schaden informiert. Leider habe ich bis heute keine Antwort erhalten, und es ist auch kein Techniker erschienen.

Da die Situation insbesondere für meine kleine Tochter nicht zumutbar ist, bitte ich Sie dringend, die Reparatur bis spätestens 15. November zu veranlassen. Sollte die Heizung bis dahin nicht wieder funktionieren, werde ich die Miete für die Dauer des Mangels angemessen mindern. Außerdem behalte ich mir vor, einen Handwerker selbst zu beauftragen und Ihnen die Kosten in Rechnung zu stellen.

Ich bitte um eine schriftliche Bestätigung des Reparaturtermins.

Mit freundlichen Grüßen
Elena Petrova`,
    topics: ['society', 'economy'],
  },
  {
    id: 'b2-w-bericht',
    level: 'B2',
    title: 'Report on a training course',
    genre: 'Report',
    prompt: 'Sie haben an einer Weiterbildung teilgenommen. Schreiben Sie einen Bericht für den Newsletter Ihrer Firma.',
    help: 'Report what the course was about, what you learned, how useful it was and whether you recommend it.',
    points: ['what kind of course it was (topic, length, organiser)', 'what you learned', 'what was good and what could be better', 'your recommendation'],
    words: [130, 190],
    model: `Im Oktober habe ich an einem zweitägigen Seminar zum Thema „Präsentieren mit Wirkung“ teilgenommen, das von der Industrie- und Handelskammer angeboten wurde.

Im Mittelpunkt stand die Frage, wie man komplexe Inhalte verständlich und überzeugend vermittelt. Wir haben gelernt, Präsentationen mit einer klaren Kernbotschaft aufzubauen, Folien zu reduzieren und mit Lampenfieber umzugehen. Besonders hilfreich waren die praktischen Übungen: Jede Teilnehmerin und jeder Teilnehmer hielt mehrere Kurzvorträge, die gefilmt und anschließend gemeinsam besprochen wurden.

Positiv fand ich vor allem die kleine Gruppe von nur acht Personen, sodass jeder ausführliches Feedback bekam. Etwas zu kurz kam hingegen das Thema Online-Präsentationen, das in unserem Arbeitsalltag eine immer größere Rolle spielt.

Insgesamt kann ich das Seminar allen Kolleginnen und Kollegen empfehlen, die regelmäßig vor Kunden oder im Team präsentieren. Die Tipps lassen sich sofort umsetzen – meine letzte Projektpräsentation war jedenfalls deutlich kürzer und, wie mir gesagt wurde, auch überzeugender.`,
    topics: ['work'],
  },

  // ───────────── C1 ─────────────
  {
    id: 'c1-w-soziale-medien',
    level: 'C1',
    title: 'Should social media be regulated more strictly?',
    genre: 'Statement (Stellungnahme)',
    prompt: 'Nehmen Sie Stellung zu der Frage, ob soziale Medien stärker reguliert werden sollten. Wägen Sie Argumente ab und kommen Sie zu einem begründeten Urteil.',
    help: 'A balanced argumentative text with a clear conclusion.',
    points: ['introduce the issue and why it matters', 'arguments for stricter regulation', 'arguments against / risks of regulation', 'a nuanced, reasoned conclusion'],
    words: [160, 240],
    model: `Kaum eine Technologie hat das gesellschaftliche Miteinander in so kurzer Zeit so grundlegend verändert wie die sozialen Medien. Umso dringlicher stellt sich die Frage, ob der Staat ihren Einfluss stärker begrenzen sollte.

Für eine strengere Regulierung spricht zunächst die Verbreitung von Desinformation. Algorithmen, die auf maximale Aufmerksamkeit ausgelegt sind, belohnen zugespitzte und emotionalisierende Inhalte – mit bisweilen gravierenden Folgen für demokratische Debatten. Hinzu kommt der Schutz von Kindern und Jugendlichen, die suchtfördernden Designmechanismen weitgehend ungeschützt ausgesetzt sind.

Gleichwohl ist Vorsicht geboten. Jede Regulierung birgt die Gefahr, die Meinungsfreiheit einzuschränken, zumal die Grenze zwischen Desinformation und unbequemer Meinung nicht immer trennscharf zu ziehen ist. Zudem verlagern restriktive Vorgaben das Problem mitunter lediglich auf weniger kontrollierbare Plattformen.

Meines Erachtens sollte Regulierung daher weniger bei einzelnen Inhalten ansetzen als bei den Strukturen: Transparenzpflichten für Empfehlungsalgorithmen, wirksame Altersprüfungen sowie unabhängige Aufsichtsbehörden mit spürbaren Sanktionsmöglichkeiten. Flankiert werden müsste dies durch eine konsequente Förderung der Medienkompetenz in Schulen. Nur so lässt sich verhindern, dass Plattformen ihre Verantwortung auf die Nutzerinnen und Nutzer abwälzen, ohne zugleich die Freiheit zu opfern, die sie zu schützen vorgeben.`,
    topics: ['society', 'tech'],
  },
  {
    id: 'c1-w-zusammenfassung',
    level: 'C1',
    title: 'Summary and comment',
    genre: 'Summary',
    prompt: 'Fassen Sie den Lesetext „Mehrsprachigkeit – Last oder Gewinn?“ zusammen und nehmen Sie anschließend kurz Stellung.',
    help: 'Read the C1 text in the Reading section first. Use reported speech (Konjunktiv I) for the author’s claims.',
    points: ['the main thesis of the text', 'the key arguments (in reported speech)', 'the author’s conclusion', 'your own brief comment'],
    words: [140, 220],
    model: `Der Text „Mehrsprachigkeit – Last oder Gewinn?“ beschäftigt sich mit der Frage, wie sich das Aufwachsen mit mehreren Sprachen auf Kinder auswirkt.

Der Autor legt dar, dass die früher verbreitete Annahme, zwei Sprachen überforderten Kinder, inzwischen als widerlegt gelte. Kinder könnten problemlos mehrsprachig aufwachsen; ein anfänglich kleinerer Wortschatz in einer Einzelsprache werde durch die Summe beider Sprachen meist ausgeglichen. Auch das Mischen von Sprachen sei kein Zeichen von Verwirrung, sondern eine kommunikative Strategie. Umstritten sei hingegen, ob Mehrsprachigkeit generelle kognitive Vorteile mit sich bringe. Unbestritten sei jedoch ihr gesellschaftlicher Wert. Der Autor kritisiert, dass Herkunftssprachen im deutschen Bildungssystem häufig als Defizit gälten, und plädiert dafür, sie gezielt als Ressource zu nutzen.

Ich teile diese Einschätzung weitgehend. Gerade weil Sprachkenntnisse in einer globalisierten Arbeitswelt so gefragt sind, erscheint es widersinnig, vorhandene Kompetenzen von Kindern zu vernachlässigen. Allerdings müsste herkunftssprachlicher Unterricht dafür personell und finanziell deutlich besser ausgestattet werden.`,
    topics: ['culture', 'society'],
  },
  {
    id: 'c1-w-motivation',
    level: 'C1',
    title: 'Motivation letter',
    genre: 'Motivation letter',
    prompt: 'Sie bewerben sich um ein Stipendium für einen Masterstudiengang in Deutschland. Verfassen Sie ein Motivationsschreiben.',
    help: 'Show your motivation, qualifications and goals — formal and persuasive.',
    points: ['why this programme', 'your academic and practical background', 'your goals', 'why you deserve the scholarship'],
    words: [160, 240],
    model: `Sehr geehrte Damen und Herren,

mit großem Interesse bewerbe ich mich um ein Stipendium für den Masterstudiengang „Nachhaltige Stadtentwicklung“ an der Technischen Universität Berlin.

Bereits während meines Bachelorstudiums der Architektur in Porto hat mich die Frage beschäftigt, wie Städte angesichts des Klimawandels lebenswert bleiben können. In meiner Abschlussarbeit habe ich Konzepte zur Begrünung dicht bebauter Altstadtviertel untersucht. Anschließend konnte ich in einem zweijährigen Praktikum bei einem Planungsbüro erste Erfahrungen in der Umsetzung solcher Projekte sammeln – unter anderem bei der Umgestaltung eines Innenhofs nach dem Schwammstadt-Prinzip.

Ihr Studiengang verbindet in einzigartiger Weise stadtplanerische, ökologische und soziale Perspektiven. Besonders reizt mich die Möglichkeit, in interdisziplinären Projekten mit Kommunen zusammenzuarbeiten. Langfristig möchte ich mein Wissen in meiner Heimatstadt einsetzen, die – wie viele südeuropäische Städte – zunehmend unter Hitzeperioden leidet.

Da meine Familie ein Studium im Ausland nicht finanzieren kann, wäre das Stipendium für mich die entscheidende Voraussetzung, diesen Weg einzuschlagen. Ich bin überzeugt, dass ich mit meinem Engagement und meiner Praxiserfahrung einen wertvollen Beitrag zum Studiengang leisten kann.

Über die Gelegenheit zu einem persönlichen Gespräch würde ich mich sehr freuen.

Mit freundlichen Grüßen
Inês Carvalho`,
    topics: ['work', 'nature'],
  },
  {
    id: 'c1-w-grafik',
    level: 'C1',
    title: 'Describing statistics',
    genre: 'Description and interpretation',
    prompt: 'Beschreiben und deuten Sie folgende Zahlen: Anteil der Beschäftigten, die mindestens gelegentlich im Homeoffice arbeiten — 2019: 13 %, 2021: 25 %, 2024: 23 %.',
    help: 'Describe the development precisely, then interpret possible causes and consequences.',
    points: ['introduce the statistic', 'describe the development with precise numbers', 'explain possible reasons', 'give an outlook or your assessment'],
    words: [150, 230],
    model: `Die vorliegenden Zahlen geben Auskunft darüber, welcher Anteil der Beschäftigten in Deutschland zumindest gelegentlich von zu Hause aus arbeitet.

Im Jahr 2019 traf dies lediglich auf 13 Prozent der Erwerbstätigen zu. Bis 2021 hat sich der Anteil mit 25 Prozent nahezu verdoppelt. In den folgenden Jahren ging er nur geringfügig zurück und lag 2024 immer noch bei 23 Prozent – also deutlich über dem Niveau vor der Pandemie.

Der sprunghafte Anstieg lässt sich in erster Linie auf die Corona-Pandemie zurückführen, während der viele Unternehmen ihre Beschäftigten aus Gründen des Infektionsschutzes nach Hause schickten. Bemerkenswert ist jedoch, dass der Anteil nach dem Ende der Kontaktbeschränkungen kaum gesunken ist. Offenbar haben sowohl Arbeitgeber als auch Arbeitnehmer positive Erfahrungen gesammelt, etwa mit der eingesparten Pendelzeit. Zugleich dürfte die inzwischen verbesserte digitale Infrastruktur eine Rolle spielen.

Insgesamt deutet die Entwicklung darauf hin, dass sich das Homeoffice dauerhaft etabliert hat. Es ist allerdings zu bedenken, dass längst nicht alle Berufe dafür geeignet sind – in Pflege, Handwerk oder Produktion bleibt die Präsenz vor Ort unverzichtbar.`,
    topics: ['work', 'economy'],
  },

  // ───────────── C2 ─────────────
  {
    id: 'c2-w-essay',
    level: 'C2',
    title: 'Essay: Is boredom a luxury?',
    genre: 'Essay',
    prompt: 'Verfassen Sie einen Essay zum Thema „Ist Langeweile ein Luxus?“.',
    help: 'A reflective essay: original thesis, nuanced argument, stylistic variety.',
    points: ['an engaging opening', 'a clear thesis', 'nuanced reflection with examples', 'a thoughtful conclusion'],
    words: [200, 290],
    model: `Wer heute zugibt, sich zu langweilen, erntet entweder Mitleid oder Unverständnis. Langeweile gilt als Versäumnis, als Zeichen mangelnder Initiative in einer Welt, die unablässig Beschäftigung anbietet. Dabei ließe sich mit einigem Recht behaupten, dass sie zu einem der seltensten – und kostbarsten – Güter unserer Zeit geworden ist.

Luxus ist, was knapp ist. Und kaum etwas ist knapper als unverplante Zeit, die man sich weder abringen noch rechtfertigen muss. Der Terminkalender ist dicht, die Wartezeit an der Haltestelle wird mit dem Smartphone überbrückt, selbst der Urlaub folgt einem Programm. Wer sich da noch zu langweilen vermag, verfügt über etwas, das sich nicht kaufen lässt: Muße.

Freilich wäre es zynisch, die Langeweile pauschal zu adeln. Für den Arbeitslosen, der seine Tage nicht zu füllen weiß, oder für die Pflegebedürftige, deren Welt auf ein Zimmer geschrumpft ist, ist sie keine Kostbarkeit, sondern eine Last. Langeweile ist nur dann ein Luxus, wenn sie gewählt ist – wenn man ihr jederzeit entkommen könnte und es dennoch nicht tut.

Gerade diese freiwillige Langeweile aber scheint uns abhandenzukommen. Dabei ist sie, wie Psychologen betonen, der Nährboden für Kreativität: Erst wenn der Geist nicht mehr von außen gefüttert wird, beginnt er, eigene Verbindungen zu knüpfen.

Ist Langeweile also ein Luxus? Ja – aber einer, den sich mehr Menschen leisten könnten, als sie glauben. Es kostet nichts, das Handy beiseitezulegen. Es kostet nur ein wenig Mut, die Leere auszuhalten.`,
    topics: ['literature', 'culture'],
  },
  {
    id: 'c2-w-glosse',
    level: 'C2',
    title: 'A satirical column',
    genre: 'Glosse',
    prompt: 'Schreiben Sie eine Glosse über ein Ärgernis des Alltags (z. B. Gruppenchats, Selbstbedienungskassen, Passwortregeln).',
    help: 'Humorous and ironic, with exaggeration, wordplay and a punchline.',
    points: ['a concrete everyday annoyance', 'ironic exaggeration', 'stylistic devices (wordplay, rhetorical questions)', 'a punchline at the end'],
    words: [190, 280],
    model: `Ich bin ein geduldiger Mensch. Ich habe Behördengänge überlebt, Möbel aus Schweden zusammengebaut und einmal sogar eine Tarifverhandlung mit meinem Mobilfunkanbieter geführt. Doch einer Prüfung bin ich nicht gewachsen: der Passwortregel.

Es beginnt harmlos. „Bitte wählen Sie ein sicheres Passwort.“ Gern doch. Ich tippe den Namen meiner ersten Katze, ergänzt um mein Geburtsjahr – ein Meisterwerk der Kryptografie. Das System ist anderer Meinung. Mindestens zwölf Zeichen, belehrt es mich, darunter Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen. Na schön. Aus „Mieze1984“ wird „Mieze1984!Katze“. Abgelehnt: Das Passwort dürfe keine Wörter aus dem Wörterbuch enthalten. Offenbar hat jemand der Software verraten, dass „Katze“ im Duden steht.

Nach dem siebten Versuch akzeptiert das System schließlich „Xq7!rT#v9Lp$“. Ich bin stolz. Ich bin sicher. Und ich habe das Passwort bereits vergessen, noch bevor ich auf „Speichern“ geklickt habe.

Also klicke ich auf „Passwort vergessen?“ – eine Frage, die in ihrer philosophischen Tiefe unterschätzt wird. Wer könnte sich in diesen Zeiten noch an irgendetwas erinnern? Prompt erhalte ich eine E-Mail mit einem Link, der nach fünfzehn Minuten verfällt, und die Aufforderung, ein neues Passwort zu wählen. Es dürfe keinem der letzten zehn Passwörter ähneln.

Inzwischen habe ich eine Lösung gefunden: Ich notiere alle Passwörter auf einem Zettel, den ich gut sichtbar an den Bildschirm klebe. Sicherer geht es nicht. Schließlich wählt kein Hacker freiwillig ein so analoges Angriffsziel.`,
    topics: ['tech', 'society'],
  },
  {
    id: 'c2-w-rezension',
    level: 'C2',
    title: 'Review of a book or film',
    genre: 'Review',
    prompt: 'Verfassen Sie eine Rezension eines Buches oder Films, das bzw. den Sie gut kennen.',
    help: 'Introduce the work, summarise briefly, evaluate with nuance, recommend.',
    points: ['introduce the work and its context', 'a brief summary without spoilers', 'a nuanced evaluation of strengths and weaknesses', 'a clear recommendation'],
    words: [190, 280],
    model: `Mit „Der Vorleser“ legte Bernhard Schlink 1995 einen Roman vor, der weit über Deutschland hinaus Beachtung fand und bis heute in Schulen gelesen wird – nicht ohne Grund, wie sich bei der erneuten Lektüre zeigt.

Erzählt wird die Geschichte des fünfzehnjährigen Michael Berg, der eine Affäre mit der deutlich älteren Hanna Schmitz beginnt. Jahre später begegnet er ihr als Jurastudent wieder – im Gerichtssaal, wo ihr als ehemaliger KZ-Aufseherin der Prozess gemacht wird.

Die Stärke des Romans liegt in seiner unaufgeregten, beinahe protokollarischen Sprache, die das Ungeheuerliche gerade durch ihre Nüchternheit spürbar macht. Schlink verweigert einfache Antworten: Die Frage, ob Verstehen bereits ein Verzeihen bedeutet, durchzieht das Buch, ohne je aufgelöst zu werden. Damit trifft er einen Nerv der Nachkriegsgeneration, die ihre Eltern lieben und zugleich verurteilen musste.

Gleichwohl ist der Roman nicht frei von Schwächen. Kritiker haben ihm vorgeworfen, er lenke die Empathie der Leserschaft allzu sehr auf die Täterin, deren Analphabetismus beinahe als mildernder Umstand erscheint. Dieser Einwand ist nicht von der Hand zu weisen, auch wenn man Schlink zugutehalten muss, dass er die Ambivalenz bewusst inszeniert.

Unterm Strich bleibt ein schmales, aber gewichtiges Buch, das zum Nachdenken zwingt und sich jeder bequemen Lesart entzieht. Wer bereit ist, sich auf seine moralischen Grauzonen einzulassen, wird reich belohnt.`,
    topics: ['literature', 'history'],
  },
  {
    id: 'c2-w-offener-brief',
    level: 'C2',
    title: 'Open letter to the mayor',
    genre: 'Open letter',
    prompt: 'Die Stadt plant, zwei Stadtteilbibliotheken zu schließen. Schreiben Sie einen offenen Brief an die Oberbürgermeisterin.',
    help: 'Formal, persuasive and public: arguments, rhetorical devices, a clear demand.',
    points: ['state the occasion and your concern', 'arguments for the libraries (social, educational, cultural)', 'acknowledge the budget situation', 'a clear demand or alternative proposal'],
    words: [190, 280],
    model: `Sehr geehrte Frau Oberbürgermeisterin,

mit Bestürzung haben wir zur Kenntnis genommen, dass die Stadtverwaltung die Schließung der Stadtteilbibliotheken in Nord und Ost erwägt. Wir wenden uns daher mit diesem offenen Brief an Sie.

Bibliotheken sind weit mehr als Ausleihstellen für Bücher. Sie sind einer der letzten Orte, an denen sich Menschen begegnen können, ohne etwas konsumieren zu müssen. Hier machen Kinder ihre Hausaufgaben, weil es zu Hause keinen ruhigen Platz gibt; hier lernen Zugewanderte Deutsch; hier finden ältere Menschen Gesellschaft und Hilfe im Umgang mit digitalen Behörden. Wer diese Orte schließt, spart nicht – er verschiebt die Kosten in andere Bereiche, in denen sie umso schwerer wiegen.

Wir verkennen keineswegs die angespannte Haushaltslage. Doch gerade in Zeiten knapper Kassen muss sich eine Stadt fragen, was ihr der soziale Zusammenhalt wert ist. Die eingesparte Summe entspricht, gemessen am Gesamthaushalt, einem Bruchteil – der gesellschaftliche Schaden hingegen wäre beträchtlich.

Wir schlagen Ihnen daher vor, gemeinsam mit Bürgerinnen und Bürgern sowie Fördervereinen tragfähige Alternativen zu entwickeln: etwa verkürzte Öffnungszeiten, ehrenamtliche Unterstützung oder eine Kooperation mit Schulen. Wir sind bereit, uns daran aktiv zu beteiligen.

Lassen Sie nicht zu, dass unsere Stadtteile ein Stück ihrer Seele verlieren.

Mit freundlichen Grüßen
Initiative „Bibliotheken bleiben“`,
    topics: ['society', 'culture', 'literature'],
  },
];

export const WRITING_BY_ID: Record<string, WritingTask> = Object.fromEntries(WRITING_TASKS.map((t) => [t.id, t]));

export function generalChecks(level: Level): string[] {
  return GENERAL_CHECKS[level.charAt(0) as 'A' | 'B' | 'C'];
}
