// Reusable on/off switch row, used for the Coworking preference + filter.
export default function Toggle({ on, onChange, label, desc, icon: Ico }) {
  return (
    <button type="button" className="toggle-row" aria-pressed={on} onClick={() => onChange(!on)}>
      {Ico && <span className="toggle-ico"><Ico width="20" height="20" /></span>}
      <span className="toggle-text">
        <span className="toggle-label">{label}</span>
        {desc && <span className="toggle-desc">{desc}</span>}
      </span>
      <span className={on ? 'switch on' : 'switch'}><span className="switch-knob" /></span>
    </button>
  )
}
