export interface User {
    id: number
    name: string
    email: string
    role: 'customer' | 'admin' | 'staff'
}

export interface PageProps {
    auth: {
        user: User | null
    }
    flash: {
        message?: string
        error?: string
    }
    [key: string]: unknown
}

export interface Service {
    id: number
    name: string
    description: string | null
    price: string
    duration_hours: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Booking {
    id: number
    customer_id: number
    service_id: number
    scheduled_at: string
    address: string
    notes: string | null
    status: 'pending' | 'confirmed' | 'assigned' | 'in_progress' | 'completed'
    created_at: string
    updated_at: string
    customer?: User
    service?: Service
    staff_assignment?: StaffAssignment
}

export interface StaffAssignment {
    id: number
    booking_id: number
    staff_id: number
    assigned_at: string
    staff?: User
}
