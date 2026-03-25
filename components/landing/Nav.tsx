'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Triple-click on the logo dot navigates to hidden admin login
  // TODO: User will specify which word/element to use for the secret trigger
  function handleSecretClick() {
    const newCount = clickCount + 1
    setClickCount(newCount)

    if (clickTimer) clearTimeout(clickTimer)
    const timer = setTimeout(() => setClickCount(0), 600)
    setClickTimer(timer)

    if (newCount >= 3) {
      setClickCount(0)
      router.push('/admin/login')
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.88)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <Link href="/" className="font-[var(--font-display)] font-bold text-[26px] tracking-[-0.02em] text-[#F5F0E8] focus-visible:outline-none">
          FORGE
          {/* The period is the secret triple-click trigger */}
          <span
            className="text-[#C9A84C] cursor-default select-none"
            onClick={handleSecretClick}
            title=""
          >.</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Work', 'Process', 'Clients'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[12.5px] font-medium text-[#666] uppercase tracking-[0.06em] transition-colors duration-200 hover:text-[#F5F0E8] relative group"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 right-full h-px bg-[#C9A84C] transition-all duration-300 group-hover:right-0" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[11px] uppercase tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.35)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#C9A84C] focus-visible:outline-offset-2"
        >
          Start a Project →
        </a>
      </div>
    </nav>
  )
}
