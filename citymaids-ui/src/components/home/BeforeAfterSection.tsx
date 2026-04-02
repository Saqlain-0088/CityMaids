import { useInView } from '../../hooks/useInView'

const pairs = [
  {
    label: 'Kitchen Deep Clean',
    before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80',
  },
  {
    label: 'Bathroom Restoration',
    before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
  },
  {
    label: 'Living Room Refresh',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  },
]

export default function BeforeAfterSection() {
  const { ref, inView } = useInView()

  return (
    <section className="section bg-slate-900" ref={ref}>
      <div className="container-xl">
        <div className="text-center mb-14">
          <p className="text-brand-400 font-semibold text-xs uppercase tracking-widest mb-3">Real Results</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            See the Difference
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">Every job we do speaks for itself. Here's what our customers experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pairs.map((pair, i) => (
            <div
              key={pair.label}
              className={`rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={pair.before} alt="Before" className="w-full h-48 object-cover" />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Before</span>
                </div>
                <div className="relative">
                  <img src={pair.after} alt="After" className="w-full h-48 object-cover" />
                  <span className="absolute top-2 right-2 bg-brand-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">After</span>
                </div>
              </div>
              <div className="bg-white/5 px-4 py-3 text-center">
                <p className="text-white font-semibold text-sm">{pair.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/booking" className="btn-primary btn-lg">Book Your Transformation</a>
        </div>
      </div>
    </section>
  )
}
