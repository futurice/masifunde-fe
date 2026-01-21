import { InferType, array, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'
import { assetSchema } from './shared/assets'
import { donationAmountSchema, donationIntervalSchema } from './shared/donation'
import { teamMemberSchema } from './shared/team'
import { campaignSummarySchema } from './spendenaktion-content'
import { partnerSchema, testimonialSchema } from './wer-wir-sind-content'

// Schema
// ======

/**
 * Schema for the "Volunteer Opening" (`volunteerOpening`) content type.
 */
export const volunteerOpeningSchema = object({
  title: string().required(),
  description: string().required(),
})

/**
 * Schema for the "Page: Wie Sie helfen" (`pageWieSieHelfen`) content type.
 * (English: "How to help")
 */
export const howToHelpContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  heroTitle: string().required(),
  introHeading: string().required(),
  introMarkdown: string().required(),
  section1Image: assetSchema.required(),
  section1Title: string().required(),
  section1Markdown: string().required(),
  section1ButtonText: string().required(),
  section2Image: assetSchema.required(),
  section2Title: string().required(),
  section2Markdown: string().required(),
  section2ButtonText: string().required(),
  section3Image: assetSchema.required(),
  section3Title: string().required(),
  section3Markdown: string().required(),
  section3ButtonText: string().required(),
  section4Image: assetSchema.required(),
  section4Title: string().required(),
  section4Markdown: string().required(),
  section4ButtonText: string().required(),
  campaign: campaignSummarySchema.optional().default(undefined),
})

/**
 * Schema for the "Page: Aktiv werden" (`pageAktivWerden`) content type.
 * (English: "Become active" / "Become a volunteer")
 */
export const becomeVolunteerContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  // Intro
  introTitle: string().required(),
  introMarkdown: string().required(),
  // Germany
  deTestimonialsHeading: string().required(),
  deTestimonials: array(testimonialSchema).default([]),
  deVolunteerOpeningsHeading: string().required(),
  deVolunteerOpenings: array(volunteerOpeningSchema).default([]),
  deVolunteerContactHeading: string().required(),
  deVolunteerContactText: string().required(),
  deVolunteerContact: teamMemberSchema.required(),
  // South Africa
  saVolunteerOpening1Heading: string().required(),
  saVolunteerOpening1Text: string().required(),
  saVolunteerOpening1ContactHeading: string().required(),
  saVolunteerOpening1ContactText: string().required(),
  saVolunteerOpening1Contact: teamMemberSchema.required(),
  saVolunteerOpening2Heading: string().required(),
  saVolunteerOpening2Text: string().required(),
  saVolunteerOpening2ContactHeading: string().required(),
  saVolunteerOpening2ContactText: string().required(),
  saVolunteerOpening2Contact: teamMemberSchema.required(),
  // Banner
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
}).transformKeys((key) => {
  // Temporarily support old field names.
  // TODO: Rename field names in Contentful to the new ones.
  switch (key) {
    // Germany
    case 'section3Title':
      return 'deTestimonialsHeading'
    case 'section1ReferenceList':
      return 'deTestimonials'
    case 'section2Title':
      return 'deVolunteerOpeningsHeading'
    case 'volunteerOpenings':
      return 'deVolunteerOpenings'
    case 'section1Title':
      return 'deVolunteerContactHeading'
    case 'section1Markdown':
      return 'deVolunteerContactText'
    case 'section1TeamMember':
      return 'deVolunteerContact'
    // South Africa
    case 'section4Title':
      return 'saVolunteerOpening1Heading'
    case 'section4Markdown':
      return 'saVolunteerOpening1Text'
    case 'section6Title':
      return 'saVolunteerOpening1ContactHeading'
    case 'section6Markdown':
      return 'saVolunteerOpening1ContactText'
    case 'section6TeamMember':
      return 'saVolunteerOpening1Contact'
    default:
      return key
  }
})

/**
 * Schema for the "Page: Pate werden" (`pagePateWerden`) content type.
 * (English: "Become a sponsor")
 */
export const becomeSponsorContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  title: string().required(),
  introSubtitle1: string().required(),
  introMarkdown1: string().required(),
  introSubtitle2: string().required(),
  introMarkdown2: string().required(),
  image: assetSchema.required(),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

/**
 * Schema for the "Page: Partner werden" (`pageBecomeAPartner`) content type.
 * (English: "Become a partner")
 */
export const becomePartnerContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  introTitle: string().required(),
  introMarkdown: string().required(),
  section1Title: string().required(),
  section1Markdown: string().required(),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
  partners: array(partnerSchema).default([]),
  teamMember: teamMemberSchema.required(),
})

/**
 * Schema for the "Page: Spenden" (`pageDonate`) content type.
 * (English: "Donate")
 */
export const donateContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  introHeading: string().required(),
  introMarkdown: string().required(),
  intro2Markdown: string().required(),
  // Donation Form
  section1title: string().required(),
  section1MarkdownDe: string().required(),
  section1MarkdownSa: string().required(),
  section2title: string().required(),
  section2ReferenceList: array(donationIntervalSchema).default([]),
  section3Title: string().required(),
  section3Text: string().required(),
  section3ReferenceList: array(donationAmountSchema).default([]),
  section4Title: string().required(),
  section5Title: string().required(),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

// Types
// =====

export type volunteerOpening = InferType<typeof volunteerOpeningSchema>
export type HowToHelpContent = InferType<typeof howToHelpContentSchema>
export type BecomeVolunteerContent = InferType<
  typeof becomeVolunteerContentSchema
>
export type BecomeSponsorContent = InferType<typeof becomeSponsorContentSchema>
export type BecomePartnerContent = InferType<typeof becomePartnerContentSchema>
export type DonateContent = InferType<typeof donateContentSchema>

// Functions
// =========

export function getHowToHelpContent(locale: string): Promise<HowToHelpContent> {
  return getSingletonEntryContent({
    content_type: 'pageWieSieHelfen',
    schema: howToHelpContentSchema,
    locale,
  })
}

export function getBecomeVolunteerContent(
  locale: string
): Promise<BecomeVolunteerContent> {
  return getSingletonEntryContent({
    content_type: 'pageAktivWerden',
    schema: becomeVolunteerContentSchema,
    locale,
  })
}

export function getBecomeSponsorContent(
  locale: string
): Promise<BecomeSponsorContent> {
  return getSingletonEntryContent({
    content_type: 'pagePateWerden',
    schema: becomeSponsorContentSchema,
    locale,
  })
}

export function getBecomePartnerContent(
  locale: string
): Promise<BecomePartnerContent> {
  return getSingletonEntryContent({
    content_type: 'pageBecomeAPartner',
    schema: becomePartnerContentSchema,
    locale,
  })
}

export function getDonateContent(locale: string): Promise<DonateContent> {
  return getSingletonEntryContent({
    content_type: 'pageDonate',
    schema: donateContentSchema,
    locale,
  })
}
