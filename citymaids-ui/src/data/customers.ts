export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  totalBookings: number
  totalSpent: number
  joinedAt: string
  lastBooking: string
  status: 'active' | 'inactive'
  avatar: string
}

export const customers: Customer[] = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 555-0101', address: '123 Maple Street, New York, NY 10001', totalBookings: 8, totalSpent: 892, joinedAt: '2024-02-10', lastBooking: '2026-04-05', status: 'active', avatar: 'SJ' },
  { id: 2, name: 'James Wilson', email: 'james@example.com', phone: '+1 555-0102', address: '456 Oak Avenue, Brooklyn, NY 11201', totalBookings: 3, totalSpent: 327, joinedAt: '2024-06-15', lastBooking: '2026-04-06', status: 'active', avatar: 'JW' },
  { id: 3, name: 'Emily Chen', email: 'emily@example.com', phone: '+1 555-0103', address: '789 Pine Road, Queens, NY 11354', totalBookings: 12, totalSpent: 1548, joinedAt: '2023-11-20', lastBooking: '2026-04-03', status: 'active', avatar: 'EC' },
  { id: 4, name: 'Michael Brown', email: 'michael@example.com', phone: '+1 555-0104', address: '321 Business Blvd, Manhattan, NY 10005', totalBookings: 5, totalSpent: 645, joinedAt: '2024-01-08', lastBooking: '2026-04-01', status: 'active', avatar: 'MB' },
  { id: 5, name: 'Amanda Davis', email: 'amanda@example.com', phone: '+1 555-0105', address: '654 Elm Street, Bronx, NY 10451', totalBookings: 2, totalSpent: 198, joinedAt: '2025-03-12', lastBooking: '2026-04-07', status: 'active', avatar: 'AD' },
  { id: 6, name: 'Robert Martinez', email: 'robert@example.com', phone: '+1 555-0106', address: '987 Cedar Lane, Staten Island, NY 10301', totalBookings: 7, totalSpent: 763, joinedAt: '2024-04-22', lastBooking: '2026-03-20', status: 'active', avatar: 'RM' },
  { id: 7, name: 'Jennifer Lee', email: 'jennifer@example.com', phone: '+1 555-0107', address: '147 Birch Blvd, Hoboken, NJ 07030', totalBookings: 1, totalSpent: 79, joinedAt: '2026-01-05', lastBooking: '2026-02-10', status: 'inactive', avatar: 'JL' },
  { id: 8, name: 'David Thompson', email: 'david.t@example.com', phone: '+1 555-0108', address: '258 Walnut Way, Jersey City, NJ 07302', totalBookings: 4, totalSpent: 476, joinedAt: '2024-09-18', lastBooking: '2026-03-28', status: 'active', avatar: 'DT' },
]
