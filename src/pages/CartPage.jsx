import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCart,
  decrease,
  increase,
  removeFromCart,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  FREE_SHIPPING_MIN,
  SHIPPING_COST,
} from '../store/cartSlice/slice'
import { formatPrice } from '../utils/money'
import ProductImage from '../components/ProductImage'
import QuantityStepper from '../components/QuantityStepper'
import EmptyState from '../components/EmptyState'
import { CartIcon, TrashIcon } from '../components/icons'

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const totalItems = useSelector(selectTotalItems)
  const subtotal = useSelector(selectTotalPrice)

  const shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  return (
    <main className="page">
      <div className="cart-head">
        <h1>
          Your cart <span>({totalItems} items)</span>
        </h1>
        <Link to="/" className="continue-link">
          ‹ Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<CartIcon size={40} />}
          title="Your cart is empty"
          actionLabel="Browse products"
          onAction={() => navigate('/')}
        >
          Looks like you haven't added anything yet. Browse the products and add
          your favourites.
        </EmptyState>
      ) : (
        <div className="cart-layout">
          <section className="cart-list">
            <div className="cart-list-head">
              <span>Product</span>
              <button
                type="button"
                className="clear-btn"
                onClick={() => dispatch(clearCart())}
              >
                Clear cart
              </button>
            </div>

            {items.map((item) => (
              <div className="cart-row" key={item.id}>
                <ProductImage product={item} className="cart-thumb" />
                <div className="cart-info">
                  <Link to={`/products/${item.id}`} className="cart-title">
                    {item.title}
                  </Link>
                  <p className="cart-cat">{item.category}</p>
                  <p className="cart-each">{formatPrice(item.price)} each</p>
                </div>
                <QuantityStepper
                  qty={item.qty}
                  onDecrease={() => dispatch(decrease(item.id))}
                  onIncrease={() => dispatch(increase(item.id))}
                />
                <span className="cart-line-total">
                  {formatPrice(item.price * item.qty)}
                </span>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={`Remove ${item.title}`}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <TrashIcon size={17} />
                </button>
              </div>
            ))}
          </section>

          <aside className="card summary">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              {shipping === 0 ? (
                <span className="free">FREE</span>
              ) : (
                <span>{formatPrice(shipping)}</span>
              )}
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button type="button" className="btn btn-primary btn-lg">
              Proceed to checkout
            </button>
            <p className="summary-note">
              Free shipping on orders of {formatPrice(FREE_SHIPPING_MIN)} or
              more.
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CartPage
