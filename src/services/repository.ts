import type { Question } from '@/types/question'

/** Shape of everything Practiq stores. `version` drives migrations. */
export interface PersistedState {
  version: 1
  questions: Question[]
}

export const STORAGE_VERSION = 1

export const createDefaultState = (): PersistedState => ({ version: STORAGE_VERSION, questions: [] })

/**
 * The only thing the rest of the app knows about storage.
 * Today: localStorage. Tomorrow: an ApiRepository with the same two methods -
 * no component or reducer changes needed.
 *
 * Contract:
 *  - load() never rejects for bad or missing data; it resolves to defaults.
 *  - save() rejects if the write fails, so the UI can warn the user.
 */
export interface PracticeRepository {
  load(): Promise<PersistedState>
  save(state: PersistedState): Promise<void>
}
