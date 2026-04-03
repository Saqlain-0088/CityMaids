import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Button from '../../components/ui/Button'
import { reviews as initial, Review } from '../../data/reviews'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const statusCfg: Record<Review['status'], { label: string; cls: string }> = {
  pending:  { label: 'Pending',  cls: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', cls: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-700' },
}

export default function AdminReviews() {
  const [list, setList] = useState(initial)
  const [filter, setFilter] = useState<Review['status'] | ''>('')

  const filtered = filter ? list.filter(r => r.status === filter) : list

  const update = (id: number, status: Review['status']) =>
    setList(l => l.map(r => r.id === id ? { ...r, status } : r))

  const avgRating = (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1)

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Reviews</h1>
          <p className="text-slate-500 text-sm mt-0.5">{list.length} total reviews \u00B7 {avgRating}\u2605 average</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Reviews', value: list.length, color: 'from-blue-500 to-blue-600' },
            { label: 'Approved', value: list.filter(r => r.status === 'approved').length, color: 'from-brand-500 to-brand-600' },
            { label: 'Pending', value: list.filter(r => r.status === 'pending').length, color: 'from-yellow-500 to-orange-500' },
            { label: 'Avg Rating', value: `${avgRating}\u2605`, color: 'from-purple-500 to-purple-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {([['', 'All'], ['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === v ? 'bg-primary-600 text-white shadow-brand' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-primary-700'}`}>
              {l}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">{r.customerAvatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-bold text-slate-900">{r.customerName}</p>
                      <span className="text-xs text-slate-400">\u00B7</span>
                      <p className="text-xs text-slate-500">{r.serviceName}</p>
                      <span className="text-xs text-slate-400">\u00B7</span>
                      <p className="text-xs text-slate-400">{r.date}</p>
                    </div>
                    <Stars rating={r.rating} />
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{r.comment}</p>
                    <p className="text-xs text-slate-400 mt-2">Staff: <span className="font-medium text-slate-600">{r.staffName}</span></p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg[r.status].cls}`}>{statusCfg[r.status].label}</span>
                  {r.status === 'pending' && (
                    <div className="flex gap-1.5">
                      <Button size="xs" variant="success" onClick={() => update(r.id, 'approved')}>Approve</Button>
                      <Button size="xs" variant="danger" onClick={() => update(r.id, 'rejected')}>Reject</Button>
                    </div>
                  )}
                  {r.status === 'approved' && (
                    <Button size="xs" variant="danger" onClick={() => update(r.id, 'rejected')}>Reject</Button>
                  )}
                  {r.status === 'rejected' && (
                    <Button size="xs" variant="brand-outline" onClick={() => update(r.id, 'approved')}>Approve</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

