import { Link } from 'react-router-dom'

const links = {
  Services: [['Standard Cleaning', '/services/standard-cleaning'], ['Deep Cleaning', '/services/deep-cleaning'], ['Move In/Out', '/services/move-in-out-cleaning'], ['Office Cleaning', '/services/office-cleaning'], ['Carpet Cleaning', '/services/carpet-cleaning']],
  Company:  [['About Us', '/about'], ['Pricing', '/pricing'], ['Blog', '/blog'], ['Careers', '/careers'], ['FAQ', '/faq']],
  Support:  [['Contact Us', '/contact'], ['Service Areas', '/service-areas'], ['Booking', '/booking'], ['Privacy Policy', '#'], ['Terms of Service', '#']],
}

export default function Footer() {
  return (
    <footer className="bg-dark-950 text-dark-400">
      {/* Top CTA strip */}
      <div className="bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="container-xl py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Ready for a spotless home?</p>
            <p className="text-brand-100 text-sm mt-1">Book your first cleaning and get 15% off with code FIRST15</p>
          </div>
          <Link to="/booking" className="btn btn-white btn-lg flex-shrink-0">
            Book Now — From $79
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <span className="text-xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>City<span className="text-brand-400">Maids</span></span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">Professional home cleaning services you can trust. Serving New York City and surrounding areas since 2020.</p>
            <div className="space-y-2.5 text-sm">
              {[['📞', '+1 (555) 000-1234'], ['✉️', 'hello@citymaids.com'], ['📍', '123 Clean St, New York, NY 10001']].map(([icon, val]) => (
                <div key={val} className="flex items-center gap-2.5"><span>{icon}</span><span>{val}</span></div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(([label, href]) => (
                  <li key={label}><Link to={href} className="text-sm hover:text-brand-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dark-500">
          <p>© {new Date().getFullYear()} CityMaids. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Cookies'].map(l => <a key={l} href="#" className="hover:text-dark-300 transition-colors">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
