import { useState, useEffect } from 'react'
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

export default function DealSession({ cards, onOwnerChange, onClose }) {
  const [index, setIndex]       = useState(0)
  const [dealt, setDealt]       = useState(0)
  const [direction, setDir]     = useState(null) // 'left' | 'right' | 'down'
  const [animating, setAnimating] = useState(false)

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Keyboard support
  useEffect(() => {
    function handler(e) {
      if (animating) return
      if (e.key === 'Escape') onClose()
      if (e.key === '1') deal('Sean')
      if (e.key === '2') deal('Tarragon')
      if (e.key === '3') deal('Discarded')
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [index, animating])

  const card = cards[index]
  const isDone = index >= cards.length

  async function deal(owner) {
    if (animating || !card) return
    setDir(owner === 'Sean' ? 'right' : owner === 'Tarragon' ? 'left' : 'down')
    setAnimating(true)

    await supabase.from('cards').update({ owner }).eq('id', card.id)
    onOwnerChange(card.id, owner)

    setTimeout(() => {
      setDealt(d => d + 1)
      setIndex(i => i + 1)
      setDir(null)
      setAnimating(false)
    }, 320)
  }

  const panel = (
    <div className="deal-overlay">
      {/* Header */}
      <div className="deal-header">
        <div className="deal-progress-wrap">
          <div className="deal-progress-text">
            {isDone ? 'All done!' : `Card ${index + 1} of ${cards.length}`}
          </div>
          <div className="deal-progress-bar">
            <div
              className="deal-progress-fill"
              style={{ width: `${(index / cards.length) * 100}%` }}
            />
          </div>
        </div>
        <button className="card-close-btn" onClick={onClose} aria-label="Exit deal session">✕</button>
      </div>

      {isDone ? (
        /* ── Done state ── */
        <div className="deal-done">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown-deep)', marginBottom: '0.5rem' }}>
            Dealing complete
          </h2>
          <p style={{ color: 'var(--brown-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            {dealt} card{dealt !== 1 ? 's' : ''} dealt this session.
            Now open each card together and write the MSC and CPE.
          </p>
          <button className="btn btn-primary" style={{ padding: '0.65rem 2rem', fontSize: '0.9rem' }} onClick={onClose}>
            Back to cards
          </button>
        </div>
      ) : (
        /* ── Active card ── */
        <>
          <div className="deal-card-area">
            <div className={`deal-card${direction ? ` deal-card--${direction}` : ''}`}>
              <div className="deal-card-illustration">
                {getIllustration(card.illustration_key)}
              </div>
              <div className="deal-card-title">{card.title}</div>
              <div
                className="deal-card-category"
                style={{ color: CATEGORY_COLOURS[card.category] }}
              >
                {card.category}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="deal-actions">
            <button
              className="deal-btn deal-btn--secondary"
              onClick={() => deal('Discarded')}
              disabled={animating}
              aria-label="Discard this card (key: 3)"
            >
              <span className="deal-btn-icon">✕</span>
              <span className="deal-btn-label">Discard</span>
              <span className="deal-btn-key">3</span>
            </button>
            <button
              className="deal-btn deal-btn--player deal-btn--sean"
              onClick={() => deal('Sean')}
              disabled={animating}
              aria-label="Deal to Sean (key: 1)"
            >
              <span className="deal-btn-icon">→</span>
              <span className="deal-btn-label">Sean</span>
              <span className="deal-btn-key">1</span>
            </button>
            <button
              className="deal-btn deal-btn--player deal-btn--tarragon"
              onClick={() => deal('Tarragon')}
              disabled={animating}
              aria-label="Deal to Tarragon (key: 2)"
            >
              <span className="deal-btn-icon">←</span>
              <span className="deal-btn-label">Tarragon</span>
              <span className="deal-btn-key">2</span>
            </button>
          </div>

          <p className="deal-hint">Tap a button or press 1 / 2 / 3</p>
        </>
      )}
    </div>
  )

  return createPortal(panel, document.body)
}
