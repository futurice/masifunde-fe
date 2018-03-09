
const defaultLocale = 'de'

export function getLocaleFromQuery(queryObject) {
  if (queryObject && queryObject.locale) {
    return queryObject.locale
  }
  return defaultLocale
}

export function formatDateForLocale(locale, date) {
  const effectiveLocale = locale || defaultLocale
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  const format = new Intl.DateTimeFormat(effectiveLocale, options)
  return format.format(date)
}
