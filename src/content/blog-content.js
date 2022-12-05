import { jpegQuality } from '../utils/constants'
import { BLOG_POSTS_PER_PAGE } from '../env'
import {
  client as contentfulClient,
  fetchEntriesForContentType,
  fetchSingleEntry,
} from '../utils/contentful-legacy'
import { unwrapTeamMember, unwrapImage } from './shared/common'

function blogPostFromEntry(entry) {
  return {
    ...entry.fields,
    teaserImage: unwrapImage(entry.fields.teaserImage),
    heroImage: unwrapImage(entry.fields.heroImage),
    authorTeamMember: unwrapTeamMember(entry.fields.authorTeamMember),
  }
}

export async function fetchNewestBlogPosts(locale, limit) {
  const entries = await fetchEntriesForContentType('blogPost', {
    locale,
    limit,
    order: '-fields.date',
    'fields.slug[exists]': true,
    'fields.preventFeatured[ne]': true,
  })
  return entries.map(blogPostFromEntry)
}

export async function fetchBlogPost(locale, slug) {
  let entries = await fetchEntriesForContentType('blogPost', {
    locale,
    'fields.slug': slug,
  })
  if (entries.length === 0) {
    entries = await fetchEntriesForContentType('blogPost', {
      locale: 'de',
      'fields.slug': slug,
    })
    if (entries.length === 0) {
      const e = new Error(`Could not find blog post with slug: ${slug}`)
      e.name = 'PostNotFoundError'
      throw e
    }
  }
  const entry = entries[0]
  return blogPostFromEntry(entry)
}

function fetchBlogPostPageTemplate(locale) {
  return fetchSingleEntry('pageBlogPost', locale)
}

async function fetchPreviousBlogPostSlug(locale, date) {
  const fetchParams = {
    locale,
    limit: 1,
    order: '-fields.date',
    'fields.date[lt]': date,
    'fields.slug[exists]': true,
  }

  let entries = await fetchEntriesForContentType('blogPost', fetchParams)

  if (entries.length === 0) {
    entries = await fetchEntriesForContentType('blogPost', {
      ...fetchParams,
      locale: 'de',
    })
  }

  return entries && entries.length > 0 ? entries[0].fields.slug : null
}

async function fetchNextBlogPostSlug(locale, date) {
  const fetchParams = {
    locale,
    limit: 1,
    order: 'fields.date',
    'fields.date[gt]': date,
    'fields.slug[exists]': true,
  }

  let entries = await fetchEntriesForContentType('blogPost', fetchParams)

  if (entries.length === 0) {
    entries = await fetchEntriesForContentType('blogPost', {
      ...fetchParams,
      locale: 'de',
    })
  }

  return entries && entries.length > 0 ? entries[0].fields.slug : null
}

export async function fetchBlogPostPage(locale, slug) {
  try {
    const [page, post] = await Promise.all([
      fetchBlogPostPageTemplate(locale),
      fetchBlogPost(locale, slug),
    ])

    const [prev, next] = await Promise.all([
      fetchPreviousBlogPostSlug(locale, post.date),
      fetchNextBlogPostSlug(locale, post.date),
    ])

    return {
      ...page,
      ...post,
      previousPost: prev,
      nextPost: next,
    }
  } catch (error) {
    if (error.name === 'PostNotFoundError') {
      return { error: error.toString() }
    }
    throw error
  }
}

const blogPostsPerPage = BLOG_POSTS_PER_PAGE

export function fetchBlogPostsList(locale, page) {
  const skip = blogPostsPerPage * (page - 1)
  return fetchEntriesForContentType('blogPost', {
    unpackItems: false,
    locale,
    skip,
    limit: blogPostsPerPage,
    order: '-fields.date',
  }).then((response) => {
    const totalNumberOfBlogPosts = response.total
    const totalNumberOfPages = Math.ceil(
      totalNumberOfBlogPosts / blogPostsPerPage
    )
    const entries = response.items
    const numberOfLastPostOnPage = skip + entries.length
    const isLastPage = numberOfLastPostOnPage >= totalNumberOfBlogPosts

    const blogPosts = entries.map(({ sys, fields }) => {
      const author = fields.authorTeamMember
        ? unwrapTeamMember(fields.authorTeamMember).name
        : fields.authorExternal
      const teaserImage = unwrapImage(fields.teaserImage, {
        q: jpegQuality,
        w: 1000,
      })
      return {
        id: sys.id,
        title: fields.title,
        date: fields.date,
        author: author || null,
        teaserText: fields.metaDescription || '',
        teaserImage,
        slug: fields.slug,
      }
    })

    return {
      totalNumberOfPages,
      isLastPage,
      blogPosts,
    }
  })
}

export async function fetchBlogLandingPage(locale, page = 1) {
  const [pageContent, fetchBlogPostsResult] = await Promise.all([
    fetchSingleEntry('pageBlogHome', locale),
    fetchBlogPostsList(locale, page),
  ])

  return {
    ...pageContent,
    ...fetchBlogPostsResult,
    page: Number(page),
  }
}

export async function fetchAllBlogPostSlugs() {
  let slugs = []
  let skip = 0
  let response

  // The Contentful API limits the maximum response body size, so fetching
  // all posts at once is not possible. Make multiple paginated requests
  // instead.
  do {
    // eslint-disable-next-line no-await-in-loop
    response = await contentfulClient.withAllLocales.getEntries({
      content_type: 'blogPost',
      skip,
      limit: 100,
      select: 'fields.slug',
    })
    slugs = slugs.concat(response.items.map((item) => item.fields.slug))
    skip = response.skip + response.items.length
  } while (skip < response.total)

  return slugs
}

export async function fetchBlogPostPageCount() {
  const response = await contentfulClient.withAllLocales.getEntries({
    content_type: 'blogPost',
    limit: 1,
    select: 'fields.slug',
  })
  return Math.ceil(response.total / BLOG_POSTS_PER_PAGE)
}
