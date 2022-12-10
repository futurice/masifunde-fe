import { InferType, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'

// Schema
// ======

/**
 * Schema for the "Page: Impressum" (`pageImpressum`) content type.
 * (English: "Legal Notice")
 */
export const legalNoticeContent = object({
  metaTitle: string().required(),
  metaDescription: string(),
  impressumTitle: string().required(),
  impressumMarkdown: string().required(),
})

// Types
// =====

/**
 * Schema for the "Page: Datenschutz" (`pageDatenschutz`) content type.
 * (English: "Privacy")
 */
export type LegalNoticeContent = InferType<typeof legalNoticeContent>

// Functions
// =========

export async function getLegalNoticeContent(
  locale: string
): Promise<LegalNoticeContent> {
  return getSingletonEntryContent({
    content_type: 'pageImpressum',
    schema: legalNoticeContent,
    locale,
  })
}
