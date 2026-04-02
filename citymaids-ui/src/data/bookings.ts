export type BookingStatus = 'pending' | 'confirmed' | 'assigned' | 'in_progress' | 'completed'

export interface Booking {
  id: number
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceName: string
  serviceId: number
  scheduledAt: string
  address: string
  notes?: string
  status: BookingStatus
  staffName?: string
  createdAt: string
  price: number
}

export const bookings: Booking[] = [
  { id: 1, customerName: 'Sarah Johnson', customerEmail: 'sarah@example.com', customerPhone: '+1 555-0101', serviceName: 'Deep Cleaning', serviceId: 2, scheduledAt: '2026-04-05 10:00', address: '123 Maple Street, New York, NY 10001', notes: 'Please focus on the kitchen and bathrooms.', status: 'confirmed', staffName: 'Maria Garcia', createdAt: '2026-03-28', price: 149 },
  { id: 2, customerName: 'James Wilson', customerEmail: 'james@example.com', customerPhone: '+1 555-0102', serviceName: 'Standard Cleaning', serviceId: 1, scheduledAt: '2026-04-06 14:00', address: '456 Oak Avenue, Brooklyn, NY 11201', status: 'pending', createdAt: '2026-03-29', price: 79 },
  { id: 3, customerName: 'Emily Chen', customerEmail: 'emily@example.com', customerPhone: '+1 555-0103', serviceName: 'Move In/Out Cleaning', serviceId: 3, scheduledAt: '2026-04-03 09:00', address: '789 Pine Road, Queens, NY 11354', status: 'in_progress', staffName: 'David Kim', createdAt: '2026-03-25', price: 199 },
  { id: 4, customerName: 'Michael Brown', customerEmail: 'michael@example.com', customerPhone: '+1 555-0104', serviceName: 'Office Cleaning', serviceId: 4, scheduledAt: '2026-04-01 08:00', address: '321 Business Blvd, Manhattan, NY 10005', status: 'completed', staffName: 'Lisa Park', createdAt: '2026-03-20', price: 129 },
  { id: 5, customerName: 'Amanda Davis', customerEmail: 'amanda@example.com', customerPhone: '+1 555-0105', serviceName: 'Carpet Cleaning', serviceId: 6, scheduledAt: '2026-04-07 11:00', address: '654 Elm Street, Bronx, NY 10451', status: 'assigned', staffName: 'Carlos Rivera', createdAt: '2026-03-30', price: 99 },
]
