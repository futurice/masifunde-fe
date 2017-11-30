import { fetchMemoizedSingleEntry } from './contentfulService'

export async function fetchHeaderData(locale) {
  return fetchMemoizedSingleEntry('header', locale)
}

export async function fetchFooterData(locale) {
  return fetchMemoizedSingleEntry('footer', locale)
}

export const unwrapImage = image => ({
  url: image.fields.file.url,
  title: image.fields.title,
})

export const unwrapRegion = region => region.fields.name

export const unwrapTeamMembers = (teamMembers = []) =>
  teamMembers.map((teamMember) => {
    const { fields } = teamMember
    return {
      id: teamMember.sys.id,
      ...fields,
      image: unwrapImage(fields.profileImage),
      region: unwrapRegion(fields.region),
    }
  })
