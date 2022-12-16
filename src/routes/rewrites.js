/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Defines path rewrites for the Next.js development server.
 * See: https://nextjs.org/docs/content-reference/next.config.js/rewrites
 *
 * For the production webisite's redirect configuration, see the
 * `public/_redirects` file, which is processed by Netlify.
 * See: https://docs.netlify.com/routing/redirects/rewrites-proxies/
 *
 * @module
 */

// NOTE: This is a CommonJS module so that it can be used in the Next.js
// configuration file (`next.config.js`) for redirects.

/**
 * Generates the redirects to configure for the site.
 * The entries are in the format expected by Next.js.
 * This should match `public/_routes` as closely as possible.
 */
exports.getRewrites = function () {
  return [...canonicalPathsForDonationPages()]
}

/**
 * For each page embedding the Fundraisingbox iframe, generate a rewrite
 * from the embedding URL ("Einbettungsadresse") expected by the iframe
 * to the actual (German) page URL.
 */
function canonicalPathsForDonationPages() {
  return [
    {
      source: '/wie-sie-helfen/spenden',
      destination: '/de/wie-sie-helfen/spenden',
    },
    {
      source: '/spendenaktion',
      destination: '/de/spendenaktion',
    },
  ]
}
