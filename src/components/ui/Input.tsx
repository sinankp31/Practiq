import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { CONTROL_BASE, controlBorder } from './controlStyles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(CONTROL_BASE, controlBorder(invalid), className)}
      {...props}
    />
  )
}
