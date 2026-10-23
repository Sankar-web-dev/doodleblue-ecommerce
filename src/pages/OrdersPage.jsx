import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/authSlice/slice'
import { selectMyOrders } from '../store/ordersSlice/slice'
import EmptyState from '../components/EmptyState'
import OrderCard from '../components/OrderCard'
import { TruckIcon } from '../components/icons'

const REFRESH_MS = 15000

function OrdersPage() {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const orders = useSelector(selectMyOrders)

  // Re-render every 15s so the status timeline advances on its own
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), REFRESH_MS)
    return () => clearInterval(timer)
  }, [])

  if (!user) {
    return (
      <main className="page">
        <EmptyState
          icon={<TruckIcon size={40} />}
          title="Log in to view your orders"
          actionLabel="Log in"
          onAction={() => navigate('/login')}
        >
          Your order history and delivery status will show up here once you're
          logged in.
        </EmptyState>
      </main>
    )
  }

  return (
    <main className="page">
      <div className="cart-head">
        <h1>
          My orders {orders.length > 0 && <span>({orders.length})</span>}
        </h1>
        <Link to="/" className="continue-link">
          ‹ Continue shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={<TruckIcon size={40} />}
          title="No orders yet"
          actionLabel="Start shopping"
          onAction={() => navigate('/')}
        >
          Orders you place will appear here with their delivery status.
        </EmptyState>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} now={now} />
          ))}
        </div>
      )}
    </main>
  )
}

export default OrdersPage
