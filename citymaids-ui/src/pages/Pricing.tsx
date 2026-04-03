import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

// ── Data ─────────────────────────────────────────────────────────────────────

const homePlans = [
  {
    property: 'Studio',
    icon: '🏠',
    standard: 149,
    deep: 249,
    moveInOut: 349,
    duration: { standard: '2–3 hrs', deep: '3–4 hrs', moveInOut: '4–5 hrs' },
  },
  {
    property: '1 BHK',
    icon: '🛏️',
    standard: 199,
    deep: 329,
    moveInOut: 449,
    duration: { standard: '3–4 hrs', deep: '4–5 hrs', moveInOut: '5–6 hrs' },
    popular: true,
  },
  {
    property: '2 BHK',
    icon: '🛏️🛏️',
    standard: 279,
    deep: 449,
    moveInOut: 599,
    duration: { standard: '4–5 hrs', deep: '5–6 hrs', moveInOut: '6–7 hrs' },
  },
  {
    property: '3 BHK',
    icon: '🏡',
    standard: 349,
    deep: 549,
    moveInOut: 749,
    duration: { standard: '5–6 hrs', deep: '6–7 hrs', moveInOut: '7–8 hrs' },
  },
  {
    property: '4 BHK',
    icon: '🏡',
    standard: 429,
    deep: 649,
    moveInOut: 899,
    duration: { standard: '6–7 hrs', deep: '7–8 hrs', moveInOut: '8–9 hrs' },
  },
  {
    property: 'Villa / Duplex',
    icon: '🏰',
    standard: 599,
    deep: 899,
    moveInOut: 1199,
    duration: { standard: '7–8 hrs', deep: '8–10 hrs', moveInOut: '10–12 hrs' },
  },
]

const homeServiceTypes = [
  {
    key: 'standard',
    label: 'Standard Clean',
    desc: 'Regular maintenance cleaning for a consistently fresh home.',
    includes: ['Vacuuming & mopping', 'Bathroom sanitizing', 'Kitchen wipe-down', 'Dusting surfaces', 'Trash removal'],
  },
  {
    key: 'deep',
    label: 'Deep Clean',
    desc: 'Intensive top-to-bottom clean reaching every corner.',
    includes: ['Everything in Standard', 'Inside oven & fridge', 'Baseboards & sills', 'Cabinet interiors', 'Grout scrubbing'],
    popular: true,
  },
  {
    key: 'moveInOut',
    label: 'Move In / Out',
    desc: 'Spotless handover — maximize your deposit return.',
    includes: ['Full deep clean', 'Inside all appliances', 'Window cleaning', 'Wall spot treatment', 'Final walkthrough'],
  },
]

const officePlans = [
  { size: 'Small', sqft: 'Up to 500 sq ft', standard: 249, deep: 399, team: '1 professional', duration: '2–3 hrs' },
  { size: 'Medium', sqft: '500 – 1,500 sq ft', standard: 399, deep: 599, team: '2 professionals', duration: '3–5 hrs', popular: true },
  { size: 'Large', sqft: '1,500 – 3,000 sq ft', standard: 599, deep: 899, team: '3 professionals', duration: '5–7 hrs' },
  { size: 'Enterprise', sqft: '3,000+ sq ft', standard: null, deep: null, team: 'Dedicated team', duration: 'Custom' },
]

const specialtyServices = [
  { name: 'Carpet Cleaning', unit: 'per room', price: 149, icon: '🛋️', desc: 'Hot steam extraction, stain treatment & deodorizing' },
  { name: 'Carpet Cleaning', unit: 'full home', price: 449, icon: '🏠', desc: 'Complete home carpet deep clean & refresh' },
  { name: 'Post-Construction', unit: 'flat rate', price: 699, icon: '🔨', desc: 'Dust, debris & paint splatter removal after renovation' },
  { name: 'Window Cleaning', unit: 'interior', price: 199, icon: '🪟', desc: 'Streak-free interior window & glass cleaning' },
  { name: 'Sofa / Upholstery', unit: 'per sofa', price: 249, icon: '🛋️', desc: 'Deep clean & deodorize sofas and upholstered furniture' },
]

const addOns = [
  { name: 'Inside Fridge', price: 75, icon: '🧊' },
  { name: 'Inside Oven', price: 60, icon: '🔥' },
  { name: 'Laundry (wash + fold)', price: 99, icon: '👕' },
  { name: 'Balcony / Terrace', price: 89, icon: '🌿' },
  { name: 'Same-Day Booking', price: 59, icon: '⚡' },
]

const tabs = [
  { key: 'home', label: 'Home Cleaning', icon: '🏠' },
  { key: 'office', label: 'Office / Commercial', icon: '🏢' },
  { key: 'specialty', label: 'Specialty Services', icon: '✨' },
]

// ── Component ─────────────────────────────────────────────────────────────────

function CheckIcon({ color = 'text-teal-600' }: { color?: string }) {
  return (
    <svg className={`w-4 h-4 ${color} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('home')
  const [homeService, setHomeService] = useState('deep')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const selectedService = homeServiceTypes.find(s => s.key === homeService)!

  const faqs = [
    { q: 'Are VAT / taxes included in the prices?', a: 'All prices shown are inclusive of VAT. No hidden charges.' },
    { q: 'Can I cancel or reschedule?', a: 'Yes, free cancellation up to 24 hours before your appointment. Reschedule anytime.' },
    { q: 'Do you bring your own supplies?', a: 'Yes, our professionals bring all cleaning supplies and equipment.' },
    { q: 'How do I pay?', a: 'We accept all major credit/debit cards, Apple Pay, and cash on delivery.' },
    { q: 'What if I am not satisfied?', a: '100% satisfaction guarantee — we re-clean for free within 24 hours.' },
  ]

  return (
    <MainLayout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 py-20">
        <div className="container-xl text-center">
          <span className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-400/30 text-primary-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Simple, Honest Pricing
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            All prices in AED. No hidden fees. No surprises. VAT included.
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="container-xl">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 flex-shrink-0 px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-primary-600 text-primary-700 bg-primary-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section bg-slate-50">
        <div className="container-xl">

          {/* ── HOME CLEANING ── */}
          {activeTab === 'home' && (
            <div>
              {/* Service type selector */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {homeServiceTypes.map(s => (
                  <button
                    key={s.key}
                    onClick={() => setHomeService(s.key)}
                    className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold border-2 transition-all duration-200 ${
                      homeService === s.key
                        ? 'border-primary-500 bg-primary-600 text-white shadow-blue'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-primary-300 hover:text-primary-700'
                    }`}
                  >
                    {s.popular && homeService !== s.key && (
                      <span className="absolute -top-2.5 -right-2 bg-cta-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Popular</span>
                    )}
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Service description */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{selectedService.label}</h3>
                  <p className="text-slate-500 text-sm">{selectedService.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedService.includes.map(item => (
                    <span key={item} className="inline-flex items-center gap-1.5 text-xs bg-teal-50 text-teal-700 border border-teal-100 px-2.5 py-1 rounded-full font-medium">
                      <CheckIcon color="text-teal-500" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {homePlans.map(plan => {
                  const price = plan[homeService as keyof typeof plan] as number
                  const duration = plan.duration[homeService as keyof typeof plan.duration]
                  return (
                    <div
                      key={plan.property}
                      className={`relative bg-white rounded-3xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                        plan.popular ? 'border-primary-400 shadow-blue' : 'border-slate-100 shadow-card'
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-blue">
                          Most Popular
                        </span>
                      )}

                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-2xl flex-shrink-0">
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            {plan.property}
                          </h3>
                          <p className="text-slate-400 text-xs">⏱ {duration} · 2 professionals</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-slate-400 font-medium">AED</span>
                          <span className="text-4xl font-extrabold text-primary-600" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            {price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs mt-0.5">per visit · VAT included</p>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {selectedService.includes.map(item => (
                          <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckIcon />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Link
                        to={`/booking?service=1`}
                        className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-2xl transition-all duration-200 text-sm shadow-blue"
                      >
                        Book Now
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── OFFICE / COMMERCIAL ── */}
          {activeTab === 'office' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Office & Commercial Cleaning
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto">
                  Professional cleaning for offices, retail spaces, and commercial properties. Scheduled around your business hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                {officePlans.map(plan => (
                  <div
                    key={plan.size}
                    className={`relative bg-white rounded-3xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                      plan.popular ? 'border-primary-400 shadow-blue' : 'border-slate-100 shadow-card'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-blue">
                        Most Popular
                      </span>
                    )}

                    <div className="mb-4">
                      <h3 className="font-bold text-slate-900 text-xl mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        {plan.size}
                      </h3>
                      <p className="text-slate-400 text-xs">{plan.sqft}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-400 font-medium mb-1">Standard Clean</p>
                        {plan.standard ? (
                          <p className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            <span className="text-sm font-semibold text-slate-500">AED </span>{plan.standard.toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-lg font-bold text-primary-600">Custom Quote</p>
                        )}
                      </div>
                      <div className="bg-primary-50 rounded-xl p-3 border border-primary-100">
                        <p className="text-xs text-primary-500 font-medium mb-1">Deep Clean</p>
                        {plan.deep ? (
                          <p className="text-2xl font-extrabold text-primary-700" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            <span className="text-sm font-semibold text-primary-400">AED </span>{plan.deep.toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-lg font-bold text-primary-600">Custom Quote</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-6 text-xs text-slate-500">
                      <div className="flex items-center gap-2"><CheckIcon color="text-teal-500" />{plan.team}</div>
                      <div className="flex items-center gap-2"><CheckIcon color="text-teal-500" />⏱ {plan.duration}</div>
                      <div className="flex items-center gap-2"><CheckIcon color="text-teal-500" />All supplies included</div>
                    </div>

                    {plan.standard ? (
                      <Link to="/booking?service=4" className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-2xl transition-all duration-200 text-sm shadow-blue">
                        Book Now
                      </Link>
                    ) : (
                      <Link to="/contact" className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl transition-all duration-200 text-sm">
                        Get Custom Quote
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Office inclusions */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-8">
                <h3 className="font-bold text-slate-900 text-lg mb-5">All office packages include:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {['Desk & workstation sanitizing', 'Restroom deep clean & restock', 'Break room & kitchen cleaning', 'Floor vacuuming & mopping', 'Trash & recycling management', 'Reception & common area polish'].map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckIcon />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SPECIALTY SERVICES ── */}
          {activeTab === 'specialty' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Specialty Services
                </h2>
                <p className="text-slate-500 max-w-lg mx-auto">
                  Targeted cleaning solutions for specific needs. Can be booked standalone or added to any package.
                </p>
              </div>

              {/* Specialty cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                {specialtyServices.map(s => (
                  <div key={s.name + s.unit} className="bg-white rounded-3xl border-2 border-slate-100 shadow-card p-6 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl flex-shrink-0">
                        {s.icon}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">{s.unit}</p>
                        <p className="text-2xl font-extrabold text-primary-600" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                          <span className="text-sm font-semibold text-slate-400">AED </span>{s.price}
                        </p>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{s.name}</h3>
                    <p className="text-slate-500 text-sm mb-5">{s.desc}</p>
                    <Link to="/booking" className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-2xl transition-all duration-200 text-sm shadow-blue">
                      Book Now
                    </Link>
                  </div>
                ))}
              </div>

              {/* Add-ons */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cta-50 border border-cta-100 flex items-center justify-center text-xl">➕</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Add-Ons</h3>
                    <p className="text-slate-400 text-sm">Add to any booking at checkout</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {addOns.map(a => (
                    <div key={a.name} className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{a.icon}</span>
                        <span className="text-sm font-semibold text-slate-700">{a.name}</span>
                      </div>
                      <span className="text-sm font-bold text-primary-600 flex-shrink-0 ml-2">+AED {a.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Custom quote CTA */}
          <div className="mt-14 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Need a Custom Quote?
            </h3>
            <p className="text-primary-100 mb-6 max-w-md mx-auto">
              Large property, recurring contract, or special requirements? We'll create a tailored plan for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-primary-50 transition-colors shadow-lg text-sm">
                Get Custom Quote
              </Link>
              <a href="https://wa.me/15550001234" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-[#20b858] transition-colors shadow-lg text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-14 max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Pricing FAQs
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                    <svg className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 border-t border-slate-100">
                      <p className="text-slate-500 text-sm leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}
