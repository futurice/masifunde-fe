import { fetchSingleEntry } from './contentfulService'

export async function fetchImpressumPage(locale) {
  return fetchSingleEntry('pageImpressum', locale)
}
