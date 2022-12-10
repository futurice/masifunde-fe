import { InferType, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'

// Schema
// ======

/**
 * Schema for the "Page: Transparenz" (`pageTransparenz`) content type.
 * (English: "Transparency")
 */
export const transparencyContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  heading: string().required(),
  markdown: string().required(),
})

// Types
// =====

export type TransparencyContent = InferType<typeof transparencyContentSchema>

// Functions
// =========

export async function getTransparencyContent(
  locale: string
): Promise<TransparencyContent> {
  return getSingletonEntryContent({
    content_type: 'pageTransparenz',
    schema: transparencyContentSchema,
    locale,
  })
}
