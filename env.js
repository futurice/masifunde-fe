module.exports = {
  // Contentful
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || '6jocdllnp50q',
  CONTENTFUL_HOST: process.env.CONTENTFUL_HOST || undefined,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN ||
    '5c8090d12bc2bf8dc695353cc398cd5e48eb56c214325884284bfdbfef4ba5ed',

  // Google Analytics
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || undefined,

  // Preview mode
  IS_PREVIEW: process.env.IS_PREVIEW || undefined,

  // Blog
  BLOG_POSTS_PER_PAGE: process.env.BLOG_POSTS_PER_PAGE || 10,
}
