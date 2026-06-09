import { useState } from 'react'
import { CAFES, CITY } from '../data.js'
import { Icon } from '../icons.jsx'
import { matchesFilter, countFilters } from '../cafeUtils.js'
import ImageCarousel from './ImageCarousel.jsx'
import MapView from './MapView.jsx'

function CafeCard({ cafe, rating, onOpen }) {
  return (
    <article className="cafe-card tappable" onClick={onOpen}>
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

        <span className="card-more">View details <Icon.ChevronLeft width="14" height="14" style={{ transform: 'rotate(180deg)' }} /></span>
      </div>
    </article>
  )
}

export default function Discovery({ ratings, filter, onOpenFilter, onOpenCafe }) {
  const [view, setView] = useState('list')

  const filtered = CAFES.filter((c) => matchesFilter(c, filter))
  const activeCount = countFilters(filter)

  return (
    <div className={`screen discovery-screen ${view === 'map' ? 'map-mode' : ''}`}>
      <header className="screen-head discovery-head">
        <div className="head-title">
          <p className="eyebrow">Discover · {CITY.name}</p>
          <h1>Find your café</h1>
        </div>

        <div className="screen-head-tools">
          <div className="view-toggle">
            <button className={view === 'list' ? 'vt active' : 'vt'} onClick={() => setView('list')}>List</button>
            <button className={view === 'map' ? 'vt active' : 'vt'} onClick={() => setView('map')}>
              <Icon.Pin width="14" height="14" /> Map
            </button>
          </div>

          <button
            className={activeCount > 0 ? 'filter-btn active' : 'filter-btn'}
            onClick={onOpenFilter}
          >
            <Icon.Filter width="17" height="17" />
            <span>Filter</span>
            {activeCount > 0 && <span className="filter-badge">{activeCount}</span>}
          </button>
        </div>
      </header>

      {view === 'list' ? (
        <div className="feed">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Icon.Cup width="40" height="40" />
              <h3>No matches</h3>
              <p>No cafés fit your current taste filter. Try removing a few.</p>
              <button className="btn-ghost" onClick={onOpenFilter}>Adjust filter</button>
            </div>
          ) : (
            filtered.map((cafe) => (
              <CafeCard
                key={cafe.id}
                cafe={cafe}
                rating={ratings[cafe.id]?.stars}
                onOpen={() => onOpenCafe(cafe.id)}
              />
            ))
          )}
          {filtered.length > 0 && (
            <p className="feed-end">{filtered.length} of {CAFES.length} cafés ☕</p>
          )}
        </div>
      ) : (
        <div className="map-area">
          <MapView cafes={filtered} ratings={ratings} onOpenCafe={onOpenCafe} />
        </div>
      )}
    </div>
  )
}
