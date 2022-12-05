import { fetchSingleEntry } from '../utils/contentful-legacy'
import { unwrapPageUrl } from './shared/common'

export async function fetchErrorPage404(locale) {
  const content = await fetchSingleEntry('page404', locale)
  return {
    ...content,
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}
