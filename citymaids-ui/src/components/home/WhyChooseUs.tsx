import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const usps = [
  {
    title: 'Verified Staff',
    desc: 'Every cleaner is background-checked, identity-verified, and insured before joining our platform.',
    icon: '🛡️',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Safe Chemicals',
    desc: 'We use eco-friendly, non-toxic products that are safe for children, pets, and the environment.',
    icon: '♻️',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    title: 'On-Time Service',
    desc: 'We respect your schedule. Our cleaners arrive within the agreed time window, every single visit.',
    icon: '⏰',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    title: 'Affordable Pricing',
    desc: 'No hidden fees, no surprises. You see the full price before you book — and that\'s exactly what you pay.',
    icon: '💰',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Satisfaction Guaranteed',
    desc: 'Not satisfied? Contact us within 24 hours and we\'ll send a team back to re-clean at no extra charge.',
    icon: '✅',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Easy Online Booking',
    desc: 'Book, reschedule, or cancel in minutes from any device. No phone calls, no waiting.',
    icon: '📱',
    color: 'bg-violet-50 text-violet-600',
  },
]

export default function WhyChooseUs() {
  const { ref, inView } = useInView()

  return (
    <section className="section bg-primary-950">
      <div className="container-xl">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-teal-400 font-semibold text-xs uppercase tracking-widest mb-3">
            Why CityMaids
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Why Thousands Choose Us
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We're not just a cleaning service — we're your trusted home care partner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {usps.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-2xl ${u.color} flex items-center justify-center text-2xl mb-4`}>
                {u.icon}
              </div>
              <h4 className="font-bold text-white text-lg mb-2">{u.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{u.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
