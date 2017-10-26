/* eslint-disable import/prefer-default-export */

export function getContentfulLocale(queryObject) {
  if (queryObject && queryObject.locale === 'en') {
    return 'en-GB'
  }

  return 'de'
}
