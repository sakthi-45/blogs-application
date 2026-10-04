const features = [
  {
    title: 'Write Freely',
    description: 'Share ideas in a space designed for thoughtful writing, reflection, and storytelling.',
  },
  {
    title: 'Discover Ideas',
    description: 'Find practical insights, fresh perspectives, and meaningful knowledge from a growing community.',
  },
  {
    title: 'Connect Through Stories',
    description: 'Turn experiences into useful lessons and build genuine connections through shared ideas.',
  },
]

function AboutPage() {
  return (
    <div className="space-y-10 pb-10 pt-6 sm:pt-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.04)] sm:p-8 lg:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Our mission</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl">A Space for Ideas</h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
          InkSpace is a modern publishing platform created for people who believe every idea has a story behind it. Whether you're sharing technical knowledge, personal experiences, career lessons, or creative thoughts, InkSpace gives your ideas a place to be discovered.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-semibold text-indigo-600">
              {feature.title.charAt(0)}
            </div>
            <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default AboutPage
