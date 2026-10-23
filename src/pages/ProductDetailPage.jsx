import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { addToCart, FREE_SHIPPING_MIN } from '../store/cartSlice/slice'
import { setCategory } from '../store/productsSlice/slice'
import { useProducts } from '../hooks/useProducts'
import { formatPrice } from '../utils/money'
import ProductImage from '../components/ProductImage'
import RatingStars from '../components/RatingStars'
import QuantityStepper from '../components/QuantityStepper'
import ProductCard from '../components/ProductCard'
import FavouriteButton from '../components/FavouriteButton'
import { CartIcon, ReturnIcon, TruckIcon } from '../components/icons'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, status } = useProducts()

  const [qty, setQty] = useState(1)
  const [activeThumb, setActiveThumb] = useState(0)

  const product = items.find((p) => p.id === Number(id))

  if (status === 'idle' || status === 'loading') {
    return (
      <main className="page">
        <p className="state-msg">Loading product...</p>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="page">
        <div className="card empty-cart">
          <h2>Product not found</h2>
          <p>We couldn't find a product with this id.</p>
          <Link to="/" className="btn btn-primary">
            Back to products
          </Link>
        </div>
      </main>
    )
  }

  const gallery = [product.image, product.image, product.image, product.image]

  const related = items
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleCategoryClick = () => {
    dispatch(setCategory(product.category))
    navigate('/')
  }

  return (
    <main className="page">
      <nav className="breadcrumbs">
        <Link to="/">Products</Link>
        <span>/</span>
        <button type="button" className="crumb-btn" onClick={handleCategoryClick}>
          {product.category}
        </button>
        <span>/</span>
        <span className="crumb-current">{product.title}</span>
      </nav>

      <section className="card pdp">
        <div className="pdp-gallery">
          <ProductImage product={{ ...product, image: gallery[activeThumb] }} />
          <div className="thumbs">
            {gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                className={`thumb ${i === activeThumb ? 'thumb-active' : ''}`}
                onClick={() => setActiveThumb(i)}
              >
                <img src={img} alt={`${product.title} thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <span className="badge-category">{product.category}</span>
          <h1>{product.title}</h1>
          <RatingStars rate={product.rating.rate} count={product.rating.count} />
          <p className="pdp-price">{formatPrice(product.price)}</p>
          <p className="pdp-desc">{product.description}</p>
          <hr />

          <div className="pdp-qty">
            <span className="muted">Quantity</span>
            <QuantityStepper
              qty={qty}
              onDecrease={() => setQty((q) => Math.max(1, q - 1))}
              onIncrease={() => setQty((q) => q + 1)}
            />
          </div>

          <div className="pdp-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => dispatch(addToCart({ product, qty }))}
            >
              <CartIcon size={18} />
              Add to cart
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => navigate('/cart')}
            >
              Go to cart
            </button>
            <FavouriteButton productId={product.id} className="fav-pdp" />
          </div>

          <p className="pdp-note">
            <TruckIcon size={16} /> Free shipping on orders of{' '}
            {formatPrice(FREE_SHIPPING_MIN).replace('.00', '')} or more
          </p>
          <p className="pdp-note">
            <ReturnIcon size={16} /> 30-day easy returns
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <>
          <h2 className="section-title">You may also like</h2>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default ProductDetailPage
