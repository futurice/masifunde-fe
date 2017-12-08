import { createClient } from 'contentful'
import memoize from 'memoizee'

import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_HOST, CONTENTFUL_SPACE_ID } from '../env'

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  host: CONTENTFUL_HOST,
})

export function fetchEntriesForContentType(contentType, locale = 'de') {
  return client.getEntries({
    include: 10,
    content_type: contentType,
    locale,
  })
    .then(response => response.items)
    .catch((error) => {
      console.log(`\nError occurred while fetching Entries for ${contentType.name}:`)
      console.error(error)
    })
}

export function fetchSingleEntry(contentType, locale = 'de') {
  return fetchEntriesForContentType(contentType, locale)
    .then(pages => pages.map(page => page.fields))
    .then((pages) => {
      if (pages.length === 0) {
        throw new Error(`No content for Contentful contentType: ${contentType}`)
      }
      return pages[0]
    })
}

export const fetchMemoizedSingleEntry = memoize(fetchSingleEntry, { promise: true })
