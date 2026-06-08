import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CAFES, CITY } from '../data.js'
import { Icon } from '../icons.jsx'
import ImageCarousel from './ImageCarousel.jsx'

const cupSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 3c0 1-1 1-1 2.2M11.5 3c0 1-1 1-1 2.2"/></svg>'

export default function MapView({ cafes = CAFES, ratings = {} }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const [selectedId, setSelectedId] = useState(null)

  // (Re)build the whole map whenever the filtered café set changes.
  useEffect(() => {
    if (!elRef.current) return
    setSelectedId(null)

    const map = L.map(elRef.current, {
      zoomControl: false,
      attributionControl: true,
      tap: true,
    }).setView([CITY.center.lat, CITY.center.lng], 13)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map)

    markersRef.current = {}
    cafes.forEach((c) => {
      const icon = L.divIcon({
        className: 'map-pin-wrap',
        html: `<div class="map-pin" style="--accent:${c.accent}">${cupSvg}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })
      const m = L.marker([c.coords.lat, c.coords.lng], { icon, title: c.name }).addTo(map)
      m.on('click', () => {
        setSelectedId(c.id)
        map.setView([c.coords.lat, c.coords.lng], Math.max(map.getZoom(), 14), { animate: true })
      })
      markersRef.current[c.id] = m
    })

    if (cafes.length) {
      const group = L.featureGroup(Object.values(markersRef.current))
      map.fitBounds(group.getBounds().pad(0.3), { maxZoom: 15 })
    }
    mapRef.current = map

    // Leaflet needs a re-measure once the flex layout has settled.
    const t = setTimeout(() => map.invalidateSize(), 220)

    return () => {
      clearTimeout(t)
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, [cafes])

  // Reflect the current selection on the markers.
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, m]) => {
      const el = m.getElement()?.querySelector('.map-pin')
      if (el) el.classList.toggle('active', id === selectedId)
    })
  }, [selectedId])

  const selected = cafes.find((c) => c.id === selectedId)

  return (
    <div className="map-wrap">
      <div ref={elRef} className="leaflet-host" />

      {selected && (
        <div className="map-card" key={selected.id}>
          <button className="map-card-close" onClick={() => setSelectedId(null)} aria-label="Close">
            <Icon.Close width="18" height="18" />
          </button>
          <div className="map-card-thumb">
            <ImageCarousel images={[selected.images[0]]} accent={selected.accent} height={92} />
          </div>
          <div className="map-card-body">
            <div className="cafe-head">
              <div>
                <h3 className="cafe-name" style={{ fontSize: 18 }}>{selected.name}</h3>
                <p className="cafe-loc"><Icon.Pin width="13" height="13" /> {selected.location}</p>
              </div>
              {ratings[selected.id]?.stars != null && (
                <div className="cafe-rating-pill">
                  <Icon.Star filled width="12" height="12" /> {ratings[selected.id].stars.toFixed(1)}
                </div>
              )}
            </div>
            <p className="map-card-about">{selected.about}</p>
            <div className="map-card-signature" style={{ '--accent': selected.accent }}>
              <Icon.Cup width="14" height="14" /> Signature · {selected.coffee.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
