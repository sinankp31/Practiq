/**
 * Single source of truth for every enumerated value in the app.
 * Types are derived from these arrays (see types/question.ts), so the
 * UI options, validation and persistence guards can never disagree.
 */
export const CATEGORIES = ['DSA', 'Git', 'Technical'] as const
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const
export const STATUSES = ['Pending', 'In Progress', 'Completed'] as const
export const MACHINE_CODING_STATUSES = ['Not Started', 'In Progress', 'Practiced', 'Completed'] as const

/** Categories that count as "interview questions" on the dashboard (everything except DSA). */
export const INTERVIEW_CATEGORIES = ['Git', 'Technical'] as const

export const QUESTION_MAX_LENGTH = 200
export const QUESTION_MIN_LENGTH = 5
