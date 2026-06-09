import { useEffect, useRef, useState } from 'react'
import { CAFES, STAMP_GOAL } from './data.js'
import { useStore } from './useStore.js'
import { emptyFilter } from './cafeUtils.js'
import BottomNav from './components/BottomNav.jsx'
import Discovery from './components/Discovery.jsx'
import Stampcard from './components/Stampcard.jsx'
import Ratings from './components/Ratings.jsx'
import Profile from './components/Profile.jsx'
import QRScanner from './components/QRScanner.jsx'
import FilterSheet from './components/FilterSheet.jsx'
import CafeDetail from './components/CafeDetail.jsx'

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
  const [toast, setToast] = useState(null)
  const [justAdded, setJustAdded] = useState({ cafeId: null, index: -1 })
  const [filter, setFilter] = useState(emptyFilter)
  const [filterOpen, setFilterOpen] = useState(false)
  const [detailId, setDetailId] = useState(null)
  const toastTimer = useRef(null)
  const popTimer = useRef(null)
  const mainRef = useRef(null)

  // Each tab should start at the top rather than inherit the previous scroll.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [tab])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }

  const handleScanResult = (text) => {
    const cafeId = resolveTargetCafe(text, store.state)
    const cafe = CAFES.find((c) => c.id === cafeId)
    const before = store.state.stamps[cafeId] || 0

    if (before >= STAMP_GOAL) {
      showToast(`${cafe.name} card is full — tap Redeem!`)
      setTab('stampcard')
      return
    }
    store.addStamp(cafeId)
    setTab('stampcard')
    setJustAdded({ cafeId, index: before })
    clearTimeout(popTimer.current)
    popTimer.current = setTimeout(() => setJustAdded({ cafeId: null, index: -1 }), 900)
    const next = before + 1
    showToast(next >= STAMP_GOAL ? `🎉 ${cafe.name} complete — free coffee!` : `+1 stamp · ${cafe.name} (${next}/${STAMP_GOAL})`)
  }

  useEffect(() => () => { clearTimeout(toastTimer.current); clearTimeout(popTimer.current) }, [])

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
          {tab === 'stampcard' && <Stampcard store={store} justAdded={justAdded} />}
          {tab === 'ratings' && <Ratings store={store} />}
          {tab === 'profile' && <Profile store={store} />}
        </main>

        {toast && <div className="toast" key={toast}>{toast}</div>}

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

        {scannerOpen && (
          <QRScanner onResult={handleScanResult} onClose={() => setScannerOpen(false)} />
        )}
      </div>
    </div>
  )
}
