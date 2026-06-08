import { useState } from 'react'
import { CAFES } from '../data.js'
import { Icon } from '../icons.jsx'
import StarRating from './StarRating.jsx'

function RatingCard({ cafe, rating, onSave, onRemove }) {
  const [editing, setEditing] = useState(!rating)
  const [stars, setStars] = useState(rating?.stars || 0)
  const [note, setNote] = useState(rating?.note || '')

  const save = () => {
    if (stars === 0) return
    onSave(cafe.id, stars, note)
    setEditing(false)
  }

  return (
    <article className="rating-card" style={{ '--accent': cafe.accent }}>
      <div className="rating-card-head">
        <div className="rating-avatar" style={{ background: cafe.accent }}>
          {cafe.name.charAt(0)}
        </div>
        <div className="rating-meta">
          <h2 className="cafe-name">{cafe.name}</h2>
          <p className="cafe-loc"><Icon.Pin width="13" height="13" /> {cafe.location}</p>
        </div>
        {rating && !editing && (
          <button className="link-btn" onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>

      {editing ? (
        <div className="rating-edit">
          <StarRating value={stars} onChange={setStars} size={30} />
          <textarea
            className="rating-input"
            placeholder="Share a note about your visit…"
            value={note}
            maxLength={240}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="rating-edit-actions">
            <button className="btn-ghost" onClick={save} disabled={stars === 0}>
              <Icon.Check width="16" height="16" /> Save
            </button>
          </div>
        </div>
      ) : (
        <div className="rating-view">
          <div className="rating-stars-row">
            <StarRating value={rating.stars} readOnly size={20} />
            <span className="rating-date">{rating.date}</span>
          </div>
          {rating.note && <p className="rating-note">“{rating.note}”</p>}
          <button className="link-btn danger" onClick={() => onRemove(cafe.id)}>Remove rating</button>
        </div>
      )}
    </article>
  )
}

export default function Ratings({ store }) {
  const { state, setRating, removeRating } = store
  const rated = CAFES.filter((c) => state.ratings[c.id])
  const visitedUnrated = CAFES.filter(
    (c) => !state.ratings[c.id] && ((state.stamps[c.id] || 0) > 0 || state.redeemed[c.id]),
  )
  const avg =
    rated.length > 0
      ? (rated.reduce((a, c) => a + state.ratings[c.id].stars, 0) / rated.length).toFixed(1)
      : '–'

  return (
    <div className="screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">Ratings</p>
          <h1>Your reviews</h1>
        </div>
        <div className="head-badge"><Icon.Star filled width="13" height="13" /> {avg} avg</div>
      </header>

      <div className="feed">
        {rated.length === 0 && visitedUnrated.length === 0 && (
          <div className="empty-state">
            <Icon.Ratings width="40" height="40" />
            <h3>No reviews yet</h3>
            <p>Collect a stamp at a café and it'll show up here for you to rate.</p>
          </div>
        )}

        {rated.map((cafe) => (
          <RatingCard
            key={cafe.id}
            cafe={cafe}
            rating={state.ratings[cafe.id]}
            onSave={setRating}
            onRemove={removeRating}
          />
        ))}

        {visitedUnrated.length > 0 && (
          <>
            <p className="section-label">Visited · not yet rated</p>
            {visitedUnrated.map((cafe) => (
              <RatingCard
                key={cafe.id}
                cafe={cafe}
                rating={null}
                onSave={setRating}
                onRemove={removeRating}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
