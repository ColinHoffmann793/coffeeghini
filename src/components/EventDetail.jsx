import { Icon } from '../icons.jsx'
import ImageCarousel from './ImageCarousel.jsx'
import { CITY } from '../data.js'
import { formatEventDate, formatAddress, mapsLink } from '../cafeUtils.js'

export default function EventDetail({ event, cafe, store, onClose, onOpenCafe }) {
  if (!event || !cafe) return null
  const now = new Date()
  const going = !!store.state.rsvps[event.id]
  const count = event.attending + (going ? 1 : 0)

  return (
    <div className="detail" role="dialog" aria-label={event.title}>
      <div className="detail-scroll">
        <div className="detail-hero" style={{ '--accent': cafe.accent }}>
          <ImageCarousel images={[event.image]} accent={cafe.accent} height={266} />
          <button className="detail-back" onClick={onClose} aria-label="Back">
            <Icon.ChevronLeft width="22" height="22" />
          </button>
          <span className="event-hero-emoji">{event.emoji}</span>
        </div>

        <div className="detail-body">
          <span className="event-type">{event.type}</span>
          <h1 className="event-detail-title">{event.title}</h1>

          <div className="event-meta">
            <span><Icon.Calendar width="15" height="15" /> {formatEventDate(event.daysFromNow, now)}</span>
            <span><Icon.Clock width="15" height="15" /> {event.time}</span>
            <span><Icon.Users width="15" height="15" /> {count} going</span>
          </div>

          <button className="event-host" onClick={() => onOpenCafe(cafe.id)}>
            <span className="event-host-avatar" style={{ background: cafe.accent }}>{cafe.name.charAt(0)}</span>
            <span className="event-host-text">
              <b>Hosted at {cafe.name}</b>
              <span>{cafe.location} · {CITY.name}</span>
            </span>
            <Icon.ChevronLeft width="18" height="18" style={{ transform: 'rotate(180deg)', color: 'var(--muted)', flexShrink: 0 }} />
          </button>

          <p className="detail-about">{event.description}</p>
          {event.details && <p className="detail-about">{event.details}</p>}

          <div className="info-block">
            <div className="info-row">
              <span className="info-ico"><Icon.Calendar width="18" height="18" /></span>
              <span className="info-text">{formatEventDate(event.daysFromNow, now)} · {event.time}</span>
            </div>
            <div className="info-row">
              <span className="info-ico"><Icon.Sparkle width="16" height="16" /></span>
              <span className="info-text">{event.price}</span>
            </div>
            <div className="info-row">
              <span className="info-ico"><Icon.Pin width="18" height="18" /></span>
              <span className="info-text">{formatAddress(cafe)}</span>
            </div>
            <a className="directions-btn" href={mapsLink(cafe)} target="_blank" rel="noreferrer">
              <Icon.Navigation width="16" height="16" /> Get directions
            </a>
          </div>

          <button className={going ? 'rsvp-lg going' : 'rsvp-lg'} onClick={() => store.toggleRsvp(event.id)}>
            {going ? <><Icon.Check width="18" height="18" /> You're in — tap to cancel</> : "I'm in"}
          </button>
          <p className="feed-end">{count} people going</p>
        </div>
      </div>
    </div>
  )
}
