import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HERO_IMG = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=90'

const trustItems = [
  { icon: '⭐', value: '4.8/5', label: 'Rating' },
  { icon: '🏠', value: '10,000+', label: 'Homes Cleaned' },
  { icon: '🛡️', value: '100%', label: 'Verified Staff' },
]

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="container-xl relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 bg-cta-500/15 border border-cta-400/30 text-cta-300 text-sm font-semibold px-4 py-2 rounded-full mb-7">
                <span className="w-2 h-2 bg-cta-400 rounded-full animate-pulse" />
                🔥 Limited slots — 10% off first booking
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Premium Home Cleaning<br />
              <span className="bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent">
                Trusted & Hassle-Free
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Book verified professionals in under 60 seconds. Eco-friendly products, on-time guarantee, 100% satisfaction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link to="/booking"
                className="inline-flex items-center justify-center gap-2 bg-cta-500 hover:bg-cta-600 text-white font-bold rounded-2xl px-8 py-4 text-base transition-all duration-200 shadow-cta hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Now — From $79
              </Link>
              <Link to="/services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl px-8 py-4 text-base transition-all duration-200 backdrop-blur-sm">
                View Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {trustItems.map(item => (
                <div key={item.label} className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-2xl px-4 py-2.5 backdrop-blur-sm">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{item.value}</p>
                    <p className="text-slate-400 text-xs">{item.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-strong ring-1 ring-white/10">
              <img src={HERO_IMG} alt="Professional home cleaning" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>

            {/* Floating cards */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-card-hover p-4 hidden md:flex items-center gap-3 border border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center text-xl flex-shrink-0">✅</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Satisfaction</p>
                <p className="text-teal-600 font-semibold text-xs">100% Guaranteed</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card-hover p-4 hidden md:flex items-center gap-3 border border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center text-xl flex-shrink-0">🛡️</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Background</p>
                <p className="text-primary-600 font-semibold text-xs">Verified Staff</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
