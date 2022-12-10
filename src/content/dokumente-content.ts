import { InferType, array, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'
import { assetSchema } from './shared/assets'
import { teamMemberSchema } from './shared/team'
import { videoSchema } from './shared/video'

// Schema
// ======

/**
 * Schema for the "Document" (`document`) content type.
 */
export const documentSchema = object({
  title: string().required(),
  longTitle: string(),
  description: string(),
  file: assetSchema.required(),
})

/**
 * Schema for the "Page: Dokumente" (`pageDokumente`) content type.
 * (English: "Documents")
 */
export const documentsContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  introHeading: string().required(),
  introMarkdown: string().required(),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
  section1heading: string(),
  documentsList1: array(documentSchema).default([]),
  section2heading: string(),
  documentsList2: array(documentSchema).default([]),
  section3heading: string(),
  documentsList3: array(documentSchema).default([]),
  contactTextHeading: string().required(),
  contactText: string().required(),
  teamMember: teamMemberSchema.required(),
  pressKitHeading: string().required(),
  pressKitList: array(documentSchema).default([]),
  pressReleaseHeading: string(),
  pressReleaseList: array(documentSchema).default([]),
  videosHeading: string().required(),
  videosList: array(videoSchema).default([]),
})

// Types
// =====

export type Document = InferType<typeof documentSchema>
export type DocumentsContent = InferType<typeof documentsContentSchema>

// Functions
// =========

export function getDocumentsContent(locale: string): Promise<DocumentsContent> {
  return getSingletonEntryContent({
    content_type: 'pageDokumente',
    schema: documentsContentSchema,
    locale,
  })
}
