import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'

const steps = [
  {
    number: '01',
    title: 'Choose a Service',
    desc: 'Browse our range of professional cleaning services and select the one that fits your home and budget.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Book a Schedule',
    desc: 'Select your preferred date and time. Our booking form takes less than 2 minutes to complete.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'We Clean Your Home',
    desc: 'Our vetted professionals arrive on time with all supplies and deliver a spotless, consistent result.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Enjoy & Relax',
    desc: 'Sit back and enjoy your clean home. We guarantee your satisfaction — or we re-clean for free.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-xl">

        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-brand-500" />
              <span className="text-brand-600 font-semibold text-xs uppercase tracking-widest">Simple Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-dark-900 leading-tight"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              How It Works
            </h2>
          </div>
          <p className="text-dark-500 text-base max-w-sm lg:text-right">
            Four simple steps to a cleaner, healthier home — no hassle, no guesswork.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-dark-100 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative p-8 border-b sm:border-b-0 sm:border-r border-dark-100 last:border-0 bg-white hover:bg-dark-50 transition-colors duration-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms`, transition: 'opacity 0.5s ease, transform 0.5s ease, background-color 0.2s ease' }}
            >
              {/* Step number */}
              <p className="text-5xl font-extrabold text-dark-100 mb-6 leading-none select-none"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {step.number}
              </p>
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
                {step.icon}
              </div>
              <h3 className="font-bold text-dark-900 text-lg mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {step.title}
              </h3>
              <p className="text-dark-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-500 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/booking" className="btn btn-brand btn-lg">
            Book Your First Cleaning
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
