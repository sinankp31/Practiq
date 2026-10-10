import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { CONTROL_BASE, controlBorder } from './controlStyles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export function Textarea({ invalid, className, rows = 3, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL_BASE, controlBorder(invalid), 'resize-y py-2 leading-snug', className)}
      {...props}
    />
  )
}
