import { createLocalStorageRepository } from './localStorageRepository'

/** The app's repository. Swap this one line to move to a real backend. */
export const repository = createLocalStorageRepository()
