import { createSlice } from '@reduxjs/toolkit'

let nextId = 1
const MAX_TOASTS = 3

const toastSlice = createSlice({
  name: 'toasts',
  initialState: { list: [] },
  reducers: {
    showToast: {
      prepare: (message, type = 'success') => ({
        payload: { id: nextId++, message, type },
      }),
      reducer: (state, action) => {
        state.list.push(action.payload)
        state.list = state.list.slice(-MAX_TOASTS)
      },
    },
    dismissToast(state, action) {
      state.list = state.list.filter((t) => t.id !== action.payload)
    },
  },
})

export const { showToast, dismissToast } = toastSlice.actions

export const selectToasts = (state) => state.toasts.list

export default toastSlice.reducer
