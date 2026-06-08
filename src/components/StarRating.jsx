import { Icon } from '../icons.jsx'

export default function StarRating({ value = 0, onChange, size = 22, readOnly = false }) {
  return (
    <div className={readOnly ? 'stars readonly' : 'stars'} role={readOnly ? 'img' : 'radiogroup'} aria-label={`${value} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className="star-btn"
          disabled={readOnly}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onClick={() => onChange && onChange(n)}
        >
          <Icon.Star filled={n <= value} width={size} height={size} />
        </button>
      ))}
    </div>
  )
}
