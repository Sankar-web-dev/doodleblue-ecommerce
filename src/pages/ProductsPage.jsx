import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  selectCategories,
  selectFilters,
  selectVisibleProducts,
  selectPagedProducts,
  selectPage,
  selectPageCount,
  setCategory,
  setPage,
  setSort,
} from '../store/productsSlice/slice'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

function ProductsPage() {
  const dispatch = useDispatch()
  const { status, error } = useProducts()
  const visible = useSelector(selectVisibleProducts)
  const products = useSelector(selectPagedProducts)
  const categories = useSelector(selectCategories)
  const filters = useSelector(selectFilters)
  const pageCount = useSelector(selectPageCount)
  const page = Math.min(useSelector(selectPage), pageCount)

  const goToPage = (n) => {
    dispatch(setPage(n))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <h1>All products</h1>
          <p className="muted">
            Showing {products.length} of {visible.length} products
          </p>
        </div>
        <label className="sort">
          Sort by
          <select
            value={filters.sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="shop-layout">
        <aside className="card shop-side">
          <h3 className="side-title">Categories</h3>
          <div className="cat-list">
            {['all', ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-btn ${
                  filters.category === cat ? 'cat-btn-active' : ''
                }`}
                onClick={() => dispatch(setCategory(cat))}
              >
                {cat === 'all' ? 'All products' : cat}
              </button>
            ))}
          </div>
        </aside>

        <div className="shop-main">
          {status === 'loading' && (
            <p className="state-msg">Loading products...</p>
          )}

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

          {status === 'succeeded' && visible.length === 0 && (
            <p className="state-msg">No products match your search.</p>
          )}

          {status === 'succeeded' && (
            <>
              <div className="grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                page={page}
                pageCount={pageCount}
                onChange={goToPage}
              />
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProductsPage
