import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Button from '../../components/ui/Button'
import { Input, Textarea } from '../../components/ui/Input'

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    companyName: 'CityMaids',
    email: 'contact@citymaids.com',
    phone: '+1 (555) 123-4567',
    whatsapp: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    about: 'CityMaids is a professional home cleaning service dedicated to providing top-quality cleaning solutions for homes and offices across New York City.',
  })

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Settings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your company information and preferences</p>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Company Information</h2>
            <p className="text-xs text-slate-500">Basic details about your business</p>
          </div>
          <Input label="Company Name" value={form.companyName} onChange={e => set('companyName', e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email Address" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
            <Input label="Phone Number" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <Input label="WhatsApp Number" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} hint="Used for customer inquiries" />
          <Input label="Business Address" value={form.address} onChange={e => set('address', e.target.value)} />
          <Textarea label="About Company" value={form.about} onChange={e => set('about', e.target.value)} rows={4} hint="Brief description of your company" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Business Hours</h2>
            <p className="text-xs text-slate-500">Set your operating hours</p>
          </div>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-slate-700">{day}</div>
                <div className="flex items-center gap-2 flex-1">
                  <input type="time" defaultValue="09:00" className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  <span className="text-slate-400">to</span>
                  <input type="time" defaultValue="18:00" className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={day !== 'Sunday'} className="accent-brand-600" />
                  <span className="text-xs text-slate-500">Open</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Notifications</h2>
            <p className="text-xs text-slate-500">Manage notification preferences</p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Email notifications for new bookings', desc: 'Receive an email when a new booking is created' },
              { label: 'SMS notifications for urgent updates', desc: 'Get text messages for time-sensitive updates' },
              { label: 'Daily summary reports', desc: 'Receive a daily email with booking and revenue summary' },
              { label: 'Customer review alerts', desc: 'Get notified when customers leave reviews' },
            ].map(item => (
              <label key={item.label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" defaultChecked className="mt-0.5 accent-brand-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={save}>Save Changes</Button>
          <Button variant="ghost" className="border border-slate-200">Cancel</Button>
        </div>
      </div>
    </AdminLayout>
  )
}
