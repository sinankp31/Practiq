import { cn } from '@/utils/cn'

/** Placeholder block for loading states. Decorative, so hidden from assistive tech. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-control bg-subtle', className)} />
}
