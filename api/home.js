import { fetchSingleEntry } from './contentfulService'
import {
  unwrapCampaignPage,
  unwrapPageUrl,
  unwrapPortrait,
  unwrapStats,
} from './common'

export async function fetchHomePage(locale) {
  const content = await fetchSingleEntry('pageHome', locale)
  return {
    ...content,
    portrait: unwrapPortrait(content && content.portrait),
    stats: unwrapStats(content && content.stats),
    banner1ButtonUrl: unwrapPageUrl(content.banner1ButtonUrl),
    banner2ButtonUrl: unwrapPageUrl(content.banner2ButtonUrl),
    campaign: unwrapCampaignPage(content.campaign),
  }
}
