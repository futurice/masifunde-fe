import { createClient } from 'contentful'
import memoize from 'mem'

const SPACE_ID = '6jocdllnp50q'
const ACCESS_TOKEN = '5c8090d12bc2bf8dc695353cc398cd5e48eb56c214325884284bfdbfef4ba5ed'

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
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

export const fetchMemoizedSingleEntry = memoize(fetchSingleEntry)
