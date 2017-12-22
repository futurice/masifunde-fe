/* eslint-disable import/prefer-default-export */
import { fetchSingleEntry } from './contentfulService'
import { unwrapImage, unwrapRegion } from './common'

export async function fetchContactPage(locale) {
  const content = await fetchSingleEntry('pageKontakt', locale)
  const mapContact = contact => ({
    ...contact.fields,
    region: unwrapRegion(contact && contact.fields && contact.fields.region),
    image: unwrapImage(contact && contact.fields && contact.fields.profileImage),
  })
  return {
    ...content,
    contacts: content && content.contacts && content.contacts.map(mapContact),
    regionalContacts:
      content && content.regionalContacts && content.regionalContacts.map(mapContact),
  }
}
