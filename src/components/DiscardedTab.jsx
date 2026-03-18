import { useState, useMemo } from 'react'
import Card from './Card'
import SearchFilter from './SearchFilter'
import DealSession from './DealSession'

const CATEGORY_ORDER = ['Home', 'Out', 'Caregiving', 'Magic', 'Wild']

function CardSection({ category, cards, onOwnerChange }) {
  return (
    <section className="category-section" aria-label={`${category} cards`}>
      <div className="category-header">
        <span className="category-title">{category}</span>
        <div className="category-line" aria-hidden="true"/>
        <span className="category-count">{cards.length}</span>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <Card key={card.id} card={card} onOwnerChange={onOwnerChange}/>
        ))}
      </div>
    </section>
  )
}

function PileSection({ title, description, cards, onOwnerChange }) {
  const [query, setQuery]             = useState('')
  const [activeCategory, setCategory] = useState(null)

  const filtered = useMemo(() => {
    let result = cards
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(c => c.title.toLowerCase().includes(q))
    }
    if (activeCategory) result = result.filter(c => c.category === activeCategory)
    return result
  }, [cards, query, activeCategory])

  const grouped = useMemo(() =>
    CATEGORY_ORDER.reduce((acc, cat) => {
      const catCards = filtered.filter(c => c.category === cat)
      if (catCards.length > 0) acc[cat] = catCards
      return acc
    }, {})
  , [filtered])

  if (cards.length === 0) return null
  const noResults = filtered.length === 0

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--brown-deep)', margin: 0 }}>
          {title}
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--brown-pale)', fontWeight: 500 }}>
          {cards.length} card{cards.length !== 1 ? 's' : ''}
        </span>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--brown-light)', margin: '0 0 0.75rem' }}>{description}</p>

      <SearchFilter
        query={query}
        onQuery={setQuery}
        activeCategory={activeCategory}
        onCategory={setCategory}
        cards={cards}
      />

      {noResults ? (
        <div className="empty-state" style={{ padding: '1.5rem 0' }}>
          <p>No cards match.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, catCards]) => (
          <CardSection
            key={category}
            category={category}
            cards={catCards}
            onOwnerChange={onOwnerChange}
          />
        ))
      )}
    </div>
  )
}

export default function DiscardedTab({ unassignedCards, discardedCards, onOwnerChange }) {
  const [dealSession, setDealSession] = useState(false)
  const isEmpty = unassignedCards.length === 0 && discardedCards.length === 0

  return (
    <div className="main-content">
      {isEmpty ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Nothing here yet</h3>
          <p>Undealt and discarded cards will appear here.</p>
        </div>
      ) : (
        <>
          {unassignedCards.length > 0 && (
            <div className="deal-session-banner">
              <div>
                <div className="deal-session-banner-title">Ready to deal?</div>
                <div className="deal-session-banner-sub">
                  Go through all {unassignedCards.length} undealt cards one by one together.
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setDealSession(true)}
                style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                Start dealing →
              </button>
            </div>
          )}

          <PileSection
            title="Undealt"
            description="Cards not yet assigned. Flip any card to deal it individually, or use the dealing session above."
            cards={unassignedCards}
            onOwnerChange={onOwnerChange}
          />
          <PileSection
            title="Discarded"
            description="Cards set aside as not relevant to your household right now."
            cards={discardedCards}
            onOwnerChange={onOwnerChange}
          />
        </>
      )}

      {dealSession && (
        <DealSession
          cards={unassignedCards}
          onOwnerChange={onOwnerChange}
          onClose={() => setDealSession(false)}
        />
      )}
    </div>
  )
}
