import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'

const plans = [
  {
    name: 'Basic',
    price: 79,
    desc: 'Regular home maintenance.',
    features: ['Standard cleaning', 'Up to 2 hours', 'Vacuuming & mopping', 'Bathroom cleaning', 'Kitchen wipe-down', 'Trash removal'],
    missing: ['Inside appliances', 'Deep scrub', 'Priority scheduling'],
  },
  {
    name: 'Premium',
    price: 149,
    desc: 'Our most popular package.',
    popular: true,
    features: ['Everything in Basic', 'Up to 4 hours', 'Inside oven & fridge', 'Baseboards & sills', 'Cabinet interiors', 'Deep scrub bathrooms', 'Window cleaning'],
    missing: ['Priority scheduling'],
  },
  {
    name: 'Ultimate',
    price: 249,
    desc: 'Complete transformation.',
    features: ['Everything in Premium', 'Up to 6 hours', 'Post-construction clean', 'Wall spot cleaning', 'Garage sweep', 'Full property clean', 'Priority scheduling'],
    missing: [],
  },
]

export default function PricingSection() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section bg-dark-50">
      <div className="container-xl">

        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-brand-500" />
              <span className="text-brand-600 font-semibold text-xs uppercase tracking-widest">Transparent Pricing</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-dark-900 leading-tight"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Simple Pricing Plans
            </h2>
          </div>
          <p className="text-dark-500 text-base max-w-sm lg:text-right">
            No hidden fees. No surprises. Choose the plan that works for your home.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl transition-all duration-500 ${
                plan.popular
                  ? 'bg-dark-900 text-white ring-2 ring-brand-500'
                  : 'bg-white border border-dark-100 hover:border-brand-200 hover:shadow-lg'
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-7">
                {/* Plan name & price */}
                <div className="mb-6 pb-6 border-b border-dark-100/20">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.popular ? 'text-brand-400' : 'text-brand-600'}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      ${plan.price}
                    </span>
                    <span className={`text-sm ${plan.popular ? 'text-dark-400' : 'text-dark-400'}`}>/ visit</span>
                  </div>
                  <p className={`text-sm mt-1 ${plan.popular ? 'text-dark-400' : 'text-dark-400'}`}>{plan.desc}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <svg className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-brand-400' : 'text-brand-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.popular ? 'text-dark-200' : 'text-dark-700'}>{f}</span>
                    </li>
                  ))}
                  {plan.missing.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm opacity-30">
                      <svg className="w-4 h-4 flex-shrink-0 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-dark-400">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/booking"
                  className={`btn btn-lg w-full justify-center ${plan.popular ? 'btn-brand' : 'btn-dark'}`}
                >
                  Book This Plan
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-dark-400 text-sm mt-8 transition-all duration-500 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          Need a custom quote?{' '}
          <Link to="/contact" className="text-brand-600 font-semibold hover:underline">
            Contact us
          </Link>
          {' '}and we'll tailor a plan for your home.
        </p>
      </div>
    </section>
  )
}
