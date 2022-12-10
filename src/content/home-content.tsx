import { InferType, array, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'
import { assetSchema } from './shared/assets'
import { individualPortraitSchema } from './shared/portrait'
import { statSchema } from './shared/stats'
import { campaignContentSchema } from './spendenaktion-content'

const announcementSchema = object({
  heading: string().required(),
  subHeading: string().required(),
  description: string().required(),
  image: assetSchema.required(),
  buttonText: string().required(),
  buttonLink: string().required(),
})

/**
 * Schema for the "Page: Home" (`pageHome`) content type.
 */
export const homeContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  // Hero
  heroTitle: string().required(),
  // Stats
  stats: array(statSchema).default([]),
  // Banner 1
  banner1Title: string().required(),
  banner1ButtonText: string().required(),
  banner1ButtonUrl: string().required(),
  // Videos
  videoTitle: string(),
  videoUrl: string(),
  // Campaign
  bannersTitle: string(),
  campaign: campaignContentSchema.optional().default(undefined),
  // Announcement
  announcement: announcementSchema.optional().default(undefined),
  // Featured Blog Posts
  featuredBlogPostsTitle: string().required(),
  // Individual Portrait
  section1Title: string().required(),
  portrait: individualPortraitSchema.optional().default(undefined),
  // Banner 2
  banner2Title: string().required(),
  banner2ButtonText: string().required(),
  banner2ButtonUrl: string().required(),
})

// Types
// =====

export type HomeContent = InferType<typeof homeContentSchema>

// Functions
// =========

export async function getHomeContent(locale: string): Promise<HomeContent> {
  return getSingletonEntryContent({
    content_type: 'pageHome',
    schema: homeContentSchema,
    locale,
  })
}
