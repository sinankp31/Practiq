/** Shared look for Input, Select and Textarea so they never drift apart. */
export const CONTROL_BASE =
  'block w-full rounded-control border bg-surface px-3 text-sm text-ink transition-colors ' +
  'placeholder:text-faint hover:border-faint disabled:cursor-not-allowed disabled:opacity-50'

/** Single-line controls: 44px on touch, 36px from sm up. */
export const CONTROL_HEIGHT = 'h-11 sm:h-9'

export const controlBorder = (invalid?: boolean) =>
  invalid ? 'border-danger' : 'border-border-strong'
