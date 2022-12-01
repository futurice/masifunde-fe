/**
 * The code for generating the `exportPathMap` that Next.js needs for
 * Static HTML Export. It defines which pages should be generated at
 * which URL paths.
 *
 * See:
 * - https://nextjs.org/docs/advanced-features/static-html-export
 * - https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
 *
 * @module
 */

const fs = require('fs')
const contentful = require('contentful')

const env = require('../env')
const locales = require('../i18n/locales')
const replaceLocale = require('../utils/replaceLocale')
const createSitemap = require('../utils/sitemap')
const pathMappings = require('./mappings')

function isStaticPath(path) {
  return !path.includes('[')
}

function pathPrefixForLocale(locale) {
  // German paths are unprefixed.
  return locale === 'de' ? '' : '/en'
}

/**
 * Generates a exportPathMap for all static routes
 * (i.e., those that don't have any dynamic path components).
 */
function staticRoutesPathMap() {
  const pathMap = {}

  for (const mapping of pathMappings) {
    if (isStaticPath(mapping.page)) {
      // German
      pathMap[mapping.de] = {
        page: mapping.page,
        query: { locale: 'de' },
      }

      // English
      pathMap[mapping.en] = {
        page: mapping.page,
        query: { locale: 'en' },
      }

      // Some links use `/en` + the German path (e.g., '/en/was-wir-machen').
      // Generate those pages as well for backwards compatibility.
      pathMap['/en' + mapping.de] = {
        page: mapping.page,
        query: { locale: 'en' },
      }
    }
  }

  return pathMap
}

async function fetchAllBlogPosts(contentfulClient) {
  let posts = []
  let skip = 0
  let fetchResult

  // The Contentful API limits the maximum response body size, so fetching
  // all posts at once is not possible. Do multiple paginated requests
  // instead.
  do {
    // eslint-disable-next-line no-await-in-loop
    fetchResult = await contentfulClient.getEntries({
      content_type: 'blogPost',
      locale: '*',
      skip,
      limit: 100,
      select: 'fields.slug',
    })
    posts = posts.concat(fetchResult.items)
    skip = fetchResult.skip + fetchResult.items.length
  } while (skip < fetchResult.total)

  return posts
}

/**
 * Generates an exportPathMap with the routes of all blog posts currently
 * published in Contentful.
 */
async function blogPostsPathMap(contentfulClient) {
  const posts = await fetchAllBlogPosts(contentfulClient)
  const pathMap = {}

  posts.forEach((post) => {
    locales.forEach((locale) => {
      const localizedSlug = post.fields.slug[locale]
      const deSlug = post.fields.slug.de
      const slug = localizedSlug || deSlug

      if (!slug) {
        // Without a slug, we cannot generate a path for the blog post
        // eslint-disable-next-line no-console
        console.warn(
          `Post ${post.sys.id} has no slug for locale [${locale}], skipping`
        )
        return
      }

      pathMap[`${pathPrefixForLocale(locale)}/blog/${slug}`] = {
        page: '/blog/blog-post',
        query: {
          slug,
          // show non-localized blog posts in German
          locale: locale === 'de' || !localizedSlug ? undefined : locale,
        },
      }
    })
  })

  const numListPages = Math.ceil(posts.length / env.BLOG_POSTS_PER_PAGE)

  for (let n = 1; n <= numListPages; n += 1) {
    locales.forEach((locale) => {
      pathMap[`${pathPrefixForLocale(locale)}/blog/page/${n}`] = {
        page: '/blog',
        query: {
          page: n,
          locale,
        },
      }
    })
  }

  return pathMap
}

async function fetchAllPodcastPosts(contentfulClient) {
  let posts = []
  let skip = 0
  let fetchResult

  // The Contentful API only allows getting 1000 items at a time.
  // For the case where there are more posts, we need to do multiple
  // requests.
  do {
    // eslint-disable-next-line no-await-in-loop
    fetchResult = await contentfulClient.getEntries({
      content_type: 'podcast',
      locale: '*',
      skip,
      limit: 1,
    })
    posts = posts.concat(fetchResult.items)
    skip = fetchResult.skip + fetchResult.items.length
  } while (skip < fetchResult.total)

  return posts
}

/**
 * Generates an exportPathMap with the routes of all podcast posts currently
 * published in Contentful.
 */
async function podcastPostsPathMap(contentfulClient) {
  const posts = await fetchAllPodcastPosts(contentfulClient)
  const pathMap = {}

  const numPages = Math.ceil(posts.length / env.PODCAST_POSTS_PER_PAGE)

  for (let n = 1; n <= numPages; n += 1) {
    locales.forEach((locale) => {
      const path = replaceLocale(`/:locale?/podcasts/page/${n}`, locale)
      pathMap[path] = {
        page: '/podcasts',
        query: {
          page: n,
          locale: locale === 'de' ? undefined : locale,
        },
      }
    })
  }

  return pathMap
}

module.exports = async function exportPathMap() {
  const contentfulClient = contentful.createClient({
    space: env.CONTENTFUL_SPACE_ID,
    accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    host: env.CONTENTFUL_HOST,
    retryOnError: true,
    retryLimit: 15,
  })

  const staticRoutesMap = staticRoutesPathMap()
  const blogPostsMap = await blogPostsPathMap(contentfulClient)
  const podcastPostsMap = await podcastPostsPathMap(contentfulClient)

  const pathMap = {
    ...staticRoutesMap,
    ...blogPostsMap,
    ...podcastPostsMap,
  }

  // Save routes as sitemap (https://www.sitemaps.org/)
  const sitemapXml = await createSitemap(pathMap)
  fs.writeFileSync(`${__dirname}/../public/production/sitemap.xml`, sitemapXml)

  return pathMap
}
