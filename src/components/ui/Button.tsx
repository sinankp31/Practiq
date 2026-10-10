import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover border border-transparent',
  secondary: 'bg-surface text-ink border border-border-strong hover:bg-subtle',
  ghost: 'bg-transparent text-muted border border-transparent hover:bg-subtle hover:text-ink',
  danger: 'bg-danger text-white border border-transparent hover:bg-red-800',
}

/** 44px tall on touch screens, 36px from sm up (matches Input and Select). */
export function Button({ variant = 'secondary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-control px-3.5 text-sm font-medium transition-colors sm:h-9',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  )
}
