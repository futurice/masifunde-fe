const sm = require('sitemap')

const EN_LOCALE = 'en'
const DE_LOCALE = 'de'

function createSitemap(routes) {
  const urls = Object.keys(routes)
    .filter(key => !key.includes('404'))
    .filter(key => !key.includes(`/${EN_LOCALE}`)) // Leave only the main routes
    .map(key => ({
      url: key,
      links: [
        { lang: DE_LOCALE, url: key },
        { lang: EN_LOCALE, url: `/${EN_LOCALE}${key}` },
      ],
    }))

  const sitemap = sm.createSitemap({
    hostname: 'http://masifunde.de',
    urls,
  })

  return sitemap.toString()
}

module.exports = createSitemap
