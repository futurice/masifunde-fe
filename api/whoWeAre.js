/* eslint-disable import/prefer-default-export */
import { fetchSingleEntry } from './contentfulService'

export async function fetchWhoWeArePage(locale) {
  return fetchSingleEntry('about', locale)
}
