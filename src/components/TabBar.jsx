const TABS = [
  { id: 'rules',     label: 'Rules'     },
  { id: 'tarragon',  label: 'Tarragon'  },
  { id: 'sean',      label: 'Sean'      },
  { id: 'discarded', label: 'Undealt'   },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tab-bar" aria-label="Main navigation">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn${active === tab.id ? ' active' : ''}`}
          onClick={() => onChange(tab.id)}
          aria-current={active === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
