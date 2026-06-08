import { Icon } from '../icons.jsx'
import { STAMP_GOAL } from '../data.js'

// A 10-slot stamp grid. Filled slots show a cup; empty slots are greyed dashed circles.
export default function StampRow({ count = 0, accent = '#b5835a', justAdded = -1 }) {
  return (
    <div className="stamp-grid" style={{ '--accent': accent }}>
      {Array.from({ length: STAMP_GOAL }).map((_, i) => {
        const filled = i < count
        const isNew = i === justAdded
        return (
          <div
            key={i}
            className={`stamp ${filled ? 'filled' : 'empty'} ${isNew ? 'pop' : ''}`}
            aria-label={filled ? 'Collected stamp' : 'Empty stamp'}
          >
            {filled ? <Icon.Cup width="18" height="18" /> : <span className="stamp-num">{i + 1}</span>}
          </div>
        )
      })}
    </div>
  )
}
