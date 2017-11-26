import { fetchSingleEntry } from './contentfulService'
import { unwrapImage } from './common'

export async function fetchWhoWeArePage(locale) {
  return fetchSingleEntry('about', locale)
}

export async function fetchTeamDePage(locale) {
  const content = await fetchSingleEntry('pageTeamDe', locale)

  const unwrapRegion = region => region.fields.name

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
