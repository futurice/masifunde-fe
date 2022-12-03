/**
 * Utilties for working with routes and paths.
 *
 * @module
 */

/**
 * @typedef {Object} HrefObject
 * @property {string} HrefObject.pathname - The file path of the target page.
 * @property {Object.<string, string>} HrefObject.query - Query parameters.
 */

/**
 * Converts any `href` value accepted by a Next.js `<Link>` into a
 * normalized URL object. The normalization of the path includes:
 *
 * - Removing trailing slashes
 * - Removing the scheme and hostname from internal URL
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

  return { pathname, query }
}
