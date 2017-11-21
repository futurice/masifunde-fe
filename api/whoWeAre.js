import { fetchSingleEntry } from './contentfulService'

export async function fetchWhoWeArePage(locale) {
  return fetchSingleEntry('about', locale)
}

const unwrapImage = image => ({
  url: image.fields.file.url,
  title: image.fields.title,
})

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

export async function fetchTeamDePage(locale) {
  const content = await fetchSingleEntry('pageTeamDe', locale)
  return {
    ...content,
    sectionOneImage: unwrapImage(content.sectionOneImage),
    teamMembers: unwrapTeamMembers(content.teamMembers),
  }
}
