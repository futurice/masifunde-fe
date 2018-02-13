import { fetchEntriesForContentType, fetchSingleEntry } from './contentfulService'
import { unwrapTeamMember, unwrapImage } from './common'
import { jpegQuality } from '../utils/constants'
import formatDate from '../utils/date'

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

const fetchBlogPostLimit = 10

export function fetchBlogPostsList(locale, page) {
  const skip = fetchBlogPostLimit * (page - 1)
  return fetchEntriesForContentType(
    'blogPost',
    {
      locale,
      skip,
      limit: fetchBlogPostLimit,
      order: '-fields.date',
    },
  )
    .then(entries => (
      entries.map(({ sys, fields }) => {
        const author = fields.authorTeamMember
          ? unwrapTeamMember(fields.authorTeamMember).name
          : fields.authorExternal
        const teaserImage = unwrapImage(fields.teaserImage, { q: jpegQuality, w: 1000 })
        const date = formatDate(fields.date)
        return ({
          id: sys.id,
          title: fields.title,
          date,
          author,
          teaserText: fields.metaDescription,
          teaserImage,
          slug: fields.slug,
        })
      })))
}

export function fetchBlogLandingPage(locale, page = 1) {
  return Promise.all([
    fetchSingleEntry('pageBlogHome', locale),
    fetchBlogPostsList(locale, page),
  ])
    .then((results) => {
      const pageContent = results[0]
      const blogPosts = results[1]
      const isLastPage = blogPosts.length < fetchBlogPostLimit
      return {
        ...pageContent,
        blogPosts,
        page: Number(page),
        isLastPage,
      }
    })
}
