'use client'

import { useEffect, useRef } from 'react'
import type { Testimonial } from '@/types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="clients" className="py-32" style={{ background: '#080808' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal">
          <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-4">Client Feedback</p>
          <h2
            className="font-[var(--font-display)] font-bold leading-[1.02] tracking-[-0.025em] text-[#F5F0E8]"
            style={{ fontSize: 'clamp(38px,5vw,58px)' }}
          >
            Don't take<br />
            <span className="italic text-[#C9A84C]">our word for it.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`group bg-[#141414] border border-[#1e1e1e] p-9 transition-all duration-300 hover:border-[rgba(201,168,76,0.2)] hover:-translate-y-1 reveal reveal-d${i + 1}`}
            >
              <div className="font-[var(--font-display)] font-bold text-[40px] text-[#C9A84C] leading-none mb-4">"</div>
              <p className="text-[15px] leading-[1.75] text-[#888] mb-8">{t.content}</p>
              <div className="flex items-center gap-3 pt-6" style={{ borderTop: '1px solid #1e1e1e' }}>
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center flex-shrink-0 text-[#555] text-xs font-[var(--font-mono)]">
                    {t.author_name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div>
                  <p className="text-[#F5F0E8] text-sm font-semibold">{t.author_name}</p>
                  <p className="font-[var(--font-mono)] text-[9.5px] tracking-[0.12em] uppercase text-[#444]">
                    {t.author_role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
