import { useState, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { supabase } from '../lib/supabase'
import { getIllustration } from './Illustrations'

const CATEGORY_COLOURS = {
  Home:        '#A8743A',
  Out:         '#7C4A1E',
  Caregiving:  '#C2614A',
  Magic:       '#E8B84B',
  Wild:        '#5C3D1E',
}

// ── Completion dot — top-left corner of card front ────────────────────────
function CompletionDot({ card }) {
  if (card.is_unicorn_space) return null
  const filled = Boolean(card.msc?.trim())
  return (
    <span
      className={`completion-dot${filled ? ' completion-dot--done' : ''}`}
      aria-label={filled ? 'MSC written' : 'MSC needed'}
      title={filled ? 'MSC written' : 'Tap to add MSC'}
    />
  )
}

// ── Auto-save hook ─────────────────────────────────────────────────────────
function useAutoSave(cardId, field) {
  const timer = useRef(null)
  const save = useCallback(async (value) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      await supabase.from('cards').update({ [field]: value }).eq('id', cardId)
    }, 600)
  }, [cardId, field])
  return save
}

// ── Editable textarea ──────────────────────────────────────────────────────
function EditableField({ cardId, field, label, value: initialValue, placeholder, rows = 3 }) {
  const [value, setValue] = useState(initialValue || '')
  const save = useAutoSave(cardId, field)

  function handleChange(e) {
    setValue(e.target.value)
    save(e.target.value)
  }

  return (
    <div>
      {label && <span className="field-label">{label}</span>}
      <textarea
        className="field-textarea"
        value={value}
        onChange={handleChange}
        placeholder={placeholder || `Add ${label?.toLowerCase() || 'notes'}…`}
        rows={rows}
        aria-label={label}
      />
    </div>
  )
}

// ── Detail panel (portal — lives outside the 3D transform context) ─────────
function CardDetailPanel({ card, onClose, onOwnerChange }) {
  const isDiscarded  = card.owner === 'Discarded'
  const isUnassigned = card.owner === 'Unassigned'
  const otherPlayer  = card.owner === 'Sean' ? 'Tarragon' : card.owner === 'Tarragon' ? 'Sean' : null

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape
  useEffect(() => {
    function handler(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  async function handlePass() {
    if (!otherPlayer) return
    await supabase.from('cards').update({ owner: otherPlayer }).eq('id', card.id)
    onOwnerChange(card.id, otherPlayer)
    onClose()
  }

  async function handleDiscard() {
    await supabase.from('cards').update({ owner: 'Discarded' }).eq('id', card.id)
    onOwnerChange(card.id, 'Discarded')
    onClose()
  }

  async function handleReinstate(newOwner) {
    await supabase.from('cards').update({ owner: newOwner }).eq('id', card.id)
    onOwnerChange(card.id, newOwner)
    onClose()
  }

  const panel = (
    <div
      className="card-panel-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        className="card-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${card.title} details`}
      >
        {/* Header */}
        <div className="card-panel-header">
          <div>
            <div className="card-panel-title">{card.title}</div>
            <div className="card-panel-category" style={{ color: CATEGORY_COLOURS[card.category] }}>
              {card.category}
            </div>
          </div>
          <button className="card-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Scrollable fields */}
        <div className="card-panel-body">
          {card.is_unicorn_space ? (
            <UnicornFields card={card}/>
          ) : (
            <StandardFields card={card}/>
          )}
        </div>

        {/* Action footer */}
        <div className="card-actions">
          {(isDiscarded || isUnassigned) ? (
            <ReinstateRow onReinstate={handleReinstate}/>
          ) : (
            <>
              {otherPlayer && (
                <button className="btn btn-primary" onClick={handlePass}>
                  Pass to {otherPlayer}
                </button>
              )}
              <button className="btn btn-danger" onClick={handleDiscard}>
                Discard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(panel, document.body)
}

// ── Main Card component ────────────────────────────────────────────────────
export default function Card({ card, onOwnerChange }) {
  const [flipped,     setFlipped]     = useState(false)
  const [showPanel,   setShowPanel]   = useState(false)
  const flipTimer = useRef(null)

  const catColour = CATEGORY_COLOURS[card.category] || CATEGORY_COLOURS.Home

  function handleCardClick() {
    setFlipped(true)
    // Wait for flip animation to finish, then show the detail panel
    flipTimer.current = setTimeout(() => {
      setShowPanel(true)
    }, 480)
  }

  function handleClose() {
    setShowPanel(false)
    // Flip back
    setFlipped(false)
  }

  useEffect(() => () => { if (flipTimer.current) clearTimeout(flipTimer.current) }, [])

  return (
    <>
      <div className={`card-scene${flipped ? ' flipped' : ''}`}>
        <div className="card-inner">

          {/* ── Front face ─────────────────────────────────────────── */}
          <div
            className="card-face card-front"
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            aria-label={`${card.title} — tap to see details`}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
          >
            {card.is_unicorn_space && (
              <span className="card-unicorn-badge" aria-label="Unicorn Space">🦄</span>
            )}
            <CompletionDot card={card} />
            <div className="card-illustration" aria-hidden="true">
              {getIllustration(card.illustration_key)}
            </div>
            <div className="card-title-front">{card.title}</div>
            <div className="card-category-tag" style={{ color: catColour }}>
              {card.category}
            </div>
          </div>

          {/* ── Back face (plain — just shows card is flipped) ──────── */}
          <div className="card-face card-back-static" aria-hidden="true">
            <div className="card-back-pattern">
              <svg viewBox="0 0 64 64" width="48" height="48" fill="none"
                   stroke="rgba(200,160,80,0.3)" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="32" cy="32" r="20"/>
                <circle cx="32" cy="32" r="12"/>
                <circle cx="32" cy="32" r="4"/>
                <line x1="32" y1="8" x2="32" y2="12"/>
                <line x1="32" y1="52" x2="32" y2="56"/>
                <line x1="8" y1="32" x2="12" y2="32"/>
                <line x1="52" y1="32" x2="56" y2="32"/>
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Detail panel rendered in a portal, outside any transform context */}
      {showPanel && (
        <CardDetailPanel
          card={card}
          onClose={handleClose}
          onOwnerChange={onOwnerChange}
        />
      )}
    </>
  )
}

// ── Field sets ─────────────────────────────────────────────────────────────
function StandardFields({ card }) {
  return (
    <>
      <div className="field-group">
        <EditableField
          cardId={card.id} field="msc"
          label="Minimum Standard of Care"
          value={card.msc}
          placeholder="What does 'done well enough' look like for this card? Define it together…"
          rows={4}
        />
      </div>
      <div className="field-group">
        <span className="field-label">CPE — Full Ownership</span>
        <span className="field-sub-label">Conception</span>
        <EditableField cardId={card.id} field="cpe_conception" value={card.cpe_conception}
          placeholder="How do you notice this needs doing? What thinking happens before planning begins?"
          rows={2}/>
        <span className="field-sub-label">Planning</span>
        <EditableField cardId={card.id} field="cpe_planning" value={card.cpe_planning}
          placeholder="What research, coordination, or decisions does planning this card involve?"
          rows={2}/>
        <span className="field-sub-label">Execution</span>
        <EditableField cardId={card.id} field="cpe_execution" value={card.cpe_execution}
          placeholder="What does actually doing this task involve, step by step?"
          rows={2}/>
      </div>
      <div className="field-group">
        <EditableField cardId={card.id} field="personal_notes"
          label="Personal Notes" value={card.personal_notes}
          placeholder="Anything extra worth remembering — tips, quirks, preferences…"
          rows={3}/>
      </div>
    </>
  )
}

function UnicornFields({ card }) {
  return (
    <>
      <div className="field-group">
        <EditableField cardId={card.id} field="msc"
          label="My Unicorn Space" value={card.msc}
          placeholder="What is your Unicorn Space? Describe the activity, passion, or creative pursuit that is yours alone…"
          rows={5}/>
      </div>
      <div className="field-group">
        <span className="field-label">Why it matters to me</span>
        <EditableField cardId={card.id} field="cpe_conception" value={card.cpe_conception}
          placeholder="Who were you before you became a partner or parent? What lights you up?"
          rows={3}/>
      </div>
      <div className="field-group">
        <span className="field-label">Protected time commitment</span>
        <EditableField cardId={card.id} field="cpe_planning" value={card.cpe_planning}
          placeholder="When, and how often, will I make space for this? What support do I need from my partner?"
          rows={3}/>
      </div>
      <div className="field-group">
        <span className="field-label">What I want to share or create</span>
        <EditableField cardId={card.id} field="cpe_execution" value={card.cpe_execution}
          placeholder="Great Unicorn Space is active — what will I eventually share with the world or community?"
          rows={3}/>
      </div>
      <div className="field-group">
        <EditableField cardId={card.id} field="personal_notes"
          label="Notes" value={card.personal_notes}
          placeholder="Ideas, dreams, progress notes…"
          rows={3}/>
      </div>
    </>
  )
}

function ReinstateRow({ onReinstate }) {
  return (
    <div className="reinstate-row">
      <span className="reinstate-label">Deal to:</span>
      <button className="btn btn-primary"   onClick={() => onReinstate('Sean')}>Sean</button>
      <button className="btn btn-secondary" onClick={() => onReinstate('Tarragon')}>Tarragon</button>
      <button className="btn btn-ghost"     onClick={() => onReinstate('Discarded')}>Discard</button>
    </div>
  )
}
