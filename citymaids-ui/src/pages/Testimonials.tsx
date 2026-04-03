import MainLayout from '../components/layout/MainLayout'
import { useInView } from '../hooks/useInView'
import { Link } from 'react-router-dom'

const testimonials = [
  { id: 1, name: 'Sarah Johnson', location: 'Manhattan, NY', rating: 5, comment: 'CityMaids transformed my apartment! The deep cleaning was absolutely thorough. Every corner was spotless. I have been using them monthly ever since.', service: 'Deep Cleaning', avatar: 'SJ', color: 'from-blue-400 to-blue-600' },
  { id: 2, name: 'James Wilson', location: 'Brooklyn, NY', rating: 5, comment: 'Incredibly professional team. They arrived on time, worked efficiently, and left my home looking brand new. The move-out clean got my full deposit back!', service: 'Move Out Cleaning', avatar: 'JW', color: 'from-green-400 to-green-600' },
  { id: 3, name: 'Emily Chen', location: 'Queens, NY', rating: 5, comment: 'The booking process was so easy and the staff was friendly and thorough. My office has never looked better. Will definitely book again!', service: 'Office Cleaning', avatar: 'EC', color: 'from-purple-400 to-purple-600' },
  { id: 4, name: 'Michael Brown', location: 'Staten Island, NY', rating: 5, comment: 'Great service overall. The team was professional and did a fantastic job on our carpets. Stains I thought were permanent are completely gone.', service: 'Carpet Cleaning', avatar: 'MB', color: 'from-amber-400 to-amber-600' },
  { id: 5, name: 'Amanda Davis', location: 'Bronx, NY', rating: 5, comment: 'I have tried many cleaning services but CityMaids is by far the best. Consistent quality, reliable staff, and great communication throughout.', service: 'Standard Cleaning', avatar: 'AD', color: 'from-rose-400 to-rose-600' },
  { id: 6, name: 'Robert Martinez', location: 'Hoboken, NJ', rating: 5, comment: 'Used them for post-construction cleanup after our renovation. They handled everything perfectly. Saved us so much time and stress.', service: 'Post-Construction', avatar: 'RM', color: 'from-teal-400 to-teal-600' },
  { id: 7, name: 'Linda Thompson', location: 'Jersey City, NJ', rating: 5, comment: 'Absolutely love CityMaids! They are punctual, thorough, and always leave my home smelling fresh. Best cleaning service in the area.', service: 'Standard Cleaning', avatar: 'LT', color: 'from-indigo-400 to-indigo-600' },
  { id: 8, name: 'David Kim', location: 'Manhattan, NY', rating: 5, comment: 'The deep cleaning before my parents visit was perfect. Every surface was spotless. The team was respectful and efficient. Highly recommend!', service: 'Deep Cleaning', avatar: 'DK', color: 'from-cyan-400 to-cyan-600' },
]

function Stars({ n }: { n: number }) {
  return <div className='flex gap-0.5'>{Array.from({ length: 5 }).map((_, i) => <svg key={i} className={`w-4 h-4 ${i < n ? 'text-yellow-400' : 'text-slate-200'}`} fill='currentColor' viewBox='0 0 20 20'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>)}</div>
}

export default function Testimonials() {
  const { ref, inView } = useInView()
  const avg = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
  return (
    <MainLayout>
      <div className='bg-gradient-to-br from-slate-900 to-slate-800 py-20'>
        <div className='container-xl text-center'>
          <span className='inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3'>Customer Reviews</span>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-4' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>What Our Customers Say</h1>
          <div className='flex items-center justify-center gap-3 mt-4'>
            <Stars n={5} />
            <span className='text-white font-bold text-lg'>{avg} / 5</span>
            <span className='text-slate-400 text-sm'>based on 500+ reviews</span>
          </div>
        </div>
      </div>
      <section ref={ref} className='section bg-white'>
        <div className='container-xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {testimonials.map((item, i) => (
              <div key={item.id} className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className='flex items-center justify-between mb-3'><Stars n={item.rating} /><span className='text-xs text-slate-400 font-medium bg-slate-100 px-2.5 py-1 rounded-full'>{item.service}</span></div>
                <p className='text-slate-600 text-sm leading-relaxed mb-5'>"{item.comment}"</p>
                <div className='flex items-center gap-3 pt-4 border-t border-slate-100'>
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}>{item.avatar}</div>
                  <div><p className='font-bold text-slate-900 text-sm'>{item.name}</p><p className='text-xs text-slate-400'>{item.location}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-14 bg-primary-50 border border-brand-100 rounded-3xl p-8 sm:p-12 text-center'>
            <p className='text-2xl font-extrabold text-slate-900 mb-2' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Ready to experience the difference?</p>
            <p className='text-slate-500 mb-6'>Join 5,000+ happy customers across New York City.</p>
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Link to='/booking' className='btn-primary btn-lg'>Book Now</Link>
              <a href='https://wa.me/15550001234' target='_blank' rel='noopener noreferrer' className='btn-secondary btn-lg'>Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
