import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">I</span>
          <span className="font-semibold text-slate-900">InkSpace</span>
        </div>

        <p>Thoughtful stories for curious minds.</p>

        <div className="flex gap-5">
          <Link to="/about" className="transition hover:text-indigo-600">About</Link>
          <Link to="/blogs" className="transition hover:text-indigo-600">Blogs</Link>
          <Link to="/login" className="transition hover:text-indigo-600">Login</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
