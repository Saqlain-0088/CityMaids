import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { leads as initial, Lead, LeadStatus } from '../../data/leads'

const statusCfg: Record<LeadStatus, { label: string; cls: string; dot: string }> = {
  new:       { label: 'New',       cls: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
  contacted: { label: 'Contacted', cls: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  converted: { label: 'Converted', cls: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
  lost:      { label: 'Lost',      cls: 'bg-red-100 text-red-700',     dot: 'bg-red-500' },
}

export default function AdminLeads() {
  const [list, setList] = useState(initial)
  const [filter, setFilter] = useState<LeadStatus | ''>('')
  const [selected, setSelected] = useState<Lead | null>(null)

  const filtered = filter ? list.filter(l => l.status === filter) : list

  const updateStatus = (id: number, status: LeadStatus) =>
    setList(l => l.map(x => x.id === id ? { ...x, status } : x))

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Leads & Inquiries</h1>
          <p className="text-slate-500 text-sm mt-0.5">{list.filter(l => l.status === 'new').length} new leads</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(['new', 'contacted', 'converted', 'lost'] as LeadStatus[]).map(s => (
            <div key={s} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${statusCfg[s].dot}`} />
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{statusCfg[s].label}</p>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{list.filter(l => l.status === s).length}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {([['', 'All Leads'], ['new', 'New'], ['contacted', 'Contacted'], ['converted', 'Converted'], ['lost', 'Lost']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === v ? 'bg-primary-600 text-white shadow-brand' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-primary-700'}`}>
              {l}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Name', 'Contact', 'Service Interest', 'Source', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">No leads found</td></tr>
                ) : filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-900">{lead.name}</p>
                      {lead.assignedTo && <p className="text-xs text-slate-400">Assigned to {lead.assignedTo}</p>}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-slate-700">{lead.email}</p>
                      <p className="text-xs text-slate-400">{lead.phone}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{lead.serviceInterest}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 text-xs">{lead.source}</td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">{lead.createdAt}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg[lead.status].cls}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg[lead.status].dot}`} />
                        {statusCfg[lead.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Button size="xs" variant="ghost" className="border border-slate-200" onClick={() => setSelected(lead)}>View</Button>
                        {lead.status === 'new' && (
                          <Button size="xs" variant="brand-outline" onClick={() => updateStatus(lead.id, 'contacted')}>Contact</Button>
                        )}
                        {lead.status === 'contacted' && (
                          <Button size="xs" onClick={() => updateStatus(lead.id, 'converted')}>Convert</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Lead Details" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{selected.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <p className="font-bold text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.email}</p>
              </div>
              <div className="ml-auto">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg[selected.status].cls}`}>{statusCfg[selected.status].label}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Phone', selected.phone],
                ['Service Interest', selected.serviceInterest],
                ['Source', selected.source],
                ['Submitted', selected.createdAt],
              ].map(([l, v]) => (
                <div key={l} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">{l}</p>
                  <p className="font-semibold text-slate-900">{v}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400 mb-1">Message</p>
              <p className="text-sm text-slate-700 leading-relaxed">{selected.message}</p>
            </div>
            <div className="flex gap-2">
              {selected.status === 'new' && <Button onClick={() => { updateStatus(selected.id, 'contacted'); setSelected(null) }}>Mark as Contacted</Button>}
              {selected.status === 'contacted' && <Button onClick={() => { updateStatus(selected.id, 'converted'); setSelected(null) }}>Mark as Converted</Button>}
              <Button variant="ghost" className="border border-slate-200" onClick={() => setSelected(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}

