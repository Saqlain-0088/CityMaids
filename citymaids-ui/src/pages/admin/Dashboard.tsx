import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { StatusBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { bookings } from '../../data/bookings'
import { services } from '../../data/services'
import { staffMembers } from '../../data/staff'
import { customers } from '../../data/customers'
import { leads } from '../../data/leads'
import { reviews } from '../../data/reviews'

const today = new Date().toISOString().split('T')[0]
const todayBookings = bookings.filter(b => b.scheduledAt.startsWith(today))
const totalRevenue = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)

const stats = [
  {
    label: 'Total Bookings',
    value: bookings.length,
    change: '+12%',
    trend: 'up',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    color: 'from-blue-500 to-blue-600'
  },
  {
    label: "Today's Bookings",
    value: todayBookings.length,
    change: '+3',
    trend: 'up',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    color: 'from-purple-500 to-purple-600'
  },
  {
    label: 'Active Jobs',
    value: bookings.filter(b => b.status === 'in_progress').length,
    change: '2 ongoing',
    trend: 'neutral',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    color: 'from-orange-500 to-orange-600'
  },
  {
    label: 'Revenue',
    value: `$${totalRevenue.toLocaleString()}`,
    change: '+18%',
    trend: 'up',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    color: 'from-brand-500 to-brand-600'
  },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <Button variant="ghost" size="sm" className="border border-slate-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-md`}>
                  {s.icon}
                </div>
                {s.trend !== 'neutral' && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {s.change}
                  </span>
                )}
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.value}</p>
              <p className="text-sm text-slate-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between p-5 border-b border-slate-50">
              <div>
                <h2 className="font-bold text-slate-900">Recent Bookings</h2>
                <p className="text-xs text-slate-400 mt-0.5">{bookings.length} total bookings</p>
              </div>
              <Link to="/admin/bookings">
                <Button size="sm" variant="ghost" className="border border-slate-200">View All</Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Customer', 'Service', 'Date', 'Status'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.slice(0, 5).map(b => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-medium text-slate-900">{b.customerName}</p>
                        <p className="text-xs text-slate-400">{b.customerPhone}</p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-slate-700">{b.serviceName}</p>
                        <p className="text-xs text-slate-400">${b.price}</p>
                      </td>
                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{b.scheduledAt}</td>
                      <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
              <h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { href: '/admin/bookings', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>, label: 'New Booking', sub: 'Create booking' },
                  { href: '/admin/staff', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>, label: 'Add Staff', sub: `${staffMembers.filter(s => s.status === 'active').length} active` },
                  { href: '/admin/services', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>, label: 'Add Service', sub: `${services.length} services` },
                  { href: '/admin/leads', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: 'View Leads', sub: `${leads.filter(l => l.status === 'new').length} new` },
                ].map(item => (
                  <Link key={item.href} to={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 hover:border-brand-200 group">
                    <div className="text-slate-400 group-hover:text-primary-600 transition-colors">{item.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 text-sm">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.sub}</p>
                    </div>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
              <h2 className="font-bold text-slate-900 mb-4">Overview</h2>
              <div className="space-y-3">
                {[
                  { label: 'Total Customers', value: customers.length, icon: '\u00F0\u0178\u2018\u00A5', color: 'text-blue-600' },
                  { label: 'Active Staff', value: staffMembers.filter(s => s.status === 'active').length, icon: '\u2705', color: 'text-primary-600' },
                  { label: 'Pending Reviews', value: reviews.filter(r => r.status === 'pending').length, icon: '\u2B50', color: 'text-yellow-600' },
                  { label: 'New Leads', value: leads.filter(l => l.status === 'new').length, icon: '\uD83D\uDCC5\u00A7', color: 'text-purple-600' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-lg ${item.color}`}>{item.icon}</span>
                      <p className="text-sm text-slate-600">{item.label}</p>
                    </div>
                    <p className="text-lg font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between p-5 border-b border-slate-50">
              <h2 className="font-bold text-slate-900">Top Customers</h2>
              <Link to="/admin/customers" className="text-sm text-primary-600 hover:text-primary-700 font-medium">View all</Link>
            </div>
            <div className="divide-y divide-slate-50">
              {customers.sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5).map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{c.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.totalBookings} bookings</p>
                    </div>
                  </div>
                  <p className="font-bold text-primary-600">${c.totalSpent}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between p-5 border-b border-slate-50">
              <h2 className="font-bold text-slate-900">Recent Activity</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { text: 'New booking from Sarah Johnson', time: '5 min ago', icon: '\uD83D\uDCC5\u2039', color: 'bg-blue-100 text-blue-600' },
                { text: 'Carlos Rivera completed a job', time: '23 min ago', icon: '\u2705', color: 'bg-primary-100 text-primary-600' },
                { text: 'New lead: Patricia Moore', time: '1 hour ago', icon: '\uD83D\uDCC5\u00A7', color: 'bg-purple-100 text-purple-600' },
                { text: 'Review submitted by Emily Chen', time: '2 hours ago', icon: '\u2B50', color: 'bg-yellow-100 text-yellow-600' },
                { text: 'Service updated: Deep Cleaning', time: '3 hours ago', icon: '\uD83E\uDDB9', color: 'bg-slate-100 text-slate-600' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm">{a.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">{a.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

