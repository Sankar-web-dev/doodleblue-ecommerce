import { createSlice } from '@reduxjs/toolkit'

// localStorage keeps two things:
// - shopkart_users: registered accounts { name, email, password }
// - shopkart_user: the logged-in session { name, email }
const USERS_KEY = 'shopkart_users'
const SESSION_KEY = 'shopkart_user'

const readJSON = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

const startSession = (state, user) => {
  state.user = { name: user.name, email: user.email }
  state.error = null
  localStorage.setItem(SESSION_KEY, JSON.stringify(state.user))
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: readJSON(SESSION_KEY, null), error: null },
  reducers: {
    signup(state, action) {
      const { name, email, password } = action.payload
      const users = readJSON(USERS_KEY, [])
      if (users.some((u) => u.email === email)) {
        state.error = 'An account with this email already exists.'
        return
      }
      users.push({ name, email, password })
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      startSession(state, { name, email })
    },
    login(state, action) {
      const { email, password } = action.payload
      const found = readJSON(USERS_KEY, []).find(
        (u) => u.email === email && u.password === password
      )
      if (!found) {
        state.error = 'Invalid email or password.'
        return
      }
      startSession(state, found)
    },
    logout(state) {
      state.user = null
      state.error = null
      localStorage.removeItem(SESSION_KEY)
    },
    clearAuthError(state) {
      state.error = null
    },
  },
})

export const { signup, login, logout, clearAuthError } = authSlice.actions

export const selectUser = (state) => state.auth.user
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
