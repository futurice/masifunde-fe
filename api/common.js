import qs from 'qs'
import { stripUnit } from 'polished'

import { fetchMemoizedSingleEntry } from './contentfulService'
import { jpegQuality, teamMemberAndPartnerWidth } from '../utils/constants'
import { RouteNames } from '../routes'

export async function fetchHeaderData(locale) {
  return fetchMemoizedSingleEntry('header', locale)
}

export async function fetchFooterData(locale) {
  return fetchMemoizedSingleEntry('footer', locale)
}

// For a list of valid image URL parameters, see the Contentful API docs:
// https://www.contentful.com/developers/docs/references/images-api
export const unwrapImage = (image, urlParams) => {
  const imageFile = image && image.fields && image.fields.file

  if (!imageFile) {
    return undefined
  }

  const urlQuery = urlParams ? `?${qs.stringify(urlParams)}` : ''

  return {
    url: imageFile.url + urlQuery,
    title: imageFile.title || '',
  }
}

export const unwrapRegion = region => region && region.fields && region.fields.name

export const unwrapPortrait = (portrait) => {
  const imageParams = {
    w: 800,
    q: jpegQuality,
  }

  return {
    ...portrait.fields,
    page1Image: unwrapImage(portrait && portrait.fields.page1Image, imageParams),
    page2Image: unwrapImage(portrait && portrait.fields.page2Image, imageParams),
    page3Image: unwrapImage(portrait && portrait.fields.page3Image, imageParams),
  }
}

export const unwrapStat = stat => ({
  ...stat.fields,
  icon: unwrapImage(stat && stat.fields && stat.fields.icon),
})

export const unwrapStats = stats => stats.map(unwrapStat)

export const unwrapPageUrl = (pageUrl) => {
  if (!pageUrl) {
    return RouteNames.Index
  }

  // Contentful allows the editors to input either 'http' or 'https'.
  // Additionally, editors can choose to include or exclude the 'www'.
  const regex = /http(s)?:\/\/(www.)?masifunde.de/

  const matches = pageUrl.match(regex)
  const regexMatchesStartOfUrl = matches && matches.index === 0
  if (regexMatchesStartOfUrl) {
    const matchLength = matches[0].length
    // remove the part of the url that matches the regex
    const internalUrl = pageUrl.substring(matchLength)
    return internalUrl || RouteNames.Index
  }

  return pageUrl
}

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
  if (!teamMember) {
    return undefined
  }

  const { fields } = teamMember
  return {
    id: teamMember.sys.id,
    ...fields,
    image: unwrapImage(fields.profileImage, {
      w: stripUnit(teamMemberAndPartnerWidth) * 2, // double the size for retina screens
      h: stripUnit(teamMemberAndPartnerWidth) * 2,
      q: jpegQuality,
      fit: 'thumb',
      f: 'face',
    }),
    region: unwrapRegion(fields.region),
  }
}

export const unwrapTeamMembers = (teamMembers = []) => teamMembers.map(unwrapTeamMember)

export const unwrapPartner = partner => ({
  ...partner.fields,
  image: unwrapImage(partner && partner.fields && partner.fields.logo, {
    w: stripUnit(teamMemberAndPartnerWidth) * 2, // double the size for retina screens
    h: stripUnit(teamMemberAndPartnerWidth) * 2,
    q: jpegQuality,
    fit: 'pad',
  }),
})

export const unwrapPartners = partners => partners.map(unwrapPartner)

export const unwrapAward = award => ({
  ...award.fields,
  image: unwrapImage(award && award.fields && award.fields.logo, {
    w: 320,
    q: jpegQuality,
  }),
})

export function unwrapFields(response) {
  return response && response.fields
}

export const unwrapProjects = (projects = []) =>
  projects.map(({ fields }) => ({
    ...fields,
    image: unwrapImage(fields && fields.image),
  }))

export const unwrapTestimonials = (testimonials = []) =>
  testimonials.map(({ fields }) => ({
    ...fields,
    image: unwrapImage(fields.image, {
      w: 320,
      h: 320,
      q: jpegQuality,
      fit: 'thumb',
      f: 'face',
    }),
    testimonial: fields.testimonialMarkdown,
  }))
