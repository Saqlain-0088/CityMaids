import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { StatusBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { staffMembers as initial, StaffMember } from '../../data/staff'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating > 0 ? rating.toFixed(1) : 'New'}</span>
    </div>
  )
}

export default function AdminStaff() {
  const [list, setList] = useState(initial)
  const [modal, setModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [selected, setSelected] = useState<StaffMember | null>(null)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const filtered = list.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  )

  const addStaff = () => {
    const m: StaffMember = {
      id: Date.now(), name: form.name, email: form.email, phone: form.phone,
      role: 'staff', status: 'active', jobsCompleted: 0, rating: 0,
      joinedAt: new Date().toISOString().split('T')[0],
      avatar: form.name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    setList(l => [...l, m])
    setModal(false)
    setForm({ name: '', email: '', phone: '' })
  }

  const toggleStatus = (id: number) => {
    setList(l => l.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))
  }

  const activeCount = list.filter(s => s.status === 'active').length

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Staff Management</h1>
            <p className="text-slate-500 text-sm mt-0.5">{activeCount} active · {list.length - activeCount} inactive</p>
          </div>
          <Button onClick={() => setModal(true)}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Staff
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Staff', value: list.length, color: 'from-blue-500 to-blue-600' },
            { label: 'Active', value: activeCount, color: 'from-brand-500 to-brand-600' },
            { label: 'Total Jobs', value: list.reduce((s, m) => s + m.jobsCompleted, 0), color: 'from-purple-500 to-purple-600' },
            { label: 'Avg Rating', value: (list.filter(s => s.rating > 0).reduce((s, m) => s + m.rating, 0) / list.filter(s => s.rating > 0).length).toFixed(1) + '★', color: 'from-yellow-500 to-orange-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <span className="text-white font-bold text-sm">{typeof s.value === 'number' ? s.value : s.value.toString()[0]}</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-brand">
                    <span className="text-white font-bold text-sm">{s.avatar}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-400">{s.email}</p>
                  </div>
                </div>
                <StatusBadge status={s.status} />
              </div>

              <div className="mb-4">
                <StarRating rating={s.rating} />
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                  <p className="text-lg font-extrabold text-slate-900">{s.jobsCompleted}</p>
                  <p className="text-xs text-slate-400">Jobs</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                  <p className="text-lg font-extrabold text-slate-900">{s.rating > 0 ? s.rating : '—'}</p>
                  <p className="text-xs text-slate-400">Rating</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                  <p className="text-xs font-bold text-slate-900">{new Date(s.joinedAt).getFullYear()}</p>
                  <p className="text-xs text-slate-400">Joined</p>
                </div>
              </div>

              <div className="text-xs text-slate-500 mb-4">
                <span className="font-medium text-slate-700">{s.phone}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="border border-slate-200 flex-1" onClick={() => { setSelected(s); setViewModal(true) }}>View</Button>
                <Button
                  size="sm"
                  variant={s.status === 'active' ? 'danger' : 'brand-outline'}
                  className="flex-1"
                  onClick={() => toggleStatus(s.id)}
                >
                  {s.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Staff Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Staff Member">
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Maria Garcia" required value={form.name} onChange={e => set('name', e.target.value)} />
          <Input label="Email" type="email" placeholder="maria@citymaids.com" required value={form.email} onChange={e => set('email', e.target.value)} />
          <Input label="Phone" placeholder="+1 555-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
          <div className="flex gap-2 pt-2">
            <Button onClick={addStaff} disabled={!form.name || !form.email}>Add Staff</Button>
            <Button variant="ghost" className="border border-slate-200" onClick={() => setModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* View Staff Modal */}
      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Staff Details" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-brand">
                <span className="text-white font-bold text-xl">{selected.avatar}</span>
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.email}</p>
                <div className="mt-1"><StarRating rating={selected.rating} /></div>
              </div>
              <div className="ml-auto"><StatusBadge status={selected.status} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Phone', selected.phone],
                ['Joined', selected.joinedAt],
                ['Jobs Completed', selected.jobsCompleted.toString()],
                ['Rating', selected.rating > 0 ? `${selected.rating}/5` : 'No ratings yet'],
              ].map(([l, v]) => (
                <div key={l} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">{l}</p>
                  <p className="font-semibold text-slate-900">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant={selected.status === 'active' ? 'danger' : 'brand-outline'}
                onClick={() => { toggleStatus(selected.id); setViewModal(false) }}
              >
                {selected.status === 'active' ? 'Deactivate' : 'Activate'}
              </Button>
              <Button variant="ghost" className="border border-slate-200" onClick={() => setViewModal(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  )
}
