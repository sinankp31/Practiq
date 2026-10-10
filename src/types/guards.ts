import { CATEGORIES, DIFFICULTIES, STATUSES, MACHINE_CODING_STATUSES } from '@/constants/questions'
import type { Category, Difficulty, MachineCodingStatus, Status } from './question'

/** Runtime checks for values coming from the DOM or storage, where TypeScript can't help. */
export const isCategory = (v: unknown): v is Category => CATEGORIES.some((c) => c === v)
export const isDifficulty = (v: unknown): v is Difficulty => DIFFICULTIES.some((d) => d === v)
export const isStatus = (v: unknown): v is Status => STATUSES.some((s) => s === v)
export const isMachineCodingStatus = (v: unknown): v is MachineCodingStatus =>
  MACHINE_CODING_STATUSES.some((s) => s === v)
