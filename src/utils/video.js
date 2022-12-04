/* eslint-disable no-useless-escape */
import fetch from 'isomorphic-unfetch'

export const isYouTubeVideo = (videoUrl) =>
  videoUrl.includes('youtube') || videoUrl.includes('youtu.be')

export function getYoutubeVideoId(videoUrl) {
  const youtubeVideoIdRegex =
    /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/
  const match = youtubeVideoIdRegex.exec(videoUrl)
  const videoId = !!match && match.length > 2 ? match[2] : ''

  return videoId
}

export function getVimeoId(videoUrl) {
  const vimeoVideoIdRegex =
    /(http|https)?:\/\/(www\.|player\.)?vimeo.com\/(?:video\/(?:\w+\/)?|channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)/
  const match = vimeoVideoIdRegex.exec(videoUrl)
  const videoId = !!match && match.length > 4 ? match[4] : ''

  return videoId
}

export function getYoutubeThumbnail(videoUrl) {
  const videoId = getYoutubeVideoId(videoUrl)

  // http://img.youtube.com/vi/[video-id]/[thumbnail-number].jpg
  return `http://img.youtube.com/vi/${videoId}/0.jpg`
}

// It is only covering the happy path
// Unlikely that vimeo will be down
export function getVimeoThumbnail(videoUrl) {
  const videoId = getVimeoId(videoUrl)
  return fetch(`https://vimeo.com/content/v2/video/${videoId}.json`)
    .then((response) => response.json())
    .then((videoData) => {
      if (videoData && Array.isArray(videoData) && videoData.length > 0) {
        return videoData[0].thumbnail_medium
      }

      return Promise.reject(new Error('Failed to fetch thumbnail'))
    })
}

export const createYouTubeSrc = (videoUrl) => {
  const videoId = getYoutubeVideoId(videoUrl)
  return `https://www.youtube.com/embed/${videoId}?rel=0&amp;showinfo=1`
}

export const createVimeoSrc = (videoUrl) => {
  const videoId = getVimeoId(videoUrl)
  return `https://player.vimeo.com/video/${videoId}`
}
