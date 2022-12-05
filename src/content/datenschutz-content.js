import { fetchSingleEntry } from '../utils/contentful-legacy'

export async function fetchDatenschutzPage(locale) {
  return fetchSingleEntry('pageDatenschutz', locale)
}
