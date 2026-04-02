import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const services = [
  { id: 1, name: 'Standard Cleaning', slug: 'standard-cleaning', price: 79, duration: '2 hrs', icon: '🧹', desc: 'Regular maintenance cleaning — vacuuming, mopping, dusting, bathroom & kitchen care.', tags: ['Weekly', 'Bi-weekly'] },
  { id: 2, name: 'Deep Cleaning', slug: 'deep-cleaning', price: 149, duration: '4 hrs', icon: '✨', desc: 'Intensive top-to-bottom clean including appliances, baseboards, and cabinet interiors.', popular: true, tags: ['First clean', 'Seasonal'] },
  { id: 3, name: 'Move In / Move Out', slug: 'move-in-out-cleaning', price: 199, duration: '5 hrs', icon: '🏠', desc: 'Spotless cleaning for property transitions. Maximize your deposit return.', tags: ['Tenants', 'Landlords'] },
  { id: 4, name: 'Office Cleaning', slug: 'office-cleaning', price: 129, duration: '3 hrs', icon: '🏢', desc: 'Professional cleaning for offices and commercial spaces. Boost team productivity.', tags: ['Commercial', 'Offices'] },
  { id: 5, name: 'Carpet Cleaning', slug: 'carpet-cleaning', price: 99, duration: '2 hrs', icon: '🛋️', desc: 'Hot steam extraction removes stains, allergens, and odors from carpets and rugs.', tags: ['Pets', 'Allergens'] },
  { id: 6, name: 'Post-Construction', slug: 'post-construction-cleaning', price: 249, duration: '6 hrs', icon: '🔨', desc: 'Remove construction dust and debris after renovation. Move-in ready results.', tags: ['Renovation', 'New build'] },
]

export default function ServicesSection() {
  const { ref, inView } = useInView()

  return (
    <section className="section bg-slate-50">
      <div className="container-xl">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Cleaning Services for<br /><span className="text-gradient">Every Need</span>
            </h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 border-b-2 border-brand-500 pb-0.5 hover:text-brand-700 transition-colors group self-start lg:self-end">
            View all services
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group relative bg-white rounded-2xl border-2 p-6 hover:border-brand-400 hover:shadow-medium hover:-translate-y-1 transition-all duration-300 ${s.popular ? 'border-brand-400 shadow-brand' : 'border-slate-100 shadow-soft'}`}
            >
              {s.popular && (
                <span className="absolute -top-3 left-5 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center text-2xl transition-colors flex-shrink-0">
                  {s.icon}
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Starting from</p>
                  <p className="text-2xl font-extrabold text-brand-600" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>${s.price}</p>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>

              <div className="flex items-center justify-between mb-5">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-medium flex-shrink-0 ml-2">⏱ {s.duration}</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <Link to={`/booking?service=${s.id}`} className="btn-primary flex-1 justify-center text-sm py-2.5">Book Now</Link>
                <Link to="/services" className="btn-secondary px-4 text-sm py-2.5">Details</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
