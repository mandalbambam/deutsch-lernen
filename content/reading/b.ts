import { mc, tf, type ReadingText } from './types';

export const B_TEXTS: ReadingText[] = [
  // ───────────── B1 ─────────────
  {
    id: 'b1-homeoffice',
    level: 'B1',
    title: 'Homeoffice: Fluch oder Segen?',
    genre: 'Magazine article',
    topics: ['work'],
    text: `Seit der Corona-Pandemie arbeiten viele Menschen in Deutschland regelmäßig von zu Hause aus. Was als Notlösung begann, ist für viele inzwischen normal geworden. Aber ist das Homeoffice wirklich so gut, wie viele glauben?

Die Vorteile liegen auf der Hand: Man spart sich den Weg zur Arbeit und hat dadurch mehr Zeit für Familie und Hobbys. Außerdem kann man sich die Arbeitszeit oft freier einteilen. „Ich bringe morgens meine Kinder in die Schule und fange danach ganz entspannt an“, erzählt Sandra M., die bei einer Versicherung arbeitet.

Es gibt aber auch Nachteile. Viele Beschäftigte fühlen sich einsam, weil der Kontakt zu den Kollegen fehlt. Andere haben zu Hause keinen ruhigen Arbeitsplatz und arbeiten am Küchentisch. Ein weiteres Problem: Arbeit und Freizeit lassen sich schwerer trennen. Wer abends noch schnell die E-Mails checkt, kann irgendwann nicht mehr richtig abschalten.

Experten empfehlen deshalb eine Mischung aus Büro und Homeoffice. Wichtig ist außerdem, feste Arbeitszeiten einzuhalten und sich zu Hause einen eigenen Arbeitsplatz einzurichten. Viele Firmen bieten inzwischen solche Modelle an: zum Beispiel drei Tage im Büro und zwei Tage zu Hause.`,
    questions: [
      tf('Für viele Menschen ist das Homeoffice heute normal.', true, '„ist für viele inzwischen normal geworden“.'),
      mc('Welchen Vorteil nennt Sandra M.?', ['Sie kann ihre Kinder morgens zur Schule bringen.', 'Sie verdient mehr Geld.', 'Sie hat mehr Kontakt zu Kollegen.', 'Sie arbeitet weniger Stunden.'], 'She takes her children to school and then starts work relaxed.'),
      mc('Warum fühlen sich manche Beschäftigte im Homeoffice einsam?', ['Weil der Kontakt zu den Kollegen fehlt.', 'Weil sie am Küchentisch arbeiten.', 'Weil sie zu viele E-Mails bekommen.', 'Weil ihre Familie nicht zu Hause ist.'], '„weil der Kontakt zu den Kollegen fehlt“. Working at the kitchen table is a different problem.'),
      tf('Experten empfehlen, nur noch zu Hause zu arbeiten.', false, 'They recommend a mix of office and home office.'),
      mc('Was bedeutet „abschalten“ im Text?', ['sich entspannen und nicht an die Arbeit denken', 'den Computer ausmachen', 'das Licht ausmachen', 'eine Pause im Büro machen'], 'Here abschalten is figurative: to switch off mentally, to relax.'),
    ],
  },
  {
    id: 'b1-ohne-plastik',
    level: 'B1',
    title: 'Ein Monat ohne Plastik',
    genre: 'Personal report',
    topics: ['nature', 'food'],
    text: `Im letzten März habe ich ein Experiment gemacht: Einen Monat lang wollte ich so wenig Plastik wie möglich kaufen. Die Idee kam mir, als ich eines Abends meinen Mülleimer betrachtete. Er war fast nur mit Verpackungen gefüllt.

Die erste Woche war schwieriger als gedacht. Im Supermarkt waren Gurken, Käse und sogar Bananen in Plastik verpackt. Also ging ich auf den Wochenmarkt. Dort kaufte ich Obst und Gemüse lose und brachte meine eigenen Stoffbeutel mit. Den Käse ließ ich mir an der Theke direkt in eine mitgebrachte Dose legen. Die Verkäuferin war zuerst überrascht, fand die Idee aber gut.

Am meisten vermisste ich Chips und Schokolade, denn beides gibt es fast nur in Plastikverpackungen. Zum Glück fand ich einen Unverpackt-Laden in meiner Nähe. Dort füllt man Nudeln, Reis, Nüsse und sogar Spülmittel in mitgebrachte Gläser.

Mein Fazit: Ganz ohne Plastik zu leben ist fast unmöglich, aber man kann viel reduzieren. Am Ende des Monats war mein Mülleimer nur halb so voll wie vorher. Einiges habe ich beibehalten: Ich gehe weiterhin samstags auf den Markt und nehme immer einen Beutel mit.`,
    questions: [
      mc('Warum hat die Autorin das Experiment gemacht?', ['Ihr Mülleimer war fast nur mit Verpackungen gefüllt.', 'Eine Freundin hat es ihr empfohlen.', 'Sie wollte Geld sparen.', 'Der Supermarkt war geschlossen.'], '„Die Idee kam mir, als ich … meinen Mülleimer betrachtete.“'),
      tf('Im Supermarkt war es leicht, Produkte ohne Plastik zu finden.', false, 'Even cucumbers and bananas were wrapped in plastic.'),
      mc('Wie hat die Verkäuferin an der Käsetheke reagiert?', ['Sie war überrascht, fand die Idee aber gut.', 'Sie war verärgert.', 'Sie wollte das nicht machen.', 'Sie hat gelacht und nichts gesagt.'], '„Die Verkäuferin war zuerst überrascht, fand die Idee aber gut.“'),
      mc('Was kann man im Unverpackt-Laden machen?', ['Lebensmittel in eigene Gläser füllen', 'Plastiktüten kaufen', 'Chips in Plastik kaufen', 'Müll abgeben'], 'You fill pasta, rice, nuts or washing-up liquid into jars you bring yourself.'),
      tf('Nach dem Experiment kauft die Autorin weiter auf dem Markt ein.', true, '„Ich gehe weiterhin samstags auf den Markt.“'),
    ],
  },
  {
    id: 'b1-ehrenamt',
    level: 'B1',
    title: 'Helfen ohne Bezahlung',
    genre: 'Report',
    topics: ['society', 'people'],
    text: `In Deutschland engagieren sich fast 29 Millionen Menschen ehrenamtlich – das heißt, sie arbeiten freiwillig und ohne Bezahlung. Sie trainieren Kinder im Sportverein, helfen bei der Feuerwehr, besuchen alte Menschen oder geben Geflüchteten Nachhilfe in Deutsch.

Einer von ihnen ist Klaus Behrens, 67. Seit er in Rente ist, arbeitet er zweimal pro Woche bei der Tafel in Bremen. Die Tafel sammelt Lebensmittel, die Supermärkte nicht mehr verkaufen können, und gibt sie an Menschen mit wenig Geld weiter. „Viele Lebensmittel würden sonst im Müll landen“, sagt Klaus. „Hier helfen sie Menschen, die sie wirklich brauchen.“

Warum macht er das? „Ich wollte nach dem Arbeitsleben etwas Sinnvolles tun“, erklärt er. „Außerdem habe ich hier viele nette Leute kennengelernt. Das Team ist für mich wie eine zweite Familie.“

Auch für junge Menschen kann ein Ehrenamt interessant sein. Viele sammeln dabei wichtige Erfahrungen für ihren späteren Beruf. Manche Arbeitgeber achten bei Bewerbungen sogar darauf, ob sich jemand ehrenamtlich engagiert hat.

Wer sich engagieren möchte, findet in vielen Städten eine Freiwilligenagentur. Dort bekommt man Informationen und Tipps, welche Aufgabe zu einem passt.`,
    questions: [
      mc('Was bedeutet „ehrenamtlich“?', ['freiwillig und ohne Bezahlung', 'nur am Wochenende', 'für eine große Firma', 'mit einem hohen Gehalt'], 'The text explains it: „das heißt, sie arbeiten freiwillig und ohne Bezahlung“.'),
      tf('Klaus arbeitet bei der Tafel, seit er in Rente ist.', true, '„Seit er in Rente ist, arbeitet er … bei der Tafel“.'),
      mc('Was macht die Tafel?', ['Sie gibt Lebensmittel an Menschen mit wenig Geld weiter.', 'Sie verkauft Lebensmittel billiger.', 'Sie kocht für alte Menschen.', 'Sie hilft Supermärkten beim Verkauf.'], 'It collects food supermarkets can’t sell and passes it on to people with little money.'),
      mc('Warum engagiert sich Klaus?', ['Er wollte etwas Sinnvolles tun und hat nette Leute gefunden.', 'Er braucht das Geld.', 'Sein Arbeitgeber verlangt es.', 'Er hat keine Familie.'], 'Two reasons: something meaningful to do, and the team is like a second family.'),
      tf('Für Bewerbungen spielt ein Ehrenamt keine Rolle.', false, 'Some employers pay attention to it: „Manche Arbeitgeber achten … sogar darauf“.'),
    ],
  },
  {
    id: 'b1-die-fahrkarte',
    level: 'B1',
    title: 'Die Fahrkarte',
    genre: 'Short story',
    topics: ['literature', 'travel'],
    text: `Der Zug nach München war voll. Marie fand gerade noch einen Platz am Fenster, neben einem älteren Herrn mit grauem Hut, der eine Zeitung las. Sie war müde, denn sie hatte die ganze Nacht für ihre Prüfung gelernt.

Kurz nach Nürnberg kam der Schaffner. „Die Fahrkarten, bitte!“ Marie suchte in ihrer Tasche, dann in ihrer Jacke, dann wieder in der Tasche. Die Fahrkarte war weg. Ihr wurde heiß. Ohne Fahrkarte musste sie eine Strafe zahlen, und sie hatte kaum Geld dabei.

„Haben Sie die Fahrkarte vielleicht auf dem Handy?“, fragte der Schaffner freundlich. Marie schüttelte den Kopf. Sie hatte sie am Automaten gekauft, das wusste sie genau.

Da faltete der ältere Herr langsam seine Zeitung zusammen. „Entschuldigung“, sagte er, „ist das vielleicht Ihre?“ Er hob ein kleines Stück Papier vom Boden auf. Es war die Fahrkarte. Sie war wohl beim Einsteigen aus der Jackentasche gefallen.

Marie bedankte sich mehrmals. Der Mann lächelte nur. „Wissen Sie“, sagte er, „vor fünfzig Jahren ist mir genau das Gleiche passiert. Damals hat mir auch jemand geholfen.“ Dann las er weiter seine Zeitung.`,
    questions: [
      tf('Marie war müde, weil sie für eine Prüfung gelernt hatte.', true, '„denn sie hatte die ganze Nacht für ihre Prüfung gelernt“.'),
      mc('Wo hatte Marie die Fahrkarte gekauft?', ['am Automaten', 'im Internet', 'beim Schaffner', 'auf dem Handy'], '„Sie hatte sie am Automaten gekauft.“'),
      mc('Wo war die Fahrkarte?', ['auf dem Boden', 'in der Zeitung', 'im Hut des Mannes', 'in Maries Tasche'], 'The man picked it up from the floor: „Er hob ein kleines Stück Papier vom Boden auf.“'),
      tf('Der Schaffner war unfreundlich zu Marie.', false, 'He asked „freundlich“ whether she had the ticket on her phone.'),
      mc('Was erzählt der Mann am Ende?', ['Ihm ist früher dasselbe passiert.', 'Er ist auch Schaffner.', 'Er kennt Marie schon lange.', 'Er möchte Geld von ihr.'], '„vor fünfzig Jahren ist mir genau das Gleiche passiert“.'),
    ],
  },
  {
    id: 'b1-sportverein',
    level: 'B1',
    title: 'Der Sportverein – typisch deutsch?',
    genre: 'Article',
    topics: ['sport', 'society'],
    text: `Wer in Deutschland Sport treiben möchte, geht oft in einen Verein. Es gibt rund 87.000 Sportvereine mit mehr als 27 Millionen Mitgliedschaften. Der größte Verband ist der Deutsche Fußball-Bund mit über sieben Millionen Mitgliedern.

Vereine bieten nicht nur Fußball, sondern auch Turnen, Schwimmen, Tennis, Tischtennis oder Leichtathletik an. Der Mitgliedsbeitrag ist meistens günstig, weil viele Trainer ehrenamtlich arbeiten. Für Kinder kostet ein Jahr oft weniger als 100 Euro.

Für viele Menschen ist der Verein mehr als nur ein Ort für Sport. Nach dem Training sitzt man gern noch zusammen, im Sommer gibt es ein Vereinsfest, und manche Freundschaften halten ein Leben lang. Besonders auf dem Land ist der Sportverein ein wichtiger Treffpunkt für das ganze Dorf.

Allerdings haben viele Vereine Probleme. Es fehlen Menschen, die ehrenamtlich Aufgaben übernehmen, zum Beispiel als Trainer oder im Vorstand. Gleichzeitig trainieren immer mehr junge Erwachsene lieber allein im Fitnessstudio oder mit einer App, weil das flexibler ist. Die Vereine versuchen deshalb, mit neuen Angeboten wie Yoga, Lauftreffs oder Kursen ohne feste Mitgliedschaft attraktiv zu bleiben.`,
    questions: [
      tf('Der Deutsche Fußball-Bund hat mehr als sieben Millionen Mitglieder.', true, '„mit über sieben Millionen Mitgliedern“.'),
      mc('Warum ist der Mitgliedsbeitrag oft günstig?', ['Weil viele Trainer ehrenamtlich arbeiten.', 'Weil der Staat alles bezahlt.', 'Weil es nur wenige Mitglieder gibt.', 'Weil die Vereine kein Training anbieten.'], '„weil viele Trainer ehrenamtlich arbeiten“ — they are unpaid volunteers.'),
      mc('Welche Rolle spielt der Verein besonders auf dem Land?', ['Er ist ein wichtiger Treffpunkt für das Dorf.', 'Er ist der größte Arbeitgeber.', 'Er ersetzt die Schule.', 'Er organisiert nur Fußballspiele.'], '„ein wichtiger Treffpunkt für das ganze Dorf“.'),
      tf('Junge Erwachsene trainieren immer häufiger im Verein.', false, 'More and more prefer the gym or an app because it is more flexible.'),
      mc('Wie reagieren die Vereine auf die Probleme?', ['Sie bieten neue Kurse wie Yoga und Lauftreffs an.', 'Sie erhöhen die Beiträge stark.', 'Sie schließen ihre Sportplätze.', 'Sie verbieten Fitness-Apps.'], '„mit neuen Angeboten wie Yoga, Lauftreffs oder Kursen ohne feste Mitgliedschaft“.'),
    ],
  },
  {
    id: 'b1-handy-schule',
    level: 'B1',
    title: 'Das Handy im Klassenzimmer',
    genre: 'Opinions',
    topics: ['tech', 'society', 'people'],
    text: `Sollen Handys in der Schule verboten werden? Über diese Frage wird in Deutschland seit Jahren diskutiert. Einige Bundesländer haben die private Nutzung von Smartphones an Schulen inzwischen stark eingeschränkt. Wir haben drei Personen nach ihrer Meinung gefragt.

Jana, 16, Schülerin: „Ein komplettes Verbot finde ich übertrieben. Wir benutzen das Handy auch im Unterricht, zum Beispiel für Recherchen oder Vokabel-Apps. Aber ich gebe zu: In den Pausen schauen viele nur noch auf ihr Display und reden kaum miteinander.“

Herr Lorenz, 52, Mathematiklehrer: „Ich bin für klare Regeln. Wenn ein Handy im Unterricht vibriert, sind sofort alle abgelenkt. Bei uns müssen die Schüler ihre Handys deshalb vor dem Unterricht in eine Box legen. Seitdem ist es im Klassenzimmer viel ruhiger, und die Konzentration ist besser geworden.“

Frau Akın, 41, Mutter von zwei Kindern: „Mir ist wichtig, dass meine Kinder mich nach der Schule erreichen können. Deshalb sollen sie ein Handy dabeihaben. Aber während des Unterrichts brauchen sie es wirklich nicht. Außerdem sollten Schulen den Kindern beibringen, wie man verantwortungsvoll mit dem Internet umgeht – das ist genauso wichtig wie Mathe oder Deutsch.“`,
    questions: [
      mc('Was denkt Jana über ein komplettes Handyverbot?', ['Sie findet es übertrieben.', 'Sie findet es sehr gut.', 'Es ist ihr egal.', 'Sie möchte es sofort.'], '„Ein komplettes Verbot finde ich übertrieben.“'),
      tf('Die Schüler von Herrn Lorenz legen ihre Handys vor dem Unterricht in eine Box.', true, '„müssen die Schüler ihre Handys … vor dem Unterricht in eine Box legen“.'),
      mc('Was hat sich laut Herrn Lorenz verbessert?', ['die Konzentration im Unterricht', 'die Noten in Deutsch', 'die Pausen', 'die Recherchen im Internet'], '„die Konzentration ist besser geworden“.'),
      mc('Warum sollen Frau Akıns Kinder ein Handy dabeihaben?', ['Damit sie sie nach der Schule erreichen kann.', 'Damit sie im Unterricht recherchieren können.', 'Damit sie in den Pausen spielen können.', 'Weil die Schule es verlangt.'], '„dass meine Kinder mich nach der Schule erreichen können“.'),
      tf('Frau Akın findet, dass die Schule den Umgang mit dem Internet lehren sollte.', true, '„Außerdem sollten Schulen den Kindern beibringen, wie man verantwortungsvoll mit dem Internet umgeht“.'),
    ],
  },

  // ───────────── B2 ─────────────
  {
    id: 'b2-vier-tage-woche',
    level: 'B2',
    title: 'Die Vier-Tage-Woche: mehr Freizeit, gleiche Leistung?',
    genre: 'Feature article',
    topics: ['work', 'economy'],
    text: `Vier Tage arbeiten, drei Tage frei – und das bei vollem Lohn. Was vor einigen Jahren noch wie eine Utopie klang, wird inzwischen von zahlreichen Unternehmen ausprobiert. In Deutschland sorgte 2024 ein Pilotprojekt mit rund 45 Firmen für Aufsehen: Die Beschäftigten arbeiteten ein halbes Jahr lang weniger, sollten aber genauso viel leisten wie vorher.

Die Ergebnisse fielen überwiegend positiv aus. Viele Teilnehmende berichteten, sie seien weniger gestresst und schliefen besser. Die meisten Unternehmen gaben an, dass die Produktivität nicht gesunken sei; ein großer Teil wollte das Modell anschließend weiterführen. Möglich wurde das vor allem durch effizientere Abläufe: kürzere Meetings, weniger Unterbrechungen und klarere Prioritäten.

Kritiker geben allerdings zu bedenken, dass sich solche Erfahrungen nicht ohne Weiteres auf alle Branchen übertragen lassen. In der Pflege, im Einzelhandel oder in Handwerksbetrieben, wo ohnehin Personal fehlt, sei eine kürzere Arbeitszeit kaum umsetzbar. Wer im Krankenhaus einen Tag weniger arbeitet, hinterlässt eine Lücke, die jemand anderes füllen muss. Arbeitgeberverbände warnen zudem, dass Deutschland angesichts des Fachkräftemangels eher mehr als weniger Arbeitsstunden brauche.

Befürworter halten dagegen, dass gerade die Vier-Tage-Woche helfen könnte, Fachkräfte zu gewinnen. Junge Menschen legten zunehmend Wert auf Freizeit und eine gute Work-Life-Balance; ein Arbeitgeber, der kürzere Arbeitszeiten anbiete, habe im Wettbewerb um Talente einen klaren Vorteil.

Ob sich das Modell langfristig durchsetzt, ist offen. Fest steht: Die Diskussion darüber, wie wir in Zukunft arbeiten wollen, hat gerade erst begonnen.`,
    questions: [
      mc('Worum ging es im Pilotprojekt von 2024?', ['Beschäftigte arbeiteten weniger bei gleichem Lohn.', 'Beschäftigte arbeiteten mehr und verdienten mehr.', 'Firmen testeten neue Software.', 'Firmen entließen Mitarbeitende.'], 'Less working time, full pay, the same output.'),
      tf('Laut den meisten Unternehmen ist die Produktivität deutlich gesunken.', false, '„dass die Produktivität nicht gesunken sei“ (reported speech).'),
      mc('Wodurch wurde das Modell vor allem möglich?', ['durch effizientere Abläufe', 'durch zusätzliche Mitarbeiter', 'durch längere Arbeitstage', 'durch staatliche Förderung'], 'Shorter meetings, fewer interruptions, clearer priorities.'),
      mc('Welches Argument bringen die Kritiker?', ['In Branchen mit Personalmangel ist das Modell kaum umsetzbar.', 'Die Beschäftigten werden unglücklicher.', 'Meetings werden zu kurz.', 'Junge Menschen wollen mehr arbeiten.'], 'Care, retail and crafts already lack staff — someone has to fill the gap.'),
      tf('Befürworter glauben, dass die Vier-Tage-Woche bei der Suche nach Fachkräften hilft.', true, 'Employers offering shorter hours have an advantage in the competition for talent.'),
      mc('Was bedeutet „zu bedenken geben“?', ['auf ein Problem hinweisen', 'etwas schenken', 'etwas vergessen', 'jemandem zustimmen'], 'etwas zu bedenken geben = to point out a concern.'),
    ],
  },
  {
    id: 'b2-raus-aufs-land',
    level: 'B2',
    title: 'Raus aufs Land?',
    genre: 'Feature article',
    topics: ['society', 'nature'],
    text: `Lange Zeit galt: Wer jung ist und Karriere machen will, zieht in die Stadt. Doch dieser Trend hat sich in den letzten Jahren abgeschwächt. Immer mehr Menschen – vor allem Familien – verlassen die Großstädte und ziehen in kleinere Orte oder aufs Land.

Die Gründe liegen auf der Hand. In Städten wie München, Hamburg oder Frankfurt sind die Mieten so stark gestiegen, dass sich viele Normalverdiener keine größere Wohnung mehr leisten können. Auf dem Land bekommt man für dasselbe Geld oft ein Haus mit Garten. Hinzu kommt, dass viele Beschäftigte dank Homeoffice nicht mehr jeden Tag ins Büro pendeln müssen. Die Entfernung zum Arbeitsplatz spielt daher eine geringere Rolle als früher.

Doch das Landleben hat auch seine Schattenseiten. Wer kein Auto hat, ist oft aufgeschmissen: Busse fahren in manchen Dörfern nur zweimal am Tag, und der nächste Supermarkt ist mehrere Kilometer entfernt. Auch die medizinische Versorgung ist ein Problem, denn viele Landärzte finden keinen Nachfolger. Und nicht überall ist das Internet schnell genug, um problemlos von zu Hause aus zu arbeiten.

„Viele unterschätzen, wie anders das Leben auf dem Land ist“, sagt eine Soziologin, die zu diesem Thema forscht. „Man muss sich auf die Dorfgemeinschaft einlassen – im Sportverein, bei der Feuerwehr oder beim Dorffest. Wer das tut, wird schnell aufgenommen. Wer dagegen nur zum Schlafen da ist, bleibt fremd.“

Für die Gemeinden ist der Zuzug eine Chance: Schulen und Geschäfte, die vor einigen Jahren noch von der Schließung bedroht waren, bekommen neue Kundschaft. Damit die Neuankömmlinge bleiben, investieren viele Orte nun in Kitas, schnelles Internet und Carsharing.`,
    questions: [
      mc('Warum ziehen viele Familien aufs Land?', ['wegen der hohen Mieten in den Städten', 'weil es auf dem Land mehr Jobs gibt', 'weil Busse auf dem Land häufiger fahren', 'weil Städte zu klein sind'], 'Rents in big cities have risen so much that many can’t afford a larger flat.'),
      tf('Durch das Homeoffice ist die Entfernung zum Arbeitsplatz weniger wichtig geworden.', true, '„Die Entfernung zum Arbeitsplatz spielt daher eine geringere Rolle als früher.“'),
      mc('Was bedeutet „aufgeschmissen sein“?', ['in einer schwierigen Lage sein, ohne Hilfe', 'sehr glücklich sein', 'viel Geld haben', 'schnell umziehen'], 'Colloquial: to be stuck, helpless.'),
      mc('Was rät die Soziologin?', ['sich aktiv an der Dorfgemeinschaft zu beteiligen', 'nur zum Schlafen aufs Land zu ziehen', 'in der Stadt zu bleiben', 'ein zweites Auto zu kaufen'], '„Man muss sich auf die Dorfgemeinschaft einlassen“.'),
      tf('Für die Gemeinden bringt der Zuzug nur Probleme.', false, '„Für die Gemeinden ist der Zuzug eine Chance“.'),
    ],
  },
  {
    id: 'b2-ki-im-alltag',
    level: 'B2',
    title: 'Künstliche Intelligenz im Alltag',
    genre: 'Article',
    topics: ['tech', 'work', 'society'],
    text: `Ob beim Übersetzen eines Textes, bei der Routenplanung oder bei Empfehlungen auf Streaming-Plattformen – künstliche Intelligenz ist längst Teil unseres Alltags, oft ohne dass wir es bemerken. Seit Sprachmodelle frei zugänglich sind, nutzen Millionen Menschen sie außerdem, um E-Mails zu formulieren, Fragen zu stellen oder sich Dinge erklären zu lassen.

Die Vorteile sind offensichtlich: Viele Aufgaben, für die man früher Stunden gebraucht hätte, lassen sich heute in wenigen Minuten erledigen. Menschen mit Behinderungen profitieren von Programmen, die Texte vorlesen oder Bilder beschreiben. Und in der Medizin können Systeme helfen, Krankheiten auf Röntgenbildern früher zu erkennen.

Gleichzeitig wachsen die Bedenken. Sprachmodelle klingen oft sehr überzeugend, liefern aber manchmal falsche Informationen. Wer die Antworten ungeprüft übernimmt, kann sich schnell blamieren – oder Schlimmeres. Hinzu kommen Fragen des Datenschutzes: Was geschieht mit den Daten, die wir eingeben? Und wer haftet, wenn eine KI einen Fehler macht?

Auch der Arbeitsmarkt wird sich verändern. Experten gehen davon aus, dass vor allem Routinetätigkeiten automatisiert werden, etwa in der Verwaltung oder im Kundenservice. Gleichzeitig entstehen neue Berufe, und in vielen Jobs wird KI eher ein Werkzeug als ein Ersatz sein.

Entscheidend wird sein, wie gut wir lernen, mit dieser Technik umzugehen. Medienkompetenz – also die Fähigkeit, Informationen kritisch zu prüfen – dürfte in Zukunft wichtiger denn je sein. Denn eines kann uns keine Maschine abnehmen: die Verantwortung für das, was wir glauben und weitergeben.`,
    questions: [
      tf('Viele Menschen nutzen KI, ohne es zu bemerken.', true, '„oft ohne dass wir es bemerken“.'),
      mc('Welchen Vorteil nennt der Text für Menschen mit Behinderungen?', ['Programme lesen Texte vor oder beschreiben Bilder.', 'Sie bekommen schneller einen Job.', 'Sie brauchen keinen Arzt mehr.', 'Sie können kostenlos reisen.'], '„Programmen, die Texte vorlesen oder Bilder beschreiben“.'),
      mc('Was ist ein Problem von Sprachmodellen?', ['Sie liefern manchmal falsche Informationen, die überzeugend klingen.', 'Sie sind zu langsam.', 'Sie sind nur auf Englisch verfügbar.', 'Sie können keine E-Mails schreiben.'], '„klingen oft sehr überzeugend, liefern aber manchmal falsche Informationen“.'),
      tf('Experten erwarten, dass alle Berufe durch KI verschwinden.', false, 'Mainly routine tasks will be automated; new jobs appear, and AI is often a tool rather than a replacement.'),
      mc('Was wird laut Text in Zukunft besonders wichtig?', ['Medienkompetenz', 'Programmierkenntnisse für alle', 'weniger Datenschutz', 'mehr Routinetätigkeiten'], '„Medienkompetenz … dürfte in Zukunft wichtiger denn je sein“.'),
    ],
  },
  {
    id: 'b2-fast-fashion',
    level: 'B2',
    title: 'Die wahren Kosten der Mode',
    genre: 'Article',
    topics: ['economy', 'nature', 'society'],
    text: `Ein T-Shirt für fünf Euro, eine Jeans für zwanzig – Kleidung war noch nie so billig wie heute. Große Modeketten bringen inzwischen nicht mehr zwei, sondern teilweise über zwanzig Kollektionen pro Jahr heraus. Die Folge: Die Deutschen kaufen im Durchschnitt rund 60 neue Kleidungsstücke im Jahr, tragen viele davon aber nur wenige Male.

Der niedrige Preis hat allerdings einen hohen Preis – nur zahlen ihn andere. Ein Großteil der Kleidung wird in Ländern wie Bangladesch, Kambodscha oder Vietnam produziert, wo die Löhne niedrig und die Arbeitsbedingungen oft schlecht sind. Spätestens seit dem Einsturz der Fabrik Rana Plaza im Jahr 2013, bei dem über 1.100 Menschen ums Leben kamen, ist das Thema in der Öffentlichkeit angekommen.

Auch die Umwelt leidet. Für die Herstellung einer einzigen Jeans werden mehrere Tausend Liter Wasser benötigt, vor allem für den Anbau der Baumwolle. Beim Färben gelangen Chemikalien in Flüsse, und Kleidung aus Polyester gibt bei jeder Wäsche Mikroplastik ab.

Was kann man als Verbraucher tun? Fachleute raten vor allem dazu, weniger und bewusster zu kaufen. Secondhand-Läden, Kleidertauschpartys und Reparaturen verlängern die Lebensdauer von Kleidung. Siegel wie der „Grüne Knopf“ oder GOTS können bei der Orientierung helfen, auch wenn kein Siegel perfekt ist.

Inzwischen reagiert auch die Politik: Die EU will Hersteller stärker in die Pflicht nehmen, etwa durch Vorgaben zur Haltbarkeit und Recyclingfähigkeit von Textilien. Ob das reicht, um die Wegwerfmode zu bremsen, bleibt abzuwarten.`,
    questions: [
      mc('Wie viele Kollektionen bringen manche Modeketten pro Jahr heraus?', ['über zwanzig', 'zwei', 'sechzig', 'fünf'], '„teilweise über zwanzig Kollektionen pro Jahr“.'),
      tf('Die Deutschen tragen ihre neuen Kleidungsstücke meistens sehr oft.', false, 'Many pieces are worn only a few times.'),
      mc('Was geschah 2013 bei Rana Plaza?', ['Eine Fabrik stürzte ein; über 1.100 Menschen starben.', 'Eine neue Modekette wurde gegründet.', 'Die EU beschloss neue Gesetze.', 'Die Arbeiter bekamen höhere Löhne.'], 'The factory collapse killed more than 1,100 people.'),
      mc('Wofür wird bei einer Jeans vor allem Wasser gebraucht?', ['für den Anbau der Baumwolle', 'für das Waschen im Laden', 'für den Transport', 'für das Mikroplastik'], '„vor allem für den Anbau der Baumwolle“.'),
      tf('Laut Text sind Siegel wie GOTS eine perfekte Lösung.', false, '„auch wenn kein Siegel perfekt ist“.'),
      mc('Was bedeutet „jemanden in die Pflicht nehmen“?', ['jemanden für etwas verantwortlich machen', 'jemanden einstellen', 'jemanden bezahlen', 'jemanden einladen'], 'To hold someone responsible / make them meet obligations.'),
    ],
  },
  {
    id: 'b2-mauerfall',
    level: 'B2',
    title: 'Die Nacht, in der die Mauer fiel',
    genre: 'Eyewitness account',
    topics: ['history', 'society'],
    text: `Am Abend des 9. November 1989 saß Petra, damals 24, mit Freunden in ihrer Wohnung in Ost-Berlin vor dem Fernseher. Auf einer Pressekonferenz verlas der SED-Funktionär Günter Schabowski eine neue Reiseregelung. Auf die Frage, ab wann sie gelte, antwortete er nach kurzem Zögern: „Das tritt nach meiner Kenntnis … ist das sofort, unverzüglich.“

„Wir haben das zuerst gar nicht geglaubt“, erinnert sich Petra. „Wir dachten, das sei ein Missverständnis.“ Trotzdem machten sich die Freunde gegen elf Uhr auf den Weg zum Grenzübergang Bornholmer Straße. Dort hatten sich bereits Tausende Menschen versammelt. Die Grenzsoldaten waren völlig überfordert; niemand hatte ihnen Anweisungen gegeben.

Gegen halb zwölf ließ der verantwortliche Offizier schließlich den Schlagbaum öffnen, weil er die Lage nicht mehr unter Kontrolle hatte. „Plötzlich standen wir im Westen“, erzählt Petra. „Wildfremde Menschen lagen sich in den Armen, viele weinten. Jemand hat mir eine Flasche Sekt in die Hand gedrückt. Ich habe nicht einmal gemerkt, dass es eiskalt war.“

In den folgenden Tagen besuchten Millionen DDR-Bürger West-Berlin und die Bundesrepublik. Jeder bekam 100 D-Mark „Begrüßungsgeld“. Weniger als ein Jahr später, am 3. Oktober 1990, war Deutschland wiedervereinigt.

Heute erinnert ein Platz an der Bornholmer Straße an jene Nacht. „Wenn ich dort vorbeifahre“, sagt Petra, „bekomme ich immer noch Gänsehaut. Für mich war das der Moment, in dem mein zweites Leben begann.“`,
    questions: [
      mc('Was verkündete Schabowski auf der Pressekonferenz?', ['eine neue Reiseregelung, die sofort gelten sollte', 'das Ende der DDR', 'den Bau einer neuen Mauer', 'die Wiedervereinigung'], 'A new travel regulation — valid „sofort, unverzüglich“.'),
      tf('Petra und ihre Freunde glaubten die Nachricht sofort.', false, '„Wir haben das zuerst gar nicht geglaubt.“'),
      mc('Warum wurde der Schlagbaum geöffnet?', ['Der Offizier hatte die Lage nicht mehr unter Kontrolle.', 'Der Offizier hatte einen Befehl bekommen.', 'Petra hatte darum gebeten.', 'Es war Mitternacht.'], 'Nobody had given the guards instructions, and the crowd grew too large.'),
      tf('DDR-Bürger bekamen im Westen 100 D-Mark Begrüßungsgeld.', true, '„Jeder bekam 100 D-Mark Begrüßungsgeld.“'),
      mc('Wann wurde Deutschland wiedervereinigt?', ['am 3. Oktober 1990', 'am 9. November 1989', 'am 1. Januar 1990', 'im Dezember 1989'], 'Less than a year later, on 3 October 1990.'),
      mc('Was bedeutet „Gänsehaut bekommen“ hier?', ['eine starke Emotion spüren', 'krank werden', 'frieren, weil es kalt ist', 'Angst vor Tieren haben'], 'Goosebumps here come from emotion, not cold.'),
    ],
  },
  {
    id: 'b2-schlaf',
    level: 'B2',
    title: 'Warum wir Schlaf brauchen',
    genre: 'Science article',
    topics: ['health', 'science'],
    text: `Rund ein Drittel unseres Lebens verbringen wir im Schlaf. Lange hielt man diese Zeit für eine Art Pause, in der der Körper einfach abschaltet. Heute weiß man: Im Schlaf ist das Gehirn äußerst aktiv.

Während wir schlafen, verarbeitet das Gehirn die Eindrücke des Tages. Neue Informationen werden sortiert und im Langzeitgedächtnis gespeichert. Wer nach dem Lernen ausreichend schläft, kann sich deshalb nachweislich besser an das Gelernte erinnern. Außerdem werden im Schlaf Abfallstoffe aus dem Gehirn abtransportiert, die sich tagsüber angesammelt haben.

Wie viel Schlaf ein Mensch braucht, ist individuell verschieden. Für Erwachsene empfehlen Fachleute in der Regel sieben bis neun Stunden pro Nacht. Viele erreichen diesen Wert allerdings nicht: Umfragen zufolge schläft etwa jeder dritte Erwachsene in Deutschland regelmäßig zu wenig. Die Folgen reichen von Konzentrationsproblemen und Gereiztheit bis zu einem erhöhten Risiko für Übergewicht, Bluthochdruck und Depressionen.

Ein häufiger Grund für schlechten Schlaf ist das Smartphone. Das blaue Licht der Bildschirme kann die Ausschüttung des Schlafhormons Melatonin verzögern; noch wichtiger ist aber wohl, dass Nachrichten und soziale Medien das Gehirn wach halten. Schlafforscher raten daher, eine Stunde vor dem Zubettgehen auf Bildschirme zu verzichten.

Weitere Tipps: regelmäßige Schlafenszeiten, auch am Wochenende, ein kühles und dunkles Schlafzimmer sowie kein Kaffee am Nachmittag. Und wer nachts wach liegt, sollte lieber kurz aufstehen und etwas Ruhiges tun, statt sich im Bett hin und her zu wälzen.`,
    questions: [
      tf('Im Schlaf ist das Gehirn kaum aktiv.', false, '„Im Schlaf ist das Gehirn äußerst aktiv.“'),
      mc('Was passiert im Schlaf mit neuen Informationen?', ['Sie werden im Langzeitgedächtnis gespeichert.', 'Sie werden gelöscht.', 'Sie werden in Melatonin umgewandelt.', 'Sie bleiben im Kurzzeitgedächtnis.'], '„Neue Informationen werden sortiert und im Langzeitgedächtnis gespeichert.“'),
      mc('Wie viele Stunden Schlaf empfehlen Fachleute Erwachsenen?', ['sieben bis neun', 'fünf bis sechs', 'zehn bis zwölf', 'genau acht'], '„in der Regel sieben bis neun Stunden pro Nacht“.'),
      tf('Laut Text ist beim Smartphone vor allem das blaue Licht das Problem.', false, '„noch wichtiger ist aber wohl, dass Nachrichten und soziale Medien das Gehirn wach halten“.'),
      mc('Was soll man tun, wenn man nachts wach liegt?', ['kurz aufstehen und etwas Ruhiges tun', 'im Bett bleiben und sich hin und her wälzen', 'einen Kaffee trinken', 'aufs Handy schauen'], '„sollte lieber kurz aufstehen und etwas Ruhiges tun“.'),
    ],
  },
];
