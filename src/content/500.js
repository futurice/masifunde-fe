export async function fetchErrorPage500() {
  // There is currently no 500 error page in Contentful.
  // Use hardcoded values for now.
  return {
    metaTitle: 'Interner Fehler',
    title: 'Interner Fehler',
    descriptionMarkdown: 'Beim Laden der Seite ist ein Fehler aufgetreten.',
  }
}
