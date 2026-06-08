import { useState } from 'react'
import { CAFES, CITY, CAFE_FILTERS } from '../data.js'
import { Icon } from '../icons.jsx'
import ImageCarousel from './ImageCarousel.jsx'
import MapView from './MapView.jsx'

function CafeCard({ cafe, rating }) {
  return (
    <article className="cafe-card">
      <ImageCarousel images={cafe.images} accent={cafe.accent} />
      <div className="cafe-body">
        <div className="cafe-head">
          <div>
            <h2 className="cafe-name">{cafe.name}</h2>
            <p className="cafe-loc">
              <Icon.Pin width="14" height="14" /> {cafe.location} · {CITY.name}
            </p>
          </div>
          {rating != null && (
            <div className="cafe-rating-pill">
              <Icon.Star filled width="13" height="13" /> {rating.toFixed(1)}
            </div>
          )}
        </div>

        <div className="tag-row">
          <span className="tagline" style={{ '--accent': cafe.accent }}>{cafe.tagline}</span>
          {cafe.tags.map((t) => (
            <span key={t} className="cat-chip">{t}</span>
          ))}
        </div>
        <p className="cafe-about">{cafe.about}</p>

        <div className="coffee-box" style={{ '--accent': cafe.accent }}>
          <div className="coffee-box-title">
            <Icon.Cup width="16" height="16" /> The coffee
          </div>
          <dl className="coffee-grid">
            <div><dt>House pick</dt><dd>{cafe.coffee.house}</dd></div>
            <div><dt>Roast</dt><dd>{cafe.coffee.roast}</dd></div>
            <div><dt>Origins</dt><dd>{cafe.coffee.origin}</dd></div>
            <div><dt>Brew</dt><dd>{cafe.coffee.method}</dd></div>
            <div className="span"><dt>Signature</dt><dd>{cafe.coffee.signature}</dd></div>
          </dl>
          <div className="notes">
            {cafe.coffee.notes.map((n) => (
              <span key={n} className="note-chip">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Discovery({ ratings }) {
  const [view, setView] = useState('list')
  const [filter, setFilter] = useState('All')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = filter === 'All' ? CAFES : CAFES.filter((c) => c.tags.includes(filter))
  const options = ['All', ...CAFE_FILTERS]

  const pick = (f) => {
    setFilter(f)
    setFilterOpen(false)
  }

  return (
    <div className={`screen discovery-head-screen ${view === 'map' ? 'map-mode' : ''}`}>
      <header className="screen-head discovery-head">
        <div className="head-title">
          <p className="eyebrow">Discover · {CITY.name}</p>
          <h1>Find your café</h1>
        </div>

        <div className="screen-head-tools">
          <div className="view-toggle">
            <button className={view === 'list' ? 'vt active' : 'vt'} onClick={() => setView('list')}>
              List
            </button>
            <button className={view === 'map' ? 'vt active' : 'vt'} onClick={() => setView('map')}>
              <Icon.Pin width="14" height="14" /> Map
            </button>
          </div>

          <div className="filter-anchor">
            <button
              className={filter !== 'All' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilterOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={filterOpen}
            >
              <Icon.Filter width="17" height="17" />
              <span>{filter === 'All' ? 'Filter' : filter}</span>
              {filter !== 'All' && <span className="filter-dot" />}
            </button>

            {filterOpen && (
              <>
                <div className="filter-backdrop" onClick={() => setFilterOpen(false)} />
                <div className="filter-pop" role="menu">
                  <p className="filter-pop-title">Filter by</p>
                  {options.map((f) => (
                    <button
                      key={f}
                      role="menuitemradio"
                      aria-checked={filter === f}
                      className={filter === f ? 'filter-option active' : 'filter-option'}
                      onClick={() => pick(f)}
                    >
                      <span>{f}</span>
                      {filter === f && <Icon.Check width="16" height="16" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {view === 'list' ? (
        <div className="feed">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Icon.Cup width="40" height="40" />
              <h3>No cafés here</h3>
              <p>No spots match “{filter}” yet. Try another filter.</p>
            </div>
          ) : (
            filtered.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} rating={ratings[cafe.id]?.stars} />
            ))
          )}
          {filtered.length > 0 && (
            <p className="feed-end">You've reached the bottom of the cup ☕</p>
          )}
        </div>
      ) : (
        <div className="map-area">
          <MapView cafes={filtered} ratings={ratings} />
        </div>
      )}
    </div>
  )
}
