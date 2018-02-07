/* eslint-disable import/prefer-default-export */
import { fetchEntriesForContentType, fetchSingleEntry } from './contentfulService'
import { unwrapTeamMember, unwrapImage } from './common'

export function fetchBlogPost(locale, slug) {
  return fetchEntriesForContentType(
    'blogPost',
    {
      locale,
      'fields.slug': slug,
    },
  )
    .then((entries) => {
      if (entries.length === 0) {
        const e = new Error(`Could not find blog post with slug: ${slug}`)
        e.id = 'POST_NOT_FOUND'
        throw e
      }
      return entries[0]
    })
    .then(entry => entry.fields)
    .then(fields => ({
      ...fields,
      heroImage: fields.heroImage && unwrapImage(fields.heroImage),
      authorTeamMember: fields.authorTeamMember && unwrapTeamMember(fields.authorTeamMember),
    }))
}

export async function fetchBlogPostPage(locale) {
  return fetchSingleEntry('pageBlogPost', locale)
}
