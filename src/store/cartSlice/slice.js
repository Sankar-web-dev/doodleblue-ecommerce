import { createSlice } from '@reduxjs/toolkit'

export const FREE_SHIPPING_MIN = 100
export const SHIPPING_COST = 5

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: {} },
  reducers: {
    addToCart(state, action) {
      const { product, qty = 1 } = action.payload
      const existing = state.items[product.id]
      if (existing) {
        existing.qty += qty
      } else {
        state.items[product.id] = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          qty,
        }
      }
    },
    removeFromCart(state, action) {
      delete state.items[action.payload]
    },
    increase(state, action) {
      const item = state.items[action.payload]
      if (item) item.qty += 1
    },
    decrease(state, action) {
      const item = state.items[action.payload]
      if (!item) return
      if (item.qty <= 1) {
        delete state.items[action.payload]
      } else {
        item.qty -= 1
      }
    },
    clearCart(state) {
      state.items = {}
    },
  },
})

export const { addToCart, removeFromCart, increase, decrease, clearCart } =
  cartSlice.actions

export const selectCartItems = (state) => Object.values(state.cart.items)
export const selectCartQty = (id) => (state) => state.cart.items[id]?.qty ?? 0

export const selectTotalItems = (state) =>
  selectCartItems(state).reduce((sum, item) => sum + item.qty, 0)

export const selectTotalPrice = (state) =>
  selectCartItems(state).reduce((sum, item) => sum + item.qty * item.price, 0)

export default cartSlice.reducer
