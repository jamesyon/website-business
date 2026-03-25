const items = [
  'Landing Pages', 'E-commerce', 'Web Apps', 'Branding', 'SEO',
  'UI / UX Design', 'Copywriting', 'Performance', 'Retainer Plans', 'Consulting',
]

export default function Marquee() {
  return (
    <div className="marquee-outer overflow-hidden border-y py-[18px]" style={{ borderColor: '#161616' }}>
      <div className="marquee-track whitespace-nowrap">
        {[0, 1].map((copy) => (
          <span key={copy} className="inline-flex items-center gap-6 pr-6 text-[#333] text-[11px] font-[var(--font-mono)] tracking-[0.15em] uppercase">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                {item}
                <span className="text-[#C9A84C]">◆</span>
              </span>
            ))}
            &nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  )
}
