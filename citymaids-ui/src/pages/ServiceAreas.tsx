import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

const areas = [
  { name: 'Manhattan', icon: 'ðŸ™ï¸', neighborhoods: ['Upper East Side', 'Upper West Side', 'Midtown', 'Chelsea', 'SoHo', 'Tribeca', 'Financial District', 'Harlem'] },
  { name: 'Brooklyn', icon: 'ðŸŒ‰', neighborhoods: ['Park Slope', 'Williamsburg', 'DUMBO', 'Brooklyn Heights', 'Bushwick', 'Crown Heights', 'Bay Ridge'] },
  { name: 'Queens', icon: 'âœˆï¸', neighborhoods: ['Astoria', 'Long Island City', 'Flushing', 'Forest Hills', 'Jackson Heights', 'Bayside'] },
  { name: 'Bronx', icon: 'ðŸŒ³', neighborhoods: ['Riverdale', 'Fordham', 'Pelham Bay', 'Mott Haven', 'Throgs Neck'] },
  { name: 'Staten Island', icon: 'â›´ï¸', neighborhoods: ['St. George', 'Stapleton', 'New Dorp', 'Tottenville', 'Great Kills'] },
  { name: 'New Jersey', icon: 'ðŸŒ†', neighborhoods: ['Hoboken', 'Jersey City', 'Weehawken', 'Union City', 'Bayonne'] },
]

export default function ServiceAreas() {
  return (
    <MainLayout>
      <div className='bg-gradient-to-br from-slate-900 to-slate-800 py-20'>
        <div className='container-xl text-center'>
          <span className='inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3'>Coverage</span>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-4' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Service Areas</h1>
          <p className='text-slate-300 text-lg max-w-xl mx-auto'>Professional cleaning across New York City and surrounding areas.</p>
          <div className='flex flex-wrap items-center justify-center gap-4 mt-8'>
            {[['5,000+', 'Customers Served'], ['6', 'Areas Covered'], ['Same Day', 'Service Available']].map(([v, l]) => (
              <div key={l} className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 text-center'>
                <p className='text-xl font-extrabold text-white'>{v}</p>
                <p className='text-slate-400 text-xs mt-0.5'>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className='section bg-white'>
        <div className='container-xl'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            {areas.map(area => (
              <div key={area.name} className='bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-medium hover:-translate-y-1 transition-all duration-300'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl'>{area.icon}</div>
                  <h3 className='font-bold text-slate-900 text-lg'>{area.name}</h3>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {area.neighborhoods.map(n => (
                    <span key={n} className='text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium'>{n}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='bg-gradient-to-r from-brand-600 to-brand-700 rounded-3xl p-8 sm:p-12 text-center'>
            <h3 className='text-2xl sm:text-3xl font-extrabold text-white mb-3' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Don't see your area?</h3>
            <p className='text-brand-100 mb-6 max-w-md mx-auto'>We are expanding fast! Contact us to check if we serve your location.</p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Link to='/contact' className='inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors'>Contact Us</Link>
              <a href='https://wa.me/15550001234' target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors'>Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
