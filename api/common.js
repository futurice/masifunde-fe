import { fetchSingleEntry } from './contentfulService'

export async function fetchHeaderData(locale) {
  return fetchSingleEntry('header', locale)
}

export async function fetchFooterData(locale) {
  return fetchSingleEntry('footer', locale)
}
