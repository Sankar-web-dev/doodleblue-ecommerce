import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/authSlice/slice'
import { selectMyOrders } from '../store/ordersSlice/slice'
import { selectTotalItems } from '../store/cartSlice/slice'
import { selectFavouriteCount } from '../store/favouritesSlice/slice'
import EmptyState from '../components/EmptyState'
import { CartIcon, HeartIcon, TruckIcon } from '../components/icons'

// Dummy profile details — real apps would fetch these from an account API
const DUMMY_PROFILE = {
  phone: '+91 98765 43210',
  address: '42, 2nd Cross Street, Anna Nagar, Chennai 600040',
  memberSince: 'January 2026',
  loyaltyPoints: 240,
  tier: 'Gold member',
  payment: 'UPI •••• @okhdfc',
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function StatCard({ to, icon, value, label }) {
  return (
    <Link to={to} className="card stat-card">
      <span className="stat-icon">{icon}</span>
      <span className="stat-num">{value}</span>
      <span className="stat-label">{label}</span>
    </Link>
  )
}

function ProfilePage() {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const orders = useSelector(selectMyOrders)
  const cartItems = useSelector(selectTotalItems)
  const favCount = useSelector(selectFavouriteCount)

  if (!user) {
    return (
      <main className="page">
        <EmptyState
          icon={<CartIcon size={40} />}
          title="Log in to view your profile"
          actionLabel="Log in"
          onAction={() => navigate('/login')}
        >
          Your account details and stats will show up here once you're logged
          in.
        </EmptyState>
      </main>
    )
  }

  const firstName = user.name.split(' ')[0]

  return (
    <main className="page">
      <section className="card profile-hero">
        <span className="profile-avatar-lg">{initials(user.name)}</span>
        <div className="profile-id">
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <span className="member-badge">{DUMMY_PROFILE.tier}</span>
        </div>
      </section>

      <div className="profile-stats">
        <StatCard
          to="/orders"
          icon={<TruckIcon size={20} />}
          value={orders.length}
          label={orders.length === 1 ? 'Order' : 'Orders'}
        />
        <StatCard
          to="/favourites"
          icon={<HeartIcon size={20} filled />}
          value={favCount}
          label="Saved"
        />
        <StatCard
          to="/cart"
          icon={<CartIcon size={20} />}
          value={cartItems}
          label="In cart"
        />
        <div className="card stat-card">
          <span className="stat-icon">★</span>
          <span className="stat-num">{DUMMY_PROFILE.loyaltyPoints}</span>
          <span className="stat-label">Reward points</span>
        </div>
      </div>

      <section className="card profile-details">
        <h2>Account details</h2>
        <div className="detail-row">
          <span>Full name</span>
          <span>{user.name}</span>
        </div>
        <div className="detail-row">
          <span>Email</span>
          <span>{user.email}</span>
        </div>
        <div className="detail-row">
          <span>Phone</span>
          <span>{DUMMY_PROFILE.phone}</span>
        </div>
        <div className="detail-row">
          <span>Address</span>
          <span>{DUMMY_PROFILE.address}</span>
        </div>
        <div className="detail-row">
          <span>Member since</span>
          <span>{DUMMY_PROFILE.memberSince}</span>
        </div>
        <div className="detail-row">
          <span>Saved payment</span>
          <span>{DUMMY_PROFILE.payment}</span>
        </div>
      </section>

      <p className="profile-greet muted">
        Welcome back, {firstName}. Happy shopping!
      </p>
    </main>
  )
}

export default ProfilePage
