import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const plans = [
  {
    name: 'Basic',
    badge: null,
    price: 79,
    desc: 'Perfect for regular home maintenance.',
    color: 'bg-white border-slate-200',
    features: ['Standard cleaning', 'Up to 2 hours', 'Vacuuming & mopping', 'Bathroom cleaning', 'Kitchen wipe-down', 'Trash removal'],
    missing: ['Inside appliances', 'Deep scrub', 'Priority scheduling'],
  },
  {
    name: 'Standard',
    badge: 'Recommended',
    price: 149,
    desc: 'Our most popular deep cleaning package.',
    popular: true,
    color: 'bg-brand-600',
    features: ['Everything in Basic', 'Up to 4 hours', 'Inside oven & fridge', 'Baseboards & sills', 'Cabinet interiors', 'Deep scrub bathrooms', 'Window cleaning'],
    missing: ['Priority scheduling'],
  },
  {
    name: 'Premium',
    badge: null,
    price: 249,
    desc: 'Complete top-to-bottom transformation.',
    color: 'bg-slate-900 border-slate-700',
    features: ['Everything in Standard', 'Up to 6 hours', 'Post-construction clean', 'Wall spot cleaning', 'Garage sweep', 'Full property clean', 'Priority scheduling'],
    missing: [],
  },
]

export default function PricingSection() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">Transparent Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Simple, Honest Pricing
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-xl mx-auto">
            No hidden fees. No surprises. Choose the plan that works for your home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl border-2 flex flex-col overflow-hidden ${plan.popular ? 'border-brand-500 shadow-brand' : 'border-slate-200 shadow-soft'}`}
            >
              {plan.badge && (
                <div className="absolute -top-px left-0 right-0 h-1 bg-brand-500" />
              )}

              <div className={`p-7 flex flex-col flex-1 ${plan.popular ? 'bg-brand-600' : plan.name === 'Premium' ? 'bg-slate-900' : 'bg-white'}`}>
                {plan.badge && (
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 self-start ${plan.popular ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-700'}`}>
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6 pb-6 border-b border-white/10">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.popular ? 'text-brand-200' : plan.name === 'Premium' ? 'text-slate-400' : 'text-brand-600'}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-5xl font-extrabold ${plan.popular || plan.name === 'Premium' ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ml-1 ${plan.popular || plan.name === 'Premium' ? 'text-white/60' : 'text-slate-400'}`}>/ visit</span>
                  </div>
                  <p className={`text-sm ${plan.popular || plan.name === 'Premium' ? 'text-white/70' : 'text-slate-500'}`}>{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-white/20' : 'bg-brand-100'}`}>
                        <svg className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-brand-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={plan.popular || plan.name === 'Premium' ? 'text-white/90' : 'text-slate-700'}>{f}</span>
                    </li>
                  ))}
                  {plan.missing.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm opacity-30">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className={plan.popular || plan.name === 'Premium' ? 'text-white/50' : 'text-slate-400'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/booking"
                  className={`block text-center font-bold py-3.5 rounded-xl transition-all duration-200 ${
                    plan.popular
                      ? 'bg-white text-brand-700 hover:bg-brand-50'
                      : plan.name === 'Premium'
                      ? 'bg-brand-600 text-white hover:bg-brand-700'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Book This Plan
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-slate-500 text-sm">
            Need a custom quote?{' '}
            <Link to="/contact" className="text-brand-600 font-semibold hover:underline">Contact us</Link>
            {' '}and we'll tailor a plan for your home.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
