import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function StaffLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-dark-50">
      <header className="bg-white border-b border-dark-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <div>
              <p className="font-extrabold text-dark-900 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>CityMaids</p>
              <p className="text-xs text-dark-400">Staff Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
              <span className="text-brand-700 font-bold text-xs">MG</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-dark-900">Maria Garcia</p>
              <p className="text-xs text-dark-400">Staff Member</p>
            </div>
            <Link to="/login" className="text-sm text-red-500 hover:text-red-700 ml-2">Logout</Link>
          </div>
        </div>
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 flex gap-1 pb-2">
          <Link to="/staff" className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${pathname === '/staff' ? 'bg-brand-50 text-brand-700' : 'text-dark-600 hover:bg-dark-50'}`}>
            \uD83D\uDCCB My Jobs
          </Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">{children}</main>
    </div>
  )
}
