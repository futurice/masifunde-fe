/* eslint-disable import/prefer-default-export */
import { fetchSingleEntry } from './contentfulService'
import { unwrapPortrait, unwrapStats } from './common'

export async function fetchHomePage(locale) {
  const content = await fetchSingleEntry('pageHome', locale)
  return {
    ...content,
    portrait: unwrapPortrait(content && content.portrait),
    stats: unwrapStats(content && content.stats),
  }
}
