/* eslint-disable no-param-reassign */
const fs = require('fs')
const contentful = require('contentful')

const env = require('./env')
const locales = require('./i18n/locales')
const replaceLocale = require('./utils/replaceLocale')
const Routes = require('./routes')
const createSitemap = require('./utils/sitemap')

function isStaticPath(path) {
  // Check that the path contains no param placeholders (e.g. :id)
  return !path.includes(':')
}

/**
 * Generates a exportPathMap for all static routes
 * (i.e., those that don't have any path params other than the locale).
 */
function staticRoutesPathMap() {
  const pathMap = {}

  locales.forEach((locale) => {
    Routes.routes.forEach(({ pattern, page }) => {
      const path = replaceLocale(pattern, locale)
      if (isStaticPath(path)) {
        pathMap[path] = {
          page,
          query: locale === 'de' ? undefined : { locale },
        }
      }
    })
  })

  return pathMap
}

async function fetchAllBlogPosts() {
  const client = contentful.createClient({
    space: env.CONTENTFUL_SPACE_ID,
    accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    host: env.CONTENTFUL_HOST,
  })

  let posts = []
  let skip = 0
  let fetchResult

  // The Contentful API only allows getting 1000 items at a time.
  // For the case where there are more posts, we need to do multiple
  // requests.
  do {
    // eslint-disable-next-line no-await-in-loop
    fetchResult = await client.getEntries({
      content_type: 'blogPost',
      locale: '*',
      skip,
      limit: 1,
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
async function blogPostsPathMap() {
  const posts = await fetchAllBlogPosts()
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

      const path = replaceLocale(`/:locale?/blog/${slug}`, locale)
      pathMap[path] = {
        page: Routes.RouteNames.BlogPost,
        query: {
          slug,
          // show non-localized blog posts in German
          locale: locale === 'de' || !localizedSlug ? undefined : locale,
        },
      }
    })
  })

  const numPages = Math.ceil(posts.length / env.BLOG_POSTS_PER_PAGE)

  for (let n = 1; n <= numPages; n += 1) {
    locales.forEach((locale) => {
      const path = replaceLocale(`/:locale?/blog/page/${n}`, locale)
      pathMap[path] = {
        page: Routes.RouteNames.Blog,
        query: {
          page: n,
          locale: locale === 'de' ? undefined : locale,
        },
      }
    })
  }

  return pathMap
}

async function fetchAllPodcastPosts() {
  const client = contentful.createClient({
    space: env.CONTENTFUL_SPACE_ID,
    accessToken: env.CONTENTFUL_ACCESS_TOKEN,
    host: env.CONTENTFUL_HOST,
  })

  let posts = []
  let skip = 0
  let fetchResult

  // The Contentful API only allows getting 1000 items at a time.
  // For the case where there are more posts, we need to do multiple
  // requests.
  do {
    // eslint-disable-next-line no-await-in-loop
    fetchResult = await client.getEntries({
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
async function podcastPostsPathMap() {
  const posts = await fetchAllPodcastPosts()
  const pathMap = {}

  const numPages = Math.ceil(posts.length / env.PODCAST_POSTS_PER_PAGE)

  for (let n = 1; n <= numPages; n += 1) {
    locales.forEach((locale) => {
      const path = replaceLocale(`/:locale?/podcasts/page/${n}`, locale)
      pathMap[path] = {
        page: Routes.RouteNames.Podcast,
        query: {
          page: n,
          locale: locale === 'de' ? undefined : locale,
        },
      }
    })
  }

  return pathMap
}

module.exports = {
  useFileSystemPublicRoutes: false,

  async exportPathMap() {
    const staticRoutesMap = staticRoutesPathMap()
    const blogPostsMap = await blogPostsPathMap()
    const podcastPostsMap = await podcastPostsPathMap()
    const pathMap = Object.assign(
      {},
      staticRoutesMap,
      blogPostsMap,
      podcastPostsMap
    )

    // Save routes as sitemap (https://www.sitemaps.org/)
    const sitemapXml = await createSitemap(pathMap)
    fs.writeFileSync(`${__dirname}/public/production/sitemap.xml`, sitemapXml)

    return pathMap
  },
}
