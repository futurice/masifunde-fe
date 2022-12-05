import { fetchSingleEntry } from '../utils/contentful-legacy'
import {
  unwrapCampaignPageBanner,
  unwrapAnnouncement,
  unwrapPageUrl,
  unwrapPortrait,
  unwrapStats,
} from './shared/common'

export async function fetchHomePage(locale) {
  const content = await fetchSingleEntry('pageHome', locale)
  return {
    ...content,
    portrait: unwrapPortrait(content && content.portrait),
    stats: unwrapStats(content && content.stats),
    banner1ButtonUrl: unwrapPageUrl(content.banner1ButtonUrl),
    banner2ButtonUrl: unwrapPageUrl(content.banner2ButtonUrl),
    campaign: unwrapCampaignPageBanner(content.campaign),
    announcement: unwrapAnnouncement(content.announcement),
  }
}
