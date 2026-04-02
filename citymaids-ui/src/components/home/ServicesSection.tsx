import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const services = [
  { id: 1, name: 'Standard Cleaning', slug: 'standard-cleaning', price: 79, duration: '2 hrs', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=85', desc: 'Regular maintenance cleaning — vacuuming, mopping, dusting, bathroom & kitchen care.' },
  { id: 2, name: 'Deep Cleaning', slug: 'deep-cleaning', price: 149, duration: '4 hrs', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85', desc: 'Intensive top-to-bottom clean including appliances, baseboards, and cabinet interiors.', popular: true },
  { id: 3, name: 'Move In / Move Out', slug: 'move-in-out-cleaning', price: 199, duration: '5 hrs', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=700&q=85', desc: 'Spotless cleaning for property transitions. Maximize your deposit return.' },
  { id: 4, name: 'Office Cleaning', slug: 'office-cleaning', price: 129, duration: '3 hrs', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=85', desc: 'Professional cleaning for offices and commercial spaces.' },
  { id: 5, name: 'Carpet Cleaning', slug: 'carpet-cleaning', price: 99, duration: '2 hrs', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=700&q=85', desc: 'Hot steam extraction removes stains, allergens, and odors from carpets.' },
  { id: 6, name: 'Post-Construction', slug: 'post-construction-cleaning', price: 249, duration: '6 hrs', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=85', desc: 'Remove construction dust and debris after renovation work.' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

export default function ServicesSection() {
  const { ref, inView } = useInView()
  const [active, setActive] = useState(0)
  const s = services[active]

  return (
    <section className="section bg-white">
      <div className="container-xl">

        {/* Header */}
        <motion.div ref={ref as any}
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

        {/* Two-column panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 border border-slate-200 rounded-2xl overflow-hidden shadow-soft"
        >
          {/* Left list */}
          <div className="lg:col-span-2 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
            {services.map((item, i) => (
              <motion.button key={item.slug} onClick={() => setActive(i)}
                whileHover={{ x: 4 }} transition={{ duration: 0.15 }}
                className={`w-full text-left px-6 py-4 border-b border-slate-200 last:border-b-0 transition-colors duration-150 ${active === i ? 'bg-white' : 'hover:bg-white/70'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold text-sm truncate ${active === i ? 'text-slate-900' : 'text-slate-700'}`}>{item.name}</p>
                      {item.popular && <span className="flex-shrink-0 text-xs font-bold bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">Popular</span>}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{item.duration}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`font-extrabold text-base ${active === i ? 'text-brand-600' : 'text-slate-600'}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>${item.price}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${active === i ? 'bg-brand-600' : 'bg-slate-200'}`}>
                      <svg className={`w-3 h-3 ${active === i ? 'text-white' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right detail */}
          <div className="lg:col-span-3 bg-white">
            <div className="relative h-56 overflow-hidden">
              <motion.img key={s.slug} src={s.image} alt={s.name}
                initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <h3 className="text-xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.name}</h3>
                <div className="bg-white rounded-xl px-3 py-1.5 text-right shadow-soft">
                  <p className="font-extrabold text-slate-900 text-lg leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>${s.price}</p>
                  <p className="text-xs text-slate-400">{s.duration}</p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <p className="text-slate-600 leading-relaxed mb-6">{s.desc}</p>
              <div className="flex gap-3">
                <Link to={`/booking?service=${s.id}`} className="btn-primary flex-1 justify-center">Book Now</Link>
                <Link to={`/services/${s.slug}`} className="btn-secondary px-5">Details</Link>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">Free cancellation 24h before · No hidden fees</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
