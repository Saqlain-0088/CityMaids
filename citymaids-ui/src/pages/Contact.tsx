import { useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { Input, Textarea, Select } from '../components/ui/Input'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))
  const submit = () => { setLoading(true); setTimeout(() => { setLoading(false); setSent(true) }, 1500) }
  return (
    <MainLayout>
      <div className='bg-gradient-to-br from-slate-900 to-slate-800 py-20'>
        <div className='container-xl text-center'>
          <span className='inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3'>Get In Touch</span>
          <h1 className='text-4xl sm:text-5xl font-extrabold text-white mb-4' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Contact Us</h1>
          <p className='text-slate-300 text-lg max-w-xl mx-auto'>Have a question or need a custom quote? We would love to hear from you.</p>
        </div>
      </div>
      <section className='section bg-white'>
        <div className='container-xl max-w-6xl'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-12'>
            <div className='lg:col-span-2 space-y-6'>
              <div>
                <h2 className='text-2xl font-extrabold text-slate-900 mb-3' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>We are Here to Help</h2>
                <p className='text-slate-500 leading-relaxed'>Our team is available 7 days a week to answer your questions and help you book the perfect cleaning service.</p>
              </div>
              {[{ icon: 'ðŸ“', title: 'Our Office', value: '123 Clean Street, New York, NY 10001', sub: 'Monâ€“Fri: 8AMâ€“8PM' }, { icon: 'ðŸ“ž', title: 'Phone', value: '+1 (555) 000-1234', sub: 'Available 7 days a week' }, { icon: 'âœ‰ï¸', title: 'Email', value: 'hello@citymaids.com', sub: 'We reply within 2 hours' }, { icon: 'ðŸ’¬', title: 'WhatsApp', value: '+1 (555) 000-1234', sub: 'Instant response' }].map(item => (
                <div key={item.title} className='flex items-start gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-primary-50 transition-colors group'>
                  <div className='w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-500 flex items-center justify-center text-xl flex-shrink-0 transition-colors'>{item.icon}</div>
                  <div><p className='font-bold text-slate-900 text-sm'>{item.title}</p><p className='text-slate-700 text-sm font-medium'>{item.value}</p><p className='text-slate-400 text-xs mt-0.5'>{item.sub}</p></div>
                </div>
              ))}
              <a href='https://wa.me/15550001234?text=Hi%2C%20I%20want%20to%20book%20a%20cleaning%20service' target='_blank' rel='noopener noreferrer'
                className='flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 rounded-2xl hover:bg-[#20b858] transition-colors w-full'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/></svg>
                Chat on WhatsApp
              </a>
              <div className='bg-slate-100 rounded-2xl overflow-hidden h-48'>
                <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300'>
                  <div className='text-center'><p className='text-4xl mb-2'>ðŸ“</p><p className='text-slate-600 font-semibold text-sm'>123 Clean Street, New York</p><p className='text-slate-400 text-xs'>Google Maps</p></div>
                </div>
              </div>
            </div>
            <div className='lg:col-span-3'>
              <div className='bg-white rounded-3xl border border-slate-100 shadow-soft p-7 sm:p-8'>
                {sent ? (
                  <div className='text-center py-12'>
                    <div className='w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-5'>
                      <svg className='w-10 h-10 text-primary-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg>
                    </div>
                    <h3 className='text-2xl font-extrabold text-slate-900 mb-2' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Message Sent!</h3>
                    <p className='text-slate-500 mb-6'>We will get back to you within 2 hours.</p>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }} className='btn-primary'>Send Another Message</button>
                  </div>
                ) : (
                  <div className='space-y-5'>
                    <h3 className='text-xl font-extrabold text-slate-900 mb-2' style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Send a Message</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <Input label='Full Name' placeholder='John Smith' value={form.name} required onChange={e => set('name', e.target.value)} />
                      <Input label='Email Address' type='email' placeholder='john@example.com' value={form.email} required onChange={e => set('email', e.target.value)} />
                    </div>
                    <Input label='Phone Number' placeholder='+1 555-0000' value={form.phone} onChange={e => set('phone', e.target.value)} hint='Optional' />
                    <Select label='Subject' value={form.subject} required onChange={e => set('subject', e.target.value)} placeholder='Select a subject' options={[{ value: 'booking', label: 'Booking Inquiry' }, { value: 'quote', label: 'Custom Quote' }, { value: 'support', label: 'Customer Support' }, { value: 'feedback', label: 'Feedback' }, { value: 'other', label: 'Other' }]} />
                    <Textarea label='Message' placeholder='Tell us how we can help you...' value={form.message} required rows={5} onChange={e => set('message', e.target.value)} hint='Minimum 20 characters' />
                    <button onClick={submit} disabled={loading || !form.name || !form.email || !form.message} className='btn-primary w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed'>
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
