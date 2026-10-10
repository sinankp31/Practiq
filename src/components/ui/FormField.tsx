import type { ReactNode } from 'react'
import { messageId } from './fieldIds'

interface FormFieldProps {
  /** Must match the id of the control inside. */
  htmlFor: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}

/** Label + control + message. Controls link to the message with describedBy() from fieldIds. */
export function FormField({ htmlFor, label, error, hint, children }: FormFieldProps) {
  const msgId = messageId(htmlFor)
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-2xs font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={msgId} role="alert" className="text-2xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={msgId} className="text-2xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
