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
    accent: '#3f7e8c',
    hours: hrs(['08:30', '17:00'], ['10:00', '16:00'], null),
    features: ['Specialty coffee', 'On-site roastery', 'Beans to buy', 'Wi-Fi', 'Card payment'],
    drinks: ['Espresso', 'Flat White', 'Cortado', 'Filter', 'Cold Brew'],
    roasts: ['Light', 'Medium'],
    milks: ['Whole', 'Oat', 'Almond'],
    strengths: ['Mild', 'Balanced', 'Strong'],
    images: [
      img('1453614512568-c4024d13c247'),
      img('1442512595331-e89e73853f31'),
      img('1501339847302-ac426a4a7cbb'),
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
