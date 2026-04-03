import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

const plans = [
  { name: 'Basic', price: { m: 79, y: 67 }, desc: 'Perfect for regular home maintenance.', color: 'border-slate-200', features: ['Standard cleaning', 'Up to 2 hours', 'Vacuuming & mopping', 'Bathroom cleaning', 'Kitchen wipe-down', 'Trash removal'], missing: ['Inside appliances', 'Deep scrub', 'Priority scheduling'] },
  { name: 'Standard', price: { m: 149, y: 127 }, desc: 'Our most popular deep cleaning package.', popular: true, color: 'border-brand-500', features: ['Everything in Basic', 'Up to 4 hours', 'Inside oven & fridge', 'Baseboards & sills', 'Cabinet interiors', 'Deep scrub bathrooms', 'Window cleaning'], missing: ['Priority scheduling'] },
  { name: 'Premium', price: { m: 249, y: 212 }, desc: 'Complete top-to-bottom transformation.', color: 'border-slate-200', features: ['Everything in Standard', 'Up to 6 hours', 'Post-construction clean', 'Wall spot cleaning', 'Garage sweep', 'Full property clean', 'Priority scheduling'], missing: [] },
]

const faqs = [
  { q: 'Can I cancel or reschedule?', a: 'Yes, free cancellation up to 24 hours before your appointment. Reschedule anytime through your account.' },
  { q: 'Are supplies included?', a: 'Yes, our cleaners bring all necessary supplies and equipment.' },
  { q: 'Is there a contract?', a: 'No contracts. Book as needed or set up recurring cleanings — cancel anytime.' },
  { q: 'What if I am not satisfied?', a: 'We offer a 100% satisfaction guarantee. Contact us within 24 hours and we will re-clean for free.' },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  return (
    <MainLayout>
      <div className='bg-gradient-to-br from-slate-900 to-slate-800 py-20'>
        <div className='container-xl text-center'>
          <span className='inline-block text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3'>Transparent Pricing</span>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-4' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Simple, Honest Pricing</h1>
          <p className='text-slate-300 text-lg max-w-xl mx-auto mb-8'>No hidden fees. No surprises. Choose the plan that works for your home.</p>
          <div className='flex items-center justify-center gap-4'>
            <span className={`text-sm font-semibold ${!yearly ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button onClick={() => setYearly(y => !y)} className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${yearly ? 'bg-brand-500' : 'bg-slate-600'}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${yearly ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-semibold ${yearly ? 'text-white' : 'text-slate-400'}`}>Yearly <span className='text-brand-400 text-xs'>(Save 15%)</span></span>
          </div>
        </div>
      </div>
      <section className='section bg-white'>
        <div className='container-xl max-w-5xl'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-3xl p-8 border-2 ${plan.popular ? 'border-brand-500 shadow-brand' : 'border-slate-200 shadow-soft'} hover:-translate-y-2 transition-all duration-300`}>
                {plan.popular && <div className='absolute -top-4 left-1/2 -translate-x-1/2'><span className='bg-brand-600 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg'>Most Popular</span></div>}
                <h3 className='text-xl font-bold text-slate-900 mb-1'>{plan.name}</h3>
                <p className='text-sm text-slate-400 mb-6'>{plan.desc}</p>
                <div className='mb-8'>
                  <span className='text-5xl font-extrabold text-slate-900' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>${yearly ? plan.price.y : plan.price.m}</span>
                  <span className='text-sm text-slate-400 ml-2'>/ visit</span>
                  {yearly && <p className='text-brand-600 text-xs font-semibold mt-1'>Save ${plan.price.m - plan.price.y}/visit</p>}
                </div>
                <ul className='space-y-3 mb-8'>
                  {plan.features.map(f => (
                    <li key={f} className='flex items-center gap-2.5 text-sm'>
                      <div className='w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0'>
                        <svg className='w-3 h-3 text-brand-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' /></svg>
                      </div>
                      <span className='text-slate-700'>{f}</span>
                    </li>
                  ))}
                  {plan.missing.map(f => (
                    <li key={f} className='flex items-center gap-2.5 text-sm opacity-40'>
                      <div className='w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0'>
                        <svg className='w-3 h-3 text-slate-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                      </div>
                      <span className='text-slate-400'>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to='/booking' className={`block text-center font-bold py-3 rounded-xl transition-colors ${plan.popular ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>Book This Plan</Link>
              </div>
            ))}
          </div>
          <div className='mt-10 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-center'>
            <h3 className='text-2xl font-extrabold text-white mb-2' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Need a Custom Quote?</h3>
            <p className='text-slate-300 mb-5'>Large property or special requirements? We will create a tailored plan for you.</p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Link to='/contact' className='inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors'>Get a Custom Quote</Link>
              <a href='https://wa.me/15550001234' target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#20b858] transition-colors'>Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      <section className='py-16 bg-slate-50'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-extrabold text-slate-900 text-center mb-10' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Pricing FAQs</h2>
          <div className='space-y-3'>
            {faqs.map((faq, i) => (
              <div key={i} className='bg-white border border-slate-200 rounded-2xl overflow-hidden'>
                <button className='w-full flex items-center justify-between p-5 text-left' onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className='font-semibold text-slate-900'>{faq.q}</span>
                  <svg className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
                </button>
                {openFaq === i && <div className='px-5 pb-5 border-t border-slate-100'><p className='text-slate-500 text-sm leading-relaxed pt-4'>{faq.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}