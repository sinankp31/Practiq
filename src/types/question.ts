import type { CATEGORIES, DIFFICULTIES, STATUSES, MACHINE_CODING_STATUSES } from '@/constants/questions'

export type Category = (typeof CATEGORIES)[number]
export type Difficulty = (typeof DIFFICULTIES)[number]
export type Status = (typeof STATUSES)[number]
export type MachineCodingStatus = (typeof MACHINE_CODING_STATUSES)[number]

export interface Question {
  id: string
  question: string
  category: Category
  difficulty: Difficulty
  status: Status
  /** ISO 8601 timestamps. Strings (not Dates) so they survive JSON round-trips. */
  createdAt: string
  updatedAt: string
}

/** What the user provides when adding a question; the rest is generated. */
export type NewQuestionInput = Pick<Question, 'question' | 'category' | 'difficulty' | 'status'>

/** A filter dropdown value: a real option, or "All" for no filtering. */
export type FilterValue<T> = T | 'All'

export interface QuestionFilters {
  search: string
  category: FilterValue<Category>
  difficulty: FilterValue<Difficulty>
  status: FilterValue<Status>
}
