'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid credentials')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6"
      style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%), #0A0A0A' }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-[var(--font-display)] font-bold text-[28px] tracking-[-0.02em] text-[#F5F0E8]">
            FORGE<span className="text-[#C9A84C]">.</span>
          </p>
          <p className="font-[var(--font-mono)] text-[10px] tracking-[0.14em] uppercase text-[#444] mt-2">Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="font-[var(--font-mono)] text-[9.5px] tracking-[0.14em] uppercase text-[#C9A84C] block mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@forgestudio.co"
              className="w-full bg-[#141414] border border-[#1e1e1e] text-[#F5F0E8] px-4 py-3.5 text-[15px] outline-none transition-all focus:border-[rgba(201,168,76,0.4)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.07)] placeholder:text-[#333]"
            />
          </div>
          <div>
            <label className="font-[var(--font-mono)] text-[9.5px] tracking-[0.14em] uppercase text-[#C9A84C] block mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#141414] border border-[#1e1e1e] text-[#F5F0E8] px-4 py-3.5 text-[15px] outline-none transition-all focus:border-[rgba(201,168,76,0.4)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.07)] placeholder:text-[#333]"
            />
          </div>

          {error && (
            <p className="font-[var(--font-mono)] text-[11px] text-red-400 tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A84C] text-[#0A0A0A] font-bold text-[12px] uppercase tracking-[0.08em] py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}
