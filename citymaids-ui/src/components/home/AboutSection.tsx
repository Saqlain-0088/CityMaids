import { Link } from 'react-router-dom'
import { useInView, useCountUp } from '../../hooks/useInView'

const stats = [
  { value: 5000, suffix: '+', label: 'Cleanings Completed' },
  { value: 200,  suffix: '+', label: 'Vetted Professionals' },
  { value: 10,   suffix: '+', label: 'Cities Served' },
  { value: 99,   suffix: '%', label: 'Satisfaction Rate' },
]

function Stat({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, inView)
  return (
    <div className="border-l-2 border-brand-500 pl-5">
      <p className="text-3xl font-extrabold text-dark-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-dark-500 text-sm mt-0.5">{label}</p>
    </div>
  )
}

export default function AboutSection() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section bg-dark-50">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image */}
          <div className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85"
                alt="Professional cleaner at work"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border border-dark-100 p-5 hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-dark-900 text-sm">Just Completed</p>
                  <p className="text-dark-400 text-xs">Deep clean · Park Avenue</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            {/* Years badge */}
            <div className="absolute -top-4 -left-4 bg-brand-600 text-white rounded-2xl p-4 text-center shadow-lg hidden md:block">
              <p className="text-3xl font-extrabold leading-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>5+</p>
              <p className="text-brand-100 text-xs mt-1 leading-tight">Years of<br/>Excellence</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-brand-500" />
              <span className="text-brand-600 font-semibold text-xs uppercase tracking-widest">About CityMaids</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-dark-900 leading-tight mb-5"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              A Cleaning Service<br />
              <span className="text-gradient">Built on Trust</span>
            </h2>
            <p className="text-dark-500 leading-relaxed mb-4">
              Founded in 2020, CityMaids has grown from a small team of 5 cleaners to one of New York City's most trusted home cleaning platforms — connecting homeowners with vetted, insured professionals.
            </p>
            <p className="text-dark-500 leading-relaxed mb-8">
              Every cleaner on our platform is background-checked, trained to our standards, and equipped with eco-friendly products that are safe for your family and pets.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[
                'Background-checked staff',
                'Eco-friendly products',
                'Satisfaction guaranteed',
                'Flexible scheduling',
                'Fully insured & bonded',
                'Real-time booking updates',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-dark-700">
                  <svg className="w-4 h-4 text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <Link to="/about" className="btn btn-brand btn-lg">
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-dark-200 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {stats.map(s => <Stat key={s.label} {...s} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}
