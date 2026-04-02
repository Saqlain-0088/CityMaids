import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HERO_IMG = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=90'

const trustBadges = [
  { icon: '🛡️', label: 'Fully Insured' },
  { icon: '✅', label: 'Background Checked' },
  { icon: '⭐', label: '4.9★ Rated' },
  { icon: '♻️', label: 'Eco-Friendly' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Premium background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Professional home cleaning"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/72 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>

      {/* Subtle brand glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-brand-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-xl py-28 w-full">
        <div className="max-w-2xl">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/30 text-brand-300 text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
              Trusted by 5,000+ New Yorkers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Your Home,<br />
            <span className="text-gradient">Spotlessly Clean</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl"
          >
            Vetted professionals, eco-friendly products, and guaranteed satisfaction — delivered to your doorstep. Book in under 60 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link to="/booking" className="btn-primary btn-lg text-base shadow-brand-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now — From $79
            </Link>
            <a
              href="https://wa.me/15550001234?text=Hi%2C%20I%20want%20to%20get%20a%20free%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366]/20 border border-[#25D366]/40 text-white font-semibold rounded-xl px-8 py-4 text-base transition-all duration-200 hover:bg-[#25D366] backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Get Free Quote
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map(b => (
              <span key={b.label} className="flex items-center gap-2 text-xs text-slate-300 bg-white/8 border border-white/12 px-3.5 py-2 rounded-full backdrop-blur-sm">
                <span>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
