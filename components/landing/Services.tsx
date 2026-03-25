'use client'


const services = [
  {
    num: '01',
    title: 'Landing Pages',
    desc: 'High-converting single pages crafted to capture leads and drive sales — built fast, with purpose.',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'E-commerce Stores',
    desc: 'Shopify and custom storefronts built to sell. Product pages, carts, and checkouts that convert.',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Brand & Identity',
    desc: 'Logos, color systems, and visual language that make you instantly recognizable in your market.',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Web Applications',
    desc: 'Custom portals, dashboards, and SaaS products built with clean, scalable code that grows with you.',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'SEO & Performance',
    desc: 'Technical SEO audits, speed optimization, and Core Web Vitals improvements that drive organic traffic.',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Ongoing Support',
    desc: 'Monthly retainer plans for updates, new features, and keeping your site fast and secure year-round.',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
          <div>
            <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-4">What We Do</p>
            <h2
              className="font-[var(--font-display)] font-bold leading-[1.02] tracking-[-0.025em] text-[#F5F0E8]"
              style={{ fontSize: 'clamp(38px,5vw,58px)' }}
            >
              Everything your site<br />
              <span className="italic text-[#C9A84C]">needs to succeed.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[#F5F0E8] font-semibold text-[12px] uppercase tracking-[0.08em] border border-[rgba(245,240,232,0.18)] transition-all duration-200 hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.05)] hover:-translate-y-0.5 shrink-0 reveal reveal-d2"
          >
            Start a Project →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#252525' }}>
          {services.map((svc, i) => (
            <div
              key={svc.num}
              className={`group relative bg-[#181818] border border-[#252525] p-9 overflow-hidden transition-all duration-300 hover:border-[rgba(201,168,76,0.25)] hover:-translate-y-1 reveal reveal-d${(i % 3) + 1}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />

              {/* Big number */}
              <span
                className="absolute top-4 right-5 font-[var(--font-display)] font-bold leading-none pointer-events-none select-none transition-colors duration-300"
                style={{ fontSize: '80px', color: 'rgba(201,168,76,0.07)' }}
              >
                {svc.num}
              </span>

              <div className="w-10 h-10 border border-[rgba(201,168,76,0.25)] flex items-center justify-center text-[#C9A84C] mb-6">
                {svc.icon}
              </div>
              <h3 className="font-[var(--font-display)] font-bold text-[22px] text-[#F5F0E8] mb-3 tracking-tight">{svc.title}</h3>
              <p className="text-[15px] leading-[1.72] text-[#666]">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
