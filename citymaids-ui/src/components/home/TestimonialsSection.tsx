import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const testimonials = [
  { id: 1, name: 'Sarah Johnson', role: 'Homeowner · Manhattan', rating: 5, text: 'CityMaids transformed my apartment. The deep cleaning was absolutely thorough — every corner spotless. I\'ve been using them monthly ever since.', service: 'Deep Cleaning' },
  { id: 2, name: 'James Wilson', role: 'Tenant · Brooklyn', rating: 5, text: 'Incredibly professional team. They arrived on time, worked efficiently, and left my home looking brand new. The move-out clean got my full deposit back.', service: 'Move Out Cleaning' },
  { id: 3, name: 'Emily Chen', role: 'Business Owner · Queens', rating: 5, text: 'Seamless booking and thorough staff. My office has never looked better. I\'ve already set up a recurring weekly schedule.', service: 'Office Cleaning' },
  { id: 4, name: 'Michael Brown', role: 'Homeowner · Staten Island', rating: 5, text: 'The carpet cleaning was exceptional. Stains I thought were permanent are completely gone. Professional, on time, and results exceeded expectations.', service: 'Carpet Cleaning' },
  { id: 5, name: 'Amanda Davis', role: 'Renter · Bronx', rating: 5, text: 'I\'ve tried many cleaning services but CityMaids is by far the best. Consistent quality, reliable staff, and great communication throughout.', service: 'Standard Cleaning' },
  { id: 6, name: 'Robert Martinez', role: 'Contractor · Hoboken', rating: 5, text: 'Used them for post-construction cleanup. They handled everything perfectly — dust, debris, everything. The result was immaculate.', service: 'Post-Construction' },
]

function Stars({ n }: { n: number }) {
  return <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <svg key={i} className={`w-3.5 h-3.5 ${i < n ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
}

export default function TestimonialsSection() {
  const [page, setPage] = useState(0)
  const { ref, inView } = useInView()
  const perPage = 3
  const pages = Math.ceil(testimonials.length / perPage)
  const visible = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <section className="section bg-white">
      <div className="container-xl">
        <motion.div ref={ref as any}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-brand-600 font-semibold text-xs uppercase tracking-widest mb-3">Customer Reviews</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              What Our Clients Say
            </h2>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1"><Stars n={5} /><span className="font-bold text-slate-900 text-sm">4.9 / 5</span></div>
            <p className="text-slate-400 text-xs">Based on 500+ verified reviews</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={page}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {visible.map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <Stars n={t.rating} />
                  <span className="text-xs text-slate-400 font-medium">{t.service}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-700 font-bold text-xs">{t.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2 mt-10">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-500 hover:text-brand-600 disabled:opacity-30 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className={`rounded-full transition-all duration-300 ${page === i ? 'w-6 h-2.5 bg-brand-600' : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-400'}`} />
          ))}
          <button onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page === pages - 1}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-500 hover:text-brand-600 disabled:opacity-30 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
