import { fetchSingleEntry } from '../utils/contentful-legacy'

export async function fetchTransparenzPage(locale) {
  return fetchSingleEntry('pageTransparenz', locale)
}
