/* eslint-disable import/prefer-default-export */
import { fetchSingleEntry } from './contentfulService'

export async function fetchImpressumPage(locale) {
  return fetchSingleEntry('pageImpressum', locale)
}
