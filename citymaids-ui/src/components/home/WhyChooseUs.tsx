import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const usps = [
  { title: 'Trusted Professionals', desc: 'Every cleaner is background-checked, identity-verified, and insured before joining our platform.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  { title: 'Transparent Pricing', desc: 'No hidden fees, no surprises. You see the full price before you book — and that\'s exactly what you pay.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { title: 'Always On Time', desc: 'We respect your schedule. Our cleaners arrive within the agreed time window, every single visit.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { title: 'Satisfaction Guaranteed', desc: 'Not satisfied? Contact us within 24 hours and we\'ll send a team back to re-clean at no extra charge.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg> },
  { title: 'Eco-Friendly Products', desc: 'We use environmentally responsible products that are tough on dirt but safe for your family and pets.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
  { title: 'Easy Online Booking', desc: 'Book, reschedule, or cancel in minutes from any device. No phone calls, no waiting.', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
]

export default function WhyChooseUs() {
  const { ref, inView } = useInView()

  return (
    <section className="section bg-slate-50">
      <div className="container-xl">
        <motion.div ref={ref as any}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">Why CityMaids</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Why Thousands<br />Choose Us
            </h2>
          </div>
          <p className="text-slate-500 text-base max-w-sm lg:text-right">We're not just a cleaning service — we're your trusted home care partner.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {usps.map((u, i) => (
            <motion.div key={u.title}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft group cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200">
                {u.icon}
              </div>
              <h4 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{u.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{u.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
