import { fetchSingleEntry } from './contentfulService'

export async function fetchTransparenzPage(locale) {
  return fetchSingleEntry('pageTransparenz', locale)
}
