/* eslint-disable no-useless-escape */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ConditionalContainer from './ConditionalContainer'
import { mdBreakpoint } from '../styling/breakpoints'

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const isYouTubeVideo = videoUrl => videoUrl.includes('youtube') || videoUrl.includes('youtu.be')

const createYouTubeSrc = (videoUrl) => {
  const youtubeVideoIdRegex = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/
  const match = youtubeVideoIdRegex.exec(videoUrl)
  const videoId = (!!match && match.length > 2) ? match[2] : ''
  return `https://www.youtube.com/embed/${videoId}?rel=0&amp;showinfo=1`
}

const createVimeoSrc = (videoUrl) => {
  const vimeoVideoIdRegex = /(http|https)?:\/\/(www\.|player\.)?vimeo.com\/(?:video\/(?:\w+\/)?|channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)/
  const match = vimeoVideoIdRegex.exec(videoUrl)
  const videoId = (!!match && match.length > 4) ? match[4] : ''
  return `https://player.vimeo.com/video/${videoId}`
}

const VideoIframeContainer = ({
  videoUrl,
  className,
}) => {
  const src = isYouTubeVideo(videoUrl)
    ? createYouTubeSrc(videoUrl)
    : createVimeoSrc(videoUrl)

  return (
    <div className={className}>
      <VideoIframe
        src={src}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  )
}

VideoIframeContainer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

const EmbeddedVideo = styled(VideoIframeContainer)`
  position: relative;
  padding-bottom: 54%; /* 16:9 */
  height: 0;
`

const EmbeddedVideoContainer = styled.div`
  max-height: calc(90vh - ${({ theme }) => theme.headerHeight});
  margin: 0 auto;
  
  @media (min-width: ${mdBreakpoint}) {
    width: 80%;
  }
`

const ContainedEmbeddedVideo = props => (
  <ConditionalContainer containAfter="md" >
    <EmbeddedVideoContainer>
      <EmbeddedVideo {...props} />
    </EmbeddedVideoContainer>
  </ConditionalContainer>
)

export default ContainedEmbeddedVideo
