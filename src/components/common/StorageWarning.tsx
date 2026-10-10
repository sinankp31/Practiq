import { TriangleAlert } from 'lucide-react'

/** Shown when saving fails. Non-blocking: the app keeps working in memory. */
export function StorageWarning() {
  return (
    <div role="status" className="flex items-start gap-2.5 border-b border-warning/30 bg-warning-soft px-4 py-2.5 text-xs text-warning sm:px-6">
      <TriangleAlert size={15} aria-hidden="true" className="mt-px shrink-0" />
      <p>Changes can't be saved in this browser (storage is full or blocked). They'll be lost when you close this tab.</p>
    </div>
  )
}
