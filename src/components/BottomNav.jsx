import { Icon } from '../icons.jsx'

const LEFT = [
  { id: 'discovery', label: 'Discovery', icon: Icon.Discovery },
  { id: 'stampcard', label: 'Stampcard', icon: Icon.Stamp },
]
const RIGHT = [
  { id: 'social', label: 'Social', icon: Icon.Users },
  { id: 'profile', label: 'Profile', icon: Icon.Profile },
]

export default function BottomNav({ active, onChange, onScan }) {
  const renderItem = (tab) => {
    const Ico = tab.icon
    const isActive = active === tab.id
    return (
      <button
        key={tab.id}
        className={isActive ? 'nav-item active' : 'nav-item'}
        onClick={() => onChange(tab.id)}
        aria-current={isActive ? 'page' : undefined}
      >
        <Ico width="24" height="24" />
        <span>{tab.label}</span>
      </button>
    )
  }

  return (
    <nav className="bottom-nav">
      {LEFT.map(renderItem)}

      <button className="nav-scan" onClick={onScan} aria-label="Scan QR code">
        <span className="nav-scan-btn"><Icon.Camera width="26" height="26" /></span>
        <span className="nav-scan-label">Scan</span>
      </button>

      {RIGHT.map(renderItem)}
    </nav>
  )
}
