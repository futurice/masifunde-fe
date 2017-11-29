import { fetchSingleEntry } from './contentfulService'
import { unwrapImage, unwrapTeamMembers } from './common'

export async function fetchWhoWeArePage(locale) {
  const response = await fetchSingleEntry('about', locale)

  return {
    ...response,
    partnersListOne: response.partnersListOne.map(partners => ({
      ...partners.fields,
      image: unwrapImage(partners.fields.logo),
    })),
    partnersListTwo: response.partnersListTwo.map(partners => ({
      ...partners.fields,
      image: unwrapImage(partners.fields.logo),
    })),
  }
}

export async function fetchTeamDePage(locale) {
  const content = await fetchSingleEntry('pageTeamDe', locale)

  return {
    ...content,
    sectionOneImage: unwrapImage(content.sectionOneImage),
    teamMembers: unwrapTeamMembers(content.teamMembers),
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
