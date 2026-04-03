import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import BeforeAfterSlider from '../ui/BeforeAfterSlider'

const categories = [
  { id: 'kitchen', label: 'Kitchen Cleaning' },
  { id: 'bathroom', label: 'Bathroom Cleaning' },
  { id: 'sofa', label: 'Sofa Cleaning' },
  { id: 'home', label: 'Full Home Cleaning' },
]

const allPairs: Record<string, any[]> = {
  kitchen: [
    { label: 'Stove Deep Clean', sub: 'Greasy surface to mirror finish', before: 'https://images.unsplash.com/photo-1556911223-1049618c6454?w=1200&q=80', after: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80' },
    { label: 'Countertop Restore', sub: 'Stains and clutter removed', before: 'https://images.unsplash.com/photo-1556911223-0599042b4515?w=1200&q=80', after: 'https://images.unsplash.com/photo-1556911223-10496101132a?w=1200&q=80' },
    { label: 'Sink Sanitizing', sub: 'Limescale and grime buildup gone', before: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&q=80', after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80' },
    { label: 'Kitchen Floor Polish', sub: 'Tiled floor restoration', before: 'https://images.unsplash.com/photo-1527515545081-5db8171726a7?w=1200&q=80', after: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1200&q=80' },
  ],
  bathroom: [
    { label: 'Shower Restoration', sub: 'Glass and grout deep clean', before: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&q=80', after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80' },
    { label: 'Tile Deep Clean', sub: 'Brightened and sanitized surfaces', before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80', after: 'https://images.unsplash.com/photo-1584622621111-993a426fbf0a?w=1200&q=80' },
    { label: 'Full Vanity Refresh', sub: 'Clutter-free and polished finish', before: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?w=1200&q=80', after: 'https://images.unsplash.com/photo-1620626011761-9963d7521477?w=1200&q=80' },
    { label: 'Bathtub Scrub', sub: 'Hard water stains removed', before: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&q=80', after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80' },
  ],
  sofa: [
    { label: 'Fabric Stain Removal', sub: 'Deep extraction cleaning', before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', after: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80' },
    { label: 'Upholstery Refresh', sub: 'Color and texture restoration', before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', after: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80' },
    { label: 'Living Room Couch', sub: 'Allergen-free finish', before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', after: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80' },
    { label: 'Pillow and Seat Clean', sub: 'Deep sanitized reset', before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
  ],
  home: [
    { label: 'Full Living Area', sub: 'Dust-free organized space', before: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&q=80', after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
    { label: 'Bedroom Deep Clean', sub: 'Hotel-quality room reset', before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', after: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80' },
    { label: 'Entryway Refresh', sub: 'Clean floors and neat surfaces', before: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80', after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
    { label: 'Comprehensive Restore', sub: 'Total property transformation', before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', after: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80' },
  ],
}

export default function BeforeAfterSection() {
  const { ref, inView } = useInView()
  const [cat, setCat] = useState('kitchen')
  const [active, setActive] = useState(0)

  const pairs = allPairs[cat]
  const p = pairs[active]

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
          <p className="text-slate-400 mt-5 max-w-xl mx-auto text-lg leading-relaxed">
            Choose a category and drag the handle to see how our vetted professionals restore homes to their original shine.
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => { setCat(c.id); setActive(0) }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 border ${
                cat === c.id
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* The Slider Container */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative">
            <BeforeAfterSlider 
              key={`${cat}-${active}`}
              before={p.before} 
              after={p.after} 
              label={`${p.label} — ${p.sub}`} 
            />
            
            {/* Sub-selector for images in category */}
            <div className="flex justify-center gap-3 mt-8">
              {pairs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    active === i ? 'bg-primary-500 w-8' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Show transformation ${i + 1}`}
                />
              ))}
            </div>
          </div>
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
