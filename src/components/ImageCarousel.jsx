import { useRef, useState } from 'react'
import { Icon } from '../icons.jsx'

function Slide({ src, accent }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div className="carousel-slide fallback" style={{ '--accent': accent }}>
        <Icon.Cup width="46" height="46" />
      </div>
    )
  }
  return (
    <div className="carousel-slide">
      <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
    </div>
  )
}

export default function ImageCarousel({ images = [], accent = '#b5835a', height = 220 }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx !== active) setActive(idx)
  }

  return (
    <div className="carousel" style={{ height }}>
      <div className="carousel-track" ref={trackRef} onScroll={onScroll}>
        {images.map((src, i) => (
          <Slide key={i} src={src} accent={accent} />
        ))}
      </div>
      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <span key={i} className={i === active ? 'dot active' : 'dot'} />
          ))}
        </div>
      )}
    </div>
  )
}
