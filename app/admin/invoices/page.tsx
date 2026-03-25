import { createClient } from '@/lib/supabase/server'

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('invoices')
    .select('*, client:clients(name, email)')
    .order('created_at', { ascending: false })

  const invoices = data ?? []

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount), 0)
  const totalOutstanding = invoices.filter(i => ['sent','overdue'].includes(i.status)).reduce((s, i) => s + Number(i.amount), 0)
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + Number(i.amount), 0)

  const statusColors: Record<string, string> = {
    draft: 'bg-[rgba(85,85,85,0.15)] text-[#555]',
    sent: 'bg-[rgba(124,154,232,0.15)] text-[#7C9AE8]',
    paid: 'bg-[rgba(76,175,154,0.15)] text-[#4CAF9A]',
    overdue: 'bg-[rgba(232,76,76,0.15)] text-[#E84C4C]',
    cancelled: 'bg-[rgba(85,85,85,0.1)] text-[#444]',
  }

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-[32px] text-[#F5F0E8] tracking-tight">Invoices</h1>
          <p className="text-[#555] text-sm mt-1">{invoices.length} total</p>
        </div>
        <a
          href="/admin/invoices/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[11px] uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.3)]"
        >
          + New Invoice
        </a>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Paid', value: `$${totalPaid.toLocaleString()}`, color: '#4CAF9A' },
          { label: 'Outstanding', value: `$${totalOutstanding.toLocaleString()}`, color: '#7C9AE8' },
          { label: 'Overdue', value: `$${totalOverdue.toLocaleString()}`, color: '#E84C4C' },
        ].map((s) => (
          <div key={s.label} className="bg-[#141414] border border-[#1e1e1e] p-5">
            <p className="font-[var(--font-mono)] text-[10px] tracking-[0.12em] uppercase text-[#444] mb-2">{s.label}</p>
            <p className="font-[var(--font-display)] font-bold text-[30px] leading-none" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#141414] border border-[#1e1e1e]">
        <div
          className="grid text-[10px] font-[var(--font-mono)] tracking-[0.1em] uppercase text-[#444] px-6 py-3 border-b border-[#1e1e1e]"
          style={{ gridTemplateColumns: '140px 1fr 1fr 100px 120px 120px 100px' }}
        >
          <span>Invoice #</span><span>Client</span><span>Description</span><span>Amount</span><span>Status</span><span>Due</span><span></span>
        </div>

        {invoices.length === 0 ? (
          <p className="px-6 py-12 text-[#444] text-sm text-center font-[var(--font-mono)]">No invoices yet</p>
        ) : invoices.map((inv) => (
          <div
            key={inv.id}
            className="grid items-center px-6 py-4 border-b border-[#181818] hover:bg-[#181818] transition-colors text-sm"
            style={{ gridTemplateColumns: '140px 1fr 1fr 100px 120px 120px 100px' }}
          >
            <span className="font-[var(--font-mono)] text-[#C9A84C] text-[12px]">{inv.invoice_number}</span>
            <span className="text-[#F5F0E8] font-medium">{(inv.client as Record<string, string>)?.name ?? '—'}</span>
            <span className="text-[#666] truncate">{inv.description ?? '—'}</span>
            <span className="text-[#F5F0E8] font-semibold">${Number(inv.amount).toLocaleString()}</span>
            <span>
              <span className={`font-[var(--font-mono)] text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${statusColors[inv.status]}`}>
                {inv.status}
              </span>
            </span>
            <span className="text-[#444] font-[var(--font-mono)] text-[11px]">
              {new Date(inv.due_date).toLocaleDateString()}
            </span>
            <span>
              <a href={`/admin/invoices/${inv.id}`} className="font-[var(--font-mono)] text-[10px] tracking-[0.1em] uppercase text-[#C9A84C] hover:text-[#E8CB7A] transition-colors">
                View →
              </a>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
