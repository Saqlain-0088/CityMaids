interface BadgeProps { label: string; variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'default'; size?: 'sm' | 'md' }

const map = {
  brand:   'bg-brand-100 text-brand-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger:  'bg-red-100 text-red-700',
  info:    'bg-blue-100 text-blue-700',
  purple:  'bg-purple-100 text-purple-700',
  default: 'bg-dark-100 text-dark-700',
}

export default function Badge({ label, variant = 'default', size = 'sm' }: BadgeProps) {
  return <span className={`badge ${map[variant]} ${size === 'md' ? 'px-3 py-1 text-sm' : ''}`}>{label}</span>
}

export function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
    pending:     { label: 'Pending',     variant: 'warning' },
    confirmed:   { label: 'Confirmed',   variant: 'info' },
    assigned:    { label: 'Assigned',    variant: 'purple' },
    in_progress: { label: 'In Progress', variant: 'brand' },
    completed:   { label: 'Completed',   variant: 'success' },
    cancelled:   { label: 'Cancelled',   variant: 'danger' },
    active:      { label: 'Active',      variant: 'success' },
    inactive:    { label: 'Inactive',    variant: 'danger' },
    new:         { label: 'New',         variant: 'info' },
    contacted:   { label: 'Contacted',   variant: 'warning' },
    converted:   { label: 'Converted',   variant: 'success' },
    lost:        { label: 'Lost',        variant: 'danger' },
    approved:    { label: 'Approved',    variant: 'success' },
    rejected:    { label: 'Rejected',    variant: 'danger' },
  }
  const c = cfg[status] ?? { label: status, variant: 'default' as const }
  return <Badge label={c.label} variant={c.variant} />
}
