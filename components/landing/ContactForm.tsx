'use client'

import { useState } from 'react'

const services = [
  'Landing Page',
  'E-commerce Store',
  'Brand & Identity',
  'Web Application',
  'SEO & Performance',
  'Ongoing Support',
  'Something Else',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', website: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }
      setStatus('success')
      setForm({ name: '', email: '', website: '', service: '', message: '' })
    } catch (err: unknown) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const inputClass = "w-full bg-[#141414] border border-[#1e1e1e] text-[#F5F0E8] px-[18px] py-[14px] font-[var(--font-body)] text-[15px] outline-none transition-all duration-200 focus:border-[rgba(201,168,76,0.4)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.07)] placeholder:text-[#444]"

  return (
    <section id="contact" className="py-32" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_520px] gap-20">

          {/* Left */}
          <div className="reveal">
            <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-4">Get In Touch</p>
            <h2
              className="font-[var(--font-display)] font-bold leading-[1.02] tracking-[-0.025em] text-[#F5F0E8] mb-6"
              style={{ fontSize: 'clamp(38px,5vw,58px)' }}
            >
              Tell us about<br />
              <span className="italic text-[#C9A84C]">your project.</span>
            </h2>
            <p className="text-[16px] leading-[1.75] text-[#666] mb-12 max-w-sm">
              Every great site starts with a conversation. No pressure, no commitment — just a chat about what you need.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#222] flex items-center justify-center text-[#C9A84C] flex-shrink-0 mt-0.5">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-mono)] text-[9.5px] tracking-[0.12em] uppercase text-[#444] mb-1">Email</p>
                  <p className="text-[#F5F0E8] text-[15px]">hello@forgestudio.co</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#222] flex items-center justify-center text-[#C9A84C] flex-shrink-0 mt-0.5">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-mono)] text-[9.5px] tracking-[0.12em] uppercase text-[#444] mb-1">Response Time</p>
                  <p className="text-[#F5F0E8] text-[15px]">Within 4 hours, weekdays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-d2">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 border border-[rgba(201,168,76,0.2)] bg-[#141414]">
                <div className="w-14 h-14 border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-[#C9A84C] mb-6">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-[var(--font-display)] font-bold text-2xl text-[#F5F0E8] mb-3">Message Sent</h3>
                <p className="text-[#666] text-[15px] mb-8">We'll be in touch within 4 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-[var(--font-mono)] text-[11px] tracking-[0.1em] uppercase text-[#C9A84C] hover:text-[#E8CB7A] transition-colors"
                >
                  Send Another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-[var(--font-mono)] text-[9.5px] tracking-[0.14em] uppercase text-[#C9A84C] block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-[var(--font-mono)] text-[9.5px] tracking-[0.14em] uppercase text-[#C9A84C] block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-[var(--font-mono)] text-[9.5px] tracking-[0.14em] uppercase text-[#C9A84C] block mb-2">Website (if any)</label>
                  <input
                    type="url"
                    placeholder="https://yoursite.com"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-[var(--font-mono)] text-[9.5px] tracking-[0.14em] uppercase text-[#C9A84C] block mb-2">What do you need?</label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={inputClass}
                    style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23555' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  >
                    <option value="" disabled style={{ background: '#141414' }}>Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s} style={{ background: '#141414' }}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-[var(--font-mono)] text-[9.5px] tracking-[0.14em] uppercase text-[#C9A84C] block mb-2">Tell us more</label>
                  <textarea
                    required
                    placeholder="What are you building? What's your timeline and budget?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass}
                    style={{ resize: 'vertical', minHeight: '130px' }}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm font-[var(--font-mono)]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[13px] uppercase tracking-[0.08em] py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.35)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
