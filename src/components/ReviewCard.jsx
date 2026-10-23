import RatingStars from './RatingStars'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function ReviewCard({ review }) {
  return (
    <article className="card review-card">
      <header className="review-head">
        <span className="review-avatar">{initials(review.author)}</span>
        <div className="review-meta">
          <span className="review-author">{review.author}</span>
          <span className="review-date">{formatDate(review.date)}</span>
        </div>
        <RatingStars rate={review.rating} />
      </header>
      <h3 className="review-title">{review.title}</h3>
      <p className="review-text">{review.body}</p>
    </article>
  )
}

export default ReviewCard
