/**
 * Word lists and sentence material for the generated B1–C2 drills (lib/exercise/drills-advanced.ts).
 * Every list is combined with templates, persons and tenses, so the drills keep producing new exercises.
 */

export type G4 = 'm' | 'f' | 'n' | 'pl';

/** Nouns for relative-clause drills: p = person, t = thing. */
export const REL_NOUNS: { w: string; g: 'm' | 'f' | 'n'; pl: string; k: 'p' | 't' }[] = [
  { w: 'Mann', g: 'm', pl: 'Männer', k: 'p' },
  { w: 'Lehrer', g: 'm', pl: 'Lehrer', k: 'p' },
  { w: 'Nachbar', g: 'm', pl: 'Nachbarn', k: 'p' },
  { w: 'Arzt', g: 'm', pl: 'Ärzte', k: 'p' },
  { w: 'Freund', g: 'm', pl: 'Freunde', k: 'p' },
  { w: 'Frau', g: 'f', pl: 'Frauen', k: 'p' },
  { w: 'Lehrerin', g: 'f', pl: 'Lehrerinnen', k: 'p' },
  { w: 'Ärztin', g: 'f', pl: 'Ärztinnen', k: 'p' },
  { w: 'Nachbarin', g: 'f', pl: 'Nachbarinnen', k: 'p' },
  { w: 'Kind', g: 'n', pl: 'Kinder', k: 'p' },
  { w: 'Mädchen', g: 'n', pl: 'Mädchen', k: 'p' },
  { w: 'Schlüssel', g: 'm', pl: 'Schlüssel', k: 't' },
  { w: 'Film', g: 'm', pl: 'Filme', k: 't' },
  { w: 'Koffer', g: 'm', pl: 'Koffer', k: 't' },
  { w: 'Brief', g: 'm', pl: 'Briefe', k: 't' },
  { w: 'Stuhl', g: 'm', pl: 'Stühle', k: 't' },
  { w: 'Tasche', g: 'f', pl: 'Taschen', k: 't' },
  { w: 'Jacke', g: 'f', pl: 'Jacken', k: 't' },
  { w: 'Uhr', g: 'f', pl: 'Uhren', k: 't' },
  { w: 'Lampe', g: 'f', pl: 'Lampen', k: 't' },
  { w: 'Zeitung', g: 'f', pl: 'Zeitungen', k: 't' },
  { w: 'Buch', g: 'n', pl: 'Bücher', k: 't' },
  { w: 'Auto', g: 'n', pl: 'Autos', k: 't' },
  { w: 'Fahrrad', g: 'n', pl: 'Fahrräder', k: 't' },
  { w: 'Handy', g: 'n', pl: 'Handys', k: 't' },
  { w: 'Bild', g: 'n', pl: 'Bilder', k: 't' },
];

/**
 * Relative clauses with a gap for the relative pronoun.
 * k: which nouns fit (p/t/b = both); c: case of the pronoun; pl: plural version when the verb agrees with the pronoun.
 */
export const REL_FRAMES: { k: 'p' | 't' | 'b'; c: 'nom' | 'acc' | 'dat' | 'gen'; sg: string; pl?: string; why: string }[] = [
  { k: 'b', c: 'nom', sg: '___ gestern hier war', pl: '___ gestern hier waren', why: 'it is the subject of the relative clause' },
  { k: 'p', c: 'nom', sg: '___ immer so nett ist', pl: '___ immer so nett sind', why: 'it is the subject of the relative clause' },
  { k: 't', c: 'nom', sg: '___ auf dem Tisch liegt', pl: '___ auf dem Tisch liegen', why: 'it is the subject of the relative clause' },
  { k: 't', c: 'nom', sg: '___ so teuer war', pl: '___ so teuer waren', why: 'it is the subject of the relative clause' },
  { k: 'p', c: 'acc', sg: '___ ich gestern getroffen habe', why: 'it is the accusative object of treffen' },
  { k: 'p', c: 'acc', sg: '___ du so gut kennst', why: 'it is the accusative object of kennen' },
  { k: 't', c: 'acc', sg: '___ ich gestern gekauft habe', why: 'it is the accusative object of kaufen' },
  { k: 't', c: 'acc', sg: '___ du so lange gesucht hast', why: 'it is the accusative object of suchen' },
  { k: 'b', c: 'acc', sg: 'auf ___ wir warten', why: 'warten auf takes the accusative' },
  { k: 'b', c: 'acc', sg: 'über ___ wir gesprochen haben', why: 'sprechen über takes the accusative' },
  { k: 'p', c: 'dat', sg: 'mit ___ ich telefoniert habe', why: 'mit takes the dative' },
  { k: 'p', c: 'dat', sg: '___ ich geholfen habe', why: 'helfen takes the dative' },
  { k: 'p', c: 'dat', sg: '___ du das Geld gegeben hast', why: 'the receiver of geben is in the dative' },
  { k: 'b', c: 'dat', sg: 'von ___ ich dir erzählt habe', why: 'von takes the dative' },
  { k: 'p', c: 'gen', sg: '___ Namen ich vergessen habe', why: 'it expresses possession (whose name)' },
  { k: 'p', c: 'gen', sg: '___ Auto vor der Tür steht', why: 'it expresses possession (whose car)' },
  { k: 'b', c: 'gen', sg: '___ Farbe mir so gut gefällt', why: 'it expresses possession (whose colour)' },
];

/**
 * Transitive actions for passive and participle drills.
 * pres/past: 3rd person singular active (for „man …“); sep: separable prefix; obl: noun form in acc/dat (weak nouns).
 */
export interface PassiveItem {
  g: G4;
  n: string;
  obl?: string;
  inf: string;
  pres: string;
  past: string;
  pp: string;
  sep?: string;
  /** natural with muss/kann/soll */
  modal?: false;
}
export const PASSIVE_ITEMS: PassiveItem[] = [
  { g: 'n', n: 'Auto', inf: 'reparieren', pres: 'repariert', past: 'reparierte', pp: 'repariert' },
  { g: 'pl', n: 'Fenster', inf: 'putzen', pres: 'putzt', past: 'putzte', pp: 'geputzt' },
  { g: 'm', n: 'Brief', inf: 'schreiben', pres: 'schreibt', past: 'schrieb', pp: 'geschrieben' },
  { g: 'n', n: 'Paket', inf: 'schicken', pres: 'schickt', past: 'schickte', pp: 'geschickt' },
  { g: 'f', n: 'Rechnung', inf: 'bezahlen', pres: 'bezahlt', past: 'bezahlte', pp: 'bezahlt' },
  { g: 'f', n: 'Tür', inf: 'öffnen', pres: 'öffnet', past: 'öffnete', pp: 'geöffnet' },
  { g: 'n', n: 'Essen', inf: 'kochen', pres: 'kocht', past: 'kochte', pp: 'gekocht' },
  { g: 'n', n: 'Zimmer', inf: 'aufräumen', pres: 'räumt', past: 'räumte', pp: 'aufgeräumt', sep: 'auf' },
  { g: 'n', n: 'Formular', inf: 'ausfüllen', pres: 'füllt', past: 'füllte', pp: 'ausgefüllt', sep: 'aus' },
  { g: 'm', n: 'Termin', inf: 'verschieben', pres: 'verschiebt', past: 'verschob', pp: 'verschoben' },
  { g: 'n', n: 'Problem', inf: 'lösen', pres: 'löst', past: 'löste', pp: 'gelöst' },
  { g: 'f', n: 'Wohnung', inf: 'renovieren', pres: 'renoviert', past: 'renovierte', pp: 'renoviert' },
  { g: 'f', n: 'Straße', inf: 'sperren', pres: 'sperrt', past: 'sperrte', pp: 'gesperrt' },
  { g: 'pl', n: 'Gäste', inf: 'begrüßen', pres: 'begrüßt', past: 'begrüßte', pp: 'begrüßt' },
  { g: 'm', n: 'Patient', obl: 'Patienten', inf: 'untersuchen', pres: 'untersucht', past: 'untersuchte', pp: 'untersucht' },
  { g: 'pl', n: 'Kinder', inf: 'abholen', pres: 'holt', past: 'holte', pp: 'abgeholt', sep: 'ab' },
  { g: 'm', n: 'Kuchen', inf: 'backen', pres: 'backt', past: 'backte', pp: 'gebacken' },
  { g: 'pl', n: 'Briefe', inf: 'verschicken', pres: 'verschickt', past: 'verschickte', pp: 'verschickt' },
  { g: 'n', n: 'Licht', inf: 'ausschalten', pres: 'schaltet', past: 'schaltete', pp: 'ausgeschaltet', sep: 'aus' },
  { g: 'm', n: 'Vertrag', inf: 'unterschreiben', pres: 'unterschreibt', past: 'unterschrieb', pp: 'unterschrieben' },
  { g: 'n', n: 'Konzert', inf: 'absagen', pres: 'sagt', past: 'sagte', pp: 'abgesagt', sep: 'ab' },
  { g: 'pl', n: 'Hausaufgaben', inf: 'korrigieren', pres: 'korrigiert', past: 'korrigierte', pp: 'korrigiert' },
  { g: 'm', n: 'Computer', inf: 'reparieren', pres: 'repariert', past: 'reparierte', pp: 'repariert' },
  { g: 'pl', n: 'Waren', inf: 'liefern', pres: 'liefert', past: 'lieferte', pp: 'geliefert' },
  { g: 'n', n: 'Geschirr', inf: 'spülen', pres: 'spült', past: 'spülte', pp: 'gespült' },
  { g: 'm', n: 'Rasen', inf: 'mähen', pres: 'mäht', past: 'mähte', pp: 'gemäht' },
  { g: 'pl', n: 'Geschenke', inf: 'einpacken', pres: 'packt', past: 'packte', pp: 'eingepackt', sep: 'ein' },
  { g: 'n', n: 'Fahrrad', inf: 'stehlen', pres: 'stiehlt', past: 'stahl', pp: 'gestohlen', modal: false },
  { g: 'm', n: 'Text', inf: 'übersetzen', pres: 'übersetzt', past: 'übersetzte', pp: 'übersetzt' },
  { g: 'pl', n: 'Daten', inf: 'speichern', pres: 'speichert', past: 'speicherte', pp: 'gespeichert' },
  { g: 'n', n: 'Projekt', inf: 'planen', pres: 'plant', past: 'plante', pp: 'geplant' },
  { g: 'm', n: 'Bericht', inf: 'schreiben', pres: 'schreibt', past: 'schrieb', pp: 'geschrieben' },
  { g: 'f', n: 'Heizung', inf: 'prüfen', pres: 'prüft', past: 'prüfte', pp: 'geprüft' },
  { g: 'n', n: 'Dach', inf: 'reparieren', pres: 'repariert', past: 'reparierte', pp: 'repariert' },
  { g: 'f', n: 'Prüfung', inf: 'verschieben', pres: 'verschiebt', past: 'verschob', pp: 'verschoben' },
  { g: 'pl', n: 'Kosten', inf: 'senken', pres: 'senkt', past: 'senkte', pp: 'gesenkt' },
];

/** Things that can (not) be done, for -bar / sich lassen / sein + zu. */
export const PASSIVE_ALT: { g: G4; n: string; inf: string; bar: string; pp: string }[] = [
  { g: 'n', n: 'Problem', inf: 'lösen', bar: 'lösbar', pp: 'gelöst' },
  { g: 'n', n: 'Wasser', inf: 'trinken', bar: 'trinkbar', pp: 'getrunken' },
  { g: 'f', n: 'Schrift', inf: 'lesen', bar: 'lesbar', pp: 'gelesen' },
  { g: 'm', n: 'Fehler', inf: 'vermeiden', bar: 'vermeidbar', pp: 'vermieden' },
  { g: 'n', n: 'Gerät', inf: 'reparieren', bar: 'reparierbar', pp: 'repariert' },
  { g: 'n', n: 'Ziel', inf: 'erreichen', bar: 'erreichbar', pp: 'erreicht' },
  { g: 'm', n: 'Plan', inf: 'umsetzen', bar: 'umsetzbar', pp: 'umgesetzt' },
  { g: 'f', n: 'Aufgabe', inf: 'lösen', bar: 'lösbar', pp: 'gelöst' },
  { g: 'n', n: 'Ergebnis', inf: 'vorhersagen', bar: 'vorhersagbar', pp: 'vorhergesagt' },
  { g: 'm', n: 'Text', inf: 'übersetzen', bar: 'übersetzbar', pp: 'übersetzt' },
  { g: 'f', n: 'Frage', inf: 'beantworten', bar: 'beantwortbar', pp: 'beantwortet' },
  { g: 'n', n: 'Material', inf: 'recyceln', bar: 'recycelbar', pp: 'recycelt' },
  { g: 'm', n: 'Termin', inf: 'verschieben', bar: 'verschiebbar', pp: 'verschoben' },
  { g: 'f', n: 'Entwicklung', inf: 'erklären', bar: 'erklärbar', pp: 'erklärt' },
  { g: 'n', n: 'Risiko', inf: 'kontrollieren', bar: 'kontrollierbar', pp: 'kontrolliert' },
  { g: 'pl', n: 'Kosten', inf: 'berechnen', bar: 'berechenbar', pp: 'berechnet' },
  { g: 'pl', n: 'Daten', inf: 'nutzen', bar: 'nutzbar', pp: 'genutzt' },
];

/** Partizip I attributes: the noun does the action itself (das lachende Kind). */
export const PARTICIPLE_I: { g: G4; n: string; pa: string; v: string; ext: string }[] = [
  { g: 'n', n: 'Kind', pa: 'lachend', v: 'lacht', ext: 'laut' },
  { g: 'm', n: 'Hund', pa: 'bellend', v: 'bellt', ext: 'laut' },
  { g: 'pl', n: 'Preise', pa: 'steigend', v: 'steigen', ext: 'ständig' },
  { g: 'n', n: 'Wasser', pa: 'kochend', v: 'kocht', ext: 'im Topf' },
  { g: 'n', n: 'Baby', pa: 'schlafend', v: 'schläft', ext: 'friedlich' },
  { g: 'f', n: 'Frau', pa: 'weinend', v: 'weint', ext: 'leise' },
  { g: 'pl', n: 'Gäste', pa: 'wartend', v: 'warten', ext: 'draußen' },
  { g: 'pl', n: 'Kinder', pa: 'spielend', v: 'spielen', ext: 'im Garten' },
  { g: 'm', n: 'Zug', pa: 'abfahrend', v: 'abfährt', ext: 'gerade' },
  { g: 'm', n: 'Vogel', pa: 'singend', v: 'singt', ext: 'im Baum' },
  { g: 'pl', n: 'Kosten', pa: 'wachsend', v: 'wachsen', ext: 'schnell' },
  { g: 'f', n: 'Bevölkerung', pa: 'wachsend', v: 'wächst', ext: 'schnell' },
  { g: 'm', n: 'Mann', pa: 'rauchend', v: 'raucht', ext: 'vor der Tür' },
  { g: 'pl', n: 'Zuschauer', pa: 'applaudierend', v: 'applaudieren', ext: 'begeistert' },
  { g: 'f', n: 'Musik', pa: 'störend', v: 'stört', ext: 'laut' },
  { g: 'm', n: 'Verkehr', pa: 'zunehmend', v: 'zunimmt', ext: 'ständig' },
  { g: 'n', n: 'Mädchen', pa: 'tanzend', v: 'tanzt', ext: 'auf der Bühne' },
  { g: 'f', n: 'Temperatur', pa: 'sinkend', v: 'sinkt', ext: 'nachts' },
  { g: 'f', n: 'Katze', pa: 'schlafend', v: 'schläft', ext: 'auf dem Sofa' },
  { g: 'pl', n: 'Schüler', pa: 'lernend', v: 'lernen', ext: 'still' },
  { g: 'n', n: 'Publikum', pa: 'klatschend', v: 'klatscht', ext: 'laut' },
  { g: 'f', n: 'Arbeitslosigkeit', pa: 'steigend', v: 'steigt', ext: 'seit Jahren' },
];

/** Verbs with a fixed preposition: [sentence with gap, preposition, case, sentence with da-word gap, question with wo-word gap]. */
export const VERB_PREPS: [string, string, 'acc' | 'dat', string, string][] = [
  ['Ich warte ___ den Bus.', 'auf', 'acc', 'Ich warte schon lange ___.', '___ wartest du?'],
  ['Wir freuen uns ___ die Ferien.', 'auf', 'acc', 'Wir freuen uns schon ___.', '___ freut ihr euch?'],
  ['Sie freut sich ___ das Geschenk.', 'über', 'acc', 'Sie freut sich sehr ___.', '___ freut sie sich so?'],
  ['Er interessiert sich ___ Fußball.', 'für', 'acc', 'Er interessiert sich nicht ___.', '___ interessierst du dich?'],
  ['Ich denke oft ___ den Urlaub.', 'an', 'acc', 'Ich denke oft ___.', '___ denkst du gerade?'],
  ['Erinnerst du dich ___ den Abend?', 'an', 'acc', 'Ja, ich erinnere mich gut ___.', '___ erinnerst du dich?'],
  ['Wir sprechen morgen ___ das Problem.', 'über', 'acc', 'Wir sprechen morgen ___.', '___ sprecht ihr?'],
  ['Er ärgert sich ___ den Lärm.', 'über', 'acc', 'Er ärgert sich jeden Tag ___.', '___ ärgerst du dich?'],
  ['Sie kümmert sich ___ den Garten.', 'um', 'acc', 'Sie kümmert sich ___.', '___ kümmerst du dich?'],
  ['Ich bewerbe mich ___ die Stelle.', 'um', 'acc', 'Ich bewerbe mich ___.', '___ bewirbst du dich?'],
  ['Er bittet ___ Hilfe.', 'um', 'acc', 'Er bittet ___.', '___ bittet er?'],
  ['Die Gäste beschweren sich ___ das Essen.', 'über', 'acc', 'Die Gäste beschweren sich ___.', '___ beschweren sich die Gäste?'],
  ['Ich bereite mich ___ die Prüfung vor.', 'auf', 'acc', 'Ich bereite mich gut ___ vor.', '___ bereitest du dich vor?'],
  ['Sie träumt ___ einem Haus am Meer.', 'von', 'dat', 'Sie träumt schon lange ___.', '___ träumst du?'],
  ['Er erzählt ___ seiner Reise.', 'von', 'dat', 'Er erzählt gern ___.', '___ erzählt er?'],
  ['Ich nehme ___ dem Kurs teil.', 'an', 'dat', 'Ich nehme gern ___ teil.', '___ nimmst du teil?'],
  ['Ich gewöhne mich ___ das Wetter.', 'an', 'acc', 'Ich gewöhne mich langsam ___.', '___ musst du dich gewöhnen?'],
  ['Sie hat Angst ___ der Prüfung.', 'vor', 'dat', 'Sie hat große Angst ___.', '___ hast du Angst?'],
  ['Ich bedanke mich ___ das Geschenk.', 'für', 'acc', 'Ich bedanke mich herzlich ___.', '___ bedankst du dich?'],
  ['Er entschuldigt sich ___ den Fehler.', 'für', 'acc', 'Er entschuldigt sich ___.', '___ entschuldigt er sich?'],
  ['Ich konzentriere mich ___ die Arbeit.', 'auf', 'acc', 'Ich konzentriere mich ganz ___.', '___ konzentrierst du dich?'],
  ['Wir achten ___ die Qualität.', 'auf', 'acc', 'Wir achten genau ___.', '___ achtet ihr?'],
  ['Du kannst dich ___ meine Hilfe verlassen.', 'auf', 'acc', 'Du kannst dich ___ verlassen.', '___ kann ich mich verlassen?'],
  ['Er beschäftigt sich ___ Geschichte.', 'mit', 'dat', 'Er beschäftigt sich viel ___.', '___ beschäftigst du dich?'],
  ['Wir fangen ___ der Arbeit an.', 'mit', 'dat', 'Wir fangen gleich ___ an.', '___ fangen wir an?'],
  ['Er hört ___ dem Rauchen auf.', 'mit', 'dat', 'Er hört endlich ___ auf.', '___ hörst du auf?'],
  ['Das hängt ___ dem Wetter ab.', 'von', 'dat', 'Das hängt ___ ab.', '___ hängt das ab?'],
  ['Sie sorgt sich ___ ihre Gesundheit.', 'um', 'acc', 'Sie sorgt sich ___.', '___ sorgst du dich?'],
  ['Er glaubt ___ eine bessere Zukunft.', 'an', 'acc', 'Er glaubt fest ___.', '___ glaubst du?'],
  ['Viele beteiligen sich ___ dem Projekt.', 'an', 'dat', 'Viele beteiligen sich ___.', '___ beteiligst du dich?'],
  ['Wir hoffen ___ gutes Wetter.', 'auf', 'acc', 'Wir hoffen ___.', '___ hofft ihr?'],
  ['Sie diskutieren ___ die Politik.', 'über', 'acc', 'Sie diskutieren lange ___.', '___ diskutiert ihr?'],
  ['Ich wundere mich ___ seine Antwort.', 'über', 'acc', 'Ich wundere mich ___.', '___ wunderst du dich?'],
  ['Ich habe mich ___ das rote Kleid entschieden.', 'für', 'acc', 'Ich habe mich ___ entschieden.', '___ hast du dich entschieden?'],
  ['Er fragt ___ dem Weg.', 'nach', 'dat', 'Er fragt ___.', '___ fragt er?'],
  ['Ich suche ___ meinem Schlüssel.', 'nach', 'dat', 'Ich suche schon lange ___.', '___ suchst du?'],
  ['Hier riecht es ___ Kaffee.', 'nach', 'dat', 'Hier riecht es ___.', '___ riecht es hier?'],
  ['Das gehört ___ meinen Aufgaben.', 'zu', 'dat', 'Das gehört auch ___.', '___ gehört das?'],
  ['Sie erkundigt sich ___ dem Preis.', 'nach', 'dat', 'Sie erkundigt sich ___.', '___ erkundigst du dich?'],
  ['Ich verzichte ___ Zucker.', 'auf', 'acc', 'Ich verzichte gern ___.', '___ verzichtest du?'],
  ['Ich zweifle ___ seiner Ehrlichkeit.', 'an', 'dat', 'Ich zweifle nicht ___.', '___ zweifelst du?'],
  ['Wie reagierst du ___ die Kritik?', 'auf', 'acc', 'Wie reagierst du ___?', '___ hat er so heftig reagiert?'],
  ['Die Creme schützt ___ der Sonne.', 'vor', 'dat', 'Die Creme schützt ___.', '___ schützt die Creme?'],
  ['Viele leiden ___ dem Stress.', 'unter', 'dat', 'Viele leiden ___.', '___ leidest du?'],
  ['Ich verlasse mich ___ deine Erfahrung.', 'auf', 'acc', 'Ich verlasse mich ___.', '___ verlässt du dich?'],
];

/** lassen + infinitive: someone else does it. */
export const LASSEN_ITEMS: [string, string][] = [
  ['das Auto', 'reparieren'],
  ['den Computer', 'reparieren'],
  ['die Wohnung', 'renovieren'],
  ['die Fenster', 'putzen'],
  ['den Anzug', 'reinigen'],
  ['das Essen', 'liefern'],
  ['die Heizung', 'reparieren'],
  ['das Kleid', 'ändern'],
  ['den Brief', 'übersetzen'],
  ['das Dach', 'reparieren'],
  ['die Möbel', 'liefern'],
  ['den Rasen', 'mähen'],
  ['das Bad', 'renovieren'],
  ['die Unterlagen', 'kopieren'],
  ['das Zimmer', 'streichen'],
  ['den Fernseher', 'reparieren'],
  ['die Schuhe', 'reparieren'],
  ['das Paket', 'abholen'],
  ['die Pizza', 'bringen'],
  ['das Foto', 'vergrößern'],
];

/** Phrases ending in an infinitive, for zu-infinitive drills; sep = separable prefix of the last verb. */
export const ZU_PHRASES: { p: string; v: string; sep?: string }[] = [
  { p: 'früh', v: 'aufstehen', sep: 'auf' },
  { p: 'das Fenster', v: 'aufmachen', sep: 'auf' },
  { p: 'mehr Wasser', v: 'trinken' },
  { p: 'pünktlich', v: 'sein' },
  { p: 'die Rechnung', v: 'bezahlen' },
  { p: 'meine Eltern', v: 'anrufen', sep: 'an' },
  { p: 'im Supermarkt', v: 'einkaufen', sep: 'ein' },
  { p: 'die Wohnung', v: 'aufräumen', sep: 'auf' },
  { p: 'jeden Tag Deutsch', v: 'lernen' },
  { p: 'mit dem Rauchen', v: 'aufhören', sep: 'auf' },
  { p: 'einen Termin', v: 'vereinbaren' },
  { p: 'das Licht', v: 'ausschalten', sep: 'aus' },
  { p: 'den Müll', v: 'rausbringen', sep: 'raus' },
  { p: 'mehr Sport', v: 'machen' },
  { p: 'die Tür', v: 'abschließen', sep: 'ab' },
  { p: 'das Formular', v: 'ausfüllen', sep: 'aus' },
  { p: 'eine neue Sprache', v: 'lernen' },
  { p: 'meine Freunde', v: 'einladen', sep: 'ein' },
  { p: 'den Termin', v: 'absagen', sep: 'ab' },
  { p: 'weniger Fleisch', v: 'essen' },
  { p: 'die Blumen', v: 'gießen' },
  { p: 'am Kurs', v: 'teilnehmen', sep: 'teil' },
  { p: 'das Buch', v: 'zurückgeben', sep: 'zurück' },
  { p: 'die Wahrheit', v: 'sagen' },
];

/** Main clauses that take a zu-infinitive (… = the infinitive clause). */
export const ZU_FRAMES = ['Ich habe vergessen, …', 'Hast du Lust, …?', 'Es ist wichtig, …', 'Er versucht, …', 'Wir haben keine Zeit, …', 'Vergiss nicht, …!', 'Sie hat beschlossen, …', 'Es ist nicht leicht, …', 'Ich habe keine Lust, …', 'Denk bitte daran, …!'];

/** Situations for als / wenn: [present clause (verb last), past clause, present main (verb first), past main]. */
export const ALS_WENN: [string, string, string, string][] = [
  ['nach Hause komme', 'nach Hause kam', 'koche ich etwas', 'kochte ich etwas'],
  ['in Berlin bin', 'in Berlin war', 'besuche ich meine Tante', 'besuchte ich meine Tante'],
  ['Zeit habe', 'Zeit hatte', 'lese ich ein Buch', 'las ich ein Buch'],
  ['müde bin', 'müde war', 'trinke ich einen Kaffee', 'trank ich einen Kaffee'],
  ['im Urlaub bin', 'im Urlaub war', 'schlafe ich lange', 'schlief ich lange'],
  ['den Bus verpasse', 'den Bus verpasste', 'nehme ich ein Taxi', 'nahm ich ein Taxi'],
  ['krank bin', 'krank war', 'bleibe ich im Bett', 'blieb ich im Bett'],
  ['meine Oma besuche', 'meine Oma besuchte', 'backt sie einen Kuchen', 'backte sie einen Kuchen'],
  ['aus dem Fenster schaue', 'aus dem Fenster schaute', 'sehe ich den Park', 'sah ich den Park'],
  ['Musik höre', 'Musik hörte', 'vergesse ich die Zeit', 'vergaß ich die Zeit'],
  ['in der Stadt bin', 'in der Stadt war', 'gehe ich ins Café', 'ging ich ins Café'],
  ['meinen Bruder treffe', 'meinen Bruder traf', 'spielen wir Schach', 'spielten wir Schach'],
  ['am Meer bin', 'am Meer war', 'gehe ich schwimmen', 'ging ich schwimmen'],
  ['Hunger habe', 'Hunger hatte', 'esse ich einen Apfel', 'aß ich einen Apfel'],
];

/** Pairs for obwohl/trotzdem (c = contrast) or weil/deshalb (r = reason): [A, A verb-last, B, B verb-first, type]. */
export const CLAUSE_PAIRS: [string, string, string, string, 'c' | 'r'][] = [
  ['Es regnet', 'es regnet', 'Wir gehen spazieren', 'gehen wir spazieren', 'c'],
  ['Er ist krank', 'er krank ist', 'Er geht zur Arbeit', 'geht er zur Arbeit', 'c'],
  ['Das Hotel war teuer', 'das Hotel teuer war', 'Wir haben es gebucht', 'haben wir es gebucht', 'c'],
  ['Sie hat viel gelernt', 'sie viel gelernt hat', 'Sie hat die Prüfung nicht bestanden', 'hat sie die Prüfung nicht bestanden', 'c'],
  ['Ich bin müde', 'ich müde bin', 'Ich arbeite weiter', 'arbeite ich weiter', 'c'],
  ['Der Film war lang', 'der Film lang war', 'Er war spannend', 'war er spannend', 'c'],
  ['Es ist kalt', 'es kalt ist', 'Die Kinder spielen draußen', 'spielen die Kinder draußen', 'c'],
  ['Er hat wenig Zeit', 'er wenig Zeit hat', 'Er hilft uns', 'hilft er uns', 'c'],
  ['Das Essen war kalt', 'das Essen kalt war', 'Es hat gut geschmeckt', 'hat es gut geschmeckt', 'c'],
  ['Sie spricht kaum Deutsch', 'sie kaum Deutsch spricht', 'Sie hat die Stelle bekommen', 'hat sie die Stelle bekommen', 'c'],
  ['Der Zug hatte Verspätung', 'der Zug Verspätung hatte', 'Wir sind pünktlich angekommen', 'sind wir pünktlich angekommen', 'c'],
  ['Ich habe keinen Hunger', 'ich keinen Hunger habe', 'Ich esse ein Stück Kuchen', 'esse ich ein Stück Kuchen', 'c'],
  ['Die Wohnung ist klein', 'die Wohnung klein ist', 'Wir fühlen uns dort wohl', 'fühlen wir uns dort wohl', 'c'],
  ['Er verdient wenig', 'er wenig verdient', 'Er ist zufrieden', 'ist er zufrieden', 'c'],
  ['Es regnet', 'es regnet', 'Wir bleiben zu Hause', 'bleiben wir zu Hause', 'r'],
  ['Er ist krank', 'er krank ist', 'Er bleibt im Bett', 'bleibt er im Bett', 'r'],
  ['Der Zug hatte Verspätung', 'der Zug Verspätung hatte', 'Ich bin zu spät gekommen', 'bin ich zu spät gekommen', 'r'],
  ['Ich habe Hunger', 'ich Hunger habe', 'Ich mache mir ein Brot', 'mache ich mir ein Brot', 'r'],
  ['Sie hat viel gelernt', 'sie viel gelernt hat', 'Sie hat die Prüfung bestanden', 'hat sie die Prüfung bestanden', 'r'],
  ['Das Hotel war zu teuer', 'das Hotel zu teuer war', 'Wir haben ein anderes gebucht', 'haben wir ein anderes gebucht', 'r'],
  ['Ich bin müde', 'ich müde bin', 'Ich gehe früh ins Bett', 'gehe ich früh ins Bett', 'r'],
  ['Es ist sehr heiß', 'es sehr heiß ist', 'Wir gehen schwimmen', 'gehen wir schwimmen', 'r'],
  ['Er hat keine Zeit', 'er keine Zeit hat', 'Er kommt nicht mit', 'kommt er nicht mit', 'r'],
  ['Der Laden war geschlossen', 'der Laden geschlossen war', 'Ich konnte nichts kaufen', 'konnte ich nichts kaufen', 'r'],
  ['Die Mieten sind gestiegen', 'die Mieten gestiegen sind', 'Viele ziehen aufs Land', 'ziehen viele aufs Land', 'r'],
  ['Die Nachfrage ist gesunken', 'die Nachfrage gesunken ist', 'Die Preise fallen', 'fallen die Preise', 'r'],
];

/** Contrasting pairs for während / wohingegen: [A, A verb-last, B, B verb-last]. */
export const CONTRAST_PAIRS: [string, string, string, string][] = [
  ['Ich trinke Kaffee', 'ich Kaffee trinke', 'Mein Mann trinkt Tee', 'mein Mann Tee trinkt'],
  ['Anna liebt die Berge', 'Anna die Berge liebt', 'Ihr Bruder fährt lieber ans Meer', 'ihr Bruder lieber ans Meer fährt'],
  ['Im Norden regnet es', 'es im Norden regnet', 'Im Süden scheint die Sonne', 'im Süden die Sonne scheint'],
  ['Die Stadt wächst', 'die Stadt wächst', 'Die Dörfer werden kleiner', 'die Dörfer kleiner werden'],
  ['Er arbeitet gern im Team', 'er gern im Team arbeitet', 'Seine Kollegin arbeitet lieber allein', 'seine Kollegin lieber allein arbeitet'],
  ['Die Exporte steigen', 'die Exporte steigen', 'Die Importe gehen zurück', 'die Importe zurückgehen'],
  ['Mein Vater kocht gern', 'mein Vater gern kocht', 'Meine Mutter backt lieber', 'meine Mutter lieber backt'],
  ['Früher war das Viertel ruhig', 'das Viertel früher ruhig war', 'Heute ist es sehr laut', 'es heute sehr laut ist'],
];

/** Direct questions and their indirect form (verb last). */
export const INDIRECT_QUESTIONS: [string, string][] = [
  ['Wann kommt der Zug?', 'wann der Zug kommt'],
  ['Wo ist der Bahnhof?', 'wo der Bahnhof ist'],
  ['Wie viel kostet das Ticket?', 'wie viel das Ticket kostet'],
  ['Warum ist Anna so traurig?', 'warum Anna so traurig ist'],
  ['Wer hat das Fenster geöffnet?', 'wer das Fenster geöffnet hat'],
  ['Was hat der Arzt gesagt?', 'was der Arzt gesagt hat'],
  ['Wie lange dauert der Film?', 'wie lange der Film dauert'],
  ['Wann beginnt der Kurs?', 'wann der Kurs beginnt'],
  ['Wo wohnt Herr Meier?', 'wo Herr Meier wohnt'],
  ['Woher kommt die neue Kollegin?', 'woher die neue Kollegin kommt'],
  ['Wann fängt das Konzert an?', 'wann das Konzert anfängt'],
  ['Wie spät ist es?', 'wie spät es ist'],
  ['Welcher Bus fährt zum Flughafen?', 'welcher Bus zum Flughafen fährt'],
  ['Wohin fährt Paul im Urlaub?', 'wohin Paul im Urlaub fährt'],
  ['Mit wem spricht Lisa?', 'mit wem Lisa spricht'],
  ['Was bedeutet dieses Wort?', 'was dieses Wort bedeutet'],
  ['Wie funktioniert die Maschine?', 'wie die Maschine funktioniert'],
  ['Wann kommt Peter zurück?', 'wann Peter zurückkommt'],
  ['Kommt Tom morgen?', 'ob Tom morgen kommt'],
  ['Ist das Museum heute geöffnet?', 'ob das Museum heute geöffnet ist'],
  ['Fährt der Bus auch am Sonntag?', 'ob der Bus auch am Sonntag fährt'],
  ['Kann man hier parken?', 'ob man hier parken kann'],
  ['Gibt es noch Karten?', 'ob es noch Karten gibt'],
  ['Ist der Platz frei?', 'ob der Platz frei ist'],
  ['Spricht der Arzt Englisch?', 'ob der Arzt Englisch spricht'],
  ['Muss man einen Termin machen?', 'ob man einen Termin machen muss'],
  ['Hat Maria schon angerufen?', 'ob Maria schon angerufen hat'],
  ['Ruft der Chef heute zurück?', 'ob der Chef heute zurückruft'],
  ['Ist die Prüfung schwer?', 'ob die Prüfung schwer ist'],
];

/** Openings for indirect questions; „…“ marks the clause, the last char is the sentence end. */
export const INDIRECT_INTROS = ['Weißt du, …?', 'Können Sie mir sagen, …?', 'Ich frage mich, ….', 'Ich weiß nicht, ….', 'Sie möchte wissen, ….', 'Kannst du mir sagen, …?', 'Hast du eine Ahnung, …?'];

/** Verb → noun pairs: wir-form clause (= infinitive phrase), noun, gender. */
export const NOMINAL: { c: string; n: string; g: 'm' | 'f' | 'n' }[] = [
  { c: 'ankommen', n: 'Ankunft', g: 'f' },
  { c: 'abfahren', n: 'Abfahrt', g: 'f' },
  { c: 'abreisen', n: 'Abreise', g: 'f' },
  { c: 'zurückkehren', n: 'Rückkehr', g: 'f' },
  { c: 'umziehen', n: 'Umzug', g: 'm' },
  { c: 'einziehen', n: 'Einzug', g: 'm' },
  { c: 'landen', n: 'Landung', g: 'f' },
  { c: 'starten', n: 'Start', g: 'm' },
  { c: 'frühstücken', n: 'Frühstück', g: 'n' },
  { c: 'reisen', n: 'Reise', g: 'f' },
  { c: 'einkaufen', n: 'Einkauf', g: 'm' },
  { c: 'uns anmelden', n: 'Anmeldung', g: 'f' },
  { c: 'uns entscheiden', n: 'Entscheidung', g: 'f' },
  { c: 'uns bewerben', n: 'Bewerbung', g: 'f' },
  { c: 'uns vorbereiten', n: 'Vorbereitung', g: 'f' },
  { c: 'teilnehmen', n: 'Teilnahme', g: 'f' },
  { c: 'ausziehen', n: 'Auszug', g: 'm' },
  { c: 'übernachten', n: 'Übernachtung', g: 'f' },
  { c: 'verhandeln', n: 'Verhandlung', g: 'f' },
  { c: 'diskutieren', n: 'Diskussion', g: 'f' },
  { c: 'feiern', n: 'Feier', g: 'f' },
  { c: 'wandern', n: 'Wanderung', g: 'f' },
  { c: 'fliegen', n: 'Flug', g: 'm' },
  { c: 'uns verabschieden', n: 'Verabschiedung', g: 'f' },
  { c: 'aufbrechen', n: 'Aufbruch', g: 'm' },
  { c: 'uns erholen', n: 'Erholung', g: 'f' },
  { c: 'heiraten', n: 'Hochzeit', g: 'f' },
  { c: 'arbeiten', n: 'Arbeit', g: 'f' },
  { c: 'beginnen', n: 'Beginn', g: 'm' },
  { c: 'uns beraten', n: 'Beratung', g: 'f' },
  { c: 'uns einigen', n: 'Einigung', g: 'f' },
  { c: 'trainieren', n: 'Training', g: 'n' },
];

/** Antecedents that take „was“: [text, explanation]. */
export const WAS_ANTECEDENTS: [string, string][] = [
  ['Das ist alles,', 'After alles the relative pronoun is was.'],
  ['Das ist nichts,', 'After nichts the relative pronoun is was.'],
  ['Das ist etwas,', 'After etwas the relative pronoun is was.'],
  ['Es gibt vieles,', 'After vieles the relative pronoun is was.'],
  ['Das ist das Einzige,', 'After das Einzige (a nominalised adjective) the relative pronoun is was.'],
  ['Das ist das Beste,', 'After a nominalised superlative (das Beste) the relative pronoun is was.'],
  ['Das ist das Schönste,', 'After a nominalised superlative (das Schönste) the relative pronoun is was.'],
  ['Es gibt manches,', 'After manches the relative pronoun is was.'],
];
export const WAS_CLAUSES = ['___ ich dir sagen kann', '___ mich interessiert', '___ ich je gesehen habe', '___ du wissen musst', '___ mir Sorgen macht', '___ wir tun können'];

/** Persons and things for word-order drills in the middle field. */
export const MIDFIELD_PERSONS: { n: string; p: string }[] = [
  { n: 'dem Kollegen', p: 'ihm' },
  { n: 'der Lehrerin', p: 'ihr' },
  { n: 'meinem Bruder', p: 'ihm' },
  { n: 'meiner Schwester', p: 'ihr' },
  { n: 'den Kindern', p: 'ihnen' },
  { n: 'der Chefin', p: 'ihr' },
  { n: 'dem Nachbarn', p: 'ihm' },
];
export const MIDFIELD_THINGS: { n: string; p: string }[] = [
  { n: 'das Buch', p: 'es' },
  { n: 'den Schlüssel', p: 'ihn' },
  { n: 'die Tasche', p: 'sie' },
  { n: 'das Foto', p: 'es' },
  { n: 'den Brief', p: 'ihn' },
  { n: 'die Rechnung', p: 'sie' },
];
export const MIDFIELD_VERBS: [string, string][] = [
  ['gebe', 'habe … gegeben'],
  ['zeige', 'habe … gezeigt'],
  ['bringe', 'habe … gebracht'],
  ['schicke', 'habe … geschickt'],
];

/** Predicates for unreal comparisons: k = sein (present), haben (present), wissen, würde + inf, hp = haben + participle, sp = sein + participle. */
export const IRREAL_PREDICATES: [string, 'sein' | 'haben' | 'wissen' | 'wuerde' | 'hp' | 'sp'][] = [
  ['krank', 'sein'],
  ['sehr müde', 'sein'],
  ['reich', 'sein'],
  ['völlig unschuldig', 'sein'],
  ['sehr beschäftigt', 'sein'],
  ['keine Ahnung', 'haben'],
  ['alle Zeit der Welt', 'haben'],
  ['keine Angst', 'haben'],
  ['alles', 'wissen'],
  ['nichts hören', 'wuerde'],
  ['den Weg nicht kennen', 'wuerde'],
  ['nichts verstehen', 'wuerde'],
  ['nichts gehört', 'hp'],
  ['die ganze Nacht gearbeitet', 'hp'],
  ['den Brief nie bekommen', 'hp'],
  ['alles vergessen', 'hp'],
  ['gerade aufgewacht', 'sp'],
  ['nie in Paris gewesen', 'sp'],
  ['zu Fuß gekommen', 'sp'],
];

/** Claims for sollen / wollen (Infinitiv Perfekt or present). */
export const HEARSAY_PREDICATES = [
  'früher in Paris gewohnt haben',
  'den Unfall gesehen haben',
  'nichts davon gewusst haben',
  'zur Tatzeit zu Hause gewesen sein',
  'das Geld gefunden haben',
  'eine Million im Lotto gewonnen haben',
  'die Prüfung ohne Lernen bestanden haben',
  'mit dem Präsidenten gesprochen haben',
  'als Kind in Afrika gelebt haben',
  'nie krank gewesen sein',
  'den Täter erkannt haben',
  'alle Rechnungen bezahlt haben',
];
export const HEARSAY_SUBJECTS: [string, boolean][] = [
  ['Der Nachbar', false],
  ['Die Sängerin', false],
  ['Der Angeklagte', false],
  ['Meine Kollegin', false],
  ['Die Zeugen', true],
  ['Die beiden Politiker', true],
];

/** Situations for modal verbs of assumption. */
export const ASSUMPTION_PREDICATES = ['zu Hause sein', 'krank sein', 'im Stau stehen', 'schon schlafen', 'noch im Büro sein', 'den Termin vergessen haben', 'den Zug verpasst haben', 'schon nach Hause gegangen sein'];
