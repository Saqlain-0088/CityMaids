import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import BeforeAfterSlider from '../ui/BeforeAfterSlider'

const pairs = [
  {
    label: 'Kitchen Reset',
    sub: 'Grease and grime completely eradicated',
    before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80',
  },
  {
    label: 'Bathroom Polish',
    sub: 'Stubborn grout and limescale gone',
    before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
  },
  {
    label: 'Home Maintenance',
    sub: 'Dust and allergen-free living zones',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
  },
]

export default function BeforeAfterSection() {
  const { ref, inView } = useInView()
  const [active, setActive] = useState(0)

  return (
    <section className="section bg-slate-900 overflow-hidden" ref={ref}>
      <div className="container-xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary-400 font-bold text-xs uppercase tracking-widest mb-4">
            Real Transformations
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            See the <span className="bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent">Difference</span>
          </h2>
          <p className="text-slate-400 mt-5 max-w-xl mx-auto text-lg">
            We don't just clean, we restore. Drag the handle to reveal the power of a professional deep clean.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {pairs.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border ${
                active === i
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* The Slider Container */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <BeforeAfterSlider 
            key={active}
            before={pairs[active].before} 
            after={pairs[active].after} 
            label={pairs[active].sub} 
          />
        </div>

        <div className="text-center mt-12">
          <a href="/booking" className="btn btn-brand btn-lg px-10 rounded-2xl shadow-xl">
            Book Your Transformation
          </a>
        </div>
      </div>
    </section>
  )
}
