import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef, ReactNode } from 'react'

interface Base { label?: string; error?: string; hint?: string; success?: boolean; leftIcon?: ReactNode; rightIcon?: ReactNode }
interface InputProps extends InputHTMLAttributes<HTMLInputElement>, Base {}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, Base {}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, Base { options: { value: string | number; label: string }[]; placeholder?: string }

const cls = (error?: string, success?: boolean) =>
  `input-base ${error ? 'input-error' : success ? 'input-success' : 'input-default'}`

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, hint, success, leftIcon, rightIcon, className = '', ...props }, ref) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-semibold text-dark-700">{label}{props.required && <span className="text-red-500 ml-1">*</span>}</label>}
    <div className="relative">
      {leftIcon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-400">{leftIcon}</div>}
      <input ref={ref} className={`${cls(error, success)} ${leftIcon ? 'pl-10' : ''} ${rightIcon || success ? 'pr-10' : ''} ${className}`} {...props} />
      {(rightIcon || success) && (
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
          {success && !rightIcon ? <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : rightIcon}
        </div>
      )}
    </div>
    {error && <p className="flex items-center gap-1 text-xs text-red-600"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{error}</p>}
    {hint && !error && <p className="text-xs text-dark-400">{hint}</p>}
  </div>
))
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, hint, success, className = '', ...props }, ref) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-semibold text-dark-700">{label}{props.required && <span className="text-red-500 ml-1">*</span>}</label>}
    <textarea ref={ref} rows={4} className={`${cls(error, success)} resize-none ${className}`} {...props} />
    {error && <p className="flex items-center gap-1 text-xs text-red-600"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{error}</p>}
    {hint && !error && <p className="text-xs text-dark-400">{hint}</p>}
  </div>
))
Textarea.displayName = 'Textarea'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, error, hint, options, placeholder, className = '', ...props }, ref) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-semibold text-dark-700">{label}{props.required && <span className="text-red-500 ml-1">*</span>}</label>}
    <select ref={ref} className={`${cls(error)} appearance-none ${className}`} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    {error && <p className="flex items-center gap-1 text-xs text-red-600"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{error}</p>}
    {hint && !error && <p className="text-xs text-dark-400">{hint}</p>}
  </div>
))
Select.displayName = 'Select'
