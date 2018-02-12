/* eslint-disable import/prefer-default-export */
import { fetchEntriesForContentType, fetchSingleEntry } from './contentfulService'
import { unwrapTeamMember, unwrapImage } from './common'

function blogPostFromEntry(entry) {
  return {
    ...entry.fields,
    heroImage: unwrapImage(entry.fields.heroImage),
    authorTeamMember: unwrapTeamMember(entry.fields.authorTeamMember),
  }
}

export async function fetchBlogPost(locale, slug) {
  const entries = await fetchEntriesForContentType('blogPost', {
    locale,
    'fields.slug': slug,
  })

  if (entries.length === 0) {
    const e = new Error(`Could not find blog post with slug: ${slug}`)
    e.name = 'PostNotFoundError'
    throw e
  }

  const entry = entries[0]
  return blogPostFromEntry(entry)
}

function fetchBlogPostPageTemplate(locale) {
  return fetchSingleEntry('pageBlogPost', locale)
}

export async function fetchBlogPostPage(locale, slug) {
  try {
    const [page, post] = await Promise.all([
      fetchBlogPostPageTemplate(locale),
      fetchBlogPost(locale, slug),
    ])
    return {
      ...page,
      ...post,
    }
  } catch (error) {
    if (error.name === 'PostNotFoundError') {
      return { error: error.toString() }
    }
    throw error
  }
}
