import { createSlice } from '@reduxjs/toolkit'

// All orders live in one localStorage array, tagged with the buyer's
// email so each account only sees its own orders.
const ORDERS_KEY = 'shopkart_orders'

const readJSON = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export const ORDER_STEPS = ['Order placed', 'Shipped', 'Delivered']

// Demo-friendly: an order moves through the steps on its own over
// time — under 1 min = placed, under 5 min = shipped, then delivered.
export function getOrderStep(placedAt, now = Date.now()) {
  const elapsedMin = (now - placedAt) / 60000
  if (elapsedMin < 1) return 0
  if (elapsedMin < 5) return 1
  return ORDER_STEPS.length - 1
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { list: readJSON(ORDERS_KEY, []) },
  reducers: {
    placeOrder(state, action) {
      const { email, items, subtotal, shipping, discount = 0, promo, total } =
        action.payload
      state.list.unshift({
        id: `SK-${Date.now().toString(36).toUpperCase()}`,
        email,
        items,
        subtotal,
        shipping,
        discount,
        promo,
        total,
        placedAt: Date.now(),
      })
      state.list = state.list.slice(0, 50)
      localStorage.setItem(ORDERS_KEY, JSON.stringify(state.list))
    },
  },
})

export const { placeOrder } = ordersSlice.actions

export const selectMyOrders = (state) => {
  const email = state.auth.user?.email
  return email ? state.orders.list.filter((o) => o.email === email) : []
}

export default ordersSlice.reducer
