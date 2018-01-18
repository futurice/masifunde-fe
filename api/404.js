/* eslint-disable import/prefer-default-export */
import { fetchSingleEntry } from './contentfulService'
import { unwrapPageUrl } from './common'

export async function fetchErrorPage404(locale) {
  const content = await fetchSingleEntry('page404', locale)
  return {
    ...content,
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}
