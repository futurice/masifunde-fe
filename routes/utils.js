/**
 * Utilties for working with routes and paths.
 *
 * @module
 */

import pathMappings from './mappings'

/**
 * @typedef {Object} HrefObject
 * @property {string} HrefObject.pathname - The file path of the target page.
 * @property {Object.<string, string>} HrefObject.query - Query parameters.
 */

/**
 * Converts any `href` value accepted by a Next.js `<Link>` into
 * an URL object. If the pathname is a localized path, it is
 * automatically replaced by the corresponding page file path,
 * as expected by Next.js' router.
 *
 * @param {(string | HrefObject)} href - The `href` value to normalize.
 * @returns {HrefObject} The normalized URL object.
 */
export function normalizeHref(href) {
  let pathname = typeof href === 'string' ? href : href.pathname
  const query = typeof href === 'string' ? {} : href.query

  // Remove trailing slash if present.
  const trailingSlashMatch = /^(.+)\/$/.exec(pathname)
  pathname = trailingSlashMatch ? trailingSlashMatch[1] : pathname

  // Remove hostname if the link is internal.
  if (pathname.startsWith('https://www.masifunde.de')) {
    pathname = pathname.slice('https://www.masifunde.de'.length)
  }

  const mapping = findPathMappingByLocalizedPath(pathname)
  if (mapping) {
    // The path is a localized URL path, but Next.js expects a page file path.
    pathname = mapping.page
  }

  return { pathname, query }
}

/**
 * Takes a path with dynamic parameters (`[name]`) and produces a
 * concrete one by replacing the parameters with particular values.
 *
 * @param {string} path - The dynamic path.
 * @param {Object.<string, string>} params - Dynamic parameter values.
 * @returns {string} The concrete path.
 */
export function fillPathParams(path, params) {
  let result = path

  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`[${key}]`, value)
  }

  return result
}

/**
 * Takes any value that can be used as `href` with a Next.js link
 * (a page file path or an object of the form `{ pathname, query }`)
 * and creates a fully-formed URL path for the given locale.
 *
 * @param {*} href - The `href` value to localize.
 * @param {*} locale - The locale ("de" or "en") to use.
 * @returns The localized URL path.
 */
export function localizeHref(href, locale) {
  let hrefObject = normalizeHref(href)

  if (/^https?:/.test(hrefObject.pathname)) {
    // This is an external link. Leave it unchanged.
    return hrefObject.pathname
  }

  const mapping = findPathMappingByPageFilePath(hrefObject.pathname)
  if (!mapping) {
    // There is no mapping. Use the original path unchanged.
    return normalizeHref.pathname
  }

  const localizedPath = mapping[locale]
  if (!localizedPath) {
    return normalizeHref.pathname
  }

  return fillPathParams(mapping[locale], hrefObject.query)
}

function findPathMappingByPageFilePath(path) {
  return pathMappings.find((m) => m.page === path)
}

function findPathMappingByLocalizedPath(path) {
  return pathMappings.find((mapping) => {
    if (mapping.de === path || mapping.en === path) {
      return true
    }

    // In Contentful, there is sometimes a German URL path
    // prefixed with "/en". We need to support those as well,
    // at least until the content is fixed.
    if (path === '/en' + mapping.de) {
      return true
    }

    if (
      path === '/blog' ||
      path === '/blog/page/1' ||
      path === '/en/blog/page/1'
    ) {
      return mapping.page === '/[locale]/blog/list/[page]'
    }

    if (path === '/podcasts/page/1' || path === '/en/podcasts/page/1') {
      return mapping.page === '/[locale]/podcasts'
    }

    return false
  })
}
