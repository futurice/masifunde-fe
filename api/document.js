import { fetchSingleEntry } from './contentfulService'
import {
  unwrapFields,
  unwrapFiles,
  unwrapTeamMember,
} from './common'

const unwrapVideos = (videos = []) => videos.map(unwrapFields)

export async function fetchDocumentPage(locale) {
  const dokumenteContent = await fetchSingleEntry('pageDokumente', locale)
  return {
    ...dokumenteContent,
    teamMember: unwrapTeamMember(dokumenteContent.teamMember),
    documentsList1: unwrapFiles(dokumenteContent.documentsList1),
    documentsList2: unwrapFiles(dokumenteContent.documentsList2),
    documentsList3: unwrapFiles(dokumenteContent.documentsList3),
    videosList: unwrapVideos(dokumenteContent.videosList),
    pressKitList: unwrapFiles(dokumenteContent.pressKitList),
    pressReleaseList: unwrapFiles(dokumenteContent.pressReleaseList),
  }
}
