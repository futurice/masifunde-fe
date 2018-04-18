import { fetchSingleEntry } from './contentfulService'
import {
  unwrapFields,
  unwrapFiles,
  unwrapTeamMember,
} from './common'

const unwrapVideos = (videos = []) => videos.map(unwrapFields)

export async function fetchPressPage(locale) {
  const content = await fetchSingleEntry('pagePress', locale)
  return {
    ...content,
    videosList: unwrapVideos(content.videosList),
    documentsList1: unwrapFiles(content.documentsList1),
    documentsList2: unwrapFiles(content.documentsList2),
    teamMember: unwrapTeamMember(content.teamMember),
  }
}
