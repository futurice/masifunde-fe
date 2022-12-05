import { fetchSingleEntry } from '../utils/contentful-legacy'
import { unwrapFields, unwrapImages, unwrapTeamMember } from './shared/common'

export async function fetchCampaignPage(locale) {
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
