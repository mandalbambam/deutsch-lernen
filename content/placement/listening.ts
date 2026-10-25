import { passage, q, type Passage } from './types';

/**
 * Placement test: listening scripts (read aloud by the device's German TTS voice), A1–C2.
 * Dialogues alternate between two voices when the device has more than one German voice.
 * Correct option first.
 */
export const LISTENING: Passage[] = [
  // ───────────── A1 ─────────────
  passage('listening', 'A1', 1, 'Durchsage am Bahnhof', {
    context: 'Sie hören eine Durchsage am Bahnhof.',
    text: 'Achtung an Gleis drei: Der Zug nach München fährt heute nicht um zehn Uhr fünfzehn, sondern um zehn Uhr fünfundvierzig. Wir bitten um Entschuldigung.',
  }, [
    q('detail', 'Wann fährt der Zug nach München?', ['Um 10:45 Uhr', 'Um 10:15 Uhr', 'Um 3 Uhr', 'Um 11:15 Uhr'], '„nicht um zehn Uhr fünfzehn, sondern um zehn Uhr fünfundvierzig“'),
    q('detail', 'Von welchem Gleis fährt der Zug?', ['Gleis 3', 'Gleis 10', 'Gleis 4', 'Gleis 13'], '„Achtung an Gleis drei“'),
  ]),
  passage('listening', 'A1', 2, 'Gespräch auf dem Markt', {
    context: 'Sie hören ein Gespräch auf dem Markt.',
    lines: [
      { speaker: 'A', text: 'Guten Tag. Ich möchte ein Kilo Tomaten, bitte.' },
      { speaker: 'B', text: 'Gern. Sonst noch etwas?' },
      { speaker: 'A', text: 'Ja, drei Äpfel, bitte.' },
      { speaker: 'B', text: 'Das macht vier Euro zwanzig.' },
    ],
  }, [
    q('detail', 'Was kauft die Kundin?', ['Tomaten und Äpfel', 'Tomaten und Bananen', 'Nur Äpfel', 'Kartoffeln und Äpfel'], 'ein Kilo Tomaten + drei Äpfel.'),
    q('detail', 'Wie viel kostet alles?', ['4,20 €', '2,40 €', '4,02 €', '14,20 €'], '„vier Euro zwanzig“'),
  ]),
  passage('listening', 'A1', 3, 'Nachricht auf der Mailbox', {
    context: 'Sie hören eine Nachricht auf dem Anrufbeantworter.',
    text: 'Hallo Anna, hier ist Peter. Ich bin heute leider krank. Ich kann nicht zum Deutschkurs kommen. Kannst du mich morgen anrufen? Danke, tschüs!',
  }, [
    q('gist', 'Warum ruft Peter an?', ['Er ist krank und kommt nicht zum Kurs.', 'Er möchte ins Kino gehen.', 'Er hat eine neue Telefonnummer.', 'Er kommt später zum Kurs.'], '„Ich bin heute leider krank. Ich kann nicht zum Deutschkurs kommen.“'),
    q('detail', 'Was soll Anna tun?', ['Peter morgen anrufen', 'Peter heute besuchen', 'Zum Arzt gehen', 'Den Kurs absagen'], '„Kannst du mich morgen anrufen?“'),
  ]),
  passage('listening', 'A1', 4, 'Kennenlernen', {
    context: 'Zwei Personen lernen sich kennen.',
    lines: [
      { speaker: 'A', text: 'Hallo, ich bin Julia. Und wer bist du?' },
      { speaker: 'B', text: 'Ich heiße Marco. Ich komme aus Italien, aus Rom.' },
      { speaker: 'A', text: 'Und was machst du hier in Berlin?' },
      { speaker: 'B', text: 'Ich studiere hier Medizin.' },
    ],
  }, [
    q('detail', 'Woher kommt Marco?', ['Aus Italien', 'Aus Berlin', 'Aus Spanien', 'Aus Österreich'], '„Ich komme aus Italien, aus Rom.“'),
    q('detail', 'Was macht Marco in Berlin?', ['Er studiert.', 'Er arbeitet als Arzt.', 'Er macht Urlaub.', 'Er lernt Italienisch.'], '„Ich studiere hier Medizin.“'),
  ]),
  passage('listening', 'A1', 5, 'Durchsage im Supermarkt', {
    context: 'Sie hören eine Durchsage im Supermarkt.',
    text: 'Liebe Kundinnen und Kunden, heute im Angebot: Bananen, ein Kilo für nur neunundneunzig Cent. Unser Markt ist heute bis zweiundzwanzig Uhr geöffnet.',
  }, [
    q('detail', 'Was kostet ein Kilo Bananen?', ['99 Cent', '9,90 €', '19 Cent', '1,99 €'], '„neunundneunzig Cent“'),
    q('detail', 'Bis wann ist der Markt heute geöffnet?', ['Bis 22 Uhr', 'Bis 20 Uhr', 'Bis 12 Uhr', 'Bis 21 Uhr'], '„bis zweiundzwanzig Uhr“'),
  ]),
  passage('listening', 'A1', 6, 'Verabredung', {
    context: 'Zwei Freunde machen eine Verabredung.',
    lines: [
      { speaker: 'A', text: 'Hast du am Samstag Zeit? Wir können schwimmen gehen.' },
      { speaker: 'B', text: 'Am Samstag arbeite ich. Aber am Sonntag kann ich.' },
      { speaker: 'A', text: 'Gut, dann am Sonntag um zwei Uhr?' },
      { speaker: 'B', text: 'Super, bis Sonntag!' },
    ],
  }, [
    q('detail', 'Wann gehen sie schwimmen?', ['Am Sonntag um 14 Uhr', 'Am Samstag um 2 Uhr', 'Am Sonntag um 12 Uhr', 'Am Samstag um 14 Uhr'], '„dann am Sonntag um zwei Uhr“'),
    q('detail', 'Warum hat die zweite Person am Samstag keine Zeit?', ['Sie arbeitet.', 'Sie ist krank.', 'Sie geht schwimmen.', 'Sie besucht ihre Familie.'], '„Am Samstag arbeite ich.“'),
  ]),
  passage('listening', 'A1', 7, 'Wetterbericht', {
    context: 'Sie hören den Wetterbericht im Radio.',
    text: 'Und jetzt das Wetter für morgen: Im Norden regnet es, im Süden scheint die Sonne. Die Temperaturen liegen zwischen fünfzehn und zwanzig Grad.',
  }, [
    q('detail', 'Wie ist das Wetter morgen im Süden?', ['Sonnig', 'Regnerisch', 'Es schneit.', 'Sehr windig'], '„im Süden scheint die Sonne“'),
    q('detail', 'Wie warm wird es?', ['15 bis 20 Grad', '5 bis 10 Grad', '20 bis 25 Grad', '50 bis 60 Grad'], '„zwischen fünfzehn und zwanzig Grad“'),
  ]),
  passage('listening', 'A1', 8, 'Nach dem Weg fragen', {
    context: 'Eine Person fragt auf der Straße nach dem Weg.',
    lines: [
      { speaker: 'A', text: 'Entschuldigung, wo ist hier die Post?' },
      { speaker: 'B', text: 'Gehen Sie geradeaus und dann die zweite Straße links. Die Post ist neben dem Supermarkt.' },
    ],
  }, [
    q('detail', 'Wo ist die Post?', ['Neben dem Supermarkt', 'Gegenüber vom Bahnhof', 'In der ersten Straße rechts', 'Hinter der Kirche'], '„Die Post ist neben dem Supermarkt.“'),
  ]),

  // ───────────── A2 ─────────────
  passage('listening', 'A2', 1, 'Anruf der Arztpraxis', {
    context: 'Sie hören eine Nachricht von einer Arztpraxis.',
    text: 'Guten Tag, hier ist die Praxis Doktor Schneider. Sie haben morgen um neun Uhr einen Termin. Leider ist Frau Doktor Schneider krank. Wir müssen den Termin verschieben. Können Sie am Freitag um elf Uhr kommen? Bitte rufen Sie uns kurz zurück.',
  }, [
    q('gist', 'Warum ruft die Praxis an?', ['Der Termin muss verschoben werden.', 'Der Patient hat den Termin vergessen.', 'Die Praxis hat neue Öffnungszeiten.', 'Das Rezept ist fertig.'], '„Wir müssen den Termin verschieben.“'),
    q('detail', 'Wann ist der neue Termin?', ['Am Freitag um 11 Uhr', 'Morgen um 9 Uhr', 'Am Freitag um 9 Uhr', 'Morgen um 11 Uhr'], '„am Freitag um elf Uhr“'),
  ]),
  passage('listening', 'A2', 2, 'Gespräch über das Wochenende', {
    context: 'Zwei Kolleginnen sprechen über das Wochenende.',
    lines: [
      { speaker: 'A', text: 'Was hast du am Wochenende gemacht?' },
      { speaker: 'B', text: 'Ich war mit meinen Eltern in Hamburg. Wir haben eine Hafenrundfahrt gemacht, aber es hat die ganze Zeit geregnet.' },
      { speaker: 'A', text: 'Oh, schade!' },
      { speaker: 'B', text: 'Na ja, am Abend waren wir im Musical. Das war super.' },
    ],
  }, [
    q('detail', 'Wo war die Kollegin am Wochenende?', ['In Hamburg', 'In Berlin', 'Zu Hause', 'Am Meer'], '„Ich war mit meinen Eltern in Hamburg.“'),
    q('inference', 'Was hat ihr besonders gut gefallen?', ['Das Musical', 'Die Hafenrundfahrt', 'Das Wetter', 'Das Essen'], '„am Abend waren wir im Musical. Das war super.“'),
  ]),
  passage('listening', 'A2', 3, 'Durchsage im Zug', {
    context: 'Sie hören eine Durchsage im Zug.',
    text: 'Meine Damen und Herren, wegen einer technischen Störung endet dieser Zug heute in Fulda. Reisende nach Frankfurt steigen bitte in Fulda in den Regionalexpress auf Gleis zwei um. Wir bitten um Ihr Verständnis.',
  }, [
    q('detail', 'Was müssen Reisende nach Frankfurt tun?', ['In Fulda umsteigen', 'Im Zug sitzen bleiben', 'Ein neues Ticket kaufen', 'In Frankfurt umsteigen'], '„steigen bitte in Fulda … um“'),
    q('detail', 'Warum endet der Zug in Fulda?', ['Wegen einer technischen Störung', 'Wegen des Wetters', 'Wegen eines Streiks', 'Weil der Zug zu voll ist'], '„wegen einer technischen Störung“'),
  ]),
  passage('listening', 'A2', 4, 'Im Geschäft', {
    context: 'Eine Kundin spricht mit einem Verkäufer.',
    lines: [
      { speaker: 'A', text: 'Guten Tag, ich habe diese Jacke letzte Woche gekauft, aber sie ist mir zu klein.' },
      { speaker: 'B', text: 'Haben Sie den Kassenbon dabei?' },
      { speaker: 'A', text: 'Ja, hier ist er.' },
      { speaker: 'B', text: 'Möchten Sie eine größere Größe oder Ihr Geld zurück?' },
      { speaker: 'A', text: 'Eine Nummer größer, bitte.' },
    ],
  }, [
    q('detail', 'Was ist das Problem?', ['Die Jacke ist zu klein.', 'Die Jacke ist kaputt.', 'Die Jacke ist zu teuer.', 'Die Jacke hat die falsche Farbe.'], '„sie ist mir zu klein“'),
    q('detail', 'Was möchte die Kundin?', ['Die Jacke eine Nummer größer', 'Ihr Geld zurück', 'Eine andere Farbe', 'Einen Gutschein'], '„Eine Nummer größer, bitte.“'),
  ]),
  passage('listening', 'A2', 5, 'Radiowerbung', {
    context: 'Sie hören Werbung im Radio.',
    text: 'Sie wollen Spanisch lernen? Die Volkshochschule bietet ab März neue Abendkurse an: dienstags und donnerstags von achtzehn bis neunzehn Uhr dreißig. Der Kurs kostet hundertzwanzig Euro für zehn Wochen. Anmeldung online oder in unserem Büro.',
  }, [
    q('detail', 'Wann findet der Kurs statt?', ['Dienstags und donnerstags abends', 'Jeden Morgen', 'Am Wochenende', 'Montags und mittwochs'], '„dienstags und donnerstags von achtzehn bis neunzehn Uhr dreißig“'),
    q('detail', 'Wie lange dauert der Kurs insgesamt?', ['Zehn Wochen', 'Einen Monat', 'Ein Jahr', 'Zwei Wochen'], '„für zehn Wochen“'),
  ]),
  passage('listening', 'A2', 6, 'Die neue Wohnung', {
    context: 'Zwei Freunde sprechen über eine neue Wohnung.',
    lines: [
      { speaker: 'A', text: 'Wie ist deine neue Wohnung?' },
      { speaker: 'B', text: 'Sie ist schön hell und hat einen großen Balkon. Aber sie ist ziemlich weit weg von meiner Arbeit. Ich brauche jetzt fast eine Stunde mit dem Bus.' },
      { speaker: 'A', text: 'Und die Miete?' },
      { speaker: 'B', text: 'Die ist zum Glück günstiger als vorher.' },
    ],
  }, [
    q('detail', 'Was ist ein Nachteil der neuen Wohnung?', ['Der lange Weg zur Arbeit', 'Die hohe Miete', 'Sie ist dunkel.', 'Sie hat keinen Balkon.'], '„fast eine Stunde mit dem Bus“'),
    q('detail', 'Was sagt die Person über die Miete?', ['Sie ist niedriger als früher.', 'Sie ist sehr hoch.', 'Sie ist gleich geblieben.', 'Sie weiß es noch nicht.'], '„günstiger als vorher“'),
  ]),
  passage('listening', 'A2', 7, 'Im Restaurant', {
    context: 'Sie hören ein Gespräch im Restaurant.',
    lines: [
      { speaker: 'A', text: 'Wir möchten bitte bezahlen.' },
      { speaker: 'B', text: 'Zusammen oder getrennt?' },
      { speaker: 'A', text: 'Getrennt, bitte. Ich hatte die Suppe und ein Wasser.' },
      { speaker: 'B', text: 'Das macht sieben Euro achtzig.' },
    ],
  }, [
    q('detail', 'Wie bezahlen die Gäste?', ['Getrennt', 'Zusammen', 'Mit Gutschein', 'Gar nicht'], '„Getrennt, bitte.“'),
    q('detail', 'Was hat die Person gegessen?', ['Eine Suppe', 'Einen Salat', 'Eine Pizza', 'Nichts'], '„Ich hatte die Suppe und ein Wasser.“'),
  ]),
  passage('listening', 'A2', 8, 'Durchsage im Museum', {
    context: 'Sie hören eine Durchsage im Museum.',
    text: 'Liebe Besucherinnen und Besucher, das Museum schließt in fünfzehn Minuten. Bitte gehen Sie langsam zum Ausgang. Der Museumsshop ist noch bis achtzehn Uhr geöffnet.',
  }, [
    q('detail', 'Was passiert in 15 Minuten?', ['Das Museum schließt.', 'Der Shop öffnet.', 'Eine Führung beginnt.', 'Das Café schließt.'], '„das Museum schließt in fünfzehn Minuten“'),
    q('detail', 'Bis wann kann man im Shop einkaufen?', ['Bis 18 Uhr', 'Bis 17:15 Uhr', 'Bis 15 Uhr', 'Bis 18:15 Uhr'], '„bis achtzehn Uhr geöffnet“'),
  ]),

  // ───────────── B1 ─────────────
  passage('listening', 'B1', 1, 'Radiointerview', {
    context: 'Sie hören ein kurzes Interview im Radio.',
    lines: [
      { speaker: 'Moderator', text: 'Frau Berger, Sie haben vor zwei Jahren ein Repair-Café gegründet. Was passiert da genau?' },
      { speaker: 'Berger', text: 'Die Leute bringen kaputte Sachen mit – Toaster, Lampen, Fahrräder – und Ehrenamtliche helfen ihnen, sie selbst zu reparieren. Es geht nicht nur ums Sparen, sondern auch darum, weniger wegzuwerfen.' },
      { speaker: 'Moderator', text: 'Und wer kommt zu Ihnen?' },
      { speaker: 'Berger', text: 'Ganz unterschiedlich: Studierende, Familien, viele Rentner. Und die Rentner sind oft die besten Reparateure!' },
    ],
  }, [
    q('gist', 'Was ist ein Repair-Café?', ['Ein Ort, an dem man mit Hilfe Dinge selbst repariert', 'Ein Geschäft für gebrauchte Geräte', 'Ein Café nur für Rentner', 'Eine Werkstatt, die Reparaturen verkauft'], 'Volunteers help people repair their own things.'),
    q('detail', 'Was ist ein Ziel neben dem Sparen?', ['Weniger wegzuwerfen', 'Geld zu verdienen', 'Neue Geräte zu verkaufen', 'Kaffee anzubieten'], '„auch darum, weniger wegzuwerfen“'),
    q('inference', 'Was sagt Frau Berger über die Rentner?', ['Sie reparieren oft besonders gut.', 'Sie kommen selten.', 'Sie brauchen viel Hilfe.', 'Sie trinken viel Kaffee.'], '„die besten Reparateure“'),
  ]),
  passage('listening', 'B1', 2, 'Gespräch unter Kollegen', {
    context: 'Zwei Kollegen sprechen im Büro.',
    lines: [
      { speaker: 'A', text: 'Kommst du morgen mit zum Betriebsausflug?' },
      { speaker: 'B', text: 'Eigentlich wollte ich, aber meine Tochter hat Fieber. Wenn es ihr bis morgen nicht besser geht, bleibe ich zu Hause.' },
      { speaker: 'A', text: 'Verstehe. Sag mir einfach morgen früh Bescheid, dann sage ich dem Chef, dass du vielleicht fehlst.' },
    ],
  }, [
    q('detail', 'Warum ist es unsicher, ob B mitkommt?', ['Die Tochter ist krank.', 'B hat keine Lust.', 'B muss arbeiten.', 'Der Chef erlaubt es nicht.'], '„meine Tochter hat Fieber“'),
    q('detail', 'Was soll B morgen früh tun?', ['Dem Kollegen Bescheid sagen', 'Den Chef anrufen', 'Zum Arzt gehen', 'Den Ausflug absagen'], '„Sag mir einfach morgen früh Bescheid“'),
  ]),
  passage('listening', 'B1', 3, 'Durchsage beim Stadtfest', {
    context: 'Sie hören eine Durchsage auf einem Stadtfest.',
    text: 'Herzlich willkommen beim Stadtfest! Bitte beachten Sie: Wegen des starken Windes findet das Konzert nicht wie geplant um zwanzig Uhr auf der Hauptbühne statt, sondern wird in die Stadthalle verlegt. Beginn ist um zwanzig Uhr dreißig. Ihre Eintrittskarten bleiben gültig.',
  }, [
    q('detail', 'Was ändert sich?', ['Ort und Uhrzeit des Konzerts', 'Nur der Eintrittspreis', 'Das Konzert fällt aus.', 'Nur die Band'], 'Stadthalle instead of main stage, 20:30 instead of 20:00.'),
    q('detail', 'Was gilt für die Eintrittskarten?', ['Sie bleiben gültig.', 'Man muss neue kaufen.', 'Man bekommt das Geld zurück.', 'Sie gelten nur bis 20 Uhr.'], '„Ihre Eintrittskarten bleiben gültig.“'),
  ]),
  passage('listening', 'B1', 4, 'Podcast', {
    context: 'Sie hören einen Ausschnitt aus einem Gesundheits-Podcast.',
    text: 'Viele Menschen schauen abends noch lange aufs Handy und wundern sich, dass sie nicht einschlafen können. Das blaue Licht der Bildschirme signalisiert dem Gehirn, dass es noch Tag ist. Mein Tipp: Legen Sie das Handy eine Stunde vor dem Schlafengehen weg und lesen Sie lieber ein Buch. Und trinken Sie nach fünfzehn Uhr keinen Kaffee mehr.',
  }, [
    q('detail', 'Warum stört das Handy beim Einschlafen?', ['Das Licht signalisiert dem Gehirn, dass es Tag ist.', 'Es ist zu laut.', 'Man bekommt zu viele Nachrichten.', 'Man trinkt dabei Kaffee.'], '„signalisiert dem Gehirn, dass es noch Tag ist“'),
    q('detail', 'Was empfiehlt die Sprecherin?', ['Eine Stunde vor dem Schlafen kein Handy mehr', 'Vor dem Schlafen Kaffee trinken', 'Länger schlafen', 'Früher aufstehen'], '„Legen Sie das Handy eine Stunde vor dem Schlafengehen weg“'),
  ]),
  passage('listening', 'B1', 5, 'Im Reisebüro', {
    context: 'Eine Kundin spricht mit einem Mitarbeiter im Reisebüro.',
    lines: [
      { speaker: 'A', text: 'Ich möchte im Juli eine Woche ans Meer, aber es sollte nicht zu teuer sein.' },
      { speaker: 'B', text: 'Da hätte ich etwas an der Ostsee: ein kleines Hotel direkt am Strand, mit Frühstück fünfundachtzig Euro pro Nacht.' },
      { speaker: 'A', text: 'Hm, gibt es auch etwas mit Küche? Ich koche gern selbst.' },
      { speaker: 'B', text: 'Dann empfehle ich Ihnen eine Ferienwohnung – die ist sogar etwas günstiger.' },
    ],
  }, [
    q('detail', 'Was ist der Kundin wichtig?', ['Eine Unterkunft mit Küche, die nicht zu teuer ist', 'Ein Hotel mit Frühstück', 'Eine Reise ins Gebirge', 'Ein Hotel mit Pool'], 'Not too expensive + she wants to cook herself.'),
    q('detail', 'Was empfiehlt der Mitarbeiter am Ende?', ['Eine Ferienwohnung', 'Das Hotel am Strand', 'Eine Reise im August', 'Einen Campingplatz'], '„Dann empfehle ich Ihnen eine Ferienwohnung“'),
  ]),
  passage('listening', 'B1', 6, 'Nachrichten', {
    context: 'Sie hören eine Meldung im Radio.',
    text: 'Die Stadt Freiburg testet ab Montag kostenlose Busse am Wochenende. Der Versuch läuft zunächst sechs Monate. Danach soll entschieden werden, ob das Angebot dauerhaft eingeführt wird. Die Stadt hofft, dass dadurch weniger Menschen mit dem Auto in die Innenstadt fahren.',
  }, [
    q('gist', 'Was testet die Stadt?', ['Kostenlose Busse am Wochenende', 'Neue Buslinien', 'Autofreie Tage', 'Teurere Parkplätze'], '„kostenlose Busse am Wochenende“'),
    q('detail', 'Warum macht die Stadt das?', ['Damit weniger Leute mit dem Auto fahren', 'Weil die Busse leer sind', 'Um Geld zu sparen', 'Weil es am Wochenende Staus gibt'], 'Last sentence.'),
    q('detail', 'Wie lange läuft der Versuch zunächst?', ['Ein halbes Jahr', 'Ein Jahr', 'Sechs Wochen', 'Zwei Monate'], '„sechs Monate“'),
  ]),
  passage('listening', 'B1', 7, 'In der Arztpraxis', {
    context: 'Ein Patient spricht mit seiner Ärztin.',
    lines: [
      { speaker: 'A', text: 'Seit wann haben Sie die Rückenschmerzen?' },
      { speaker: 'B', text: 'Seit ungefähr zwei Wochen. Ich sitze bei der Arbeit den ganzen Tag am Computer.' },
      { speaker: 'A', text: 'Dann verschreibe ich Ihnen erst einmal Krankengymnastik. Und versuchen Sie, jede Stunde kurz aufzustehen und sich zu bewegen.' },
    ],
  }, [
    q('inference', 'Was ist vermutlich die Ursache der Schmerzen?', ['Das lange Sitzen bei der Arbeit', 'Ein Unfall', 'Zu viel Sport', 'Eine Erkältung'], '„den ganzen Tag am Computer“'),
    q('detail', 'Was rät die Ärztin?', ['Regelmäßig aufzustehen und sich zu bewegen', 'Eine Woche im Bett zu bleiben', 'Tabletten zu nehmen', 'Den Job zu wechseln'], '„jede Stunde kurz aufzustehen und sich zu bewegen“'),
  ]),

  // ───────────── B2 ─────────────
  passage('listening', 'B2', 1, 'Radiodiskussion', {
    context: 'Sie hören einen Ausschnitt aus einer Radiodiskussion zum Thema „Autofreie Innenstadt“.',
    lines: [
      { speaker: 'Klein', text: 'Ich halte das für gefährlich. Viele unserer Kunden kommen aus dem Umland, und wenn sie nicht mehr bequem parken können, kaufen sie eben online.' },
      { speaker: 'Okafor', text: 'Studien aus anderen Städten zeigen eher das Gegenteil: Wo Fußgängerzonen entstehen, steigen die Umsätze oft, weil die Menschen länger bleiben. Entscheidend ist allerdings ein guter öffentlicher Nahverkehr.' },
    ],
  }, [
    q('detail', 'Was befürchtet Herr Klein?', ['Dass Kunden zum Online-Handel abwandern', 'Dass die Mieten steigen', 'Dass es mehr Unfälle gibt', 'Dass der Nahverkehr zu teuer wird'], '„kaufen sie eben online“'),
    q('detail', 'Womit argumentiert Frau Okafor?', ['Mit Erfahrungen aus anderen Städten', 'Mit ihren eigenen Umsätzen', 'Mit Umfragen unter Autofahrern', 'Mit den Kosten für Parkplätze'], '„Studien aus anderen Städten“'),
    q('detail', 'Welche Bedingung nennt Frau Okafor?', ['Einen guten Nahverkehr', 'Mehr Parkhäuser', 'Niedrigere Mieten', 'Längere Öffnungszeiten'], '„Entscheidend ist … ein guter öffentlicher Nahverkehr.“'),
  ]),
  passage('listening', 'B2', 2, 'Vortrag', {
    context: 'Sie hören den Anfang eines Vortrags über Stress.',
    text: 'Wenn wir über Stress sprechen, denken wir meist an etwas Negatives. Dabei ist kurzfristiger Stress durchaus nützlich: Er macht uns wach und leistungsfähig, etwa vor einer Prüfung. Problematisch wird es erst, wenn die Anspannung dauerhaft anhält und keine Erholungsphasen mehr folgen. Dann steigt das Risiko für Schlafstörungen, Bluthochdruck und Depressionen.',
  }, [
    q('detail', 'Was sagt der Sprecher über kurzfristigen Stress?', ['Er kann nützlich sein.', 'Er ist immer schädlich.', 'Er führt zu Depressionen.', 'Er tritt nur bei Prüfungen auf.'], '„kurzfristiger Stress [ist] durchaus nützlich“'),
    q('detail', 'Wann wird Stress laut Sprecher gefährlich?', ['Wenn er lange anhält und Erholung fehlt', 'Wenn man jung ist', 'Wenn man Sport treibt', 'Vor jeder Prüfung'], '„wenn die Anspannung dauerhaft anhält“'),
  ]),
  passage('listening', 'B2', 3, 'Vorstellungsgespräch', {
    context: 'Sie hören einen Ausschnitt aus einem Vorstellungsgespräch. Die Bewerberin antwortet.',
    lines: [
      { speaker: 'A', text: 'Warum möchten Sie bei uns arbeiten?' },
      { speaker: 'B', text: 'Ich habe gelesen, dass Sie stark in erneuerbare Energien investieren. Genau in diesem Bereich möchte ich mich weiterentwickeln. In meiner jetzigen Firma gibt es dafür leider kaum Möglichkeiten.' },
      { speaker: 'A', text: 'Und wie stehen Sie zu Dienstreisen? Die Stelle erfordert etwa zwei Reisen pro Monat.' },
      { speaker: 'B', text: 'Das ist für mich kein Problem, im Gegenteil.' },
    ],
  }, [
    q('detail', 'Warum möchte die Bewerberin die Stelle?', ['Sie möchte sich im Bereich erneuerbare Energien weiterentwickeln.', 'Sie verdient jetzt zu wenig.', 'Sie möchte weniger reisen.', 'Ihre Firma schließt.'], '„Genau in diesem Bereich möchte ich mich weiterentwickeln.“'),
    q('inference', 'Wie steht sie zu Dienstreisen?', ['Positiv', 'Ablehnend', 'Unentschlossen', 'Sie stellt Bedingungen.'], '„kein Problem, im Gegenteil“ – she even likes them.'),
  ]),
  passage('listening', 'B2', 4, 'Verkehrsmeldung', {
    context: 'Sie hören eine Verkehrsmeldung.',
    text: 'Nach heftigen Regenfällen ist die A7 zwischen Kassel und Göttingen in beiden Richtungen gesperrt. Ein Hang ist auf die Fahrbahn gerutscht. Die Polizei rechnet damit, dass die Sperrung mindestens bis morgen Mittag andauert, und empfiehlt, das Gebiet weiträumig zu umfahren.',
  }, [
    q('detail', 'Warum ist die Autobahn gesperrt?', ['Wegen eines Erdrutsches nach Regen', 'Wegen eines Unfalls', 'Wegen Bauarbeiten', 'Wegen Schnee'], '„Ein Hang ist auf die Fahrbahn gerutscht.“'),
    q('detail', 'Was empfiehlt die Polizei?', ['Die Region großräumig zu umfahren', 'Langsam zu fahren', 'Bis morgen im Auto zu warten', 'Die Bahn zu nehmen'], '„das Gebiet weiträumig zu umfahren“'),
  ]),
  passage('listening', 'B2', 5, 'Nach dem Kino', {
    context: 'Zwei Freunde sprechen nach dem Kino über einen Film.',
    lines: [
      { speaker: 'A', text: 'Und, wie fandest du den Film?' },
      { speaker: 'B', text: 'Ehrlich gesagt hatte ich mehr erwartet. Die Schauspieler waren stark, keine Frage, aber die Handlung war doch ziemlich vorhersehbar.' },
      { speaker: 'A', text: 'Echt? Mich hat das Ende total überrascht.' },
      { speaker: 'B', text: 'Na ja, mich nicht. Ab der Hälfte war mir klar, wer der Täter ist.' },
    ],
  }, [
    q('detail', 'Was kritisiert B?', ['Die vorhersehbare Handlung', 'Die schwachen Schauspieler', 'Die Länge des Films', 'Die Musik'], '„die Handlung war doch ziemlich vorhersehbar“'),
    q('inference', 'Wie unterscheiden sich die Meinungen?', ['A war vom Ende überrascht, B nicht.', 'Beide fanden den Film schlecht.', 'Beide waren vom Ende überrascht.', 'B fand die Schauspieler schwach.'], 'A: „total überrascht“ – B: „mich nicht“.'),
  ]),
  passage('listening', 'B2', 6, 'Stadtführung', {
    context: 'Sie hören einen Ausschnitt aus einer Stadtführung.',
    text: 'Wir stehen hier vor dem ältesten Gebäude der Stadt, dem ehemaligen Kornspeicher aus dem vierzehnten Jahrhundert. Hier wurde früher das Getreide für Notzeiten gelagert. Nach einem Brand im neunzehnten Jahrhundert stand das Haus lange leer, bis es vor zwanzig Jahren aufwendig restauriert wurde. Heute befindet sich darin die Stadtbibliothek.',
  }, [
    q('detail', 'Wofür wurde das Gebäude ursprünglich genutzt?', ['Zur Lagerung von Getreide', 'Als Bibliothek', 'Als Rathaus', 'Als Wohnhaus'], 'Kornspeicher = granary.'),
    q('detail', 'Was ist heute in dem Gebäude?', ['Die Stadtbibliothek', 'Ein Museum', 'Ein Getreidelager', 'Nichts – es steht leer.'], '„Heute befindet sich darin die Stadtbibliothek.“'),
    q('detail', 'Wann wurde es restauriert?', ['Vor zwanzig Jahren', 'Im 19. Jahrhundert', 'Im 14. Jahrhundert', 'Letztes Jahr'], '„vor zwanzig Jahren aufwendig restauriert“'),
  ]),
  passage('listening', 'B2', 7, 'Nachricht der Hausverwaltung', {
    context: 'Sie hören eine Nachricht auf dem Anrufbeantworter.',
    text: 'Guten Tag, Herr Demir, hier spricht Frau Lorenz von der Hausverwaltung. Wegen Arbeiten an der Wasserleitung wird am Donnerstag zwischen acht und vierzehn Uhr das Wasser abgestellt. Bitte füllen Sie sich vorher ausreichend Wasser ab. Falls Sie Fragen haben, erreichen Sie mich unter der bekannten Nummer.',
  }, [
    q('gist', 'Was passiert am Donnerstag?', ['Das Wasser wird für einige Stunden abgestellt.', 'Die Heizung wird repariert.', 'Die Miete wird erhöht.', 'Herr Demir muss ausziehen.'], '„wird … das Wasser abgestellt“'),
    q('detail', 'Was soll Herr Demir tun?', ['Sich vorher Wasser abfüllen', 'Den ganzen Tag zu Hause bleiben', 'Die Hausverwaltung besuchen', 'Die Handwerker bezahlen'], '„Bitte füllen Sie sich vorher ausreichend Wasser ab.“'),
  ]),

  // ───────────── C1 ─────────────
  passage('listening', 'C1', 1, 'Vorlesung (Ausschnitt)', {
    context: 'Sie hören einen Ausschnitt aus einer Vorlesung über Spracherwerb.',
    text: 'Lassen Sie mich mit einem Missverständnis aufräumen: Die Annahme, Mehrsprachigkeit verwirre Kinder und verzögere ihre Entwicklung, hält sich hartnäckig, ist wissenschaftlich aber kaum haltbar. Zwar mischen mehrsprachige Kinder phasenweise ihre Sprachen – das ist jedoch kein Zeichen von Überforderung, sondern ein kreativer Umgang mit ihren Ressourcen. Langfristig zeigen sich sogar Vorteile, etwa bei der Fähigkeit, die Aufmerksamkeit flexibel zu steuern.',
  }, [
    q('gist', 'Welches Ziel verfolgt die Sprecherin?', ['Ein verbreitetes Vorurteil zu widerlegen', 'Eltern vor Mehrsprachigkeit zu warnen', 'Eine neue Lernmethode vorzustellen', 'Von ihrer eigenen Kindheit zu berichten'], '„mit einem Missverständnis aufräumen“'),
    q('detail', 'Wie deutet sie das Mischen von Sprachen?', ['Als kreativen Umgang mit Ressourcen', 'Als Zeichen von Überforderung', 'Als Entwicklungsverzögerung', 'Als Folge schlechten Unterrichts'], 'Stated explicitly.'),
    q('detail', 'Welcher langfristige Vorteil wird genannt?', ['Flexiblere Steuerung der Aufmerksamkeit', 'Ein größerer Wortschatz in jeder Sprache', 'Bessere Schulnoten', 'Weniger Fehler beim Sprechen'], 'Last sentence.'),
  ]),
  passage('listening', 'C1', 2, 'Radiokommentar', {
    context: 'Sie hören einen Kommentar im Radio.',
    text: 'Nun also auch noch die Kühlschränke. Ab nächstem Jahr sollen sie uns per App mitteilen, dass die Milch zur Neige geht. Man fragt sich, wie die Menschheit es all die Jahrtausende geschafft hat, ohne dass ihr ein Haushaltsgerät den Füllstand ihrer Vorräte meldet. Vermutlich durch einen Blick hinein.',
  }, [
    q('inference', 'Welche Haltung hat der Sprecher?', ['Er macht sich über überflüssige Technik lustig.', 'Er freut sich auf die neue Funktion.', 'Er erklärt sachlich die Technik.', 'Er warnt vor gefährlichen Geräten.'], 'Ironic tone throughout.'),
    q('inference', 'Was meint er mit „Vermutlich durch einen Blick hinein“?', ['Die Funktion ist unnötig, weil man einfach nachsehen kann.', 'Man sollte öfter in den Kühlschrank schauen.', 'Kühlschränke brauchen Kameras.', 'Früher gab es keine Kühlschränke.'], 'The punchline exposes the gadget as pointless.'),
  ]),
  passage('listening', 'C1', 3, 'Interview', {
    context: 'Sie hören ein Interview mit einem Arbeitsforscher.',
    lines: [
      { speaker: 'Journalistin', text: 'Herr Professor Wendt, viele Unternehmen setzen inzwischen auf künstliche Intelligenz bei der Auswahl von Bewerbern. Ist das fairer als ein menschliches Urteil?' },
      { speaker: 'Wendt', text: 'Das wird gern behauptet, greift aber zu kurz. Algorithmen lernen aus historischen Daten – und wenn in der Vergangenheit bestimmte Gruppen benachteiligt wurden, reproduziert das System diese Muster, nur eben unsichtbarer. Ich plädiere nicht für ein Verbot, wohl aber für Transparenz und regelmäßige Überprüfungen.' },
    ],
  }, [
    q('detail', 'Warum sind KI-Auswahlverfahren laut Wendt nicht automatisch fairer?', ['Sie übernehmen Benachteiligungen aus alten Daten.', 'Sie sind zu teuer.', 'Sie arbeiten zu langsam.', 'Sie lehnen alle Bewerber ab.'], '„reproduziert das System diese Muster“'),
    q('detail', 'Was fordert Wendt?', ['Transparenz und regelmäßige Kontrollen', 'Ein Verbot von KI', 'Mehr Daten aus der Vergangenheit', 'Dass nur Menschen entscheiden'], '„nicht für ein Verbot, wohl aber für Transparenz“'),
    q('vocab', '„greift zu kurz“ bedeutet:', ['ist zu einfach gedacht', 'ist völlig falsch', 'ist zu teuer', 'ist sehr ausführlich'], 'zu kurz greifen = to fall short, be too simplistic.'),
  ]),
  passage('listening', 'C1', 4, 'Durchsage auf einer Tagung', {
    context: 'Sie hören eine Durchsage auf einer wissenschaftlichen Tagung.',
    text: 'Sehr geehrte Damen und Herren, aufgrund der großen Nachfrage wird der Workshop „Wissenschaftliches Schreiben“ zusätzlich am Nachmittag angeboten. Teilnehmende, die bereits für den Vormittagstermin angemeldet sind, können auf Wunsch wechseln, sofern sie dies bis zwölf Uhr am Informationsstand mitteilen. Die Teilnehmerzahl ist weiterhin auf fünfundzwanzig Personen begrenzt.',
  }, [
    q('detail', 'Was ist neu?', ['Der Workshop findet zusätzlich am Nachmittag statt.', 'Der Workshop fällt aus.', 'Die Teilnehmerzahl wurde erhöht.', 'Der Workshop wird in einen anderen Raum verlegt.'], '„zusätzlich am Nachmittag angeboten“'),
    q('detail', 'Unter welcher Bedingung kann man wechseln?', ['Wenn man es bis 12 Uhr am Infostand mitteilt', 'Wenn man eine Gebühr zahlt', 'Wenn mehr als 25 Plätze frei sind', 'Gar nicht'], '„sofern sie dies bis zwölf Uhr am Informationsstand mitteilen“'),
  ]),
  passage('listening', 'C1', 5, 'Gespräch am Arbeitsplatz', {
    context: 'Eine Mitarbeiterin (A) spricht mit ihrem Vorgesetzten (B).',
    lines: [
      { speaker: 'A', text: 'Also, wenn ich das richtig verstehe, soll ich das Projekt zusätzlich übernehmen – bei gleichem Gehalt?' },
      { speaker: 'B', text: 'Na ja, so würde ich das nicht formulieren. Es ist eher eine Chance, sich für die Teamleitung zu empfehlen.' },
      { speaker: 'A', text: 'Eine Chance, die mich allerdings jede Woche zehn Überstunden kostet. Ich bin ja nicht grundsätzlich dagegen, aber dann müssten wir schon über eine Anpassung reden.' },
    ],
  }, [
    q('inference', 'Welche Haltung hat die Mitarbeiterin?', ['Sie ist bereit, aber nur zu besseren Bedingungen.', 'Sie lehnt das Projekt grundsätzlich ab.', 'Sie ist begeistert.', 'Sie versteht die Aufgabe nicht.'], '„nicht grundsätzlich dagegen, aber … über eine Anpassung reden“'),
    q('inference', 'Wie versucht der Vorgesetzte, die Aufgabe darzustellen?', ['Als Aufstiegschance', 'Als Strafe', 'Als kurzfristige Notlösung', 'Als bezahlte Überstunden'], '„eine Chance, sich für die Teamleitung zu empfehlen“'),
  ]),
  passage('listening', 'C1', 6, 'Radiofeature', {
    context: 'Sie hören einen Ausschnitt aus einer Radiosendung über Gemeinschaftsgärten.',
    text: 'Was als Protest gegen ungenutzte Brachflächen begann, ist inzwischen fester Bestandteil vieler Stadtentwicklungskonzepte: Gemeinschaftsgärten. Ihre Befürworter betonen den sozialen Aspekt – hier begegnen sich Menschen, die sonst kaum Berührungspunkte hätten. Kritische Stimmen geben jedoch zu bedenken, dass die Gärten mitunter zur Aufwertung ganzer Viertel beitragen – mit der Folge, dass gerade jene, die sie gegründet haben, sich die Mieten bald nicht mehr leisten können.',
  }, [
    q('detail', 'Wie haben die Gemeinschaftsgärten angefangen?', ['Als Protest gegen ungenutzte Flächen', 'Als Projekt der Stadtverwaltung', 'Als kommerzielles Angebot', 'Als Schulprojekt'], 'First sentence.'),
    q('detail', 'Was betonen die Befürworter?', ['Die Gärten bringen unterschiedliche Menschen zusammen.', 'Die Gärten senken die Mieten.', 'Die Gärten produzieren viel Gemüse.', 'Die Gärten ersetzen Parks.'], '„hier begegnen sich Menschen …“'),
    q('inference', 'Welches Paradox sehen die Kritiker?', ['Die Gärten können zur Verdrängung ihrer eigenen Gründer beitragen.', 'Die Gärten sind zu klein.', 'Niemand nutzt die Gärten.', 'Die Gärten zerstören Grünflächen.'], 'Upgrading → higher rents → founders priced out.'),
  ]),

  // ───────────── C2 ─────────────
  passage('listening', 'C2', 1, 'Essay im Radio', {
    context: 'Sie hören einen Radio-Essay.',
    text: 'Es ist eine merkwürdige Eigenheit unserer Zeit, dass wir Geduld zwar als Tugend preisen, sie im Alltag aber systematisch abschaffen. Lieferungen am selben Tag, Serien, die man an einem Wochenende verschlingt, Antworten in Sekunden – all das ist bequem, keine Frage. Nur: Wer nie warten muss, verlernt womöglich auch, Spannung auszuhalten, und mit ihr die Vorfreude, die ja nichts anderes ist als ein genussvoll ertragenes Warten.',
  }, [
    q('gist', 'Worum geht es dem Sprecher?', ['Um den Verlust von Geduld und Vorfreude durch ständige Verfügbarkeit', 'Um die Vorteile schneller Lieferdienste', 'Um die Qualität moderner Serien', 'Um Tipps für mehr Geduld'], 'The essay laments the loss of waiting.'),
    q('inference', 'Wie definiert er Vorfreude?', ['Als ein Warten, das man genießt', 'Als Ungeduld', 'Als Bequemlichkeit', 'Als schnelle Belohnung'], '„ein genussvoll ertragenes Warten“'),
    q('inference', 'Wie steht er zur Bequemlichkeit?', ['Er erkennt sie an, sieht aber einen Preis.', 'Er lehnt sie völlig ab.', 'Er hält sie für unproblematisch.', 'Er äußert sich nicht dazu.'], '„bequem, keine Frage. Nur: …“'),
  ]),
  passage('listening', 'C2', 2, 'Ironischer Dialog', {
    context: 'Zwei Mitbewohner unterhalten sich.',
    lines: [
      { speaker: 'A', text: 'Du hast doch nicht etwa schon wieder ein neues Fahrrad gekauft?' },
      { speaker: 'B', text: 'Na ja, „neu“ ist relativ. Es ist gebraucht.' },
      { speaker: 'A', text: 'Ach so, dann ist es ja quasi gespart.' },
      { speaker: 'B', text: 'Genau so sehe ich das!' },
      { speaker: 'A', text: 'Das war ironisch gemeint.' },
    ],
  }, [
    q('inference', 'Was drückt A mit der ersten Frage aus?', ['Missbilligendes Erstaunen', 'Freude', 'Gleichgültigkeit', 'Echtes Interesse am Fahrrad'], '„doch nicht etwa schon wieder“ – disapproving surprise.'),
    q('inference', 'Wie versteht B die Bemerkung „dann ist es ja quasi gespart“?', ['Als Zustimmung, obwohl sie ironisch gemeint war', 'Als Kritik', 'Als Frage', 'Als Witz über Fahrräder'], 'B agrees enthusiastically; A clarifies it was ironic.'),
  ]),
  passage('listening', 'C2', 3, 'Wissenschaftlicher Vortrag', {
    context: 'Sie hören einen Ausschnitt aus einem wissenschaftstheoretischen Vortrag.',
    text: 'Die gängige Unterscheidung zwischen „harten“ und „weichen“ Wissenschaften suggeriert eine Rangordnung, die sich bei näherem Hinsehen kaum aufrechterhalten lässt. Gerade die Sozialwissenschaften haben es mit Gegenständen zu tun, die auf ihre Beschreibung reagieren: Eine Prognose über das Wahlverhalten kann dieses Verhalten selbst verändern. Diese Reflexivität macht die Disziplinen nicht weniger wissenschaftlich, sondern stellt sie vor methodische Probleme eigener Art.',
  }, [
    q('gist', 'Was kritisiert der Sprecher?', ['Die stillschweigende Rangordnung zwischen „harten“ und „weichen“ Wissenschaften', 'Die Methoden der Naturwissenschaften', 'Falsche Wahlprognosen', 'Die Sozialwissenschaften als unwissenschaftlich'], 'First sentence.'),
    q('detail', 'Was versteht er unter „Reflexivität“?', ['Dass der Gegenstand auf seine Beschreibung reagiert', 'Dass Forscher über sich selbst nachdenken', 'Dass Ergebnisse wiederholbar sind', 'Dass Prognosen immer stimmen'], 'The election forecast example.'),
  ]),
  passage('listening', 'C2', 4, 'Pressemitteilung', {
    context: 'Sie hören einen Bericht über eine Pressemitteilung.',
    text: 'Der Ausschuss teilte mit, man habe die Vorwürfe eingehend geprüft. Es lägen keine Hinweise darauf vor, dass gegen geltende Vorschriften verstoßen worden sei. Gleichwohl werde man die internen Abläufe überarbeiten, um künftig jeden Anschein von Interessenkonflikten zu vermeiden.',
  }, [
    q('detail', 'Was ist das Ergebnis der Prüfung?', ['Es wurden keine Hinweise auf Verstöße gefunden.', 'Die Vorwürfe wurden bestätigt.', 'Die Prüfung ist noch nicht abgeschlossen.', 'Es gab einen Interessenkonflikt.'], '„Es lägen keine Hinweise … vor“'),
    q('inference', 'Warum werden die Abläufe trotzdem geändert?', ['Um schon den Anschein von Konflikten zu vermeiden', 'Weil Regeln verletzt wurden', 'Weil ein Gericht es verlangt', 'Um Kosten zu sparen'], '„um künftig jeden Anschein … zu vermeiden“'),
    q('detail', 'Wie gibt der Sprecher die Aussagen des Ausschusses wieder?', ['In indirekter Rede mit Konjunktiv I', 'Als eigene Meinung', 'Als wörtliches Zitat', 'Im Imperativ'], 'habe geprüft, lägen vor, sei verstoßen worden, werde überarbeiten.'),
  ]),
  passage('listening', 'C2', 5, 'Lesung', {
    context: 'Sie hören einen Ausschnitt aus einer Lesung.',
    text: 'Sie las den Brief zweimal, faltete ihn sorgfältig zusammen und legte ihn in die Schublade, in der sie Dinge aufbewahrte, über die sie nicht nachdenken wollte. Erst am Abend, als das Haus still war, holte sie ihn wieder hervor – nicht, um ihn ein drittes Mal zu lesen, sondern um sich zu vergewissern, dass er noch da war.',
  }, [
    q('inference', 'Welche Beziehung hat sie zu dem Brief?', ['Er beschäftigt sie, obwohl sie das vermeiden will.', 'Er ist ihr gleichgültig.', 'Sie hat ihn noch nicht gelesen.', 'Sie will ihn sofort beantworten.'], 'She puts it away „über die sie nicht nachdenken wollte“ – but takes it out again.'),
    q('detail', 'Warum holt sie den Brief am Abend hervor?', ['Um zu prüfen, ob er noch da ist', 'Um ihn noch einmal zu lesen', 'Um ihn wegzuwerfen', 'Um ihn zu beantworten'], '„um sich zu vergewissern, dass er noch da war“'),
  ]),
  passage('listening', 'C2', 6, 'Streitgespräch', {
    context: 'Sie hören einen Ausschnitt aus einem Streitgespräch über das bedingungslose Grundeinkommen.',
    lines: [
      { speaker: 'A', text: 'Sie behaupten, ein Grundeinkommen würde die Leute faul machen. Die Pilotstudien zeigen aber keinen nennenswerten Rückgang der Erwerbstätigkeit.' },
      { speaker: 'B', text: 'Pilotstudien, wohlgemerkt, die zeitlich befristet waren. Wer weiß, dass die Zahlung in zwei Jahren endet, verhält sich naturgemäß anders als jemand, der lebenslang damit rechnen kann.' },
      { speaker: 'A', text: 'Das mag sein. Aber dann ist Ihr Einwand ebenso wenig belegt wie meine These widerlegt.' },
    ],
  }, [
    q('detail', 'Welchen methodischen Einwand bringt B vor?', ['Die Studien waren befristet und daher nur begrenzt aussagekräftig.', 'Die Studien hatten zu wenige Teilnehmer.', 'Die Studien wurden gefälscht.', 'Die Studien zeigen einen starken Rückgang.'], '„zeitlich befristet“'),
    q('inference', 'Was meint A mit der letzten Bemerkung?', ['Auch Bs Einwand ist nicht bewiesen.', 'A gibt B vollständig recht.', 'A zieht die eigene These zurück.', 'B hat die Studien falsch gelesen.'], '„ebenso wenig belegt wie meine These widerlegt“'),
    q('vocab', '„wohlgemerkt“ dient hier dazu, …', ['einen wichtigen Umstand hervorzuheben', 'eine Frage zu stellen', 'zuzustimmen', 'das Thema zu wechseln'], 'wohlgemerkt = mind you.'),
  ]),
];
