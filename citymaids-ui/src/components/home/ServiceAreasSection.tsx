import { useInView } from '../../hooks/useInView'

const areas = [
  { name: 'Manhattan', count: '2,100+' },
  { name: 'Brooklyn', count: '1,400+' },
  { name: 'Queens', count: '800+' },
  { name: 'Bronx', count: '400+' },
  { name: 'Staten Island', count: '200+' },
  { name: 'Hoboken, NJ', count: '150+' },
  { name: 'Jersey City', count: '120+' },
  { name: 'Long Island City', count: '180+' },
]

export default function ServiceAreasSection() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-brand-500" />
              <span className="text-brand-600 font-semibold text-xs uppercase tracking-widest">Coverage</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-dark-900 leading-tight mb-5"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              We Serve<br />Your Area
            </h2>
            <p className="text-dark-500 leading-relaxed mb-8">
              CityMaids operates across New York City and surrounding areas. Enter your zip code below to confirm availability in your neighborhood.
            </p>

            {/* Zip checker */}
            <div className="flex gap-2 mb-10">
              <input
                type="text"
                placeholder="Enter your zip code..."
                className="flex-1 input-default"
              />
              <button className="btn btn-brand btn-md px-6 flex-shrink-0">Check</button>
            </div>

            {/* Area list */}
            <div className="grid grid-cols-2 gap-2">
              {areas.map((area, i) => (
                <div
                  key={area.name}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border border-dark-100 bg-dark-50 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 50}ms`, transition: 'opacity 0.4s ease, transform 0.4s ease, border-color 0.2s ease, background-color 0.2s ease' }}
                >
                  <span className="text-sm font-medium text-dark-800">{area.name}</span>
                  <span className="text-xs text-brand-600 font-semibold">{area.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className={`relative transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="rounded-2xl overflow-hidden h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=85"
                alt="New York City skyline"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-dark-900/10 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-dark-100">
                <p className="font-bold text-dark-900 text-sm mb-0.5">New York City & Surroundings</p>
                <p className="text-dark-500 text-xs">5,000+ cleanings completed across 8 service areas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
