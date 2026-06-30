import { useEffect, useRef, useState } from 'react'
import { CAFES, EVENTS, STAMP_GOAL } from './data.js'
import { useStore } from './useStore.js'
import { emptyFilter } from './cafeUtils.js'
import BottomNav from './components/BottomNav.jsx'
import Discovery from './components/Discovery.jsx'
import Stampcard from './components/Stampcard.jsx'
import Social from './components/Social.jsx'
import Profile from './components/Profile.jsx'
import QRScanner from './components/QRScanner.jsx'
import FilterSheet from './components/FilterSheet.jsx'
import CafeDetail from './components/CafeDetail.jsx'
import EventDetail from './components/EventDetail.jsx'
import ScanConfirm from './components/ScanConfirm.jsx'

function resolveTargetCafe(text, state) {
  // A real QR code may encode a café id, e.g. "coffeeghini:aurora".
  if (text) {
    const lower = String(text).toLowerCase()
    const match = CAFES.find((c) => lower.includes(c.id))
    if (match) return match.id
  }
  // Demo fallback: progress the started card closest to completion first,
  // so the redeem flow can be reached quickly; then start a fresh café.
  const started = CAFES.filter((c) => {
    const n = state.stamps[c.id] || 0
    return n > 0 && n < STAMP_GOAL
  }).sort((a, b) => (state.stamps[b.id] || 0) - (state.stamps[a.id] || 0))
  if (started.length) return started[0].id

  const fresh = CAFES.find((c) => !(state.stamps[c.id] > 0) && !state.redeemed[c.id])
  if (fresh) return fresh.id
  return CAFES[0].id
}

function StatusBar() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
    tick()
    const t = setInterval(tick, 30000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="statusbar">
      <span className="sb-time">{time}</span>
      <div className="sb-right">
        <svg viewBox="0 0 20 14" width="18" height="12" aria-hidden><g fill="currentColor"><rect x="0" y="8" width="3" height="6" rx="1" /><rect x="5" y="5" width="3" height="9" rx="1" /><rect x="10" y="2" width="3" height="12" rx="1" /><rect x="15" y="0" width="3" height="14" rx="1" /></g></svg>
        <svg viewBox="0 0 24 14" width="22" height="12" aria-hidden fill="none" stroke="currentColor"><rect x="1" y="2" width="18" height="10" rx="2.5" strokeWidth="1.4" /><rect x="3" y="4" width="13" height="6" rx="1" fill="currentColor" stroke="none" /><rect x="20.5" y="5" width="2" height="4" rx="1" fill="currentColor" stroke="none" /></svg>
      </div>
    </div>
  )
}

export default function App() {
  const store = useStore()
  const [tab, setTab] = useState('discovery')
  const [scannerOpen, setScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [justAdded, setJustAdded] = useState({ cafeId: null, index: -1 })
  const [filter, setFilter] = useState(emptyFilter)
  const [filterOpen, setFilterOpen] = useState(false)
  const [detailId, setDetailId] = useState(null)
  const [eventId, setEventId] = useState(null)
  const popTimer = useRef(null)
  const mainRef = useRef(null)

  // Each tab should start at the top rather than inherit the previous scroll.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [tab])

  const handleScanResult = (text) => {
    const cafeId = resolveTargetCafe(text, store.state)
    const cafe = CAFES.find((c) => c.id === cafeId)
    const before = store.state.stamps[cafeId] || 0

    if (before >= STAMP_GOAL) {
      setScanResult({ cafeId, cafeName: cafe.name, accent: cafe.accent, count: before, index: -1, complete: true, alreadyFull: true })
      return
    }
    store.addStamp(cafeId)
    const next = before + 1
    setScanResult({ cafeId, cafeName: cafe.name, accent: cafe.accent, count: next, index: before, complete: next >= STAMP_GOAL, alreadyFull: false })
  }

  // Dismissing the confirmation pop-up is what advances to the stamp card.
  const dismissScan = () => {
    const r = scanResult
    setScanResult(null)
    setTab('stampcard')
    if (r && !r.alreadyFull) {
      setJustAdded({ cafeId: r.cafeId, index: r.index })
      clearTimeout(popTimer.current)
      popTimer.current = setTimeout(() => setJustAdded({ cafeId: null, index: -1 }), 900)
    }
  }

  useEffect(() => () => clearTimeout(popTimer.current), [])

  const openEvent = eventId ? EVENTS.find((e) => e.id === eventId) : null

  return (
    <div className="app-shell">
      <div className="phone">
        <StatusBar />

        <main className="app-main" ref={mainRef}>
          {tab === 'discovery' && (
            <Discovery
              ratings={store.state.ratings}
              filter={filter}
              onOpenFilter={() => setFilterOpen(true)}
              onOpenCafe={setDetailId}
            />
          )}
          {tab === 'stampcard' && <Stampcard store={store} justAdded={justAdded} onOpenCafe={setDetailId} />}
          {tab === 'social' && <Social store={store} onOpenCafe={setDetailId} onOpenEvent={setEventId} />}
          {tab === 'profile' && <Profile store={store} />}
        </main>

        <BottomNav active={tab} onChange={setTab} onScan={() => setScannerOpen(true)} />

        <FilterSheet
          open={filterOpen}
          value={filter}
          onChange={setFilter}
          onClose={() => setFilterOpen(false)}
          preferences={store.state.preferences}
        />

        {detailId && (
          <CafeDetail
            cafe={CAFES.find((c) => c.id === detailId)}
            store={store}
            onClose={() => setDetailId(null)}
            onScan={() => { setDetailId(null); setScannerOpen(true) }}
          />
        )}

        {openEvent && (
          <EventDetail
            event={openEvent}
            cafe={CAFES.find((c) => c.id === openEvent.cafeId)}
            store={store}
            onClose={() => setEventId(null)}
            onOpenCafe={(id) => { setEventId(null); setDetailId(id) }}
          />
        )}

        {scannerOpen && (
          <QRScanner onResult={handleScanResult} onClose={() => setScannerOpen(false)} />
        )}

        <ScanConfirm result={scanResult} onClose={dismissScan} />
      </div>
    </div>
  )
}
