import type { Question, QuestionFilters } from '@/types/question'

export const DEFAULT_FILTERS: QuestionFilters = {
  search: '',
  category: 'All',
  difficulty: 'All',
  status: 'All',
}

/** Number of filter dropdowns currently narrowing the list (search not counted). */
export function countActiveDropdownFilters(f: QuestionFilters): number {
  return [f.category, f.difficulty, f.status].filter((v) => v !== 'All').length
}

export function hasActiveFilters(f: QuestionFilters): boolean {
  return f.search.trim() !== '' || countActiveDropdownFilters(f) > 0
}

/**
 * All conditions combine with AND. Search is case-insensitive and every
 * word must appear somewhere in the question ("rotated binary" finds
 * "Binary search in a rotated sorted array").
 */
export function filterQuestions(questions: Question[], f: QuestionFilters): Question[] {
  const terms = f.search.toLowerCase().split(/\s+/).filter(Boolean)

  return questions.filter((q) => {
    if (f.category !== 'All' && q.category !== f.category) return false
    if (f.difficulty !== 'All' && q.difficulty !== f.difficulty) return false
    if (f.status !== 'All' && q.status !== f.status) return false
    if (terms.length === 0) return true
    const text = q.question.toLowerCase()
    return terms.every((term) => text.includes(term))
  })
}
