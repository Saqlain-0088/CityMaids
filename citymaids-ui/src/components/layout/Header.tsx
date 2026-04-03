import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const WA_D = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Pages where the hero is dark — header starts transparent
  const isDarkHero = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    fn() // run on mount
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  // Determine header style
  const isTransparent = isDarkHero && !scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isTransparent
        ? 'bg-transparent'
        : 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-slate-100/80'
    }`}>
      {/* Top info bar — only when scrolled (white mode) */}
      <div className={`bg-primary-700 transition-all duration-300 overflow-hidden ${scrolled || !isDarkHero ? 'hidden' : 'hidden lg:block'}`}>
        <div className="container-xl py-2 flex items-center justify-between text-xs text-primary-100">
          <div className="flex items-center gap-6">
            <a href="tel:+15550001234" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (555) 000-1234
            </a>
            <a href="mailto:hello@citymaids.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@citymaids.com
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Available 7 days a week — Book in 60 seconds
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-xl">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              isTransparent ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary-600 shadow-blue'
            } group-hover:scale-105`}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span className={`block text-xl font-extrabold transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                City<span className={isTransparent ? 'text-primary-300' : 'text-primary-600'}>Maids</span>
              </span>
              <span className={`block text-[10px] font-medium tracking-widest uppercase -mt-0.5 transition-colors duration-300 ${isTransparent ? 'text-white/60' : 'text-slate-400'}`}>
                Cleaning Services
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {nav.map(item => (
              <Link key={item.href} to={item.href}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isTransparent
                    ? isActive(item.href)
                      ? 'text-white bg-white/15'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    : isActive(item.href)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-600 hover:text-primary-700 hover:bg-primary-50'
                }`}>
                {item.label}
                {isActive(item.href) && (
                  <span className={`absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full transition-colors duration-300 ${isTransparent ? 'bg-white' : 'bg-primary-500'}`} />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <a href="https://wa.me/15550001234?text=Hi%2C%20I%20want%20to%20book%20a%20cleaning%20service"
              target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors px-3 py-2 rounded-lg ${
                isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-[#25D366] hover:text-[#20b858] hover:bg-green-50'
              }`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={WA_D} /></svg>
              WhatsApp
            </a>
            <Link to="/login"
              className={`text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${
                isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}>
              Sign In
            </Link>
            <Link to="/booking"
              className={`inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                isTransparent
                  ? 'bg-white text-primary-700 hover:bg-primary-50 shadow-lg'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-blue'
              }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
            aria-label="Menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-white border-t border-slate-100 px-4 py-4 space-y-1">
          {nav.map(item => (
            <Link key={item.href} to={item.href}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive(item.href) ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'}`}>
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-slate-100 mt-2">
            <a href="https://wa.me/15550001234?text=Hi%2C%20I%20want%20to%20book%20a%20cleaning%20service"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-xl text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={WA_D} /></svg>
              Chat on WhatsApp
            </a>
            <Link to="/booking" className="flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3 rounded-xl text-sm">
              Book Now
            </Link>
            <Link to="/login" className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
