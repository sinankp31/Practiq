/** Shared look for Input and Select so the two never drift apart. */
export const CONTROL_BASE =
  'block h-11 w-full rounded-control border bg-surface px-3 text-sm text-ink transition-colors sm:h-9 ' +
  'placeholder:text-faint hover:border-faint disabled:cursor-not-allowed disabled:opacity-50'

export const controlBorder = (invalid?: boolean) =>
  invalid ? 'border-danger' : 'border-border-strong'
