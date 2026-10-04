import { useEffect, useMemo, useState } from 'react'
import BlogCard from './BlogCard'
import { categories } from '../data/blogData'
import { createBlog, fetchBlogs } from '../data/blogsApi'
import { SearchIcon } from './Icons'
import { useContext } from 'react'
import { UserContext } from '../App'

function BlogsPage() {
  const { role } = useContext(UserContext)

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: categories.find((category) => category !== 'All') || '',
    description: '',
    content: '',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    let active = true

    fetchBlogs()
      .then((posts) => {
        if (active) {
          setBlogs((current) => {
            const existingIds = new Set(current.map((blog) => blog.id))
            return [...current, ...posts.filter((blog) => !existingIds.has(blog.id))]
          })
        }
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

  const filteredBlogs = useMemo(() => {
    const trimmedSearch = searchTerm.trim().toLowerCase()

    return blogs.filter((blog) => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
      const matchesSearch =
        trimmedSearch.length === 0 ||
        blog.title.toLowerCase().includes(trimmedSearch) ||
        blog.description.toLowerCase().includes(trimmedSearch) ||
        blog.author.toLowerCase().includes(trimmedSearch)

      return matchesCategory && matchesSearch
    })
  }, [blogs, searchTerm, selectedCategory])

  const visibleBlogs = filteredBlogs.slice(0, visibleCount)
  const hasMore = visibleCount < filteredBlogs.length

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      const createdBlog = await createBlog(formData)
      setBlogs((current) => [createdBlog, ...current])
      setVisibleCount((current) => Math.max(current, 6))
      setSearchTerm('')
      setSelectedCategory('All')
      setFormData({
        title: '',
        author: '',
        category: categories.find((category) => category !== 'All') || '',
        description: '',
        content: '',
      })
    } catch (requestError) {
      setSubmitError(requestError.message || 'Unable to publish this blog post.')
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <div className="space-y-8 pb-10 pt-6 sm:pt-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Discover more</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl">Explore Stories</h1>
      </div>

      {
        role === 'Author' &&
        (
          <form onSubmit={handleSubmit}>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Blog title</span>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                    type="text"
                    placeholder="What are you writing about?"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Author</span>
                  <input
                    name="author"
                    value={formData.author}
                    onChange={handleFormChange}
                    required
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
                  >
                    {categories.filter((category) => category !== 'All').map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Short description</span>
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                    type="text"
                    placeholder="A brief summary of your story"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Blog content</span>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    required
                    rows="8"
                    placeholder="Write your story here..."
                    className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
                  />
                </label>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {submitError && <p className="text-sm text-red-700" role="alert">{submitError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60"
                >
                  {submitting ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </div>
          </form>
        )
      }

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <label className="relative block w-full xl:max-w-md">
            <span className="sr-only">Search posts</span>
            <span className="absolute inset-y-0 left-4 flex items-center">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setVisibleCount(6)
              }}
              placeholder="Search stories, authors, and topics"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category)
                  setVisibleCount(6)
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategory === category
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-slate-500" role="status">Loading stories...</p>
      ) : error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700" role="alert">{error}</p>
      ) : visibleBlogs.length > 0 ? (
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {visibleBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((current) => current + 3)}
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-xl font-semibold text-slate-900">No stories match your search.</h3>
          <p className="mt-2 text-slate-600">Try a different keyword or switch to another category.</p>
        </div>
      )}
    </div>
  )
}
export default BlogsPage
