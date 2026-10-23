import { getRatingBreakdown, getReviewsForProduct } from '../data/reviews'
import ReviewCard from './ReviewCard'
import RatingBreakdown from './RatingBreakdown'

function ProductReviews({ productId, count = 4 }) {
  const reviews = getReviewsForProduct(productId, count)
  const breakdown = getRatingBreakdown(productId, count)

  return (
    <section className="reviews">
      <div className="reviews-head">
        <h2 className="section-title">
          Customer reviews <span className="muted">({reviews.length})</span>
        </h2>
        <RatingBreakdown breakdown={breakdown} total={reviews.length} />
      </div>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}

export default ProductReviews
