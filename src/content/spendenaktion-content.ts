import { InferType, array, boolean, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'
import { assetSchema } from './shared/assets'
import { donationAmountSchema, donationIntervalSchema } from './shared/donation'
import { teamMemberSchema } from './shared/team'

// Schema
// ======

/**
 * Schema for the "Page: Campaign" (`pageCampaign`) content type.
 */
export const campaignContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string(),
  isActive: boolean().default(false),
  introHeading: string().required(),
  introMarkdown: string().required(),
  imageList: array(assetSchema).default([]),
  contentMarkdown: string().required(),
  teamMemberHeading: string().required(),
  teamMember: teamMemberSchema.required(),
  bannerSmallTitle: string().required(),
  bannerButtonText: string().required(),
  // Donation Form
  section2Title: string().required(),
  section2ReferenceList: array(donationIntervalSchema).default([]),
  amountHeading: string().required(),
  amounts: array(donationAmountSchema).default([]),
  formHeading: string().required(),
  fundraisingboxIframeHeading: string().required(),
})

/**
 * The subset of {@link campaignContentSchema} used to link to the
 * campaign from other pages.
 */
export const campaignSummarySchema = campaignContentSchema.pick([
  'isActive',
  'introHeading',
  'introMarkdown',
  'imageList',
  'bannerSmallTitle',
  'bannerButtonText',
])

// Types
// =====

export type CampaignContent = InferType<typeof campaignContentSchema>
export type CampaignSummary = InferType<typeof campaignSummarySchema>

// Functions
// =========

export function getCampaignContent(locale: string): Promise<CampaignContent> {
  return getSingletonEntryContent({
    content_type: 'pageCampaign',
    schema: campaignContentSchema,
    locale,
  })
}
