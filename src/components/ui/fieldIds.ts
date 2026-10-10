/** Id of the FormField message (error or hint) belonging to a control. */
export const messageId = (id: string) => `${id}-message`

/** Value for a control's aria-describedby: only set when a message is rendered. */
export const describedBy = (id: string, hasMessage: boolean) =>
  hasMessage ? messageId(id) : undefined
