import { isCategory, isDifficulty, isMachineCodingStatus, isStatus } from '@/types/guards'
import type { Question } from '@/types/question'
import { DEFAULT_MACHINE_CODING, STORAGE_VERSION, type PersistedState } from './repository'

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim() !== ''
const isIsoDate = (v: unknown): v is string => typeof v === 'string' && !Number.isNaN(Date.parse(v))

export function isQuestion(v: unknown): v is Question {
  return (
    isRecord(v) &&
    isNonEmptyString(v.id) &&
    isNonEmptyString(v.question) &&
    isCategory(v.category) &&
    isDifficulty(v.difficulty) &&
    isStatus(v.status) &&
    isIsoDate(v.createdAt) &&
    isIsoDate(v.updatedAt)
  )
}

/**
 * Bring any older stored shape up to the current one.
 * v0 was a bare array of questions; v1 wraps it in a versioned object.
 * Add a new step here whenever STORAGE_VERSION changes.
 */
function migrate(raw: unknown): unknown {
  if (Array.isArray(raw)) return { version: 1, questions: raw }
  return raw
}

/**
 * Turn untrusted parsed JSON into PersistedState, or null if it's unusable.
 * Individual malformed questions are dropped; the rest of the data survives.
 * `machineCoding` is optional on read, so data saved before it existed still loads.
 */
export function parsePersistedState(raw: unknown): PersistedState | null {
  const data = migrate(raw)
  if (!isRecord(data)) return null
  if (data.version !== STORAGE_VERSION) return null // unknown or future version: don't guess
  if (!Array.isArray(data.questions)) return null

  const seen = new Set<string>()
  const questions = data.questions.filter((q): q is Question => {
    if (!isQuestion(q) || seen.has(q.id)) return false
    seen.add(q.id)
    return true
  })

  const machineCoding = isMachineCodingStatus(data.machineCoding) ? data.machineCoding : DEFAULT_MACHINE_CODING
  return { version: STORAGE_VERSION, questions, machineCoding }
}
