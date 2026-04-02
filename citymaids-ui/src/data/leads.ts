export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost'

export interface Lead {
  id: number
  name: string
  email: string
  phone: string
  serviceInterest: string
  message: string
  source: string
  status: LeadStatus
  createdAt: string
  assignedTo?: string
}

export const leads: Lead[] = [
  { id: 1, name: 'Patricia Moore', email: 'patricia@example.com', phone: '+1 555-2001', serviceInterest: 'Deep Cleaning', message: 'Looking for a one-time deep clean before hosting a family event next weekend.', source: 'Contact Form', status: 'new', createdAt: '2026-04-01 09:15' },
  { id: 2, name: 'Kevin Anderson', email: 'kevin@example.com', phone: '+1 555-2002', serviceInterest: 'Office Cleaning', message: 'We need weekly office cleaning for a 10-person startup. Please send pricing.', source: 'Website', status: 'contacted', createdAt: '2026-03-30 14:22', assignedTo: 'Admin' },
  { id: 3, name: 'Linda Taylor', email: 'linda@example.com', phone: '+1 555-2003', serviceInterest: 'Move In/Out Cleaning', message: 'Moving out of my apartment on April 15th. Need full move-out cleaning.', source: 'Google Ads', status: 'converted', createdAt: '2026-03-28 11:05', assignedTo: 'Admin' },
  { id: 4, name: 'Steven Harris', email: 'steven@example.com', phone: '+1 555-2004', serviceInterest: 'Post-Construction Cleaning', message: 'Just finished a kitchen renovation. Need post-construction cleaning ASAP.', source: 'Referral', status: 'new', createdAt: '2026-04-01 16:40' },
  { id: 5, name: 'Nancy White', email: 'nancy@example.com', phone: '+1 555-2005', serviceInterest: 'Standard Cleaning', message: 'Interested in bi-weekly cleaning for a 3-bedroom apartment.', source: 'Instagram', status: 'contacted', createdAt: '2026-03-29 10:30', assignedTo: 'Admin' },
  { id: 6, name: 'George Clark', email: 'george@example.com', phone: '+1 555-2006', serviceInterest: 'Carpet Cleaning', message: 'Need carpet cleaning for living room and two bedrooms.', source: 'Contact Form', status: 'lost', createdAt: '2026-03-25 08:55' },
  { id: 7, name: 'Betty Lewis', email: 'betty@example.com', phone: '+1 555-2007', serviceInterest: 'Deep Cleaning', message: 'Looking for a reliable cleaning company for monthly deep cleans.', source: 'Yelp', status: 'new', createdAt: '2026-04-01 13:10' },
]
