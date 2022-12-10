import { array, boolean, object, string } from 'yup'
import { fetchSingleEntry } from '../utils/contentful-legacy'
import { assetSchema } from './shared/assets'
import { unwrapFields, unwrapImages, unwrapTeamMember } from './shared/common'

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
  bannerSmallTitle: string().required(),
  bannerButtonText: string().required(),
  imageList: array(assetSchema).default([]),
})

// (Legacy)
// ========

export async function fetchCampaignPage(locale: string) {
  const content = await fetchSingleEntry('pageCampaign', locale)
  return {
    ...content,
    imageList: unwrapImages(content.imageList),
    amounts: content.amounts.map(unwrapFields),
    section2ReferenceList:
      (content &&
        content.section2ReferenceList &&
        content.section2ReferenceList.map(unwrapFields)) ||
      [],
    teamMember: unwrapTeamMember(content.teamMember),
  }
}
