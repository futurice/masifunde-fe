import { InferType, array, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'
import { documentSchema } from './dokumente-content'
import { teamMemberSchema } from './shared/team'
import { videoSchema } from './shared/video'

// Schema
// ======

/**
 * Schema for the "Page: Presse" (`pagePress`) content type.
 * (English: "Press")
 */
const pressContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  introHeading: string().required(),
  introText: string().required(),
  pressKitHeading: string().required(),
  documentsList1: array(documentSchema).default([]),
  videosHeading: string(),
  videosList: array(videoSchema).default([]),
  pressReleaseHeading: string(),
  documentsList2: array(documentSchema).default([]),
  contactTextHeading: string(),
  contactText: string(),
  teamMember: teamMemberSchema.required(),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

// Types
// =====

export type PressContent = InferType<typeof pressContentSchema>

// Functions
// =========

export function getPressContent(locale: string): Promise<PressContent> {
  return getSingletonEntryContent({
    content_type: 'pagePress',
    schema: pressContentSchema,
    locale,
  })
}
