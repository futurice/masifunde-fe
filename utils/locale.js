/* eslint-disable import/prefer-default-export */

export function getLocaleFromQuery(queryObject) {
  if (queryObject && queryObject.locale) {
    return queryObject.locale
  }

  return 'de'
}
