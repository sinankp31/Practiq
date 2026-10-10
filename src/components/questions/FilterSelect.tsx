import { Select } from '@/components/ui/Select'
import type { FilterValue } from '@/types/question'
import { cn } from '@/utils/cn'

interface FilterSelectProps<T extends string> {
  /** Accessible name, e.g. "Category". */
  label: string
  /** Text of the "no filter" option, e.g. "All categories". */
  allLabel: string
  options: readonly T[]
  value: FilterValue<T>
  onChange: (value: FilterValue<T>) => void
  className?: string
}

export function FilterSelect<T extends string>({ label, allLabel, options, value, onChange, className }: FilterSelectProps<T>) {
  return (
    <div className={cn(className)}>
      <Select
        aria-label={label}
        value={value}
        onChange={(e) => {
          const next = options.find((o) => o === e.target.value)
          onChange(next ?? 'All')
        }}
      >
        <option value="All">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </Select>
    </div>
  )
}
