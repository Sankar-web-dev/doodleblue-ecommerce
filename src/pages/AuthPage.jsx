import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAuthError,
  login,
  selectAuthError,
  selectUser,
  signup,
} from '../store/authSlice/slice'

function AuthPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const error = useSelector(selectAuthError)

  const [mode, setMode] = useState('login')
  const isSignup = mode === 'signup'

  // Already logged in (or just succeeded) -> leave the auth page
  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  useEffect(() => {
    dispatch(clearAuthError())
  }, [mode, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
    }
    dispatch(isSignup ? signup(payload) : login(payload))
  }

  return (
    <main className="page">
      <div className="card auth-card">
        <h1>{isSignup ? 'Create account' : 'Welcome back'}</h1>
        <p className="muted">
          {isSignup
            ? 'Sign up to start shopping with ShopKart.'
            : 'Log in to your ShopKart account.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="field">
              Full name
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                autoComplete="name"
              />
            </label>
          )}
          <label className="field">
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label className="field">
            Password
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-lg">
            {isSignup ? 'Sign up' : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setMode(isSignup ? 'login' : 'signup')}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>

        <Link to="/" className="continue-link auth-back">
          ‹ Continue shopping
        </Link>
      </div>
    </main>
  )
}

export default AuthPage
