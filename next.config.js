/* eslint-disable @typescript-eslint/no-var-requires */
const { getRedirects } = require('./src/routes/redirects')

module.exports = {
  swcMinify: true,
  compiler: { styledComponents: true },
  trailingSlash: true,
  redirects: async () => getRedirects(),
}
