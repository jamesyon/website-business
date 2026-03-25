import { createClient } from '@/lib/supabase/server'
import type { Testimonial } from '@/types'

export default async function TestimonialsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })

  const testimonials: Testimonial[] = data ?? []

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-[32px] text-[#F5F0E8] tracking-tight">Testimonials</h1>
          <p className="text-[#555] text-sm mt-1">{testimonials.length} total</p>
        </div>
        <a
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[11px] uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5"
        >
          + Add Testimonial
        </a>
      </div>

      <div className="grid gap-3">
        {testimonials.length === 0 ? (
          <p className="text-[#444] text-sm text-center font-[var(--font-mono)] py-12">No testimonials yet</p>
        ) : testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-[#141414] border border-[#1e1e1e] px-6 py-5 flex items-start justify-between gap-4 hover:border-[rgba(201,168,76,0.2)] transition-all"
          >
            <div>
              <p className="text-[#F5F0E8] font-medium text-sm">{t.author_name}</p>
              <p className="text-[#444] text-xs font-[var(--font-mono)] mt-0.5">{t.author_role}, {t.company}</p>
              <p className="text-[#666] text-sm mt-3 leading-relaxed line-clamp-2">"{t.content}"</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {t.featured && (
                <span className="font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase px-2 py-1 bg-[rgba(201,168,76,0.1)] text-[#C9A84C]">Featured</span>
              )}
              <span className={`font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${t.published ? 'bg-[rgba(76,175,154,0.1)] text-[#4CAF9A]' : 'bg-[rgba(85,85,85,0.1)] text-[#555]'}`}>
                {t.published ? 'Live' : 'Draft'}
              </span>
              <a href={`/admin/testimonials/${t.id}`} className="font-[var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#C9A84C] hover:text-[#E8CB7A] transition-colors">
                Edit →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
