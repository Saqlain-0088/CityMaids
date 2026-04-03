import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Button from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'
import { services } from '../data/services'

const STEPS = ['Service', 'Schedule', 'Details', 'Review']
const TIMES = ['08:00 AM','09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM']

interface Form { serviceId: string; date: string; time: string; name: string; email: string; phone: string; address: string; notes: string }
interface Errors { name?: string; email?: string; phone?: string; address?: string }

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
const validatePhone = (p: string) => /^[\+]?[\d\s\-\(\)]{10,15}$/.test(p.trim())

export default function Booking() {
  const [params] = useSearchParams()
  const pre = params.get('service') || ''
  const [step, setStep] = useState(pre ? 1 : 0)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [form, setForm] = useState<Form>({ serviceId: pre, date: '', time: '', name: '', email: '', phone: '', address: '', notes: '' })

  const set = (k: keyof Form, v: string) => { setForm(f => ({ ...f, [k]: v })); if (touched[k]) validate({ ...form, [k]: v }) }
  const touch = (k: string) => setTouched(t => ({ ...t, [k]: true }))

  const validate = (data: Form): boolean => {
    const e: Errors = {}
    if (!data.name.trim()) e.name = 'Full name is required'
    if (!data.email.trim()) e.email = 'Email is required'
    else if (!validateEmail(data.email)) e.email = 'Enter a valid email address'
    if (!data.phone.trim()) e.phone = 'Phone number is required'
    else if (!validatePhone(data.phone)) e.phone = 'Enter a valid phone number'
    if (!data.address.trim()) e.address = 'Service address is required'
    else if (data.address.trim().length < 10) e.address = 'Please enter a complete address'
    setErrors(e); return Object.keys(e).length === 0
  }

  const canNext = () => {
    if (step === 0) return !!form.serviceId
    if (step === 1) return !!form.date && !!form.time
    if (step === 2) return !errors.name && !errors.email && !errors.phone && !errors.address && !!form.name && !!form.email && !!form.phone && !!form.address
    return true
  }

  const handleNext = () => {
    if (step === 2) { setTouched({ name: true, email: true, phone: true, address: true }); if (!validate(form)) return }
    setStep(s => s + 1)
  }

  const svc = services.find(s => s.id === Number(form.serviceId))
  const today = new Date().toISOString().split('T')[0]

  if (done) return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Booking Confirmed!</h2>
          <p className="text-slate-500 mb-8">Confirmation sent to <strong className="text-slate-900">{form.email}</strong></p>
          <div className="bg-slate-50 rounded-2xl p-5 text-left mb-8 space-y-3 text-sm border border-slate-100">
            {[['Service', svc?.name], ['Date', form.date], ['Time', form.time], ['Address', form.address]].map(([l, v]) => (
              <div key={l} className="flex justify-between gap-4"><span className="text-slate-400">{l}</span><span className="font-semibold text-slate-900 text-right">{v}</span></div>
            ))}
            <div className="flex justify-between pt-2 border-t border-slate-200"><span className="font-bold text-slate-900">Total</span><span className="font-extrabold text-primary-600 text-lg">${svc?.price}</span></div>
          </div>
          <Link to="/"><Button size="lg" fullWidth>Back to Home</Button></Link>
        </div>
      </div>
    </MainLayout>
  )

  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-primary-950 to-primary-900 py-14">
        <div className="container-xl text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Book a Cleaning</h1>
          <p className="text-primary-300">Complete the steps below to schedule your service.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Steps */}
        <div className="flex items-center mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i < step ? 'bg-teal-500 text-white' : i === step ? 'bg-primary-600 text-white shadow-brand' : 'bg-slate-100 text-slate-400'}`}>
                  {i < step ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 font-medium hidden sm:block ${i === step ? 'text-primary-600' : i < step ? 'text-teal-500' : 'text-slate-400'}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${i < step ? 'bg-teal-400' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-6 sm:p-8">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Choose a Service</h2>
              <div className="space-y-3">
                {services.map(s => (
                  <label key={s.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${form.serviceId === String(s.id) ? 'border-primary-500 bg-primary-50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                    <input type="radio" name="service" value={s.id} checked={form.serviceId === String(s.id)} onChange={() => set('serviceId', String(s.id))} className="sr-only" />
                    <span className="text-2xl">{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900">{s.name}</p>
                      <p className="text-sm text-slate-500 truncate">{s.shortDescription}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-extrabold text-primary-600 text-lg">${s.price}</p>
                      <p className="text-xs text-slate-400">{s.duration}h</p>
                    </div>
                    {form.serviceId === String(s.id) && (
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Choose Date & Time</h2>
              <div className="space-y-6">
                <Input label="Preferred Date" type="date" value={form.date} min={today} onChange={e => set('date', e.target.value)} required />
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred Time <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TIMES.map(t => (
                      <button key={t} type="button" onClick={() => set('time', t)}
                        className={`py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${form.time === t ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your Details</h2>
              <div className="space-y-4">
                <Input label="Full Name" placeholder="John Smith" value={form.name} required error={touched.name ? errors.name : undefined} success={touched.name && !errors.name && !!form.name} onChange={e => set('name', e.target.value)} onBlur={() => { touch('name'); validate(form) }} />
                <Input label="Email Address" type="email" placeholder="john@example.com" value={form.email} required error={touched.email ? errors.email : undefined} success={touched.email && !errors.email && !!form.email} onChange={e => set('email', e.target.value)} onBlur={() => { touch('email'); validate(form) }} />
                <Input label="Phone Number" type="tel" placeholder="+1 555-0000" value={form.phone} required error={touched.phone ? errors.phone : undefined} success={touched.phone && !errors.phone && !!form.phone} onChange={e => set('phone', e.target.value)} onBlur={() => { touch('phone'); validate(form) }} hint="We'll send booking updates via WhatsApp" />
                <Textarea label="Service Address" placeholder="123 Main Street, New York, NY 10001" value={form.address} required rows={2} error={touched.address ? errors.address : undefined} success={touched.address && !errors.address && !!form.address} onChange={e => set('address', e.target.value)} onBlur={() => { touch('address'); validate(form) }} />
                <Textarea label="Special Instructions" placeholder="Any specific areas to focus on, access instructions, pets at home, etc." value={form.notes} rows={3} onChange={e => set('notes', e.target.value)} hint="Optional" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Review Your Booking</h2>
              <div className="space-y-4">
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 flex items-center gap-4">
                  <span className="text-4xl">{svc?.icon}</span>
                  <div className="flex-1"><p className="font-bold text-slate-900 text-lg">{svc?.name}</p><p className="text-sm text-slate-500">{svc?.duration} hours</p></div>
                  <p className="text-3xl font-extrabold text-primary-600">${svc?.price}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 space-y-3 text-sm border border-slate-100">
                  {[['Date', form.date], ['Time', form.time], ['Name', form.name], ['Email', form.email], ['Phone', form.phone], ['Address', form.address]].map(([l, v]) => (
                    <div key={l} className="flex justify-between gap-4"><span className="text-slate-400 flex-shrink-0">{l}</span><span className="font-semibold text-slate-900 text-right">{v}</span></div>
                  ))}
                </div>
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-2xl border border-primary-100">
                  <span className="font-bold text-slate-900">Total Amount</span>
                  <span className="text-2xl font-extrabold text-primary-600">${svc?.price}</span>
                </div>
                <p className="text-xs text-slate-400 text-center">By confirming, you agree to our Terms of Service and Cancellation Policy.</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            <Button variant="ghost" className="border border-slate-200" onClick={() => setStep(s => s - 1)} disabled={step === 0} size="lg">â† Back</Button>
            {step < STEPS.length - 1
              ? <Button onClick={handleNext} disabled={!canNext()} size="lg">Continue â†’</Button>
              : <Button onClick={() => setDone(true)} size="lg">Confirm Booking âœ“</Button>}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

