import { fetchSingleEntry } from './contentfulService'
import { unwrapImage, unwrapRegion } from './common'

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

  const unwrapTeamMembers = (teamMembers = []) =>
    teamMembers.map((teamMember) => {
      const { fields } = teamMember
      return {
        id: teamMember.sys.id,
        name: fields.name,
        image: unwrapImage(fields.profileImage),
        region: unwrapRegion(fields.region),
      }
    })

  return {
    ...content,
    sectionOneImage: unwrapImage(content.sectionOneImage),
    teamMembers: unwrapTeamMembers(content.teamMembers),
  }
}
