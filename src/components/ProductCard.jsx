import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  decrease,
  increase,
  selectCartQty,
} from '../store/cartSlice/slice'
import { formatPrice } from '../utils/money'
import ProductImage from './ProductImage'
import RatingStars from './RatingStars'
import QuantityStepper from './QuantityStepper'
import FavouriteButton from './FavouriteButton'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const qty = useSelector(selectCartQty(product.id))

  return (
    <article className="card product-card">
      <FavouriteButton productId={product.id} className="fav-card" />
      <Link to={`/products/${product.id}`} className="product-card-body">
        <ProductImage product={product} />
        <p className="card-category">{product.category}</p>
        <h3 className="card-title">{product.title}</h3>
        <RatingStars rate={product.rating.rate} count={product.rating.count} />
      </Link>

      <div className="card-foot">
        <span className="price">{formatPrice(product.price)}</span>
        {qty === 0 ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch(addToCart({ product, qty: 1 }))}
          >
            Add to cart
          </button>
        ) : (
          <QuantityStepper
            qty={qty}
            onDecrease={() => dispatch(decrease(product.id))}
            onIncrease={() => dispatch(increase(product.id))}
          />
        )}
      </div>
    </article>
  )
}

export default ProductCard
