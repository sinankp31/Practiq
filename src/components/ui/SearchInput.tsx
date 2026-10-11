import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { CONTROL_BASE, CONTROL_HEIGHT } from './controlStyles'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  /** Also used as the accessible name. */
  placeholder: string
  className?: string
}

export function SearchInput({ value, onChange, placeholder, className }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(CONTROL_BASE, CONTROL_HEIGHT, 'border-border-strong pl-9 pr-9 text-ellipsis [&::-webkit-search-cancel-button]:hidden')}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-1 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-control text-faint transition-colors hover:text-ink"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
