import { parsePersistedState } from './parsePersistedState'
import { createDefaultState, STORAGE_VERSION, type PersistedState, type PracticeRepository } from './repository'

export const STORAGE_KEY = `practiq:v${STORAGE_VERSION}`
export const CORRUPT_BACKUP_KEY = `${STORAGE_KEY}:corrupt`

/**
 * The only file in the app that touches localStorage.
 * `storage` is injectable so tests can pass a fake.
 */
export function createLocalStorageRepository(storage?: Pick<Storage, 'getItem' | 'setItem'>): PracticeRepository {
  // Resolved lazily: merely reading window.localStorage can throw (blocked cookies, private modes).
  const store = () => storage ?? window.localStorage

  return {
    async load() {
      let raw: string | null
      try {
        raw = store().getItem(STORAGE_KEY)
      } catch {
        return createDefaultState() // storage unavailable: run in-memory
      }
      if (raw === null) return createDefaultState() // first visit

      let parsed: PersistedState | null = null
      try {
        parsed = parsePersistedState(JSON.parse(raw))
      } catch {
        parsed = null // malformed JSON
      }

      if (parsed === null) {
        // Keep the unreadable payload so it can be recovered manually, then start clean.
        try {
          store().setItem(CORRUPT_BACKUP_KEY, raw)
        } catch {
          /* best effort */
        }
        return createDefaultState()
      }
      return parsed
    },

    async save(state) {
      store().setItem(STORAGE_KEY, JSON.stringify(state)) // throws on quota/blocked -> caller shows a warning
    },
  }
}
