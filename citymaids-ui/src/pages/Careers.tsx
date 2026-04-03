import { useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import Button from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'

const openings = [
  { title: 'Professional Cleaner', type: 'Full-time / Part-time', location: 'New York City', desc: 'Join our team of professional cleaners. Flexible hours, competitive pay, and a supportive team environment.' },
  { title: 'Senior Cleaner / Team Lead', type: 'Full-time', location: 'Manhattan, NY', desc: 'Lead a small team of cleaners on larger jobs. Experience required. Higher pay and leadership opportunities.' },
  { title: 'Customer Support Specialist', type: 'Full-time', location: 'Remote', desc: 'Help our customers with bookings, questions, and concerns. Excellent communication skills required.' },
]

export default function Careers() {
  const [applied, setApplied] = useState(false)
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="container-xl text-center">
          <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Join Our Team</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Careers at CityMaids</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">Build a rewarding career with flexible hours, great pay, and a supportive team.</p>
        </div>
      </div>
      <section className="section bg-white">
        <div className="container-xl max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Open Positions</h2>
          <div className="space-y-4 mb-12">
            {openings.map(job => (
              <div key={job.title} className="card p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1 mb-2">
                    <span className="badge badge-brand">{job.type}</span>
                    <span className="badge badge-dark">Ã°Å¸â€œÂ {job.location}</span>
                  </div>
                  <p className="text-sm text-slate-500">{job.desc}</p>
                </div>
                <Button size="sm" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>Apply Now</Button>
              </div>
            ))}
          </div>

          <div id="apply" className="card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Apply Now</h2>
            {applied ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Application Submitted!</h3>
                <p className="text-slate-500 text-sm">We'll review your application and get back to you within 3Ã¢â‚¬â€œ5 business days.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" placeholder="Your name" />
                  <Input label="Email" type="email" placeholder="your@email.com" />
                </div>
                <Input label="Phone" placeholder="+1 555-0000" />
                <Input label="Position Applying For" placeholder="e.g. Professional Cleaner" />
                <Textarea label="Why do you want to join CityMaids?" placeholder="Tell us about yourself..." rows={4} />
                <Button fullWidth size="lg" onClick={() => setApplied(true)}>Submit Application</Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

