import { fetchSingleEntry } from './contentfulService'
import { unwrapFields, unwrapDocuments, unwrapTeamMember } from './common'

const unwrapVideos = (videos = []) => videos.map(unwrapFields)

export async function fetchPressPage(locale) {
  const content = await fetchSingleEntry('pagePress', locale)
  return {
    ...content,
    videosList: unwrapVideos(content.videosList || []),
    documentsList1: unwrapDocuments(content.documentsList1 || []),
    documentsList2: unwrapDocuments(content.documentsList2 || []),
    teamMember: unwrapTeamMember(content.teamMember),
  }
}
