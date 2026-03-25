import { createClient } from '@/lib/supabase/server'

async function getStats() {
  const supabase = await createClient()
  const [contacts, clients, invoices] = await Promise.all([
    supabase.from('contact_submissions').select('id, status, created_at'),
    supabase.from('clients').select('id, status'),
    supabase.from('invoices').select('id, status, amount'),
  ])
  return {
    contacts: contacts.data ?? [],
    clients: clients.data ?? [],
    invoices: invoices.data ?? [],
  }
}

export default async function Dashboard() {
  const { contacts, clients, invoices } = await getStats()

  const newContacts = contacts.filter(c => c.status === 'new').length
  const activeClients = clients.filter(c => c.status === 'active').length
  const outstanding = invoices
    .filter(i => i.status === 'sent' || i.status === 'overdue')
    .reduce((sum, i) => sum + Number(i.amount), 0)
  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + Number(i.amount), 0)

  const stats = [
    { label: 'New Inquiries', value: newContacts, sub: `${contacts.length} total`, color: '#C9A84C' },
    { label: 'Active Clients', value: activeClients, sub: `${clients.length} total`, color: '#4CAF9A' },
    { label: 'Outstanding', value: `$${outstanding.toLocaleString()}`, sub: 'awaiting payment', color: '#E88C4C' },
    { label: 'Revenue (paid)', value: `$${totalRevenue.toLocaleString()}`, sub: 'all time', color: '#7C9AE8' },
  ]

  const recentContacts = await (async () => {
    const supabase = await createClient()
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)
    return data ?? []
  })()

  const recentInvoices = await (async () => {
    const supabase = await createClient()
    const { data } = await supabase
      .from('invoices')
      .select('*, client:clients(name)')
      .order('created_at', { ascending: false })
      .limit(5)
    return data ?? []
  })()

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="font-[var(--font-display)] font-bold text-[32px] text-[#F5F0E8] tracking-tight">Dashboard</h1>
        <p className="text-[#555] text-sm mt-1 font-[var(--font-mono)] tracking-wide">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#141414] border border-[#1e1e1e] p-6">
            <p className="font-[var(--font-mono)] text-[10px] tracking-[0.12em] uppercase text-[#444] mb-3">{stat.label}</p>
            <p className="font-[var(--font-display)] font-bold text-[36px] leading-none" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[#444] text-xs mt-2 font-[var(--font-mono)]">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-[#141414] border border-[#1e1e1e]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
            <h2 className="font-[var(--font-display)] font-bold text-lg text-[#F5F0E8]">Recent Inquiries</h2>
            <a href="/admin/contacts" className="font-[var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#C9A84C] hover:text-[#E8CB7A] transition-colors">View All →</a>
          </div>
          <div className="divide-y divide-[#1a1a1a]">
            {recentContacts.length === 0 ? (
              <p className="px-6 py-8 text-[#444] text-sm text-center font-[var(--font-mono)]">No inquiries yet</p>
            ) : recentContacts.map((c: Record<string, string>) => (
              <div key={c.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#181818] transition-colors">
                <div>
                  <p className="text-[#F5F0E8] text-sm font-medium">{c.name}</p>
                  <p className="text-[#444] text-xs font-[var(--font-mono)] mt-0.5">{c.service}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-[#141414] border border-[#1e1e1e]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
            <h2 className="font-[var(--font-display)] font-bold text-lg text-[#F5F0E8]">Recent Invoices</h2>
            <a href="/admin/invoices" className="font-[var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#C9A84C] hover:text-[#E8CB7A] transition-colors">View All →</a>
          </div>
          <div className="divide-y divide-[#1a1a1a]">
            {recentInvoices.length === 0 ? (
              <p className="px-6 py-8 text-[#444] text-sm text-center font-[var(--font-mono)]">No invoices yet</p>
            ) : recentInvoices.map((inv: Record<string, unknown>) => (
              <div key={inv.id as string} className="px-6 py-4 flex items-center justify-between hover:bg-[#181818] transition-colors">
                <div>
                  <p className="text-[#F5F0E8] text-sm font-medium">{inv.invoice_number as string}</p>
                  <p className="text-[#444] text-xs font-[var(--font-mono)] mt-0.5">
                    {(inv.client as Record<string, string>)?.name ?? '—'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#F5F0E8] text-sm font-semibold">${Number(inv.amount).toLocaleString()}</p>
                  <InvoiceStatusBadge status={inv.status as string} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: 'bg-[rgba(201,168,76,0.15)] text-[#C9A84C]',
    read: 'bg-[rgba(124,154,232,0.15)] text-[#7C9AE8]',
    replied: 'bg-[rgba(76,175,154,0.15)] text-[#4CAF9A]',
    archived: 'bg-[rgba(85,85,85,0.15)] text-[#555]',
  }
  return (
    <span className={`font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${map[status] ?? map.read}`}>
      {status}
    </span>
  )
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    draft: 'text-[#555]',
    sent: 'text-[#7C9AE8]',
    paid: 'text-[#4CAF9A]',
    overdue: 'text-[#E84C4C]',
    cancelled: 'text-[#444]',
  }
  return (
    <span className={`font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase mt-0.5 block ${map[status] ?? ''}`}>
      {status}
    </span>
  )
}
