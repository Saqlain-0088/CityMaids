import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Button from '../components/ui/Button'
import { useInView, useCountUp } from '../hooks/useInView'

function Stat({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCountUp(value, inView)
  return (
    <div className="text-center p-6 bg-primary-50 rounded-2xl">
      <p className="text-4xl font-extrabold text-primary-700" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{count.toLocaleString()}{suffix}</p>
      <p className="text-slate-500 text-sm mt-1">{label}</p>
    </div>
  )
}

export default function About() {
  const { ref, inView } = useInView()
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-slate-900 to-primary-950 py-16">
        <div className="container-xl text-center">
          <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>About CityMaids</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">We're on a mission to make professional home cleaning accessible, reliable, and stress-free for everyone.</p>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-tag"><span className="w-5 h-0.5 bg-primary-500 rounded" />Our Story</span>
              <h2 className="section-title mb-5">Built on Trust, <span className="text-gradient">Driven by Quality</span></h2>
              <p className="text-slate-500 leading-relaxed mb-4">CityMaids was founded in 2020 with a simple idea: everyone deserves a clean home, and finding a reliable cleaner shouldn't be a hassle.</p>
              <p className="text-slate-500 leading-relaxed mb-4">We started with a small team of 5 cleaners in Manhattan and have grown to serve over 5,000 customers across New York City and surrounding areas.</p>
              <p className="text-slate-500 leading-relaxed mb-8">Today, our platform connects hundreds of vetted cleaning professionals with homeowners who value their time and their home.</p>
              <Link to="/booking"><Button size="lg">Book Your First Cleaning</Button></Link>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" alt="Our team" className="w-full h-[420px] object-cover rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-5 -left-5 bg-primary-600 text-white rounded-2xl p-5 shadow-brand text-center hidden md:block">
                <p className="text-4xl font-extrabold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>5+</p>
                <p className="text-xs text-brand-100 leading-tight">Years of<br/>Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ref} className="py-16 bg-slate-50">
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[{ value: 5000, suffix: '+', label: 'Happy Customers' }, { value: 200, suffix: '+', label: 'Expert Cleaners' }, { value: 10, suffix: '+', label: 'Cities Served' }, { value: 99, suffix: '%', label: 'Satisfaction Rate' }].map(s => <Stat key={s.label} {...s} inView={inView} />)}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <span className="section-tag"><span className="w-5 h-0.5 bg-primary-500 rounded" />What We Stand For</span>
            <h2 className="section-title">Our Core <span className="text-gradient">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🛡️', title: 'Trust & Safety', desc: 'Every cleaner is background-checked, identity-verified, and insured before joining our platform.' },
              { icon: '⭐', title: 'Quality First', desc: 'We maintain strict quality standards and follow up after every service to ensure satisfaction.' },
              { icon: '🌿', title: 'Eco-Friendly', desc: 'We use environmentally safe products that are tough on dirt but gentle on your family and pets.' },
              { icon: '📱', title: 'Easy Booking', desc: 'Book, reschedule, or cancel in minutes through our simple online platform — no calls needed.' },
              { icon: '💰', title: 'Fair Pricing', desc: 'Transparent, competitive pricing with zero hidden fees. You always know exactly what you\'re paying.' },
              { icon: '🤝', title: 'Community', desc: 'We support local cleaners with fair wages, flexible hours, and growth opportunities.' },
            ].map(v => (
              <div key={v.title} className="card p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

