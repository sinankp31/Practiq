import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SearchInput } from '@/components/ui/SearchInput'
import { CATEGORIES, DIFFICULTIES, STATUSES } from '@/constants/questions'
import { countActiveDropdownFilters, hasActiveFilters } from '@/features/questions/filterQuestions'
import type { QuestionFilters } from '@/types/question'
import { cn } from '@/utils/cn'
import { FilterSelect } from './FilterSelect'

interface QuestionToolbarProps {
  filters: QuestionFilters
  onChange: (filters: QuestionFilters) => void
  onReset: () => void
  /** Matching questions / all questions, for the result count. */
  resultCount: number
  totalCount: number
}

export function QuestionToolbar({ filters, onChange, onReset, resultCount, totalCount }: QuestionToolbarProps) {
  // Mobile only: dropdowns collapse behind a "Filters" button. From md up they're always visible.
  const [panelOpen, setPanelOpen] = useState(false)
  const activeCount = countActiveDropdownFilters(filters)
  const filtering = hasActiveFilters(filters)
  const set = <K extends keyof QuestionFilters>(key: K, value: QuestionFilters[K]) => onChange({ ...filters, [key]: value })

  return (
    <div className="space-y-3 pb-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex gap-2 md:flex-1">
          <SearchInput className="flex-1" value={filters.search} onChange={(v) => set('search', v)} placeholder="Search questions" />
          <Button
            className="md:hidden"
            aria-expanded={panelOpen}
            aria-controls="question-filters"
            onClick={() => setPanelOpen((o) => !o)}
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </Button>
        </div>

        <div id="question-filters" className={cn('gap-2 md:flex', panelOpen ? 'grid sm:grid-cols-3' : 'hidden')}>
          <FilterSelect className="md:w-40" label="Category" allLabel="All categories" options={CATEGORIES} value={filters.category} onChange={(v) => set('category', v)} />
          <FilterSelect className="md:w-40" label="Difficulty" allLabel="All difficulties" options={DIFFICULTIES} value={filters.difficulty} onChange={(v) => set('difficulty', v)} />
          <FilterSelect className="md:w-40" label="Status" allLabel="All statuses" options={STATUSES} value={filters.status} onChange={(v) => set('status', v)} />
        </div>
      </div>

      <div className="flex min-h-6 items-center justify-between gap-3 text-xs text-muted">
        <p aria-live="polite">
          {filtering ? `${resultCount} of ${totalCount} questions` : `${totalCount} ${totalCount === 1 ? 'question' : 'questions'}`}
        </p>
        {filtering && (
          <button type="button" onClick={onReset} className="rounded-control px-1 font-medium text-accent-hover underline-offset-2 hover:underline">
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
