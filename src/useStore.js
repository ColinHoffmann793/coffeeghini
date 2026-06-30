import { useCallback, useEffect, useState } from 'react'
import { CAFES, STAMP_GOAL } from './data.js'

const KEY = 'coffeeghini.state.v2'

const defaultState = {
  profile: {
    name: 'Coffee Lover',
    handle: '@coffeeghini',
    home: 'Berlin',
  },
  // stamps collected per café id
  stamps: {
    huftgold: 7,
    woyton: 10,
    hej: 3,
  },
  // number of completed cards redeemed per café id
  redeemed: {},
  // ratings per café id: { stars, note, date }
  ratings: {
    woyton: { stars: 5, note: 'Great spot for a long lazy breakfast — big mugs and a comfy corner.', date: '2026-05-21' },
    huftgold: { stars: 4, note: 'The cakes are unreal. Coffee is solid; gets packed on weekends.', date: '2026-05-30' },
  },
  preferences: {
    drinks: ['Flat White', 'Filter'],
    roast: 'Light',
    milk: 'Oat',
    strength: 'Balanced',
    coworking: true,
    notes: 'Love fruity Ethiopians. Not a fan of anything too bitter.',
  },
  // event ids the user has RSVP'd to (Social tab)
  rsvps: {},
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw)
    return {
      ...defaultState,
      ...parsed,
      profile: { ...defaultState.profile, ...parsed.profile },
      preferences: { ...defaultState.preferences, ...parsed.preferences },
      stamps: { ...parsed.stamps },
      redeemed: { ...parsed.redeemed },
      ratings: { ...parsed.ratings },
      rsvps: { ...parsed.rsvps },
    }
  } catch {
    return defaultState
  }
}

export function useStore() {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignore quota errors */
    }
  }, [state])

  const addStamp = useCallback((cafeId, count = 1) => {
    setState((s) => {
      const current = s.stamps[cafeId] || 0
      const next = Math.min(current + count, STAMP_GOAL)
      return { ...s, stamps: { ...s.stamps, [cafeId]: next } }
    })
  }, [])

  const redeem = useCallback((cafeId) => {
    setState((s) => {
      if ((s.stamps[cafeId] || 0) < STAMP_GOAL) return s
      return {
        ...s,
        stamps: { ...s.stamps, [cafeId]: 0 },
        redeemed: { ...s.redeemed, [cafeId]: (s.redeemed[cafeId] || 0) + 1 },
      }
    })
  }, [])

  const setRating = useCallback((cafeId, stars, note) => {
    setState((s) => ({
      ...s,
      ratings: {
        ...s.ratings,
        [cafeId]: {
          stars,
          note: note ?? s.ratings[cafeId]?.note ?? '',
          date: new Date().toISOString().slice(0, 10),
        },
      },
    }))
  }, [])

  const removeRating = useCallback((cafeId) => {
    setState((s) => {
      const next = { ...s.ratings }
      delete next[cafeId]
      return { ...s, ratings: next }
    })
  }, [])

  const updatePreferences = useCallback((patch) => {
    setState((s) => ({ ...s, preferences: { ...s.preferences, ...patch } }))
  }, [])

  const toggleDrink = useCallback((drink) => {
    setState((s) => {
      const has = s.preferences.drinks.includes(drink)
      const drinks = has
        ? s.preferences.drinks.filter((d) => d !== drink)
        : [...s.preferences.drinks, drink]
      return { ...s, preferences: { ...s.preferences, drinks } }
    })
  }, [])

  const updateProfile = useCallback((patch) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }))
  }, [])

  const toggleRsvp = useCallback((eventId) => {
    setState((s) => ({ ...s, rsvps: { ...s.rsvps, [eventId]: !s.rsvps[eventId] } }))
  }, [])

  const resetAll = useCallback(() => setState(defaultState), [])

  // derived helpers
  const visitedCafes = CAFES.filter((c) => (state.stamps[c.id] || 0) > 0 || state.redeemed[c.id])
  const totalStamps =
    Object.values(state.stamps).reduce((a, b) => a + b, 0) +
    Object.values(state.redeemed).reduce((a, b) => a + b, 0) * STAMP_GOAL

  return {
    state,
    addStamp,
    redeem,
    setRating,
    removeRating,
    updatePreferences,
    toggleDrink,
    updateProfile,
    toggleRsvp,
    resetAll,
    derived: {
      visitedCafes,
      totalStamps,
      rewardsRedeemed: Object.values(state.redeemed).reduce((a, b) => a + b, 0),
      ratingsGiven: Object.keys(state.ratings).length,
    },
  }
}
