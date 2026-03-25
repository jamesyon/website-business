import type { Metadata } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import RevealObserver from '@/components/RevealObserver'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Forge Studio — Web Design & Development',
  description: 'Fast, conversion-focused websites for businesses that take growth seriously.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable} ${dmMono.variable}`}>
      <body className="font-[var(--font-body)] bg-[#0A0A0A] text-[#F5F0E8] antialiased overflow-x-hidden">
        <RevealObserver />
        {children}
      </body>
    </html>
  )
}
