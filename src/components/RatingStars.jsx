function RatingStars({ rate, count }) {
  return (
    <span className="rating">
      <span className="stars" aria-hidden="true">
        <span>★★★★★</span>
        <span className="stars-fill" style={{ width: `${(rate / 5) * 100}%` }}>
          ★★★★★
        </span>
      </span>
      <span className="rating-rate">{Number(rate).toFixed(1)}</span>
      {count != null && <span className="rating-count">({count} reviews)</span>}
    </span>
  )
}

export default RatingStars
