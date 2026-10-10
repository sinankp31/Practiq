import type { Question } from '@/types/question'

type Seed = Omit<Question, 'id' | 'createdAt' | 'updatedAt'> & { createdDaysAgo: number; updatedDaysAgo: number }

const SEEDS: readonly Seed[] = [
  { question: 'Reverse a linked list', category: 'DSA', difficulty: 'Easy', status: 'Completed', createdDaysAgo: 14, updatedDaysAgo: 10 },
  { question: 'Two sum using a hash map', category: 'DSA', difficulty: 'Easy', status: 'Completed', createdDaysAgo: 13, updatedDaysAgo: 9 },
  { question: 'Level order traversal of a binary tree', category: 'DSA', difficulty: 'Medium', status: 'Completed', createdDaysAgo: 11, updatedDaysAgo: 5 },
  { question: 'Binary search in a rotated sorted array', category: 'DSA', difficulty: 'Medium', status: 'In Progress', createdDaysAgo: 8, updatedDaysAgo: 1 },
  { question: 'Merge k sorted lists', category: 'DSA', difficulty: 'Hard', status: 'Pending', createdDaysAgo: 6, updatedDaysAgo: 6 },
  { question: 'Longest increasing subsequence', category: 'DSA', difficulty: 'Hard', status: 'Pending', createdDaysAgo: 4, updatedDaysAgo: 4 },
  { question: 'Difference between git merge and git rebase', category: 'Git', difficulty: 'Medium', status: 'Completed', createdDaysAgo: 12, updatedDaysAgo: 7 },
  { question: 'Undo the last commit without losing changes', category: 'Git', difficulty: 'Easy', status: 'Completed', createdDaysAgo: 10, updatedDaysAgo: 8 },
  { question: 'Resolve a merge conflict step by step', category: 'Git', difficulty: 'Medium', status: 'In Progress', createdDaysAgo: 5, updatedDaysAgo: 2 },
  { question: 'Difference between var, let and const', category: 'Technical', difficulty: 'Easy', status: 'Completed', createdDaysAgo: 9, updatedDaysAgo: 6 },
  { question: 'How does the browser event loop work?', category: 'Technical', difficulty: 'Hard', status: 'In Progress', createdDaysAgo: 3, updatedDaysAgo: 0 },
  { question: 'Explain React reconciliation and keys', category: 'Technical', difficulty: 'Medium', status: 'Pending', createdDaysAgo: 2, updatedDaysAgo: 2 },
  { question: 'What is CORS and why does it exist?', category: 'Technical', difficulty: 'Medium', status: 'Pending', createdDaysAgo: 1, updatedDaysAgo: 1 },
]

const DAY_MS = 24 * 60 * 60 * 1000

/** Demo data for first-time users who want to see the app populated. Newest first. */
export function createSampleQuestions(now: number = Date.now()): Question[] {
  return SEEDS.map(({ createdDaysAgo, updatedDaysAgo, ...rest }, index) => ({
    ...rest,
    id: `sample-${index + 1}`,
    createdAt: new Date(now - createdDaysAgo * DAY_MS).toISOString(),
    updatedAt: new Date(now - updatedDaysAgo * DAY_MS).toISOString(),
  })).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
