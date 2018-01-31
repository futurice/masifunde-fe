const sm = require('sitemap')

const EN_LOCALE = 'en'
const DE_LOCALE = 'de'

function createLinks(url) {
  const EN_URL = `/${EN_LOCALE}`
  const isUrlEnglish = url.includes(EN_URL)

  if (isUrlEnglish) {
    return [
      { lang: DE_LOCALE, url: url.replace(EN_URL, '/') },
      { lang: EN_LOCALE, url },
    ]
  }

  // DE url
  return [
    { lang: DE_LOCALE, url },
    { lang: EN_LOCALE, url: `${EN_URL}${url}` },
  ]
}

function createSitemap(routes) {
  const urls = Object.keys(routes)
    .filter(key => !key.includes('404'))
    .map(key => ({
      url: key,
      links: createLinks(key),
    }))

  const sitemap = sm.createSitemap({
    hostname: 'http://masifunde.de',
    urls,
  })

  return sitemap.toString()
}

module.exports = createSitemap
