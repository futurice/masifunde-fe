const { getRedirects } = require('./routes/redirects')

module.exports = {
  trailingSlash: true,
  redirects: async () => getRedirects(),
}
