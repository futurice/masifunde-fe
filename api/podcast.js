import { PODCAST_POSTS_PER_PAGE } from '../env'
import { jpegQuality } from '../utils/constants'
import { fetchEntriesForContentType, fetchSingleEntry } from './contentfulService'
import { unwrapTeamMember, unwrapFile, unwrapImage } from './common'


const podcastPerPage = PODCAST_POSTS_PER_PAGE

export function fetchPodcastList(locale, page) {
  const skip = podcastPerPage * (page - 1)
  const fetchParams= {
    unpackItems: false,
    locale,
    skip,
    limit: podcastPerPage,
    //using date2 until this can be cleaned up in contenful as well
    order: '-fields.date2',
  }
  return fetchEntriesForContentType('podcast', fetchParams)
  .then((response) => {
    const totalNumberOfPodcasts = response.total
    const totalNumberOfPages = Math.ceil(totalNumberOfPodcasts / podcastPerPage)
    const entries = response.items
    const numberOfLastPostOnPage = skip + entries.length
    const isLastPage = numberOfLastPostOnPage >= totalNumberOfPodcasts

    const podcast = entries.map(({ sys, fields }) => {
      const podcastAudio = unwrapFile(fields.podcastAudio)
      const podcastImage = unwrapImage(fields.podcastImage, { q: jpegQuality, w: 1000 })
      return ({
        id: sys.id,
        podcastTitle: fields.podcastTitle,
        //using date2 until this can be cleaned up in contentful as well
        date: fields.date2,
        podcastAudio,
        podcastImage,
        duration: fields.duration,
      })
    })

    return ({
      totalNumberOfPages,
      isLastPage,
      podcast,
    })
  })
}

export async function fetchPodcastPage(locale, page = 1) {
  const [
    content,
    fetchPodcastResults,
   ] = await Promise.all([
     fetchSingleEntry('pagepodcast', locale),
     fetchPodcastList(locale, page),
   ])
  return {
    ...content,
    ...fetchPodcastResults,
    teamMember: unwrapTeamMember(content.teamMember),
    page: Number(page),
  }
}
