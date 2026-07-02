import { CAFES } from '../data.js'
import { Icon } from '../icons.jsx'
import { formatEventDate } from '../cafeUtils.js'
import ImageCarousel from './ImageCarousel.jsx'

// Shared event card used by both the Social feed and a café's detail page,
// so the info shown is always identical.
export default function EventCard({ event, store, onOpen, onOpenCafe, now = new Date() }) {
  const cafe = CAFES.find((c) => c.id === event.cafeId)
  const going = !!store.state.rsvps[event.id]
  const count = event.attending + (going ? 1 : 0)

  return (
    <article
      className="event-card tappable"
      style={{ '--accent': cafe.accent }}
      onClick={() => onOpen(event.id)}
    >
      <div className="event-img">
        <ImageCarousel images={[event.image]} accent={cafe.accent} height={150} />
        <span className="event-img-emoji">{event.emoji}</span>
        <span className="event-img-type">{event.type}</span>
      </div>

      <div className="event-body">
        <div className="event-head">
          <span className="event-when">{formatEventDate(event.daysFromNow, now)} · {event.time}</span>
          <span className="event-price">{event.price}</span>
        </div>
        <h2 className="event-title">{event.title}</h2>
        <button className="event-cafe" onClick={(e) => { e.stopPropagation(); onOpenCafe?.(cafe.id) }}>
          <Icon.Pin width="13" height="13" /> {cafe.name} · {cafe.location}
        </button>
        <p className="event-desc">{event.description}</p>

        <div className="event-foot">
          <span className="event-attending"><Icon.Users width="15" height="15" /> {count} going</span>
          <button
            className={going ? 'event-rsvp going' : 'event-rsvp'}
            onClick={(e) => { e.stopPropagation(); store.toggleRsvp(event.id) }}
          >
            {going ? <><Icon.Check width="15" height="15" /> You're in</> : "I'm in"}
          </button>
        </div>
      </div>
    </article>
  )
}
