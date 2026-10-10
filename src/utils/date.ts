const DAY_MS = 24 * 60 * 60 * 1000

const shortDate = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' })
const shortDateWithYear = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' })

/** "Today", "Yesterday", "3 days ago", then a plain date. Invalid input returns an empty string. */
export function formatRelativeDate(iso: string, now: number = Date.now()): string {
  const time = Date.parse(iso)
  if (Number.isNaN(time)) return ''

  const days = Math.floor((startOfDay(now) - startOfDay(time)) / DAY_MS)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`

  const sameYear = new Date(time).getFullYear() === new Date(now).getFullYear()
  return (sameYear ? shortDate : shortDateWithYear).format(time)
}

function startOfDay(ms: number): number {
  const d = new Date(ms)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}
