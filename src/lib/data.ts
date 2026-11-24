export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
export type Product = { name: string; price: string; unit?: string; category: string; image: string; description: string; details: string[] };
export type Animal = { name: string; image: string; short: string; paragraphs: string[]; fact: string };
export type Pillar = { n: string; title: string; kicker: string; text: string[]; image: string };
export type News = { slug: string; title: string; date: string; dateISO: string; excerpt: string; body: string[]; image: string; category: string };
export type GalleryImage = { src: string; alt: string; caption: string };
export type HistoryEvent = { year: string; title: string; text: string };
export type FAQ = { q: string; a: string };

export const site = {
  name: 'Irlenhof',
  shopName: 'hofladen Irlenhof',
  badge: 'SEIT 2012',
  claim: 'Wissen, wo’s herkommt.',
  intro: 'Schön, dass Sie unsere Internetseite besuchen! Auf den folgenden Seiten möchten wir, der Irlenhof und das Irlenhof-Team, uns bei Ihnen vorstellen und Ihnen etwas über unsere Art zu wirtschaften erzählen.',
  address: ['Irlenweg 3', '57223 Kreuztal'],
  addressLine: 'Irlenweg 3, 57223 Kreuztal',
  region: 'Kreuztal-Ferndorf, Siegerland',
  phone: '02732-4379',
  phoneHref: 'tel:+4927324379',
  mobile: '0151-43141210',
  mobileHref: 'tel:+4915143141210',
  email: 'info@irlenhof.de',
  hours: 'Mo, Mi, Do 09–14 Uhr · Fr 09–18 Uhr · Sa 09–14 Uhr',
  sbHours: 'Täglich 09:00 – 18:00 Uhr',
  legalName: 'Irlenhof GbR Peter, Felix & Florian Stücher',
  ustid: 'DE 812874542',
  social: {
    instagram: 'https://www.instagram.com/hofladen_irlenhof/',
    facebook: 'https://www.facebook.com/Hofladen-Irlenhof-252119208264608/',
  },
  revision: '12.10.2026',
};

export const nav: NavItem[] = [
  { label: 'Start', href: '/' },
  {
    label: 'Unser Hof', href: '/unser-hof', children: [
      { label: 'Der Irlenhof', href: '/unser-hof/der-irlenhof' },
      { label: 'Unsere Philosophie', href: '/unser-hof/unsere-philosophie' },
      { label: 'Unsere Tiere', href: '/unser-hof/unsere-tiere' },
    ],
  },
  { label: 'Aktuelles', href: '/aktuelles' },
  {
    label: 'Hofladen', href: '/hofladen', children: [
      { label: 'Öffnungszeiten', href: '/oeffnungszeiten' },
      { label: 'Unsere Produkte', href: '/produkte' },
      { label: 'Hofladen online', href: '/hofladen-online' },
    ],
  },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const stats = [
  { value: '14. Jh.', label: 'Erste urkundliche Erwähnung' },
  { value: '2012', label: 'Eröffnung des Hofladens' },
  { value: '60', label: 'Milchkühe auf dem Hof' },
  { value: '~200', label: 'Weidegänse im Sommer' },
];

export const heroCards = [
  { icon: 'clock', kicker: 'TÄGLICH FRISCH', value: 'Direkt vom Hof', text: 'Frische Eier, Kartoffeln und Brotbelag – auch sonntags im Selbstbedienungsladen.' },
  { icon: 'sprout', kicker: 'AUS EIGENER ZUCHT', value: '60 Milchkühe', text: 'Melkroboter, Laufstall und tägliche Weide von Frühjahr bis Herbst.' },
  { icon: 'leaf', kicker: 'REGIONAL', value: 'Ohne Umwege', text: 'Geburt, Aufzucht, Schlachtung und Verkauf auf einem einzigen Betrieb.' },
];

export const philosophyIntro: string[] = [
  '„nachhaltig nachhaltig!“',
  'Verrücktes Wortspiel oder was steckt dahinter?',
  'Wir denken Nachhaltigkeit weiter – aber wie?',
  '„Warum nicht Bio, besser als Bio geht doch gar nicht?!“',
  'Der Begriff Nachhaltigkeit lässt sich in drei Säulen unterteilen: 1. Ökologie, 2. Ökonomie, 3. Soziales. Diese drei Aspekte stehen nicht jeweils für sich allein, sondern in Wechselbeziehung zueinander. Unter wirklich nachhaltigem Wirtschaften verstehen wir also die Ausgewogenheit dieser Aspekte.',
];

export const pillars: Pillar[] = [
  {
    n: '01', title: 'Ökologie', kicker: '„Konventionell mit der Natur“', image: '/media/philosophie.jpg',
    text: [
      'Der Irlenhof ist kein Biobetrieb. Bei der Bewirtschaftung der uns zur Verfügung stehenden Fläche ist uns eine effiziente und ressourcenschonende Arbeitsweise wichtig, weil wir der Meinung sind, dass Nahrungsmittel für Deutschland in Deutschland produziert werden sollten. In einigen Bereichen sind wir mit den Regelungen und Grenzwerten der biologischen Landwirtschaft absolut einverstanden. Gentechnikfreies Futter, niedrige Besatzdichte, Blühstreifen, Naturschutzflächen und Einsatz von Medikamenten nur im Notfall.',
      'Nur fünf Beispiele bei denen wir die Richtwerte der konventionellen Landwirtschaft gerne und bei weitem übertreffen. Effektive Hilfsmittel – ja, auch Pflanzenschutzmittel und Mineraldünger – sorgen für sichere Erträge und dafür, dass wir für unsere Tiere auch in witterungstechnisch anspruchsvollen Jahren eine Grundversorgung gewährleisten können. Bei der Verwendung der betreffenden Hilfsmittel achten wir natürlich auf absolut fachgerechten Einsatz und greifen nur auf sie zurück, wenn es notwendig ist. Ein Beispiel bei dem wir zu große Einschränkungen für kontraproduktiv halten. Denn: „satt werden wollen wir alle!“',
    ],
  },
  {
    n: '02', title: 'Ökonomie', kicker: '„Frische, gesunde und regionale Lebensmittel aus umweltbewusstem Anbau und artgerechter Tierhaltung zu einem angemessenen Preis anbieten.“', image: '/media/hof.jpg',
    text: [
      'Die Direktvermarktung – Ihre Bereitschaft etwas mehr zu bezahlen – gibt uns die Möglichkeit unseren Tieren ein artgerechtes Leben zu ermöglichen. Dafür sind wir, das Irlenhof-Team, Ihnen sehr dankbar – und unsere Tiere natürlich auch!',
      '„Wissen wo´s Herkommt – Hofladen Irlenhof“',
      'Wertschöpfung auf dem Betrieb = kurze Wege und Nachvollziehbarkeit. Man kann nicht alles selber machen, aber vieles. Wir arbeiten ständig daran, die Produktpalette aus eigner Herstellung auf unserem Betrieb zu vervollständigen. Dadurch können wir Ihnen in unserem Hofladen regionale Lebensmittel und größtmögliche Transparenz anbieten.',
      'Ebenso arbeiten wir beständig daran die Bedingungen für Tier und Mensch auf dem Irlenhof zu verbessern. Und das behaupten wir nicht nur, es gibt auch einiges vorzuweisen. Sie sind herzlich eingeladen unseren Bauernhof zu Besuchen und sich selbst ein Bild zu machen!',
    ],
  },
  {
    n: '03', title: 'Soziales', kicker: '„Deshalb arbeiten wir daran Nachhaltigkeit nachhaltig zu gestalten.“', image: '/media/team.jpg',
    text: [
      'Von Beginn an ist es eines unserer wichtigsten Ziele qualitativ hochwertige Lebensmittel zu angemessenen Preisen herzustellen und anzubieten. Gleichzeitig sehen wir uns gegenüber unseren Mitarbeiter verpflichtet, auskömmliche Löhne zu bezahlen und nicht zuletzt wollen auch wir als Inhaber von unserer Arbeit leben können. Aufklärung über das was wir tun, Pflege und Erhalt der Natur- und Kulturlandschaft im Rahmen unserer Möglichkeiten halten wir abschließend für eine wichtige Aufgabe unseres Betriebes.',
      'Deshalb arbeiten wir daran Nachhaltigkeit nachhaltig zu gestalten.',
      'Deshalb geht der Irlenhof einen eigenen Weg – den nachhaltigeren, wie wir meinen.',
      'Vielen Dank, dass Sie sich die Zeit genommen haben, unsere Philosophie zu lesen! Nun springt Ihnen der Draht aus der Mütze, weil Sie so überhaupt nicht damit einverstanden sind? Oder Sie haben Eine Verständnisfrage zu einem Thema? Vielleicht auch einfach eine gute Anregung, die uns helfen könnte?',
      'Dann nehmen wir uns auch Zeit für Sie. Sie können uns unter unten angegebenen Kontaktmöglichkeiten werktags von morgens bis abends telefonisch und jederzeit schriftlich erreichen.',
      'Ihre Familie Stücher und das Irlenhof-Team',
    ],
  },
];

export const openingHours = [
  { day: 'Montag', hours: '09:00 – 14:00 Uhr' },
  { day: 'Dienstag', hours: 'Nach Vereinbarung' },
  { day: 'Mittwoch', hours: '09:00 – 14:00 Uhr' },
  { day: 'Donnerstag', hours: '09:00 – 14:00 Uhr' },
  { day: 'Freitag', hours: '09:00 – 18:00 Uhr' },
  { day: 'Samstag', hours: '09:00 – 14:00 Uhr' },
  { day: 'Sonntag & Feiertag', hours: 'Selbstbedienung 09:00 – 18:00 Uhr' },
];

export const productCategories = ['Alle', 'Fleisch & Wurst', 'Eier & Nudeln', 'Gemüse & Kartoffeln', 'Milch & Käse', 'Vorrat & Leckereien'];

export const products: Product[] = [
  {
    name: 'Brathähnchen', price: '12,00 – 16,00 €', category: 'Fleisch & Wurst', image: '/media/produkt-brathaehnchen.jpg',
    description: 'Artgerecht aufgezogen, medikamentenfrei und direkt auf dem Irlenhof geschlachtet. In geraden Kalenderwochen ganz frisch in der Theke.',
    details: ['Unsere Hähnchen wachsen artgerecht und mit genügend Platz, um sich frei bewegen zu können, auf. Als gentechnikfreier Betrieb verzichten wir auf Futter aus genetisch veränderten Pflanzen. Außerdem verzichten wir bei unseren Masthähnchen vollkommen auf Medikamente. Geschlachtet wird direkt auf dem Irlenhof. Lange Transportwege bleiben also aus, was zum einen für das Wohlbefinden der Tiere wichtig ist, sich zum anderen aber auch im Geschmack bemerkbar macht. Jede gerade Kalenderwoche wird geschlachtet. Donnerstags, freitags und samstags in geraden Kalenderwochen gibt es ganz frisches Hähnchenfleisch zu unseren Öffnungszeiten.'],
  },
  {
    name: 'Ferndorfer Duffeln (Kartoffeln)', price: '5,00 €', unit: '1 kg', category: 'Gemüse & Kartoffeln', image: '/media/produkt-kartoffeln.jpg',
    description: 'Überwiegend festkochende Kartoffeln aus eigenem Anbau – eine alte Siegerländer Tradition. Auch in 3-, 5- und 10-kg-Säcken erhältlich.',
    details: ['Im ganzen Siegerland und vor allem in Ferndorf, wo es die Geschichte der deggen Duffel gibt, spielen Kartoffeln eine wichtige Rolle. Bereits vor vielen Generationen wurden Kartoffeln auf dem Irlenhof angebaut. Mit uralter und neuer Technik, überlieferten Methoden und aktueller Fachkenntnis kann diese Tradition, dank der Direktvermarktung, wieder aufgegriffen werden. Je nach Jahreszeit bieten wir Frühkartoffeln oder Lagerkartoffeln an. Bei der Auswahl der Sorten setzen wir auf überwiegend festkochende Kartoffeln, die möglichst widerstandsfähig und gut zu lagern sind. Nach der Ernte im Herbst gibt es solange Kartoffeln, bis unser Lager erschöpft ist. Erhältlich sind unsere Kartoffeln in 3, 5 und 10 Kilogramm-Säcken.'],
  },
  {
    name: 'Frische Hühnereier', price: '3,00 €', unit: '10 Stück', category: 'Eier & Nudeln', image: '/media/produkt-eier.jpg',
    description: 'Täglich aus den Nestern gesammelt, sortiert und mit unserem eigenen Erzeugercode versehen. Ausschließlich von unseren eigenen Hühnern.',
    details: ['Unsere Eier stammen ausschließlich von eigenen Hühnern. Bei unserer Haltung achten wir auf genügend Platz, eine artgerechte Einrichtung und gutes Futter ohne Gentechnik. Mehr dazu finden Sie unter „unsere Tiere“. Täglich werden die Eier aus den Nestern gesammelt, sortiert und mit unserem eigenen Erzeugercode versehen. Dann stehen sie frisch in unserem Laden für Sie zum Verkauf.'],
  },
  {
    name: 'Grillwurst', price: '1,20 €', unit: '1 Stück', category: 'Fleisch & Wurst', image: '/media/produkt-grillwurst.jpg',
    description: 'Wurstspezialität aus dem Fleisch unserer eigenen Tiere, von der Metzgerei Stahl in Fellerdilln hergestellt.',
    details: ['Wurst und Schinken lassen wir aus dem Fleisch unserer eigenen Tiere von der Metzgerei Stahl in Fellerdilln herstellen. Verschiedene Wurstspezialitäten aus Hessen finden Sie jederzeit in unserer Frischetheke. Mortadella, Bierschinken und Jagdwurst, Fleischkäse, Fleischwurst, Mettwurst, gut geräucherten und lange gereiften Schinken bieten wir genauso an wie Leberwurst, Blutwurst und Mettwurst im Glas.'],
  },
  {
    name: 'Imkerhonig', price: '8,00 €', unit: '500 g', category: 'Vorrat & Leckereien', image: '/media/produkt-honig.jpg',
    description: 'Echter Ferndorfer Bienenhonig aus unseren eigenen Bienenvölkern, betreut von Olga Molsberger. Ergänzt um Honig aus dem Kreuztaler Stadtgebiet.',
    details: ['Auf dem Irlenhof sind unter anderem einige Bienenvölker zuhause. Diese werden von Olga Molsberger betreut. Den leckeren, echt ferdorfer Bienenhonig bieten wir in unserem Hofladen zum Verkauf an. Außerdem handeln wir Honig von weiteren Imkern aus dem kreuztaler Stadtgebiet.'],
  },
  {
    name: 'Kohlrabi', price: '3,00 €', unit: '1 Stück', category: 'Gemüse & Kartoffeln', image: '/media/produkt-kohlrabi.jpg',
    description: 'Frisches Feldgemüse aus eigenem Anbau – ohne Spritzmittel, direkt vom Feld in unseren Hofladen.',
    details: ['Im Frühjahr pflanzen wir auf einem kleinen Teil unserer Felder verschiedene Gemüsesorten wie Weißkohl, Rotkohl, Kohlrabi und Rosenkohl an. Ohne jeglichen Einsatz von Spritzmitteln wird das Jahr über immer wieder Unkraut mit der Hacke bekämpft. Ist das Gemüse reif, gelangt es auf direktem Wege vom Feld in unseren Hofladen. Um Ihnen möglichst ganzjährig eine möglichst reichhaltige Auswahl Gemüse anbieten zu können, lassen wir uns wöchentlich von Alfons Wurm aus Wenden mit frischem Gemüse beliefern.'],
  },
  {
    name: 'Portionswurst Lyoner', price: '3,50 €', unit: '250 g', category: 'Fleisch & Wurst', image: '/media/produkt-lyoner.jpg',
    description: 'Klassiker aus der Frischetheke: Lyoner in praktischen Portionen, hergestellt aus hofeigenem Fleisch.',
    details: ['Wurst und Schinken lassen wir aus dem Fleisch unserer eigenen Tiere von der Metzgerei Stahl in Fellerdilln herstellen. Verschiedene Wurstspezialitäten aus Hessen finden Sie jederzeit in unserer Frischetheke. Mortadella, Bierschinken und Jagdwurst, Fleischkäse, Fleischwurst, Mettwurst, gut geräucherten und lange gereiften Schinken bieten wir genauso an wie Leberwurst, Blutwurst und Mettwurst im Glas.'],
  },
  {
    name: 'Rinderbeinscheibe', price: '2,60 €', unit: '300 g', category: 'Fleisch & Wurst', image: '/media/produkt-rinderbeinscheibe.jpg',
    description: 'Suppenfleisch vom Rind – mindestens 10 Tage trocken gereift, sauerstoffarm verpackt und ohne lange Transportwege.',
    details: ['Geburt, Aufzucht, Schlachtung, Vermarktung – alles auf ein und demselben Betrieb. Ohne Stress und ohne lange Transportwege. Mindestens 10 Tage reift unser Rindfleisch trocken und in aller Ruhe in einem Kühlhaus und entwickelt dort seine Zartheit und einen unvergleichlichen Geschmack. Dabei verliert es Wasser, welches Sie beim Braten nicht in der Pfanne haben. Sauerstoffarm und luftdicht verpackt bekommen Sie unser Rindfleisch frisch oder tiefgefroren zu unseren Öffnungszeiten.'],
  },
  {
    name: 'Rinderbraten', price: '7,25 €', unit: '500 g', category: 'Fleisch & Wurst', image: '/media/produkt-rinderbraten.jpg',
    description: 'Geburt, Aufzucht, Schlachtung und Vermarktung auf einem Betrieb. Trockengereift für besondere Zartheit und Geschmack.',
    details: ['Geburt, Aufzucht, Schlachtung, Vermarktung – alles auf ein und demselben Betrieb. Ohne Stress und ohne lange Transportwege. Mindestens 10 Tage reift unser Rindfleisch trocken und in aller Ruhe in einem Kühlhaus und entwickelt dort seine Zartheit und einen unvergleichlichen Geschmack. Dabei verliert es Wasser, welches Sie beim Braten nicht in der Pfanne haben. Sauerstoffarm und luftdicht verpackt bekommen Sie unser Rindfleisch frisch oder tiefgefroren zu unseren Öffnungszeiten.'],
  },
  {
    name: 'Suppenhuhn', price: '5,00 €', unit: '1 kg', category: 'Fleisch & Wurst', image: '/media/produkt-suppenhuhn.jpg',
    description: 'Aus eigener Hähnchenzucht, geschlachtet direkt auf dem Hof. Ideal für eine selbstgemachte Hühnersuppe.',
    details: ['Unsere Hähnchen wachsen artgerecht und mit genügend Platz, um sich frei bewegen zu können, auf. Als gentechnikfreier Betrieb verzichten wir auf Futter aus genetisch veränderten Pflanzen. Außerdem verzichten wir bei unseren Masthähnchen vollkommen auf Medikamente. Geschlachtet wird direkt auf dem Irlenhof. Lange Transportwege bleiben also aus, was zum einen für das Wohlbefinden der Tiere wichtig ist, sich zum anderen aber auch im Geschmack bemerkbar macht. Jede gerade Kalenderwoche wird geschlachtet. Donnerstags, freitags und samstags in geraden Kalenderwochen gibt es ganz frisches Hähnchenfleisch zu unseren Öffnungszeiten.'],
  },
  {
    name: 'Hochwertige Eiernudeln', price: 'Preis auf Anfrage', category: 'Eier & Nudeln', image: '/media/placeholder-noodles.png',
    description: 'Eiernudeln aus nur zwei Zutaten: frische Eier und Hartweizengrieß.',
    details: ['Immer mal wieder hat ein Ei einen kleinen Riss oder ist etwas verschmutzt. Dann kommt unsere Nudelmaschine zum Einsatz, in der wir leckere Eiernudeln für Sie herstellen. Zum Einsatz kommen nur frische Eier und Hartweizengrieß – sonst nichts.'],
  },
  {
    name: 'Rohmilchkäse aus eigener Kuhmilch', price: 'Preis auf Anfrage', category: 'Milch & Käse', image: '/media/placeholder-cheese.png',
    description: 'Rohmilchkäse aus der Milch unserer eigenen Kühe, hergestellt in der Wittgensteiner Hofkäserei.',
    details: ['Leckerer Rohmilchkäse aus der Milch unserer Kühe! Da schmeckt man das frische Gras von den Wiesen Ferndorfs mit jedem Biss. Die Herstellung übernimmt die Wittgensteiner Hofkäserei in Elsoff für uns.'],
  },
  {
    name: 'Frische Rohmilch', price: 'Preis auf Anfrage', category: 'Milch & Käse', image: '/media/placeholder-milk.png',
    description: 'Unbehandelte Rohmilch direkt aus unserem Milchtank – bitte Gefäß mitbringen.',
    details: ['Frische Rohmilch direkt aus dem Milchtank ist zu den Öffnungszeiten unseres Bedienungsladens erhältlich. Da sie ganz frisch und völlig unbehandelt ist, ist sie nur etwa 3 Tage haltbar. Das Gesundheitsamt empfiehlt diese Milch vor dem Verzehr abzukochen. Wir empfehlen, ein Gefäß direkt mitzubringen. Sollten Sie keins besitzen, können Sie aber auch eine Milchflasche aus Glas bei uns im Hofladen erwerben.'],
  },
  {
    name: 'Putenfleisch', price: 'Preis auf Anfrage', category: 'Fleisch & Wurst', image: '/media/puten.jpg',
    description: 'Putenfleisch aus artgerechter Haltung – frisch oder tiefgefroren, auch auf Vorbestellung.',
    details: ['Bei der Haltung unserer Puten setzen wir die Maßstäbe an gleicher Stelle wie bei unseren Hähnchen. In der Frischetheke oder tiefgefroren bieten wir zeitweise Putenschnitzel, Braten, Suppenfleisch, Geschnetzeltes, Gulasch und Flügel an. Putenfleischpakete gibt es auch auf Vorbestellung. Alle Infos zu Fleischpaketen erhalten Sie vor Ort in unserem Hofladen.'],
  },
  {
    name: 'Schweinefleisch', price: 'Preis auf Anfrage', category: 'Fleisch & Wurst', image: '/media/schweine.jpg',
    description: 'Schweinefleisch aus eigener Haltung, einmal im Monat im EG-zertifizierten Schlachthaus verarbeitet.',
    details: ['Einmal im Monat werden Schweine in unserem EG-zertifizierten Schlachthaus geschlachtet und verarbeitet. Den Tieren bleibt der Transport zum Metzger erspart, wodurch jeglicher Stress vermieden wird. Das fördert nicht nur das Tierwohl, sondern auch die Fleischqualität – probieren Sie selbst.'],
  },
  {
    name: 'Wurstwaren aus der Frischetheke', price: 'Preis auf Anfrage', category: 'Fleisch & Wurst', image: '/media/produkt-lyoner.jpg',
    description: 'Wurst- und Schinkenspezialitäten aus dem Fleisch unserer eigenen Tiere.',
    details: ['Wurst und Schinken lassen wir aus dem Fleisch unserer eigenen Tiere von der Metzgerei Stahl in Fellerdilln herstellen. Verschiedene Wurstspezialitäten aus Hessen finden Sie jederzeit in unserer Frischetheke. Mortadella, Bierschinken und Jagdwurst, Fleischkäse, Fleischwurst, Mettwurst, gut geräucherten und lange gereiften Schinken bieten wir genauso an wie Leberwurst, Blutwurst und Mettwurst im Glas.'],
  },
  {
    name: 'Zitrusfrüchte aus Sizilien', price: 'Preis auf Anfrage', category: 'Vorrat & Leckereien', image: '/media/placeholder-citrus.png',
    description: 'Orangen, Clementinen und Blutorangen – direkt aus Sizilien, ungespritzt.',
    details: ['Zitrusfrüchte gibt es bei uns in der Wintersaison. Wir beziehen sie von der Familie Ciulla, die die Orangen, Clementinen und Blutorangen direkt und ungespritzt aus Sizilien importieren.'],
  },
  {
    name: 'Kräuter und Gewürze von KiBüWürze', price: 'Preis auf Anfrage', category: 'Vorrat & Leckereien', image: '/media/placeholder-spices.png',
    description: 'Gewürzmischungen, Kräuter und Tees ohne künstliche Zusatzstoffe.',
    details: ['Bei uns erhältlich. „Nur mit hochwertigen Zutaten schmeckt das Essen wirklich lecker. Intensiver Geschmack, ausgewählte Rohstoffe und Lieferanten, die auf Qualität und Frische achten, sind uns besonders wichtig. Aus diesem Grund kommt auch nichts in die Tüte, was nicht reingehört! Die Gewürzmischungen, Gewürze, Kräuter und Tees von KiBüWürze enthalten keine künstlichen Farb-, Aroma- oder Konservierungsstoffe, keine Füllstoffe und Rieselhilfen, kein Gluten, kein Glutamat, keine anderen Geschmacksverstärker, keine geschmacksverstärkenden Zusatzstoffe. Sie sind unbestrahlt und werden aus gentechnisch unveränderten Pflanzen gewonnen. Das gilt selbstverständlich auch für unseren Knoblauch.“ Eure KiBü'],
  },
  {
    name: 'Currysauce', price: 'Preis auf Anfrage', category: 'Vorrat & Leckereien', image: '/media/placeholder-curry.png',
    description: 'Currysauce und feurige Currysauce, in Handarbeit von der Familie Weber hergestellt.',
    details: ['Wir beziehen Currysauce und feurige Currysauce, welche in Handarbeit hergestellt und abgefüllt wird von der Familie Weber aus dem Siegerland. Die Saucen werden ohne Zusatz von Konservierungsstoffen produziert. Weitere Infos unter: www.jeffel.de'],
  },
  {
    name: 'Gelees, Marmeladen und Eingekochtes', price: 'Preis auf Anfrage', category: 'Vorrat & Leckereien', image: '/media/placeholder-preserves.png',
    description: 'Selbst gemacht aus sehr reifem Obst und Gemüse aus dem Hofladen oder Garten.',
    details: ['Gelees, Marmeladen und Eingekochtes aus eigener Herstellung. Aus sehr reifem Obst und Gemüse aus dem Hofladen oder Garten stellen wir Gelees, Marmeladen und sonstiges wie beispielsweise Zucchini oder rote Beete Salat her.'],
  },
];

export const animals: Animal[] = [
  {
    name: 'Gänse', image: '/media/gaense.jpg', fact: 'ca. 200 Weidegänse · 70–90 cm · 4–6 kg',
    short: 'Von Frühsommer bis Weihnachten können Sie auf den Wiesen des Hofes unsere ca. 200 Weidegänse sehen und hören.',
    paragraphs: [
      'Jeden Tag dürfen sie bei uns auf die Wiese, wo sie Gras, Würmer und kleine Steinchen zum zerkleinern der Gräser fressen. Nachts kommen die Gänse in einen Strohstall, wo sie mit selbst angebautem Getreide zugefüttert werden. Schon Griechen, Römer und Germanen hielten sich Gänse als Haustiere. Sie galten als heilig und dank ihres Geschreis als gute Wächter.',
      'Für diesen Zweck werden sie auch heute noch eingesetzt. Gänse sind sehr gesellige Tiere, weshalb man sie auch in freier Wildbahn nur in Scharen sieht. Sie werden etwa 70- 90 cm groß und sind ausgewachsen 4 -6 Kg schwer.',
    ],
  },
  {
    name: 'Hähnchen', image: '/media/haehnchen.jpg', fact: 'Hähnchenmast ohne Medikamente',
    short: 'Hähnchen sind im Prinzip eine Zuchtform der Hühner, die mehr Fleisch ausbildet.',
    paragraphs: [
      'Sie leben in großzügigen Ställen, die warm und zugluftgeschützt sind. Jeden Tag werden diese mit Stroh eingestreut in dem sie gerne scharren und Getreidekörner suchen. Bei der Auswahl der Rasse und des Futters achten wir darauf, dass die Tiere nicht zu schnell schwer werden, damit sie während ihres Lebens keine Gelenkschmerzen haben und sich gut bewegen können. Besonders wichtig ist bei Masthähnchen eine lückenlose Hygiene. Auf Medikamente jeglicher Art verzichten wir bei der Hähnchenmast komplett.',
    ],
  },
  {
    name: 'Puten', image: '/media/puten.jpg', fact: 'Über 20 Kg schwer · Weibchen deutlich leichter',
    short: 'Puten sind die domestizierte Form des Truthahns.',
    paragraphs: [
      'Bei uns wohnen sie in einem großen, mit Stroh ausgestreuten Stall, der warm und zugluftgeschützt ist, wie es die Tiere gerne mögen. Puten werden über 20 Kg schwer, wobei die Weibchen deutlich leichter sind. Genau wie unser Hähnchen bekommen ein spezielles Futter, das sich überwiegend aus Mais, Rapsschrot und Vitaminen und Mineralien zusammensetzt.',
    ],
  },
  {
    name: 'Schweine', image: '/media/schweine.jpg', fact: '6 -12 Schweine · Gruppenhaltung',
    short: 'Auf dem Irlenhof sind immer 6 -12 Schweine Zuhause.',
    paragraphs: [
      'Schweine halten sich gerne in Gruppen auf und schlafen auch meist dicht aneinander gekuschelt. Sie ruhen dabei gerne auf Stroh. Entgegen der allgemeinen Vorureile sind Schweine von Grund aus saubere Tiere und trennen ihren Schlaf- und Liegeplatz strickt vom Kotplatz. Da Schweine Allesfresser sind eignen sie sich gut als „Resteverwerter“ vegetarischer Lebensmittel, sie bekommen bei uns Gemüsereste, sowie Mehl aus eigenem Getreide.',
    ],
  },
  {
    name: 'Hasen', image: '/media/kaninchen.jpg', fact: 'Bis zu zehn Junge pro Wurf',
    short: 'Auch ein paar Hasen sind auf dem Irlenhof zuhause.',
    paragraphs: [
      'Als kleines Hobbie werden sie von Senior Peter selbst gezüchtet. So gibt es auch von Zeit zu Zeit Hasenbabies anzusehen. Eine Häsin bekommt bei einem Wurf bis zu zehn Junge, die sie dann versorgt. Einige Tage bleiben die Jungen im warmen gut gepolsterten Nest, bis das fellkleid ausgebildet ist und sie nicht mehr blind sind. Die Hasen bekommen Heu, Getreide, frisches Gras oder Reste vom Feldgemüse zu fressen.',
    ],
  },
  {
    name: 'Kühe', image: '/media/milchkuhe.jpg', fact: 'Etwa 60 Milchkühe · Melkroboter',
    short: 'Etwa 60 Milchkühe bewohnen seit 2019 unseren hochmodernen und komfortablen Laufstall.',
    paragraphs: [
      'Hier haben sie jede Menge Platz, um sich frei bewegen und ihren Bedürfnissen nachgehen zu können. Von Fühjahr bis Herbst dürfen sie täglich auf die Weide, wo sie frisches Gras fressen und sich austoben. Mit einem Melkroboter werden sie immer dann gemolken, wenn sie gerade Lust darauf haben. Während der Erntezeit (ca. April bis Oktober) werden unsere Milchkühe mit frsichem Gras und Heu gefüttert. Im Winter bekommen sie eine Mischung aus Gras- und Maissilage sowie Mehl als Energielieferanten und Kraftfutter, eine Mischung aus Getreide, Rapsschrot, Mais und Mineralien. Mehr als 90% des Futters stammt dabei aus eignem Anbau. Jede Kuh bekommt etwa einmal im Jahr ein Kalb, das bei der Geburt etwa 35 – 45 Kg wiegt.',
    ],
  },
  {
    name: 'Kälber und Rinder', image: '/media/kaelber.jpg', fact: 'Bis zu 10 Wochen Milch · Nachtweide',
    short: 'Die Nachzucht also die Kälber und Rinder werden ebenfalls auf dem Hof großgezogen.',
    paragraphs: [
      'Die erste Muttermilch ist besonders wichtig für die Kälber, da sie wichtige Nährstoffe und Antikörper enthält. Bis zu 10 Wochen werden die Kälber mit Milch ernährt. Nach einigen Wochen beginnen sie dann auch Heu und spezielles Kraftfutter zu fressen. Unsere Kälber wohnen zunächst in Kälberhütten und kommen anschließend zusammen in einen mit Stroh eingestreuten Laufstall. Die jungen Rinder verbringen den Sommer auf einer großen Nachtweide, wo sie Tag und Nacht im freien sind.',
    ],
  },
  {
    name: 'Legehennen', image: '/media/legehennen.jpg', fact: 'Ungefähr 300 Eier im Jahr pro Huhn',
    short: 'Unsere fleißigen Legehennen leben in einem geräumigen Hühnerstall.',
    paragraphs: [
      'Dieser ist perfekt auf die Bedürfnisse der Hennen abgestimmt. Ihnen steht ein Scharraum, artgerechte Legenester, eine temperaturgeregelte Lüftung und viele Sitzstangen zur Verfügung. Bei der Besatzdichte, also die Anzahl Hühner pro m² Grundfläche, liegen wir sogar unter dem Biostandart von 6 Hühnern pro m².',
      'Ein Huhn legt durschschnittlich ungefähr 300 Eier im Jahr. Täglich sammeln wir diese aus ihren Nestern, um sie in unserem Hofladen zum Verkauf anzubieten. Genau wie wir benötigen Hühner verschiedene Nährstoffe und Mineralien, um Vital zu bleiben und Eier legen zu können.',
      'Unsere Hühner bekommen deshalb ein speziell für sie hergstelltes Futter welches genau auf Ihre Bedürfnisse abgestimmt. Es ist eine Zusammensetzung aus zerkleinerten Getreidekörnern (Weizen, Mais, Raps, Triticale) und Mineralien (Calcium, Natrium). Jegliches Futter auf dem Irlenhof ist frei gentechnisch veränderten Pflanzen.',
    ],
  },
];

export const news: News[] = [
  {
    slug: 'junge-pute-zu-weihnachten', title: 'Junge Pute zu Weihnachten', date: '14. November 2026', dateISO: '2026-11-14', category: 'Vorbestellung',
    image: '/media/puten.jpg',
    excerpt: 'Unsere Gänseliste ist voll! Vielen Dank für eure zahlreichen Vorbestellungen.',
    body: [
      'Unsere Gänseliste ist voll! Vielen Dank für eure zahlreichen Vorbestellungen – wir freuen uns, dass so viele von euch auch in diesem Jahr wieder an unsere Weidegänse gedacht haben.',
      'Wer noch kein Geflügel für das Fest reserviert hat, kann sich gerne bei uns melden: Für junge Puten haben wir in der Regel noch einige Plätze auf der Liste. Die Abgabe erfolgt zu den Öffnungszeiten in unserem Hofladen.',
      'Alle Infos zu Fleischpaketen und Vorbestellungen erhalten Sie vor Ort oder telefonisch unter 02732-4379.',
    ],
  },
  {
    slug: 'neue-oeffnungszeiten-ab-dezember-2025', title: 'Neue Öffnungszeiten ab Dezember 2025', date: '4. Dezember 2025', dateISO: '2025-12-04', category: 'Hofladen',
    image: '/media/hofladen.jpg',
    excerpt: 'Damit euer Einkauf in unserem Hofladen noch bequemer wird, haben wir unsere Zeiten angepasst.',
    body: [
      'Damit euer Einkauf in unserem Hofladen noch bequemer wird, haben wir unsere Zeiten angepasst. Montag, Mittwoch und Donnerstag sowie am Samstag haben wir von 09:00 bis 14:00 Uhr für Sie da.',
      'Am Freitag ist unser Bedienungsladen bis 18:00 Uhr geöffnet – ideal für den Wocheneinkauf nach der Arbeit. Der Selbstbedienungsladen bleibt wie bisher täglich von 09:00 bis 18:00 Uhr zugänglich.',
      'Wir freuen uns auf Ihren Besuch!',
    ],
  },
  {
    slug: 'metzgermeister-m-w-d-gesucht', title: 'Metzger oder Metzgermeister m/w/d gesucht', date: '25. August 2025', dateISO: '2025-08-25', category: 'Team',
    image: '/media/team.jpg',
    excerpt: 'Wir wollen durchstarten. Machst Du mit? – Deine Chance auf eine neue Heimat im Team des Irlenhofs.',
    body: [
      'Wir wollen durchstarten. Machst Du mit? – Deine Chance auf eine neue Heimat im Team des Irlenhofs.',
      'Gesucht ist eine Metzgerin oder ein Metzger beziehungsweise eine Metzgermeisterin oder ein Metzgermeister, der Lust hat, die Frischetheke unseres Hofladens mitzugestalten. Bei uns kommen Tierwohl, Handwerk und kurze Wege zusammen.',
      'Wenn Du neugierig bist, ruf uns einfach an oder schreib uns eine E-Mail an info@irlenhof.de. Wir freuen uns, Dich kennenzulernen.',
    ],
  },
  {
    slug: 'kuerbisfest-irlenhof', title: 'Kürbisfest Irlenhof', date: '11. November 2026', dateISO: '2026-11-11', category: 'Veranstaltung',
    image: '/media/aktuelles.jpg',
    excerpt: 'Kürbisse, Feldgemüse und frische Wurstwaren – das Fest rund um unsere Ernte.',
    body: [
      'Jedes Jahr im Herbst laden wir Sie zum Kürbisfest auf den Irlenhof ein. Rund um die Ernte erwarten Sie Kürbisse aus dem Feld, Kartoffeln aus unserem Lager und frische Wurstwaren aus der Theke.',
      'Kommen Sie vorbei, schauen Sie sich die Tiere an und bringen Sie die Familie mit. Der Eintritt ist frei, für Kaffee und Kuchen ist gesorgt.',
    ],
  },
];

export const gallery: GalleryImage[] = [
  { src: '/media/hof.jpg', alt: 'Blick über den Irlenhof und seine Gebäude', caption: 'Der Irlenhof aus der Luft' },
  { src: '/media/hofladen.jpg', alt: 'Gebäude des Hofladens Irlenhof', caption: 'Unser Hofladen' },
  { src: '/media/philosophie.jpg', alt: 'Kühe auf der Weide des Irlenhofs', caption: 'Unsere Kühe auf der Weide' },
  { src: '/media/puten.jpg', alt: 'Puten auf dem Irlenhof', caption: 'Puten auf der Wiese' },
  { src: '/media/team.jpg', alt: 'Das Team des Irlenhofs', caption: 'Das Irlenhof-Team' },
  { src: '/media/aktuelles.jpg', alt: 'Ein Moment aus dem Hofalltag', caption: 'Aus dem Hofalltag' },
  { src: '/media/kaelber.jpg', alt: 'Kälber im Stall des Irlenhofs', caption: 'Unsere Kälber' },
  { src: '/media/gaense.jpg', alt: 'Weidegänse auf dem Irlenhof', caption: 'Die Weidegänse' },
  { src: '/media/kaninchen.jpg', alt: 'Hasen auf dem Irlenhof', caption: 'Hasen im Stroh' },
  { src: '/media/kartoffeln.jpg', alt: 'Kartoffeln aus eigenem Anbau', caption: 'Ferndorfer Duffeln' },
  { src: '/media/eier-sortierung.jpg', alt: 'Frische Eier aus dem Hofladen', caption: 'Eier aus dem Hofladen' },
  { src: '/media/gaense-stall.jpg', alt: 'Gänse am Stall des Irlenhofs', caption: 'Weidegänse am Stall' },
];

export const historyIntro: string[] = [
  'Am Fuße des Naherholungsgebietes Kindelsberg – in Siegen am Ortsrand von Kreuztal-Ferndorf liegt unser Hof. Der „Irlenhof“ wird als klösterlicher Besitz von Drolshagen schon früh urkundlich erwähnt, er gehört zu den vier Urhöfen um die Ferndorf errichtet wurde. Im 14. Jahrhundert ging er in den Familienbesitz über in dem er sich seither befindet.',
  'Heute wird der Betrieb gemeinschaftlich durch Peter, Felix und Florian Stücher sowie zahlreichen Mitstreitern bewirtschaftet. Vielfalt und bunte Mischung in familiärer Atmosphäre – dafür steht der Irlenhof.',
  'Die historischen Gebäude des Hofes wurden im Laufe der Zeit durch moderne Stall- und Lagergebäude ergänzt. Stetig wird daran gearbeitet den Betrieb zu modernisieren und die Haltung der Tiere auf dem Irlenhof weiter zu verbessern.',
  'Neben der klassischen Landwirtschaft mit Schwerpunkt auf Milch und Rindfleisch, ist die Direktvermarktung zu einem bedeutenden Standbein geworden. „Frische und gesunde Lebensmittel aus umweltbewusstem Anbau und artgerechter Tierhaltung zu einem angemessenen Preis anbieten.“ Mit diesem Leitspruch öffnet „Hofladen Irlenhof“ 2012 seine Tore – und wird seitdem von treuen Kunden unterstützt.',
];

export const history: HistoryEvent[] = [
  { year: '14. Jahrhundert', title: 'Erste Erwähnung', text: 'Der „Irlenhof“ wird als klösterlicher Besitz von Drolshagen schon früh urkundlich erwähnt, er gehört zu den vier Urhöfen um die Ferndorf errichtet wurde. Im 14. Jahrhundert ging er in den Familienbesitz über in dem er sich seither befindet.' },
  { year: 'Heute', title: 'Gemeinschaftlich bewirtschaftet', text: 'Heute wird der Betrieb gemeinschaftlich durch Peter, Felix und Florian Stücher sowie zahlreichen Mitstreitern bewirtschaftet. Vielfalt und bunte Mischung in familiärer Atmosphäre – dafür steht der Irlenhof.' },
  { year: '2012', title: 'Hofladen Irlenhof', text: 'Mit dem Leitspruch „Frische und gesunde Lebensmittel aus umweltbewusstem Anbau und artgerechter Tierhaltung zu einem angemessenen Preis anbieten“ öffnet „Hofladen Irlenhof“ 2012 seine Tore – und wird seitdem von treuen Kunden unterstützt.' },
  { year: 'Ende 2015', title: 'Hofladen mit Bedienung', text: 'Ergänzend zur Selbstbedienung entsteht eine Frischetheke mit Beratung, Fleisch, Wurst und Käse.' },
];

export const faqs: FAQ[] = [
  { q: 'Wann hat der Hofladen geöffnet?', a: 'Der Bedienungsladen hat montags, mittwochs und donnerstags von 09:00 bis 14:00 Uhr, freitags von 09:00 bis 18:00 Uhr und samstags von 09:00 bis 14:00 Uhr geöffnet. Der Selbstbedienungsladen ist täglich von 09:00 bis 18:00 Uhr zugänglich.' },
  { q: 'Ist der Selbstbedienungsladen auch sonntags offen?', a: 'Ja. Der Selbstbedienungsladen hat täglich – auch an Sonn- und Feiertagen – von 09:00 bis 18:00 Uhr geöffnet. Die Auswahl ist dort allerdings begrenzt: Es gibt frische Eier, Kartoffeln, etwas Brotbelag und tiefgefrorenes Fleisch.' },
  { q: 'Woher stammen die Eier?', a: 'Unsere Eier stammen ausschließlich von eigenen Hühnern. Sie werden täglich aus den Nestern gesammelt, sortiert und mit unserem eigenen Erzeugercode versehen.' },
  { q: 'Wird auf dem Irlenhof geschlachtet?', a: 'Ja. Hähnchen und Rinder werden direkt auf dem Hof geschlachtet, sodass lange Transportwege entfallen. Schweine werden einmal im Monat in unserem EG-zertifizierten Schlachthaus verarbeitet.' },
  { q: 'Warum ist der Hof kein Bio-Betrieb?', a: 'Wir setzen auf ressourcenschonende Bewirtschaftung mit gentechnikfreiem Futter, niedriger Besatzdichte, Blühstreifen und Medikamenten nur im Notfall. Auf übermäßige Einschränkungen, die Ernteausfälle riskieren, verzichten wir bewusst.' },
  { q: 'Kann ich Fleisch oder Geflügel vorbestellen?', a: 'Ja. Fleischpakete und Geflügel für besondere Anlässe können Sie telefonisch unter 02732-4379 oder persönlich im Hofladen vorbestellen. Alle Infos erhalten Sie vor Ort.' },
  { q: 'Gibt es Rohmilch zu kaufen?', a: 'Frische Rohmilch direkt aus dem Milchtank ist zu den Öffnungszeiten des Bedienungsladens erhältlich. Sie ist nur etwa drei Tage haltbar – das Gesundheitsamt empfiehlt, sie vor dem Verzehr abzukochen. Bitte bringen Sie ein Gefäß mit; Glasflaschen gibt es auch bei uns.' },
  { q: 'Wie erreiche ich den Irlenhof?', a: 'Wir liegen am Fuße des Naherholungsgebiets Kindelsberg am Ortsrand von Kreuztal-Ferndorf. Unsere Anschrift: Irlenweg 3, 57223 Kreuztal. Eine Anfahrtskarte finden Sie auf der Kontaktseite.' },
];

export const cookieGroups = [
  { id: 'necessary', label: 'Notwendig', description: 'Für den Betrieb der Website erforderlich.', locked: true },
  { id: 'preferences', label: 'Einstellungen', description: 'Merkt sich Ihre Auswahl, zum Beispiel den Farbmodus.', locked: false },
  { id: 'external', label: 'Externe Inhalte', description: 'Karten und eingebettete Inhalte werden erst nach Zustimmung geladen.', locked: false },
];
