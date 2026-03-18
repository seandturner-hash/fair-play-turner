const CATEGORIES = ['Home', 'Out', 'Caregiving', 'Magic', 'Wild']

export default function SearchFilter({ query, onQuery, activeCategory, onCategory, cards }) {
  // Only show category pills that have cards in the current (searched) set
  const presentCategories = CATEGORIES.filter(cat =>
    cards.some(c => c.category === cat)
  )

  return (
    <div className="search-filter">
      <div className="search-input-wrap">
        <svg className="search-icon" viewBox="0 0 16 16" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="6.5" cy="6.5" r="4.5"/>
          <line x1="10" y1="10" x2="14" y2="14"/>
        </svg>
        <input
          type="search"
          className="search-input"
          placeholder="Search cards…"
          value={query}
          onChange={e => onQuery(e.target.value)}
          aria-label="Search cards"
        />
        {query && (
          <button className="search-clear" onClick={() => onQuery('')} aria-label="Clear search">✕</button>
        )}
      </div>

      {presentCategories.length > 1 && (
        <div className="filter-pills" role="group" aria-label="Filter by category">
          <button
            className={`filter-pill${!activeCategory ? ' active' : ''}`}
            onClick={() => onCategory(null)}
          >
            All
          </button>
          {presentCategories.map(cat => (
            <button
              key={cat}
              className={`filter-pill${activeCategory === cat ? ' active' : ''}`}
              onClick={() => onCategory(activeCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
