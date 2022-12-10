// Types
// =====

export type Error500Content = {
  metaTitle: string
  title: string
  descriptionMarkdown: string
}

// Functions
// =========

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getError500Content(_locale: string) {
  // There is currently no 500 error page in Contentful.
  // Use hardcoded values for now.
  return {
    metaTitle: 'Interner Fehler',
    title: 'Interner Fehler',
    descriptionMarkdown: 'Beim Laden der Seite ist ein Fehler aufgetreten.',
  }
}
