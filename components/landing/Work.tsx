'use client'

import type { Project } from '@/types'

interface WorkProps {
  projects: Project[]
}

export default function Work({ projects }: WorkProps) {
  const placeholders = [
    'https://placehold.co/800x600/141414/333?text=',
    'https://placehold.co/800x360/1a1a1a/444?text=',
    'https://placehold.co/800x360/131313/333?text=',
    'https://placehold.co/600x600/111/2a2a2a?text=',
    'https://placehold.co/600x600/181818/3a3a3a?text=',
    'https://placehold.co/600x600/161616/333?text=',
  ]

  const displayed = projects.slice(0, 6)

  return (
    <section id="work" className="py-32" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal">
          <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-4">Selected Work</p>
          <h2
            className="font-[var(--font-display)] font-bold leading-[1.02] tracking-[-0.025em] text-[#F5F0E8]"
            style={{ fontSize: 'clamp(38px,5vw,58px)' }}
          >
            Built with<br />
            <span className="italic text-[#C9A84C]">purpose & precision.</span>
          </h2>
        </div>

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {displayed[0] && (
            <WorkCard project={displayed[0]} imgUrl={displayed[0].image_url || placeholders[0] + encodeURIComponent(displayed[0].title)} className="reveal" aspectClass="aspect-[4/3]" />
          )}
          <div className="grid grid-rows-2 gap-3 h-full">
            {displayed[1] && (
              <WorkCard project={displayed[1]} imgUrl={displayed[1].image_url || placeholders[1] + encodeURIComponent(displayed[1].title)} className="reveal reveal-d1" style={{ minHeight: '180px' }} />
            )}
            {displayed[2] && (
              <WorkCard project={displayed[2]} imgUrl={displayed[2].image_url || placeholders[2] + encodeURIComponent(displayed[2].title)} className="reveal reveal-d2" style={{ minHeight: '180px' }} />
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
          {displayed.slice(3, 6).map((project, i) => (
            <WorkCard
              key={project.id}
              project={project}
              imgUrl={project.image_url || placeholders[3 + i] + encodeURIComponent(project.title)}
              className={`reveal reveal-d${i + 1}`}
              aspectClass="aspect-square"
            />
          ))}
        </div>

        <div className="text-center reveal">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[#F5F0E8] font-semibold text-[12px] uppercase tracking-[0.08em] border border-[rgba(245,240,232,0.18)] transition-all duration-200 hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.05)] hover:-translate-y-0.5"
          >
            See All Projects →
          </a>
        </div>
      </div>
    </section>
  )
}

function WorkCard({
  project,
  imgUrl,
  className = '',
  aspectClass = '',
  style,
}: {
  project: Project
  imgUrl: string
  className?: string
  aspectClass?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={`group relative overflow-hidden cursor-pointer ${aspectClass} ${className}`} style={style}>
      <img
        src={imgUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.2)' }} />
      {/* Always-visible info overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)' }}
      >
        <p className="font-[var(--font-mono)] text-[10.5px] tracking-[0.14em] uppercase text-[#C9A84C] mb-1.5">{project.category}</p>
        <p className="font-[var(--font-display)] font-bold text-xl text-[#F5F0E8]">{project.title}</p>
        {project.tags.length > 0 && (
          <p className="text-sm text-[#999] mt-1">{project.tags.join(' · ')}</p>
        )}
      </div>
    </div>
  )
}
