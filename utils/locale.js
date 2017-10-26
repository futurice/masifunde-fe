/* eslint-disable import/prefer-default-export */

export function getContentfulLocale(queryObject) {
  if (queryObject && queryObject.locale) {
    return queryObject.locale
  }

  return 'de'
}
