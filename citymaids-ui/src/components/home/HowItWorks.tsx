import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'

const steps = [
  {
    step: '01',
    title: 'Select Service',
    desc: 'Choose from our range of professional cleaning services that fits your home.',
    icon: '\uD83E\uDDB9',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    step: '02',
    title: 'Choose Time Slot',
    desc: 'Pick your preferred date and time. Booking takes under 60 seconds.',
    icon: '\uD83D\uDCC5',
    color: 'bg-primary-50 text-primary-600 border-primary-100',
  },
  {
    step: '03',
    title: 'Confirm Booking',
    desc: 'Review your details and confirm. You\'ll get an instant confirmation.',
    icon: '\u2705',
    color: 'bg-teal-50 text-teal-600 border-teal-100',
  },
  {
    step: '04',
    title: 'Get Service Delivered',
    desc: 'Our vetted professional arrives on time and delivers a spotless result.',
    icon: '\uD83C\uDFE0',
    color: 'bg-cta-50 text-cta-600 border-cta-100',
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section bg-slate-50">
      <div className="container-xl">
        <div className={`text-center mb-14 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="section-tag justify-center">Simple Process</span>
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Four simple steps to a cleaner, healthier home — no hassle, no guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`relative bg-white rounded-3xl p-7 shadow-card border border-slate-100 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-slate-200 z-10" />
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-2xl border-2 ${s.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {s.icon}
                </div>
                <span className="text-3xl font-extrabold text-slate-100" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {s.step}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-500 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/booking" className="btn-cta btn-lg">
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
