import { InferType, array, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'
import { contactPersonSchema } from './shared/team'

// Schema
// ======

export const contactSchema = contactPersonSchema.concat(
  object({
    responsibilityArea: string().required(),
  })
)

/**
 * Schema for the "Page: Kontakt" (`pageKontakt`) content type.
 * (English: "Contact")
 */
export const contactContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  mainHeading: string().required(),
  contactsHeading: string().required(),
  regionalContactsHeading: string().required(),
  contacts: array(contactSchema).required(),
  regionalContacts: array(contactSchema).required(),
  contactDetailsHeading: string().required(),
  address: string().required(),
  email: string(),
  telephone: string(),
})

// Types
// =====

export type ContactContent = InferType<typeof contactContentSchema>

// Functions
// =========

export function getContactContent(locale: string): Promise<ContactContent> {
  return getSingletonEntryContent({
    content_type: 'pageKontakt',
    schema: contactContentSchema,
    locale,
  })
}
