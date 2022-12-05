import { fetchSingleEntry } from '../utils/contentful-legacy'

export async function fetchImpressumPage(locale) {
  return fetchSingleEntry('pageImpressum', locale)
}
