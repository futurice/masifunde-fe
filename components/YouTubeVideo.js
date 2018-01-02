/* eslint-disable no-useless-escape */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ConditionalContainer from './ConditionalContainer'
import { smallBreakpoint } from '../styling/breakpoints'

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const VideoContainer = ({
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

VideoContainer.propTypes = {
  youtubeVideo: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

const YouTubeVideo = styled(VideoContainer)`
  position: relative;
  padding-bottom: 54%; /* 16:9 */
  height: 0;
  margin-bottom: 4.5rem;
  @media (min-width: ${smallBreakpoint}) {
    margin-bottom: 8rem;
  }
`

const ContainedYouTubeVideo = props => (
  <ConditionalContainer containAfter="md" >
    <YouTubeVideo {...props} />
  </ConditionalContainer>
)

export default ContainedYouTubeVideo
