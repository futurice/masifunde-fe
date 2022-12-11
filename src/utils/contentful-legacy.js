/**
 * The legacy module for interfacing with Contentful.
 *
 * @module
 */

import { contentfulClient } from './contentful'

export const client = contentfulClient

const singleEntryCache = new Map()

export function fetchEntriesForContentType(
  contentType,
  { unpackItems = true, ...config }
) {
  return client
    .getEntries({
      include: 10,
      content_type: contentType,
      locale: 'de',
      ...config,
    })
    .then((response) => (unpackItems ? response.items : response))
    .catch((error) => {
      /* eslint-disable no-console */
      console.log(
        `Error occurred while fetching Entries for ${contentType.name}:`
      )
      console.error(error)
    })
}

export function fetchSingleEntry(contentType, locale = 'de') {
  return fetchEntriesForContentType(contentType, { locale, limit: 1 })
    .then((pages) => pages.map((page) => page.fields))
    .then((pages) => {
      if (pages.length === 0) {
        throw new Error(`No content for Contentful contentType: ${contentType}`)
      }
      return pages[0]
    })
}

export async function fetchMemoizedSingleEntry(contentType, locale = 'de') {
  const cacheKey = `${contentType}/${locale}`
  if (singleEntryCache.has(cacheKey)) {
    return singleEntryCache.get(cacheKey)
  } else {
    const entry = await fetchSingleEntry(contentType, locale)
    singleEntryCache.set(cacheKey, entry)
    return entry
  }
}
