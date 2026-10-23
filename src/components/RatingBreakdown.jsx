function RatingBreakdown({ breakdown, total }) {
  return (
    <div className="rating-bars">
      {breakdown.map(({ stars, count }) => (
        <div className="rating-bar" key={stars}>
          <span className="rating-bar-label">{stars}★</span>
          <span className="rating-bar-track">
            <span
              className="rating-bar-fill"
              style={{ width: `${total ? (count / total) * 100 : 0}%` }}
            />
          </span>
          <span className="rating-bar-count">{count}</span>
        </div>
      ))}
    </div>
  )
}

export default RatingBreakdown
