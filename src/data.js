// Café catalogue for coffeeghini — Düsseldorf edition.
// NOTE: café names + neighbourhoods are real, well-known Düsseldorf spots, but the
// per-café details (coffee menu, signature drinks, ratings, exact coords) are
// ILLUSTRATIVE placeholders — verify/replace before any real-world use.
// Images use Unsplash; the UI degrades gracefully to a themed gradient if any fail.
// coords are { lat, lng } within Düsseldorf, used by the map view.

const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const CITY = { name: 'Düsseldorf', center: { lat: 51.2205, lng: 6.7860 } }

// Filterable categories (Discovery filter bar). "All" is added by the UI.
export const CAFE_FILTERS = ['Specialty', 'Roastery', 'Cake', 'Brunch', 'Filter']

export const CAFES = [
  {
    id: 'huftgold',
    name: 'Café Hüftgold',
    location: 'Flingern',
    coords: { lat: 51.2300, lng: 6.8055 },
    tagline: 'Cult café for homemade cakes',
    tags: ['Cake', 'Brunch'],
    accent: '#b5835a',
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
    tagline: 'Düsseldorf coffee-house classic',
    tags: ['Brunch'],
    accent: '#9c6b4a',
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
    tagline: 'Iconic patisserie & café',
    tags: ['Cake'],
    accent: '#c0703f',
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
    tagline: 'Scandinavian specialty café',
    tags: ['Specialty', 'Filter', 'Brunch'],
    accent: '#6f8c8d',
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
    tagline: 'Cosy all-day breakfast café',
    tags: ['Brunch'],
    accent: '#7d6cae',
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
    tagline: 'Specialty roastery & brew bar',
    tags: ['Specialty', 'Roastery', 'Filter'],
    accent: '#3f7e8c',
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

export const STAMP_GOAL = 10

export const PREFERENCE_OPTIONS = {
  drinks: ['Espresso', 'Cappuccino', 'Flat White', 'Latte', 'Cortado', 'Filter', 'Cold Brew', 'Mocha'],
  roast: ['Light', 'Medium', 'Medium-dark', 'Dark'],
  milk: ['Whole', 'Oat', 'Almond', 'Soy', 'None'],
  strength: ['Mild', 'Balanced', 'Strong', 'Extra strong'],
}
