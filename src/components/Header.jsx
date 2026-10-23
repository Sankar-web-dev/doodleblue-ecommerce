import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalItems } from '../store/cartSlice/slice'
import { selectFavouriteCount } from '../store/favouritesSlice/slice'
import { selectFilters, setSearch } from '../store/productsSlice/slice'
import { logout, selectUser } from '../store/authSlice/slice'
import { useTheme } from '../context/ThemeContext'
import {
  CartIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from './icons'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const totalItems = useSelector(selectTotalItems)
  const favCount = useSelector(selectFavouriteCount)
  const { search } = useSelector(selectFilters)
  const user = useSelector(selectUser)
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const onSearchChange = (e) => {
    dispatch(setSearch(e.target.value))
    if (location.pathname !== '/') {
      navigate('/')
    }
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Shop<span>Kart</span>
        </Link>

        <div className="search-box">
          <SearchIcon size={16} />
          <input
            type="search"
            placeholder="Search products"
            value={search}
            onChange={onSearchChange}
          />
        </div>

        <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link">
            Products
          </Link>
          {user && (
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
          )}
          <Link to="/favourites" className="cart-btn">
            <HeartIcon size={18} />
            <span className="btn-label">Saved</span>
            <span className="cart-badge">{favCount}</span>
          </Link>
          <Link to="/cart" className="cart-btn">
            <CartIcon size={18} />
            <span className="btn-label">Cart</span>
            <span className="cart-badge">{totalItems}</span>
          </Link>
          <button
            type="button"
            className="cart-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            }
          >
            {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="header-avatar" title="View profile">
                {user.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </Link>
              <button
                type="button"
                className="nav-link logout-btn"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="cart-btn menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>
    </header>
  )
}

export default Header
