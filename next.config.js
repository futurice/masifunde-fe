/* eslint-disable no-param-reassign */
const Routes = require('./routes')

function patternWithLocaleFactory(pattern, locale) {
  const localePrefix = locale ? `/${locale}` : ''

  const patternSplit = pattern.split('?')
  const purePattern = patternSplit[1]
  const patternWithLocaleList = [localePrefix, purePattern]

  return patternWithLocaleList.join('')
}
// It can't handle complex patterns like: /blog/:id/
function createRoutesFromNextRoutes() {
  return Routes.routes.reduce((map, { pattern, page }) => {
    const LOCALE_EN = 'en'
    const germanPattern = patternWithLocaleFactory(pattern, '')
    const englishPattern = patternWithLocaleFactory(pattern, LOCALE_EN)

    map[germanPattern] = { page }
    map[englishPattern] = { page, query: { locale: LOCALE_EN } }
    return map
  }, {})
}

module.exports = {
  exportPathMap() {
    return createRoutesFromNextRoutes()
  },
}
