const featureFlags = require('./featureFlags')

const spaceId = featureFlags.release10
  ? '7wl9zvp70267'
  : '6jocdllnp50q'

const accessToken = featureFlags.release10
  ? '0afa27121adcd096d9046e06f1e23983af0b2816f4f57380a55ae6359d1b1ce3'
  : '5c8090d12bc2bf8dc695353cc398cd5e48eb56c214325884284bfdbfef4ba5ed'

module.exports = {
  // Contentful
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || spaceId,
  CONTENTFUL_HOST: process.env.CONTENTFUL_HOST || undefined,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || accessToken,

  // Google Analytics
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || undefined,

  // Preview mode
  IS_PREVIEW: process.env.IS_PREVIEW || undefined,

  // Blog
  BLOG_POSTS_PER_PAGE: process.env.BLOG_POSTS_PER_PAGE || 10,
}
