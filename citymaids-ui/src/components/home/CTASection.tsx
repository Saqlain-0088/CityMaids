import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const CTA_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90'

export default function CTASection() {
  const { ref, inView } = useInView()

  return (
    <section className="section bg-white">
      <div className="container-xl">
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden min-h-[480px] flex items-center"
        >
          <div className="absolute inset-0">
            <img src={CTA_IMG} alt="Spotless modern home" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30" />
          </div>

          <div className="relative px-8 py-16 sm:px-14 sm:py-20 max-w-2xl w-full">
            <span className="inline-flex items-center gap-2 bg-cta-500/20 border border-cta-400/40 text-cta-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-cta-400 rounded-full animate-pulse" />
              Only 3 slots left today
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Book Your Cleaning<br />
              <span className="bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent">Today</span>
            </h2>

            <p className="text-slate-300 text-lg mb-3">
              Get <span className="text-white font-bold">10% off</span> your first cleaning.
            </p>
            <p className="text-slate-400 text-sm mb-10">
              Use code{' '}
              <span className="bg-white/10 text-white font-bold px-2.5 py-1 rounded-lg border border-white/20 text-xs tracking-wider">
                FIRST10
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link to="/booking"
                className="inline-flex items-center justify-center gap-2 bg-cta-500 hover:bg-cta-600 text-white font-bold rounded-2xl px-8 py-4 text-base transition-all duration-200 shadow-cta hover:-translate-y-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Now
              </Link>
              <a href="https://wa.me/15550001234" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 text-white font-semibold rounded-2xl px-8 py-4 text-base transition-all duration-200 hover:bg-[#25D366]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-5">
              {['Secure booking', 'Free cancellation 24h before', 'Insured & vetted cleaners'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-slate-400">
                  <svg className="w-3.5 h-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
