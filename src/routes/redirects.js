/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Defines path redirects for the Next.js development server.
 * See: https://nextjs.org/docs/content-reference/next.config.js/redirects
 *
 * For the production webisite's redirect configuration, see the
 * `public/_redirects` file, which is processed by Netlify.
 * See: https://docs.netlify.com/routing/redirects/
 *
 * @module
 */

// NOTE: This is a CommonJS module so that it can be used in the Next.js
// configuration file (`next.config.js`) for redirects.

const pages = require('./pages')

/**
 * Generates the redirects to configure for the site.
 * The entries are in the format expected by Next.js.
 * This should match `public/_routes` as closely as possible.
 */
exports.getRedirects = function () {
  return [...shorthands(), ...redirectsToGermanLocalePaths()]
}

/**
 * Generates redirects from locale-less paths (e.g., `/was-wir-machen`)
 * to the corresponding German route paths (`/de/was-wir-machen`).
 */
function redirectsToGermanLocalePaths() {
  const pathsToRedirect = Object.values(pages)
    .filter((path) => path !== pages.errorPage404)
    .map(toPathPatternSyntax)

  return pathsToRedirect.map((path) => {
    const withoutLocale = path.replace(/^\/:locale\/?/, '/')
    const withGermanLocale = path.replace(/^\/:locale\/?/, '/de/')

    return {
      // Add trailing slashes to the source and destination paths
      // to match the `trailingSlash` flag in `next.config.js`.
      source: addTrailingSlash(withoutLocale),
      destination: addTrailingSlash(withGermanLocale),
      permanent: false,
    }
  })
}

/**
 * Generates shorthand paths for the blog and podcast sections.
 */
function shorthands() {
  return [
    {
      source: '/blog/',
      destination: '/de/blog/page/1/',
      permanent: false,
    },
    {
      source: '/en/blog/',
      destination: '/en/blog/page/1/',
      permanent: false,
    },
    {
      source: '/podcasts/',
      destination: '/en/podcasts/page/1/',
      permanent: false,
    },
    {
      source: '/en/podcasts/',
      destination: '/en/podcasts/page/1/',
      permanent: false,
    },
  ]
}

function toPathPatternSyntax(path) {
  // Replace '[name]' (dynamic route parameter syntax)
  // with ':name' (path match syntax).
  return path.replace(/\[(\w+)\]/, ':$1')
}

function addTrailingSlash(path) {
  return path.endsWith('/') ? path : `${path}/`
}
