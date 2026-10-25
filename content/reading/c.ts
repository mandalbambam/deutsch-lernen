import { mc, tf, type ReadingText } from './types';

export const C_TEXTS: ReadingText[] = [
  // ───────────── C1 ─────────────
  {
    id: 'c1-bildschirmzeit',
    level: 'C1',
    title: 'Macht Bildschirmzeit Kinder unglücklich?',
    genre: 'Science report',
    topics: ['science', 'tech', 'people'],
    text: `Kaum ein Thema beschäftigt Eltern so sehr wie die Frage, wie viel Zeit ihre Kinder vor Bildschirmen verbringen dürfen. Übersichtsarbeiten, die Daten aus zahlreichen Einzelstudien zusammenfassen, kommen dabei zu einem differenzierteren Ergebnis, als es die öffentliche Debatte vermuten lässt.

Zwar bestehe ein statistischer Zusammenhang zwischen intensiver Bildschirmnutzung und geringerem Wohlbefinden, schreiben die Autorinnen und Autoren. Dieser sei jedoch schwächer als häufig angenommen und lasse keine Rückschlüsse auf Ursache und Wirkung zu. Es sei ebenso denkbar, dass Jugendliche, denen es ohnehin schlecht gehe, mehr Zeit am Smartphone verbrächten – und nicht umgekehrt.

Entscheidend sei weniger die Dauer als die Art der Nutzung. Wer digitale Medien aktiv nutze, etwa um mit Freunden zu kommunizieren, kreativ zu sein oder sich Wissen anzueignen, profitiere unter Umständen sogar davon. Problematisch werde es vor allem dann, wenn die Nutzung zulasten von Schlaf, Bewegung und persönlichen Begegnungen gehe oder wenn Jugendliche sich ständig mit idealisierten Darstellungen anderer verglichen.

Die Forschenden warnen daher vor pauschalen Zeitlimits. Sinnvoller sei es, mit Kindern über ihre Mediennutzung ins Gespräch zu kommen und gemeinsam Regeln zu vereinbaren – etwa handyfreie Mahlzeiten oder einen Ladeplatz für Smartphones außerhalb des Kinderzimmers. Eltern komme dabei eine Vorbildfunktion zu: Wer selbst beim Abendessen auf das Display schaue, könne dies von seinen Kindern schwerlich verlangen.

Kritik kommt unter anderem von Kinderärzten. Sie geben zu bedenken, dass gerade bei kleinen Kindern klare zeitliche Grenzen nach wie vor geboten seien, da die Entwicklung von Sprache und Motorik auf reale Interaktion angewiesen sei. Einigkeit herrscht immerhin in einem Punkt: Die eine einfache Antwort auf die Frage nach der „richtigen“ Bildschirmzeit gibt es nicht.`,
    questions: [
      mc('Was ist das zentrale Ergebnis der Übersichtsarbeiten?', ['Der Zusammenhang ist schwächer als angenommen und sagt nichts über Ursache und Wirkung.', 'Bildschirmzeit macht Kinder nachweislich unglücklich.', 'Bildschirmzeit hat keinerlei Zusammenhang mit dem Wohlbefinden.', 'Kinder sollten höchstens eine Stunde am Tag Bildschirme nutzen.'], 'There is a link, but it is weak and does not show causation.'),
      tf('Laut den Forschenden ist vor allem die Dauer der Nutzung entscheidend.', false, '„Entscheidend sei weniger die Dauer als die Art der Nutzung.“'),
      mc('Wann wird die Nutzung laut Text problematisch?', ['wenn sie zulasten von Schlaf, Bewegung und Begegnungen geht', 'wenn Jugendliche mit Freunden kommunizieren', 'wenn Kinder kreativ sind', 'wenn Eltern Regeln vereinbaren'], '„zulasten von“ = at the expense of.'),
      mc('Was empfehlen die Forschenden statt pauschaler Zeitlimits?', ['mit Kindern ins Gespräch zu kommen und gemeinsam Regeln zu vereinbaren', 'Smartphones ganz zu verbieten', 'die Bildschirmzeit heimlich zu kontrollieren', 'Kindern mehr Bildschirmzeit zu erlauben'], 'Talk with children and agree on rules together.'),
      tf('Kinderärzte halten bei kleinen Kindern zeitliche Grenzen weiterhin für sinnvoll.', true, '„dass gerade bei kleinen Kindern klare zeitliche Grenzen nach wie vor geboten seien“.'),
      mc('Warum stehen viele Sätze im Konjunktiv I?', ['Der Text gibt Aussagen der Forschenden als indirekte Rede wieder.', 'Er drückt Wünsche aus.', 'Er beschreibt irreale Situationen.', 'Er formuliert Befehle.'], 'Konjunktiv I marks reported speech — the journalist reports, without vouching.'),
    ],
  },
  {
    id: 'c1-mehrsprachigkeit',
    level: 'C1',
    title: 'Mehrsprachigkeit – Last oder Gewinn?',
    genre: 'Essay',
    topics: ['culture', 'science', 'people'],
    text: `Noch vor wenigen Jahrzehnten rieten Fachleute Eltern mit Migrationsgeschichte, mit ihren Kindern ausschließlich Deutsch zu sprechen. Die Sorge: Zwei Sprachen könnten die Kinder überfordern und ihre schulische Entwicklung beeinträchtigen. Diese Annahme gilt heute als widerlegt.

Zahlreiche Untersuchungen belegen, dass Kinder ohne Weiteres mit zwei oder mehr Sprachen gleichzeitig aufwachsen können. Zwar kann es vorkommen, dass mehrsprachige Kinder in einer einzelnen Sprache zunächst einen etwas kleineren Wortschatz haben als einsprachige Gleichaltrige; zählt man jedoch beide Sprachen zusammen, ist ihr Wortschatz meist ebenso groß oder sogar größer. Auch das Mischen von Sprachen, das Außenstehende oft irritiert, ist kein Zeichen von Verwirrung, sondern eine gezielt eingesetzte kommunikative Strategie.

Umstritten ist hingegen die vielzitierte These, Mehrsprachigkeit verschaffe generelle kognitive Vorteile, etwa bei der Steuerung der Aufmerksamkeit. Während frühe Studien deutliche Effekte nachzuweisen schienen, fielen neuere, methodisch sorgfältigere Untersuchungen deutlich zurückhaltender aus. Die Wissenschaft spricht inzwischen eher von kleinen, kontextabhängigen Vorteilen.

Unbestritten ist dagegen der gesellschaftliche Wert. In einer globalisierten Arbeitswelt sind Sprachkenntnisse ein Wettbewerbsvorteil, und wer mehrere Sprachen spricht, hat Zugang zu verschiedenen Kulturen. Umso bedauerlicher ist es, dass Herkunftssprachen wie Türkisch, Arabisch oder Polnisch im deutschen Bildungssystem häufig als Defizit statt als Ressource betrachtet werden. Herkunftssprachlicher Unterricht wird zwar in vielen Bundesländern angeboten, fristet aber oft ein Schattendasein – in Randstunden und ohne großen Stellenwert.

Sprachwissenschaftlerinnen und Sprachwissenschaftler plädieren daher für einen Perspektivwechsel: Schulen sollten die sprachlichen Ressourcen ihrer Schülerschaft gezielt nutzen. Denn wer seine Erstsprache gut beherrscht, so ein gut belegter Befund, lernt auch weitere Sprachen leichter.`,
    questions: [
      tf('Früher rieten Fachleute, mit Kindern nur Deutsch zu sprechen.', true, '„rieten Fachleute … ausschließlich Deutsch zu sprechen“.'),
      mc('Was gilt heute als widerlegt?', ['dass zwei Sprachen Kinder überfordern', 'dass Kinder Sprachen mischen', 'dass Sprachkenntnisse ein Vorteil sind', 'dass Herkunftssprachen unterrichtet werden'], 'The fear that two languages overwhelm children has been disproved.'),
      mc('Wie wird das Mischen von Sprachen im Text bewertet?', ['als bewusste kommunikative Strategie', 'als Zeichen von Verwirrung', 'als Sprachstörung', 'als typisch für einsprachige Kinder'], '„kein Zeichen von Verwirrung, sondern eine gezielt eingesetzte kommunikative Strategie“.'),
      tf('Die These allgemeiner kognitiver Vorteile ist inzwischen eindeutig bewiesen.', false, 'It is contested; newer studies find only small, context-dependent effects.'),
      mc('Was bedeutet „ein Schattendasein fristen“?', ['wenig beachtet und unbedeutend existieren', 'besonders erfolgreich sein', 'nur im Winter stattfinden', 'heimlich verboten sein'], 'To lead a shadowy existence — to be marginal.'),
      mc('Welcher Befund wird am Ende genannt?', ['Wer seine Erstsprache gut beherrscht, lernt weitere Sprachen leichter.', 'Mehrsprachige Kinder haben immer einen größeren Wortschatz.', 'Herkunftssprachen sollten nicht unterrichtet werden.', 'Deutsch sollte die einzige Schulsprache sein.'], 'The last sentence states it.'),
    ],
  },
  {
    id: 'c1-wohnen',
    level: 'C1',
    title: 'Wohnen als soziale Frage',
    genre: 'Analysis',
    topics: ['economy', 'society'],
    text: `Wer in einer deutschen Großstadt eine bezahlbare Wohnung sucht, braucht vor allem eines: Geduld. Auf eine Anzeige melden sich nicht selten Hunderte Interessenten; Besichtigungstermine gleichen Massenveranstaltungen. Die Mietbelastungsquote, also der Anteil des Einkommens, der für die Miete aufgewendet werden muss, liegt bei vielen Haushalten inzwischen bei über 30 Prozent – ein Wert, ab dem Fachleute von einer Überlastung sprechen.

Die Ursachen der Wohnungsknappheit sind vielschichtig. Einer steigenden Nachfrage – bedingt durch Zuzug in die Ballungsräume, mehr Single-Haushalte und eine wachsende Wohnfläche pro Kopf – steht ein Angebot gegenüber, das kaum mithalten kann. Zwar hat sich die Politik ehrgeizige Neubauziele gesetzt, diese wurden jedoch regelmäßig verfehlt. Gestiegene Bau- und Finanzierungskosten, langwierige Genehmigungsverfahren und ein Mangel an Bauland bremsen den Neubau.

Mit der Mietpreisbremse versucht der Gesetzgeber, den Anstieg der Mieten bei Neuvermietungen zu begrenzen. Ihre Wirksamkeit ist jedoch umstritten. Kritiker monieren, dass Verstöße häufig folgenlos blieben, weil Mieterinnen und Mieter aus Sorge um das Mietverhältnis auf eine Rüge verzichteten. Andere halten die Regulierung für kontraproduktiv, da sie Investitionen in den Wohnungsbau unattraktiver mache.

Als vielversprechender gilt vielen der Ausbau des gemeinnützigen und genossenschaftlichen Wohnens. Wien wird in diesem Zusammenhang gern als Vorbild genannt: Dort lebt rund die Hälfte der Bevölkerung in geförderten oder kommunalen Wohnungen, was den gesamten Mietmarkt dämpft. Allerdings beruht das Wiener Modell auf einer über hundertjährigen Tradition und lässt sich nicht ohne Weiteres kopieren.

Unstrittig ist, dass die Wohnungsfrage längst zur sozialen Frage geworden ist. Wenn Pflegekräfte, Erzieherinnen oder Polizisten sich das Leben in den Städten, in denen sie arbeiten, nicht mehr leisten können, hat das Folgen für den gesellschaftlichen Zusammenhalt – und letztlich für die Funktionsfähigkeit der Städte selbst.`,
    questions: [
      mc('Was bezeichnet die „Mietbelastungsquote“?', ['den Anteil des Einkommens, der für die Miete ausgegeben wird', 'die Zahl der Interessenten pro Wohnung', 'die Höhe der Nebenkosten', 'die Anzahl leerer Wohnungen'], 'Defined in the text with „also …“.'),
      mc('Was bremst laut Text den Neubau?', ['hohe Bau- und Finanzierungskosten und langwierige Genehmigungen', 'zu viele Bauarbeiter', 'die sinkende Nachfrage', 'die Mietpreisbremse allein'], 'Costs, long approval procedures and a lack of building land.'),
      tf('Die Mietpreisbremse gilt unter Fachleuten als eindeutig wirksam.', false, '„Ihre Wirksamkeit ist jedoch umstritten.“'),
      mc('Warum verzichten Mieter laut Kritikern oft auf eine Rüge?', ['aus Sorge um ihr Mietverhältnis', 'weil sie die Regeln nicht kennen', 'weil die Miete zu niedrig ist', 'weil die Rüge teuer ist'], '„aus Sorge um das Mietverhältnis“ — they fear for their tenancy.'),
      tf('Das Wiener Modell lässt sich laut Text leicht auf andere Städte übertragen.', false, '„lässt sich nicht ohne Weiteres kopieren“.'),
      mc('Was meint der Text mit „die Wohnungsfrage ist zur sozialen Frage geworden“?', ['Wohnen betrifft den gesellschaftlichen Zusammenhalt.', 'Es gibt zu viele Sozialwohnungen.', 'Nur arme Menschen suchen Wohnungen.', 'Der Staat soll alle Wohnungen bauen.'], 'When key workers can’t afford to live where they work, social cohesion suffers.'),
    ],
  },
  {
    id: 'c1-stolpersteine',
    level: 'C1',
    title: 'Stolpersteine – Erinnerung im Alltag',
    genre: 'Feature',
    topics: ['history', 'culture', 'society'],
    text: `Wer aufmerksam durch deutsche Städte geht, stößt immer wieder auf kleine Messingplatten im Gehweg. Auf ihnen sind Namen eingraviert, dazu Geburtsjahr, Deportationsdatum und Todesort. Es sind sogenannte Stolpersteine, die an Menschen erinnern, die während der Zeit des Nationalsozialismus verfolgt, deportiert und ermordet wurden – vor dem Haus, in dem sie zuletzt freiwillig gewohnt haben.

Das Projekt geht auf den Künstler Gunter Demnig zurück, der 1992 in Köln den ersten Stein verlegte. Inzwischen gibt es über 100.000 Stolpersteine in mehr als 30 Ländern Europas; das Projekt gilt damit als das größte dezentrale Denkmal der Welt. Initiiert werden die Steine meist von Angehörigen, Schulklassen oder Nachbarschaftsinitiativen, die die Lebensgeschichten der Opfer in mühevoller Archivarbeit rekonstruieren.

Gerade darin liegt für viele die Stärke des Konzepts. Anders als zentrale Gedenkstätten holen die Stolpersteine die Erinnerung in den Alltag zurück. Sie machen deutlich, dass die Verfolgung nicht irgendwo stattfand, sondern mitten in der Nachbarschaft – unter den Augen derer, die weiterhin in diesen Straßen lebten. Wer sich bückt, um einen Namen zu lesen, verneigt sich gewissermaßen vor dem Opfer.

Unumstritten ist das Projekt gleichwohl nicht. Charlotte Knobloch, die frühere Präsidentin des Zentralrats der Juden in Deutschland, lehnt die Steine ab, weil die Namen der Ermordeten so erneut mit Füßen getreten würden. München hat die Verlegung auf öffentlichem Grund daher lange untersagt und setzt stattdessen auf Erinnerungszeichen an Hauswänden und Stelen.

Die Debatte zeigt, dass es die eine richtige Form des Gedenkens nicht gibt. Gemeinsam ist allen Ansätzen jedoch das Anliegen, den Opfern ihre Namen und damit ein Stück ihrer Würde zurückzugeben – gegen das Vergessen, das mit dem Tod der letzten Zeitzeugen unweigerlich droht.`,
    questions: [
      mc('Wo werden Stolpersteine verlegt?', ['vor dem letzten frei gewählten Wohnort der Opfer', 'auf Friedhöfen', 'in Museen', 'vor Rathäusern'], '„vor dem Haus, in dem sie zuletzt freiwillig gewohnt haben“.'),
      tf('Es gibt Stolpersteine nur in Deutschland.', false, 'There are stones in more than 30 European countries.'),
      mc('Wer initiiert die Steine meistens?', ['Angehörige, Schulklassen oder Nachbarschaftsinitiativen', 'die Bundesregierung', 'der Künstler allein', 'Museen'], 'They research the victims’ life stories in archives.'),
      mc('Worin liegt laut Text die Stärke des Konzepts?', ['Es holt die Erinnerung in den Alltag zurück.', 'Es ist besonders günstig.', 'Es ersetzt zentrale Gedenkstätten.', 'Es wurde von der Regierung beschlossen.'], 'Persecution happened in the neighbourhood — the stones make that visible.'),
      tf('Charlotte Knobloch unterstützt die Stolpersteine.', false, 'She rejects them: the names would again be „trampled underfoot“.'),
      mc('Welche Form des Gedenkens nutzt München stattdessen?', ['Erinnerungszeichen an Hauswänden und Stelen', 'gar keine', 'größere Steine im Gehweg', 'Gedenkfeiern im Stadion'], 'Plaques on house walls and steles.'),
    ],
  },
  {
    id: 'c1-filmkritik',
    level: 'C1',
    title: 'Filmkritik: „Das stille Haus“',
    genre: 'Film review (fictional film)',
    topics: ['film', 'culture', 'people'],
    text: `Es gibt Filme, die man nach dem Abspann sofort vergisst, und solche, die einen noch tagelang begleiten. „Das stille Haus“, das zweite Werk der Regisseurin Lena Brandt, gehört zweifellos zur zweiten Kategorie – auch wenn man sich die knapp zwei Stunden mitunter etwas kürzer gewünscht hätte.

Erzählt wird die Geschichte der Geschwister Ruth und Paul, die nach dem Tod ihrer Mutter das Elternhaus in einem Dorf in der Uckermark ausräumen sollen. Was als pragmatische Wochenendaufgabe beginnt, entwickelt sich zu einer schmerzhaften Konfrontation mit der eigenen Vergangenheit: Jedes Fotoalbum, jeder Brief fördert lange Verdrängtes zutage. Besonders ein Bündel nie abgeschickter Briefe stellt das Bild, das die beiden von ihrer Mutter hatten, grundlegend infrage.

Brandt verzichtet weitgehend auf Musik und setzt stattdessen auf lange, ruhige Einstellungen, in denen das knarrende Parkett und der Wind in den Fensterläden zu eigenständigen Akteuren werden. Diese Entschleunigung ist Stärke und Schwäche zugleich: Sie erzeugt eine beinahe hypnotische Atmosphäre, verlangt dem Publikum aber auch einiges an Geduld ab. Gerade im Mittelteil verliert der Film streckenweise an Spannung.

Getragen wird das Kammerspiel von zwei herausragenden Hauptdarstellern. Wie Ruth ihre Wut hinter einer Fassade aus Effizienz verbirgt, bis diese in einer der stärksten Szenen des Films in sich zusammenbricht, ist schlicht großartig gespielt. Paul wiederum bleibt bewusst rätselhaft – ein Mann, der mehr über die Mutter zu wissen scheint, als er zugeben will.

Wer actionreiches Kino erwartet, ist hier fehl am Platz. Wer sich hingegen auf die leisen Töne einlässt, wird mit einem klugen, berührenden Film über Familie, Schweigen und die Frage belohnt, wie gut wir die Menschen kennen, die uns am nächsten stehen.`,
    questions: [
      mc('Wie bewertet die Kritik den Film insgesamt?', ['überwiegend positiv, mit kleinen Schwächen', 'sehr negativ', 'neutral, ohne Meinung', 'begeistert, ohne jede Kritik'], 'Praise for atmosphere and actors, criticism of the slow middle part.'),
      tf('Ruth und Paul wollen in das Elternhaus einziehen.', false, 'They are supposed to clear it out (ausräumen).'),
      mc('Was stellt das Bild der Mutter infrage?', ['ein Bündel nie abgeschickter Briefe', 'ein altes Fotoalbum allein', 'ein Gespräch mit Nachbarn', 'ein Testament'], '„ein Bündel nie abgeschickter Briefe“.'),
      mc('Was meint die Kritik mit „Entschleunigung ist Stärke und Schwäche zugleich“?', ['Das langsame Tempo erzeugt Atmosphäre, verlangt aber Geduld.', 'Der Film ist zu schnell geschnitten.', 'Die Musik ist zu laut.', 'Die Schauspieler sprechen zu langsam.'], 'The slowness creates a hypnotic mood but demands patience.'),
      tf('Paul wird als offener, leicht durchschaubarer Charakter dargestellt.', false, '„Paul … bleibt bewusst rätselhaft“.'),
      mc('Für wen ist der Film laut Kritik nicht geeignet?', ['für Zuschauer, die actionreiches Kino erwarten', 'für Menschen mit Geschwistern', 'für Kinder unter zwölf', 'für Fans von Familiendramen'], '„Wer actionreiches Kino erwartet, ist hier fehl am Platz.“'),
    ],
  },
  {
    id: 'c1-schwammstadt',
    level: 'C1',
    title: 'Die Schwammstadt',
    genre: 'Science journalism',
    topics: ['nature', 'science', 'society'],
    text: `Hitzesommer, Starkregen, Überschwemmungen: Die Folgen des Klimawandels sind in deutschen Städten längst spürbar. Während der Klimaschutz darauf abzielt, die Erderwärmung zu begrenzen, geht es bei der Klimaanpassung darum, sich auf die unvermeidbaren Veränderungen vorzubereiten. Ein Konzept, das dabei zunehmend an Bedeutung gewinnt, ist die sogenannte Schwammstadt.

Die Grundidee ist ebenso einfach wie einleuchtend: Statt Regenwasser möglichst schnell über die Kanalisation abzuleiten, soll die Stadt es wie ein Schwamm aufnehmen, speichern und bei Bedarf wieder abgeben. Herkömmliche Städte mit ihren versiegelten Flächen aus Asphalt und Beton sind dazu kaum in der Lage. Bei Starkregen ist die Kanalisation schnell überlastet, Straßen und Keller laufen voll – während das Wasser in Trockenperioden fehlt.

Abhilfe schaffen sollen unter anderem begrünte Dächer und Fassaden, Mulden, in denen Wasser versickern kann, sowie Bäume, deren Wurzeln über unterirdische Speicher mit Wasser versorgt werden. Der Nutzen ist ein doppelter: Das gespeicherte Wasser verdunstet an heißen Tagen und kühlt die Umgebung, was angesichts zunehmender Hitzeperioden von erheblicher Bedeutung ist. Zugleich verringert sich das Risiko von Überflutungen.

Als Vorreiter gilt Kopenhagen, das nach einem verheerenden Unwetter im Jahr 2011 einen umfassenden Wolkenbruchplan auflegte. Auch in Deutschland gibt es Beispiele: In Berlin etwa soll das neue Schumacher Quartier auf dem Gelände des ehemaligen Flughafens Tegel nach dem Schwammstadt-Prinzip entstehen. In vielen anderen Kommunen steckt die Umsetzung dagegen noch in den Anfängen.

Die Hindernisse sind weniger technischer als organisatorischer Natur. Die Umgestaltung erfordert die Zusammenarbeit von Ämtern, die bislang getrennt geplant haben – von der Stadtentwässerung über das Grünflächenamt bis zur Verkehrsplanung. Hinzu kommen Flächenkonkurrenz und knappe Kassen. Fachleute betonen jedoch, dass sich die Investitionen langfristig rechnen, weil sie künftige Schäden in weit größerem Umfang vermeiden.`,
    questions: [
      mc('Worin unterscheidet sich Klimaanpassung vom Klimaschutz?', ['Sie bereitet auf unvermeidbare Veränderungen vor.', 'Sie begrenzt die Erderwärmung.', 'Sie betrifft nur ländliche Regionen.', 'Sie ist billiger als Klimaschutz.'], 'Climate protection limits warming; adaptation prepares for unavoidable change.'),
      tf('In herkömmlichen Städten wird Regenwasser möglichst schnell abgeleitet.', true, 'That is exactly what the sponge city wants to change.'),
      mc('Welchen doppelten Nutzen hat das gespeicherte Wasser?', ['Es kühlt an heißen Tagen und verringert das Überflutungsrisiko.', 'Es liefert Trinkwasser und Strom.', 'Es spart Kosten und erhöht die Mieten.', 'Es reinigt die Luft und düngt Felder.'], 'Evaporation cools; storage reduces flooding.'),
      tf('Die größten Hindernisse sind laut Text technischer Natur.', false, '„weniger technischer als organisatorischer Natur“.'),
      mc('Was war der Anlass für Kopenhagens Wolkenbruchplan?', ['ein verheerendes Unwetter 2011', 'eine Dürre', 'ein EU-Gesetz', 'ein Architekturwettbewerb'], 'The 2011 cloudburst.'),
      mc('Was bedeutet „sich rechnen“ im letzten Absatz?', ['sich finanziell lohnen', 'genau berechnet werden', 'zählen lernen', 'teurer werden'], 'etwas rechnet sich = it pays off.'),
    ],
  },

  // ───────────── C2 ─────────────
  {
    id: 'c2-lob-der-langeweile',
    level: 'C2',
    title: 'Lob der Langeweile',
    genre: 'Essay',
    topics: ['literature', 'culture', 'health'],
    text: `Langeweile hat einen schlechten Ruf. Sie gilt als Zeitverschwendung, als Symptom eines unausgefüllten Lebens, als etwas, das man um jeden Preis vermeiden sollte. Und tatsächlich: Kaum eine Erfahrung ist uns so gründlich abhandengekommen wie die, einfach nichts zu tun. Die Wartezeit an der Bushaltestelle, die Minuten vor dem Einschlafen, die Zugfahrt durch eintönige Landschaften – jede noch so kleine Lücke im Tagesablauf wird reflexhaft mit dem Smartphone gefüllt.

Dabei spricht einiges dafür, dass uns mit der Langeweile etwas Wertvolles verloren geht. Psychologinnen und Psychologen weisen seit Längerem darauf hin, dass gerade Phasen scheinbaren Leerlaufs dem Gehirn Gelegenheit geben, Erlebtes zu ordnen, Verbindungen herzustellen und auf Ideen zu kommen, die sich bei angestrengtem Nachdenken partout nicht einstellen wollen. Nicht von ungefähr fallen vielen Menschen die besten Gedanken unter der Dusche ein.

Schon Walter Benjamin nannte die Langeweile den „Traumvogel, der das Ei der Erfahrung ausbrütet“. Das Bild ist treffend: Wer diesen Vogel bei jedem Rascheln aufscheucht, darf sich nicht wundern, wenn nichts ausgebrütet wird. Die permanente Zerstreuung mag kurzfristig Erleichterung verschaffen; auf Dauer aber verkümmert die Fähigkeit, die eigene Gedankenwelt auszuhalten – und mit ihr ein gutes Stück innerer Freiheit.

Freilich wäre es naiv, die Langeweile zu verklären. Wer jahrelang an einem Arbeitsplatz ausharrt, an dem er sich unterfordert fühlt, wird von ihr eher zermürbt als beflügelt. Die Rede ist hier nicht von chronischer Öde, sondern von jenen kurzen, unverplanten Momenten, die wir uns kaum noch zugestehen.

Was also tun? Ein radikaler Verzicht auf digitale Geräte ist weder realistisch noch nötig. Es genügt womöglich schon, sich hin und wieder bewusst einer kleinen Leere auszusetzen: das Handy beim Spaziergang zu Hause zu lassen, in der Warteschlange einfach nur zu warten, aus dem Fenster zu schauen, ohne etwas Bestimmtes zu sehen. Das mag anfangs unbehaglich sein. Doch wer es aushält, wird womöglich feststellen, dass die Langeweile weniger ein Feind ist als ein verkannter Verbündeter.`,
    questions: [
      mc('Welche These vertritt der Text?', ['Kurze Phasen der Langeweile können wertvoll sein.', 'Langeweile sollte man um jeden Preis vermeiden.', 'Smartphones sind die wichtigste Quelle von Kreativität.', 'Chronische Langeweile im Beruf ist gesund.'], 'The essay defends short, unplanned moments of boredom.'),
      tf('Der Autor fordert einen vollständigen Verzicht auf digitale Geräte.', false, '„Ein radikaler Verzicht … ist weder realistisch noch nötig.“'),
      mc('Wie ist Benjamins Bild vom „Traumvogel“ zu verstehen?', ['Erfahrung reift in ungestörter Muße, die man nicht ständig unterbrechen sollte.', 'Man sollte Vögel beobachten, um kreativ zu werden.', 'Träume sind wichtiger als Erfahrungen.', 'Langeweile führt zwangsläufig zu Albträumen.'], 'If you keep scaring the bird away, nothing hatches.'),
      mc('Wovon grenzt der Autor die „gute“ Langeweile ab?', ['von chronischer Unterforderung im Beruf', 'von Wartezeiten an der Bushaltestelle', 'von Momenten vor dem Einschlafen', 'von Spaziergängen ohne Handy'], '„Die Rede ist hier nicht von chronischer Öde …“'),
      mc('Was bedeutet „nicht von ungefähr“?', ['nicht zufällig', 'nicht ungefährlich', 'nicht ungefähr richtig', 'nicht von außen'], 'nicht von ungefähr = not by chance.'),
      tf('Der Text räumt ein, dass bewusste Leere anfangs unangenehm sein kann.', true, '„Das mag anfangs unbehaglich sein.“'),
    ],
  },
  {
    id: 'c2-glosse-amt',
    level: 'C2',
    title: 'Glosse: Ein Termin für den Termin',
    genre: 'Satirical column',
    topics: ['society'],
    text: `Es begann, wie so vieles in diesem Land, mit einem Formular. Ich wollte lediglich mein Auto ummelden – ein Vorgang, den man in einem digital aufgeschlossenen Gemeinwesen vermutlich mit drei Klicks erledigt hätte. Hierzulande hingegen benötigte ich zunächst einen Termin, den man, wie mir die Website freundlich mitteilte, „zeitnah“ online buchen könne. Zeitnah bedeutete in diesem Fall: in sieben Wochen.

Am Tag X fand ich mich pünktlich in einem Wartebereich ein, dessen Charme irgendwo zwischen Zahnarztpraxis und Bahnhofshalle der Achtzigerjahre angesiedelt war. Eine Anzeigetafel rief Nummern auf, die mit meiner in keinerlei erkennbarem Zusammenhang standen. Nach anderthalb Stunden war es so weit. Die Sachbearbeiterin, eine Frau von bewundernswerter Gelassenheit, warf einen Blick auf meine Unterlagen und schüttelte bedauernd den Kopf. Die Bescheinigung über die Hauptuntersuchung liege zwar vor, jedoch nur in Kopie. Ohne Original gehe da leider nichts.

Ich wandte ein, das Original befinde sich in einem Ordner auf meinem Schreibtisch, gut zwanzig Minuten entfernt. Sie lächelte, wie man einem Kind zulächelt, das gerade erklärt hat, es könne fliegen. Selbstverständlich könne ich das Original nachreichen – nach Vereinbarung eines neuen Termins.

Man mag mir vorwerfen, ich übertreibe. Und gewiss: Hinter jeder Vorschrift steckt vermutlich ein Fall, in dem jemand mit einer gefälschten Kopie Schindluder getrieben hat. Aber irgendwann, so scheint es, hat sich die Bürokratie verselbstständigt. Sie dient nicht mehr in erster Linie den Bürgern, sondern sich selbst. Jeder Versuch, sie zu entschlacken, gebiert neue Formulare zur Dokumentation der Entschlackung.

Inzwischen habe ich meinen zweiten Termin. Er ist in sechs Wochen. Bis dahin werde ich das Original hüten wie meinen Augapfel. Und sollte mir unterwegs jemand begegnen, der von der Digitalisierung der Verwaltung schwärmt, werde ich ihm wortlos meine Wartenummer überreichen. Sie lautet, kein Scherz, 404.`,
    questions: [
      mc('Worum geht es in der Glosse?', ['um die umständliche Bürokratie beim Ummelden eines Autos', 'um den Kauf eines neuen Autos', 'um eine Bahnreise', 'um einen Zahnarztbesuch'], 'Re-registering a car turns into an odyssey.'),
      mc('Was bedeutet „zeitnah“ in diesem Text ironischerweise?', ['in sieben Wochen', 'sofort', 'am selben Tag', 'in einer Stunde'], 'The irony: „zeitnah“ (promptly) turns out to mean seven weeks.'),
      tf('Die Sachbearbeiterin akzeptierte die Kopie der Bescheinigung.', false, '„Ohne Original gehe da leider nichts.“'),
      mc('Was bedeutet „mit etwas Schindluder treiben“?', ['etwas missbrauchen', 'etwas reparieren', 'etwas verkaufen', 'etwas verlieren'], 'Schindluder treiben = to abuse / misuse something.'),
      mc('Was meint der Autor mit „die Bürokratie hat sich verselbstständigt“?', ['Sie dient vor allem sich selbst statt den Bürgern.', 'Sie ist vollständig digitalisiert.', 'Sie arbeitet besonders effizient.', 'Sie wurde privatisiert.'], 'It has taken on a life of its own.'),
      mc('Worauf spielt die Wartenummer 404 an?', ['auf die Fehlermeldung „nicht gefunden“ im Internet', 'auf die Hausnummer des Amts', 'auf die Zahl der Wartenden', 'auf die Uhrzeit des Termins'], 'HTTP 404 „Not Found“ — a jab at the missing digitalisation.'),
    ],
  },
  {
    id: 'c2-der-letzte-sommergast',
    level: 'C2',
    title: 'Der letzte Sommergast',
    genre: 'Literary prose',
    topics: ['literature', 'nature', 'people'],
    text: `Als der letzte Sommergast abgereist war, kehrte die Stille ins Dorf zurück wie ein Hausherr, der lange verreist gewesen ist und nun prüfend durch die Zimmer geht. Die Strandkörbe standen zusammengerückt hinter dem Kiosk, die Fensterläden der Pension Seeblick waren geschlossen, und auf der Promenade wehte nur noch ein vergessenes Handtuch an der Leine, ein letztes, verblichenes Signal der vergangenen Saison.

Hanna mochte diese Wochen am meisten. Sie war im Dorf geboren und hatte es nie für länger als ein paar Tage verlassen, was ihr die Leute aus der Stadt, die im Sommer kamen, je nach Temperament als Beschränktheit oder als beneidenswerte Treue auslegten. Sie selbst hatte darüber nie viele Worte verloren. Es gab Dinge, die sich nur erschlossen, wenn man blieb: das Licht im Oktober etwa, das über dem Wasser lag, als hätte jemand es eigens für diesen Ort angefertigt, oder die Art, wie das Meer im Herbst anders roch – nach Tang, nach Rauch aus den Schornsteinen, nach etwas, das sie nie hätte benennen können und das sie dennoch jedes Jahr wiedererkannte.

An diesem Morgen ging sie wie immer zum Hafen hinunter. Der alte Petersen saß bereits auf seiner Bank und flickte ein Netz, obwohl er seit Jahren nicht mehr hinausfuhr. „Na, sind sie alle weg?“, fragte er, ohne aufzusehen. „Alle“, sagte Hanna. Er nickte, als habe sie ihm eine gute Nachricht überbracht, und sie saßen nebeneinander, ohne weiter zu sprechen.

Erst später, als die Sonne schon tief stand und die Möwen über den leeren Liegeplätzen kreisten, fiel ihr der Brief wieder ein, der seit drei Tagen ungeöffnet auf dem Küchentisch lag. Der Absender war eine Universität in Hamburg. Sie wusste, was darin stand, oder ahnte es zumindest, und gerade deshalb hatte sie ihn nicht geöffnet. Solange der Umschlag verschlossen blieb, war alles noch möglich und nichts entschieden.

Der Wind frischte auf. Petersen rollte sein Netz zusammen und sagte, mehr zu sich selbst als zu ihr: „Bleiben ist auch eine Entscheidung, Mädchen. Man merkt es nur nicht so.“`,
    questions: [
      mc('Welche Stimmung prägt den Anfang des Textes?', ['eine ruhige, leicht melancholische Stille nach der Saison', 'hektische Betriebsamkeit', 'fröhliche Feststimmung', 'bedrohliche Spannung'], 'Closed shutters, a forgotten towel — quiet, slightly melancholic.'),
      mc('Wie deuten die Sommergäste Hannas Leben im Dorf?', ['als Beschränktheit oder als beneidenswerte Treue', 'als großes Abenteuer', 'als Flucht vor der Stadt', 'als Zeichen von Reichtum'], '„je nach Temperament als Beschränktheit oder als beneidenswerte Treue“.'),
      tf('Hanna hat den Brief der Universität bereits gelesen.', false, 'It has been lying unopened for three days.'),
      mc('Warum öffnet Hanna den Brief nicht?', ['Solange er verschlossen ist, bleibt alles offen und unentschieden.', 'Sie hat keine Zeit.', 'Sie kann die Handschrift nicht lesen.', 'Petersen hat es ihr verboten.'], '„Solange der Umschlag verschlossen blieb, war alles noch möglich“.'),
      mc('Was meint Petersen mit seinem letzten Satz?', ['Auch das Bleiben ist eine Wahl mit Folgen.', 'Hanna soll unbedingt nach Hamburg gehen.', 'Er möchte, dass Hanna Fischerin wird.', 'Das Wetter wird schlechter.'], 'Not deciding is also a decision — one you don’t notice.'),
      mc('Welches Stilmittel enthält der erste Satz („wie ein Hausherr, der …“)?', ['einen Vergleich, der die Stille personifiziert', 'eine Alliteration', 'eine rhetorische Frage', 'eine Aufzählung'], 'The silence is compared to a returning master of the house.'),
    ],
  },
  {
    id: 'c2-vertrauen-wissenschaft',
    level: 'C2',
    title: 'Vertrauen in die Wissenschaft',
    genre: 'Essay',
    topics: ['science', 'society'],
    text: `Selten stand die Wissenschaft so im Rampenlicht wie in den vergangenen Jahren. Virologinnen wurden zu Talkshowgästen, Klimaforscher zu Reizfiguren, und Begriffe wie „Peer-Review“ oder „Konfidenzintervall“ fanden Eingang in Gespräche am Küchentisch. Diese neue Sichtbarkeit hat ein Paradox zutage gefördert: Je mehr Menschen Einblick in wissenschaftliche Prozesse erhielten, desto lauter wurden mancherorts die Zweifel an ihnen.

Ein Grund dafür dürfte in einem grundlegenden Missverständnis liegen. Viele erwarten von der Wissenschaft endgültige Wahrheiten. Tatsächlich aber besteht ihr Wesen gerade darin, vorläufiges Wissen fortlaufend zu überprüfen und gegebenenfalls zu revidieren. Was dem Laien als Wankelmut erscheint – heute so, morgen anders –, ist in Wahrheit Ausdruck methodischer Redlichkeit. Eine Disziplin, die ihre Erkenntnisse nie korrigierte, verdiente kein Vertrauen, sondern Misstrauen.

Hinzu kommt, dass wissenschaftliche Erkenntnis selten jene Eindeutigkeit besitzt, die politische Entscheidungen erfordern. Wenn Forschende Wahrscheinlichkeiten und Unsicherheiten benennen, wie es ihre Pflicht ist, wird dies in der öffentlichen Debatte nicht selten als Ausflucht missverstanden – oder von jenen gezielt ausgeschlachtet, die ein Interesse daran haben, unliebsame Befunde zu diskreditieren. Die Strategie, Zweifel zu säen, wo in der Fachwelt längst weitgehender Konsens herrscht, ist dabei keineswegs neu; die Tabakindustrie hat sie bereits vor Jahrzehnten perfektioniert.

Gleichwohl wäre es zu einfach, Skepsis pauschal als Irrationalität abzutun. Auch die Wissenschaft ist nicht frei von Fehlentwicklungen: von der Replikationskrise in Teilen der Psychologie über Interessenkonflikte bei industriefinanzierter Forschung bis hin zu einem Publikationsdruck, der spektakuläre Ergebnisse belohnt. Gesunde Skepsis gehört zum Kern wissenschaftlichen Denkens – sie ist, recht verstanden, nicht deren Gegenteil, sondern deren Voraussetzung.

Was folgt daraus? Vertrauen lässt sich nicht verordnen, wohl aber verdienen: durch Transparenz über Methoden und Unsicherheiten, durch eine verständliche Kommunikation, die auf Belehrung verzichtet, und durch die Bereitschaft, Fehler offen einzugestehen. Nicht blinder Glaube an „die Wissenschaft“ ist das Ziel, sondern ein informiertes Vertrauen, das um die Grenzen des Wissens weiß.`,
    questions: [
      mc('Welches Paradox beschreibt der erste Absatz?', ['Mehr Einblick in die Wissenschaft führte teils zu mehr Zweifeln.', 'Weniger Forschung führte zu mehr Vertrauen.', 'Talkshows machten die Wissenschaft unsichtbar.', 'Laien verstehen Statistik besser als Forschende.'], '„Je mehr … desto lauter wurden … die Zweifel“.'),
      tf('Laut Text ist es ein Zeichen von Schwäche, wenn die Wissenschaft Erkenntnisse korrigiert.', false, 'It is a sign of methodological integrity („methodischer Redlichkeit“).'),
      mc('Was wirft der Text der Tabakindustrie vor?', ['Sie hat gezielt Zweifel gesät, wo Konsens herrschte.', 'Sie hat die Replikationskrise ausgelöst.', 'Sie hat Talkshows finanziert.', 'Sie hat Konfidenzintervalle erfunden.'], 'The strategy of sowing doubt despite expert consensus.'),
      mc('Wie bewertet der Autor Skepsis grundsätzlich?', ['Gesunde Skepsis ist eine Voraussetzung wissenschaftlichen Denkens.', 'Skepsis ist immer irrational.', 'Skepsis sollte verboten werden.', 'Skepsis ist nur bei Laien berechtigt.'], '„nicht deren Gegenteil, sondern deren Voraussetzung“.'),
      mc('Was bedeutet „etwas ausschlachten“ hier?', ['etwas für eigene Zwecke ausnutzen', 'etwas genau untersuchen', 'etwas zerstören', 'etwas verschweigen'], 'Figurative: to exploit something for one’s own ends.'),
      tf('Der Text fordert blinden Glauben an die Wissenschaft.', false, 'The goal is „informiertes Vertrauen“, not blind faith.'),
    ],
  },
  {
    id: 'c2-sprachwandel',
    level: 'C2',
    title: 'Sprachwandel: Untergang oder Lebenszeichen?',
    genre: 'Commentary',
    topics: ['culture', 'literature', 'society'],
    text: `Alle paar Jahre erreicht uns dieselbe Klage: Das Deutsche verkomme. Schuld seien wahlweise Anglizismen, die Jugendsprache, das Internet oder – in jüngerer Zeit besonders beliebt – das Gendern. Wer „downloaden“ sagt, „wegen dem“ schreibt oder im Café „Ich krieg einen Latte“ bestellt, gilt manchen Sprachpflegern als Totengräber der Muttersprache.

Ein Blick in die Sprachgeschichte könnte die Gemüter beruhigen. Klagen über den Verfall der Sprache sind so alt wie die Sprache selbst. Im 17. und 18. Jahrhundert wetterten Sprachgesellschaften und Gelehrte gegen die Flut französischer Lehnwörter, die damals als Zeichen von Bildung galten. Manche dieser Wörter haben sich gehalten, andere sind wieder verschwunden. Die deutsche Sprache hat beides unbeschadet überstanden – ja, sie ist daran gewachsen.

Sprachwandel ist kein Betriebsunfall, sondern der Normalzustand lebendiger Sprachen. Nur tote Sprachen verändern sich nicht mehr. Dass sich etwa der Dativ nach „wegen“ in der gesprochenen Sprache längst durchgesetzt hat, mag Puristen schmerzen; ein Indiz für den Niedergang des Deutschen ist es nicht. Ähnliches gilt für Entlehnungen aus dem Englischen: Sie werden in aller Regel nach den Regeln des Deutschen konjugiert und dekliniert – „ich habe die Datei gedownloadet“ –, was eher von der Integrationskraft der Sprache zeugt als von ihrer Schwäche.

Das heißt freilich nicht, dass alles gleichgültig wäre. Wer einen Bewerbungsbrief schreibt, eine wissenschaftliche Arbeit verfasst oder vor Gericht spricht, tut gut daran, sich an die Normen der Standardsprache zu halten. Sprachkompetenz zeigt sich gerade darin, zwischen den Registern wechseln zu können: im Chat anders zu schreiben als im Antrag, mit Freunden anders zu sprechen als im Vorstellungsgespräch.

Die eigentliche Gefahr für das Deutsche liegt denn auch nicht im Wandel, sondern im Rückzug – etwa wenn in Teilen der Wissenschaft und der Wirtschaft ganze Domänen ins Englische abwandern und dem Deutschen dort die Fachwörter abhandenkommen. Darüber zu streiten, lohnt sich. Über „wegen dem“ dagegen darf man getrost gelassen bleiben.`,
    questions: [
      mc('Welche Position vertritt der Kommentar?', ['Sprachwandel ist normal und kein Zeichen von Verfall.', 'Das Deutsche ist durch Anglizismen bedroht und muss geschützt werden.', 'Man sollte nur noch Standardsprache verwenden.', 'Französische Lehnwörter haben dem Deutschen geschadet.'], '„Sprachwandel ist kein Betriebsunfall, sondern der Normalzustand“.'),
      tf('Klagen über Sprachverfall sind laut Text ein neues Phänomen.', false, '„so alt wie die Sprache selbst“.'),
      mc('Wofür ist „gedownloadet“ laut Text ein Beispiel?', ['für die Integrationskraft des Deutschen', 'für den Verfall der Grammatik', 'für einen typischen Rechtschreibfehler', 'für französischen Einfluss'], 'The English verb is conjugated by German rules (ge- … -et).'),
      mc('Was versteht der Autor unter Sprachkompetenz?', ['zwischen Registern wechseln zu können', 'nur die Standardsprache zu benutzen', 'möglichst viele Fremdwörter zu kennen', 'Jugendsprache zu vermeiden'], 'Switching registers: chat vs. application, friends vs. interview.'),
      mc('Worin sieht der Autor die eigentliche Gefahr?', ['dass ganze Fachbereiche ins Englische abwandern', 'im Dativ nach „wegen“', 'im Gendern', 'in der Jugendsprache'], '„nicht im Wandel, sondern im Rückzug“.'),
      mc('Was bedeutet „getrost gelassen bleiben“?', ['ohne Sorge ruhig bleiben', 'sich trösten lassen', 'sich aufregen', 'etwas liegen lassen'], 'getrost = safely, without worry.'),
    ],
  },
  {
    id: 'c2-gewinn-und-moral',
    level: 'C2',
    title: 'Darf Gewinn alles?',
    genre: 'Essay',
    topics: ['economy', 'society'],
    text: `Milton Friedman hat es 1970 in einem vielzitierten Aufsatz auf eine knappe Formel gebracht: Die gesellschaftliche Verantwortung eines Unternehmens bestehe darin, seine Gewinne zu steigern – im Rahmen der Spielregeln, versteht sich. Alles Weitere, etwa soziales Engagement auf Kosten der Aktionäre, sei eine Art Besteuerung ohne demokratische Legitimation.

Ein halbes Jahrhundert später wirkt diese Position eigentümlich aus der Zeit gefallen. Kaum ein Konzern, der heute nicht mit Nachhaltigkeitsberichten, Klimazielen und Diversitätsprogrammen aufwartete. Kritiker sehen darin freilich vor allem Imagepflege: Wer mit großem Aufwand ein Wiederaufforstungsprojekt bewirbt, während er an anderer Stelle ungebremst Emissionen verursacht, betreibe „Greenwashing“ – den Anschein von Verantwortung ohne deren Substanz.

Zwischen diesen Polen bewegt sich die Debatte um unternehmerische Verantwortung. Die einen argumentieren, langfristig erfolgreiche Unternehmen könnten es sich gar nicht leisten, die Interessen von Beschäftigten, Kundschaft und Umwelt zu ignorieren; Verantwortung und Gewinn seien folglich keine Gegensätze. Die anderen halten dies für eine bequeme Harmonieerzählung: Wo sich ethisches Handeln rechne, geschehe es ohnehin – entscheidend seien gerade jene Fälle, in denen Moral etwas koste.

Der Gesetzgeber hat sich zuletzt verstärkt in diese Debatte eingeschaltet. Sogenannte Lieferkettengesetze etwa verpflichten große Unternehmen, menschenrechtliche Risiken in ihren Lieferketten zu ermitteln und ihnen vorzubeugen. Was die einen als überfälligen Schritt begrüßen, geißeln die anderen als bürokratisches Monstrum, das vor allem mittelständische Zulieferer über Gebühr belaste.

Vielleicht liegt die Pointe darin, dass Friedmans Formel ihre eigene Einschränkung bereits enthält: „im Rahmen der Spielregeln“. Welche Regeln das sind, bestimmen nicht die Unternehmen allein, sondern letztlich die Gesellschaft. Insofern ist die Frage, ob Gewinn alles darf, keine betriebswirtschaftliche, sondern eine politische – und sie muss immer wieder neu verhandelt werden.`,
    questions: [
      mc('Worin besteht laut Friedman die gesellschaftliche Verantwortung eines Unternehmens?', ['seine Gewinne im Rahmen der Spielregeln zu steigern', 'möglichst viele Arbeitsplätze zu schaffen', 'soziale Projekte zu finanzieren', 'Steuern zu vermeiden'], 'Profit within the rules of the game.'),
      mc('Was versteht man unter „Greenwashing“?', ['den Anschein von Umweltverantwortung ohne echte Substanz', 'umweltfreundliche Produktion', 'das Waschen mit Ökowaschmittel', 'staatliche Förderung grüner Technik'], '„den Anschein von Verantwortung ohne deren Substanz“.'),
      tf('Alle Beteiligten sind sich einig, dass Verantwortung und Gewinn keine Gegensätze sind.', false, 'The others call that a convenient „Harmonieerzählung“.'),
      mc('Was kritisieren Gegner von Lieferkettengesetzen?', ['dass sie vor allem mittelständische Zulieferer übermäßig belasten', 'dass sie zu wenig Bürokratie verursachen', 'dass sie nur für kleine Firmen gelten', 'dass sie Menschenrechte ignorieren'], '„über Gebühr belaste“ = burden excessively.'),
      mc('Welche Pointe sieht der Autor in Friedmans Formel?', ['Die „Spielregeln“ setzt letztlich die Gesellschaft.', 'Friedman war eigentlich für Greenwashing.', 'Gewinne sind unwichtig.', 'Unternehmen bestimmen die Regeln allein.'], 'The rules are set politically — so the question is political.'),
      mc('Was bedeutet „aus der Zeit gefallen“?', ['nicht mehr zeitgemäß', 'sehr modern', 'zeitlos gültig', 'zu spät gekommen'], 'Outdated, out of step with the times.'),
    ],
  },
];
