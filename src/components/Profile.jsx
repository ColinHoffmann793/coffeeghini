import { useState } from 'react'
import { PREFERENCE_OPTIONS } from '../data.js'
import { Icon } from '../icons.jsx'

function Segmented({ label, options, value, onChange }) {
  return (
    <div className="pref-block">
      <span className="pref-label">{label}</span>
      <div className="segmented">
        {options.map((opt) => (
          <button
            key={opt}
            className={value === opt ? 'seg active' : 'seg'}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Profile({ store }) {
  const { state, derived, updatePreferences, toggleDrink, updateProfile, resetAll } = store
  const { profile, preferences } = state
  const [editingName, setEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState(profile.name)

  const saveName = () => {
    updateProfile({ name: nameDraft.trim() || 'Coffee Lover' })
    setEditingName(false)
  }

  return (
    <div className="screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">Profile</p>
          <h1>Your account</h1>
        </div>
      </header>

      <div className="feed">
        <section className="profile-hero">
          <div className="profile-avatar">{(profile.name || 'C').charAt(0)}</div>
          {editingName ? (
            <div className="name-edit">
              <input
                className="name-input"
                value={nameDraft}
                autoFocus
                onChange={(e) => setNameDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
              />
              <button className="btn-ghost sm" onClick={saveName}><Icon.Check width="15" height="15" /></button>
            </div>
          ) : (
            <button className="profile-name" onClick={() => { setNameDraft(profile.name); setEditingName(true) }}>
              {profile.name}
            </button>
          )}
          <p className="profile-handle">{profile.handle} · {profile.home}</p>
        </section>

        <section className="stats-row">
          <div className="stat"><b>{derived.visitedCafes.length}</b><span>Cafés</span></div>
          <div className="stat"><b>{derived.totalStamps}</b><span>Stamps</span></div>
          <div className="stat"><b>{derived.rewardsRedeemed}</b><span>Rewards</span></div>
          <div className="stat"><b>{derived.ratingsGiven}</b><span>Reviews</span></div>
        </section>

        <section className="card-section">
          <div className="section-title">
            <Icon.Cup width="18" height="18" />
            <h3>Coffee preferences</h3>
          </div>
          <p className="section-sub">Tell us how you like it — we'll tailor recommendations.</p>

          <div className="pref-block">
            <span className="pref-label">Favourite drinks</span>
            <div className="chips">
              {PREFERENCE_OPTIONS.drinks.map((d) => (
                <button
                  key={d}
                  className={preferences.drinks.includes(d) ? 'chip active' : 'chip'}
                  onClick={() => toggleDrink(d)}
                >
                  {preferences.drinks.includes(d) && <Icon.Check width="13" height="13" />} {d}
                </button>
              ))}
            </div>
          </div>

          <Segmented
            label="Roast level"
            options={PREFERENCE_OPTIONS.roast}
            value={preferences.roast}
            onChange={(v) => updatePreferences({ roast: v })}
          />
          <Segmented
            label="Milk"
            options={PREFERENCE_OPTIONS.milk}
            value={preferences.milk}
            onChange={(v) => updatePreferences({ milk: v })}
          />
          <Segmented
            label="Strength"
            options={PREFERENCE_OPTIONS.strength}
            value={preferences.strength}
            onChange={(v) => updatePreferences({ strength: v })}
          />

          <div className="pref-block">
            <span className="pref-label">Tasting notes you love</span>
            <textarea
              className="rating-input"
              placeholder="e.g. fruity, chocolatey, low acidity…"
              value={preferences.notes}
              maxLength={200}
              onChange={(e) => updatePreferences({ notes: e.target.value })}
            />
          </div>
        </section>

        <button className="btn-reset" onClick={() => { if (confirm('Reset all demo data?')) resetAll() }}>
          Reset demo data
        </button>
        <p className="feed-end">coffeeghini · v1.0</p>
      </div>
    </div>
  )
}
