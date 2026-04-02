import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const services = [
  {
    id: 1, name: 'Standard Cleaning', slug: 'standard-cleaning', price: 79, icon: '🧹',
    desc: 'Regular maintenance for a consistently fresh home.',
    includes: ['Vacuuming & mopping', 'Bathroom sanitizing', 'Kitchen wipe-down'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 2, name: 'Deep Cleaning', slug: 'deep-cleaning', price: 149, icon: '✨',
    desc: 'Intensive top-to-bottom clean for every corner.',
    includes: ['Inside oven & fridge', 'Baseboards & sills', 'Cabinet interiors'],
    color: 'bg-primary-50 text-primary-600',
    popular: true,
  },
  {
    id: 3, name: 'Move In / Move Out', slug: 'move-in-out-cleaning', price: 199, icon: '🏠',
    desc: 'Spotless handover — maximize your deposit return.',
    includes: ['Full property clean', 'Inside all appliances', 'Window cleaning'],
    color: 'bg-teal-50 text-teal-600',
  },
  {
    id: 4, name: 'Office Cleaning', slug: 'office-cleaning', price: 129, icon: '🏢',
    desc: 'Professional cleaning for productive workspaces.',
    includes: ['Desk sanitizing', 'Restroom deep clean', 'Floor care'],
    color: 'bg-violet-50 text-violet-600',
  },
  {
    id: 5, name: 'Carpet Cleaning', slug: 'carpet-cleaning', price: 99, icon: '🛋️',
    desc: 'Steam extraction removes stains, allergens & odors.',
    includes: ['Pre-treatment stains', 'Hot steam extraction', 'Deodorizing'],
    color: 'bg-amber-50 text-amber-600',
  },
  {
    id: 6, name: 'Post-Construction', slug: 'post-construction-cleaning', price: 249, icon: '🔨',
    desc: 'Remove dust & debris after renovation work.',
    includes: ['Fine dust removal', 'Paint splatter removal', 'Floor restoration'],
    color: 'bg-rose-50 text-rose-600',
  },
]

export default function ServicesSection() {
  const { ref, inView } = useInView()

  return (
    <section className="section bg-white">
      <div className="container-xl">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-tag justify-center">Our Services</span>
          <h2 className="section-title mb-4">
            Cleaning Services for <span className="text-gradient">Every Need</span>
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
              className={`group relative bg-white rounded-3xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${s.popular ? 'border-primary-400 shadow-brand' : 'border-slate-100 shadow-card'}`}
            >
              {s.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center text-2xl`}>
                  {s.icon}
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Starting from</p>
                  <p className="text-2xl font-extrabold text-primary-600" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    ${s.price}
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-2">{s.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>

              <ul className="space-y-1.5 mb-6">
                {s.includes.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
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
                className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-2xl transition-colors text-sm"
              >
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            View all services & details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
