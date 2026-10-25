/**
 * Combinable material for the B2–C2 drills that used to draw only from fixed item pools
 * (rektion, Funktionsverbgefüge, genitive, modal particles, idioms, register, word formation,
 * B2 connectors, participle clauses). Every entry is multiplied by persons, tenses, objects,
 * articles, adjectives or randomly drawn distractors in lib/exercise/drills-combo.ts.
 */
import type { G4 } from './drill-bank';

/** gender + noun (plural form for 'pl') */
export type Obj = [G4, string];

// ── Rektion: verb / adjective + preposition + case ────────────────────────────

export interface RektionFrame {
  /** shown in explanations */
  name: string;
  /** 'sein' (adjective + sein), a regular infinitive (without separable prefix) or the six present forms */
  v: 'sein' | string | string[];
  refl?: boolean;
  /** adjective between the verb and the prepositional phrase */
  pre?: string;
  /** separable prefix at the end of the clause */
  post?: string;
  prep: string;
  cs: 'acc' | 'dat';
  objs: Obj[];
}

export const REKTION_FRAMES: RektionFrame[] = [
  { name: 'stolz sein auf', v: 'sein', pre: 'stolz', prep: 'auf', cs: 'acc', objs: [['m', 'Erfolg'], ['f', 'Leistung'], ['n', 'Ergebnis'], ['pl', 'Kinder']] },
  { name: 'zufrieden sein mit', v: 'sein', pre: 'zufrieden', prep: 'mit', cs: 'dat', objs: [['n', 'Ergebnis'], ['f', 'Lösung'], ['m', 'Service'], ['pl', 'Noten']] },
  { name: 'abhängig sein von', v: 'sein', pre: 'abhängig', prep: 'von', cs: 'dat', objs: [['n', 'Wetter'], ['f', 'Entscheidung'], ['m', 'Preis'], ['pl', 'Eltern']] },
  { name: 'interessiert sein an', v: 'sein', pre: 'interessiert', prep: 'an', cs: 'dat', objs: [['n', 'Angebot'], ['f', 'Stelle'], ['f', 'Zusammenarbeit'], ['m', 'Vorschlag']] },
  { name: 'begeistert sein von', v: 'sein', pre: 'begeistert', prep: 'von', cs: 'dat', objs: [['m', 'Film'], ['f', 'Idee'], ['n', 'Konzert'], ['pl', 'Ergebnisse']] },
  { name: 'verantwortlich sein für', v: 'sein', pre: 'verantwortlich', prep: 'für', cs: 'acc', objs: [['n', 'Projekt'], ['f', 'Planung'], ['m', 'Fehler'], ['pl', 'Kosten']] },
  { name: 'überzeugt sein von', v: 'sein', pre: 'überzeugt', prep: 'von', cs: 'dat', objs: [['f', 'Idee'], ['m', 'Plan'], ['n', 'Konzept'], ['pl', 'Argumente']] },
  { name: 'gespannt sein auf', v: 'sein', pre: 'gespannt', prep: 'auf', cs: 'acc', objs: [['n', 'Ergebnis'], ['f', 'Antwort'], ['m', 'Film'], ['pl', 'Ferien']] },
  { name: 'enttäuscht sein von', v: 'sein', pre: 'enttäuscht', prep: 'von', cs: 'dat', objs: [['n', 'Ergebnis'], ['m', 'Service'], ['f', 'Entscheidung'], ['pl', 'Politiker']] },
  { name: 'froh sein über', v: 'sein', pre: 'froh', prep: 'über', cs: 'acc', objs: [['f', 'Nachricht'], ['f', 'Hilfe'], ['m', 'Erfolg'], ['n', 'Ergebnis']] },
  { name: 'gewöhnt sein an', v: 'sein', pre: 'gewöhnt', prep: 'an', cs: 'acc', objs: [['n', 'Klima'], ['m', 'Lärm'], ['pl', 'Arbeitszeiten'], ['f', 'Kälte']] },
  { name: 'einverstanden sein mit', v: 'sein', pre: 'einverstanden', prep: 'mit', cs: 'dat', objs: [['m', 'Vorschlag'], ['f', 'Lösung'], ['pl', 'Bedingungen'], ['m', 'Vertrag']] },
  { name: 'angewiesen sein auf', v: 'sein', pre: 'angewiesen', prep: 'auf', cs: 'acc', objs: [['f', 'Hilfe'], ['n', 'Auto'], ['f', 'Unterstützung'], ['n', 'Stipendium']] },
  { name: 'zuständig sein für', v: 'sein', pre: 'zuständig', prep: 'für', cs: 'acc', objs: [['f', 'Organisation'], ['n', 'Budget'], ['pl', 'Kunden'], ['m', 'Einkauf']] },
  { name: 'sich freuen auf', v: 'freuen', refl: true, prep: 'auf', cs: 'acc', objs: [['m', 'Urlaub'], ['n', 'Wochenende'], ['f', 'Party'], ['pl', 'Ferien']] },
  { name: 'sich freuen über', v: 'freuen', refl: true, prep: 'über', cs: 'acc', objs: [['n', 'Geschenk'], ['f', 'Nachricht'], ['m', 'Besuch'], ['pl', 'Blumen']] },
  { name: 'sich interessieren für', v: 'interessieren', refl: true, prep: 'für', cs: 'acc', objs: [['f', 'Politik'], ['m', 'Sport'], ['f', 'Geschichte'], ['pl', 'Filme']] },
  { name: 'sich ärgern über', v: 'ärgern', refl: true, prep: 'über', cs: 'acc', objs: [['f', 'Verspätung'], ['m', 'Lärm'], ['pl', 'Fehler'], ['n', 'Wetter']] },
  { name: 'sich beschweren über', v: 'beschweren', refl: true, prep: 'über', cs: 'acc', objs: [['m', 'Service'], ['m', 'Lärm'], ['pl', 'Preise'], ['f', 'Qualität']] },
  { name: 'sich erinnern an', v: 'erinnern', refl: true, prep: 'an', cs: 'acc', objs: [['m', 'Urlaub'], ['n', 'Gespräch'], ['f', 'Kindheit'], ['pl', 'Ferien']] },
  { name: 'sich gewöhnen an', v: 'gewöhnen', refl: true, prep: 'an', cs: 'acc', objs: [['n', 'Klima'], ['f', 'Arbeit'], ['m', 'Lärm'], ['pl', 'Regeln']] },
  { name: 'sich kümmern um', v: 'kümmern', refl: true, prep: 'um', cs: 'acc', objs: [['m', 'Garten'], ['pl', 'Kinder'], ['f', 'Organisation'], ['n', 'Problem']] },
  { name: 'sich bewerben um', v: ['bewerbe', 'bewirbst', 'bewirbt', 'bewerben', 'bewerbt', 'bewerben'], refl: true, prep: 'um', cs: 'acc', objs: [['f', 'Stelle'], ['n', 'Stipendium'], ['m', 'Studienplatz'], ['f', 'Ausbildung']] },
  { name: 'sich bedanken für', v: 'bedanken', refl: true, prep: 'für', cs: 'acc', objs: [['f', 'Hilfe'], ['f', 'Einladung'], ['n', 'Geschenk'], ['pl', 'Tipps']] },
  { name: 'sich konzentrieren auf', v: 'konzentrieren', refl: true, prep: 'auf', cs: 'acc', objs: [['f', 'Arbeit'], ['f', 'Prüfung'], ['n', 'Projekt'], ['pl', 'Aufgaben']] },
  { name: 'sich verlassen auf', v: ['verlasse', 'verlässt', 'verlässt', 'verlassen', 'verlasst', 'verlassen'], refl: true, prep: 'auf', cs: 'acc', objs: [['n', 'Team'], ['f', 'Technik'], ['pl', 'Freunde'], ['n', 'Navi']] },
  { name: 'sich beschäftigen mit', v: 'beschäftigen', refl: true, prep: 'mit', cs: 'dat', objs: [['n', 'Thema'], ['f', 'Frage'], ['n', 'Problem'], ['pl', 'Texte']] },
  { name: 'sich entscheiden für', v: 'entscheiden', refl: true, prep: 'für', cs: 'acc', objs: [['n', 'Angebot'], ['f', 'Wohnung'], ['n', 'Studium'], ['f', 'Farbe']] },
  { name: 'sich fürchten vor', v: 'fürchten', refl: true, prep: 'vor', cs: 'dat', objs: [['f', 'Dunkelheit'], ['f', 'Prüfung'], ['n', 'Gewitter'], ['pl', 'Spinnen']] },
  { name: 'sich vorbereiten auf', v: 'bereiten', refl: true, post: 'vor', prep: 'auf', cs: 'acc', objs: [['f', 'Prüfung'], ['f', 'Präsentation'], ['n', 'Interview'], ['m', 'Wettkampf']] },
  { name: 'sich auseinandersetzen mit', v: 'setzen', refl: true, post: 'auseinander', prep: 'mit', cs: 'dat', objs: [['f', 'Kritik'], ['n', 'Thema'], ['f', 'Frage'], ['pl', 'Argumente']] },
  { name: 'sich verabschieden von', v: 'verabschieden', refl: true, prep: 'von', cs: 'dat', objs: [['pl', 'Gäste'], ['f', 'Kollegin'], ['n', 'Team'], ['n', 'Publikum']] },
  { name: 'sich einsetzen für', v: 'setzen', refl: true, post: 'ein', prep: 'für', cs: 'acc', objs: [['f', 'Umwelt'], ['pl', 'Rechte'], ['n', 'Projekt'], ['m', 'Klimaschutz']] },
  { name: 'sich wundern über', v: 'wundern', refl: true, prep: 'über', cs: 'acc', objs: [['f', 'Antwort'], ['m', 'Preis'], ['n', 'Verhalten'], ['pl', 'Ergebnisse']] },
  { name: 'sich informieren über', v: 'informieren', refl: true, prep: 'über', cs: 'acc', objs: [['m', 'Kurs'], ['pl', 'Angebote'], ['n', 'Studium'], ['pl', 'Bedingungen']] },
  { name: 'sich erkundigen nach', v: 'erkundigen', refl: true, prep: 'nach', cs: 'dat', objs: [['m', 'Weg'], ['m', 'Preis'], ['f', 'Abfahrtszeit'], ['pl', 'Öffnungszeiten']] },
  { name: 'warten auf', v: 'warten', prep: 'auf', cs: 'acc', objs: [['m', 'Bus'], ['f', 'Antwort'], ['n', 'Paket'], ['pl', 'Ergebnisse']] },
  { name: 'denken an', v: 'denken', prep: 'an', cs: 'acc', objs: [['m', 'Termin'], ['f', 'Prüfung'], ['n', 'Geschenk'], ['pl', 'Ferien']] },
  { name: 'teilnehmen an', v: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'], post: 'teil', prep: 'an', cs: 'dat', objs: [['m', 'Kurs'], ['f', 'Sitzung'], ['m', 'Wettbewerb'], ['n', 'Seminar']] },
  { name: 'achten auf', v: 'achten', prep: 'auf', cs: 'acc', objs: [['m', 'Verkehr'], ['f', 'Aussprache'], ['pl', 'Details'], ['f', 'Gesundheit']] },
  { name: 'verzichten auf', v: 'verzichten', prep: 'auf', cs: 'acc', objs: [['m', 'Zucker'], ['n', 'Auto'], ['n', 'Fleisch'], ['m', 'Bonus']] },
  { name: 'leiden unter', v: 'leiden', prep: 'unter', cs: 'dat', objs: [['f', 'Hitze'], ['m', 'Stress'], ['m', 'Lärm'], ['pl', 'Bedingungen']] },
  { name: 'träumen von', v: 'träumen', prep: 'von', cs: 'dat', objs: [['n', 'Haus'], ['f', 'Karriere'], ['f', 'Reise'], ['m', 'Urlaub']] },
  { name: 'zweifeln an', v: 'zweifeln', prep: 'an', cs: 'dat', objs: [['n', 'Ergebnis'], ['f', 'Aussage'], ['m', 'Plan'], ['pl', 'Zahlen']] },
  { name: 'sorgen für', v: 'sorgen', prep: 'für', cs: 'acc', objs: [['pl', 'Kinder'], ['f', 'Sicherheit'], ['f', 'Unterhaltung'], ['pl', 'Getränke']] },
  { name: 'berichten über', v: 'berichten', prep: 'über', cs: 'acc', objs: [['m', 'Unfall'], ['f', 'Konferenz'], ['n', 'Projekt'], ['pl', 'Ergebnisse']] },
  { name: 'reagieren auf', v: 'reagieren', prep: 'auf', cs: 'acc', objs: [['f', 'Kritik'], ['m', 'Vorwurf'], ['f', 'E-Mail'], ['pl', 'Fragen']] },
  { name: 'protestieren gegen', v: 'protestieren', prep: 'gegen', cs: 'acc', objs: [['pl', 'Pläne'], ['n', 'Gesetz'], ['f', 'Erhöhung'], ['m', 'Bau']] },
  { name: 'hoffen auf', v: 'hoffen', prep: 'auf', cs: 'acc', objs: [['m', 'Erfolg'], ['f', 'Lösung'], ['f', 'Verbesserung'], ['f', 'Zusage']] },
  { name: 'sprechen über', v: ['spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht', 'sprechen'], prep: 'über', cs: 'acc', objs: [['m', 'Film'], ['n', 'Problem'], ['pl', 'Pläne'], ['f', 'Situation']] },
  { name: 'glauben an', v: 'glauben', prep: 'an', cs: 'acc', objs: [['f', 'Zukunft'], ['m', 'Erfolg'], ['f', 'Idee'], ['n', 'Projekt']] },
];

// ── Funktionsverbgefüge ─────────────────────────────────────────────────────

export interface LightVerb {
  /** present forms ich … sie; omitted = regular */
  pres?: string[];
  pp: string;
  aux: 'h' | 's';
}

export const LIGHT_VERBS: Record<string, LightVerb> = {
  treffen: { pres: ['treffe', 'triffst', 'trifft', 'treffen', 'trefft', 'treffen'], pp: 'getroffen', aux: 'h' },
  stellen: { pp: 'gestellt', aux: 'h' },
  bringen: { pp: 'gebracht', aux: 'h' },
  nehmen: { pres: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'], pp: 'genommen', aux: 'h' },
  kommen: { pp: 'gekommen', aux: 's' },
  geben: { pres: ['gebe', 'gibst', 'gibt', 'geben', 'gebt', 'geben'], pp: 'gegeben', aux: 'h' },
  ziehen: { pp: 'gezogen', aux: 'h' },
  setzen: { pp: 'gesetzt', aux: 'h' },
  finden: { pp: 'gefunden', aux: 'h' },
  leisten: { pp: 'geleistet', aux: 'h' },
  üben: { pp: 'geübt', aux: 'h' },
  treten: { pres: ['trete', 'trittst', 'tritt', 'treten', 'tretet', 'treten'], pp: 'getreten', aux: 's' },
  ergreifen: { pp: 'ergriffen', aux: 'h' },
  halten: { pres: ['halte', 'hältst', 'hält', 'halten', 'haltet', 'halten'], pp: 'gehalten', aux: 'h' },
  legen: { pp: 'gelegt', aux: 'h' },
  erheben: { pp: 'erhoben', aux: 'h' },
  fassen: { pp: 'gefasst', aux: 'h' },
  geraten: { pres: ['gerate', 'gerätst', 'gerät', 'geraten', 'geratet', 'geraten'], pp: 'geraten', aux: 's' },
  stoßen: { pres: ['stoße', 'stößt', 'stößt', 'stoßen', 'stoßt', 'stoßen'], pp: 'gestoßen', aux: 's' },
  gehen: { pp: 'gegangen', aux: 's' },
  spielen: { pp: 'gespielt', aux: 'h' },
  machen: { pp: 'gemacht', aux: 'h' },
};

export interface FvgFrame {
  lv: string;
  /** midfield; {o} = one of `objs`, *Word = the noun that is practised */
  tpl: string;
  objs: string[];
  /** simple verb with (roughly) the same meaning */
  mean: string;
  /** own subjects (name, person index 0–5) when the default people don't fit */
  subj?: [string, number][];
  /** light verbs that would also be correct here, never offered as wrong options */
  no?: string[];
  level: 'c1' | 'c2';
}

export const FVG_FRAMES: FvgFrame[] = [
  { lv: 'treffen', tpl: '{o} eine *Entscheidung', objs: ['bis Freitag', 'noch heute', 'gemeinsam', 'über das Budget'], mean: 'entscheiden', level: 'c1' },
  { lv: 'stellen', tpl: '{o} in *Frage', objs: ['den Plan', 'diese Methode', 'die Ergebnisse', 'das ganze Konzept'], mean: 'bezweifeln', level: 'c1' },
  { lv: 'stellen', tpl: '{o} zur *Verfügung', objs: ['den Gästen ein Zimmer', 'den Mitarbeitern Laptops', 'dem Team die Daten', 'den Studierenden einen Raum'], mean: 'bereitstellen', level: 'c1' },
  { lv: 'ziehen', tpl: '{o} in *Betracht', objs: ['diese Möglichkeit', 'einen Umzug', 'alle Optionen', 'eine Kündigung'], mean: 'erwägen', level: 'c1' },
  { lv: 'nehmen', tpl: '{o} *Stellung', objs: ['zu den Vorwürfen', 'zu dem Bericht', 'zu der Kritik'], mean: 'sich äußern', level: 'c1' },
  { lv: 'nehmen', tpl: '{o} *Rücksicht', objs: ['auf die Nachbarn', 'auf ältere Menschen', 'auf die Umwelt'], mean: 'berücksichtigen', level: 'c1' },
  { lv: 'bringen', tpl: '{o} zum *Ausdruck', objs: ['deutliche Kritik', 'große Dankbarkeit', 'tiefes Bedauern'], mean: 'ausdrücken', level: 'c1' },
  { lv: 'leisten', tpl: '{o} einen wichtigen *Beitrag', objs: ['zum Umweltschutz', 'zur Forschung', 'zum Erfolg des Projekts'], mean: 'beitragen', level: 'c1' },
  { lv: 'üben', tpl: '{o} *Kritik', objs: ['an der Regierung', 'an dem Vorschlag', 'an den Plänen'], mean: 'kritisieren', level: 'c1' },
  { lv: 'stellen', tpl: '{o} einen *Antrag', objs: ['beim Amt', 'auf Elterngeld', 'auf ein Stipendium'], mean: 'beantragen', level: 'c1' },
  { lv: 'ergreifen', tpl: '{o} *Maßnahmen', objs: ['sofort', 'gegen den Lärm', 'gegen die Krise'], mean: 'handeln', no: ['treffen'], level: 'c1' },
  { lv: 'treten', tpl: '{o} in *Kraft', objs: ['am 1. Januar', 'im nächsten Jahr', 'sofort'], subj: [['Das Gesetz', 2], ['Die Regelung', 2], ['Die neuen Regeln', 5], ['Der Vertrag', 2]], mean: 'gültig werden', level: 'c1' },
  { lv: 'kommen', tpl: '{o} in *Frage', objs: ['nicht', 'durchaus', 'leider nicht'], subj: [['Diese Lösung', 2], ['Ein Umzug', 2], ['Diese Bewerber', 5]], mean: 'möglich sein', level: 'c1' },
  { lv: 'finden', tpl: '{o} *Anwendung', objs: ['in der Praxis', 'auch in der Medizin', 'kaum noch'], subj: [['Die Methode', 2], ['Diese Regel', 2], ['Die neuen Verfahren', 5]], mean: 'angewendet werden', level: 'c1' },
  { lv: 'nehmen', tpl: '{o} in *Anspruch', objs: ['professionelle Hilfe', 'einen Kredit', 'die Beratung'], mean: 'nutzen', level: 'c1' },
  { lv: 'legen', tpl: 'großen *Wert {o}', objs: ['auf Pünktlichkeit', 'auf Qualität', 'auf gute Umgangsformen'], mean: 'wichtig finden', level: 'c1' },
  { lv: 'fassen', tpl: '{o} einen *Entschluss', objs: ['endlich', 'nach langem Überlegen', 'spontan'], mean: 'sich entschließen', level: 'c1' },
  { lv: 'nehmen', tpl: '{o} zur *Kenntnis', objs: ['die Kritik', 'die Beschwerde', 'die neuen Zahlen'], mean: 'wahrnehmen', no: ['bringen'], level: 'c1' },
  { lv: 'halten', tpl: '{o} eine *Rede', objs: ['auf der Feier', 'vor dem Parlament', 'bei der Eröffnung'], subj: [['Ich', 0], ['Die Ministerin', 2], ['Der Bürgermeister', 2], ['Wir', 3]], mean: 'öffentlich sprechen', level: 'c1' },
  { lv: 'spielen', tpl: '{o} eine wichtige *Rolle', objs: ['bei der Entscheidung', 'im Berufsleben', 'hier'], subj: [['Das Geld', 2], ['Die Erfahrung', 2], ['Gute Kontakte', 5], ['Der Zufall', 2]], mean: 'wichtig sein', level: 'c1' },
  { lv: 'bringen', tpl: '{o} zur *Sprache', objs: ['das Problem', 'die Kosten', 'diesen Punkt'], mean: 'ansprechen', level: 'c2' },
  { lv: 'setzen', tpl: '{o} unter *Druck', objs: ['die Mitarbeiter', 'die Regierung', 'die Konkurrenz'], mean: 'bedrängen', level: 'c2' },
  { lv: 'geraten', tpl: '{o} unter *Druck', objs: ['zunehmend', 'plötzlich', 'stark'], subj: [['Die Regierung', 2], ['Das Unternehmen', 2], ['Die Banken', 5]], mean: 'bedrängt werden', no: ['stehen', 'kommen'], level: 'c2' },
  { lv: 'nehmen', tpl: '{o} in *Angriff', objs: ['das Projekt', 'die Renovierung', 'die Reform'], mean: 'beginnen', level: 'c2' },
  { lv: 'ziehen', tpl: '{o} zur *Verantwortung', objs: ['die Täter', 'den Hersteller', 'die Verantwortlichen'], mean: 'verantwortlich machen', level: 'c2' },
  { lv: 'stoßen', tpl: '{o} auf *Kritik', objs: ['überall', 'bei der Opposition', 'sofort'], subj: [['Der Vorschlag', 2], ['Die Reform', 2], ['Die neuen Pläne', 5]], mean: 'kritisiert werden', level: 'c2' },
  { lv: 'finden', tpl: '{o} *Zustimmung', objs: ['breite', 'große', 'kaum'], subj: [['Der Vorschlag', 2], ['Die Idee', 2], ['Die Pläne', 5]], mean: 'akzeptiert werden', level: 'c2' },
  { lv: 'stellen', tpl: '{o} in *Aussicht', objs: ['den Mitarbeitern eine Prämie', 'den Kunden eine Lösung', 'den Bürgern Entlastungen'], mean: 'versprechen', level: 'c2' },
  { lv: 'leisten', tpl: '{o} *Folge', objs: ['der Anordnung', 'der Aufforderung', 'den Anweisungen'], mean: 'befolgen', level: 'c2' },
  { lv: 'erheben', tpl: '{o} *Anspruch', objs: ['auf das Erbe', 'auf eine Entschädigung', 'auf den Titel'], mean: 'beanspruchen', no: ['stellen'], level: 'c2' },
  { lv: 'bringen', tpl: '{o} in *Verlegenheit', objs: ['den Redner', 'die Gastgeber', 'den Minister'], mean: 'verlegen machen', level: 'c2' },
  { lv: 'bringen', tpl: '{o} zur *Abstimmung', objs: ['den Antrag', 'den Vorschlag', 'das Gesetz'], mean: 'abstimmen lassen', no: ['stellen'], level: 'c2' },
  { lv: 'gehen', tpl: '{o} in *Erfüllung', objs: ['endlich', 'doch noch', 'nie'], subj: [['Sein Traum', 2], ['Ihr Wunsch', 2], ['Unsere Hoffnungen', 5]], mean: 'wahr werden', level: 'c2' },
  { lv: 'setzen', tpl: '{o} in *Gang', objs: ['die Maschine', 'einen Prozess', 'die Ermittlungen'], mean: 'starten', no: ['bringen'], level: 'c2' },
  { lv: 'kommen', tpl: '{o} zum *Einsatz', objs: ['bereits', 'vermehrt', 'erstmals'], subj: [['Die neue Software', 2], ['Moderne Technik', 2], ['Drohnen', 5]], mean: 'eingesetzt werden', level: 'c2' },
  { lv: 'nehmen', tpl: '{o} *Bezug', objs: ['auf die Studie', 'auf Ihr Schreiben', 'auf die letzte Sitzung'], mean: 'sich beziehen', level: 'c2' },
];

/** default subjects for FVG sentences (name, person index) */
export const FVG_SUBJECTS: [string, number][] = [
  ['Ich', 0],
  ['Du', 1],
  ['Die Firma', 2],
  ['Wir', 3],
  ['Ihr', 4],
  ['Die Behörden', 5],
  ['Der Minister', 2],
  ['Die Abteilung', 2],
];

// ── Genitive ────────────────────────────────────────────────────────────────

/** gender, nominative, accepted genitive noun forms, adjective stems that fit */
export type GenNp = [G4, string, string[], string[]];

export interface GenScene {
  /** text before the genitive phrase (one is chosen) */
  leads: string[];
  /** text after it, with final punctuation */
  rest: string;
  /** which article types sound natural here */
  arts: ('def' | 'indef' | 'none')[];
  nps: GenNp[];
}

const CRIMES: GenNp[] = [
  ['m', 'Diebstahl', ['Diebstahls', 'Diebstahles'], []],
  ['m', 'Betrug', ['Betrugs', 'Betruges'], []],
  ['m', 'Mord', ['Mordes', 'Mords'], []],
  ['f', 'Bestechung', ['Bestechung'], []],
  ['f', 'Steuerhinterziehung', ['Steuerhinterziehung'], []],
  ['f', 'Erpressung', ['Erpressung'], []],
  ['m', 'Einbruch', ['Einbruchs', 'Einbruches'], []],
  ['f', 'Urkundenfälschung', ['Urkundenfälschung'], []],
  ['m', 'Raub', ['Raubes', 'Raubs'], []],
];

export const GEN_SCENES: GenScene[] = [
  {
    leads: ['Wegen', 'Aufgrund', 'Infolge'],
    rest: 'wurde das Spiel abgesagt.',
    arts: ['def', 'indef', 'none'],
    nps: [
      ['m', 'Sturm', ['Sturms', 'Sturmes'], ['stark', 'heftig', 'plötzlich']],
      ['m', 'Regen', ['Regens'], ['stark', 'anhaltend']],
      ['n', 'Gewitter', ['Gewitters'], ['schwer', 'heftig']],
      ['f', 'Hitze', ['Hitze'], ['extrem', 'groß']],
      ['m', 'Schneefall', ['Schneefalls', 'Schneefalles'], ['stark', 'heftig']],
      ['pl', 'Unwetter', ['Unwetter'], ['schwer', 'heftig']],
    ],
  },
  {
    leads: ['Wegen', 'Aufgrund', 'Infolge'],
    rest: 'kam der Zug zu spät.',
    arts: ['def', 'indef', 'none'],
    nps: [
      ['m', 'Streik', ['Streiks', 'Streikes'], ['unangekündigt', 'kurz']],
      ['f', 'Störung', ['Störung'], ['technisch']],
      ['m', 'Unfall', ['Unfalls', 'Unfalles'], ['schwer']],
      ['pl', 'Bauarbeiten', ['Bauarbeiten'], ['umfangreich', 'nächtlich']],
      ['n', 'Hochwasser', ['Hochwassers'], ['plötzlich']],
    ],
  },
  {
    leads: ['Trotz', 'Ungeachtet'],
    rest: 'fand das Fest statt.',
    arts: ['def', 'none'],
    nps: [
      ['n', 'Wetter', ['Wetters'], ['schlecht', 'kalt', 'regnerisch']],
      ['m', 'Regen', ['Regens'], ['stark']],
      ['pl', 'Warnungen', ['Warnungen'], ['zahlreich', 'deutlich']],
      ['f', 'Kälte', ['Kälte'], ['eisig']],
      ['pl', 'Bedenken', ['Bedenken'], ['groß']],
      ['m', 'Protest', ['Protests', 'Protestes'], ['heftig', 'laut']],
    ],
  },
  {
    leads: ['Während'],
    rest: 'darf nicht telefoniert werden.',
    arts: ['def'],
    nps: [
      ['f', 'Sitzung', ['Sitzung'], ['wöchentlich', 'ganz']],
      ['m', 'Vortrag', ['Vortrags', 'Vortrages'], ['ganz']],
      ['f', 'Prüfung', ['Prüfung'], ['schriftlich', 'mündlich']],
      ['n', 'Konzert', ['Konzerts', 'Konzertes'], ['ganz']],
      ['m', 'Flug', ['Flugs', 'Fluges'], ['ganz']],
    ],
  },
  {
    leads: ['Angesichts'],
    rest: 'muss die Regierung schnell handeln.',
    arts: ['def', 'indef'],
    nps: [
      ['f', 'Lage', ['Lage'], ['ernst', 'schwierig']],
      ['f', 'Krise', ['Krise'], ['aktuell', 'wirtschaftlich']],
      ['pl', 'Zahlen', ['Zahlen'], ['hoh', 'alarmierend']],
      ['m', 'Mangel', ['Mangels'], ['akut']],
    ],
  },
  {
    leads: ['Anlässlich'],
    rest: 'gab es einen Empfang.',
    arts: ['def'],
    nps: [
      ['n', 'Jubiläum', ['Jubiläums'], ['zehnjährig', 'fünfzigjährig']],
      ['m', 'Geburtstag', ['Geburtstags', 'Geburtstages'], ['siebzigst', 'achtzigst']],
      ['f', 'Eröffnung', ['Eröffnung'], ['feierlich']],
      ['m', 'Besuch', ['Besuchs', 'Besuches'], ['offiziell']],
    ],
  },
  {
    leads: ['Innerhalb'],
    rest: 'muss die Rechnung bezahlt werden.',
    arts: ['def'],
    nps: [
      ['f', 'Frist', ['Frist'], ['gesetzlich', 'vereinbart']],
      ['m', 'Monat', ['Monats'], ['nächst', 'laufend']],
      ['pl', 'Wochen', ['Wochen'], ['nächst', 'kommend']],
    ],
  },
  { leads: ['Die Polizei verdächtigt den Mann', 'Man beschuldigt die Politikerin'], rest: '.', arts: ['def'], nps: CRIMES },
  { leads: ['Das Gericht hat den Angeklagten'], rest: 'überführt.', arts: ['def'], nps: CRIMES },
  { leads: ['Die Staatsanwaltschaft klagt die Managerin'], rest: 'an.', arts: ['def'], nps: CRIMES },
  {
    leads: ['Das Projekt bedarf', 'Der Vertrag bedarf'],
    rest: '.',
    arts: ['def', 'indef'],
    nps: [
      ['f', 'Zustimmung', ['Zustimmung'], ['ausdrücklich', 'schriftlich']],
      ['f', 'Prüfung', ['Prüfung'], ['gründlich']],
      ['f', 'Genehmigung', ['Genehmigung'], ['behördlich']],
      ['m', 'Beschluss', ['Beschlusses'], ['förmlich']],
    ],
  },
  {
    leads: ['Sie bediente sich', 'Er bediente sich'],
    rest: '.',
    arts: ['def', 'indef'],
    nps: [
      ['m', 'Trick', ['Tricks'], ['alt', 'einfach']],
      ['f', 'Methode', ['Methode'], ['bewährt', 'einfach']],
      ['n', 'Mittel', ['Mittels'], ['drastisch', 'einfach']],
    ],
  },
  {
    leads: ['Die Band erfreut sich', 'Das Museum erfreut sich'],
    rest: '.',
    arts: ['none'],
    nps: [
      ['f', 'Beliebtheit', ['Beliebtheit'], ['groß', 'wachsend']],
      ['m', 'Zulauf', ['Zulaufs'], ['groß', 'stark']],
    ],
  },
];

// ── Modal particles: one context, many sentences ────────────────────────────

/** context, sentences with one gap, accepted particles, wrong particles, explanation */
export type ParticleTemplate = [string, string[], string[], string[], string];

export const PARTICLE_TEMPLATES: Record<'b2' | 'c1' | 'c2', ParticleTemplate[]> = {
  b2: [
    ['Vorwurf', ['Ich habe dir ___ gesagt, dass der Zug früher fährt!', 'Ich habe dir ___ gesagt, dass du eine Jacke mitnehmen sollst!', 'Ich habe dir ___ gesagt, dass das Geschäft heute zu ist!', 'Das habe ich dir ___ gleich gesagt!', 'Du wusstest ___, dass es regnen würde!', 'Ich habe ___ gleich gesagt, dass das nicht klappt!'], ['doch', 'ja'], ['denn', 'etwa', 'ruhig'], 'doch / ja: the speaker reminds you of something you should have known.'],
    ['interessierte Frage', ['Wie heißt du ___?', 'Woher kommst du ___?', 'Was ist ___ los?', 'Warum lachst du ___?', 'Wie geht es dir ___?', 'Was hast du ___?', 'Was machst du ___ hier?', 'Wann kommst du ___ zurück?'], ['denn', 'eigentlich'], ['doch', 'ja', 'halt'], 'denn makes a question friendly and interested.'],
    ['beiläufige Bitte', ['Kannst du ___ das Fenster aufmachen?', 'Gib mir ___ das Salz.', 'Hilf mir ___ kurz.', 'Schau ___ hier.', 'Kannst du ___ den Müll rausbringen?', 'Ruf mich ___ an.', 'Kannst du mir ___ helfen?', 'Mach ___ die Musik leiser.'], ['mal', 'doch mal', 'doch'], ['denn', 'etwa', 'wohl'], 'mal makes a request casual and polite.'],
    ['freundliche Einladung', ['Komm ___ mit!', 'Bleib ___ noch ein bisschen!', 'Setzt euch ___!', 'Probier ___ den Kuchen!', 'Besuch uns ___ am Wochenende!', 'Nimm dir ___ ein Stück Kuchen!', 'Ruf ___ an, wenn du Zeit hast!'], ['doch', 'mal', 'doch mal'], ['denn', 'etwa', 'wohl'], 'doch / mal turn an imperative into a friendly invitation.'],
    ['bekannte Tatsache als Grund', ['Ich kann nicht kommen, ich habe ___ morgen eine Prüfung.', 'Nimm einen Schirm mit, es regnet ___.', 'Wir müssen leise sein, das Baby schläft ___.', 'Er kennt den Weg, er wohnt ___ hier.', 'Beeil dich, der Film fängt ___ gleich an.', 'Iss etwas, du hast ___ seit heute Morgen nichts gegessen.'], ['ja', 'doch'], ['denn', 'etwa', 'mal'], 'ja / doch: a reason both speakers already know.'],
    ['Resignation', ['Das ist ___ so.', 'Dann nehmen wir ___ den Bus.', 'Dann müssen wir ___ warten.', 'So ist das ___.', 'Dann bleiben wir ___ zu Hause.'], ['eben', 'halt', 'nun mal'], ['denn', 'etwa', 'ja mal'], 'eben / halt: it cannot be changed, accept it.'],
    ['Erstaunen', ['Du bist ___ schon da!', 'Das ist ___ eine Überraschung!', 'Hier ist es ___ wunderschön!', 'Du sprichst ___ perfekt Deutsch!', 'Du hast ___ eine neue Frisur!', 'Das ging ___ schnell!'], ['ja', 'aber'], ['denn', 'etwa', 'mal'], 'ja / aber in an exclamation express surprise.'],
    ['Wunsch', ['Wenn ich ___ mehr Zeit hätte!', 'Hätte ich das ___ früher gewusst!', 'Wäre er ___ hier!', 'Wenn es ___ endlich Sommer wäre!', 'Wenn der Bus ___ endlich käme!', 'Hätte ich ___ besser aufgepasst!'], ['doch', 'nur', 'bloß', 'doch nur'], ['denn', 'etwa', 'ruhig'], 'Unreal wishes take doch / nur / bloß.'],
  ],
  c1: [
    ['Erlaubnis, Ermutigung', ['Du kannst ___ das Fenster aufmachen.', 'Frag ___, wenn du etwas nicht verstehst.', 'Nimm dir ___ noch ein Stück Kuchen.', 'Sie können ___ hereinkommen.', 'Setz dich ___ hin.', 'Ihr dürft ___ laut sein.', 'Du kannst mich ___ duzen.'], ['ruhig'], ['etwa', 'denn', 'bloß'], 'ruhig = go ahead, it is fine.'],
    ['Vermutung', ['Er wird ___ im Stau stehen.', 'Sie hat ___ den Termin vergessen.', 'Das Paket ist ___ verloren gegangen.', 'Die Kinder schlafen ___ schon.', 'Das wird ___ stimmen.', 'Sie wird ___ schon zu Hause sein.'], ['wohl'], ['ruhig', 'bloß', 'etwa'], 'wohl = probably.'],
    ['Warnung', ['Fahr ___ vorsichtig!', 'Vergiss ___ nicht den Schlüssel!', 'Sag ___ nichts der Chefin!', 'Komm ___ nicht zu spät!', 'Pass ___ auf!', 'Mach ___ keinen Unsinn!', 'Lass ___ die Finger davon!', 'Erzähl das ___ niemandem!'], ['bloß', 'ja', 'nur'], ['ruhig', 'etwa', 'eigentlich'], 'bloß / ja / nur in an imperative: an urgent warning.'],
    ['Ratlosigkeit', ['Was soll ich ___ tun?', 'Wo ist ___ mein Handy?', 'Wie soll ich das ___ schaffen?', 'Warum habe ich das ___ gesagt?', 'Wer kann mir ___ helfen?', 'Wohin soll ich ___ gehen?'], ['bloß', 'nur', 'denn'], ['ruhig', 'etwa', 'halt'], 'bloß / nur in a question: helplessness.'],
    ['Zuversicht', ['Das wird ___ gut gehen.', 'Keine Sorge, du schaffst das ___.', 'Wir finden ___ eine Lösung.', 'Er wird ___ wieder gesund.', 'Das klappt ___.', 'Sie wird sich ___ melden.', 'Das findet sich ___.'], ['schon'], ['etwa', 'bloß', 'ruhig'], 'schon reassures: it will work out.'],
    ['befürchtete Antwort', ['Hast du ___ schon wieder kein Geld?', 'Bist du ___ schon wieder zu spät?', 'Hast du ___ meinen Geburtstag vergessen?', 'Willst du ___ schon gehen?', 'Ist der Zug ___ schon weg?', 'Hast du ___ die Tür offen gelassen?'], ['etwa'], ['ruhig', 'halt', 'ja mal'], 'etwa: the speaker hopes the answer is no.'],
    ['neues Thema, echtes Interesse', ['Wo wohnst du ___?', 'Was machst du ___ beruflich?', 'Woher kennt ihr euch ___?', 'Wie alt ist deine Schwester ___?', 'Wie spät ist es ___?', 'Wer ist ___ der Mann da drüben?'], ['eigentlich', 'denn'], ['ruhig', 'halt', 'eben'], 'eigentlich opens a new aspect of the conversation.'],
  ],
  c2: [
    ['Empörung', ['Das ist ja ___ die Höhe!', 'Das ist ja ___ nicht dein Ernst!', 'Das ist ja ___ eine Frechheit!', 'Das kann ja ___ nicht wahr sein!', 'Das ist ja ___ das Letzte!'], ['wohl'], ['mal', 'denn', 'eben'], 'ja wohl: indignation.'],
    ['ironisch: das ist nichts Besonderes', ['Was ist ___ dabei, wenn ich mal zu spät komme?', 'Was ist ___ dabei, wenn wir eine Pause machen?', 'Wer liest ___ noch Zeitung?', 'Was kann man da ___ machen?', 'Wer hat ___ Lust, am Sonntag zu arbeiten?'], ['schon'], ['etwa', 'ruhig', 'halt'], 'schon in a rhetorical question: nothing / nobody really.'],
    ['nachdrückliche Aufforderung', ['Nun komm ___ endlich!', 'Nun hör ___ endlich zu!', 'Nun sei ___ endlich still!', 'Nun erzähl ___ endlich!', 'Nun sag ___ endlich was!'], ['doch', 'doch mal', 'mal'], ['mal doch', 'denn', 'etwa'], 'doch (mal) in an imperative: impatient insistence; doch comes before mal.'],
    ['Frage nach dem Grundsätzlichen', ['Was willst du ___ eigentlich hier?', 'Was willst du ___ eigentlich von mir?', 'Was willst du ___ eigentlich damit sagen?', 'Was soll das ___ eigentlich?', 'Wer bist du ___ eigentlich?', 'Was ist ___ eigentlich passiert?'], ['denn'], ['doch', 'mal', 'eben'], 'denn eigentlich: what is it really about?'],
    ['kurz, nebenbei', ['Ich bring ___ eben den Müll raus.', 'Ich geh ___ eben zum Bäcker.', 'Ich ruf ___ eben meine Mutter an.', 'Ich hol ___ eben die Post.', 'Ich schau ___ eben nach den Kindern.'], ['mal'], ['doch', 'denn', 'etwa'], 'mal eben = quickly, in passing.'],
    ['Resignation', ['Man kann es nicht ändern, das ist ___ so.', 'So ist ___ das Leben.', 'Er ist ___ ein Morgenmuffel.', 'Da kann man ___ nichts machen.', 'Kinder sind ___ so.'], ['eben', 'halt', 'nun mal'], ['denn', 'etwa', 'doch mal'], 'eben / halt / nun mal: it is as it is.'],
  ],
};

// ── Idioms, register, word formation ────────────────────────────────────────

/** idiom (infinitive), key word, meaning */
export const IDIOM_LIST: [string, string, string][] = [
  ['Tomaten auf den Augen haben', 'Tomaten', 'not see the obvious'],
  ['jemandem auf den Keks gehen', 'Keks', 'annoy someone'],
  ['ins Fettnäpfchen treten', 'Fettnäpfchen', 'put your foot in it'],
  ['jemandem die Daumen drücken', 'Daumen', 'keep your fingers crossed for someone'],
  ['auf dem Holzweg sein', 'Holzweg', 'be on the wrong track'],
  ['jemandem einen Bären aufbinden', 'Bären', 'tell someone a tall story'],
  ['Schwein haben', 'Schwein', 'be lucky'],
  ['die Nase voll haben', 'Nase', 'be fed up'],
  ['etwas auf die lange Bank schieben', 'Bank', 'put something off'],
  ['die Katze im Sack kaufen', 'Katze', 'buy something without checking it'],
  ['ein Auge zudrücken', 'Auge', 'turn a blind eye'],
  ['aus allen Wolken fallen', 'Wolken', 'be completely stunned'],
  ['mit der Tür ins Haus fallen', 'Tür', 'come straight to the point too abruptly'],
  ['etwas unter den Teppich kehren', 'Teppich', 'sweep something under the rug'],
  ['jemandem die Leviten lesen', 'Leviten', 'give someone a stern talking-to'],
  ['den Faden verlieren', 'Faden', 'lose the thread'],
  ['auf großem Fuß leben', 'Fuß', 'live extravagantly'],
  ['jemandem den Rücken stärken', 'Rücken', 'back someone up'],
  ['Öl ins Feuer gießen', 'Öl', 'add fuel to the fire'],
  ['ins kalte Wasser springen', 'Wasser', 'jump in at the deep end'],
  ['den Kopf in den Sand stecken', 'Sand', 'bury your head in the sand'],
  ['jemandem Honig ums Maul schmieren', 'Honig', 'butter someone up'],
  ['zwei Fliegen mit einer Klappe schlagen', 'Fliegen', 'kill two birds with one stone'],
  ['eine Extrawurst wollen', 'Extrawurst', 'want special treatment'],
  ['sich an etwas die Zähne ausbeißen', 'Zähne', 'struggle with something in vain'],
  ['etwas an die große Glocke hängen', 'Glocke', 'tell everyone about something'],
  ['den Löffel abgeben', 'Löffel', 'die'],
  ['blaumachen', 'blau', 'skip work or school'],
  ['Däumchen drehen', 'Däumchen', 'twiddle your thumbs'],
  ['die Ohren steif halten', 'Ohren', 'keep your chin up'],
  ['Kohldampf haben', 'Kohldampf', 'be starving'],
  ['jemandem einen Strich durch die Rechnung machen', 'Strich', "thwart someone's plans"],
  ['das Handtuch werfen', 'Handtuch', 'give up'],
  ['in den sauren Apfel beißen', 'Apfel', 'do something unpleasant that cannot be avoided'],
  ['jemandem reinen Wein einschenken', 'Wein', 'tell someone the plain truth'],
  ['um den heißen Brei herumreden', 'Brei', 'beat about the bush'],
  ['den Nagel auf den Kopf treffen', 'Nagel', 'hit the nail on the head'],
  ['jemandem die kalte Schulter zeigen', 'Schulter', 'give someone the cold shoulder'],
  ['sich etwas aus den Fingern saugen', 'Fingern', 'make something up'],
  ['auf Wolke sieben schweben', 'Wolke', 'be on cloud nine'],
  ['jemanden auf den Arm nehmen', 'Arm', "pull someone's leg"],
  ['ins Gras beißen', 'Gras', 'die'],
  ['Schmetterlinge im Bauch haben', 'Schmetterlinge', 'be in love'],
  ['jemandem einen Korb geben', 'Korb', 'turn someone down'],
];

/** colloquial, neutral */
export const COLLOQUIAL: [string, string][] = [
  ['Knete', 'Geld'], ['Kohle', 'Geld'], ['Moos', 'Geld'], ['pennen', 'schlafen'], ['futtern', 'essen'], ['quatschen', 'reden'], ['labern', 'reden'],
  ['Kumpel', 'Freund'], ['Bude', 'Wohnung'], ['Karre', 'Auto'], ['Glotze', 'Fernseher'], ['malochen', 'arbeiten'], ['abhauen', 'weggehen'],
  ['kapieren', 'verstehen'], ['klauen', 'stehlen'], ['kriegen', 'bekommen'], ['Klamotten', 'Kleidung'], ['Kippe', 'Zigarette'], ['Zoff', 'Streit'],
  ['flennen', 'weinen'], ['blechen', 'bezahlen'], ['pauken', 'lernen'], ['büffeln', 'lernen'], ['Schiss', 'Angst'], ['Knast', 'Gefängnis'],
  ['Grips', 'Verstand'], ['Kohldampf', 'Hunger'], ['Drahtesel', 'Fahrrad'], ['Bock', 'Lust'], ['stinksauer', 'sehr wütend'], ['schnorren', 'erbetteln'],
];

/** neutral, formal */
export const FORMAL: [string, string][] = [
  ['bekommen', 'erhalten'], ['kaufen', 'erwerben'], ['sagen', 'mitteilen'], ['anfangen', 'beginnen'], ['brauchen', 'benötigen'], ['schicken', 'übersenden'],
  ['fragen', 'sich erkundigen'], ['machen', 'durchführen'], ['gehen', 'sich begeben'], ['sterben', 'versterben'], ['essen', 'speisen'], ['kaputt', 'defekt'],
  ['wollen', 'beabsichtigen'], ['helfen', 'unterstützen'], ['zeigen', 'vorlegen'], ['bitten', 'ersuchen'], ['wohnen', 'wohnhaft sein'], ['Geld', 'finanzielle Mittel'],
  ['sofort', 'umgehend'], ['leider', 'bedauerlicherweise'], ['wegen', 'aufgrund'], ['bald', 'in Kürze'], ['Chef', 'Vorgesetzter'], ['Job', 'Anstellung'],
];

/** adjective, abstract noun (-heit / -keit / -igkeit) */
export const ADJ_NOUNS: [string, string][] = [
  ['frei', 'Freiheit'], ['gesund', 'Gesundheit'], ['krank', 'Krankheit'], ['schön', 'Schönheit'], ['sicher', 'Sicherheit'], ['dumm', 'Dummheit'],
  ['klar', 'Klarheit'], ['wahr', 'Wahrheit'], ['gleich', 'Gleichheit'], ['frech', 'Frechheit'], ['faul', 'Faulheit'], ['offen', 'Offenheit'],
  ['gelassen', 'Gelassenheit'], ['zufrieden', 'Zufriedenheit'], ['bescheiden', 'Bescheidenheit'], ['einsam', 'Einsamkeit'], ['sparsam', 'Sparsamkeit'],
  ['aufmerksam', 'Aufmerksamkeit'], ['möglich', 'Möglichkeit'], ['freundlich', 'Freundlichkeit'], ['ehrlich', 'Ehrlichkeit'], ['wichtig', 'Wichtigkeit'],
  ['fähig', 'Fähigkeit'], ['sauber', 'Sauberkeit'], ['dankbar', 'Dankbarkeit'], ['eitel', 'Eitelkeit'], ['tapfer', 'Tapferkeit'], ['wirklich', 'Wirklichkeit'],
  ['häufig', 'Häufigkeit'], ['schwierig', 'Schwierigkeit'], ['persönlich', 'Persönlichkeit'], ['flüssig', 'Flüssigkeit'], ['arbeitslos', 'Arbeitslosigkeit'],
  ['hilflos', 'Hilflosigkeit'], ['genau', 'Genauigkeit'], ['gerecht', 'Gerechtigkeit'], ['müde', 'Müdigkeit'], ['sinnlos', 'Sinnlosigkeit'],
  ['schnell', 'Schnelligkeit'], ['leicht', 'Leichtigkeit'], ['ernsthaft', 'Ernsthaftigkeit'], ['gewissenhaft', 'Gewissenhaftigkeit'],
  ['höflich', 'Höflichkeit'], ['pünktlich', 'Pünktlichkeit'], ['zuverlässig', 'Zuverlässigkeit'], ['selbstständig', 'Selbstständigkeit'],
];

/** verb, noun with article */
export const VERB_NOUNS: [string, string][] = [
  ['bilden', 'die Bildung'], ['entscheiden', 'die Entscheidung'], ['erklären', 'die Erklärung'], ['entwickeln', 'die Entwicklung'], ['verbessern', 'die Verbesserung'],
  ['erfahren', 'die Erfahrung'], ['bewerben', 'die Bewerbung'], ['einladen', 'die Einladung'], ['regieren', 'die Regierung'], ['lösen', 'die Lösung'],
  ['beschreiben', 'die Beschreibung'], ['verändern', 'die Veränderung'], ['vorbereiten', 'die Vorbereitung'], ['übersetzen', 'die Übersetzung'],
  ['erinnern', 'die Erinnerung'], ['empfehlen', 'die Empfehlung'], ['forschen', 'die Forschung'], ['planen', 'die Planung'], ['warnen', 'die Warnung'],
  ['hoffen', 'die Hoffnung'], ['zahlen', 'die Zahlung'], ['besuchen', 'der Besuch'], ['anfangen', 'der Anfang'], ['verkaufen', 'der Verkauf'],
  ['beginnen', 'der Beginn'], ['fliegen', 'der Flug'], ['helfen', 'die Hilfe'], ['sprechen', 'die Sprache'],
  ['sehen', 'die Sicht'], ['fahren', 'die Fahrt'], ['ankommen', 'die Ankunft'], ['wissen', 'das Wissen'], ['streiten', 'der Streit'],
  ['schlafen', 'der Schlaf'], ['laufen', 'der Lauf'], ['verlieren', 'der Verlust'], ['denken', 'der Gedanke'],
  ['suchen', 'die Suche'], ['fragen', 'die Frage'], ['lieben', 'die Liebe'], ['bitten', 'die Bitte'], ['reisen', 'die Reise'],
];

/** zu-infinitive object, verb, -bar adjective: „Man kann {o} {v}.“ → „{O} ist ___.“ */
export const BAR_ADJECTIVES: [string[], string, string][] = [
  [['das Wasser', 'den Saft'], 'trinken', 'trinkbar'],
  [['den Pilz', 'das Obst'], 'essen', 'essbar'],
  [['die Handschrift', 'den Text'], 'lesen', 'lesbar'],
  [['den Plan', 'das Projekt'], 'machen', 'machbar'],
  [['die Jacke', 'den Pullover'], 'waschen', 'waschbar'],
  [['die Praxis', 'das Büro'], 'erreichen', 'erreichbar'],
  [['die Miete', 'das Studium'], 'bezahlen', 'bezahlbar'],
  [['den Fehler', 'den Unfall'], 'vermeiden', 'vermeidbar'],
  [['die Krankheit', 'die Verletzung'], 'heilen', 'heilbar'],
  [['das Problem', 'die Aufgabe'], 'lösen', 'lösbar'],
  [['das Geräusch', 'die Musik'], 'hören', 'hörbar'],
  [['das Werkzeug', 'die Idee'], 'brauchen', 'brauchbar'],
  [['das Verhalten', 'den Unterschied'], 'erklären', 'erklärbar'],
  [['die Verpackung', 'das Material'], 'verwenden', 'verwendbar'],
  [['das Wetter', 'das Ergebnis'], 'vorhersagen', 'vorhersagbar'],
  [['das Gerät', 'die Software'], 'bedienen', 'bedienbar'],
  [['das Ticket', 'den Termin'], 'verschieben', 'verschiebbar'],
  [['die Batterie', 'den Akku'], 'aufladen', 'aufladbar'],
];

// ── B2 connectors ───────────────────────────────────────────────────────────

/** je part [comparative, subject …, verb], desto part [comparative, verb, rest], source sentences */
export const JE_DESTO: [[string, string, string], [string, string, string], string, string][] = [
  [['mehr', 'man', 'übt'], ['besser', 'spricht', 'man'], 'Man übt viel.', 'Man spricht gut.'],
  [['länger', 'ich', 'warte'], ['nervöser', 'werde', 'ich'], 'Ich warte lange.', 'Ich werde nervös.'],
  [['älter', 'er', 'wird'], ['ruhiger', 'wird', 'er'], 'Er wird alt.', 'Er wird ruhig.'],
  [['teurer', 'das Hotel', 'ist'], ['höher', 'sind', 'die Erwartungen'], 'Das Hotel ist teuer.', 'Die Erwartungen sind hoch.'],
  [['öfter', 'du', 'liest'], ['größer', 'wird', 'dein Wortschatz'], 'Du liest oft.', 'Dein Wortschatz wird groß.'],
  [['mehr', 'sie', 'verdient'], ['mehr', 'gibt', 'sie aus'], 'Sie verdient viel.', 'Sie gibt viel aus.'],
  [['wärmer', 'es', 'ist'], ['voller', 'sind', 'die Freibäder'], 'Es ist warm.', 'Die Freibäder sind voll.'],
  [['schneller', 'man', 'fährt'], ['gefährlicher', 'ist', 'es'], 'Man fährt schnell.', 'Es ist gefährlich.'],
  [['besser', 'die Vorbereitung', 'ist'], ['entspannter', 'ist', 'man in der Prüfung'], 'Die Vorbereitung ist gut.', 'Man ist in der Prüfung entspannt.'],
  [['länger', 'der Film', 'dauert'], ['müder', 'werden', 'die Kinder'], 'Der Film dauert lange.', 'Die Kinder werden müde.'],
  [['später', 'es', 'wird'], ['leiser', 'wird', 'es auf der Straße'], 'Es wird spät.', 'Es wird leise auf der Straße.'],
  [['intensiver', 'du', 'trainierst'], ['schneller', 'erreichst', 'du dein Ziel'], 'Du trainierst intensiv.', 'Du erreichst dein Ziel schnell.'],
  [['genauer', 'man', 'hinsieht'], ['mehr', 'entdeckt', 'man'], 'Man sieht genau hin.', 'Man entdeckt viel.'],
  [['früher', 'wir', 'losfahren'], ['eher', 'sind', 'wir da'], 'Wir fahren früh los.', 'Wir sind früh da.'],
  [['höher', 'die Preise', 'steigen'], ['weniger', 'kaufen', 'die Leute'], 'Die Preise steigen stark.', 'Die Leute kaufen wenig.'],
  [['freundlicher', 'du', 'bist'], ['hilfsbereiter', 'sind', 'die anderen'], 'Du bist freundlich.', 'Die anderen sind hilfsbereit.'],
];

/** main clause, means/result clause (verb at the end), the same as a main clause */
export const INDEM: [string, string, string][] = [
  ['Man spart Energie', 'man das Licht ausschaltet', 'Man schaltet das Licht aus.'],
  ['Er hat Deutsch gelernt', 'er jeden Tag Podcasts gehört hat', 'Er hat jeden Tag Podcasts gehört.'],
  ['Sie hält sich fit', 'sie jeden Morgen joggt', 'Sie joggt jeden Morgen.'],
  ['Wir sparen Geld', 'wir selbst kochen', 'Wir kochen selbst.'],
  ['Man kann die Umwelt schützen', 'man weniger Auto fährt', 'Man fährt weniger Auto.'],
  ['Er beruhigte das Kind', 'er ihm ein Lied vorsang', 'Er sang ihm ein Lied vor.'],
  ['Die Firma senkt die Kosten', 'sie Papier spart', 'Sie spart Papier.'],
  ['Du verbesserst deine Aussprache', 'du laut liest', 'Du liest laut.'],
  ['Sie fand die Wohnung', 'sie eine Anzeige aufgab', 'Sie gab eine Anzeige auf.'],
  ['Man öffnet die Datei', 'man zweimal darauf klickt', 'Man klickt zweimal darauf.'],
];

export const SODASS: [string, string, string][] = [
  ['Es regnete stark', 'die Straßen überflutet waren', 'Die Straßen waren überflutet.'],
  ['Der Bus hatte Verspätung', 'ich den Termin verpasste', 'Ich verpasste den Termin.'],
  ['Er hat viel geübt', 'er die Prüfung bestanden hat', 'Er hat die Prüfung bestanden.'],
  ['Das Konzert war ausverkauft', 'wir keine Karten mehr bekamen', 'Wir bekamen keine Karten mehr.'],
  ['Sie sprach sehr leise', 'niemand sie verstand', 'Niemand verstand sie.'],
  ['Der Akku war leer', 'ich nicht anrufen konnte', 'Ich konnte nicht anrufen.'],
  ['Es schneite die ganze Nacht', 'die Schule ausfiel', 'Die Schule fiel aus.'],
  ['Die Preise stiegen', 'viele Kunden weniger kauften', 'Viele Kunden kauften weniger.'],
];

// ── Participle clauses (C2) ──────────────────────────────────────────────────

/** phrase with gap, participle, wrong forms, explanation, main clauses (verb first) */
export const PARTICIPLE_PHRASES: [string, string, string[], string, string[]][] = [
  ['Laut ___', 'lachend', ['gelacht', 'lachende', 'lachen'], 'Simultaneous and active: Partizip I, no ending.', ['verließ sie den Raum', 'kam er ins Büro', 'erzählte sie die Geschichte']],
  ['Vom Lärm ___', 'geweckt', ['weckend', 'geweckte', 'wecken'], 'Passive meaning (he was woken): Partizip II.', ['stand er auf', 'ging sie ans Fenster', 'rief er die Polizei']],
  ['In Berlin ___', 'angekommen', ['ankommend', 'angekommene', 'ankommen'], 'Completed earlier action: Partizip II.', ['rief sie ihre Eltern an', 'suchte er ein Hotel', 'nahm sie ein Taxi']],
  ['Vor Freude ___', 'strahlend', ['gestrahlt', 'strahlende', 'strahlen'], 'Simultaneous and active: Partizip I.', ['umarmte sie ihre Mutter', 'nahm er den Preis entgegen', 'kam sie nach Hause']],
  ['Von der Arbeit ___', 'erschöpft', ['erschöpfend', 'erschöpfte', 'erschöpfen'], 'State resulting from an action: Partizip II.', ['schlief er sofort ein', 'legte sie sich aufs Sofa', 'sagte er die Party ab']],
  ['Die Zeitung ___', 'lesend', ['gelesen', 'lesende', 'lesen'], 'Simultaneous and active: Partizip I.', ['saß er im Café', 'wartete sie auf den Zug', 'frühstückte er']],
  ['Vom Publikum ___', 'gefeiert', ['feiernd', 'gefeierte', 'feiern'], 'Passive meaning: Partizip II.', ['verließ die Band die Bühne', 'verbeugte sich die Sängerin', 'spielte der Pianist eine Zugabe']],
  ['Ein Lied ___', 'summend', ['gesummt', 'summende', 'summen'], 'Simultaneous and active: Partizip I.', ['räumte sie die Küche auf', 'ging er durch den Park', 'fuhr sie nach Hause']],
  ['Von der Polizei ___', 'verfolgt', ['verfolgend', 'verfolgte', 'verfolgen'], 'Passive meaning: Partizip II.', ['floh der Dieb über die Dächer', 'raste der Fahrer durch die Stadt']],
  ['Den Blick aufs Meer ___', 'gerichtet', ['richtend', 'gerichtete', 'richten'], 'A state: Partizip II.', ['saß sie am Strand', 'stand er auf dem Balkon']],
  ['Nach Hause ___', 'zurückgekehrt', ['zurückkehrend', 'zurückgekehrte', 'zurückkehren'], 'Completed earlier action: Partizip II.', ['fand er einen Brief vor', 'legte sie sich sofort hin', 'packte er seinen Koffer aus']],
  ['Leise vor sich hin ___', 'murmelnd', ['gemurmelt', 'murmelnde', 'murmeln'], 'Simultaneous and active: Partizip I.', ['suchte er seine Schlüssel', 'ging sie die Treppe hinauf']],
  ['Von seinen Kollegen ___', 'unterstützt', ['unterstützend', 'unterstützte', 'unterstützen'], 'Passive meaning: Partizip II.', ['schaffte er das Projekt rechtzeitig', 'gewann er die Wahl']],
  ['Mit den Kindern ___', 'spielend', ['gespielt', 'spielende', 'spielen'], 'Simultaneous and active: Partizip I.', ['vergaß sie die Zeit', 'saß er im Garten']],
  ['Ehrlich ___', 'gesagt', ['sagend', 'gesagte', 'sagen'], 'Fixed phrase: ehrlich gesagt.', ['finde ich die Idee nicht gut', 'halte ich den Plan für unrealistisch', 'hat sie recht']],
  ['Streng ___', 'genommen', ['nehmend', 'genommene', 'nehmen'], 'Fixed phrase: streng genommen.', ['ist das nicht erlaubt', 'hat er recht', 'ist der Vertrag ungültig']],
  ['Genau ___', 'betrachtet', ['betrachtend', 'betrachtete', 'betrachten'], 'Fixed phrase: genau betrachtet.', ['ist das Ergebnis enttäuschend', 'ist der Unterschied gering', 'hat sie recht']],
  ['Offen ___', 'gestanden', ['gestehend', 'gestandene', 'gestehen'], 'Fixed phrase: offen gestanden.', ['finde ich die Idee nicht gut', 'habe ich keine Lust', 'war ich überrascht']],
  ['Im Grunde ___', 'genommen', ['nehmend', 'genommene', 'nehmen'], 'Fixed phrase: im Grunde genommen.', ['ist das Ergebnis enttäuschend', 'hat er recht', 'ist der Unterschied gering']],
  ['Kurz ___', 'gesagt', ['sagend', 'gesagte', 'sagen'], 'Fixed phrase: kurz gesagt.', ['war der Abend ein Erfolg', 'brauchen wir mehr Geld', 'hat sie recht']],
];
