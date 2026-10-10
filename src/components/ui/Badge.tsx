import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  tone?: BadgeTone
  /** Leading status dot. Colour is never the only signal: the label always says it too. */
  dot?: boolean
  children: ReactNode
}

const TONES: Record<BadgeTone, { text: string; dot: string }> = {
  neutral: { text: 'text-muted', dot: 'bg-faint' },
  success: { text: 'text-success', dot: 'bg-success' },
  warning: { text: 'text-warning', dot: 'bg-warning' },
  danger: { text: 'text-danger', dot: 'bg-danger' },
}

export function Badge({ tone = 'neutral', dot = false, children }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap text-2xs font-medium', TONES[tone].text)}>
      {dot && <span aria-hidden="true" className={cn('size-1.5 rounded-full', TONES[tone].dot)} />}
      {children}
    </span>
  )
}
