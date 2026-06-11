import { useState } from 'react'
import { Icon } from '../icons.jsx'
import ImageCarousel from './ImageCarousel.jsx'
import StarRating from './StarRating.jsx'
import { CITY, STAMP_GOAL } from '../data.js'
import { getOpenStatus, formatHours, formatAddress, mapsLink, priceLabel } from '../cafeUtils.js'

function InfoRow({ icon: Ico, children, href }) {
  const inner = (
    <>
      <span className="info-ico"><Ico width="18" height="18" /></span>
      <span className="info-text">{children}</span>
    </>
  )
  return href ? (
    <a className="info-row link" href={href} target="_blank" rel="noreferrer">{inner}</a>
  ) : (
    <div className="info-row">{inner}</div>
  )
}

export default function CafeDetail({ cafe, store, onClose, onScan }) {
  const [showHours, setShowHours] = useState(false)
  if (!cafe) return null

  const status = getOpenStatus(cafe)
  const hours = formatHours(cafe)
  const today = hours.find((h) => h.today)
  const rating = store.state.ratings[cafe.id]
  const stamps = store.state.stamps[cafe.id] || 0
  const redeemed = store.state.redeemed[cafe.id] || 0
  const visited = stamps > 0 || redeemed > 0

  return (
    <div className="detail" role="dialog" aria-label={cafe.name}>
      <div className="detail-scroll">
        <div className="detail-hero" style={{ '--accent': cafe.accent }}>
          <ImageCarousel images={cafe.images} accent={cafe.accent} height={266} />
          <button className="detail-back" onClick={onClose} aria-label="Back">
            <Icon.ChevronLeft width="22" height="22" />
          </button>
        </div>

        <div className="detail-body">
          <div className="detail-title">
            <div>
              <h1>{cafe.name}</h1>
              <p className="detail-sub">
                <Icon.Pin width="14" height="14" /> {cafe.location} · {CITY.name} · {priceLabel(cafe.price)}
              </p>
            </div>
            {rating?.stars != null && (
              <div className="cafe-rating-pill"><Icon.Star filled width="13" height="13" /> {rating.stars.toFixed(1)}</div>
            )}
          </div>

          <div className="tag-row">
            {cafe.tags.map((t) => <span key={t} className="cat-chip">{t}</span>)}
          </div>

          {cafe.coworking && (
            <div className="cowork-badge"><Icon.Laptop width="15" height="15" /> Good for working · Wi-Fi &amp; power</div>
          )}

          {/* open status + collapsible hours */}
          <button
            className={`status-card ${status.open ? 'open' : 'closed'}`}
            onClick={() => setShowHours((s) => !s)}
            aria-expanded={showHours}
          >
            <span className="status-dot" />
            <span className="status-label">{status.label}</span>
            <span className="status-today">{today ? `Today ${today.range}` : 'Closed today'}</span>
            <Icon.ChevronDown width="18" height="18" className={showHours ? 'chev open' : 'chev'} />
          </button>
          {showHours && (
            <ul className="hours-list">
              {hours.map((h) => (
                <li key={h.key} className={h.today ? 'today' : ''}>
                  <span>{h.label}</span><span>{h.range}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="detail-about">{cafe.about}</p>

          {/* practical info */}
          <div className="info-block">
            <InfoRow icon={Icon.Pin}>{formatAddress(cafe)}</InfoRow>
            {cafe.phone && <InfoRow icon={Icon.Phone} href={`tel:${cafe.phone.replace(/\s/g, '')}`}>{cafe.phone}</InfoRow>}
            {cafe.website && <InfoRow icon={Icon.Globe} href={`https://${cafe.website}`}>{cafe.website}</InfoRow>}
            <a className="directions-btn" href={mapsLink(cafe)} target="_blank" rel="noreferrer">
              <Icon.Navigation width="16" height="16" /> Get directions
            </a>
          </div>

          {/* features */}
          {cafe.features?.length > 0 && (
            <div className="detail-section">
              <h3 className="detail-h3">Good to know</h3>
              <div className="chips static">
                {cafe.features.map((f) => <span key={f} className="chip">{f}</span>)}
              </div>
            </div>
          )}

          {/* coffee */}
          <div className="coffee-box" style={{ '--accent': cafe.accent }}>
            <div className="coffee-box-title"><Icon.Cup width="16" height="16" /> The coffee</div>
            <dl className="coffee-grid">
              <div><dt>House pick</dt><dd>{cafe.coffee.house}</dd></div>
              <div><dt>Roast</dt><dd>{cafe.coffee.roast}</dd></div>
              <div><dt>Origins</dt><dd>{cafe.coffee.origin}</dd></div>
              <div><dt>Brew</dt><dd>{cafe.coffee.method}</dd></div>
              <div className="span"><dt>Signature</dt><dd>{cafe.coffee.signature}</dd></div>
            </dl>
            <div className="notes">
              {cafe.coffee.notes.map((n) => <span key={n} className="note-chip">{n}</span>)}
            </div>
          </div>

          {/* stamp card cross-link */}
          <div className="detail-stamp" style={{ '--accent': cafe.accent }}>
            <div>
              <h3 className="detail-h3">Stamp card</h3>
              <p>{visited ? `${stamps}/${STAMP_GOAL} collected${redeemed ? ` · ${redeemed} reward${redeemed > 1 ? 's' : ''} claimed` : ''}` : 'Not started yet'}</p>
            </div>
            <button className="scan-cta" onClick={onScan}><Icon.Camera width="16" height="16" /> Scan</button>
          </div>

          {/* rate */}
          <div className="detail-section">
            <h3 className="detail-h3">Your rating</h3>
            <StarRating value={rating?.stars || 0} size={30} onChange={(n) => store.setRating(cafe.id, n)} />
            {rating?.note && <p className="rating-note">“{rating.note}”</p>}
          </div>

          <p className="feed-end">coffeeghini · {CITY.name}</p>
        </div>
      </div>
    </div>
  )
}
