/* eslint-disable @typescript-eslint/no-explicit-any */
import { InferType, array, bool, object, string } from 'yup'
import { blogPostsPerPage } from '../config'
import {
  extractContent,
  getEntriesContent,
  getSingletonEntryContent,
} from '../utils/contentful'
import { client as contentfulClient } from '../utils/contentful-legacy'
import { assetSchema } from './shared/assets'
import { teamMemberSchema } from './shared/team'

// Schemas
// =======

/**
 * Schema for the "Page: Blog" (`pageBlogHome`) content type.
 * Holds the static content of the blog list pages.
 */
const blogHomeContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string().default(''),
  blogListTitle: string().required(),
  previousPageButtonText: string().required(),
  nextPageButtonText: string().required(),
})

/**
 * Schema for the "Blog Post" (`blogPost`) content type.
 * Each entry holds the content for a particular blog post.
 */
const blogPostSchema = object({
  title: string().required(),
  slug: string().required(),
  date: string().required(),
  metaDescription: string().default(''),
  teaserImage: assetSchema.required(),
  teaserText: string().default(''),
  heroImage: assetSchema.optional().default(undefined),
  content: string().required(),
  authorTeamMember: teamMemberSchema.optional().default(undefined),
  authorExternal: string(),
  tags: array(string()).default([]),
  preventFeatured: bool().default(false),
})

/**
 * Schema for the "Page: Blog Post" (`pageBlogPost`) content type.
 * Its single entry holds the static content shared across all blog
 * post pages.
 */
const staticBlogPostContentSchema = object({
  authorText: string().required(),
  shareText: string().required(),
  previousPostText: string().required(),
  nextPostText: string().required(),
  blogHomeText: string().required(),
})

// Types
// =====

export type BlogHomeContent = InferType<typeof blogHomeContentSchema>
export type BlogPost = InferType<typeof blogPostSchema>
export type StaticBlogPostContent = InferType<
  typeof staticBlogPostContentSchema
>

export type BlogPostListPage = {
  page: number
  totalNumberOfPages: number
  blogPosts: BlogPost[]
}

export type MultiLanguageSlug = {
  de: string
  en: string
}

// Functions
// =========

export function getBlogHomeContent(locale: string): Promise<BlogHomeContent> {
  return getSingletonEntryContent({
    content_type: 'pageBlogHome',
    schema: blogHomeContentSchema,
    locale,
  })
}

export function getBlogPost(slug: string, locale: string): Promise<BlogPost> {
  return getSingletonEntryContent({
    content_type: 'blogPost',
    'fields.slug': slug,
    schema: blogPostSchema,
    locale,
  })
}

export function getStaticBlogPostContent(
  locale: string
): Promise<StaticBlogPostContent> {
  return getSingletonEntryContent({
    content_type: 'pageBlogPost',
    schema: staticBlogPostContentSchema,
    locale,
  })
}

export function getBlogPosts(
  pageNumber: number,
  locale: string
): Promise<BlogPost[]> {
  return getEntriesContent({
    order: '-fields.date',
    'fields.slug[exists]': true,
    schema: blogPostSchema,
    limit: blogPostsPerPage,
    locale,
  })
}

export async function getBlogPostListPage(
  page: number,
  locale: string
): Promise<BlogPostListPage> {
  const client = contentfulClient.withoutUnresolvableLinks

  const { items, total } = await client.getEntries({
    content_type: 'blogPost',
    order: '-fields.date',
    'fields.slug[exists]': true,
    skip: (page - 1) * blogPostsPerPage,
    limit: blogPostsPerPage,
    locale,
  })

  return {
    page,
    totalNumberOfPages: Math.ceil(total / blogPostsPerPage),
    blogPosts: items.map((item) => extractContent(item, blogPostSchema)),
  }
}

export async function getBlogPostPageCount() {
  const { total } = await contentfulClient.withAllLocales.getEntries({
    content_type: 'blogPost',
    'fields.slug[exists]': true,
    select: ['fields.slug'],
    limit: 1,
  })
  return Math.ceil(total / blogPostsPerPage)
}

export function getNewestBlogPosts(
  limit: number,
  locale: string
): Promise<BlogPost[]> {
  return getEntriesContent({
    content_type: 'blogPost',
    order: '-fields.date',
    'fields.slug[exists]': true,
    'fields.preventFeatured[ne]': true,
    schema: blogPostSchema,
    limit,
    locale,
  })
}

export async function getAllBlogPostSlugs(): Promise<MultiLanguageSlug[]> {
  let slugs: MultiLanguageSlug[] = []
  let numFetched = 0

  // The Contentful API limits the maximum response body size, so fetching
  // all posts at once is not possible. Make multiple paginated requests
  // instead.
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { items, skip, total } =
      await contentfulClient.withAllLocales.getEntries({
        content_type: 'blogPost',
        skip: numFetched,
        limit: 100,
        select: ['fields.slug'],
      })

    slugs = slugs.concat(
      items.map((item) => item.fields.slug as MultiLanguageSlug)
    )

    numFetched = skip + items.length
    if (numFetched >= total) {
      return slugs
    }
  }
}

/**
 * Returns the slug of the blog post that was posted immediately
 * before this one, according to the `date` field.
 *
 * NOTE: This function currently assumes that no two blog posts
 * are published on the same day.
 *
 * @param postDate - The publish date of the post whose previous
 *   post should be found.
 * @param locale - The locale of the slug to return.
 */
export async function getPreviousBlogPostSlug(
  postDate: string,
  locale: string
): Promise<string | undefined> {
  const client = contentfulClient.withAllLocales

  const entries = await client.getEntries<{ slug: string }>({
    content_type: 'blogPost',
    order: '-fields.date',
    'fields.date[lt]': postDate,
    'fields.slug[exists]': true,
    select: ['fields.slug'],
    limit: 1,
  })

  const slug = entries.items[0]?.fields.slug
  return slug?.[locale] ?? slug?.['de']
}

/**
 * Returns the slug of the blog post that was posted immediately
 * before this one, according to the `date` field.
 *
 * NOTE: This function currently assumes that no two blog posts
 * are published on the same day.
 *
 * @param postDate - The publish date of the post whose previous
 *   post should be found.
 * @param locale - The locale of the slug to return.
 */
export async function getNextBlogPostSlug(
  postDate: string,
  locale: string
): Promise<string | undefined> {
  const client = contentfulClient.withAllLocales

  const entries = await client.getEntries<{ slug: string }>({
    content_type: 'blogPost',
    order: 'fields.date',
    'fields.date[gt]': postDate,
    'fields.slug[exists]': true,
    select: ['fields.slug'],
    limit: 1,
  })

  const slug = entries.items[0]?.fields.slug
  return slug?.[locale] ?? slug?.['de']
}

/*
function blogPostFromEntry(entry: any) {
  return {
    ...entry.fields,
    teaserImage: unwrapImage(entry.fields.teaserImage),
    heroImage: unwrapImage(entry.fields.heroImage),
    authorTeamMember: unwrapTeamMember(entry.fields.authorTeamMember),
  }
}

export async function fetchNewestBlogPosts(locale: string, limit: number) {
  const entries = await fetchEntriesForContentType('blogPost', {
    locale,
    limit,
    order: '-fields.date',
    'fields.slug[exists]': true,
    'fields.preventFeatured[ne]': true,
  })
  return entries.map(blogPostFromEntry)
}

export async function fetchBlogPost(locale: string, slug: string) {
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
*/
