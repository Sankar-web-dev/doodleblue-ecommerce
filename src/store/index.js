import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice/slice'
import productsReducer from './productsSlice/slice'
import favouritesReducer from './favouritesSlice/slice'
import authReducer from './authSlice/slice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    favourites: favouritesReducer,
    auth: authReducer,
  },
})
