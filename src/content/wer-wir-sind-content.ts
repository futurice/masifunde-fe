import { InferType, array, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'
import { assetSchema } from './shared/assets'
import { regionalGroupSchema, teamMemberSchema } from './shared/team'

// Schema
// ======

/**
 * Schema for the "Partner" (`partner`) content type.
 */
export const partnerSchema = object({
  name: string().required(),
  logo: assetSchema.required(),
  link: string().required(),
})

/**
 * Schema for the "Award" (`award`) content type.
 */
export const awardSchema = object({
  name: string().required(),
  logo: assetSchema.required(),
  description: string().required(),
})

/**
 * Schema for the "Testimonial" (`testimonial`) content type.
 */
export const testimonialSchema = object({
  name: string().required(),
  title: string().required(),
  testimonialMarkdown: string().required(),
  image: assetSchema.required(),
})

/**
 * Schema for the "Regional Group Country" (`regionalGroups`) content type.
 */
export const regionalGroupCountrySchema = object({
  name: string().required(),
  image: assetSchema.required(),
  regions: array(regionalGroupSchema).required(),
})

/**
 * Schema for the "Page: Wer wir sind" (`about`) content type.
 * (English: "Who we are")
 */
export const whoWeAreContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  title: string().required(),
  paragraphOneTitle: string().required(),
  paragraphOneText: string().required(),
  teamDeImage: assetSchema.required(),
  teamDeButtonText: string().required(),
  teamSaImage: assetSchema.required(),
  teamSaButtonText: string().required(),
  paragraphTwoTitle: string().required(),
  paragraphTwoText: string().required(),
  partnersListOne: array(partnerSchema).default([]),
  partnersButtonText: string().required(),
  paragraphThreeTitle: string().required(),
  paragraphThreeText: string().required(),
  awards: array(awardSchema).default([]),
  patronsHeadline: string().required(),
  patronsText: string(),
  patronsList: array(testimonialSchema).default([]),
  bannerHeadline: string().required(),
  bannerText: string().required(),
  bannerButtonUrl: string().required(),
})

/**
 * Schema for the "Page: Team DE" (`pageTeamDe`) content type.
 */
export const teamDeContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  title: string().required(),
  pageDescription: string().required(),
  sectionOneTitle: string().required(),
  sectionOneText: string().required(),
  regionalGroups: regionalGroupCountrySchema.required(),
  sectionTwoTitle: string().required(),
  teamMembers: array(teamMemberSchema).default([]),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

/**
 * Schema for the "Page: Team SA" (`pageTeamSa`) content type.
 */
export const teamSaContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  introTitle: string().required(),
  introMarkdown: string().required(),
  introImage: assetSchema.required(),
  teamMembers: array(teamMemberSchema).default([]),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

// Types
// =====

export type Partner = InferType<typeof partnerSchema>
export type Award = InferType<typeof awardSchema>
export type Testimonial = InferType<typeof testimonialSchema>
export type RegionalGroupCountry = InferType<typeof regionalGroupCountrySchema>
export type WhoWeAreContent = InferType<typeof whoWeAreContentSchema>
export type TeamDeContent = InferType<typeof teamDeContentSchema>
export type TeamSaContent = InferType<typeof teamSaContentSchema>

// Functions
// =========

export function getWhoWeAreContent(locale: string): Promise<WhoWeAreContent> {
  return getSingletonEntryContent({
    content_type: 'about',
    schema: whoWeAreContentSchema,
    locale,
  })
}

export function getTeamDeContent(locale: string): Promise<TeamDeContent> {
  return getSingletonEntryContent({
    content_type: 'pageTeamDe',
    schema: teamDeContentSchema,
    include: 2,
    locale,
  })
}

export function getTeamSaContent(locale: string): Promise<TeamSaContent> {
  return getSingletonEntryContent({
    content_type: 'pageTeamSa',
    schema: teamSaContentSchema,
    locale,
  })
}
