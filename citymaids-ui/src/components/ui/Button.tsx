import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brand' | 'brand-outline' | 'dark' | 'white' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
  icon?: ReactNode
  iconRight?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'brand', size = 'md', loading = false, fullWidth = false,
  className = '', children, disabled, icon, iconRight, ...props
}, ref) => {
  const variants = {
    'brand':         'btn btn-brand',
    'brand-outline': 'btn btn-brand-outline',
    'dark':          'btn btn-dark',
    'white':         'btn btn-white',
    'ghost':         'btn btn-ghost',
    'danger':        'btn bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    'success':       'btn bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500',
  }
  const sizes = { xs: 'btn-sm text-xs px-3 py-1.5', sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg', xl: 'btn-xl' }

  return (
    <button ref={ref} disabled={disabled || loading}
      className={`${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}>
      {loading
        ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        : icon ? <span className="flex-shrink-0">{icon}</span> : null}
      {children}
      {iconRight && !loading && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  )
})
Button.displayName = 'Button'
export default Button
