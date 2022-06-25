import { createClient } from 'contentful'
import memoize from 'promise-memoize'

import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_HOST,
  CONTENTFUL_SPACE_ID,
} from '../env'

export const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  host: CONTENTFUL_HOST,
  retryOnError: true,
  retryLimit: 15,
})

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

export const fetchMemoizedSingleEntry = memoize(fetchSingleEntry)
