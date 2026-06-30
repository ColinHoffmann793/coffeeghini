// Café catalogue for coffeeghini — Düsseldorf edition.
// NOTE: café names + neighbourhoods are real Düsseldorf spots, but the per-café
// details (addresses, opening hours, phone, coffee menu, ratings, features,
// coords) are ILLUSTRATIVE placeholders — verify/replace before any real use.
// Images use Unsplash; the UI degrades gracefully to a themed gradient if any fail.

const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const CITY = { name: 'Düsseldorf', center: { lat: 51.2205, lng: 6.7860 } }

export const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
export const DAY_LABELS = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
  fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
}
// helper: same hours Mon–Fri, plus Sat + Sun (each [open, close] or null = closed)
const hrs = (wd, sat, sun) => ({ mon: wd, tue: wd, wed: wd, thu: wd, fri: wd, sat, sun })

// Taste preference vocabulary — shared by the Profile ("personal taste") and the
// Discovery filter so users can filter for cafés that match what they like.
export const PREFERENCE_OPTIONS = {
  drinks: ['Espresso', 'Cappuccino', 'Flat White', 'Latte', 'Cortado', 'Filter', 'Cold Brew', 'Mocha'],
  roast: ['Light', 'Medium', 'Medium-dark', 'Dark'],
  milk: ['Whole', 'Oat', 'Almond', 'Soy', 'None'],
  strength: ['Mild', 'Balanced', 'Strong', 'Extra strong'],
}

// Filter super-categories (each maps to a café attribute key + the profile field).
export const FILTER_GROUPS = [
  { key: 'drinks', prefKey: 'drinks', label: 'Drinks', options: PREFERENCE_OPTIONS.drinks },
  { key: 'roasts', prefKey: 'roast', label: 'Roast', options: PREFERENCE_OPTIONS.roast },
  { key: 'milks', prefKey: 'milk', label: 'Milk', options: PREFERENCE_OPTIONS.milk },
  { key: 'strengths', prefKey: 'strength', label: 'Strength', options: PREFERENCE_OPTIONS.strength },
]

export const STAMP_GOAL = 10

export const CAFES = [
  {
    id: 'huftgold',
    name: 'Café Hüftgold',
    location: 'Flingern',
    coords: { lat: 51.2300, lng: 6.8055 },
    address: { street: 'Ackerstraße 113', zip: '40233', city: 'Düsseldorf' },
    phone: '+49 211 16920678',
    website: 'cafe-hueftgold.de',
    price: 2,
    tagline: 'Cult café for homemade cakes',
    tags: ['Cake', 'Brunch'],
    coworking: false,
    accent: '#b5835a',
    hours: hrs(['09:00', '19:00'], ['10:00', '19:00'], ['10:00', '19:00']),
    features: ['Homemade cake', 'Outdoor seating', 'Wi-Fi', 'Card payment', 'Vegan options'],
    drinks: ['Espresso', 'Cappuccino', 'Flat White', 'Latte', 'Filter'],
    roasts: ['Medium', 'Medium-dark'],
    milks: ['Whole', 'Oat', 'Almond'],
    strengths: ['Mild', 'Balanced'],
    images: [
      img('1501339847302-ac426a4a7cbb'),
      img('1554118811-1e0d58224f24'),
      img('1442512595331-e89e73853f31'),
    ],
    about:
      'A Flingern institution on Ackerstraße, famous for towering homemade cakes and a buzzing weekend brunch. Mismatched vintage furniture and an always-busy pavement terrace.',
    coffee: {
      house: 'Classic house espresso',
      roast: 'Medium',
      origin: 'Brazil · Colombia',
      method: 'Espresso, Filter',
      signature: 'Cappuccino & a slice of cake',
      notes: ['Chocolate', 'Caramel', 'Nutty'],
    },
  },
  {
    id: 'woyton',
    name: 'Woyton',
    location: 'Carlstadt',
    coords: { lat: 51.2233, lng: 6.7745 },
    address: { street: 'Hohe Straße 41', zip: '40213', city: 'Düsseldorf' },
    phone: '+49 211 13929280',
    website: 'woyton.de',
    price: 2,
    tagline: 'Düsseldorf coffee-house classic',
    tags: ['Brunch', 'All-day'],
    coworking: true,
    accent: '#9c6b4a',
    hours: hrs(['08:00', '20:00'], ['08:30', '20:00'], ['09:00', '20:00']),
    features: ['Wi-Fi', 'Power outlets', 'Outdoor seating', 'Takeaway', 'Card payment'],
    drinks: ['Espresso', 'Cappuccino', 'Latte', 'Mocha', 'Cold Brew'],
    roasts: ['Medium', 'Medium-dark', 'Dark'],
    milks: ['Whole', 'Oat', 'Soy'],
    strengths: ['Balanced', 'Strong'],
    images: [
      img('1453614512568-c4024d13c247'),
      img('1559925393-8be0ec4767c8'),
      img('1447933601403-0c6688de566e'),
    ],
    about:
      'A laid-back local coffee-house by the Carlsplatz market. Generous breakfasts, big mugs and a relaxed crowd — a Düsseldorf staple for years.',
    coffee: {
      house: 'Woyton house blend',
      roast: 'Medium-dark',
      origin: 'Central & South America',
      method: 'Espresso, Drip',
      signature: 'Café Latte XL',
      notes: ['Cocoa', 'Toasted nut', 'Brown sugar'],
    },
  },
  {
    id: 'heinemann',
    name: 'Konditorei Heinemann',
    location: 'Stadtmitte',
    coords: { lat: 51.2268, lng: 6.7800 },
    address: { street: 'Martin-Luther-Platz 32', zip: '40212', city: 'Düsseldorf' },
    phone: '+49 211 132535',
    website: 'konditorei-heinemann.de',
    price: 3,
    tagline: 'Iconic patisserie & café',
    tags: ['Cake', 'Patisserie'],
    coworking: false,
    accent: '#c0703f',
    hours: hrs(['09:00', '18:30'], ['09:00', '18:30'], null),
    features: ['Patisserie', 'Card payment', 'Wheelchair access', 'Takeaway'],
    drinks: ['Espresso', 'Cappuccino', 'Latte', 'Mocha'],
    roasts: ['Medium', 'Dark'],
    milks: ['Whole', 'Oat'],
    strengths: ['Balanced', 'Strong'],
    images: [
      img('1514432324607-a09d9b4aefdd'),
      img('1517701550927-30cf4ba1dba5'),
      img('1442975631115-c4f7b05b8a2c'),
    ],
    about:
      'The legendary Düsseldorf confectioner, beloved for its champagne truffles and elegant café counters near the Königsallee. Coffee and pâtisserie done the classic way.',
    coffee: {
      house: 'Wiener Melange',
      roast: 'Medium',
      origin: 'House roast',
      method: 'Espresso, Filter',
      signature: 'Champagne truffle + espresso',
      notes: ['Vanilla', 'Chocolate', 'Hazelnut'],
    },
  },
  {
    id: 'hej',
    name: 'Hej Coffee',
    location: 'Unterbilk',
    coords: { lat: 51.2128, lng: 6.7732 },
    address: { street: 'Lorettostraße 19', zip: '40219', city: 'Düsseldorf' },
    phone: '+49 211 30207780',
    website: 'hej-coffee.de',
    price: 2,
    tagline: 'Scandinavian specialty café',
    tags: ['Specialty', 'Brunch'],
    coworking: true,
    accent: '#6f8c8d',
    hours: hrs(['08:00', '18:00'], ['09:00', '18:00'], ['09:00', '17:00']),
    features: ['Specialty coffee', 'Wi-Fi', 'Vegan options', 'Outdoor seating', 'Card payment'],
    drinks: ['Espresso', 'Cappuccino', 'Flat White', 'Cortado', 'Filter', 'Cold Brew'],
    roasts: ['Light', 'Medium'],
    milks: ['Whole', 'Oat', 'Almond', 'Soy'],
    strengths: ['Mild', 'Balanced'],
    images: [
      img('1521017432531-fbd92d768814'),
      img('1495474472287-4d71bcdd2085'),
      img('1509042239860-f550ce710b93'),
    ],
    about:
      'A bright, hygge-minded café in Unterbilk’s Lorettoviertel. Nordic-style light roasts, careful pour-overs and cinnamon buns by the window.',
    coffee: {
      house: 'Light Nordic roast',
      roast: 'Light',
      origin: 'Ethiopia · Kenya',
      method: 'Filter, V60, Espresso',
      signature: 'Pour-over of the week',
      notes: ['Floral', 'Citrus', 'Berry'],
    },
  },
  {
    id: 'knulle',
    name: 'Café Knülle',
    location: 'Bilk',
    coords: { lat: 51.2065, lng: 6.7858 },
    address: { street: 'Suitbertusstraße 142', zip: '40223', city: 'Düsseldorf' },
    phone: '+49 211 15983390',
    website: 'cafe-knuelle.de',
    price: 2,
    tagline: 'Cosy all-day breakfast café',
    tags: ['Brunch', 'Breakfast'],
    coworking: true,
    accent: '#7d6cae',
    hours: hrs(['09:00', '18:00'], ['09:00', '18:00'], ['09:30', '18:00']),
    features: ['All-day breakfast', 'Wi-Fi', 'Outdoor seating', 'Dog-friendly', 'Card payment'],
    drinks: ['Espresso', 'Cappuccino', 'Latte', 'Filter'],
    roasts: ['Medium'],
    milks: ['Whole', 'Oat', 'Soy'],
    strengths: ['Mild', 'Balanced'],
    images: [
      img('1559496417-e7f25cb247f3'),
      img('1521302080334-4bebac2763a6'),
      img('1497935586351-b67a49e012bf'),
    ],
    about:
      'A snug, welcoming neighbourhood café in Bilk known for unhurried breakfasts and a friendly local crowd — the kind of place you settle into for hours.',
    coffee: {
      house: 'Knülle breakfast blend',
      roast: 'Medium',
      origin: 'Brazil · Honduras',
      method: 'Espresso, French press',
      signature: 'Milchkaffee & breakfast board',
      notes: ['Malt', 'Milk chocolate', 'Almond'],
    },
  },
  {
    id: 'pureorigins',
    name: 'Pure Origins',
    location: 'Oberbilk',
    coords: { lat: 51.2098, lng: 6.7998 },
    address: { street: 'Kölner Straße 100', zip: '40227', city: 'Düsseldorf' },
    phone: '+49 211 54559010',
    website: 'pureorigins.coffee',
    price: 2,
    tagline: 'Specialty roastery & brew bar',
    tags: ['Specialty', 'Roastery'],
    coworking: true,
    accent: '#3f7e8c',
    hours: hrs(['08:30', '17:00'], ['10:00', '16:00'], null),
    features: ['Specialty coffee', 'On-site roastery', 'Beans to buy', 'Wi-Fi', 'Card payment'],
    drinks: ['Espresso', 'Flat White', 'Cortado', 'Filter', 'Cold Brew'],
    roasts: ['Light', 'Medium'],
    milks: ['Whole', 'Oat', 'Almond'],
    strengths: ['Mild', 'Balanced', 'Strong'],
    images: [
      img('1498804103079-a6351b050096'),
      img('1485808191679-5f86510681a2'),
      img('1511920170033-f8396924c348'),
    ],
    about:
      'A specialty roaster and brew bar focused on traceable single origins. Beans roasted nearby, refractometers on the bar and staff happy to nerd out over extraction.',
    coffee: {
      house: 'Rotating single origin',
      roast: 'Light',
      origin: 'Ethiopia · Colombia · Guatemala',
      method: 'Filter, Espresso, Batch Brew',
      signature: 'Filter flight',
      notes: ['Stone fruit', 'Honey', 'Tea-like'],
    },
  },
]

// Café-hosted community events for the Social tab. `daysFromNow` keeps them
// always upcoming in the demo; the UI formats the actual date.
export const EVENTS = [
  {
    id: 'dj-woyton', cafeId: 'woyton', type: 'DJ Session', emoji: '🎧',
    image: img('1470225620780-dba8ba36b745'),
    title: 'Friday Night DJ Session', daysFromNow: 1, time: '19:00 – 23:00', price: 'Free entry', attending: 42,
    description: 'Wind down the week with vinyl sets from local DJs, signature cold brews and a buzzing crowd.',
    details: 'Doors from 19:00. Two rotating DJs spin soul, funk and house on vinyl while the bar pours cold brew cocktails and natural wines. No cover charge — just turn up. It usually fills up after 21:00, so come early for a seat.',
  },
  {
    id: 'read-hej', cafeId: 'hej', type: 'Reading', emoji: '📚',
    image: img('1481627834876-b7833e8f5570'),
    title: 'Silent Book Club', daysFromNow: 3, time: '10:00 – 12:00', price: 'Free · drink separate', attending: 18,
    description: 'Bring a book, grab a filter coffee and read in good company — no pressure to talk, just cosy focus.',
    details: 'A relaxed hour of silent reading followed by an optional coffee chat for anyone who wants to swap recommendations. Bring whatever you’re into — novel, comic or work reading. Comfy window corners are first-come, first-served.',
  },
  {
    id: 'latte-pure', cafeId: 'pureorigins', type: 'Latte Art', emoji: '🎨',
    image: img('1541167760496-1628856ab772'),
    title: 'Latte Art Throwdown', daysFromNow: 5, time: '18:30 – 21:00', price: '€8 · includes a drink', attending: 31,
    description: 'Watch baristas battle for the cleanest rosetta — or step up and pour your own. Beginners welcome.',
    details: 'Watch the bracket-style throwdown on the espresso bar, then try a guided pour yourself. All skill levels welcome — milk and cups are provided. Prizes from local roasters go to the cleanest pour of the night.',
  },
  {
    id: 'speed-huftgold', cafeId: 'huftgold', type: 'Speed Dating', emoji: '💛',
    image: img('1517248135467-4c7edcad34c4'),
    title: 'Coffee & Speed Dating', daysFromNow: 6, time: '19:30 – 22:00', price: '€15 · cake & coffee', attending: 24,
    description: 'Five-minute chats over cake and cortados. Singles 25–38 — sign-up required at the counter.',
    details: 'Hosted speed dating for ages 25–38 — around ten five-minute dates across the evening, with cake and cortados between rounds. Sign up at the counter or online; spots are limited and tend to go fast.',
  },
  {
    id: 'brew-pure', cafeId: 'pureorigins', type: 'Workshop', emoji: '⚗️',
    image: img('1610889556528-9a770e32642f'),
    title: 'Home Brewing Workshop', daysFromNow: 8, time: '11:00 – 13:00', price: '€29 · beans included', attending: 12,
    description: 'Dial in the perfect V60 at home — learn grind, ratio and pour technique with our head roaster.',
    details: 'A hands-on class with our head roaster covering grind size, ratios, water and pour technique on the V60. You’ll taste as you go and take home a bag of fresh beans plus a recipe card. Small group of eight.',
  },
  {
    id: 'games-knulle', cafeId: 'knulle', type: 'Games', emoji: '🎲',
    image: img('1610890716171-6b1bb98ffd09'),
    title: 'Board Game Brunch', daysFromNow: 9, time: '10:00 – 14:00', price: 'Free · brunch à la carte', attending: 27,
    description: 'Sunday brunch meets a wall of board games. Pull up a chair — the game catalogue is on the house.',
    details: 'Sunday brunch with a whole wall of board games to borrow. Family-friendly until noon, then it gets competitive. Big shared tables — come solo and join in, or bring your own crew.',
  },
  {
    id: 'lang-hej', cafeId: 'hej', type: 'Meetup', emoji: '💬',
    image: img('1543007630-9710e4a00a20'),
    title: 'Language Café (DE / EN)', daysFromNow: 11, time: '18:00 – 20:00', price: 'Free', attending: 36,
    description: 'Swap German and English over coffee. All levels — friendly tables grouped by language and topic.',
    details: 'Tables are grouped by language and level, with friendly facilitators to keep conversation flowing. Switch tables halfway through to practise the other language. A great, low-pressure way to meet people new to Düsseldorf.',
  },
  {
    id: 'tasting-heinemann', cafeId: 'heinemann', type: 'Tasting', emoji: '🍰',
    image: img('1558326567-98ae2405596b'),
    title: 'Pâtisserie Pairing Evening', daysFromNow: 13, time: '19:00 – 21:00', price: '€24 · 6 pairings', attending: 20,
    description: 'A guided tasting of signature pralinés paired with single-origin espresso. Limited seats.',
    details: 'A guided evening pairing six signature pralinés and pâtisserie with matched single-origin espresso and tea, led by the Heinemann team. Seats are limited to sixteen, so booking ahead is required.',
  },
]
