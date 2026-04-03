import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

const services = [
  {
    id: 1,
    name: 'Standard Cleaning',
    slug: 'standard-cleaning',
    price: 79,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&q=90',
    summary: 'Consistent, reliable cleaning for everyday home maintenance. Perfect for weekly or bi-weekly scheduling.',
    desc: 'Our standard cleaning service covers all the essentials to keep your home consistently fresh. Our trained professionals handle every room with care, using eco-friendly products that are safe for your family and pets.',
    includes: [
      'Vacuuming all floors & area rugs',
      'Mopping hard surface floors',
      'Dusting furniture, shelves & surfaces',
      'Bathroom sanitizing & scrubbing',
      'Kitchen counters, sink & stovetop',
      'Trash removal & bin liners replaced',
    ],
    ideal: 'Homeowners wanting regular upkeep',
    badge: null,
  },
  {
    id: 2,
    name: 'Deep Cleaning',
    slug: 'deep-cleaning',
    price: 149,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=90',
    summary: 'An intensive top-to-bottom clean that reaches every corner, including areas regular cleaning misses.',
    desc: 'Deep cleaning goes far beyond the surface. We tackle inside appliances, baseboards, cabinet interiors, grout lines, and all the hidden areas that accumulate grime over time. Ideal as a first clean or seasonal refresh.',
    includes: [
      'Everything in Standard Cleaning',
      'Inside oven & refrigerator',
      'Baseboards, window sills & ledges',
      'Cabinet interiors & drawer fronts',
      'Grout scrubbing in bathrooms',
      'Light fixtures & ceiling fans',
    ],
    ideal: 'First-time clients or seasonal deep cleans',
    badge: 'Most Popular',
  },
  {
    id: 3,
    name: 'Move In / Move Out',
    slug: 'move-in-out-cleaning',
    price: 199,
    duration: '5 hours',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1000&q=90',
    summary: 'Specialized cleaning for property transitions \u2014 ensuring a spotless handover and full deposit return.',
    desc: 'Moving is stressful enough. Our move-in/move-out service handles the entire property from top to bottom, leaving it in pristine condition for the next occupant or for your final inspection.',
    includes: [
      'Full deep clean of entire property',
      'Inside all appliances',
      'Window & glass cleaning',
      'Wall scuff & spot treatment',
      'Garage & utility area sweep',
      'Final walkthrough & checklist',
    ],
    ideal: 'Tenants & landlords during property transitions',
    badge: null,
  },
  {
    id: 4,
    name: 'Office Cleaning',
    slug: 'office-cleaning',
    price: 129,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=90',
    summary: 'Professional-grade cleaning for offices and commercial spaces that drives productivity.',
    desc: 'A clean workspace creates a better environment for your team and leaves a strong impression on clients. Our commercial cleaning team works around your schedule to minimize disruption.',
    includes: [
      'Desk & workstation sanitizing',
      'Restroom deep clean & restock',
      'Break room & kitchen cleaning',
      'Floor vacuuming & mopping',
      'Trash & recycling management',
      'Reception & common area polish',
    ],
    ideal: 'Small to mid-size offices & commercial spaces',
    badge: null,
  },
  {
    id: 5,
    name: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    price: 99,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1000&q=90',
    summary: 'Advanced hot steam extraction that removes embedded dirt, allergens, stains, and odors.',
    desc: 'Our carpet cleaning service uses professional-grade hot water extraction equipment to deep clean your carpets and rugs. We pre-treat stains and apply deodorizing treatment, leaving your carpets fresh and revitalized.',
    includes: [
      'Pre-treatment stain removal',
      'Hot steam extraction cleaning',
      'Deodorizing & freshening treatment',
      'Pet hair & dander removal',
      'Edge & corner detail cleaning',
      'Quick-dry process',
    ],
    ideal: 'Homes with pets, children, or heavy foot traffic',
    badge: null,
  },
  {
    id: 6,
    name: 'Post-Construction',
    slug: 'post-construction-cleaning',
    price: 249,
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=90',
    summary: 'Eliminate construction dust, debris, and residue \u2014 restoring your space to move-in condition.',
    desc: 'After renovation or new construction, your space needs specialist attention. We remove fine construction dust, debris, paint residue, and adhesive marks, leaving every surface clean and ready for occupancy.',
    includes: [
      'Fine dust & debris removal',
      'Window & glass cleaning',
      'Paint splatter & adhesive removal',
      'Floor restoration & polish',
      'Vent & fixture cleaning',
      'Final inspection & sign-off',
    ],
    ideal: 'Post-renovation or new construction handover',
    badge: null,
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const s = services[active]

  // Just swap content \u2014 no scroll. The sticky tab bar stays visible.
  const selectService = (i: number) => setActive(i)

  return (
    <MainLayout>

      {/* \u2500\u2500 Page Header \u2500\u2500 */}
      <div className="bg-gradient-to-br from-slate-900 to-primary-950 py-16"><div className="container-xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4"><span className="text-primary-400 font-semibold text-xs uppercase tracking-widest">What We Offer</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Professional Cleaning<br />
              <span className="bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent">For Every Situation</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">Six specialist services delivered by vetted, insured professionals. Transparent pricing, guaranteed results.
            </p>
          </div>
        </div>
      </div>

      {/* \u2500\u2500 Tab bar \u2014 STICKY so you can switch without scrolling back up \u2500\u2500 */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="container-xl">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {services.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => selectService(i)}
                className={`relative flex-shrink-0 px-6 py-4 text-sm font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
                  active === i
                    ? 'border-primary-600 text-primary-700 bg-primary-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {item.name}
                {item.badge && (
                  <span className="ml-2 text-xs bg-primary-100 text-primary-700 font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* \u2500\u2500 Service Detail Panel \u2500\u2500 */}
      <section className="bg-white py-16">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  key={s.slug}
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price card */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl border border-slate-100 p-5 hidden md:block">
                <p className="text-xs text-slate-400 font-medium mb-1">Starting from</p>
                <p className="text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  ${s.price}
                </p>
                <p className="text-sm text-slate-400 mt-0.5">per visit \u00B7 {s.duration}</p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:pt-2">
              {s.badge && (
                <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                  {s.badge}
                </span>
              )}

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {s.name}
              </h2>

              <p className="text-primary-600 font-semibold text-sm mb-4">{s.summary}</p>

              <p className="text-slate-600 leading-relaxed mb-8">{s.desc}</p>

              {/* Includes */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {s.includes.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal for */}
              <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 mb-8">
                <svg className="w-4 h-4 text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Ideal for: </span>
                  {s.ideal}
                </p>
              </div>

              {/* Price (mobile) */}
              <div className="flex items-baseline gap-2 mb-6 md:hidden">
                <span className="text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>${s.price}</span>
                <span className="text-slate-400 text-sm">per visit \u00B7 {s.duration}</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={`/booking?service=${s.id}`} className="btn btn-brand btn-lg flex-1 justify-center">
                  Book {s.name}
                </Link>
                <a
                  href={`https://wa.me/15550001234?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(s.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg border border-slate-200 justify-center flex items-center gap-2 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>

              <p className="text-xs text-slate-400 mt-3 text-center sm:text-left">
                Free cancellation 24h before \u00B7 No hidden fees \u00B7 Satisfaction guaranteed
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* \u2500\u2500 Bottom CTA \u2500\u2500 */}
      <section className="bg-white py-16">
        <div className="container-xl">
          <div className="bg-slate-900 rounded-3xl px-8 py-12 sm:px-14 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Not sure which service fits?
              </h2>
              <p className="text-slate-400 text-base">
                Our team will help you choose the right option for your home.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link to="/booking" className="btn btn-brand btn-lg">Book a Service</Link>
              <Link to="/contact" className="btn btn-ghost btn-lg border border-white/20 text-white hover:bg-white/10">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </MainLayout>
  )
}





