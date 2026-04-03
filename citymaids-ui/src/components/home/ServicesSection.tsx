import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const services = [
  {
    id: 1, name: 'Home Cleaning', slug: 'standard-cleaning', price: 79, icon: '🏠',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    includes: ['Vacuuming all floors', 'Bathroom sanitizing', 'Kitchen wipe-down', 'Dusting surfaces'],
    badge: null,
  },
  {
    id: 2, name: 'Deep Cleaning', slug: 'deep-cleaning', price: 149, icon: '✨',
    color: 'bg-primary-50 text-primary-600 border-primary-100',
    includes: ['Everything in Home Clean', 'Inside oven & fridge', 'Baseboards & sills', 'Cabinet interiors'],
    badge: 'Most Popular',
  },
  {
    id: 3, name: 'Move In / Move Out', slug: 'move-in-out-cleaning', price: 199, icon: '📦',
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    includes: ['Full property deep clean', 'Inside all appliances', 'Window cleaning', 'Final walkthrough'],
    badge: null,
  },
  {
    id: 4, name: 'Office Cleaning', slug: 'office-cleaning', price: 129, icon: '🏢',
    color: 'bg-violet-50 text-violet-600 border-violet-100',
    includes: ['Desk & workstation clean', 'Restroom sanitizing', 'Break room cleaning', 'Floor care'],
    badge: null,
  },
  {
    id: 5, name: 'Carpet Cleaning', slug: 'carpet-cleaning', price: 99, icon: '🛋️',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    includes: ['Hot steam extraction', 'Pre-treatment stains', 'Deodorizing treatment', 'Pet hair removal'],
    badge: null,
  },
  {
    id: 6, name: 'Post-Construction', slug: 'post-construction-cleaning', price: 249, icon: '🔨',
    color: 'bg-rose-50 text-rose-600 border-rose-100',
    includes: ['Fine dust removal', 'Paint splatter removal', 'Window & glass clean', 'Floor restoration'],
    badge: null,
  },
]

export default function ServicesSection() {
  const { ref, inView } = useInView()

  return (
    <section className="section bg-slate-50">
      <div className="container-xl">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-xs uppercase tracking-widest mb-3">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Cleaning Services for{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">Every Need</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Six specialist services delivered by vetted, insured professionals. Transparent pricing, guaranteed results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group relative bg-white rounded-3xl border-2 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover ${s.badge ? 'border-primary-400 shadow-blue' : 'border-slate-100 shadow-card'}`}
            >
              {s.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-blue">
                  {s.badge}
                </span>
              )}

              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl border-2 ${s.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {s.icon}
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Starting from</p>
                  <p className="text-2xl font-extrabold text-primary-600" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    ${s.price}
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-xl mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.name}</h3>

              <ul className="space-y-2 mb-6">
                {s.includes.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to={`/booking?service=${s.id}`}
                className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-2xl transition-all duration-200 text-sm shadow-blue hover:shadow-brand-lg"
              >
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors border-b-2 border-primary-200 hover:border-primary-500 pb-0.5">
            View all services & details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
