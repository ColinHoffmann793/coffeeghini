import { DAY_KEYS, DAY_LABELS, FILTER_GROUPS } from './data.js'

const ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// Live open/closed status using the current time.
export function getOpenStatus(cafe, now = new Date()) {
  const dayIdx = now.getDay()
  const today = cafe.hours?.[DAY_KEYS[dayIdx]]
  const nowMin = now.getHours() * 60 + now.getMinutes()

  if (today) {
    const [o, c] = today
    const om = toMin(o)
    const cm = toMin(c)
    if (nowMin >= om && nowMin < cm) {
      const left = cm - nowMin
      return left <= 30
        ? { open: true, soon: true, label: `Closing soon · ${c}` }
        : { open: true, soon: false, label: `Open now · until ${c}` }
    }
    if (nowMin < om) return { open: false, soon: false, label: `Closed · opens ${o}` }
  }
  for (let i = 1; i <= 7; i++) {
    const k = DAY_KEYS[(dayIdx + i) % 7]
    const h = cafe.hours?.[k]
    if (h) return { open: false, soon: false, label: `Closed · opens ${DAY_LABELS[k].slice(0, 3)} ${h[0]}` }
  }
  return { open: false, soon: false, label: 'Closed' }
}

export function formatHours(cafe, now = new Date()) {
  const todayKey = DAY_KEYS[now.getDay()]
  return ORDER.map((k) => {
    const h = cafe.hours?.[k]
    return { key: k, label: DAY_LABELS[k], range: h ? `${h[0]} – ${h[1]}` : 'Closed', today: k === todayKey }
  })
}

// A café passes if, for every group the user picked options in, it offers at
// least one of them (OR within a group, AND across groups).
export function matchesFilter(cafe, filter) {
  if (!filter) return true
  for (const g of FILTER_GROUPS) {
    const sel = filter[g.key]
    if (sel && sel.length) {
      const have = cafe[g.key] || []
      if (!sel.some((s) => have.includes(s))) return false
    }
  }
  if (filter.coworking && !cafe.coworking) return false
  return true
}

export const emptyFilter = () => ({
  ...FILTER_GROUPS.reduce((acc, g) => ({ ...acc, [g.key]: [] }), {}),
  coworking: false,
})

export function countFilters(filter) {
  if (!filter) return 0
  return FILTER_GROUPS.reduce((n, g) => n + (filter[g.key]?.length || 0), 0) + (filter.coworking ? 1 : 0)
}

// Build a filter from the user's saved profile "personal taste".
export function prefsToFilter(prefs = {}) {
  return {
    drinks: [...(prefs.drinks || [])],
    roasts: prefs.roast ? [prefs.roast] : [],
    milks: prefs.milk && prefs.milk !== 'None' ? [prefs.milk] : [],
    strengths: prefs.strength ? [prefs.strength] : [],
    coworking: !!prefs.coworking,
  }
}

export const formatAddress = (cafe) =>
  cafe.address ? `${cafe.address.street}, ${cafe.address.zip} ${cafe.address.city}` : ''

export const mapsLink = (cafe) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${cafe.name}, ${cafe.address?.street ?? ''}, ${cafe.address?.city ?? ''}`,
  )}`

export const priceLabel = (price = 0) => '€'.repeat(Math.max(1, price))
