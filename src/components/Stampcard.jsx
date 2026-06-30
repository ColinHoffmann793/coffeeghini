import { CAFES, STAMP_GOAL, CITY } from '../data.js'
import { Icon } from '../icons.jsx'
import StampRow from './StampRow.jsx'
import StarRating from './StarRating.jsx'
import ImageCarousel from './ImageCarousel.jsx'

function StampCafe({ cafe, store, justAdded, onOpenCafe }) {
  const { state, redeem, setRating, removeRating } = store
  const count = state.stamps[cafe.id] || 0
  const redeemedCount = state.redeemed[cafe.id] || 0
  const rating = state.ratings[cafe.id]
  const stars = rating?.stars || 0
  const complete = count >= STAMP_GOAL

  return (
    <article className={`stamp-card ${complete ? 'complete' : ''}`} style={{ '--accent': cafe.accent }}>
      <button className="stamp-thumb" onClick={() => onOpenCafe(cafe.id)} aria-label={`Open ${cafe.name}`}>
        <ImageCarousel images={[cafe.images[0]]} accent={cafe.accent} height={120} />
      </button>

      <div className="stamp-card-body">
        <div className="cafe-head">
          <button className="stamp-name-btn" onClick={() => onOpenCafe(cafe.id)}>
            <h2 className="cafe-name">{cafe.name}</h2>
            <p className="cafe-loc"><Icon.Pin width="13" height="13" /> {cafe.location} · {CITY.name}</p>
          </button>
          <div className="stamp-counter">{count}/{STAMP_GOAL}</div>
        </div>

        <StampRow count={count} accent={cafe.accent} justAdded={justAdded} />

        <div className="stamp-foot">
          <span className="reward-text">
            {complete ? '🎉 Free coffee unlocked!' : `${STAMP_GOAL - count} more for a free coffee`}
          </span>
          <button className="btn-redeem" disabled={!complete} onClick={() => redeem(cafe.id)}>
            Redeem
          </button>
        </div>
        {redeemedCount > 0 && (
          <p className="redeemed-note">
            <Icon.Check width="13" height="13" /> {redeemedCount} reward{redeemedCount > 1 ? 's' : ''} claimed
          </p>
        )}

        <div className="sc-rating">
          <div className="sc-rating-head">
            <span className="sc-rating-label">Your rating</span>
            {stars > 0 && <button className="link-btn danger" onClick={() => removeRating(cafe.id)}>Clear</button>}
          </div>
          <StarRating value={stars} size={26} onChange={(n) => setRating(cafe.id, n, rating?.note ?? '')} />
          {stars > 0 ? (
            <textarea
              className="rating-input"
              placeholder="Add a note about your visit…"
              value={rating?.note || ''}
              maxLength={240}
              onChange={(e) => setRating(cafe.id, stars, e.target.value)}
            />
          ) : (
            <p className="sc-rating-hint">Tap a star to rate this café.</p>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Stampcard({ store, justAdded, onOpenCafe }) {
  const { state } = store
  const collected = CAFES.filter((c) => (state.stamps[c.id] || 0) > 0 || state.redeemed[c.id])

  return (
    <div className="screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">Your cafés</p>
          <h1>Cards &amp; ratings</h1>
        </div>
        <div className="head-badge">{collected.length} active</div>
      </header>

      <div className="feed">
        {collected.length === 0 && (
          <div className="empty-state">
            <Icon.Stamp width="40" height="40" />
            <h3>No stamps yet</h3>
            <p>Tap the Scan button and scan a café QR code to collect your first stamp — then rate it here.</p>
          </div>
        )}
        {collected.map((cafe) => (
          <StampCafe
            key={cafe.id}
            cafe={cafe}
            store={store}
            justAdded={justAdded.cafeId === cafe.id ? justAdded.index : -1}
            onOpenCafe={onOpenCafe}
          />
        ))}
        {collected.length > 0 && (
          <p className="feed-end">Scan more codes to fill your cards ☕</p>
        )}
      </div>
    </div>
  )
}
