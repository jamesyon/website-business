'use client'


const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: '30 minutes to understand your goals, audience, and what success looks like. No pressure, just clarity.',
  },
  {
    num: '02',
    title: 'Strategy & Design',
    desc: 'We map structure, craft the visual direction, and share designs for your approval before writing a single line of code.',
  },
  {
    num: '03',
    title: 'Build & Refine',
    desc: 'Fast development with daily updates. Two rounds of revisions included — no nickel-and-diming on changes.',
  },
  {
    num: '04',
    title: 'Launch & Support',
    desc: 'We handle deployment, run a final QA pass, and stay on call for 30 days post-launch. You\'re never left alone.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[380px_1fr] gap-20 items-start">

          <div className="reveal lg:sticky top-24">
            <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-4">How It Works</p>
            <h2
              className="font-[var(--font-display)] font-bold leading-[1.02] tracking-[-0.025em] text-[#F5F0E8] mb-6"
              style={{ fontSize: 'clamp(38px,5vw,56px)' }}
            >
              Simple.<br />
              <span className="italic text-[#C9A84C]">Fast. Proven.</span>
            </h2>
            <p className="text-[16px] leading-[1.75] text-[#666] mb-8">
              We've refined our process across 120+ projects to eliminate back-and-forth and get you live faster than you'd expect.
            </p>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#C9A84C,transparent)' }} />
          </div>

          <div>
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`grid gap-5 py-10 reveal reveal-d${i + 1} ${i < steps.length - 1 ? 'border-b border-[#1a1a1a]' : ''}`}
                style={{ gridTemplateColumns: '52px 1fr' }}
              >
                <div className="w-[52px] h-[52px] border border-[rgba(201,168,76,0.2)] bg-[#141414] flex items-center justify-center flex-shrink-0">
                  <span className="font-[var(--font-mono)] text-[#C9A84C] text-[13px]">{step.num}</span>
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] font-bold text-[24px] text-[#F5F0E8] mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-[15px] leading-[1.72] text-[#666]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
