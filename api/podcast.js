import { fetchEntriesForContentType, fetchSingleEntry } from './contentfulService'
import { unwrapTeamMember, unwrapFiles } from './common'
import { PODCAST_POSTS_PER_PAGE } from '../env'
import replaceLocale from '../utils/replaceLocale'


export async function fetchPodcastPage(locale) {
  const content = await fetchSingleEntry('pagepodcast', locale)
  return {
    ...content,
    teamMember: unwrapTeamMember(content.teamMember),
    podcast: unwrapFiles(content.podcast),
  }
}
