import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { Input } from '../components/ui/Input'

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState<'customer' | 'admin' | 'staff'>('customer')
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form, v: string) => { setForm(f => ({ ...f, [k]: v })); if (touched[k]) validate({ ...form, [k]: v }) }
  const touch = (k: string) => setTouched(t => ({ ...t, [k]: true }))

  const validate = (data: typeof form) => {
    const e: typeof errors = {}
    if (!data.email) e.email = 'Email is required'
    else if (!validateEmail(data.email)) e.email = 'Enter a valid email address'
    if (!data.password) e.password = 'Password is required'
    else if (data.password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleLogin = () => {
    setTouched({ email: true, password: true })
    if (!validate(form)) return
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate(role === 'admin' ? '/admin' : role === 'staff' ? '/staff' : '/booking') }, 1000)
  }

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
          <h1 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Welcome back</h1>
          <p className="text-slate-500 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-7">
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Demo: Login as</p>
            <div className="grid grid-cols-3 gap-2">
              {(['customer', 'admin', 'staff'] as const).map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border-2 capitalize transition-all duration-200 ${role === r ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Input label="Email Address" type="email" placeholder="you@example.com" value={form.email} required error={touched.email ? errors.email : undefined} success={touched.email && !errors.email && !!form.email} onChange={e => set('email', e.target.value)} onBlur={() => { touch('email'); validate(form) }} />
            <Input label="Password" type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" value={form.password} required error={touched.password ? errors.password : undefined} success={touched.password && !errors.password && !!form.password} onChange={e => set('password', e.target.value)} onBlur={() => { touch('password'); validate(form) }} />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-primary-400" />Remember me</label>
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">Forgot password?</a>
            </div>
            <Button fullWidth size="lg" loading={loading} onClick={handleLogin}>Sign In</Button>
          </div>
          <p className="text-center text-sm text-slate-500 mt-5">Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Create one</Link></p>
        </div>
      </div>
    </div>
  )
}

