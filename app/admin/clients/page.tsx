import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/types'

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  const clients: Client[] = data ?? []

  const statusColors: Record<string, string> = {
    active: 'bg-[rgba(76,175,154,0.15)] text-[#4CAF9A]',
    completed: 'bg-[rgba(124,154,232,0.15)] text-[#7C9AE8]',
    paused: 'bg-[rgba(232,140,76,0.15)] text-[#E88C4C]',
    prospect: 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C]',
  }

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-[32px] text-[#F5F0E8] tracking-tight">Clients</h1>
          <p className="text-[#555] text-sm mt-1">{clients.length} total</p>
        </div>
        <a
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[11px] uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.3)]"
        >
          + New Client
        </a>
      </div>

      <div className="bg-[#141414] border border-[#1e1e1e]">
        <div
          className="grid text-[10px] font-[var(--font-mono)] tracking-[0.1em] uppercase text-[#444] px-6 py-3 border-b border-[#1e1e1e]"
          style={{ gridTemplateColumns: '1fr 1fr 1fr 120px 120px' }}
        >
          <span>Name</span><span>Company</span><span>Email</span><span>Status</span><span></span>
        </div>

        {clients.length === 0 ? (
          <p className="px-6 py-12 text-[#444] text-sm text-center font-[var(--font-mono)]">No clients yet</p>
        ) : clients.map((c) => (
          <div
            key={c.id}
            className="grid items-center px-6 py-4 border-b border-[#181818] hover:bg-[#181818] transition-colors text-sm"
            style={{ gridTemplateColumns: '1fr 1fr 1fr 120px 120px' }}
          >
            <span className="text-[#F5F0E8] font-medium">{c.name}</span>
            <span className="text-[#666]">{c.company ?? '—'}</span>
            <span className="text-[#666]">{c.email}</span>
            <span>
              <span className={`font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${statusColors[c.status]}`}>
                {c.status}
              </span>
            </span>
            <span>
              <a href={`/admin/clients/${c.id}`} className="font-[var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#C9A84C] hover:text-[#E8CB7A] transition-colors">
                View →
              </a>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
