import { ORDER_STEPS, getOrderStep } from '../store/ordersSlice/slice'
import { formatPrice } from '../utils/money'
import ProductImage from './ProductImage'

function OrderCard({ order, now }) {
  const step = getOrderStep(order.placedAt, now)
  const date = new Date(order.placedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="card order-card">
      <header className="order-top">
        <div>
          <span className="order-id">{order.id}</span>
          <span className="order-date">Placed on {date}</span>
        </div>
        <span className="order-total">{formatPrice(order.total)}</span>
      </header>

      <div className="order-items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <ProductImage product={item} className="order-thumb" />
            <div>
              <span className="order-item-title">{item.title}</span>
              <span className="order-item-meta">
                Qty {item.qty} · {formatPrice(item.price)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="order-steps">
        {ORDER_STEPS.map((label, i) => (
          <div
            key={label}
            className={`order-step ${i <= step ? 'step-done' : ''} ${
              i === step ? 'step-current' : ''
            }`}
          >
            <span className="step-dot">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default OrderCard
