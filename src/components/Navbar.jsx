import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { navItems } from '../data/blogData'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setAuthChecked(true)
    })
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="InkSpace home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-lg shadow-indigo-200">
            I
          </span>
          <span className="text-xl font-semibold tracking-[-0.06em] text-slate-900">InkSpace</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-slate-900' : 'text-slate-600 hover:text-indigo-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-indigo-600" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {authChecked && (currentUser ? (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-xl"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-xl"
            >
              Login
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-slate-800" />
            <span className="block h-0.5 w-5 rounded-full bg-slate-800" />
            <span className="block h-0.5 w-5 rounded-full bg-slate-800" />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {authChecked && (currentUser ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200"
              >
                Login
              </Link>
            ))}
         
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
