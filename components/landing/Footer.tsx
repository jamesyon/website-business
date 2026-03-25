export default function Footer() {
  return (
    <footer className="py-10" style={{ borderTop: '1px solid #141414' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <a href="#" className="font-[var(--font-display)] font-bold text-[24px] tracking-[-0.02em] text-[#F5F0E8]">
          FORGE<span className="text-[#C9A84C]">.</span>
        </a>
        <div className="flex items-center gap-8">
          {['Services', 'Work', 'Process', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#444] text-[13px] transition-colors duration-200 hover:text-[#F5F0E8]"
            >
              {item}
            </a>
          ))}
        </div>
        <p className="font-[var(--font-mono)] text-[11px] text-[#2a2a2a]">
          © {new Date().getFullYear()} Forge Studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
