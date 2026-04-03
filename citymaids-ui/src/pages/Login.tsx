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
  const [showPassword, setShowPassword] = useState(false)

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

  const EyeIcon = () => (
    <button type="button" onClick={() => setShowPassword(v => !v)} className="text-slate-400 hover:text-slate-600 transition-colors" tabIndex={-1}>
      {showPassword ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-blue">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="text-left">
              <span className="block text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                City<span className="text-primary-600">Maids</span>
              </span>
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
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              required
              error={touched.email ? errors.email : undefined}
              success={touched.email && !errors.email && !!form.email}
              onChange={e => set('email', e.target.value)}
              onBlur={() => { touch('email'); validate(form) }}
            />

            {/* Password field with eye toggle */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  onBlur={() => { touch('password'); validate(form) }}
                  className={`w-full px-4 py-3 pr-11 rounded-2xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white placeholder:text-slate-400 ${
                    touched.password && errors.password
                      ? 'border-red-400 focus:ring-red-400 bg-red-50/30'
                      : touched.password && !errors.password && form.password
                      ? 'border-teal-400 focus:ring-teal-400'
                      : 'border-slate-200 hover:border-slate-300 focus:ring-primary-500 focus:border-primary-500'
                  }`}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <EyeIcon />
                </div>
              </div>
              {touched.password && errors.password && (
                <p className="flex items-center gap-1 text-xs text-red-600">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-400" />
                Remember me
              </label>
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">Forgot password?</a>
            </div>

            <Button fullWidth size="lg" loading={loading} onClick={handleLogin}>Sign In</Button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

