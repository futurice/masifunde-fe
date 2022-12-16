/* eslint-disable @typescript-eslint/no-var-requires */
const { getRedirects } = require('./src/routes/redirects')
const { getRewrites } = require('./src/routes/rewrites')

module.exports = {
  swcMinify: true,
  compiler: { styledComponents: true },
  redirects: async () => getRedirects(),
  rewrites: async () => getRewrites(),
}
