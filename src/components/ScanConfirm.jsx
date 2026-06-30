import { Icon } from '../icons.jsx'
import { STAMP_GOAL } from '../data.js'

// Confirmation that must be dismissed by the user before the app continues.
export default function ScanConfirm({ result, onClose }) {
  if (!result) return null
  const { cafeName, accent, count, complete, alreadyFull } = result

  return (
    <div className="confirm-overlay" onClick={onClose}>
      <div
        className="confirm-card"
        style={{ '--accent': accent }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Scan confirmed"
      >
        <div className={`confirm-check ${complete ? 'gold' : ''}`}>
          <Icon.Check width="42" height="42" />
        </div>
        <h2>{alreadyFull ? 'Card already full' : 'QR code scanned!'}</h2>
        <p className="confirm-cafe">{cafeName}</p>
        <p className="confirm-status">
          {alreadyFull
            ? 'This card is already complete — redeem your free coffee.'
            : complete
              ? '🎉 Card complete — your free coffee is unlocked!'
              : `Stamp collected · ${count}/${STAMP_GOAL}`}
        </p>
        <button className="confirm-btn" onClick={onClose} autoFocus>Continue</button>
      </div>
    </div>
  )
}
