import { CAFES, FILTER_GROUPS } from '../data.js'
import { Icon } from '../icons.jsx'
import { matchesFilter, countFilters, prefsToFilter, emptyFilter } from '../cafeUtils.js'

export default function FilterSheet({ open, value, onChange, onClose, preferences }) {
  if (!open) return null

  const toggle = (groupKey, opt) => {
    const cur = value[groupKey] || []
    const next = cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt]
    onChange({ ...value, [groupKey]: next })
  }

  const matchCount = CAFES.filter((c) => matchesFilter(c, value)).length
  const total = countFilters(value)

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Filter cafés">
        <div className="sheet-grip" />
        <div className="sheet-head">
          <div>
            <h2>Filter by taste</h2>
            <p>Show cafés that match what you like to drink.</p>
          </div>
          <button className="sheet-close" onClick={onClose} aria-label="Close">
            <Icon.Close width="20" height="20" />
          </button>
        </div>

        <button className="taste-btn" onClick={() => onChange(prefsToFilter(preferences))}>
          <Icon.Sparkle width="16" height="16" /> Match my taste
          <span>from your profile</span>
        </button>

        <div className="sheet-body">
          {FILTER_GROUPS.map((g) => (
            <section className="filter-group" key={g.key}>
              <div className="filter-group-head">
                <span className="fg-label">{g.label}</span>
                {value[g.key]?.length > 0 && <span className="fg-count">{value[g.key].length}</span>}
              </div>
              <div className="chips">
                {g.options.map((opt) => {
                  const active = value[g.key]?.includes(opt)
                  return (
                    <button
                      key={opt}
                      className={active ? 'chip active' : 'chip'}
                      onClick={() => toggle(g.key, opt)}
                    >
                      {active && <Icon.Check width="13" height="13" />} {opt}
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="sheet-foot">
          <button className="sheet-reset" disabled={total === 0} onClick={() => onChange(emptyFilter())}>
            Reset{total > 0 ? ` (${total})` : ''}
          </button>
          <button className="sheet-apply" onClick={onClose}>
            {matchCount === 0 ? 'No matches' : `Show ${matchCount} ${matchCount === 1 ? 'café' : 'cafés'}`}
          </button>
        </div>
      </div>
    </div>
  )
}
