function CategoryChips({ categories, active, onChange }) {
  return (
    <div className="chips">
      {['all', ...categories].map((cat) => (
        <button
          key={cat}
          type="button"
          className={`chip ${active === cat ? 'chip-active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat === 'all' ? 'All' : cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryChips
