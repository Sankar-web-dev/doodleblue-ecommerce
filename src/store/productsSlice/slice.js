import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { getProducts } from '../../api/productsApi'

export const fetchProducts = createAsyncThunk('products/fetchProducts', () =>
  getProducts()
)

export const PAGE_SIZE = 8

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    page: 1,
    filters: { search: '', category: 'all', sort: 'featured' },
  },
  reducers: {
    setSearch(state, action) {
      state.filters.search = action.payload
      state.page = 1
    },
    setCategory(state, action) {
      state.filters.category = action.payload
      state.page = 1
    },
    setSort(state, action) {
      state.filters.sort = action.payload
      state.page = 1
    },
    setPage(state, action) {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setSearch, setCategory, setSort, setPage } =
  productsSlice.actions

export const selectAllProducts = (state) => state.products.items
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error
export const selectFilters = (state) => state.products.filters
export const selectPage = (state) => state.products.page
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => p.id === Number(id))

export const selectCategories = createSelector([selectAllProducts], (items) => [
  ...new Set(items.map((p) => p.category)),
])

export const selectVisibleProducts = createSelector(
  [selectAllProducts, selectFilters],
  (items, { search, category, sort }) => {
    let visible = items
    if (category !== 'all') {
      visible = visible.filter((p) => p.category === category)
    }
    const query = search.trim().toLowerCase()
    if (query) {
      visible = visible.filter((p) => p.title.toLowerCase().includes(query))
    }
    if (sort === 'price-asc') {
      visible = [...visible].sort((a, b) => a.price - b.price)
    } else if (sort === 'price-desc') {
      visible = [...visible].sort((a, b) => b.price - a.price)
    }
    return visible
  }
)

export const selectPageCount = createSelector([selectVisibleProducts], (v) =>
  Math.max(1, Math.ceil(v.length / PAGE_SIZE))
)

export const selectPagedProducts = createSelector(
  [selectVisibleProducts, selectPage, selectPageCount],
  (visible, page, pageCount) => {
    const safePage = Math.min(page, pageCount)
    const start = (safePage - 1) * PAGE_SIZE
    return visible.slice(start, start + PAGE_SIZE)
  }
)

export default productsSlice.reducer
