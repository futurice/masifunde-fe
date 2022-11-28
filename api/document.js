import { fetchSingleEntry } from './contentfulService'
import {
  isUnresolvedLink,
  unwrapFields,
  unwrapDocuments,
  unwrapTeamMember,
} from './common'

const unwrapVideos = (videos = []) =>
  videos.filter((video) => !isUnresolvedLink(video)).map(unwrapFields)

export async function fetchDocumentPage(locale) {
  const content = await fetchSingleEntry('pageDokumente', locale)
  return {
    ...content,
    teamMember: unwrapTeamMember(content.teamMember),
    documentsList1: unwrapDocuments(content.documentsList1 || []),
    documentsList2: unwrapDocuments(content.documentsList2 || []),
    documentsList3: unwrapDocuments(content.documentsList3 || []),
    videosList: unwrapVideos(content.videosList),
    pressKitList: unwrapDocuments(content.pressKitList || []),
    pressReleaseList: unwrapDocuments(content.pressReleaseList || []),
  }
}
