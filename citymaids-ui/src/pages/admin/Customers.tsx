import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { customers as initial, Customer } from '../../data/customers'

const PAGE_SIZE = 8

export default function AdminCustomers() {
  const [list] = useState(initial)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Customer | null>(null)
  const [page, setPage] = useState(1)

  const filtered = list.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Customers</h1>
            <p className="text-slate-500 text-sm mt-0.5">{list.length} registered customers</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Customers', value: list.length, color: 'from-blue-500 to-blue-600' },
            { label: 'Active', value: list.filter(c => c.status === 'active').length, color: 'from-brand-500 to-brand-600' },
            { label: 'Total Revenue', value: `$${list.reduce((s, c) => s + c.totalSpent, 0).toLocaleString()}`, color: 'from-purple-500 to-purple-600' },
            { label: 'Avg Spend', value: `$${Math.round(list.reduce((s, c) => s + c.totalSpent, 0) / list.length)}`, color: 'from-orange-500 to-orange-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4">
          <div className="relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Customer', 'Contact', 'Total Bookings', 'Total Spent', 'Last Booking', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.length === 0 ? (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">No customers found</td></tr>
                ) : paginated.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">{c.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{c.name}</p>
                          <p className="text-xs text-slate-400">Since {c.joinedAt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-slate-700">{c.email}</p>
                      <p className="text-xs text-slate-400">{c.phone}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-1.5 max-w-16">
                          <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (c.totalBookings / 15) * 100)}%` }} />
                        </div>
                        <span className="font-semibold text-slate-900">{c.totalBookings}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-primary-600">${c.totalSpent.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{c.lastBooking}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`} />
                        {c.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <Button size="xs" variant="ghost" className="border border-slate-200" onClick={() => setSelected(c)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3.5 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-500">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-slate-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${p === page ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-white border border-transparent hover:border-slate-200'}`}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-slate-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Customer Details" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-brand">
                <span className="text-white font-bold text-xl">{selected.avatar}</span>
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.email}</p>
                <p className="text-sm text-slate-500">{selected.phone}</p>
              </div>
              <div className="ml-auto">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${selected.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {selected.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Total Bookings', selected.totalBookings.toString()],
                ['Total Spent', `$${selected.totalSpent.toLocaleString()}`],
                ['Member Since', selected.joinedAt],
                ['Last Booking', selected.lastBooking],
              ].map(([l, v]) => (
                <div key={l} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">{l}</p>
                  <p className="font-bold text-slate-900">{v}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs text-slate-400 mb-1">Address</p>
              <p className="font-medium text-slate-900 text-sm">{selected.address}</p>
            </div>
            <Button variant="ghost" className="border border-slate-200" onClick={() => setSelected(null)}>Close</Button>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}

