import { useState } from 'react'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['Home', 'Out', 'Caregiving', 'Magic', 'Wild']
const OWNERS = ['Sean', 'Tarragon', 'Unassigned']

export default function AddCardModal({ defaultOwner, onClose, onCreated }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Home')
  const [owner, setOwner] = useState(defaultOwner || 'Unassigned')
  const [msc, setMsc] = useState('')
  const [conception, setConception] = useState('')
  const [planning, setPlanning] = useState('')
  const [execution, setExecution] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) { setError('Please add a card title.'); return }
    setSaving(true)
    setError('')

    const { data, error: dbError } = await supabase
      .from('cards')
      .insert({
        title: title.trim(),
        category,
        owner,
        msc,
        cpe_conception: conception,
        cpe_planning: planning,
        cpe_execution: execution,
        personal_notes: notes,
        illustration_key: 'default',
        is_custom: true,
      })
      .select()
      .single()

    setSaving(false)

    if (dbError) {
      setError('Could not save card. Check your Supabase connection.')
      return
    }

    onCreated(data)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Add custom card">
        <h2 className="modal-title">New Custom Card</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label" htmlFor="card-title">Card title *</label>
            <input
              id="card-title"
              className="form-input"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Pool Maintenance"
              autoFocus
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-row">
              <label className="form-label" htmlFor="card-category">Category</label>
              <select
                id="card-category"
                className="form-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="card-owner">Owner</label>
              <select
                id="card-owner"
                className="form-select"
                value={owner}
                onChange={e => setOwner(e.target.value)}
              >
                {OWNERS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="card-msc">MSC (optional)</label>
            <textarea
              id="card-msc"
              className="form-input"
              value={msc}
              onChange={e => setMsc(e.target.value)}
              placeholder="What does 'done well enough' look like?"
              rows={2}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label">CPE (optional)</label>
            <textarea
              className="form-input"
              value={conception}
              onChange={e => setConception(e.target.value)}
              placeholder="Conception — how do you notice this needs doing?"
              rows={1}
              style={{ resize: 'vertical', marginBottom: '0.4rem' }}
            />
            <textarea
              className="form-input"
              value={planning}
              onChange={e => setPlanning(e.target.value)}
              placeholder="Planning — what does organising this involve?"
              rows={1}
              style={{ resize: 'vertical', marginBottom: '0.4rem' }}
            />
            <textarea
              className="form-input"
              value={execution}
              onChange={e => setExecution(e.target.value)}
              placeholder="Execution — what does doing it involve?"
              rows={1}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="card-notes">Personal notes (optional)</label>
            <textarea
              id="card-notes"
              className="form-input"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Anything else worth noting…"
              rows={2}
              style={{ resize: 'vertical' }}
            />
          </div>

          {error && (
            <p style={{ color: 'var(--terracotta)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
