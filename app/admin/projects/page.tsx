import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/types'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  const projects: Project[] = data ?? []

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-[32px] text-[#F5F0E8] tracking-tight">Projects</h1>
          <p className="text-[#555] text-sm mt-1">{projects.length} portfolio items</p>
        </div>
        <a
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[11px] uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.3)]"
        >
          + Add Project
        </a>
      </div>

      <div className="grid gap-3">
        {projects.length === 0 ? (
          <p className="text-[#444] text-sm text-center font-[var(--font-mono)] py-12">No projects yet</p>
        ) : projects.map((p) => (
          <div
            key={p.id}
            className="bg-[#141414] border border-[#1e1e1e] px-6 py-4 flex items-center justify-between hover:border-[rgba(201,168,76,0.2)] transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="font-[var(--font-mono)] text-[#333] text-[11px] w-6">{p.sort_order}</span>
              <div>
                <p className="text-[#F5F0E8] font-medium text-sm">{p.title}</p>
                <p className="text-[#444] text-xs font-[var(--font-mono)] mt-0.5">{p.category} · {p.tags.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {p.featured && (
                <span className="font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase px-2 py-1 bg-[rgba(201,168,76,0.1)] text-[#C9A84C]">Featured</span>
              )}
              <span className={`font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${p.published ? 'bg-[rgba(76,175,154,0.1)] text-[#4CAF9A]' : 'bg-[rgba(85,85,85,0.1)] text-[#555]'}`}>
                {p.published ? 'Live' : 'Draft'}
              </span>
              <a href={`/admin/projects/${p.id}`} className="font-[var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#C9A84C] hover:text-[#E8CB7A] transition-colors">
                Edit →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
