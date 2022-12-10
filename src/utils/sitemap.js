/* eslint-disable @typescript-eslint/no-var-requires */
const { Readable } = require('stream')
const { SitemapStream, streamToPromise } = require('sitemap')
const locales = require('../i18n/locales')

function getLocalePathPrefix(locale) {
  return locale === 'de' ? '/' : `/${locale}/`
}

function getLocale(path) {
  const localesWithoutDefault = locales.filter((l) => l !== 'de')
  const pathLocale = localesWithoutDefault.find(
    (locale) => path.startsWith(`/${locale}/`) || path === `${locale}`
  )
  return pathLocale || 'de'
}

function replaceLocale(path, newLocale) {
  const currentLocale = getLocale(path)
  const currentPathPrefix = getLocalePathPrefix(currentLocale)
  const newPathPrefix = getLocalePathPrefix(newLocale)

  return newPathPrefix === currentPathPrefix
    ? path
    : `${newPathPrefix}${path.slice(currentPathPrefix.length)}`
}

function createAlternateLinks(path) {
  // FIXME: Blog posts have different slugs depending on locale, so it's not
  // possible to automatically generate the matching URL paths in other
  // locales.
  if (path.includes('/blog/')) {
    return []
  }

  return locales.map((locale) => ({
    lang: locale,
    url: replaceLocale(path, locale),
  }))
}

async function createSitemap(pathMap) {
  const links = Object.keys(pathMap)
    .filter((path) => !path.includes('404'))
    .map((path) => ({
      url: path,
      links: createAlternateLinks(path),
    }))

  const sitemapStream = new SitemapStream({
    hostname: 'https://www.masifunde.de',
  })

  const outputStream = Readable.from(links).pipe(sitemapStream)
  const data = await streamToPromise(outputStream)
  return data.toString()
}

module.exports = createSitemap
