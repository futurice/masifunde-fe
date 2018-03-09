import { fetchSingleEntry } from './contentfulService'
import { unwrapFields, unwrapImages, unwrapTeamMember } from './common'

export async function fetchCampaignPage(locale) {
  const content = await fetchSingleEntry('pageCampaign', locale)
  return {
    ...content,
    imageList: unwrapImages(content.imageList),
    amounts: content.amounts.map(unwrapFields),
    teamMember: unwrapTeamMember(content.teamMember),
  }
}
