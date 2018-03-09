import { fetchSingleEntry } from './contentfulService'

export async function fetchDatenschutzPage(locale) {
  return fetchSingleEntry('pageDatenschutz', locale)
}
