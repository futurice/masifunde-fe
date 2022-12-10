/**
 * This module provides a Contentful.js client object, as well as
 * utilities for fetching and working with content entries. It is
 * used by the modules in `./content`.
 *
 * @module
 */

import { EntriesQueries, Entry, createClient } from 'contentful'
import { Schema, mixed } from 'yup'
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_HOST,
  CONTENTFUL_SPACE_ID,
} from '../env'

/**
 * A Contentful client pre-configured with Contentful credentials for
 * the Masifunde.de space.
 */
export const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  host: CONTENTFUL_HOST,
  retryOnError: true,
  retryLimit: 15,
})

// Types
// =====

/**
 * Options for {@link getEntriesContent}.
 */
export type GetEntriesContentOptions<T> = EntriesQueries & {
  locale: string // make sure that `locale` is passed
  schema: Schema<T>
}

/**
 * Options for {@link getSingletonEntryContent}.
 */
export type GetSingletonEntryContentOptions<T> = EntriesQueries & {
  locale: string // make sure that `locale` is passed
  limit?: never // do not allow `limit` as it will be overridden anyway
  schema: Schema<T>
}

// Functions
// =========

/**
 * Fetches the Contentful entries matching a query and returns each
 * entry's content (see {@link extractContent}).
 *
 * Each entry's content is validated against the schema passed as part
 * of `options`. All other options are forwarded to the Contentful
 * JavaScript SDK.
 *
 * If an entry contains an unresolved link to another entry (e.g.,
 * because the other entry was deleted or unpublished), that link is
 * removed from the result. This is different from the default behavior
 * of Contentful.js, which usually returns a content-less entry of
 * type "Link".
 *
 * @param options - Query options.
 * @returns The matching entries' content.
 */
export async function getEntriesContent<T>(
  options: GetEntriesContentOptions<T>
): Promise<T[]> {
  const { schema, ...query } = options
  const client = contentfulClient.withoutUnresolvableLinks
  const { items: entries } = await client.getEntries(query)
  return entries.map((entry) => extractContent(entry, schema))
}

/**
 * Fetches the single Contentful entry matching a query and returns its
 * content (see {@link extractContent}). If there is no matching entry
 * or there is more than one, an error is thrown.
 *
 * Other than returning only one entry, this function behaves like
 * {@link getEntriesContent}; see there for more details.
 *
 * @param options - Query options.
 * @returns The content of the single matching entry.
 * @throws If there no or more than one matching entry.
 */
export async function getSingletonEntryContent<T>(
  options: GetSingletonEntryContentOptions<T>
): Promise<T> {
  const { schema, ...query } = options
  const client = contentfulClient.withoutUnresolvableLinks

  const {
    total,
    items: [item],
  } = await client.getEntries({ ...query, limit: 1 })

  if (!item) {
    throw new Error(`No entry for query: "${JSON.stringify(query)}"`)
  } else if (total > 1) {
    throw new Error(`More than one entry for query: ${JSON.stringify(query)}`)
  }

  return extractContent(item, schema)
}

/**
 * Returns only the `fields` data from a Contentful entry and its
 * nested entries, throwing away all `sys` and `metadata`. For
 * instance, an entry that looks like this:
 *
 * ```js
 * {
 *   sys: { ... },
 *   metadata: { ... },
 *   fields: {
 *     simpleField:  'value',
 *     anotherSimpleField: 123,
 *     nestedEntries: [
 *       {
 *         sys: { ... },
 *         metadata: { ... },
 *         fields: { nested: 'value' }
 *       }
 *     ]
 *   }
 * }
 * ```
 *
 * will be reduced to just:
 *
 * ```js
 * {
 *   simpleField:  'value',
 *   anotherSimpleField: 123,
 *   nestedEntries: [{ nested: 'value' }]
 * }
 * ```
 *
 * For type safety, a data schema must be passed against the content
 * will then be validated.
 *
 * @param entry - The entry to flatten.
 * @param schema - The schema to validate against.
 * @returns The validated content of this and nested entries.
 * @throws If content validation fails.
 */
export function extractContent<T>(entry: Entry<unknown>, schema: Schema<T>): T {
  const content: Record<string, unknown> =
    typeof entry.fields === 'object' ? { ...entry.fields } : {}

  for (const [field, value] of Object.entries(content)) {
    content[field] = extractContentFromFieldValue(value)
  }
  return schema.validateSync(content)
}

function extractContentFromFieldValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(extractContentFromFieldValue)
  } else if (isEntry(value)) {
    return extractContent(value, mixed())
  } else {
    return value
  }
}

function isEntry(x: unknown): x is Entry<unknown> {
  return (
    typeof x === 'object' &&
    x !== null &&
    'sys' in x &&
    'metadata' in x &&
    'fields' in x
  )
}
