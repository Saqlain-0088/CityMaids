import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { StatusBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { Input, Textarea } from '../../components/ui/Input'
import { services as initial, Service } from '../../data/services'

const empty: Partial<Service> = { name: '', shortDescription: '', description: '', price: 0, duration: 2, icon: '🧹', isActive: true }

export default function AdminServices() {
  const [list, setList] = useState(initial)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editing, setEditing] = useState<Partial<Service>>(empty)
  const [isEdit, setIsEdit] = useState(false)
  const [toDelete, setToDelete] = useState<Service | null>(null)

  const openCreate = () => { setEditing(empty); setIsEdit(false); setModal(true) }
  const openEdit = (s: Service) => { setEditing({ ...s }); setIsEdit(true); setModal(true) }

  const save = () => {
    if (isEdit) {
      setList(l => l.map(s => s.id === editing.id ? { ...s, ...editing } as Service : s))
    } else {
      setList(l => [...l, {
        ...empty, ...editing, id: Date.now(),
        slug: (editing.name || '').toLowerCase().replace(/\s+/g, '-'),
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
        features: [], isActive: true
      } as Service])
    }
    setModal(false)
  }

  const confirmDelete = (s: Service) => { setToDelete(s); setDeleteModal(true) }
  const doDelete = () => { if (toDelete) setList(l => l.filter(s => s.id !== toDelete.id)); setDeleteModal(false); setToDelete(null) }

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Services</h1>
            <p className="text-slate-500 text-sm mt-0.5">{list.filter(s => s.isActive).length} active · {list.length} total</p>
          </div>
          <Button onClick={openCreate}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Service
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map(s => (
            <div key={s.id} className={`bg-white rounded-2xl border shadow-soft overflow-hidden hover:shadow-medium transition-shadow ${s.isActive ? 'border-slate-100' : 'border-slate-100 opacity-70'}`}>
              <div className="relative h-36 overflow-hidden">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="text-2xl">{s.icon}</span>
                  {s.isPopular && (
                    <span className="bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <StatusBadge status={s.isActive ? 'active' : 'inactive'} />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-slate-900">{s.name}</h3>
                  <p className="text-xl font-extrabold text-brand-600">${s.price}</p>
                </div>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{s.shortDescription}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {s.duration}h
                  </span>
                  <span>{s.features.length} features</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="border border-slate-200 flex-1" onClick={() => openEdit(s)}>Edit</Button>
                  <Button
                    size="sm"
                    variant={s.isActive ? 'ghost' : 'brand-outline'}
                    className={`flex-1 ${s.isActive ? 'border border-slate-200' : ''}`}
                    onClick={() => setList(l => l.map(x => x.id === s.id ? { ...x, isActive: !x.isActive } : x))}
                  >
                    {s.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => confirmDelete(s)}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={isEdit ? 'Edit Service' : 'Add New Service'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Service Name" required value={editing.name || ''} onChange={e => setEditing(s => ({ ...s, name: e.target.value }))} />
            <Input label="Icon (emoji)" value={editing.icon || ''} onChange={e => setEditing(s => ({ ...s, icon: e.target.value }))} />
          </div>
          <Input label="Short Description" value={editing.shortDescription || ''} onChange={e => setEditing(s => ({ ...s, shortDescription: e.target.value }))} />
          <Textarea label="Full Description" value={editing.description || ''} onChange={e => setEditing(s => ({ ...s, description: e.target.value }))} rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price ($)" type="number" required value={editing.price || ''} onChange={e => setEditing(s => ({ ...s, price: Number(e.target.value) }))} />
            <Input label="Duration (hours)" type="number" value={editing.duration || ''} onChange={e => setEditing(s => ({ ...s, duration: Number(e.target.value) }))} />
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={save} disabled={!editing.name || !editing.price}>{isEdit ? 'Save Changes' : 'Create Service'}</Button>
            <Button variant="ghost" className="border border-slate-200" onClick={() => setModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Service" size="sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="text-sm text-slate-700">Are you sure you want to delete <strong>{toDelete?.name}</strong>? This action cannot be undone.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="danger" onClick={doDelete}>Delete Service</Button>
            <Button variant="ghost" className="border border-slate-200" onClick={() => setDeleteModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
