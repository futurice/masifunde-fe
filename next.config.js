module.exports = {
  trailingSlash: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/de',
        permanent: false,
      },
    ]
  },
}
