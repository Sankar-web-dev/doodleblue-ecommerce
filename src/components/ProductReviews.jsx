import { getReviewsForProduct } from '../data/reviews'
import ReviewCard from './ReviewCard'

function ProductReviews({ productId, count = 4 }) {
  const reviews = getReviewsForProduct(productId, count)

  return (
    <section className="reviews">
      <h2 className="section-title">
        Customer reviews <span className="muted">({reviews.length})</span>
      </h2>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}

export default ProductReviews
