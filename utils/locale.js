/* eslint-disable import/prefer-default-export */

export function getLocaleFromQuery(queryObject) {
  if (queryObject && queryObject.locale) {
    return queryObject.locale
  }

  return 'de'
}

let localeFile = {}

export const setActiveLocale = (locale) => {
// eslint-disable-next-line import/no-dynamic-require,global-require
  localeFile = require(`../i18n/${locale}.json`)
}

const Translate = key => localeFile[key]

export default Translate

