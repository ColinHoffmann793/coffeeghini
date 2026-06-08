import { CAFES, STAMP_GOAL } from '../data.js'
import { Icon } from '../icons.jsx'
import StampRow from './StampRow.jsx'
import ImageCarousel from './ImageCarousel.jsx'

function StampCafe({ cafe, count, redeemedCount, onRedeem, justAdded }) {
  const complete = count >= STAMP_GOAL
  return (
    <article className={`stamp-card ${complete ? 'complete' : ''}`} style={{ '--accent': cafe.accent }}>
      <div className="stamp-thumb">
        <ImageCarousel images={[cafe.images[0]]} accent={cafe.accent} height={120} />
      </div>
      <div className="stamp-card-body">
        <div className="cafe-head">
          <div>
            <h2 className="cafe-name">{cafe.name}</h2>
            <p className="cafe-loc"><Icon.Pin width="13" height="13" /> {cafe.location}</p>
          </div>
          <div className="stamp-counter">
            {count}/{STAMP_GOAL}
          </div>
        </div>

        <StampRow count={count} accent={cafe.accent} justAdded={justAdded} />

        <div className="stamp-foot">
          <span className="reward-text">
            {complete
              ? '🎉 Free coffee unlocked!'
              : `${STAMP_GOAL - count} more for a free coffee`}
          </span>
          <button
            className="btn-redeem"
            disabled={!complete}
            onClick={() => onRedeem(cafe.id)}
          >
            Redeem
          </button>
        </div>

        {redeemedCount > 0 && (
          <p className="redeemed-note">
            <Icon.Check width="13" height="13" /> {redeemedCount} reward{redeemedCount > 1 ? 's' : ''} claimed
          </p>
        )}
      </div>
    </article>
  )
}

export default function Stampcard({ store, justAdded }) {
  const { state, redeem } = store
  const collected = CAFES.filter((c) => (state.stamps[c.id] || 0) > 0 || state.redeemed[c.id])

  return (
    <div className="screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">Your cards</p>
          <h1>Stamp cards</h1>
        </div>
        <div className="head-badge">{collected.length} active</div>
      </header>

      <div className="feed">
        {collected.length === 0 && (
          <div className="empty-state">
            <Icon.Stamp width="40" height="40" />
            <h3>No stamps yet</h3>
            <p>Tap the camera button and scan a café QR code to collect your first stamp.</p>
          </div>
        )}
        {collected.map((cafe) => (
          <StampCafe
            key={cafe.id}
            cafe={cafe}
            count={state.stamps[cafe.id] || 0}
            redeemedCount={state.redeemed[cafe.id] || 0}
            onRedeem={redeem}
            justAdded={justAdded.cafeId === cafe.id ? justAdded.index : -1}
          />
        ))}
        {collected.length > 0 && (
          <p className="feed-end">Scan more codes to fill your cards ☕</p>
        )}
      </div>
    </div>
  )
}
