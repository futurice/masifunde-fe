import { InferType, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'

// Schema
// ======

/**
 * Schema for the "Page: 404" (`page404`) content type.
 */
export const error404ContentSchema = object({
  metaTitle: string().required(),
  section1Title: string().required(),
  section1Markdown: string().required(),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

// Types
// =====

export type Error404Content = InferType<typeof error404ContentSchema>

// Functions
// =========

export async function getError404Content(
  locale: string
): Promise<Error404Content> {
  return getSingletonEntryContent({
    content_type: 'page404',
    schema: error404ContentSchema,
    locale,
  })
}
