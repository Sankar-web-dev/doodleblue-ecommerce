import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  clearFavourites,
  selectFavouriteProducts,
} from '../store/favouritesSlice/slice'
import { fetchProducts } from '../store/productsSlice/slice'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import { HeartIcon } from '../components/icons'

function FavouritesPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useProducts()
  const favourites = useSelector(selectFavouriteProducts)

  return (
    <main className="page">
      <div className="cart-head">
        <h1>
          Favourites <span>({favourites.length} items)</span>
        </h1>
        {status === 'succeeded' && favourites.length > 0 && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => dispatch(clearFavourites())}
          >
            Clear all
          </button>
        )}
      </div>

      {status === 'loading' && <p className="state-msg">Loading products...</p>}

      {status === 'failed' && (
        <div className="state-msg">
          <p>Something went wrong while loading products. {error}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch(fetchProducts())}
          >
            Try again
          </button>
        </div>
      )}

      {status === 'succeeded' && favourites.length === 0 && (
        <EmptyState
          icon={<HeartIcon size={40} />}
          title="No favourites yet"
          actionLabel="Browse products"
          onAction={() => navigate('/')}
        >
          Tap the heart on any product to save it here for later.
        </EmptyState>
      )}

      {status === 'succeeded' && favourites.length > 0 && (
        <div className="grid">
          {favourites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}

export default FavouritesPage
