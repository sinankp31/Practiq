# Practiq architecture

This document explains how Practiq is put together and why. The goal is a codebase that is small enough to hold in your head and structured so that the likely next changes (a backend, more filters, dark mode) are easy.

## Layers

```
Pages / components        render UI, own UI-only state (filters, open dialogs)
        |
usePractice() hook         the only way components read or change app data
        |
PracticeProvider           Context + useReducer; load on mount, save on change
        |
practiceReducer            pure state transitions
        |
PracticeRepository         interface: load(), save()
        |
localStorageRepository     the only code that touches localStorage
```

Dependencies point downward only. Components don't know the repository exists; the reducer doesn't know about React or storage.

## State: what lives where

| State | Where | Why |
|---|---|---|
| Questions, machine-coding status | `PracticeProvider` (`useReducer`) | Shared by Dashboard and Questions; persisted |
| Load state (`loading` / `ready`) | Same reducer | Prevents flashing a false empty state before storage answers |
| Search and filters | `useState` in `QuestionsPage` | UI state; no other page needs it |
| Modal open, delete target | `useState` next to the component that owns the dialog | Local concern |
| Dashboard stats, filtered list | Derived with pure functions + `useMemo` | Storing derived data invites it going stale |

Redux/Zustand were deliberately not added: there is one small domain object and two pages.

## Reducer purity

`practiceReducer` never calls `Date.now()` or generates ids. Callers create them (`createQuestion()`, `new Date().toISOString()`) and pass them in the action. That makes every transition deterministic and testable with plain objects. No-op updates (same status, unknown id) return the *same* state object, so React skips the re-render.

## Persistence

`PracticeRepository` has two methods:

- `load(): Promise<PersistedState>` never rejects for bad or missing data; it resolves to defaults.
- `save(state): Promise<void>` rejects on failure so the UI can warn.

Both are async even though `localStorage` is synchronous. That makes the loading state real and means an HTTP implementation drops in without touching callers. The provider accepts a `repository` prop (defaulting to the localStorage one), which also makes it injectable in tests.

Stored data is treated as untrusted input. `parsePersistedState` validates with hand-written type guards, drops invalid questions individually, tolerates a missing `machineCoding` field, and runs a `migrate()` step for older shapes. A schema library was not worth the dependency at this size.

The provider skips the first save after loading (data just read from storage doesn't need writing back) using a `skipNextSave` ref rather than comparing values, because comparing would also skip a legitimate change back to the original value.

## Types as a single source of truth

Option lists (`CATEGORIES`, `DIFFICULTIES`, `STATUSES`, `MACHINE_CODING_STATUSES`) are `as const` arrays; the TypeScript union types are derived from them, and runtime guards (`isStatus`, ...) use the same arrays. A dropdown, a validator and the storage parser cannot drift apart. Guards avoid `as` casts when reading `<select>` values.

## UI decisions

- **Responsive by content, not by device.** The sidebar needs 240px, so it appears at `lg` (1024px); below that a bottom tab bar is used. The table shows from `md`; below it, the same data renders as a divided list. Both layouts are in the DOM and toggled with CSS, which avoids a JS media-query hook and any flash of the wrong layout (the hidden one is `display:none`, so it's also out of the accessibility tree). The "Updated" column only appears at `xl` because the question column needs the space first.
- **Native elements first.** `<dialog>` provides the focus trap, Escape handling and inert background; `<select>` provides keyboard and mobile pickers; machine-coding options are real radio buttons. Less custom code, fewer accessibility bugs.
- **Validation is derived.** After the first failed submit, errors are computed from the current draft on every render, so they disappear as soon as a field is fixed. Focus moves to the first invalid field on submit.
- **Colour is never the only signal.** Status and difficulty badges always include text.

## Accessibility

Semantic landmarks and a skip link; labelled controls; errors linked with `aria-describedby` and announced via `role="alert"`; dialogs open with focus on the intended control (`data-autofocus`) and return it to the opener on close; after deleting a row focus moves to the list; add / status / delete results are announced through a polite live region; all motion is disabled under `prefers-reduced-motion`.

## Testing approach

Unit tests target pure logic where bugs would be silent: filtering, stats, validation, reducer transitions, and storage parsing including corrupt and unavailable storage. UI behaviour was verified in a real browser, including keyboard-only flows and an axe-core audit; those checks are not committed as automated tests, which would be the next step for CI.

## Moving to a backend

1. Write `ApiRepository implements PracticeRepository` (`load` = GET, `save` = PUT/PATCH).
2. Change the export in `src/services/index.ts`.
3. For per-action requests instead of whole-document saves, split `save` into finer-grained methods on the interface; the reducer and components stay as they are.
