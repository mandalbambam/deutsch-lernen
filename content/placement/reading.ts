import { passage, q, type Passage } from './types';

/** Placement test: reading passages with questions, A1–C2. Correct option first. */
export const READING: Passage[] = [
  // ───────────── A1 ─────────────
  passage('reading', 'A1', 1, 'Notiz', {
    text: 'Hallo Tom, ich bin im Supermarkt. Wir haben keine Milch und kein Brot mehr. Ich kaufe auch Äpfel. Ich bin um 18 Uhr zu Hause. Bis später! Lisa',
  }, [
    q('detail', 'Wo ist Lisa?', ['Im Supermarkt', 'Zu Hause', 'In der Schule', 'Im Café'], '„ich bin im Supermarkt“'),
    q('detail', 'Was kauft Lisa NICHT?', ['Käse', 'Milch', 'Brot', 'Äpfel'], 'She buys milk, bread and apples – cheese is not mentioned.'),
    q('detail', 'Wann ist Lisa zu Hause?', ['Um 18 Uhr', 'Um 8 Uhr', 'Um 16 Uhr', 'Um 20 Uhr'], '„Ich bin um 18 Uhr zu Hause.“'),
  ]),
  passage('reading', 'A1', 2, 'Anzeige', {
    text: 'Wohnung zu vermieten! 2 Zimmer, Küche, Bad, Balkon. 55 m², 3. Stock, kein Aufzug. Miete: 650 € warm. Nur für Nichtraucher. Telefon: 0171 2345678 (ab 17 Uhr).',
  }, [
    q('detail', 'Wie viele Zimmer hat die Wohnung?', ['Zwei', 'Drei', 'Fünf', 'Eins'], '„2 Zimmer“'),
    q('detail', 'Was gibt es NICHT?', ['Einen Aufzug', 'Einen Balkon', 'Eine Küche', 'Ein Bad'], '„kein Aufzug“ = no lift.'),
    q('detail', 'Wann kann man anrufen?', ['Ab 17 Uhr', 'Vor 17 Uhr', 'Um 3 Uhr', 'Nur am Wochenende'], '„ab 17 Uhr“ = from 5 pm.'),
  ]),
  passage('reading', 'A1', 3, 'Vorstellung', {
    text: 'Ich heiße Mehmet und komme aus der Türkei. Ich wohne seit einem Jahr in Hamburg. Ich bin Koch und arbeite in einem Restaurant. In meiner Freizeit spiele ich Fußball und lerne Deutsch. Ich habe eine Schwester. Sie wohnt in Istanbul.',
  }, [
    q('detail', 'Was ist Mehmet von Beruf?', ['Koch', 'Kellner', 'Lehrer', 'Fußballspieler'], '„Ich bin Koch“ = I am a cook.'),
    q('detail', 'Wo wohnt seine Schwester?', ['In Istanbul', 'In Hamburg', 'In Berlin', 'Im Restaurant'], '„Sie wohnt in Istanbul.“'),
    q('detail', 'Seit wann wohnt Mehmet in Hamburg?', ['Seit einem Jahr', 'Seit zwei Jahren', 'Seit einem Monat', 'Seit zehn Jahren'], '„seit einem Jahr“'),
  ]),
  passage('reading', 'A1', 4, 'Information der Sprachschule', {
    text: 'Liebe Kursteilnehmerinnen und Kursteilnehmer, am Montag, dem 3. März, ist kein Unterricht. Die Lehrerin ist krank. Am Mittwoch ist der Kurs wie immer um 10 Uhr. Bitte bringen Sie Ihr Buch mit. Ihre Sprachschule',
  }, [
    q('gist', 'Warum gibt es am Montag keinen Unterricht?', ['Die Lehrerin ist krank.', 'Es ist ein Feiertag.', 'Die Schule ist geschlossen.', 'Die Teilnehmer haben Urlaub.'], '„Die Lehrerin ist krank.“'),
    q('detail', 'Wann ist der nächste Kurs?', ['Am Mittwoch um 10 Uhr', 'Am Montag um 10 Uhr', 'Am Mittwoch um 3 Uhr', 'Am Donnerstag um 10 Uhr'], '„Am Mittwoch ist der Kurs wie immer um 10 Uhr.“'),
    q('detail', 'Was sollen die Teilnehmer mitbringen?', ['Ihr Buch', 'Einen Stift', 'Etwas zu essen', 'Nichts'], '„Bitte bringen Sie Ihr Buch mit.“'),
  ]),
  passage('reading', 'A1', 5, 'SMS', {
    text: 'Hi Paul! Das Wetter ist heute so schön. Gehen wir am Nachmittag in den Park? Ich kann um 15 Uhr. Ich bringe Kuchen mit, und du bringst Getränke, okay? Antworte bitte schnell! Sara',
  }, [
    q('gist', 'Was möchte Sara machen?', ['In den Park gehen', 'Einen Kuchen backen', 'Einkaufen gehen', 'Zu Hause bleiben'], '„Gehen wir am Nachmittag in den Park?“'),
    q('detail', 'Was soll Paul mitbringen?', ['Getränke', 'Kuchen', 'Obst', 'Nichts'], '„du bringst Getränke“'),
    q('detail', 'Wann möchte Sara gehen?', ['Um 15 Uhr', 'Um 5 Uhr', 'Am Abend', 'Morgen'], '„Ich kann um 15 Uhr.“'),
  ]),
  passage('reading', 'A1', 6, 'Aushang im Café', {
    text: 'Café Sonne – Frühstück von Montag bis Freitag, 7 bis 11 Uhr. Kaffee 2,50 €, Tee 2,00 €, Brötchen mit Käse 3,50 €. Am Samstag und Sonntag: großes Frühstücksbuffet für 12 € (8 bis 13 Uhr).',
  }, [
    q('detail', 'Wie viel kostet ein Tee?', ['2,00 €', '2,50 €', '3,50 €', '12 €'], '„Tee 2,00 €“'),
    q('detail', 'Wann gibt es das Buffet?', ['Am Wochenende', 'Jeden Tag', 'Von Montag bis Freitag', 'Nur am Sonntag'], 'Saturday and Sunday = das Wochenende.'),
  ]),

  // ───────────── A2 ─────────────
  passage('reading', 'A2', 1, 'E-Mail', {
    text: 'Liebe Frau Weber, leider kann ich morgen nicht zum Termin um 9 Uhr kommen, weil mein Sohn krank ist und ich bei ihm bleiben muss. Kann ich vielleicht nächste Woche kommen? Am besten passt mir Dienstag oder Donnerstag am Nachmittag. Vielen Dank und freundliche Grüße, Thomas Krüger',
  }, [
    q('gist', 'Warum schreibt Herr Krüger?', ['Er möchte einen Termin verschieben.', 'Er möchte nie wieder kommen.', 'Er ist selbst krank.', 'Er möchte Frau Weber einladen.'], 'He cannot come tomorrow and asks for a new date next week.'),
    q('detail', 'Warum kann er morgen nicht kommen?', ['Sein Sohn ist krank.', 'Er ist krank.', 'Er muss arbeiten.', 'Er hat den Termin vergessen.'], '„weil mein Sohn krank ist“'),
    q('detail', 'Wann möchte er kommen?', ['Dienstag oder Donnerstag nachmittags', 'Morgen um 9 Uhr', 'Nächsten Montag', 'Am Wochenende'], '„Am besten passt mir Dienstag oder Donnerstag am Nachmittag.“'),
  ]),
  passage('reading', 'A2', 2, 'Zeitungsartikel', {
    text: 'Immer mehr Menschen in Deutschland fahren mit dem Fahrrad zur Arbeit. Das ist gesund und billig. In vielen Städten gibt es jetzt mehr Radwege. Aber es gibt auch Probleme: Im Winter ist es oft kalt und nass, und viele Radfahrer haben Angst vor den Autos. Die Stadt München möchte deshalb bis 2030 noch 100 Kilometer neue Radwege bauen.',
  }, [
    q('detail', 'Warum fahren viele Menschen mit dem Fahrrad?', ['Es ist gesund und billig.', 'Es gibt keine Busse.', 'Autos sind verboten.', 'Es ist im Winter angenehm.'], '„Das ist gesund und billig.“'),
    q('detail', 'Welches Problem nennt der Text?', ['Viele Radfahrer haben Angst vor Autos.', 'Fahrräder sind sehr teuer.', 'Es gibt gar keine Radwege.', 'Radfahren ist ungesund.'], '„viele Radfahrer haben Angst vor den Autos“'),
    q('detail', 'Was plant München?', ['Neue Radwege bauen', 'Autos verbieten', 'Fahrräder verkaufen', 'Busse kostenlos machen'], '„100 Kilometer neue Radwege bauen“'),
  ]),
  passage('reading', 'A2', 3, 'Stellenanzeige', {
    text: 'Wir suchen ab sofort eine freundliche Aushilfe (m/w/d) für unsere Bäckerei. Arbeitszeit: Samstag und Sonntag, 6 bis 12 Uhr. Sie brauchen keine Erfahrung, aber Sie sollten gut Deutsch sprechen. Interesse? Kommen Sie einfach vorbei oder rufen Sie uns an: 030 445566. Bäckerei Krause',
  }, [
    q('detail', 'Wann arbeitet die Aushilfe?', ['Am Wochenende vormittags', 'Jeden Tag', 'Von Montag bis Freitag', 'Am Abend'], 'Saturday and Sunday, 6–12 h.'),
    q('detail', 'Was ist für die Stelle wichtig?', ['Gute Deutschkenntnisse', 'Viel Erfahrung', 'Ein Führerschein', 'Ein Studium'], '„Sie sollten gut Deutsch sprechen.“'),
    q('detail', 'Wie kann man sich bewerben?', ['Persönlich oder per Telefon', 'Nur per E-Mail', 'Nur schriftlich mit Lebenslauf', 'Über eine Website'], '„Kommen Sie einfach vorbei oder rufen Sie uns an.“'),
  ]),
  passage('reading', 'A2', 4, 'Erzählung', {
    text: 'Letzten Samstag wollte Jana mit ihrer Freundin ins Kino gehen. Sie hatten die Karten schon online gekauft. Aber Jana hat den Bus verpasst und ist zu spät gekommen. Der Film hatte schon angefangen. Zum Glück durften sie trotzdem noch hinein. Nach dem Film haben sie zusammen Pizza gegessen.',
  }, [
    q('detail', 'Warum ist Jana zu spät gekommen?', ['Sie hat den Bus verpasst.', 'Sie hatte keine Karten.', 'Ihre Freundin war krank.', 'Sie hat das Kino nicht gefunden.'], '„Jana hat den Bus verpasst“'),
    q('inference', 'Was ist richtig?', ['Sie konnten den Film noch sehen.', 'Sie haben den Film nicht gesehen.', 'Sie haben die Karten an der Kasse gekauft.', 'Sie sind nach dem Film direkt nach Hause gegangen.'], '„Zum Glück durften sie trotzdem noch hinein.“'),
  ]),
  passage('reading', 'A2', 5, 'Mitteilung der Hausverwaltung', {
    text: 'Liebe Mieterinnen und Mieter, ab dem 1. Mai wird der Müll nicht mehr am Montag, sondern am Freitag abgeholt. Bitte stellen Sie die Mülltonnen am Donnerstagabend an die Straße. Fahrräder dürfen nicht im Treppenhaus stehen – bitte benutzen Sie den Fahrradkeller. Vielen Dank! Ihre Hausverwaltung',
  }, [
    q('detail', 'Wann wird der Müll ab Mai abgeholt?', ['Am Freitag', 'Am Montag', 'Am Donnerstag', 'Am Wochenende'], '„nicht mehr am Montag, sondern am Freitag“'),
    q('detail', 'Wo sollen die Fahrräder stehen?', ['Im Keller', 'Im Treppenhaus', 'An der Straße', 'In der Wohnung'], '„bitte benutzen Sie den Fahrradkeller“'),
    q('detail', 'Was sollen die Mieter am Donnerstagabend tun?', ['Die Mülltonnen an die Straße stellen', 'Den Keller aufräumen', 'Die Fahrräder abholen', 'Die Hausverwaltung anrufen'], '„Bitte stellen Sie die Mülltonnen am Donnerstagabend an die Straße.“'),
  ]),
  passage('reading', 'A2', 6, 'Blogbeitrag', {
    text: 'Ich wohne seit drei Monaten in einer WG in Leipzig. Wir sind vier Leute und teilen uns die Küche und das Bad. Am Anfang war das schwierig, weil jeder andere Gewohnheiten hat. Jetzt haben wir einen Putzplan, und jede Woche kocht jemand für alle. So lernen wir uns besser kennen, und ich spare Geld.',
  }, [
    q('inference', 'Wie findet die Person das Leben in der WG jetzt?', ['Positiv', 'Sehr schwierig', 'Zu teuer', 'Langweilig'], 'Things improved: they get to know each other and save money.'),
    q('detail', 'Was hat das Zusammenleben einfacher gemacht?', ['Ein Putzplan und gemeinsames Kochen', 'Eine größere Küche', 'Weniger Mitbewohner', 'Ein eigenes Bad'], '„Jetzt haben wir einen Putzplan, und jede Woche kocht jemand für alle.“'),
  ]),

  // ───────────── B1 ─────────────
  passage('reading', 'B1', 1, 'Zeitungsartikel', {
    text: 'Seit der Pandemie arbeiten viele Angestellte zumindest teilweise von zu Hause aus. Eine neue Umfrage zeigt, dass die meisten das Homeoffice schätzen: Sie sparen Zeit, weil der Weg zur Arbeit wegfällt, und können ihren Tag flexibler planen. Allerdings fühlen sich etwa 30 Prozent der Befragten manchmal einsam, und vielen fällt es schwer, nach Feierabend abzuschalten. Experten empfehlen deshalb feste Arbeitszeiten und einen eigenen Arbeitsplatz in der Wohnung.',
  }, [
    q('gist', 'Worum geht es im Text?', ['Um Vor- und Nachteile des Homeoffice', 'Um die Gefahren der Pandemie', 'Um neue Büros in der Stadt', 'Um Arbeitszeiten in Fabriken'], 'The text weighs benefits (time, flexibility) against problems (loneliness, switching off).'),
    q('detail', 'Welches Problem haben viele im Homeoffice?', ['Sie können nach der Arbeit schwer abschalten.', 'Sie verdienen weniger Geld.', 'Sie haben keinen Computer.', 'Sie müssen weit fahren.'], '„vielen fällt es schwer, nach Feierabend abzuschalten“'),
    q('detail', 'Was empfehlen Experten?', ['Feste Arbeitszeiten und einen eigenen Arbeitsplatz', 'Wieder ins Büro zu gehen', 'Öfter Pausen mit Kollegen', 'Weniger zu arbeiten'], 'Last sentence of the text.'),
  ]),
  passage('reading', 'B1', 2, 'Leserbrief', {
    text: 'Ich lese in Ihrer Zeitung, dass die Stadt das Schwimmbad im Westpark schließen will, weil es zu teuer ist. Das finde ich falsch. Das Bad ist der einzige Ort im Viertel, wo Kinder schwimmen lernen können. Natürlich muss die Stadt sparen, aber warum nicht bei den neuen Parkplätzen am Rathaus? Ich hoffe, dass noch einmal über diese Entscheidung gesprochen wird. – Petra Hahn, Westviertel',
  }, [
    q('gist', 'Was ist Frau Hahns Meinung?', ['Das Schwimmbad sollte offen bleiben.', 'Das Schwimmbad ist zu teuer.', 'Die Stadt sollte mehr Parkplätze bauen.', 'Kinder sollten in der Schule schwimmen lernen.'], 'She thinks closing the pool is wrong.'),
    q('detail', 'Warum ist das Bad für sie wichtig?', ['Dort können Kinder schwimmen lernen.', 'Es ist sehr modern.', 'Es liegt neben dem Rathaus.', 'Der Eintritt ist billig.'], '„der einzige Ort im Viertel, wo Kinder schwimmen lernen können“'),
    q('inference', 'Was schlägt sie vor?', ['An anderer Stelle zu sparen', 'Das Bad zu verkaufen', 'Höhere Eintrittspreise', 'Ein neues Bad zu bauen'], 'She suggests saving on the new car parks instead.'),
  ]),
  passage('reading', 'B1', 3, 'Information der Stadt', {
    text: 'Fundbüro der Stadt Mainz: Sie haben etwas verloren? Gegenstände, die in Bussen und Bahnen gefunden werden, kommen zuerst zum Verkehrsbetrieb und erst nach einer Woche zu uns. Bitte melden Sie Ihren Verlust online oder persönlich. Für Ausweise und Pässe müssen Sie selbst kommen und einen Nachweis mitbringen. Gefundene Sachen werden sechs Monate aufbewahrt.',
  }, [
    q('inference', 'Sie haben Ihren Schirm vor zwei Tagen im Bus verloren. Wo ist er wahrscheinlich?', ['Beim Verkehrsbetrieb', 'Im Fundbüro', 'Bei der Polizei', 'Im Rathaus'], 'Items found on buses stay with the transport company for the first week.'),
    q('detail', 'Was gilt für verlorene Pässe?', ['Man muss persönlich kommen.', 'Man kann sie online abholen.', 'Man bekommt sie per Post.', 'Sie werden nicht aufbewahrt.'], '„Für Ausweise und Pässe müssen Sie selbst kommen“'),
    q('detail', 'Wie lange werden Fundsachen aufbewahrt?', ['Ein halbes Jahr', 'Eine Woche', 'Einen Monat', 'Ein Jahr'], 'sechs Monate = ein halbes Jahr.'),
  ]),
  passage('reading', 'B1', 4, 'Porträt', {
    text: 'Als Lukas sein Studium begann, hatte er kaum Geld. Deshalb suchte er einen Nebenjob und fand schließlich eine Stelle in einem Fahrradladen. Zuerst reparierte er nur Reifen, aber der Besitzer merkte schnell, wie geschickt er war. Nach einem Jahr durfte Lukas den Laden am Wochenende allein führen. Heute, zehn Jahre später, hat er eine eigene Werkstatt – und sein Studium hat er nebenbei auch abgeschlossen.',
  }, [
    q('detail', 'Warum suchte Lukas einen Job?', ['Er brauchte Geld.', 'Er wollte nicht studieren.', 'Er liebte Fahrräder.', 'Der Besitzer war sein Freund.'], '„hatte er kaum Geld. Deshalb suchte er einen Nebenjob“'),
    q('detail', 'Was ist heute richtig?', ['Lukas hat einen eigenen Betrieb.', 'Lukas arbeitet immer noch im Laden.', 'Lukas hat das Studium abgebrochen.', 'Lukas repariert nur Reifen.'], '„hat er eine eigene Werkstatt“'),
  ]),
  passage('reading', 'B1', 5, 'Forumsbeitrag', {
    text: 'Hallo zusammen, ich ziehe nächsten Monat nach Wien und suche Tipps. Lohnt sich eine Jahreskarte für die öffentlichen Verkehrsmittel? Ich werde in der Innenstadt arbeiten, aber am Stadtrand wohnen. Mit dem Auto möchte ich nicht fahren, weil das Parken so teuer ist. Danke für eure Antworten! – Marco',
  }, [
    q('gist', 'Was möchte Marco wissen?', ['Ob sich eine Jahreskarte lohnt', 'Wo er wohnen soll', 'Wie teuer ein Auto ist', 'Wo er arbeiten kann'], '„Lohnt sich eine Jahreskarte …?“'),
    q('detail', 'Warum will Marco nicht mit dem Auto fahren?', ['Weil das Parken teuer ist', 'Weil er kein Auto hat', 'Weil die Straßen voll sind', 'Weil er nah an der Arbeit wohnt'], '„weil das Parken so teuer ist“'),
    q('detail', 'Was ist richtig?', ['Marco wird außerhalb des Zentrums wohnen.', 'Marco wohnt schon in Wien.', 'Marco arbeitet am Stadtrand.', 'Marco hat schon eine Jahreskarte.'], '„am Stadtrand wohnen“'),
  ]),
  passage('reading', 'B1', 6, 'Restaurantkritik', {
    text: 'Das neue Restaurant „Grünzeug“ in der Altstadt bietet ausschließlich vegetarische Gerichte an. Die Portionen sind groß und die Preise fair. Besonders gut hat uns das Kürbisrisotto geschmeckt. Weniger begeistert waren wir vom Service: Wir mussten fast eine halbe Stunde auf unser Essen warten, und niemand hat sich entschuldigt. Trotzdem: Wir kommen wieder – aber nicht, wenn wir es eilig haben.',
  }, [
    q('detail', 'Was kritisiert der Autor?', ['Den langsamen Service', 'Die hohen Preise', 'Die kleinen Portionen', 'Das Essen'], 'They waited half an hour and nobody apologised.'),
    q('inference', 'Wie ist die Gesamtbewertung?', ['Eher positiv', 'Sehr negativ', 'Neutral', 'Begeistert, ohne jede Kritik'], '„Trotzdem: Wir kommen wieder“ – positive despite the criticism.'),
  ]),

  // ───────────── B2 ─────────────
  passage('reading', 'B2', 1, 'Sachtext', {
    text: 'Jedes Jahr kaufen Deutsche im Durchschnitt rund 60 neue Kleidungsstücke – viele davon tragen sie kaum. Die sogenannte Fast Fashion hat ihren Preis: Für die Herstellung werden enorme Mengen Wasser verbraucht, und in den Produktionsländern arbeiten Menschen oft unter schlechten Bedingungen. Initiativen wie Kleidertauschpartys oder Second-Hand-Apps versuchen gegenzusteuern. Kritiker bezweifeln allerdings, dass solche Angebote das Konsumverhalten grundlegend verändern, solange neue Kleidung so billig bleibt.',
  }, [
    q('gist', 'Was ist das Hauptthema?', ['Die Folgen billiger Mode und mögliche Alternativen', 'Die Geschichte der Modeindustrie', 'Neue Modetrends in Deutschland', 'Wie man Kleidung richtig wäscht'], 'Fast fashion, its costs and counter-initiatives.'),
    q('detail', 'Welche Folge von Fast Fashion wird genannt?', ['Hoher Wasserverbrauch', 'Steigende Preise für Kleidung', 'Weniger Auswahl in Geschäften', 'Mehr Arbeitsplätze in Deutschland'], '„enorme Mengen Wasser verbraucht“'),
    q('inference', 'Was meinen die Kritiker?', ['Solange Kleidung billig ist, ändert sich wenig.', 'Second-Hand-Apps sind zu teuer.', 'Tauschpartys sind die Lösung.', 'Die Menschen kaufen schon weniger.'], '„… solange neue Kleidung so billig bleibt“'),
  ]),
  passage('reading', 'B2', 2, 'Interview', {
    text: 'Frage: Frau Dr. Lange, Sie erforschen, wie Kinder Sprachen lernen. Stimmt es, dass man als Kind leichter lernt? – Lange: Jein. Kinder haben einen Vorteil bei der Aussprache, wenn sie früh und viel Kontakt mit einer Sprache haben. Erwachsene lernen dagegen Grammatik und Wortschatz oft schneller, weil sie bewusst Strategien einsetzen können. Entscheidend ist weniger das Alter als die Menge und die Qualität des Kontakts.',
  }, [
    q('detail', 'Wobei haben Kinder laut Dr. Lange einen Vorteil?', ['Bei der Aussprache', 'Bei der Grammatik', 'Beim Wortschatz', 'Bei Lernstrategien'], '„Kinder haben einen Vorteil bei der Aussprache“'),
    q('detail', 'Was ist laut Dr. Lange am wichtigsten?', ['Wie viel und wie guten Kontakt man mit der Sprache hat', 'Das Alter beim Lernbeginn', 'Gute Lehrbücher', 'Sprachtalent'], '„Entscheidend ist … die Menge und die Qualität des Kontakts.“'),
    q('vocab', 'Was bedeutet „Jein“ hier?', ['Die Antwort ist teils ja, teils nein.', 'Sie weiß es nicht.', 'Sie stimmt völlig zu.', 'Sie lehnt die Frage ab.'], 'Jein = ja + nein: partly yes, partly no.'),
  ]),
  passage('reading', 'B2', 3, 'Beschwerdebrief', {
    text: 'Sehr geehrte Damen und Herren, am 12. März habe ich bei Ihnen eine Waschmaschine bestellt, die laut Bestätigung innerhalb von fünf Werktagen geliefert werden sollte. Inzwischen sind drei Wochen vergangen, ohne dass ich eine Lieferung oder eine Nachricht erhalten habe. Meine Anrufe bei Ihrer Hotline blieben unbeantwortet. Ich fordere Sie hiermit auf, die Maschine bis zum 10. April zu liefern. Andernfalls trete ich vom Kaufvertrag zurück und verlange den bereits gezahlten Betrag zurück.',
  }, [
    q('gist', 'Warum schreibt die Person?', ['Weil die bestellte Ware nicht geliefert wurde', 'Weil die Waschmaschine kaputt ist', 'Weil sie eine Rechnung nicht bezahlen kann', 'Weil sie eine neue Maschine bestellen möchte'], 'Three weeks without delivery.'),
    q('detail', 'Was passiert, wenn bis zum 10. April nichts geliefert wird?', ['Die Person tritt vom Kauf zurück und will ihr Geld zurück.', 'Die Person bestellt eine zweite Maschine.', 'Die Person ruft noch einmal an.', 'Die Person zahlt den Rest.'], '„Andernfalls trete ich vom Kaufvertrag zurück …“'),
  ]),
  passage('reading', 'B2', 4, 'Bericht', {
    text: 'Die Zahl der Bienen ist in vielen Regionen Europas deutlich zurückgegangen. Als Ursachen gelten vor allem Pestizide, der Verlust von Lebensräumen und Krankheiten. Das betrifft nicht nur Imker: Rund ein Drittel unserer Nahrungsmittel hängt von der Bestäubung durch Insekten ab. Einige Städte reagieren mit „Bienenwiesen“ auf öffentlichen Flächen, und auch Privatleute können helfen, indem sie auf dem Balkon heimische Blumen pflanzen.',
  }, [
    q('inference', 'Warum betrifft der Rückgang der Bienen alle?', ['Weil viele Lebensmittel von der Bestäubung abhängen', 'Weil Honig teurer wird', 'Weil Bienen Krankheiten übertragen', 'Weil Imker ihre Arbeit verlieren'], '„ein Drittel unserer Nahrungsmittel hängt von der Bestäubung … ab“'),
    q('detail', 'Wie können Privatleute helfen?', ['Heimische Blumen pflanzen', 'Pestizide verwenden', 'Bienen kaufen', 'Weniger Honig essen'], '„indem sie … heimische Blumen pflanzen“'),
  ]),
  passage('reading', 'B2', 5, 'Kolumne', {
    text: 'Digitale Detox-Wochenenden liegen im Trend: Man verzichtet zwei Tage lang auf Smartphone und Internet, um „zu sich selbst zu finden“. Ich halte davon wenig. Wer sein Handy nur für zwei Tage weglegt, um danach umso mehr zu scrollen, ändert nichts. Sinnvoller wäre es, im Alltag feste Regeln einzuführen – etwa kein Handy beim Essen oder im Schlafzimmer.',
  }, [
    q('gist', 'Welche Haltung hat der Autor?', ['Er ist skeptisch gegenüber Detox-Wochenenden.', 'Er empfiehlt Detox-Wochenenden.', 'Er findet Smartphones gefährlich für Kinder.', 'Er möchte das Internet verbieten.'], '„Ich halte davon wenig.“'),
    q('detail', 'Was schlägt er vor?', ['Feste Regeln im Alltag', 'Längere Detox-Phasen', 'Ein Leben ganz ohne Handy', 'Mehr Wochenenden auf dem Land'], '„im Alltag feste Regeln einzuführen“'),
  ]),
  passage('reading', 'B2', 6, 'Nachricht', {
    text: 'Die Bahn hat angekündigt, ab Dezember auf mehreren Strecken mehr Züge einzusetzen. Gleichzeitig steigen die Ticketpreise im Durchschnitt um 4,9 Prozent. Fahrgastverbände kritisieren die Erhöhung: Statt die Preise anzuheben, solle die Bahn erst einmal für mehr Pünktlichkeit sorgen. Die Bahn verweist dagegen auf gestiegene Energie- und Personalkosten.',
  }, [
    q('detail', 'Was kritisieren die Fahrgastverbände?', ['Höhere Preise trotz schlechter Pünktlichkeit', 'Die zusätzlichen Züge', 'Die Energiekosten', 'Die neuen Strecken'], 'They want punctuality before price increases.'),
    q('detail', 'Wie begründet die Bahn die höheren Preise?', ['Mit höheren Kosten für Energie und Personal', 'Mit mehr Pünktlichkeit', 'Mit weniger Fahrgästen', 'Mit neuen Zügen'], '„verweist … auf gestiegene Energie- und Personalkosten“'),
    q('vocab', '„verweist auf“ bedeutet hier:', ['nennt als Grund', 'lehnt ab', 'verschweigt', 'bestreitet'], 'auf etwas verweisen = to point to something (as a reason).'),
  ]),

  // ───────────── C1 ─────────────
  passage('reading', 'C1', 1, 'Essay (Auszug)', {
    text: 'Die Vier-Tage-Woche wird häufig als Patentrezept gegen Erschöpfung und Fachkräftemangel gepriesen. Erste Pilotprojekte liefern durchaus ermutigende Ergebnisse: Krankmeldungen gingen zurück, die Zufriedenheit stieg, und die Produktivität blieb weitgehend stabil. Allerdings beruhen diese Befunde überwiegend auf Unternehmen, die sich freiwillig gemeldet hatten – und damit vermutlich ohnehin gute Voraussetzungen mitbrachten. Ob sich das Modell auf Branchen übertragen lässt, in denen Präsenz unverzichtbar ist, etwa die Pflege, ist bislang kaum erforscht.',
  }, [
    q('gist', 'Welche Haltung nimmt der Text ein?', ['Vorsichtig abwägend', 'Uneingeschränkt begeistert', 'Völlig ablehnend', 'Gleichgültig'], 'It acknowledges positive results but points out limits.'),
    q('inference', 'Warum sind die Ergebnisse der Pilotprojekte nur begrenzt aussagekräftig?', ['Weil vor allem gut geeignete Firmen freiwillig teilgenommen haben', 'Weil die Produktivität stark gesunken ist', 'Weil zu wenige Mitarbeiter krank waren', 'Weil die Pflege besonders gut untersucht wurde'], 'Self-selection: volunteers probably had good preconditions.'),
    q('detail', 'Was ist laut Text noch kaum erforscht?', ['Die Übertragbarkeit auf Branchen mit Präsenzpflicht', 'Die Zufriedenheit der Mitarbeiter', 'Die Zahl der Krankmeldungen', 'Die Kosten für Unternehmen'], 'Last sentence.'),
  ]),
  passage('reading', 'C1', 2, 'Populärwissenschaft', {
    text: 'Lange galt das Gedächtnis als eine Art Archiv, in dem Erlebnisse unverändert abgelegt werden. Heute weiß man, dass Erinnerungen bei jedem Abruf neu konstruiert und dabei leicht verändert werden. Diese Formbarkeit hat Vorteile – sie ermöglicht es, Erfahrungen mit neuem Wissen zu verknüpfen –, birgt aber auch Risiken: Zeugenaussagen können durch suggestive Fragen verfälscht werden, ohne dass die Betroffenen etwas davon merken.',
  }, [
    q('detail', 'Wie wird das Gedächtnis heute verstanden?', ['Als etwas, das Erinnerungen beim Abrufen neu zusammensetzt', 'Als unveränderliches Archiv', 'Als unzuverlässig und daher nutzlos', 'Als vor allem durch Fragen gesteuert'], '„bei jedem Abruf neu konstruiert“'),
    q('detail', 'Welches Risiko nennt der Text?', ['Zeugenaussagen können unbemerkt beeinflusst werden.', 'Man vergisst neue Informationen schneller.', 'Alte Erinnerungen gehen ganz verloren.', 'Wissen lässt sich nicht verknüpfen.'], 'Suggestive questions can distort testimony unnoticed.'),
    q('vocab', '„birgt Risiken“ bedeutet:', ['enthält Gefahren', 'verhindert Gefahren', 'versteckt Vorteile', 'beseitigt Probleme'], 'bergen = to contain, carry (a risk).'),
  ]),
  passage('reading', 'C1', 3, 'Glosse', {
    text: 'Man muss die Stadtverwaltung beglückwünschen: Nach nur elf Jahren Planung ist der neue Radweg an der Hauptstraße fertig – auf einer Länge von beeindruckenden 400 Metern. Dass er an beiden Enden abrupt im Autoverkehr endet, ist sicher nur ein Detail, das bei der nächsten Planungsrunde, vermutlich um 2035, behoben wird.',
  }, [
    q('inference', 'Wie ist der Text gemeint?', ['Ironisch-kritisch', 'Ernsthaft lobend', 'Neutral informierend', 'Sachlich-technisch'], '"nur elf Jahre", "beeindruckende 400 Meter" – irony.'),
    q('inference', 'Was wird am Radweg tatsächlich kritisiert?', ['Er ist sehr kurz, kam spät und endet ungünstig.', 'Er ist zu breit.', 'Er war zu teuer.', 'Er wurde zu schnell gebaut.'], 'The praise is ironic; the facts are the criticism.'),
  ]),
  passage('reading', 'C1', 4, 'Prüfungsordnung (Auszug)', {
    text: 'Studierende, die aus triftigen Gründen an einer Prüfung nicht teilnehmen können, haben dies unverzüglich, spätestens jedoch drei Werktage nach dem Prüfungstermin, schriftlich anzuzeigen. Im Krankheitsfall ist ein ärztliches Attest beizufügen, aus dem die Prüfungsunfähigkeit hervorgeht. Wird die Frist versäumt, gilt die Prüfung als nicht bestanden.',
  }, [
    q('detail', 'Was muss man bei Krankheit tun?', ['Spätestens nach drei Werktagen schriftlich Bescheid geben und ein Attest einreichen', 'Die Prüfung am nächsten Tag nachholen', 'Nur mündlich Bescheid geben', 'Nichts – Krankheit gilt automatisch als Entschuldigung'], 'Written notice within three working days + medical certificate.'),
    q('detail', 'Was passiert, wenn man die Frist versäumt?', ['Die Prüfung gilt als nicht bestanden.', 'Man darf die Prüfung wiederholen.', 'Man bekommt eine Verlängerung.', 'Man muss ein neues Attest besorgen.'], 'Last sentence.'),
    q('vocab', '„haben dies … anzuzeigen“ bedeutet:', ['müssen dies melden', 'dürfen dies zeigen', 'sollten dies vermeiden', 'können dies beweisen'], 'haben + zu + infinitive = müssen; anzeigen = to notify.'),
  ]),
  passage('reading', 'C1', 5, 'Erzählung (Auszug)', {
    text: 'Sie hatte sich vorgenommen, nicht zu weinen. Als der Zug anfuhr, winkte sie, bis das letzte Fenster hinter der Kurve verschwunden war, und blieb dann noch eine Weile auf dem leeren Bahnsteig stehen, als könne sie den Abschied rückgängig machen, wenn sie sich nur nicht von der Stelle rührte.',
  }, [
    q('inference', 'Wie fühlt sich die Frau?', ['Traurig; sie will den Abschied nicht wahrhaben.', 'Erleichtert, dass der Besuch vorbei ist.', 'Wütend auf den Reisenden.', 'Gleichgültig.'], 'She stays as if she could undo the farewell.'),
    q('detail', 'Was macht sie, nachdem der Zug weg ist?', ['Sie bleibt noch auf dem Bahnsteig stehen.', 'Sie läuft dem Zug hinterher.', 'Sie geht sofort nach Hause.', 'Sie steigt in den nächsten Zug.'], '„blieb dann noch eine Weile auf dem leeren Bahnsteig stehen“'),
  ]),
  passage('reading', 'C1', 6, 'Debattenbericht', {
    text: 'Befürworter eines Tempolimits auf Autobahnen verweisen auf weniger schwere Unfälle und geringere CO₂-Emissionen. Gegner halten dem entgegen, der Effekt auf das Klima sei vergleichsweise gering, und sehen in einer Begrenzung einen unnötigen Eingriff in die persönliche Freiheit. Bemerkenswert ist, dass Umfragen seit Jahren eine Mehrheit für ein Tempolimit zeigen – politisch durchgesetzt wurde es dennoch nicht.',
  }, [
    q('detail', 'Welches Argument bringen die Gegner vor?', ['Der Klimaeffekt sei gering und die Freiheit werde eingeschränkt.', 'Es gebe dann mehr Unfälle.', 'Autobahnen würden teurer.', 'Die Mehrheit sei dagegen.'], '„der Effekt auf das Klima sei vergleichsweise gering … Eingriff in die persönliche Freiheit“'),
    q('inference', 'Was findet der Autor bemerkenswert?', ['Dass es trotz Mehrheit in Umfragen kein Tempolimit gibt', 'Dass die Gegner gute Argumente haben', 'Dass die Unfälle zugenommen haben', 'Dass Umfragen unzuverlässig sind'], 'Majority support, yet no law.'),
  ]),

  // ───────────── C2 ─────────────
  passage('reading', 'C2', 1, 'Essay', {
    text: 'Es gehört zu den Paradoxien der Informationsgesellschaft, dass ein Mehr an verfügbarem Wissen keineswegs zu einem Mehr an Urteilskraft führt. Im Gegenteil: Die schiere Fülle der Quellen begünstigt eine Haltung, in der man sich jene Befunde heraussucht, die das eigene Weltbild bestätigen. Urteilskraft aber setzt voraus, das Widerständige auszuhalten – jene Argumente, die einem gegen den Strich gehen. Dass dies anstrengend ist, spricht nicht gegen, sondern gerade für ihren Wert.',
  }, [
    q('gist', 'Welche These vertritt der Text?', ['Mehr Information führt nicht automatisch zu besserem Urteilen.', 'Die Informationsgesellschaft hat das Urteilsvermögen verbessert.', 'Man sollte weniger Quellen lesen.', 'Widerspruch ist grundsätzlich schädlich.'], 'First sentence states the paradox.'),
    q('inference', 'Was bedeutet „das Widerständige aushalten“?', ['Sich mit unbequemen Gegenargumenten auseinandersetzen', 'Sich politisch engagieren', 'Konflikte vermeiden', 'Informationen ignorieren'], 'It is explained as „Argumente, die einem gegen den Strich gehen“.'),
    q('inference', 'Wie bewertet der Autor die Anstrengung, die Urteilskraft erfordert?', ['Als Hinweis auf ihren Wert', 'Als Grund, darauf zu verzichten', 'Als überflüssig', 'Als typisch für Experten'], '„spricht nicht gegen, sondern gerade für ihren Wert“'),
  ]),
  passage('reading', 'C2', 2, 'Erzählung (Auszug)', {
    text: 'Der Onkel pflegte von seiner Zeit in Triest zu erzählen, als hätte er dort nicht drei Monate, sondern ein ganzes Leben verbracht. Niemand in der Familie widersprach ihm; man wusste, dass seine Geschichten mit jedem Weihnachtsfest um eine Episode reicher wurden, und gerade das schätzte man an ihnen. Was wahr daran war, schien längst niemanden mehr zu kümmern – am wenigsten ihn selbst.',
  }, [
    q('inference', 'Wie geht die Familie mit den Geschichten des Onkels um?', ['Sie nimmt die Übertreibungen wohlwollend hin.', 'Sie widerspricht ihm regelmäßig.', 'Sie glaubt jedes Wort.', 'Sie langweilt sich dabei.'], '„Niemand … widersprach ihm … gerade das schätzte man“'),
    q('detail', 'Wie lange war der Onkel tatsächlich in Triest?', ['Drei Monate', 'Ein ganzes Leben', 'Ein Jahr', 'Das bleibt unklar'], '„nicht drei Monate, sondern ein ganzes Leben“ – as if; in fact three months.'),
    q('inference', 'Was deutet der letzte Satz an?', ['Auch der Onkel unterscheidet nicht mehr zwischen Wahrheit und Erfindung.', 'Der Onkel lügt bewusst, um zu täuschen.', 'Die Familie will die Wahrheit herausfinden.', 'Der Onkel hat Triest nie besucht.'], '„am wenigsten ihn selbst“'),
  ]),
  passage('reading', 'C2', 3, 'Verwaltungstext', {
    text: 'Die Erstattung der Reisekosten erfolgt nach Maßgabe der geltenden Richtlinien und setzt die Vorlage sämtlicher Originalbelege voraus. Aufwendungen, die über das notwendige Maß hinausgehen, werden nicht berücksichtigt. Ein Anspruch auf Erstattung besteht nicht, sofern die Reise ohne vorherige Genehmigung angetreten wurde.',
  }, [
    q('detail', 'In welchem Fall gibt es keine Erstattung?', ['Wenn die Reise nicht vorher genehmigt wurde', 'Wenn man alle Originalbelege vorlegt', 'Wenn die Kosten den Richtlinien entsprechen', 'Wenn man die Reise zunächst selbst bezahlt hat'], '„sofern die Reise ohne vorherige Genehmigung angetreten wurde“'),
    q('vocab', '„Aufwendungen, die über das notwendige Maß hinausgehen“ sind:', ['unnötig hohe Ausgaben', 'alle Reisekosten', 'Kosten für Belege', 'Ausgaben ohne Quittung'], 'Aufwendungen = expenses; über das notwendige Maß = more than necessary.'),
  ]),
  passage('reading', 'C2', 4, 'Wissenschaftsjournalismus', {
    text: 'Dass Placebos wirken, ist gut belegt; überraschender ist, dass sie mitunter selbst dann wirken, wenn die Patienten wissen, dass sie ein Scheinmedikament erhalten. Diese sogenannten Open-Label-Placebos stellen gängige Erklärungen infrage, die den Effekt allein auf Erwartung zurückführen. Möglicherweise spielt das Ritual der Behandlung – die Zuwendung, die Einnahme zu festen Zeiten – eine größere Rolle als bislang angenommen.',
  }, [
    q('detail', 'Was ist an Open-Label-Placebos überraschend?', ['Sie wirken, obwohl die Patienten Bescheid wissen.', 'Sie wirken stärker als echte Medikamente.', 'Sie sind teurer als normale Placebos.', 'Sie wirken nur bei Kindern.'], '„selbst dann …, wenn die Patienten wissen …“'),
    q('inference', 'Welche Erklärung wird erwogen?', ['Das Behandlungsritual könnte wichtiger sein als gedacht.', 'Die Patienten werden getäuscht.', 'Placebos enthalten doch Wirkstoffe.', 'Die Studien sind fehlerhaft.'], 'Last sentence.'),
  ]),
  passage('reading', 'C2', 5, 'Feuilleton', {
    text: 'Der moderne Mensch, so lehrt uns die Werbung, ist ein Optimierungsprojekt: Er schläft getrackt, isst kalorienbewusst, meditiert per App und reflektiert seine Fortschritte im Wochenrückblick. Das Einzige, was er nicht mehr kann, ist, schlicht nichts zu tun – es sei denn, er hat sich das Nichtstun als Achtsamkeitsübung in den Kalender eingetragen.',
  }, [
    q('inference', 'Was kritisiert der Autor?', ['Den Zwang zur ständigen Selbstoptimierung', 'Die schlechte Qualität von Apps', 'Zu wenig Sport', 'Werbung für Lebensmittel'], 'The ironic picture of the "Optimierungsprojekt".'),
    q('inference', 'Was ist die Pointe des letzten Satzes?', ['Selbst das Nichtstun wird noch geplant und optimiert.', 'Nichtstun ist ungesund.', 'Achtsamkeit ist sinnlos.', 'Kalender sind überflüssig.'], 'Doing nothing only happens as a scheduled exercise.'),
  ]),
  passage('reading', 'C2', 6, 'Historischer Essay', {
    text: 'Die Geschichte der Grenzöffnung von 1989 wird oft als Ergebnis eines Versehens erzählt: Ein Regierungssprecher habe auf eine Nachfrage hin verkündet, die neue Reiseregelung gelte „ab sofort“. So pointiert diese Anekdote ist, sie verstellt den Blick darauf, dass der Druck der Straße und die Massenflucht über Ungarn das Regime längst in die Defensive gedrängt hatten. Der Versprecher mag den Zeitpunkt bestimmt haben – die Richtung war vorgegeben.',
  }, [
    q('gist', 'Welche Position vertritt der Autor?', ['Die Anekdote ist zu einfach; die Öffnung war die Folge längerer Entwicklungen.', 'Die Grenzöffnung war nur ein Zufall.', 'Ungarn hat die Grenze geöffnet.', 'Der Sprecher hat bewusst gehandelt.'], 'Pressure from the streets and mass exodus had already decided the direction.'),
    q('vocab', '„verstellt den Blick darauf“ bedeutet:', ['lässt etwas übersehen', 'macht etwas deutlich', 'verändert die Geschichte', 'versteckt absichtlich Beweise'], 'den Blick verstellen = to obscure the view of something.'),
    q('inference', 'Was meint der letzte Satz?', ['Der Fehler beeinflusste nur das Wann, nicht das Ob.', 'Der Fehler hat alles verändert.', 'Die Richtung der Politik war unklar.', 'Der Sprecher bestimmte die Politik.'], '„den Zeitpunkt bestimmt … die Richtung war vorgegeben“'),
  ]),
];
