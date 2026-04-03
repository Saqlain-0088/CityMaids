\uFEFFimport { useParams, Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { services } from '../data/services'

const processSteps = ['We confirm your booking and send a reminder 24h before.', 'Our vetted cleaner arrives on time with all supplies.', 'We clean thoroughly following our quality checklist.', 'You inspect the results \u2014 we guarantee your satisfaction.']

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find(s => s.slug === slug)
  const related = services.filter(s => s.slug !== slug).slice(0, 3)
  if (!service) return (
    <MainLayout>
      <div className='container-xl py-20 text-center'>
        <p className='text-5xl mb-4'>\u00F0\u0178\u201D\u008D</p>
        <h2 className='text-2xl font-bold text-slate-900 mb-2'>Service Not Found</h2>
        <Link to='/services' className='btn-primary mt-4 inline-flex'>Browse All Services</Link>
      </div>
    </MainLayout>
  )
  return (
    <MainLayout>
      <div className='bg-slate-50 border-b border-slate-100 py-3'>
        <div className='container-xl flex items-center gap-2 text-sm text-slate-400'>
          <Link to='/' className='hover:text-primary-600 transition-colors'>Home</Link>
          <span>/</span>
          <Link to='/services' className='hover:text-primary-600 transition-colors'>Services</Link>
          <span>/</span>
          <span className='text-slate-700 font-medium'>{service.name}</span>
        </div>
      </div>
      <section className='section bg-white'>
        <div className='container-xl'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-14 mb-16 items-start'>
            <div className='relative'>
              <div className='rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]'>
                <img src={service.image} alt={service.name} className='w-full h-full object-cover' />
              </div>
              <div className='absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 hidden md:block'>
                <p className='text-xs text-slate-400 font-medium mb-1'>Starting from</p>
                <p className='text-4xl font-extrabold text-slate-900' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>${service.price}</p>
                <p className='text-sm text-slate-400 mt-0.5'>{service.duration}h service</p>
              </div>
            </div>
            <div className='lg:pt-2'>
              {service.isPopular && <span className='inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4'>\u2B50 Most Popular</span>}
              <h1 className='text-4xl font-extrabold text-slate-900 mb-3' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{service.name}</h1>
              <div className='flex items-center gap-4 mb-5'>
                <span className='text-4xl font-extrabold text-primary-600'>${service.price}</span>
                <span className='text-slate-300'>|</span>
                <span className='text-slate-500 text-sm flex items-center gap-1.5'>\u00E2\u008F\u00B1 {service.duration} hours</span>
              </div>
              <p className='text-slate-600 leading-relaxed mb-7 text-lg'>{service.description}</p>
              <h3 className='font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest text-slate-400'>What is Included</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8'>
                {service.features.map(f => (
                  <div key={f} className='flex items-center gap-3'>
                    <div className='w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0'>
                      <svg className='w-3 h-3 text-primary-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' /></svg>
                    </div>
                    <span className='text-sm text-slate-700'>{f}</span>
                  </div>
                ))}
              </div>
              <div className='flex flex-col sm:flex-row gap-3 mb-4'>
                <Link to={`/booking?service=${service.id}`} className='btn-primary btn-lg flex-1 justify-center'>Book Now \u2014 ${service.price}</Link>
                <a href='https://wa.me/15550001234' target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#20b858] transition-colors'>WhatsApp</a>
              </div>
              <p className='text-xs text-slate-400 text-center'>Free cancellation 24h before \u00B7 No hidden fees \u00B7 Satisfaction guaranteed</p>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16'>
            <div className='bg-slate-50 rounded-2xl p-7'>
              <h3 className='font-bold text-slate-900 mb-5 text-lg'>How It Works</h3>
              <div className='space-y-4'>
                {processSteps.map((step, i) => (
                  <div key={i} className='flex items-start gap-4'>
                    <div className='w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0'>{i + 1}</div>
                    <p className='text-slate-600 text-sm leading-relaxed pt-1'>{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-primary-50 border border-brand-100 rounded-2xl p-7'>
              <h3 className='font-bold text-slate-900 mb-5 text-lg'>Why Choose CityMaids</h3>
              <div className='space-y-3'>
                {[['\u2705', 'Verified & insured professionals'], ['\u2B50', '4.9\u2605 average customer rating'], ['\uD83D\uDD04', '100% satisfaction guarantee'], ['\u267B\uFE0F', 'Eco-friendly products only'], ['\uD83D\uDCF1', 'Easy online booking & management']].map(([icon, text]) => (
                  <div key={text} className='flex items-center gap-3'><span className='text-lg'>{icon}</span><span className='text-slate-700 text-sm font-medium'>{text}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-900 mb-7'>You May Also Like</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
              {related.map(s => (
                <Link key={s.id} to={`/services/${s.slug}`} className='group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-medium hover:-translate-y-1 transition-all duration-300'>
                  <div className='h-40 overflow-hidden'>
                    <img src={s.image} alt={s.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                  </div>
                  <div className='p-4'>
                    <p className='font-bold text-slate-900'>{s.name}</p>
                    <p className='text-primary-600 font-extrabold'>${s.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
