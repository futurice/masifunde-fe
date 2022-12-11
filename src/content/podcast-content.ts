import { InferType, object, string } from 'yup'
import { podcastsPerPage } from '../config'
import { extractContent, getSingletonEntryContent } from '../utils/contentful'
import { client as contentfulClient } from '../utils/contentful-legacy'
import { assetSchema } from './shared/assets'
import { teamMemberSchema } from './shared/team'

// Schema
// ======

/**
 * Schema for the "Podcast" (`podcast`) content type.
 */
export const podcastSchema = object({
  image: assetSchema.required(),
  title: string().required(),
  audio: assetSchema.required(),
  duration: string(),
  date: string().required(),
})
  // Map from legacy field names to new ones.
  // TODO: Change Contentful content model to new field names.
  .from('podcastImage', 'image')
  .from('podcastTitle', 'title')
  .from('podcastAudio', 'audio')
  .from('date2', 'date')

/**
 * Schema for the "Page: Podcast" (`pagepodcast`) content type.
 */
export const staticPodcastPageContentSchema = object({
  metaTitle: string().required(),
  metaDescription: string().default(''),
  introHeading: string().required(),
  introSubHeading: string().required(),
  introMarkdown: string().required(),
  subscribeText: string().required(),
  subscribeLinks: object({
    Deezer: string().required(),
    iTunes: string().required(),
    Spotify: string().required(),
  }).required(),
  shareText: string().required(),
  shareLinks: object({
    Facebook: string().required(),
    Instagram: string().required(),
    Twitter: string().required(),
  }).required(),
  teamMember: teamMemberSchema.required(),
  contactTextHeading: string().required(),
  contactText: string().required(),
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
  previousPageButtonText: string().required(),
  nextPageButtonText: string().required(),
})

// Types
// =====

export type Podcast = InferType<typeof podcastSchema>
export type StaticPodcastPageContent = InferType<
  typeof staticPodcastPageContentSchema
>

export type PodcastListPage = {
  page: number
  totalNumberOfPages: number
  podcasts: Podcast[]
}

// Functions
// =========

export function getStaticPodcastPageContent(
  locale: string
): Promise<StaticPodcastPageContent> {
  return getSingletonEntryContent({
    content_type: 'pagepodcast',
    schema: staticPodcastPageContentSchema,
    locale,
  })
}

export async function getPodcastListPage(
  page: number,
  locale: string
): Promise<PodcastListPage> {
  const client = contentfulClient.withoutUnresolvableLinks

  const { items, total } = await client.getEntries({
    content_type: 'podcast',
    order: '-fields.date2',
    skip: (page - 1) * podcastsPerPage,
    limit: podcastsPerPage,
    locale,
  })

  return {
    page,
    totalNumberOfPages: Math.ceil(total / podcastsPerPage),
    podcasts: items.map((item) => extractContent(item, podcastSchema)),
  }
}

export async function getPodcastPageCount() {
  const { total } = await contentfulClient.withAllLocales.getEntries({
    content_type: 'podcast',
    select: ['fields.podcastTitle'],
    limit: 1,
  })
  return Math.ceil(total / podcastsPerPage)
}

// export function fetchPodcastList(locale, page) {
//   const skip = podcastPerPage * (page - 1)
//   const fetchParams = {
//     unpackItems: false,
//     locale,
//     skip,
//     limit: podcastPerPage,
//     //using date2 until this can be cleaned up in contenful as well
//     order: '-fields.date2',
//   }
//   return fetchEntriesForContentType('podcast', fetchParams).then((response) => {
//     const totalNumberOfPodcasts = response.total
//     const totalNumberOfPages = Math.ceil(totalNumberOfPodcasts / podcastPerPage)
//     const entries = response.items
//     const numberOfLastPostOnPage = skip + entries.length
//     const isLastPage = numberOfLastPostOnPage >= totalNumberOfPodcasts

//     const podcast = entries.map(({ sys, fields }) => {
//       const podcastAudio = unwrapFile(fields.podcastAudio)
//       const podcastImage = unwrapImage(fields.podcastImage, {
//         q: jpegQuality,
//         w: 1000,
//       })
//       return {
//         id: sys.id,
//         podcastTitle: fields.podcastTitle,
//         //using date2 until this can be cleaned up in contentful as well
//         date: fields.date2,
//         podcastAudio,
//         podcastImage,
//         duration: fields.duration,
//       }
//     })

//     return {
//       totalNumberOfPages,
//       isLastPage,
//       podcast,
//     }
//   })
// }

// export async function fetchPodcastPage(locale, page = 1) {
//   const [content, fetchPodcastResults] = await Promise.all([
//     fetchSingleEntry('pagepodcast', locale),
//     fetchPodcastList(locale, page),
//   ])
//   return {
//     ...content,
//     ...fetchPodcastResults,
//     teamMember: unwrapTeamMember(content.teamMember),
//     page: Number(page),
//   }
// }

// export async function fetchPodcastPageCount() {
//   const response = await contentfulClient.withAllLocales.getEntries({
//     content_type: 'podcast',
//     limit: 1,
//   })

//   return Math.ceil(response.total / PODCAST_POSTS_PER_PAGE)
// }
