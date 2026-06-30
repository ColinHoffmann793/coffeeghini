import { CAFES, EVENTS, CITY } from '../data.js'
import { Icon } from '../icons.jsx'
import { formatEventDate } from '../cafeUtils.js'

export default function Social({ store, onOpenCafe }) {
  const now = new Date()
  const events = [...EVENTS].sort((a, b) => a.daysFromNow - b.daysFromNow)

  return (
    <div className="screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">Social · {CITY.name}</p>
          <h1>Café events</h1>
        </div>
        <div className="head-badge"><Icon.Calendar width="13" height="13" /> {events.length}</div>
      </header>

      <div className="feed">
        <p className="social-intro">Meet people over coffee — events hosted by your favourite cafés.</p>

        {events.map((ev) => {
          const cafe = CAFES.find((c) => c.id === ev.cafeId)
          const going = !!store.state.rsvps[ev.id]
          const count = ev.attending + (going ? 1 : 0)
          return (
            <article className="event-card" key={ev.id} style={{ '--accent': cafe.accent }}>
              <div className="event-head">
                <span className="event-emoji">{ev.emoji}</span>
                <span className="event-type">{ev.type}</span>
                <span className="event-when">{formatEventDate(ev.daysFromNow, now)} · {ev.time}</span>
              </div>

              <h2 className="event-title">{ev.title}</h2>
              <button className="event-cafe" onClick={() => onOpenCafe(cafe.id)}>
                <Icon.Pin width="13" height="13" /> {cafe.name} · {cafe.location}
              </button>
              <p className="event-desc">{ev.description}</p>

              <div className="event-foot">
                <span className="event-attending">
                  <Icon.Users width="15" height="15" /> {count} going
                </span>
                <button
                  className={going ? 'event-rsvp going' : 'event-rsvp'}
                  onClick={() => store.toggleRsvp(ev.id)}
                >
                  {going ? <><Icon.Check width="15" height="15" /> You're in</> : "I'm in"}
                </button>
              </div>
            </article>
          )
        })}

        <p className="feed-end">More events soon ☕</p>
      </div>
    </div>
  )
}
