import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
}

/**
 * Built on the native <dialog>. showModal() gives us, for free:
 * focus trapping, Escape to close, an inert page behind, and focus
 * restoration to the opener. Children only mount while open, so forms reset.
 * Mark the element that should receive initial focus with `data-autofocus`.
 */
export function Modal({ open, onClose, title, description, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      // showModal() focuses the first focusable element (the close button) and overrides React's
      // autoFocus, so honour an explicit [data-autofocus] target ourselves.
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose} // fires for Escape and for dialog.close()
      onClick={(e) => {
        // A click on the dialog element itself (not its content) is a backdrop click.
        if (e.target === ref.current) onClose()
      }}
      className="practiq-dialog m-0 mt-auto w-full max-w-full overflow-visible bg-transparent p-0 text-ink backdrop:bg-ink/40 sm:m-auto sm:max-w-md"
    >
      {open && (
        <div className="flex max-h-[90dvh] flex-col rounded-t-panel border border-border bg-surface pb-[env(safe-area-inset-bottom)] shadow-lg sm:rounded-panel">
          <div className="flex items-start justify-between gap-4 px-5 pt-5">
            <div className="min-w-0">
              <h2 id={titleId} className="text-base">
                {title}
              </h2>
              {description && (
                <p id={descId} className="mt-1 text-xs text-muted [overflow-wrap:anywhere]">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-2 -mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-control text-muted transition-colors hover:bg-subtle hover:text-ink"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="overflow-y-auto px-5 pb-5 pt-4">{children}</div>
        </div>
      )}
    </dialog>
  )
}
