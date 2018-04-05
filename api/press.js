import { fetchSingleEntry } from './contentfulService'
import { unwrapFiles, unwrapTeamMember } from './common'

export async function fetchPressPage(locale) {
  const content = await fetchSingleEntry('pagePress', locale)
  return {
    ...content,
    documentsList1: unwrapFiles(content.documentsList1),
    documentsList2: unwrapFiles(content.documentsList2),
    teamMember: unwrapTeamMember(content.teamMember),
  }
}
