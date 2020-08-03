import { fetchSingleEntry } from './contentfulService'
import {
  unwrapFields,
  unwrapFiles,
  unwrapTeamMember,
} from './common'

const unwrapVideos = (videos = []) => videos.map(unwrapFields)

export async function fetchDocumentPage(locale) {
  const dokumenteContent = await fetchSingleEntry('pageDokumente', locale)
  const pressContent = await fetchSingleEntry('pagePress', locale)
  return {
    ...dokumenteContent,
    ...pressContent,
    teamMember: unwrapTeamMember(dokumenteContent.teamMember),
    documentsList1: unwrapFiles(dokumenteContent.documentsList1),
    documentsList2: unwrapFiles(dokumenteContent.documentsList2),
    documentsList3: unwrapFiles(dokumenteContent.documentsList3),
    videosList: unwrapVideos(pressContent.videosList),
    documentsList1Press: unwrapFiles(pressContent.documentsList1),
    documentsList2Press: unwrapFiles(pressContent.documentsList2),
    teamMemberPress: unwrapTeamMember(pressContent.teamMember),
  }
}
