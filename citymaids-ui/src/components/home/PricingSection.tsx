import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const plans = [
  {
    name: 'Basic',
    coverage: '1 BHK',
    price: 79,
    desc: 'Perfect for small homes & regular upkeep.',
    features: ['Up to 2 hours', 'Vacuuming & mopping', 'Bathroom cleaning', 'Kitchen wipe-down', 'Trash removal'],
    missing: ['Inside appliances', 'Deep scrub', 'Priority scheduling'],
  },
  {
    name: 'Standard',
    coverage: '2 BHK',
    price: 149,
    desc: 'Our most popular — thorough deep clean.',
    popular: true,
    features: ['Up to 4 hours', 'Everything in Basic', 'Inside oven & fridge', 'Baseboards & sills', 'Cabinet interiors', 'Deep scrub bathrooms'],
    missing: ['Priority scheduling'],
  },
  {
    name: 'Premium',
    coverage: 'Full Home',
    price: 249,
    desc: 'Complete transformation for large homes.',
    features: ['Up to 6 hours', 'Everything in Standard', 'Post-construction clean', 'Wall spot cleaning', 'Garage sweep', 'Priority scheduling'],
    missing: [],
  },
]

export default function PricingSection() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-tag justify-center">Transparent Pricing</span>
          <h2 className="section-title mb-4">Simple, Honest Pricing</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            No hidden fees. No surprises. Choose the plan that works for your home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-primary-600 shadow-brand-lg ring-2 ring-primary-400'
                  : 'bg-white border-2 border-slate-100 shadow-card hover:shadow-card-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-primary-400" />
              )}

              <div className="p-8 flex flex-col flex-1">
                {plan.popular && (
                  <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                    ⭐ Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`text-xs font-bold uppercase tracking-widest ${plan.popular ? 'text-primary-200' : 'text-primary-600'}`}>
                      {plan.name}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${plan.popular ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-700'}`}>
                      {plan.coverage}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ${plan.popular ? 'text-primary-200' : 'text-slate-400'}`}>/ visit</span>
                  </div>
                  <p className={`text-sm ${plan.popular ? 'text-primary-100' : 'text-slate-500'}`}>{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-white/20' : 'bg-teal-100'}`}>
                        <svg className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-teal-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={plan.popular ? 'text-white/90' : 'text-slate-700'}>{f}</span>
                    </li>
                  ))}
                  {plan.missing.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm opacity-35">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className={plan.popular ? 'text-white/50' : 'text-slate-400'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/booking"
                  className={`block text-center font-bold py-3.5 rounded-2xl transition-all duration-200 ${
                    plan.popular
                      ? 'bg-white text-primary-700 hover:bg-primary-50'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Book This Plan
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm">
            Need a custom quote?{' '}
            <Link to="/contact" className="text-primary-600 font-semibold hover:underline">Contact us</Link>
            {' '}and we'll tailor a plan for your home.
          </p>
        </div>
      </div>
    </section>
  )
}
