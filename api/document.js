import { fetchSingleEntry } from './contentfulService'
import {
  unwrapFields,
  unwrapFiles,
  unwrapTeamMember,
} from './common'

const unwrapVideos = (videos = []) => videos.map(unwrapFields)

export async function fetchDocumentPage(locale) {
  const content = await fetchSingleEntry('pageDokumente', locale)
  return {
    ...content,
    teamMember: unwrapTeamMember(content.teamMember),
    documentsList1: unwrapFiles(content.documentsList1),
    documentsList2: unwrapFiles(content.documentsList2),
    documentsList3: unwrapFiles(content.documentsList3),
    videosList: unwrapVideos(content.videosList),
    pressKitList: unwrapFiles(content.pressKitList),
    pressReleaseList: unwrapFiles(content.pressReleaseList),
  }
}
