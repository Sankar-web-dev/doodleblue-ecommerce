import { createSlice, createSelector } from '@reduxjs/toolkit'

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: { ids: [] },
  reducers: {
    toggleFavourite(state, action) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id)
      } else {
        state.ids.push(id)
      }
    },
    clearFavourites(state) {
      state.ids = []
    },
  },
})

export const { toggleFavourite, clearFavourites } = favouritesSlice.actions

export const selectFavouriteIds = (state) => state.favourites.ids
export const selectFavouriteCount = (state) => state.favourites.ids.length
export const selectIsFavourite = (id) => (state) =>
  state.favourites.ids.includes(id)

export const selectFavouriteProducts = createSelector(
  [(state) => state.products.items, selectFavouriteIds],
  (items, ids) => items.filter((p) => ids.includes(p.id))
)

export default favouritesSlice.reducer
