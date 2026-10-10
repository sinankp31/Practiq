import { useCallback, useState } from 'react'

/**
 * Message for a screen-reader live region. Clearing first means announcing the
 * same sentence twice in a row (e.g. two identical status changes) is still read out.
 */
export function useLiveMessage() {
  const [message, setMessage] = useState('')
  const announce = useCallback((next: string) => {
    setMessage('')
    requestAnimationFrame(() => setMessage(next))
  }, [])
  return [message, announce] as const
}
