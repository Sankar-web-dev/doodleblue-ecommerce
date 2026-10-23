import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCart,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  FREE_SHIPPING_MIN,
  SHIPPING_COST,
} from '../store/cartSlice/slice'
import { placeOrder } from '../store/ordersSlice/slice'
import { isValidPromo, promoDiscount, promoShipping, PROMO_CODES } from '../data/promos'
import { selectUser } from '../store/authSlice/slice'
import { formatPrice } from '../utils/money'
import EmptyState from '../components/EmptyState'
import { CartIcon, CheckIcon } from '../components/icons'

function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector(selectCartItems)
  const totalItems = useSelector(selectTotalItems)
  const subtotal = useSelector(selectTotalPrice)
  const user = useSelector(selectUser)
  const [placed, setPlaced] = useState(false)
  const [promo, setPromo] = useState(null)
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  const shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_COST
  const discount = promoDiscount(promo, subtotal)
  const finalShipping = promoShipping(promo, shipping)
  const total = subtotal + finalShipping - discount

  const applyCode = (code) => {
    setPromo(code)
    setPromoInput('')
    setPromoError('')
  }

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (!code) return
    if (!isValidPromo(code)) {
      setPromoError(`"${code}" is not a valid promo code.`)
      return
    }
    applyCode(code)
  }

  const submitOrder = (e) => {
    e.preventDefault()
    dispatch(
      placeOrder({
        email: user?.email ?? 'guest',
        items,
        subtotal,
        shipping: finalShipping,
        discount,
        promo,
        total,
      })
    )
    dispatch(clearCart())
    setPlaced(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (placed) {
    return (
      <main className="page">
        <div className="card empty-cart">
          <div className="empty-icon">
            <CheckIcon size={40} />
          </div>
          <h2>Order placed!</h2>
          <p>
            Thank you for shopping with us. Your order is confirmed and will be
            shipped soon.
          </p>
          <div className="success-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/orders')}
            >
              View my orders
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/')}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="page">
        <EmptyState
          icon={<CartIcon size={40} />}
          title="Nothing to checkout"
          actionLabel="Browse products"
          onAction={() => navigate('/')}
        >
          Your cart is empty. Add some products before proceeding to checkout.
        </EmptyState>
      </main>
    )
  }

  return (
    <main className="page">
      <div className="cart-head">
        <h1>
          Checkout <span>({totalItems} items)</span>
        </h1>
        <Link to="/cart" className="continue-link">
          ‹ Back to cart
        </Link>
      </div>

      <form className="cart-layout" onSubmit={submitOrder}>
        <section className="card checkout-form">
          <h2>Shipping details</h2>
          <div className="field-row">
            <label className="field">
              Full name
              <input type="text" name="name" required placeholder="John Doe" />
            </label>
            <label className="field">
              Phone
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
              />
            </label>
          </div>
          <label className="field">
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="field">
            Address
            <input
              type="text"
              name="address"
              required
              placeholder="Street, building, apartment"
            />
          </label>
          <div className="field-row">
            <label className="field">
              City
              <input type="text" name="city" required placeholder="Chennai" />
            </label>
            <label className="field">
              Pincode
              <input
                type="text"
                name="pincode"
                required
                inputMode="numeric"
                placeholder="600001"
              />
            </label>
          </div>

          <h2>Payment method</h2>
          <label className="pay-option">
            <input type="radio" name="payment" value="cod" defaultChecked />
            Cash on delivery
          </label>
          <label className="pay-option">
            <input type="radio" name="payment" value="upi" />
            UPI
          </label>
          <label className="pay-option">
            <input type="radio" name="payment" value="card" />
            Credit / debit card
          </label>
        </section>

        <aside className="card summary">
          <h2>Order summary</h2>

          {promo ? (
            <div className="promo-applied">
              <span>
                <strong>{promo}</strong> · {PROMO_CODES[promo]}
              </span>
              <button type="button" onClick={() => setPromo(null)}>
                Remove
              </button>
            </div>
          ) : (
            <div className="promo-row">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value)
                  setPromoError('')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    applyPromo()
                  }
                }}
                placeholder="Promo code"
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={applyPromo}
              >
                Apply
              </button>
            </div>
          )}
          {promoError && <p className="promo-error">{promoError}</p>}

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="summary-row">
              <span>Discount</span>
              <span className="free">−{formatPrice(discount)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Shipping</span>
            {finalShipping === 0 ? (
              <span className="free">FREE</span>
            ) : (
              <span>{formatPrice(finalShipping)}</span>
            )}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Place order
          </button>
          <p className="summary-note">
            Free shipping on orders of {formatPrice(FREE_SHIPPING_MIN)} or
            more. Try{' '}
            <button
              type="button"
              className="promo-code"
              onClick={() => applyCode('SAVE10')}
            >
              SAVE10
            </button>{' '}
            or{' '}
            <button
              type="button"
              className="promo-code"
              onClick={() => applyCode('FREESHIP')}
            >
              FREESHIP
            </button>
          </p>
        </aside>
      </form>
    </main>
  )
}

export default CheckoutPage
