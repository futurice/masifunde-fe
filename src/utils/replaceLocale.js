function replaceLocale(pattern, locale) {
  const localePrefix = locale === 'de' ? '' : `/${locale}`
  const patternWithLocale = pattern.replace(/\/:locale[^/]*/, localePrefix)
  return patternWithLocale || '/'
}

module.exports = replaceLocale
