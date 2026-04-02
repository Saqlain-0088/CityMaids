export interface StaffMember {
  id: number; name: string; email: string; phone: string
  role: 'staff'; status: 'active' | 'inactive'
  jobsCompleted: number; rating: number; joinedAt: string; avatar: string
}

export const staffMembers: StaffMember[] = [
  { id: 1, name: 'Maria Garcia', email: 'maria@citymaids.com', phone: '+1 555-1001', role: 'staff', status: 'active', jobsCompleted: 142, rating: 4.9, joinedAt: '2024-01-15', avatar: 'MG' },
  { id: 2, name: 'David Kim', email: 'david@citymaids.com', phone: '+1 555-1002', role: 'staff', status: 'active', jobsCompleted: 98, rating: 4.8, joinedAt: '2024-03-20', avatar: 'DK' },
  { id: 3, name: 'Lisa Park', email: 'lisa@citymaids.com', phone: '+1 555-1003', role: 'staff', status: 'active', jobsCompleted: 215, rating: 4.9, joinedAt: '2023-08-10', avatar: 'LP' },
  { id: 4, name: 'Carlos Rivera', email: 'carlos@citymaids.com', phone: '+1 555-1004', role: 'staff', status: 'active', jobsCompleted: 67, rating: 4.7, joinedAt: '2024-06-01', avatar: 'CR' },
  { id: 5, name: 'Aisha Patel', email: 'aisha@citymaids.com', phone: '+1 555-1005', role: 'staff', status: 'inactive', jobsCompleted: 33, rating: 4.6, joinedAt: '2025-01-10', avatar: 'AP' },
]
