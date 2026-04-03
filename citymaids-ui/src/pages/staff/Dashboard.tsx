import { useState } from 'react'
import StaffLayout from '../../components/layout/StaffLayout'
import { StatusBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { bookings as all, Booking, BookingStatus } from '../../data/bookings'

const myJobs = all.filter(b => b.staffName === 'Maria Garcia')
const transitions: Record<BookingStatus, BookingStatus | null> = { pending: null, confirmed: null, assigned: 'in_progress', in_progress: 'completed', completed: null }
const actionLabel: Partial<Record<BookingStatus, string>> = { assigned: 'Start Job', in_progress: 'Mark Complete' }

export default function StaffDashboard() {
  const [jobs, setJobs] = useState(myJobs)
  const [selected, setSelected] = useState<Booking | null>(null)

  const updateStatus = (id: number, status: BookingStatus) => {
    setJobs(l => l.map(j => j.id === id ? { ...j, status } : j))
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : null)
  }

  const active = jobs.filter(j => j.status !== 'completed')
  const completed = jobs.filter(j => j.status === 'completed')

  return (
    <StaffLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[{ label: 'Active Jobs', value: active.length, color: 'bg-primary-50 text-primary-700' }, { label: 'Completed', value: completed.length, color: 'bg-green-50 text-green-700' }, { label: 'Total', value: jobs.length, color: 'bg-slate-100 text-slate-700' }].map(s => (
            <div key={s.label} className={`${s.color} rounded-2xl p-4 text-center`}>
              <p className="text-2xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.value}</p>
              <p className="text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {active.length > 0 && (
          <div>
            <h2 className="font-bold text-slate-900 mb-3">Active Jobs</h2>
            <div className="space-y-3">
              {active.map(job => (
                <div key={job.id} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><p className="font-bold text-slate-900">{job.serviceName}</p><p className="text-sm text-slate-500">{job.customerName}</p></div>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="space-y-1.5 text-sm text-slate-500 mb-4">
                    <p>ðŸ“… {job.scheduledAt}</p>
                    <p>ðŸ“ {job.address}</p>
                    <p>ðŸ“ž {job.customerPhone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="border border-slate-200" onClick={() => setSelected(job)}>Details</Button>
                    {transitions[job.status] && <Button size="sm" onClick={() => updateStatus(job.id, transitions[job.status]!)}>{actionLabel[job.status]}</Button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {completed.length > 0 && (
          <div>
            <h2 className="font-bold text-slate-900 mb-3">Completed Jobs</h2>
            <div className="space-y-3">
              {completed.map(job => (
                <div key={job.id} className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 opacity-70">
                  <div className="flex items-center justify-between">
                    <div><p className="font-medium text-slate-900 text-sm">{job.serviceName}</p><p className="text-xs text-slate-400">{job.customerName} â€¢ {job.scheduledAt}</p></div>
                    <StatusBadge status={job.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {jobs.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">ðŸ“‹</p>
            <p className="font-medium">No jobs assigned yet</p>
            <p className="text-sm">Check back later for new assignments.</p>
          </div>
        )}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Job Details">
        {selected && (
          <div className="space-y-4">
            <div className="bg-primary-50 rounded-xl p-4 flex items-center justify-between">
              <p className="font-bold text-slate-900">{selected.serviceName}</p>
              <StatusBadge status={selected.status} />
            </div>
            <div className="space-y-3 text-sm">
              {[['Customer', selected.customerName], ['Phone', selected.customerPhone], ['Date & Time', selected.scheduledAt], ['Address', selected.address]].map(([l, v]) => (
                <div key={l}><p className="text-slate-400 text-xs">{l}</p><p className="font-semibold text-slate-900">{v}</p></div>
              ))}
              {selected.notes && <div><p className="text-slate-400 text-xs">Notes</p><p className="text-slate-600">{selected.notes}</p></div>}
            </div>
            <div className="flex gap-2 pt-2">
              {transitions[selected.status] && <Button onClick={() => updateStatus(selected.id, transitions[selected.status]!)}>{actionLabel[selected.status]}</Button>}
              <Button variant="ghost" className="border border-slate-200" onClick={() => setSelected(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </StaffLayout>
  )
}

