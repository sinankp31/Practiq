import { INTERVIEW_CATEGORIES } from '@/constants/questions'
import type { Question } from '@/types/question'

export interface CategoryProgress {
  total: number
  completed: number
}

export interface PracticeStats {
  total: number
  completed: number
  inProgress: number
  pending: number
  /** DSA problems. */
  dsa: CategoryProgress
  /** Non-DSA questions (Git + Technical). */
  interview: CategoryProgress
  /** completed / total, rounded to a whole percent. 0 when there are no questions. */
  percentComplete: number
}

const isInterviewCategory = (category: Question['category']) => INTERVIEW_CATEGORIES.some((c) => c === category)

/** Everything on the dashboard derives from the question list here. Nothing is stored or hardcoded. */
export function selectStats(questions: readonly Question[]): PracticeStats {
  const stats: PracticeStats = {
    total: questions.length,
    completed: 0,
    inProgress: 0,
    pending: 0,
    dsa: { total: 0, completed: 0 },
    interview: { total: 0, completed: 0 },
    percentComplete: 0,
  }

  for (const q of questions) {
    const group = q.category === 'DSA' ? stats.dsa : isInterviewCategory(q.category) ? stats.interview : null
    if (group) group.total++

    if (q.status === 'Completed') {
      stats.completed++
      if (group) group.completed++
    } else if (q.status === 'In Progress') {
      stats.inProgress++
    } else {
      stats.pending++
    }
  }

  stats.percentComplete = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)
  return stats
}
