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

const VideoIframeContainer = ({
  youtubeVideo,
  className,
}) => {
  const youtubeVideoIdRegex = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/
  const match = youtubeVideoIdRegex.exec(youtubeVideo)
  const videoId = (!!match && match.length > 2) ? match[2] : ''
  return (
    <div className={className}>
      <VideoIframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&amp;showinfo=0`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  )
}

VideoIframeContainer.propTypes = {
  youtubeVideo: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

const YouTubeVideo = styled(VideoIframeContainer)`
  position: relative;
  padding-bottom: 54%; /* 16:9 */
  height: 0;
`

const YouTubeVideoContainer = styled.div`
  max-height: calc(90vh - ${({ theme }) => theme.headerHeight});
  margin: 0 auto;
  
  @media (min-width: ${mdBreakpoint}) {
    width: 80%;
  }
`

const ContainedYouTubeVideo = props => (
  <ConditionalContainer containAfter="md" >
    <YouTubeVideoContainer>
      <YouTubeVideo {...props} />
    </YouTubeVideoContainer>
  </ConditionalContainer>
)

export default ContainedYouTubeVideo
