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

export const unwrapRegionalGroups = regionalGroups => ({
  name: regionalGroups.fields.name,
  image: unwrapImage(regionalGroups.fields.image),
  regions: regionalGroups.fields.regions.map(unwrapRegion),
})

export const unwrapTeamMember = (teamMember) => {
  const { fields } = teamMember
  return {
    id: teamMember.sys.id,
    ...fields,
    image: unwrapImage(fields.profileImage),
    region: unwrapRegion(fields.region),
  }
}

export const unwrapTeamMembers = (teamMembers = []) => teamMembers.map(unwrapTeamMember)
