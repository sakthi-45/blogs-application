import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { categories } from '../data/blogData'
import { createBlog } from '../data/blogsApi'

function CreateBlogPage() {
  const navigate = useNavigate()
  const [accountRole, setAccountRole] = useState('')
  const [roleLoading, setRoleLoading] = useState(true)
  const [roleError, setRoleError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    description: '',
    content: '',
    author: '',
  })

  useEffect(() => {
    let active = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (active) {
          setAccountRole('')
          setRoleLoading(false)
        }
        return
      }

      setRoleLoading(true)
      setRoleError('')

      try {
        const profile = await getDoc(doc(db, 'users', user.uid))
        if (active && auth.currentUser?.uid === user.uid) {
          setAccountRole(profile.exists() ? profile.data().role : '')
        }
      } catch {
        if (active) setRoleError('Unable to verify your account role. Please try again.')
      } finally {
        if (active) setRoleLoading(false)
      }
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (accountRole !== 'Author') return

    setSubmitting(true)
    setError('')

    try {
      await createBlog(formData)
      console.log(formData)
      navigate('/blogs')
    } catch (requestError) {
      setError(requestError.message)
      setSubmitting(false)
    }
  }

  if (roleLoading) {
    return <p className="py-10 text-center text-sm text-slate-500" role="status">Checking your account...</p>
  }

  if (roleError) {
    return <p className="py-10 text-center text-sm text-red-700" role="alert">{roleError}</p>
  }

  if (accountRole !== 'Author') {
    return (
      <section className="mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Blog writing is for Authors</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {accountRole === 'Reader'
            ? 'Your Reader account can browse published stories but cannot create posts.'
            : 'Sign in with an Author account to create a post.'}
        </p>
        {!auth.currentUser && (
          <Link to="/login" className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">
            Login
          </Link>
        )}
      </section>
    )
  }

  return (
    <div className="space-y-8 pb-10 pt-6 sm:pt-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Write with clarity</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl">Create Blog</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.04)]"
      >
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Blog title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="What are you writing about?"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
              >
                {categories.filter((category) => category !== 'All').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Short description</span>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="A brief summary that tells readers what this story is about."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Author name</span>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Blog content</span>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="12"
              required
              placeholder="Write your story here..."
              className="w-full resize-none rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
            />
          </label>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateBlogPage
