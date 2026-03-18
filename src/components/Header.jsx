import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function Logo() {
  return (
    <svg className="header-logo" viewBox="0 0 172 40" aria-label="Fair Play">
      {/* mini playing card */}
      <rect x="0.75" y="1" width="24" height="33" rx="4.5"
        fill="#F5EFE0" stroke="#C2614A" strokeWidth="1.4"/>
      <text x="12.5" y="14" fontFamily="Georgia, serif" fontSize="9"
        fill="#C2614A" textAnchor="middle">♠</text>
      <line x1="4" y1="19" x2="21" y2="19" stroke="#EDE4CE" strokeWidth="1"/>
      <text x="12.5" y="32" fontFamily="Georgia, serif" fontSize="9"
        fill="#C2614A" textAnchor="middle" transform="rotate(180 12.5 27.5)">♠</text>
      {/* wordmark */}
      <text x="33" y="30"
        fontFamily="'Recoleta', Georgia, 'Times New Roman', serif"
        fontSize="26" fontStyle="italic" fill="#3D1F0A">
        Fair
      </text>
      <text x="97" y="30"
        fontFamily="'Recoleta', Georgia, 'Times New Roman', serif"
        fontSize="26" fontStyle="italic" fill="#C2614A">
        Play
      </text>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="12" rx="2"/>
      <path d="M1.5 6.5h13"/>
      <path d="M5 1v3M11 1v3"/>
      <circle cx="5" cy="10" r="0.8" fill="currentColor"/>
      <circle cx="8" cy="10" r="0.8" fill="currentColor"/>
      <circle cx="11" cy="10" r="0.8" fill="currentColor"/>
    </svg>
  )
}

export default function Header({ seanCount, tarragonCount, inPlayCount, checkinDate, onCheckinChange, lastCheckinDate, onLastCheckinChange }) {
  const [showPicker, setShowPicker] = useState(false)
  const [draft, setDraft] = useState(checkinDate || '')
  const popupRef = useRef(null)
  const btnRef = useRef(null)

  // Sync draft when checkinDate prop changes
  useEffect(() => { setDraft(checkinDate || '') }, [checkinDate])

  // Close picker on outside click
  useEffect(() => {
    if (!showPicker) return
    function handler(e) {
      if (
        popupRef.current && !popupRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setShowPicker(false)
        setDraft(checkinDate || '')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showPicker, checkinDate])

  async function saveDate() {
    // Promote the current next-check-in to last-check-in before overwriting
    if (checkinDate) {
      await supabase
        .from('settings')
        .upsert({ key: 'last_checkin_date', value: checkinDate }, { onConflict: 'key' })
      onLastCheckinChange(checkinDate)
    }
    await supabase
      .from('settings')
      .upsert({ key: 'next_checkin_date', value: draft }, { onConflict: 'key' })
    onCheckinChange(draft)
    setShowPicker(false)
  }

  // Check if alert should show
  const isPastCheckin = (() => {
    if (!checkinDate) return false
    const today = new Date()
    today.setHours(0,0,0,0)
    const check = new Date(checkinDate + 'T00:00:00')
    return check <= today
  })()

  const formattedDate = checkinDate
    ? new Date(checkinDate + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
      })
    : null

  const formattedLastDate = lastCheckinDate
    ? new Date(lastCheckinDate + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    : null

  return (
    <>
      {isPastCheckin && (
        <div className="checkin-alert" role="alert">
          ✨ Time to check in — sit down together and review your cards
        </div>
      )}
      <header className="header">
        <div className="header-top">
          <img src="/logo.png" alt="Fair Play" className="header-logo" />
          <div className="header-counts">
            <span className="count-badge">
              <span className="count-dot"/>
              <strong>Sean</strong> — {seanCount} card{seanCount !== 1 ? 's' : ''}
            </span>
            <span className="count-badge">
              <span className="count-dot tarragon"/>
              <strong>Tarragon</strong> — {tarragonCount} card{tarragonCount !== 1 ? 's' : ''}
            </span>
            <span className="count-badge count-badge--inplay" title="Total cards dealt to both players">
              {inPlayCount} cards in play
            </span>
          </div>
        </div>

        <div className="header-checkin" style={{ position: 'relative' }}>
          {formattedLastDate && (
            <span className="checkin-last" title="Last check-in date">
              Last: {formattedLastDate}
            </span>
          )}
          <span className="checkin-label">Next check-in:</span>
          <button
            ref={btnRef}
            className="checkin-btn"
            onClick={() => setShowPicker(v => !v)}
            aria-expanded={showPicker}
            aria-label="Set check-in date"
          >
            <CalendarIcon/>
            {formattedDate
              ? <span>{formattedDate}</span>
              : <span className="checkin-unset">Set a date</span>
            }
          </button>

          {showPicker && (
            <div className="date-picker-popup" ref={popupRef} role="dialog" aria-label="Date picker">
              <label className="form-label" htmlFor="checkin-input">Check-in date</label>
              <input
                id="checkin-input"
                type="date"
                className="date-input"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveDate()}
              />
              <div className="date-picker-actions">
                {checkinDate && (
                  <button className="btn btn-ghost" onClick={() => {
                    setDraft('')
                    onCheckinChange('')
                    supabase.from('settings').upsert({ key: 'next_checkin_date', value: '' }, { onConflict: 'key' })
                    setShowPicker(false)
                  }}>
                    Clear
                  </button>
                )}
                <button className="btn btn-secondary" onClick={() => setShowPicker(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={saveDate} disabled={!draft}>Save</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
