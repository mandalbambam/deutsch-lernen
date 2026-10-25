import { mc, tf, type ReadingText } from './types';

export const A_TEXTS: ReadingText[] = [
  // ───────────── A1 ─────────────
  {
    id: 'a1-ich-bin-lena',
    level: 'A1',
    title: 'Hallo, ich bin Lena',
    genre: 'Self-introduction',
    topics: ['people', 'work'],
    text: `Hallo! Ich heiße Lena Schmidt. Ich bin 28 Jahre alt und komme aus Leipzig. Jetzt wohne ich in Hamburg.

Ich bin Krankenschwester von Beruf und arbeite in einem Krankenhaus. Die Arbeit ist anstrengend, aber sie macht mir Spaß.

Ich habe einen Bruder. Er heißt Jonas und wohnt noch in Leipzig. Er ist Student.

In meiner Freizeit lese ich gern, und ich koche oft für meine Freunde. Am Wochenende gehe ich manchmal ins Kino. Ich spreche Deutsch und Englisch. Jetzt lerne ich Spanisch, denn im Sommer möchte ich nach Spanien fahren.`,
    questions: [
      tf('Lena wohnt in Leipzig.', false, 'She comes from Leipzig, but now she lives in Hamburg.'),
      mc('Was ist Lena von Beruf?', ['Krankenschwester', 'Studentin', 'Lehrerin', 'Köchin'], '„Ich bin Krankenschwester von Beruf“ — she is a nurse.'),
      tf('Jonas ist Lenas Bruder.', true, '„Ich habe einen Bruder. Er heißt Jonas.“'),
      mc('Warum lernt Lena Spanisch?', ['Sie möchte im Sommer nach Spanien fahren.', 'Sie arbeitet in Spanien.', 'Ihr Bruder wohnt in Spanien.', 'Sie hat einen spanischen Freund.'], '„denn im Sommer möchte ich nach Spanien fahren“ — denn gives the reason.'),
      tf('Lena kocht nie.', false, 'She often cooks for her friends: „ich koche oft für meine Freunde“.'),
    ],
  },
  {
    id: 'a1-mein-tag',
    level: 'A1',
    title: 'Ein Tag von Murat',
    genre: 'Description',
    topics: ['work', 'people'],
    text: `Murat Yilmaz ist Busfahrer in Köln. Sein Tag beginnt sehr früh. Er steht um halb fünf auf und trinkt einen Kaffee. Um Viertel nach fünf fährt er mit dem Fahrrad zur Arbeit.

Von sechs bis vierzehn Uhr fährt Murat Bus. Er fährt immer die Linie 136. Viele Leute kennen ihn und sagen: „Guten Morgen, Murat!“ Um zehn Uhr macht er eine Pause und isst ein Brötchen.

Am Nachmittag holt er seine Tochter vom Kindergarten ab. Dann spielen sie zusammen im Park. Abends kocht seine Frau, und die Familie isst um sieben Uhr. Um zehn Uhr geht Murat ins Bett. Er ist dann sehr müde.`,
    questions: [
      mc('Wann steht Murat auf?', ['um halb fünf', 'um Viertel nach fünf', 'um sechs Uhr', 'um zehn Uhr'], '„halb fünf“ = 4:30 (half an hour before five).'),
      mc('Wie fährt Murat zur Arbeit?', ['mit dem Fahrrad', 'mit dem Bus', 'mit dem Auto', 'zu Fuß'], '„fährt er mit dem Fahrrad zur Arbeit“.'),
      tf('Murat arbeitet acht Stunden.', true, 'From 6 to 14 o’clock = eight hours.'),
      tf('Murat kocht am Abend.', false, 'His wife cooks in the evening: „Abends kocht seine Frau“.'),
      mc('Was macht Murat am Nachmittag?', ['Er holt seine Tochter ab und spielt mit ihr.', 'Er fährt Bus.', 'Er schläft.', 'Er kauft ein.'], 'He picks up his daughter from kindergarten and they play in the park.'),
    ],
  },
  {
    id: 'a1-im-cafe',
    level: 'A1',
    title: 'Im Café am Markt',
    genre: 'Short narrative',
    topics: ['food'],
    text: `Es ist Samstag. Anna und Tom sitzen im Café am Markt. Das Café ist klein, aber sehr gemütlich.

Die Kellnerin kommt und fragt: „Was möchten Sie trinken?“ Anna nimmt einen Tee mit Zitrone. Tom trinkt lieber Kaffee. Er bestellt einen großen Milchkaffee.

Dann lesen sie die Karte. Es gibt Kuchen, Brötchen und Suppe. Anna hat Hunger. Sie bestellt eine Tomatensuppe und ein Brötchen. Tom isst nur ein Stück Apfelkuchen.

Das Essen ist gut. Am Ende möchte Tom bezahlen. Die Rechnung macht 17,50 Euro. Tom gibt der Kellnerin 20 Euro und sagt: „Stimmt so.“`,
    questions: [
      mc('Was trinkt Anna?', ['Tee mit Zitrone', 'Milchkaffee', 'Wasser', 'Orangensaft'], '„Anna nimmt einen Tee mit Zitrone.“'),
      tf('Tom hat großen Hunger und isst eine Suppe.', false, 'Anna is hungry and has the soup; Tom only eats a piece of apple cake.'),
      mc('Wie viel kostet das Essen?', ['17,50 Euro', '20 Euro', '2,50 Euro', '7,50 Euro'], '„Die Rechnung macht 17,50 Euro.“'),
      mc('„Stimmt so“ bedeutet hier:', ['Tom gibt 2,50 Euro Trinkgeld.', 'Die Rechnung ist falsch.', 'Tom möchte das Wechselgeld zurück.', 'Das Essen ist gut.'], '„Stimmt so“ = keep the change — here a tip of 2.50 euros.'),
      tf('Das Café ist groß.', false, '„Das Café ist klein, aber sehr gemütlich.“'),
    ],
  },
  {
    id: 'a1-e-mail-wohnung',
    level: 'A1',
    title: 'Eine E-Mail von Paula',
    genre: 'E-mail',
    topics: ['people'],
    text: `Liebe Sarah,

wie geht es dir? Ich habe jetzt eine neue Wohnung! Sie ist in der Gartenstraße 12, nicht weit vom Bahnhof.

Die Wohnung hat zwei Zimmer, eine Küche und ein Bad. Das Wohnzimmer ist groß und hell. Es hat einen Balkon. Die Küche ist leider sehr klein. Die Miete ist nicht billig: 750 Euro im Monat.

Meine Nachbarn sind nett. Unten wohnt eine alte Frau mit einer Katze. Neben mir wohnt eine Familie mit zwei Kindern.

Am Samstag mache ich eine Party. Hast du Zeit? Die Party beginnt um acht Uhr. Bring bitte etwas zu trinken mit!

Viele Grüße
Paula`,
    questions: [
      tf('Paula wohnt weit vom Bahnhof.', false, 'The flat is „nicht weit vom Bahnhof“ — not far from the station.'),
      mc('Wie ist die Küche?', ['klein', 'groß und hell', 'neu', 'billig'], '„Die Küche ist leider sehr klein.“ The living room is big and bright.'),
      mc('Wer wohnt neben Paula?', ['eine Familie mit zwei Kindern', 'eine alte Frau mit einer Katze', 'Sarah', 'ein Student'], 'The old woman lives downstairs (unten); a family lives next door (neben mir).'),
      tf('Die Party ist am Samstag um acht Uhr.', true, '„Am Samstag mache ich eine Party … Die Party beginnt um acht Uhr.“'),
      mc('Was soll Sarah mitbringen?', ['etwas zu trinken', 'einen Kuchen', 'eine Katze', 'nichts'], '„Bring bitte etwas zu trinken mit!“'),
    ],
  },
  {
    id: 'a1-wochenende',
    level: 'A1',
    title: 'Das Wochenende von Familie Weber',
    genre: 'Description',
    topics: ['sport', 'people'],
    text: `Familie Weber hat am Wochenende viel vor. Am Samstagmorgen spielt der Sohn Felix Fußball. Er ist zehn Jahre alt und spielt in einem Verein. Seine Mutter fährt ihn zum Sportplatz und sieht das Spiel.

Herr Weber geht am Samstag joggen. Er läuft jeden Samstag zehn Kilometer im Wald. Danach kauft er auf dem Markt Obst und Gemüse.

Am Sonntag schläft die ganze Familie lange. Um elf Uhr frühstücken sie zusammen. Am Nachmittag möchten sie mit den Fahrrädern an den See fahren. Aber es regnet. Sie bleiben zu Hause und spielen Karten.`,
    questions: [
      tf('Felix spielt am Samstag Fußball.', true, '„Am Samstagmorgen spielt der Sohn Felix Fußball.“'),
      mc('Was macht Herr Weber am Samstag?', ['Er joggt und kauft auf dem Markt ein.', 'Er spielt Fußball.', 'Er fährt Felix zum Sportplatz.', 'Er schläft lange.'], 'He runs ten kilometres and then buys fruit and vegetables at the market. Felix’s mother drives him to the pitch.'),
      mc('Wann frühstückt die Familie am Sonntag?', ['um elf Uhr', 'um zehn Uhr', 'am Nachmittag', 'um acht Uhr'], '„Um elf Uhr frühstücken sie zusammen.“'),
      tf('Am Sonntag fahren sie an den See.', false, 'They want to, but it rains — so they stay at home and play cards.'),
      mc('Wie alt ist Felix?', ['zehn', 'elf', 'acht', 'zwölf'], '„Er ist zehn Jahre alt.“'),
    ],
  },
  {
    id: 'a1-freiburg',
    level: 'A1',
    title: 'Willkommen in Freiburg',
    genre: 'City portrait',
    topics: ['travel', 'nature'],
    text: `Freiburg ist eine Stadt im Südwesten von Deutschland. Sie liegt nicht weit von Frankreich und der Schweiz. In Freiburg wohnen etwa 230.000 Menschen. Viele sind Studenten.

Die Altstadt ist sehr schön. Es gibt ein großes Münster, viele kleine Straßen und Cafés. Jeden Tag – außer Sonntag – ist auf dem Münsterplatz Markt. Dort kann man Obst, Gemüse, Blumen und Würstchen kaufen.

In Freiburg fahren viele Leute Fahrrad. Das Wetter ist oft sonnig und warm. Im Sommer gehen die Menschen gern in den Schwarzwald. Dort kann man wandern oder schwimmen.`,
    questions: [
      mc('Wo liegt Freiburg?', ['im Südwesten von Deutschland', 'im Norden von Deutschland', 'in Frankreich', 'in der Schweiz'], '„eine Stadt im Südwesten von Deutschland“ — near France and Switzerland.'),
      tf('Der Markt ist auch am Sonntag.', false, '„Jeden Tag – außer Sonntag“: every day except Sunday.'),
      tf('In Freiburg fahren viele Menschen Fahrrad.', true, '„In Freiburg fahren viele Leute Fahrrad.“'),
      mc('Was kann man im Schwarzwald machen?', ['wandern oder schwimmen', 'Würstchen auf dem Markt kaufen', 'im Münster beten', 'studieren'], '„Dort kann man wandern oder schwimmen.“'),
    ],
  },

  // ───────────── A2 ─────────────
  {
    id: 'a2-urlaub-ostsee',
    level: 'A2',
    title: 'Grüße von der Ostsee',
    genre: 'Holiday e-mail',
    topics: ['travel', 'people'],
    text: `Hallo Mama, hallo Papa,

viele Grüße von der Ostsee! Wir sind jetzt schon eine Woche in Warnemünde, und es gefällt uns super. Am ersten Tag hat es leider den ganzen Tag geregnet. Deshalb sind wir ins Museum gegangen und haben danach lange in einem Café gesessen.

Aber seit Montag ist das Wetter fantastisch. Wir haben fast jeden Tag am Strand gelegen, und die Kinder sind sogar im Meer geschwommen – das Wasser ist ziemlich kalt! Gestern haben wir eine Fahrradtour nach Rostock gemacht. Das war anstrengend, aber sehr schön.

Das Essen hier ist lecker. Ich habe zum ersten Mal ein Fischbrötchen gegessen, und Lukas hat jeden Tag ein Eis gekauft.

Am Samstag fahren wir wieder nach Hause. Wir bringen euch etwas Schönes mit!

Liebe Grüße
Julia, Max und die Kinder`,
    questions: [
      tf('Am ersten Tag war das Wetter schön.', false, 'It rained all day on the first day.'),
      mc('Was hat die Familie am ersten Tag gemacht?', ['Sie war im Museum und im Café.', 'Sie hat am Strand gelegen.', 'Sie ist nach Rostock gefahren.', 'Sie ist im Meer geschwommen.'], 'Because of the rain („Deshalb“) they went to the museum and then sat in a café.'),
      mc('Wie war die Fahrradtour?', ['anstrengend, aber schön', 'langweilig', 'zu kurz', 'kalt und nass'], '„Das war anstrengend, aber sehr schön.“'),
      tf('Julia hat schon oft Fischbrötchen gegessen.', false, '„zum ersten Mal“ = for the first time.'),
      mc('Wann fährt die Familie nach Hause?', ['am Samstag', 'am Montag', 'morgen', 'in zwei Wochen'], '„Am Samstag fahren wir wieder nach Hause.“'),
    ],
  },
  {
    id: 'a2-neue-arbeit',
    level: 'A2',
    title: 'Meine erste Woche im neuen Job',
    genre: 'Blog post',
    topics: ['work'],
    text: `Seit Montag arbeite ich als Grafikdesignerin in einer Werbeagentur in Stuttgart. Ich war am ersten Tag sehr nervös, aber meine Kollegen waren alle freundlich.

Am Montagmorgen hat mir meine Chefin, Frau Berger, das Büro gezeigt. Dann habe ich meinen Computer bekommen und meine Kollegen kennengelernt. Mittags sind wir zusammen in die Kantine gegangen. Das Essen dort ist günstig und gar nicht schlecht.

Am Mittwoch hatte ich schon mein erstes Projekt: Ich soll ein Plakat für ein Konzert machen. Das macht mir viel Spaß, weil ich Musik liebe.

Etwas ist aber anstrengend: Ich muss jeden Tag eine Stunde mit dem Zug fahren. Deshalb suche ich jetzt eine Wohnung in Stuttgart. Vielleicht kann mir ein Kollege helfen – er kennt viele Leute in der Stadt.`,
    questions: [
      mc('Was ist die Autorin von Beruf?', ['Grafikdesignerin', 'Chefin', 'Musikerin', 'Köchin'], '„Seit Montag arbeite ich als Grafikdesignerin.“'),
      tf('Am ersten Tag war sie ganz ruhig.', false, 'She was very nervous: „Ich war am ersten Tag sehr nervös.“'),
      mc('Was hat Frau Berger am Montag gemacht?', ['Sie hat ihr das Büro gezeigt.', 'Sie hat ein Plakat gemacht.', 'Sie hat in der Kantine gekocht.', 'Sie hat eine Wohnung gesucht.'], '„hat mir meine Chefin, Frau Berger, das Büro gezeigt“.'),
      mc('Warum macht ihr das erste Projekt Spaß?', ['Weil sie Musik liebt.', 'Weil es einfach ist.', 'Weil sie viel Geld bekommt.', 'Weil die Chefin hilft.'], 'The poster is for a concert, and she loves music.'),
      tf('Sie sucht eine Wohnung, weil die Fahrt zur Arbeit lang ist.', true, 'She travels an hour by train every day — „Deshalb suche ich jetzt eine Wohnung“.'),
    ],
  },
  {
    id: 'a2-kartoffelsuppe',
    level: 'A2',
    title: 'Omas Kartoffelsuppe',
    genre: 'Recipe blog',
    topics: ['food', 'people'],
    text: `Heute zeige ich euch mein Lieblingsrezept: Kartoffelsuppe nach dem Rezept von meiner Oma. Sie ist einfach, billig und schmeckt besonders gut im Winter.

Für vier Personen braucht ihr: ein Kilo Kartoffeln, zwei Karotten, ein Stück Sellerie, eine Zwiebel, einen Liter Gemüsebrühe, etwas Butter, Salz, Pfeffer und frische Petersilie.

Zuerst schält ihr die Kartoffeln, die Karotten und den Sellerie und schneidet alles in kleine Stücke. Dann schneidet ihr die Zwiebel und bratet sie in der Butter an. Danach kommen das Gemüse und die Brühe in den Topf. Die Suppe muss ungefähr 25 Minuten kochen.

Am Ende macht ihr die Hälfte der Suppe mit dem Mixer fein. So wird sie schön cremig. Mit Salz und Pfeffer würzen – fertig! Meine Oma hat immer noch Würstchen in die Suppe gegeben. Ich esse sie lieber vegetarisch, mit frischem Brot.`,
    questions: [
      tf('Das Rezept ist von der Oma der Autorin.', true, '„nach dem Rezept von meiner Oma“.'),
      mc('Wie lange muss die Suppe kochen?', ['ungefähr 25 Minuten', 'eine Stunde', 'zehn Minuten', 'zwei Stunden'], '„Die Suppe muss ungefähr 25 Minuten kochen.“'),
      mc('Was macht man zuerst?', ['Man schält das Gemüse und schneidet es.', 'Man brät die Zwiebel an.', 'Man macht die Suppe mit dem Mixer fein.', 'Man gibt Würstchen in den Topf.'], '„Zuerst schält ihr die Kartoffeln …“ — zuerst = first.'),
      tf('Die Autorin isst die Suppe mit Würstchen.', false, 'Her grandmother added sausages; she prefers it vegetarian.'),
      mc('Warum macht man die Hälfte der Suppe fein?', ['Die Suppe wird so cremig.', 'Die Suppe kocht so schneller.', 'Die Suppe wird so salziger.', 'Die Suppe wird so kalt.'], '„So wird sie schön cremig.“'),
    ],
  },
  {
    id: 'a2-beim-arzt',
    level: 'A2',
    title: 'Beim Arzt',
    genre: 'Short narrative',
    topics: ['health'],
    text: `Seit drei Tagen fühlt sich Herr Novak nicht gut. Er hat Kopfschmerzen und Fieber, und sein Hals tut weh. Heute Morgen hat er in der Praxis von Dr. Hartmann angerufen und einen Termin bekommen.

Im Wartezimmer muss er eine halbe Stunde warten. Dann untersucht ihn die Ärztin. „Sie haben eine Grippe“, sagt sie. „Sie müssen ein paar Tage im Bett bleiben und viel trinken. Ich schreibe Ihnen ein Rezept für ein Medikament gegen das Fieber.“

Herr Novak fragt: „Kann ich morgen arbeiten?“ – „Nein, auf keinen Fall“, antwortet Dr. Hartmann. „Ich schreibe Sie bis Freitag krank. Wenn es Ihnen am Freitag nicht besser geht, kommen Sie bitte noch einmal vorbei.“

Nach dem Termin geht Herr Novak in die Apotheke und holt das Medikament. Dann ruft er seinen Chef an und sagt, dass er bis Freitag nicht zur Arbeit kommt.`,
    questions: [
      mc('Welche Beschwerden hat Herr Novak?', ['Kopfschmerzen, Fieber und Halsschmerzen', 'Bauchschmerzen', 'Rückenschmerzen und Husten', 'nur Fieber'], '„Er hat Kopfschmerzen und Fieber, und sein Hals tut weh.“'),
      tf('Herr Novak muss nicht lange warten.', false, 'He waits half an hour in the waiting room.'),
      mc('Was sagt die Ärztin?', ['Er hat eine Grippe und soll im Bett bleiben.', 'Er kann morgen arbeiten.', 'Er braucht keine Medikamente.', 'Er muss ins Krankenhaus.'], '„Sie haben eine Grippe … ein paar Tage im Bett bleiben“.'),
      tf('Herr Novak ist bis Freitag krankgeschrieben.', true, '„Ich schreibe Sie bis Freitag krank“ — krankschreiben = to give someone a sick note.'),
      mc('Wohin geht er nach dem Termin?', ['in die Apotheke', 'zur Arbeit', 'ins Krankenhaus', 'in den Supermarkt'], '„geht Herr Novak in die Apotheke und holt das Medikament“.'),
    ],
  },
  {
    id: 'a2-von-valencia-nach-berlin',
    level: 'A2',
    title: 'Von Valencia nach Berlin',
    genre: 'Personal story',
    topics: ['people', 'travel', 'culture'],
    text: `Ich heiße Carmen und komme aus Valencia. Vor zwei Jahren bin ich mit meinem Mann nach Berlin gezogen, weil er hier eine Stelle bekommen hat.

Am Anfang war alles schwer. Ich habe kaum Deutsch gesprochen, und das Wetter war ein Schock: Der Winter in Berlin ist viel kälter und dunkler als in Valencia! Ich habe meine Familie und das Meer sehr vermisst.

Dann habe ich einen Deutschkurs an der Volkshochschule gemacht. Dort habe ich viele Leute aus der ganzen Welt kennengelernt. Meine beste Freundin, Aiko, kommt aus Japan. Wir treffen uns jede Woche und sprechen nur Deutsch.

Heute fühle ich mich in Berlin wohl. Die Stadt ist größer und lauter als Valencia, aber sie ist auch sehr interessant. Es gibt so viele Museen, Konzerte und Parks. Nur das spanische Essen fehlt mir immer noch – deshalb koche ich oft Paella für meine Freunde.`,
    questions: [
      mc('Warum ist Carmen nach Berlin gezogen?', ['Ihr Mann hat dort eine Stelle bekommen.', 'Sie wollte Deutsch lernen.', 'Ihre Freundin wohnt dort.', 'Sie mag kaltes Wetter.'], '„weil er hier eine Stelle bekommen hat“.'),
      tf('Am Anfang hat Carmen gut Deutsch gesprochen.', false, '„Ich habe kaum Deutsch gesprochen“ — kaum = hardly.'),
      mc('Wo hat Carmen Aiko kennengelernt?', ['im Deutschkurs', 'bei der Arbeit', 'in Japan', 'in einem Konzert'], 'She met people from all over the world in her course at the Volkshochschule.'),
      tf('Carmen findet Berlin heute interessant.', true, '„aber sie ist auch sehr interessant“.'),
      mc('Was fehlt Carmen immer noch?', ['das spanische Essen', 'ihre Freundin Aiko', 'die Museen', 'der Deutschkurs'], '„Nur das spanische Essen fehlt mir immer noch“ — etwas fehlt mir = I miss something.'),
    ],
  },
  {
    id: 'a2-mit-dem-rad',
    level: 'A2',
    title: 'Mit dem Rad zur Arbeit',
    genre: 'Magazine article',
    topics: ['nature', 'health', 'work'],
    text: `In vielen deutschen Städten fahren immer mehr Menschen mit dem Fahrrad zur Arbeit. Ein gutes Beispiel ist Münster: Dort gibt es mehr Fahrräder als Einwohner.

Thomas Krüger, 45, fährt jeden Tag acht Kilometer mit dem Rad ins Büro. „Früher bin ich immer mit dem Auto gefahren“, erzählt er. „Aber ich habe oft im Stau gestanden und war schon morgens gestresst. Jetzt bin ich schneller, und ich muss keinen Parkplatz suchen.“

Radfahren ist gesund und gut für die Umwelt. Außerdem spart man Geld, denn man braucht kein Benzin. Aber es gibt auch Probleme: In manchen Städten gibt es zu wenige Radwege, und im Winter ist es oft kalt und nass.

Thomas fährt trotzdem bei jedem Wetter. „Es gibt kein schlechtes Wetter, nur falsche Kleidung“, sagt er und lacht.`,
    questions: [
      tf('In Münster gibt es mehr Fahrräder als Menschen.', true, '„Dort gibt es mehr Fahrräder als Einwohner.“'),
      mc('Warum fährt Thomas nicht mehr mit dem Auto?', ['Er hat oft im Stau gestanden und war gestresst.', 'Sein Auto ist kaputt.', 'Benzin ist zu billig.', 'Er wohnt jetzt neben dem Büro.'], 'Traffic jams made him stressed; now he is faster and needs no parking space.'),
      mc('Welches Problem nennt der Text?', ['Es gibt zu wenige Radwege.', 'Fahrräder sind sehr teuer.', 'Radfahren ist ungesund.', 'Man braucht viel Benzin.'], '„In manchen Städten gibt es zu wenige Radwege.“'),
      tf('Thomas fährt nur bei schönem Wetter mit dem Rad.', false, '„Thomas fährt trotzdem bei jedem Wetter.“'),
      mc('Was meint Thomas mit „Es gibt kein schlechtes Wetter, nur falsche Kleidung“?', ['Mit der richtigen Kleidung kann man immer Rad fahren.', 'Das Wetter in Münster ist immer gut.', 'Er kauft gern Kleidung.', 'Er fährt im Winter nicht.'], 'A German saying: with the right clothes, the weather is no excuse.'),
    ],
  },
];
