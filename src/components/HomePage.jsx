import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from './BlogCard'
import Hero from './Hero'
import { fetchBlogs } from '../data/blogsApi'
import { ArrowIcon } from './Icons'

function HomePage() {
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    fetchBlogs()
      .then((blogs) => {
        if (active) setFeaturedBlogs(blogs.slice(0, 3))
      })
      .catch((requestError) => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="space-y-16 pb-8 pt-6 sm:pt-8">
      <Hero />

      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Featured writing</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-4xl">Popular stories</h2>
          </div>
          <Link to="/blogs" className="hidden items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-indigo-600 sm:flex">
            View all <ArrowIcon />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        {loading && <p className="py-8 text-center text-sm text-slate-500" role="status">Loading stories...</p>}
        {error && <p className="py-8 text-center text-sm text-red-700" role="alert">{error}</p>}
        {!loading && !error && featuredBlogs.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">No published stories yet.</p>
        )}
      </section>
    </div>
  )
}

export default HomePage
