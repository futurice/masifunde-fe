/* eslint-disable import/prefer-default-export */
import { fetchSingleEntry } from './contentfulService'

export async function fetchContactPage(locale) {
  const content = await fetchSingleEntry('pageKontakt', locale)

  return {
    ...content,
    contacts: content.contacts.map(contact => ({
      ...contact.fields,
      imageUrl: contact.fields.image.fields.file.url,
    })),
    regionalContacts: content.regionalContacts.map(contact => ({
      ...contact.fields,
      imageUrl: contact.fields.image.fields.file.url,
    })),
  }
}
