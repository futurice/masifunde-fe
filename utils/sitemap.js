const sm = require('sitemap')
const locales = require('../i18n/locales')

function getLocalePathPrefix(locale) {
  return locale === 'de' ? '/' : `/${locale}/`
}

function getLocale(path) {
  const localesWithoutDefault = locales.filter(l => l !== 'de')
  const pathLocale = localesWithoutDefault.find(locale =>
    path.startsWith(`/${locale}/`) || path === `${locale}`)
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

  return locales.map(locale => ({
    lang: locale,
    url: replaceLocale(path, locale),
  }))
}

function createSitemap(routes) {
  const urls = Object.keys(routes)
    .filter(path => !path.includes('404'))
    .map(path => ({
      url: path,
      links: createAlternateLinks(path),
    }))

  const sitemap = sm.createSitemap({
    hostname: 'http://masifunde.de',
    urls,
  })

  return sitemap.toString()
}

module.exports = createSitemap
