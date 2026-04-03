import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const usps = [
  {
    title: 'Verified Staff',
    desc: 'Every cleaner is background-checked, identity-verified, and insured before joining our platform.',
    icon: '\uD83D\uDEE1\uFE0F',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Safe Chemicals',
    desc: 'We use eco-friendly, non-toxic products that are safe for children, pets, and the environment.',
    icon: '\u267B\uFE0F',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    title: 'On-Time Service',
    desc: 'We respect your schedule. Our cleaners arrive within the agreed time window, every single visit.',
    icon: '\u23F0',
    color: 'bg-primary-50 text-primary-600',
  },
  {
    title: 'Affordable Pricing',
    desc: 'No hidden fees, no surprises. You see the full price before you book \u2014 and that\'s exactly what you pay.',
    icon: '\uD83D\uDCB0',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Satisfaction Guaranteed',
    desc: 'Not satisfied? Contact us within 24 hours and we\'ll send a team back to re-clean at no extra charge.',
    icon: '\u2705',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Easy Online Booking',
    desc: 'Book, reschedule, or cancel in minutes from any device. No phone calls, no waiting.',
    icon: '\uD83D\uDCF1',
    color: 'bg-violet-50 text-violet-600',
  },
]

export default function WhyChooseUs() {
  const { ref, inView } = useInView()

  return (
    <section className="section bg-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Image */}
          <motion.div
            ref={ref as any}
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-strong">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85"
                alt="Professional cleaner"
                className="w-full h-[480px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-primary-600 text-white rounded-2xl p-5 shadow-blue hidden md:block text-center">
              <p className="text-3xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>5+</p>
              <p className="text-primary-100 text-xs leading-tight">Years of<br/>Excellence</p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            >
              <span className="section-tag">Why CityMaids</span>
              <h2 className="section-title mb-4">
                Why will you choose<br />our service?
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                We're not just a cleaning service \u2014 we're your trusted home care partner. Here's what sets us apart.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usps.map((u, i) => (
                <motion.div
                  key={u.title}
                  initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-3 p-4 bg-primary-50 rounded-2xl border border-primary-100"
                >
                  <div className={`w-10 h-10 rounded-xl ${u.color} flex items-center justify-center text-xl flex-shrink-0`}>
                    {u.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-0.5">{u.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{u.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
