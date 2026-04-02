export interface Review {
  id: number
  customerName: string
  customerAvatar: string
  serviceName: string
  rating: number
  comment: string
  date: string
  status: 'pending' | 'approved' | 'rejected'
  staffName: string
}

export const reviews: Review[] = [
  { id: 1, customerName: 'Sarah Johnson', customerAvatar: 'SJ', serviceName: 'Deep Cleaning', rating: 5, comment: 'Absolutely amazing service! Maria was thorough, professional, and left my home spotless. Will definitely book again.', date: '2026-04-06', status: 'approved', staffName: 'Maria Garcia' },
  { id: 2, customerName: 'Emily Chen', customerAvatar: 'EC', serviceName: 'Move In/Out Cleaning', rating: 5, comment: 'David did an incredible job with our move-out cleaning. Got our full deposit back thanks to the spotless condition!', date: '2026-04-04', status: 'approved', staffName: 'David Kim' },
  { id: 3, customerName: 'Michael Brown', customerAvatar: 'MB', serviceName: 'Office Cleaning', rating: 4, comment: 'Great service overall. The office looks much better. A few spots were missed but nothing major.', date: '2026-04-02', status: 'approved', staffName: 'Lisa Park' },
  { id: 4, customerName: 'Amanda Davis', customerAvatar: 'AD', serviceName: 'Carpet Cleaning', rating: 5, comment: 'Carlos removed stains I thought were permanent. The carpets look brand new. Highly recommend!', date: '2026-04-08', status: 'pending', staffName: 'Carlos Rivera' },
  { id: 5, customerName: 'Robert Martinez', customerAvatar: 'RM', serviceName: 'Standard Cleaning', rating: 3, comment: 'Service was okay but took longer than expected. The team was friendly though.', date: '2026-03-21', status: 'pending', staffName: 'Maria Garcia' },
  { id: 6, customerName: 'Jennifer Lee', customerAvatar: 'JL', serviceName: 'Standard Cleaning', rating: 2, comment: 'Not satisfied with the result. Several areas were not cleaned properly.', date: '2026-02-11', status: 'rejected', staffName: 'Aisha Patel' },
  { id: 7, customerName: 'David Thompson', customerAvatar: 'DT', serviceName: 'Deep Cleaning', rating: 5, comment: 'Best cleaning service in NYC! Extremely detailed and professional. My apartment has never looked this good.', date: '2026-03-29', status: 'approved', staffName: 'Lisa Park' },
]
