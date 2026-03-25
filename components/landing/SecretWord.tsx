'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SecretWord({ children, className, style }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const clicks = useRef(0)
  const router = useRouter()

  function handleClick() {
    clicks.current += 1
    if (clicks.current >= 5) {
      router.push('/admin/login')
    }
  }

  return (
    <span
      className={className}
      style={style}
      onClick={handleClick}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}
