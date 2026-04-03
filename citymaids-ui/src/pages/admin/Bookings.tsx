import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { StatusBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { Input, Select } from '../../components/ui/Input'
import { bookings as initial, Booking, BookingStatus } from '../../data/bookings'
import { staffMembers } from '../../data/staff'

const nextStatus: Record<BookingStatus, BookingStatus | null> = {
  pending: 'confirmed', confirmed: 'assigned', assigned: 'in_progress', in_progress: 'completed', completed: null
}

const statusFilters = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

const PAGE_SIZE = 10

export default function AdminBookings() {
  const [list, setList] = useState(initial)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Booking | null>(null)
  const [assignModal, setAssignModal] = useState(false)
  const [staffId, setStaffId] = useState('')
  const [page, setPage] = useState(1)

  const filtered = list.filter(b => {
    const matchStatus = !statusFilter || b.status === statusFilter
    const matchSearch = !search || b.customerName.toLowerCase().includes(search.toLowerCase()) || b.serviceName.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const updateStatus = (id: number, status: BookingStatus) => {
    setList(l => l.map(b => b.id === id ? { ...b, status } : b))
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : null)
  }

  const assignStaff = () => {
    if (!selected || !staffId) return
    const staff = staffMembers.find(s => s.id === Number(staffId))
    setList(l => l.map(b => b.id === selected.id ? { ...b, staffName: staff?.name, status: 'assigned' } : b))
    setSelected(s => s ? { ...s, staffName: staff?.name, status: 'assigned' } : null)
    setAssignModal(false)
    setStaffId('')
  }

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Bookings</h1>
            <p className="text-slate-500 text-sm mt-0.5">{filtered.length} bookings found</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                placeholder="Search by customer or service..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="w-full sm:w-44">
              <Select
                options={statusFilters}
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
              />
            </div>
            <Input type="date" className="w-full sm:w-44" />
          </div>
        </div>

        {/* Status summary pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All', value: '', count: list.length },
            { label: 'Pending', value: 'pending', count: list.filter(b => b.status === 'pending').length },
            { label: 'Confirmed', value: 'confirmed', count: list.filter(b => b.status === 'confirmed').length },
            { label: 'Assigned', value: 'assigned', count: list.filter(b => b.status === 'assigned').length },
            { label: 'In Progress', value: 'in_progress', count: list.filter(b => b.status === 'in_progress').length },
            { label: 'Completed', value: 'completed', count: list.filter(b => b.status === 'completed').length },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => { setStatusFilter(f.value); setPage(1) }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${statusFilter === f.value ? 'bg-primary-600 text-white shadow-brand' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-primary-700'}`}
            >
              {f.label}
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${statusFilter === f.value ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{f.count}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['#', 'Customer', 'Service', 'Date & Time', 'Staff', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginated.length === 0 ? (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-slate-400 text-sm">No bookings found</td></tr>
                ) : paginated.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3.5 text-slate-400 font-mono text-xs">#{b.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-900">{b.customerName}</p>
                      <p className="text-xs text-slate-400">{b.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-slate-700 font-medium">{b.serviceName}</p>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{b.scheduledAt}</td>
                    <td className="px-4 py-3.5">
                      {b.staffName
                        ? <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-primary-700 font-bold text-xs">{b.staffName.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <span className="text-slate-700 text-xs">{b.staffName}</span>
                          </div>
                        : <span className="text-slate-300 text-xs">Unassigned</span>
                      }
                    </td>
                    <td className="px-4 py-3.5 font-bold text-primary-600">${b.price}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Button size="xs" variant="ghost" className="border border-slate-200" onClick={() => setSelected(b)}>View</Button>
                        {b.status === 'confirmed' && (
                          <Button size="xs" variant="brand-outline" onClick={() => { setSelected(b); setAssignModal(true) }}>Assign</Button>
                        )}
                        {nextStatus[b.status] && b.status !== 'confirmed' && (
                          <Button size="xs" onClick={() => updateStatus(b.id, nextStatus[b.status]!)}>
                            Ã¢â€ â€™ {nextStatus[b.status]?.replace('_', ' ')}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3.5 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-500">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}Ã¢â‚¬â€œ{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-slate-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${p === page ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200'}`}
                >{p}</button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-slate-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Modal isOpen={!!selected && !assignModal} onClose={() => setSelected(null)} title="Booking Details" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{selected.customerName.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div>
                <p className="font-bold text-slate-900">{selected.customerName}</p>
                <p className="text-sm text-slate-500">{selected.customerEmail}</p>
              </div>
              <div className="ml-auto"><StatusBadge status={selected.status} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Phone', selected.customerPhone],
                ['Service', selected.serviceName],
                ['Price', `$${selected.price}`],
                ['Scheduled', selected.scheduledAt],
                ['Staff', selected.staffName || 'Not assigned'],
                ['Booked On', selected.createdAt],
              ].map(([l, v]) => (
                <div key={l} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-slate-400 text-xs mb-1">{l}</p>
                  <p className="font-semibold text-slate-900">{v}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">Address</p>
              <p className="font-medium text-slate-900 text-sm">{selected.address}</p>
            </div>
            {selected.notes && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                <p className="text-amber-600 text-xs font-semibold mb-1">Customer Notes</p>
                <p className="text-slate-700 text-sm">{selected.notes}</p>
              </div>
            )}
            <div className="flex gap-2 pt-1">
              {selected.status === 'confirmed' && (
                <Button onClick={() => setAssignModal(true)}>Assign Staff</Button>
              )}
              {nextStatus[selected.status] && selected.status !== 'confirmed' && (
                <Button onClick={() => updateStatus(selected.id, nextStatus[selected.status]!)}>
                  Move to {nextStatus[selected.status]?.replace('_', ' ')}
                </Button>
              )}
              <Button variant="ghost" className="border border-slate-200" onClick={() => setSelected(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Assign Modal */}
      <Modal isOpen={assignModal} onClose={() => setAssignModal(false)} title="Assign Staff Member">
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Select a staff member to assign to this booking.</p>
          <div className="space-y-2">
            {staffMembers.filter(s => s.status === 'active').map(s => (
              <label key={s.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${staffId === String(s.id) ? 'border-brand-400 bg-primary-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="staff" value={s.id} checked={staffId === String(s.id)} onChange={e => setStaffId(e.target.value)} className="accent-brand-600" />
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-bold text-xs">{s.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.jobsCompleted} jobs Ã‚Â· {s.rating}Ã¢Ëœâ€¦</p>
                </div>
              </label>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <Button onClick={assignStaff} disabled={!staffId}>Assign Staff</Button>
            <Button variant="ghost" className="border border-slate-200" onClick={() => setAssignModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}

