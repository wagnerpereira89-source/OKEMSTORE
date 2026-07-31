import { Loader2 } from 'lucide-react'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-[#141414] hover:bg-[#CFCFCF] active:bg-[#B8B8B8]',
    secondary: 'bg-[#242424] text-[#F5F5F0] hover:bg-[#2E2E2E] active:bg-[#3A3A3A]',
    danger: 'bg-[#ef4444] text-white hover:bg-[#dc2626]',
    ghost: 'bg-transparent text-action hover:bg-[#242424]',
    outline: 'border border-[#2E2E2E] bg-[#1A1A1A] text-[#F5F5F0] hover:bg-[#242424]',
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}
