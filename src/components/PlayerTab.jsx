import { useState, useMemo } from 'react'
import Card from './Card'
import SearchFilter from './SearchFilter'

const CATEGORY_ORDER = ['Home', 'Out', 'Caregiving', 'Magic', 'Wild']
const CATEGORY_EMOJI = {
  Home:       '🏠',
  Out:        '🚗',
  Caregiving: '❤️',
  Magic:      '✨',
  Wild:       '🃏',
}

export default function PlayerTab({ player, cards, onOwnerChange, onAddCard }) {
  const [query, setQuery]             = useState('')
  const [activeCategory, setCategory] = useState(null)

  const filtered = useMemo(() => {
    let result = cards
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(c => c.title.toLowerCase().includes(q))
    }
    if (activeCategory) {
      result = result.filter(c => c.category === activeCategory)
    }
    return result
  }, [cards, query, activeCategory])

  const grouped = useMemo(() =>
    CATEGORY_ORDER.reduce((acc, cat) => {
      const catCards = filtered.filter(c => c.category === cat)
      if (catCards.length > 0) acc[cat] = catCards
      return acc
    }, {})
  , [filtered])

  const isEmpty    = cards.length === 0
  const noResults  = !isEmpty && filtered.length === 0

  return (
    <div className="main-content">
      {!isEmpty && (
        <SearchFilter
          query={query}
          onQuery={setQuery}
          activeCategory={activeCategory}
          onCategory={setCategory}
          cards={cards}
        />
      )}

      {isEmpty ? (
        <div className="empty-state">
          <div className="empty-state-icon">🃏</div>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
            {player} has no cards yet
          </h3>
          <p>Cards are dealt during your first check-in together.</p>
          <p>Head to Undealt to start dealing.</p>
        </div>
      ) : noResults ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>No cards match</h3>
          <p>Try a different search or clear the filter.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, catCards]) => (
          <section key={category} className="category-section" aria-label={`${category} cards`}>
            <div className="category-header">
              <span className="category-title">
                {CATEGORY_EMOJI[category]} {category}
              </span>
              <div className="category-line" aria-hidden="true"/>
              <span className="category-count">{catCards.length}</span>
            </div>
            <div className="card-grid">
              {catCards.map(card => (
                <Card key={card.id} card={card} onOwnerChange={onOwnerChange}/>
              ))}
            </div>
          </section>
        ))
      )}

      <button
        className="add-card-fab"
        onClick={onAddCard}
        aria-label={`Add custom card to ${player}'s hand`}
        title="Add a custom card"
      >
        +
      </button>
    </div>
  )
}
