import { createClient } from '@/lib/supabase/server'
import type { ContactSubmission } from '@/types'

export default async function ContactsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  const contacts: ContactSubmission[] = data ?? []

  const statusColors: Record<string, string> = {
    new: 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C]',
    read: 'bg-[rgba(124,154,232,0.15)] text-[#7C9AE8]',
    replied: 'bg-[rgba(76,175,154,0.15)] text-[#4CAF9A]',
    archived: 'bg-[rgba(85,85,85,0.15)] text-[#555]',
  }

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="font-[var(--font-display)] font-bold text-[32px] text-[#F5F0E8] tracking-tight">Inquiries</h1>
        <p className="text-[#555] text-sm mt-1">{contacts.length} total submissions</p>
      </div>

      <div className="bg-[#141414] border border-[#1e1e1e]">
        <div className="grid text-[10px] font-[var(--font-mono)] tracking-[0.1em] uppercase text-[#444] px-6 py-3 border-b border-[#1e1e1e]"
          style={{ gridTemplateColumns: '1fr 1fr 1fr 120px 100px 120px' }}>
          <span>Name</span><span>Email</span><span>Service</span><span>Status</span><span>Date</span><span></span>
        </div>

        {contacts.length === 0 ? (
          <p className="px-6 py-12 text-[#444] text-sm text-center font-[var(--font-mono)]">No inquiries yet</p>
        ) : contacts.map((c) => (
          <div
            key={c.id}
            className="grid items-center px-6 py-4 border-b border-[#181818] hover:bg-[#181818] transition-colors text-sm"
            style={{ gridTemplateColumns: '1fr 1fr 1fr 120px 100px 120px' }}
          >
            <span className="text-[#F5F0E8] font-medium">{c.name}</span>
            <span className="text-[#666]">{c.email}</span>
            <span className="text-[#666]">{c.service}</span>
            <span>
              <span className={`font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${statusColors[c.status]}`}>
                {c.status}
              </span>
            </span>
            <span className="text-[#444] font-[var(--font-mono)] text-[11px]">
              {new Date(c.created_at).toLocaleDateString()}
            </span>
            <span>
              <a href={`/admin/contacts/${c.id}`} className="font-[var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#C9A84C] hover:text-[#E8CB7A] transition-colors">
                View →
              </a>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
