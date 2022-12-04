const { getRedirects } = require('./routes/redirects')

module.exports = {
  swcMinify: true,
  compiler: { styledComponents: true },
  trailingSlash: true,
  redirects: async () => getRedirects(),
}
