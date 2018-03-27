import { fetchSingleEntry } from './contentfulService'
import {
  unwrapFiles,
  unwrapTeamMember,
} from './common'

export async function fetchDocumentPage(locale) {
  const content = await fetchSingleEntry('pageDokumente', locale)
  return {
    ...content,
    teamMember: unwrapTeamMember(content.teamMember),
    documentsList1: unwrapFiles(content.documentsList1),
    documentsList2: unwrapFiles(content.documentsList2),
    documentsList3: unwrapFiles(content.documentsList3),
  }
}
