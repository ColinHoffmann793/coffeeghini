import { EVENTS, CITY } from '../data.js'
import { Icon } from '../icons.jsx'
import EventCard from './EventCard.jsx'

export default function Social({ store, onOpenCafe, onOpenEvent }) {
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

        {events.map((ev) => (
          <EventCard
            key={ev.id}
            event={ev}
            store={store}
            onOpen={onOpenEvent}
            onOpenCafe={onOpenCafe}
            now={now}
          />
        ))}

        <p className="feed-end">More events soon ☕</p>
      </div>
    </div>
  )
}
