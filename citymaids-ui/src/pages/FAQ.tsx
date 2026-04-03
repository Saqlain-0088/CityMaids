import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

const categories = [
  { title: 'Booking & Scheduling', icon: '📅', faqs: [
    { q: 'How do I book a cleaning service?', a: 'Click "Book Now", select your service, choose a date and time, fill in your details, and confirm. The whole process takes under 2 minutes.' },
    { q: 'Can I book same-day cleaning?', a: 'Yes! We offer same-day bookings subject to availability. Book before 10 AM for same-day service in most areas.' },
    { q: 'Can I reschedule or cancel?', a: 'Yes. You can reschedule or cancel up to 24 hours before your appointment without any charge.' },
    { q: 'Do I need to be home during the cleaning?', a: 'No. Many customers provide access instructions. Our cleaners are fully insured and trusted.' },
  ]},
  { title: 'Our Cleaners', icon: '👥', faqs: [
    { q: 'Are your cleaners background-checked?', a: 'Yes. Every CityMaids cleaner goes through a thorough background check, identity verification, and in-person interview.' },
    { q: 'Are your cleaners insured?', a: 'All our cleaners are fully insured and bonded. In the unlikely event of any damage, you are fully protected.' },
    { q: 'Will I get the same cleaner each time?', a: 'We try our best to send the same cleaner for recurring bookings. You can also request a specific cleaner.' },
  ]},
  { title: 'Services & Supplies', icon: '🧹', faqs: [
    { q: 'Do I need to provide cleaning supplies?', a: 'No. Our cleaners bring all necessary supplies and equipment. If you prefer specific products, let us know in the booking notes.' },
    { q: 'Do you use eco-friendly products?', a: 'Yes. We use environmentally responsible, non-toxic products that are safe for children, pets, and the planet.' },
    { q: 'How long does a cleaning take?', a: 'Standard: 2-3 hours. Deep cleaning: 4-6 hours. Move-in/out: 5-7 hours. Times vary based on home size.' },
  ]},
  { title: 'Pricing & Payment', icon: '💳', faqs: [
    { q: 'Are there any hidden fees?', a: 'Never. The price you see is the price you pay. No hidden charges, no surprise fees after the service.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, Apple Pay, Google Pay, and bank transfers.' },
    { q: 'What if I am not satisfied?', a: 'We offer a 100% satisfaction guarantee. Contact us within 24 hours and we will send a team back to re-clean at no extra charge.' },
  ]},
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors">
        <span className="font-semibold text-slate-900 pr-4 text-sm sm:text-base">{q}</span>
        <svg className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="px-6 pb-5 border-t border-slate-100">
          <p className="text-slate-500 text-sm leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0)
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="container-xl text-center">
          <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Help Center</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Frequently Asked Questions</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">Everything you need to know about CityMaids.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat, i) => (
              <button key={cat.title} onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === i ? 'bg-primary-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                <span>{cat.icon}</span>{cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {categories[activeCategory].faqs.map((faq, i) => (
              <AccordionItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div className="mt-12 bg-primary-50 border border-brand-100 rounded-3xl p-8 text-center">
            <p className="text-2xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Still have questions?</p>
            <p className="text-slate-500 mb-6">Our team is available 7 days a week to help you.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn-primary">Contact Us</Link>
              <a href="https://wa.me/15550001234" target="_blank" rel="noopener noreferrer" className="btn-secondary">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

