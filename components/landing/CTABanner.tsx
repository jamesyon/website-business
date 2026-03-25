export default function CTABanner() {
  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 65%), #0A0A0A' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center font-[var(--font-display)] font-bold pointer-events-none select-none whitespace-nowrap"
        style={{ fontSize: 'clamp(80px,14vw,180px)', color: 'rgba(201,168,76,0.04)', letterSpacing: '-0.04em' }}
      >
        FORGE STUDIO
      </span>

      <div className="max-w-3xl mx-auto px-6 text-center relative reveal">
        <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-6 inline-block">
          Limited Spots Available
        </p>
        <h2
          className="font-[var(--font-display)] font-bold leading-[0.96] tracking-[-0.03em] text-[#F5F0E8] mb-8"
          style={{ fontSize: 'clamp(40px,6vw,72px)' }}
        >
          Ready to build<br />
          <span className="italic text-[#C9A84C]">something great?</span>
        </h2>
        <p className="text-lg leading-[1.7] text-[#666] max-w-xl mx-auto mb-10">
          We take on a limited number of new projects each month to ensure every client gets our full attention.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[13px] uppercase tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.35)] active:translate-y-0"
          style={{ padding: '15px 40px' }}
        >
          Book a Free Call →
        </a>
      </div>
    </section>
  )
}
