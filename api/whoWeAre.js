import { fetchSingleEntry } from './contentfulService'
import { unwrapImage, unwrapPartner, unwrapRegionalGroups, unwrapTeamMembers } from './common'

export async function fetchWhoWeArePage(locale) {
  const response = await fetchSingleEntry('about', locale)

  return {
    ...response,
    partnersListOne: response.partnersListOne.map(unwrapPartner),
    partnersListTwo: response.partnersListTwo.map(unwrapPartner),
  }
}

export async function fetchTeamDePage(locale) {
  const content = await fetchSingleEntry('pageTeamDe', locale)

  return {
    ...content,
    teamMembers: unwrapTeamMembers(content.teamMembers),
    regionalGroups: unwrapRegionalGroups(content.regionalGroups),
  }
}

export async function fetchTeamSaPage(locale) {
  const content = await fetchSingleEntry('pageTeamSa', locale)

  return {
    ...content,
    introImage: unwrapImage(content.introImage),
    teamMembers: unwrapTeamMembers(content.teamMembers),
  }
}
