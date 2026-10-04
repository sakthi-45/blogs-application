import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'
import { useUserRole } from './useUserRole'

function Hero() {
  const { role } = useUserRole()

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:px-8 lg:px-12 lg:py-16">
      <div className="absolute -right-16 top-10 h-52 w-52 rounded-full bg-indigo-100 blur-3xl" />
      <div className="absolute left-10 top-20 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
      <div className="absolute bottom-0 right-20 h-44 w-44 rounded-full bg-sky-100 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Thoughtful publishing
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.07em] text-slate-900 sm:text-5xl lg:text-6xl">
            Ideas Worth Reading. <span className="text-indigo-600">Stories Worth Sharing.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            Discover thoughtful stories, practical insights, and inspiring perspectives from writers who have something meaningful to say.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/blogs"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Explore Blogs <ArrowIcon />
            </Link>
            {role === 'Author' && (
              <Link
                to="/create-blog"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                Start Writing
              </Link>
            )}
          </div>
        </div>

        <div className="relative hidden min-h-[420px] lg:block">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-[2rem] bg-slate-900 shadow-[0_30px_70px_rgba(15,23,42,0.18)]" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-[2rem] border border-indigo-200 bg-white/80 backdrop-blur-sm shadow-xl" />
          <div className="absolute bottom-2 left-0 h-48 w-48 rounded-[1.5rem] bg-white/80 border border-slate-200 shadow-xl backdrop-blur-sm" />

          <div className="absolute left-20 top-20 w-52 rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Featured</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">Designing with clarity</h3>
            <p className="mt-2 text-sm text-slate-600">Practical frameworks for product thinking.</p>
          </div>

          <div className="absolute bottom-10 right-8 rounded-2xl bg-slate-900 p-4 text-white shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">Writers</p>
            <p className="mt-2 text-3xl font-semibold">2.4k</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
