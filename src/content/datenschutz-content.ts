import { InferType, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'

// Schema
// ======

/**
 * Schema for the "Page: Datenschutz" (`pageDatenschutz`) content type.
 * (English: "Privacy")
 */
export const privacyPolicyContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  datenschutzTitle: string().required(),
  datenschutzMarkdown: string().required(),
})

// Types
// =====

export type PrivacyPolicyContent = InferType<typeof privacyPolicyContentSchema>

// Functions
// =========

export async function getPrivacyPolicyContent(
  locale: string
): Promise<PrivacyPolicyContent> {
  return getSingletonEntryContent({
    content_type: 'pageDatenschutz',
    schema: privacyPolicyContentSchema,
    locale,
  })
}
