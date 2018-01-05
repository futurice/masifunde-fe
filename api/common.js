import { fetchMemoizedSingleEntry } from './contentfulService'

export async function fetchHeaderData(locale) {
  return fetchMemoizedSingleEntry('header', locale)
}

export async function fetchFooterData(locale) {
  return fetchMemoizedSingleEntry('footer', locale)
}

export const unwrapImage = image => ({
  url:
    image &&
    image.fields &&
    image.fields.file &&
    image.fields.file.url,
  title:
    image &&
    image.fields &&
    image.fields.title,
})

export const unwrapRegion = region => region && region.fields && region.fields.name

export const unwrapPortrait = portrait => ({
  ...portrait.fields,
  page1Image: unwrapImage(portrait && portrait.fields && portrait.fields.page1Image),
  page2Image: unwrapImage(portrait && portrait.fields && portrait.fields.page2Image),
  page3Image: unwrapImage(portrait && portrait.fields && portrait.fields.page3Image),
})

export const unwrapStat = stat => ({
  ...stat.fields,
  icon: unwrapImage(stat && stat.fields && stat.fields.icon),
})

export const unwrapStats = stats => stats.map(unwrapStat)

const unwrapRegionWithContactDetails = ({ fields }) => ({
  ...fields,
})

export const unwrapRegionalGroups = regionalGroups => ({
  name:
    regionalGroups &&
    regionalGroups.fields &&
    regionalGroups.fields.name,
  image: unwrapImage(regionalGroups && regionalGroups.fields && regionalGroups.fields.image),
  regions:
    regionalGroups &&
    regionalGroups.fields &&
    regionalGroups.fields.regions &&
    regionalGroups.fields.regions.map(unwrapRegionWithContactDetails),
})

export const unwrapTeamMember = (teamMember) => {
  const { fields } = teamMember
  return {
    id:
      teamMember &&
      teamMember.sys &&
      teamMember.sys.id,
    ...fields,
    image: unwrapImage(fields && fields.profileImage),
    region: unwrapRegion(fields && fields.region),
  }
}

export const unwrapTeamMembers = (teamMembers = []) => teamMembers.map(unwrapTeamMember)

export const unwrapPartner = partner => ({
  ...partner.fields,
  image: unwrapImage(partner && partner.fields && partner.fields.logo),
})

export const unwrapPartners = partners => partners.map(unwrapPartner)

export const unwrapAward = award => ({
  ...award.fields,
  image: unwrapImage(award && award.fields && award.fields.logo),
})

export function unwrapFields(response) {
  return response && response.fields
}
