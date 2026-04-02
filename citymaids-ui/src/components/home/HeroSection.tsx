import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FALLBACK = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=90'
const VIDEO    = 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4'

function useIsMobile() {
  const [m, setM] = useState(false)
  useEffect(() => { const fn = () => setM(window.innerWidth < 768); fn(); window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn) }, [])
  return m
}

const trustBadges = ['Fully Insured', 'Background Checked', '4.9★ Rated', 'Eco-Friendly']

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => { if (videoRef.current && !isMobile) videoRef.current.play().catch(() => setError(true)) }, [isMobile])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background */}
      {!isMobile && !error && (
        <video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay muted loop playsInline poster={FALLBACK}
          onCanPlay={() => setLoaded(true)} onError={() => setError(true)}>
          <source src={VIDEO} type="video/mp4" />
        </video>
      )}
      <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${!isMobile && !error && loaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${FALLBACK})` }} />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

      {/* Subtle green glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-xl py-24 w-full">
        <div className="max-w-2xl">

          {/* Tag */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/25 text-brand-300 text-sm font-medium px-4 py-2 rounded-full mb-7">
              <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
              Trusted by 5,000+ New Yorkers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Professional<br />
            <span className="text-gradient">Home Cleaning</span><br />
            Services
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl"
          >
            Vetted professionals, eco-friendly products, and guaranteed satisfaction — all at your doorstep. Book in under 60 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link to="/booking" className="btn-primary btn-lg text-base shadow-brand-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Book Now — From $79
            </Link>
            <a href="https://wa.me/15550001234" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold rounded-xl px-8 py-4 text-base transition-all duration-200 hover:bg-white/10 backdrop-blur-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map(b => (
              <span key={b} className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <svg className="w-3 h-3 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 bg-white/8 backdrop-blur-md border border-white/10 rounded-t-2xl overflow-hidden"
          >
            {[['5,000+', 'Happy Customers'], ['4.9★', 'Average Rating'], ['200+', 'Vetted Cleaners'], ['100%', 'Satisfaction']].map(([v, l], i) => (
              <div key={l} className={`px-6 py-5 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}>
                <p className="text-xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{v}</p>
                <p className="text-slate-400 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
