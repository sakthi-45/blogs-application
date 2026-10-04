import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'

function BlogCard({ blog }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(79,70,229,0.12)]">
      <div className="relative h-52 overflow-hidden" style={{ background: blog.gradient }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_40%)]" />
        <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {blog.category}
        </span>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
          <span>{blog.author}</span>
          <span>{blog.date}</span>
        </div>

        <div>
          <h3 className="text-xl font-semibold leading-tight text-slate-900 transition-colors duration-200 group-hover:text-indigo-600">
            {blog.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{blog.description}</p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm text-slate-500">{blog.readTime}</span>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600"
          >
            Read more <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
