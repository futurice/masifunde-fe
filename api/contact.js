import { fetchSingleEntry } from './contentfulService'
import { unwrapImage, unwrapRegion } from './common'

const unwrapContact = contact => ({
  ...contact.fields,
  region: unwrapRegion(contact.fields.region),
  image: unwrapImage(contact.fields.profileImage),
})

const unwrapContacts = contacts =>
  contacts.filter(c => !!c.fields).map(unwrapContact)

export async function fetchContactPage(locale) {
  const content = await fetchSingleEntry('pageKontakt', locale)
  return {
    ...content,
    contacts: unwrapContacts(content.contacts),
    regionalContacts: unwrapContacts(content.regionalContacts),
  }
}
