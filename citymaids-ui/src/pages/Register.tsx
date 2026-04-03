import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { Input } from '../components/ui/Input'

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
const validatePhone = (p: string) => !p || /^[\+]?[\d\s\-\(\)]{10,15}$/.test(p.trim())

interface Form { name: string; email: string; phone: string; password: string; confirm: string }
interface Errors { name?: string; email?: string; phone?: string; password?: string; confirm?: string }

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Form>({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)

  const set = (k: keyof Form, v: string) => { setForm(f => ({ ...f, [k]: v })); if (touched[k]) validate({ ...form, [k]: v }) }
  const touch = (k: string) => setTouched(t => ({ ...t, [k]: true }))

  const validate = (data: Form): boolean => {
    const e: Errors = {}
    if (!data.name.trim()) e.name = 'Full name is required'
    if (!data.email) e.email = 'Email is required'
    else if (!validateEmail(data.email)) e.email = 'Enter a valid email address'
    if (data.phone && !validatePhone(data.phone)) e.phone = 'Enter a valid phone number'
    if (!data.password) e.password = 'Password is required'
    else if (data.password.length < 8) e.password = 'Password must be at least 8 characters'
    else if (!/(?=.*[A-Z])(?=.*\d)/.test(data.password)) e.password = 'Must include uppercase letter and number'
    if (!data.confirm) e.confirm = 'Please confirm your password'
    else if (data.confirm !== data.password) e.confirm = 'Passwords do not match'
    setErrors(e); return Object.keys(e).length === 0
  }

  const strength = !form.password ? 0 : form.password.length < 6 ? 1 : form.password.length < 8 ? 2 : /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])/.test(form.password) ? 4 : 3
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-primary-500']

  return (
    <div className="min-h-screen bg-mesh bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-brand">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <div className="text-left">
              <span className="block text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>City<span className="text-primary-600">Maids</span></span>
              <span className="text-xs text-slate-400 tracking-wider">CLEANING SERVICES</span>
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Create your account</h1>
          <p className="text-slate-500 mt-1">Join thousands of happy customers</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-7 space-y-4">
          <Input label="Full Name" placeholder="John Smith" value={form.name} required error={touched.name ? errors.name : undefined} success={touched.name && !errors.name && !!form.name} onChange={e => set('name', e.target.value)} onBlur={() => { touch('name'); validate(form) }} />
          <Input label="Email Address" type="email" placeholder="you@example.com" value={form.email} required error={touched.email ? errors.email : undefined} success={touched.email && !errors.email && !!form.email} onChange={e => set('email', e.target.value)} onBlur={() => { touch('email'); validate(form) }} />
          <Input label="Phone Number" placeholder="+1 555-0000" value={form.phone} error={touched.phone ? errors.phone : undefined} success={touched.phone && !errors.phone && !!form.phone} onChange={e => set('phone', e.target.value)} onBlur={() => { touch('phone'); validate(form) }} hint="Optional \u2014 for WhatsApp updates" />
          <div>
            <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password} required error={touched.password ? errors.password : undefined} onChange={e => set('password', e.target.value)} onBlur={() => { touch('password'); validate(form) }} />
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">{[1,2,3,4].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-dark-200'}`} />)}</div>
                <p className={`text-xs font-medium ${strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-yellow-500' : strength === 3 ? 'text-blue-500' : 'text-primary-600'}`}>{strengthLabel[strength]} password</p>
              </div>
            )}
          </div>
          <Input label="Confirm Password" type="password" placeholder="Repeat password" value={form.confirm} required error={touched.confirm ? errors.confirm : undefined} success={touched.confirm && !errors.confirm && !!form.confirm} onChange={e => set('confirm', e.target.value)} onBlur={() => { touch('confirm'); validate(form) }} />
          <Button fullWidth size="lg" loading={loading} onClick={() => { setTouched({ name: true, email: true, phone: true, password: true, confirm: true }); if (!validate(form)) return; setLoading(true); setTimeout(() => { setLoading(false); navigate('/booking') }, 1200) }}>Create Account</Button>
          <p className="text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

