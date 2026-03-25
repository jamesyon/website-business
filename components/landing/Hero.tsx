import SecretWord from './SecretWord'

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center pt-[68px] relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 100% 70% at 75% 10%, rgba(201,168,76,0.07) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 5% 95%, rgba(201,168,76,0.04) 0%, transparent 50%), #0A0A0A',
      }}
    >
      {/* Vertical rule */}
      <div
        className="absolute left-[9%] top-0 bottom-0 w-px pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.1) 30%, rgba(201,168,76,0.1) 70%, transparent)' }}
      />

      {/* Bg number */}
      <span
        className="absolute right-4 bottom-16 font-[var(--font-display)] font-bold leading-none pointer-events-none select-none hidden xl:block"
        style={{ fontSize: '220px', color: 'rgba(255,255,255,0.02)' }}
      >01</span>

      <div className="max-w-7xl mx-auto px-6 py-28 w-full">
        <div className="grid lg:grid-cols-[1fr_460px] gap-16 xl:gap-24 items-center">

          {/* Copy */}
          <div>
            <div className="hero-fade font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-8" style={{ animationDelay: '0.1s' }}>
              ◆ &nbsp;Web Design & Development Studio
            </div>

            <h1 className="font-[var(--font-display)] font-bold leading-[0.93] tracking-[-0.03em] mb-8">
              <div className="hero-line">
                <span className="hero-line-inner block text-[#F5F0E8]" style={{ fontSize: 'clamp(52px,7.5vw,94px)', animationDelay: '0.2s' }}>We design</span>
              </div>
              <div className="hero-line">
                <span className="hero-line-inner block text-[#F5F0E8] italic" style={{ fontSize: 'clamp(52px,7.5vw,94px)', animationDelay: '0.35s' }}>websites that</span>
              </div>
              <div className="hero-line">
                <span className="hero-line-inner" style={{ fontSize: 'clamp(52px,7.5vw,94px)', animationDelay: '0.5s' }}>
                  <span className="text-[#F5F0E8]">actually</span>
                  <SecretWord className="text-[#C9A84C]"> work.</SecretWord>
                </span>
              </div>
            </h1>

            <p
              className="hero-fade text-lg leading-[1.75] max-w-lg mb-12 text-[#777]"
              style={{ animationDelay: '0.7s' }}
            >
              Fast, conversion-focused websites for businesses that take growth seriously. From landing pages to full platforms — delivered in days, not months.
            </p>

            <div className="hero-fade flex flex-wrap gap-4 mb-16" style={{ animationDelay: '0.85s' }}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[12px] uppercase tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.35)] active:translate-y-0"
              >
                Get a Free Quote →
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent text-[#F5F0E8] font-semibold text-[12px] uppercase tracking-[0.08em] border border-[rgba(245,240,232,0.18)] transition-all duration-200 hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.05)] hover:-translate-y-0.5 active:translate-y-0"
              >
                View Our Work
              </a>
            </div>

            <div className="hero-fade flex items-center gap-10" style={{ animationDelay: '1s' }}>
              {[
                { value: '120+', label: 'Projects' },
                { value: '98%', label: 'Satisfied' },
                { value: '4d', label: 'Avg. Launch' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-10">
                  {i > 0 && <div className="w-px h-12" style={{ background: 'rgba(255,255,255,0.08)' }} />}
                  <div>
                    <p className="font-[var(--font-display)] font-bold text-[#F5F0E8] leading-none" style={{ fontSize: '42px' }}>{stat.value}</p>
                    <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mt-1.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card stack */}
          <div className="hidden lg:block relative h-[480px] hero-fade" style={{ animationDelay: '0.55s' }}>
            <div
              className="absolute top-8 right-0 w-[320px] overflow-hidden border border-[#222]"
              style={{ height: '230px', transform: 'rotate(3deg) translateY(16px)', background: '#111' }}
            >
              <img src="https://placehold.co/640x460/181818/333?text=Client+Work" alt="" className="w-full h-full object-cover opacity-50" />
            </div>
            <div
              className="absolute top-0 left-0 w-[340px] overflow-hidden border border-[#2a2a2a]"
              style={{ height: '260px', transform: 'rotate(-1.5deg)', background: '#141414', boxShadow: '0 32px 80px rgba(0,0,0,0.7)' }}
            >
              <img src="https://placehold.co/680x520/141414/2d2d2d?text=E-commerce+Rebrand" alt="Featured work" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)' }} />
              <div className="absolute inset-0" style={{ background: 'rgba(201,168,76,0.06)', mixBlendMode: 'multiply' }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-1">Latest Work</p>
                <p className="font-[var(--font-display)] font-bold text-xl text-[#F5F0E8]">E-commerce Rebrand</p>
              </div>
            </div>
            <div
              className="absolute bottom-6 right-0 px-5 py-3"
              style={{ background: '#C9A84C', transform: 'rotate(-1.5deg)', boxShadow: '0 10px 36px rgba(201,168,76,0.4)' }}
            >
              <p className="font-[var(--font-body)] font-bold text-sm text-[#0A0A0A] leading-none">Launched in 4 days ✓</p>
            </div>
            {/* Dot grid */}
            <div
              className="absolute -bottom-4 -left-4 pointer-events-none select-none"
              style={{
                width: '80px', height: '80px',
                backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.3) 1px, transparent 1px)',
                backgroundSize: '10px 10px',
              }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />
    </section>
  )
}
