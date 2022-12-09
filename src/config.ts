/**
 * The ID of the Contentful space to fetch the content from.
 */
export const contentfulSpaceId =
  process.env.CONTENTFUL_SPACE_ID ?? '7wl9zvp70267'

/**
 * The access token for accessing the Contentful space.
 */
export const contentfulAccessToken =
  process.env.CONTENTFUL_ACCESS_TOKEN ??
  '0afa27121adcd096d9046e06f1e23983af0b2816f4f57380a55ae6359d1b1ce3'

/**
 * The maximum number of blog posts on each blog list page.
 */
export const blogPostsPerPage = 10

/**
 * The maximum number of podcasts posts on each podcasts page.
 */
export const podcastsPerPage = 9
