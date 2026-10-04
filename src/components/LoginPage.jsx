import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import axios from 'axios'
import { API_BASE_URL } from '../data/api'
import { useContext } from 'react'
import { UserContext } from '../App'

function LoginPage() {
  const { setRole } = useContext(UserContext)
  
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        console.log('User signed in:', userCredential.user)
        const uid = userCredential.user.uid
        const response = await axios.get(`${API_BASE_URL}/api/users/${uid}`)
        console.log('User role:', response.data)
        setRole(response.data)
        navigate('/')
      })

    } catch (error) {
      setErrorMessage(error.message || 'Unable to sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center pb-10 pt-6 sm:pt-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden bg-slate-900 px-8 py-10 text-white sm:px-10 lg:px-12">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-indigo-400/30 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200">
              Welcome back
            </span>

            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">Read more. Write better.</h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Sign in to continue your reading journey, save your work, and stay close to thoughtful ideas.
            </p>

            <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">This week</p>
              <p className="mt-3 text-2xl font-semibold">12 new stories published</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Login</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-900">Sign in to InkSpace</h2>
          </div>

          {location.state?.accountCreated && (
            <p className="mb-5 text-sm text-green-700" role="status">
              Account created. Sign in with your email and password.
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </label>

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Remember me
              </label>

              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600" role="alert">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>

            <p className="text-center text-sm text-slate-600">
              Need an account?{' '}
              <Link to="/create-account" className="font-semibold text-slate-900 hover:text-indigo-600">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
