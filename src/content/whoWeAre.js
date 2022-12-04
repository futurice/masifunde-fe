import { fetchSingleEntry } from './contentfulService'
import {
  unwrapAward,
  unwrapImage,
  unwrapPageUrl,
  unwrapPartner,
  unwrapRegionalGroups,
  unwrapTeamMembers,
  unwrapTestimonials,
} from './common'

export async function fetchWhoWeArePage(locale) {
  const response = await fetchSingleEntry('about', locale)

  return {
    ...response,
    teamDeImage: unwrapImage(response && response.teamDeImage),
    teamSaImage: unwrapImage(response && response.teamSaImage),
    partnersListOne: response && response.partnersListOne.map(unwrapPartner),
    awards: response && response.awards.map(unwrapAward),
    patronsList: unwrapTestimonials(response.patronsList),
    bannerButtonUrl: unwrapPageUrl(response.bannerButtonUrl),
  }
}

export async function fetchTeamDePage(locale) {
  const content = await fetchSingleEntry('pageTeamDe', locale)

  return {
    ...content,
    teamMembers: unwrapTeamMembers(content && content.teamMembers),
    regionalGroups: unwrapRegionalGroups(content && content.regionalGroups),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

export async function fetchTeamSaPage(locale) {
  const content = await fetchSingleEntry('pageTeamSa', locale)

  return {
    ...content,
    introImage: unwrapImage(content && content.introImage),
    teamMembers: unwrapTeamMembers(content && content.teamMembers),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}
