/* eslint-disable no-param-reassign */
const contentful = require('contentful')
const fs = require('fs')

const env = require('./env')
const featureFlags = require('./featureFlags')
const locales = require('./i18n/locales')
const Routes = require('./routes')
const createSitemap = require('./utils/sitemap')

function isStaticPath(path) {
  // Check that the path contains no param placeholders (e.g. :id)
  return !path.includes(':')
}

function putLocale(pattern, locale) {
  const localePrefix = locale === 'de' ? '' : `/${locale}`
  const patternWithLocale = pattern.replace(/\/:locale[^/]*/, localePrefix)
  return patternWithLocale || '/'
}

/**
 * Generates a exportPathMap for all static routes
 * (i.e., those that don't have any path params other than the locale).
 */
function staticRoutesPathMap() {
  const pathMap = {}

  locales.forEach((locale) => {
    Routes.routes.forEach(({ pattern, page }) => {
      const path = putLocale(pattern, locale)

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
      const slug = post.fields.slug[locale]

      // Without a slug, we cannot generate a path for the blog post.
      if (!slug) {
        // eslint-disable-next-line no-console
        console.warn(`Post ${post.sys.id} has no slug for locale [${locale}], skipping`)
        return
      }

      const path = putLocale(`/:locale?/blog/${slug}`, locale)
      pathMap[path] = {
        page: Routes.RouteNames.BlogPost,
        query: {
          slug,
          locale: locale === 'de' ? undefined : locale,
        },
      }
    })
  })
  return pathMap
}

module.exports = {
  useFileSystemPublicRoutes: false,

  async exportPathMap() {
    const staticRoutesMap = staticRoutesPathMap()
    const blogPostsMap = featureFlags.release10 ? await blogPostsPathMap() : {}
    const pathMap = Object.assign({}, staticRoutesMap, blogPostsMap)

    // Save routes as sitemap (https://www.sitemaps.org/)
    fs.writeFileSync(
      `${__dirname}/public/production/sitemap.xml`,
      createSitemap(pathMap),
    )

    return pathMap
  },
}
