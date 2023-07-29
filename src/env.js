const spaceId = '7wl9zvp70267'
const accessToken =
  '0afa27121adcd096d9046e06f1e23983af0b2816f4f57380a55ae6359d1b1ce3'

module.exports = {
  // Contentful
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || spaceId,
  CONTENTFUL_HOST: process.env.CONTENTFUL_HOST || undefined,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || accessToken,

  // Preview mode
  IS_PREVIEW: process.env.IS_PREVIEW || undefined,

  // Blog
  BLOG_POSTS_PER_PAGE: process.env.BLOG_POSTS_PER_PAGE || 10,

  // Podcast
  PODCAST_POSTS_PER_PAGE: process.env.PODCAST_POSTS_PER_PAGE || 9,
}
