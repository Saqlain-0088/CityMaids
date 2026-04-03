import { useState, useEffect } from 'react'

export default function LeadPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const t = setTimeout(() => setShow(true), 8000)
    return () => clearTimeout(t)
  }, [dismissed])

  const dismiss = () => { setShow(false); setDismissed(true) }

  const submit = () => {
    if (!phone.trim()) return
    setSubmitted(true)
    setTimeout(dismiss, 2000)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 px-7 pt-7 pb-10 text-center relative">
          <button onClick={dismiss} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">{"\uD83C\uDF81"}</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Get 10% Off</h3>
          <p className="text-primary-100 text-sm">Your first cleaning service</p>
        </div>
        <div className="px-7 py-6 -mt-4 bg-white rounded-t-3xl relative">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="font-bold text-slate-900 mb-1">You're in!</p>
              <p className="text-slate-500 text-sm">We'll send your discount code shortly.</p>
            </div>
          ) : (
            <>
              <p className="text-slate-600 text-sm text-center mb-5">Enter your phone number and we'll send you a <span className="font-bold text-slate-900">$20 discount code</span> for your first booking.</p>
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="+1 555-0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
                <button
                  onClick={submit}
                  className="bg-primary-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-primary-700 transition-colors text-sm whitespace-nowrap"
                >
                  Claim
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center mt-3">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
