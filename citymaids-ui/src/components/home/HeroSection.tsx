import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HERO_IMG = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=90'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary-950">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Professional home cleaning" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-900/90 to-primary-900/60" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-xl py-28 w-full">
        <div className="max-w-2xl">

          {/* Urgency pill */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 bg-cta-500/20 border border-cta-400/40 text-cta-300 text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-cta-400 rounded-full animate-pulse" />
              🔥 Limited slots — 10% off first booking
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Premium Home Cleaning<br />
            <span className="text-gradient">Trusted & Hassle-Free</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl"
          >
            Book verified professionals in 60 seconds. Eco-friendly products, guaranteed satisfaction, on-time every time.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {[
              { icon: '⭐', text: '4.8 Rating', sub: '2,000+ reviews' },
              { icon: '👥', text: '10,000+ Homes', sub: 'Served' },
              { icon: '🛡️', text: 'Verified', sub: 'Professionals' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2.5 bg-white/8 border border-white/15 rounded-2xl px-4 py-2.5">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{item.text}</p>
                  <p className="text-slate-400 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/booking" className="btn-cta btn-lg text-base">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now — From $79
            </Link>
            <a
              href="https://wa.me/15550001234?text=Hi%2C%20I%20want%20to%20get%20a%20free%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold rounded-2xl px-8 py-4 text-base transition-all duration-200 shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Get Free Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
