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

function fetchBlogPostPageTemplate(locale) {
  return fetchSingleEntry('pageBlogPost', locale)
}

export function fetchBlogPostPage(locale, slug) {
  return Promise.all([
    fetchBlogPostPageTemplate(locale),
    fetchBlogPost(locale, slug)
      .catch((error) => {
        if (error.id === 'POST_NOT_FOUND') {
          return { error: error.toString() }
        }
        throw error
      }),
  ])
    .then((results) => {
      const page = results[0]
      const post = results[1]
      return {
        ...page,
        ...post,
      }
    })
}
