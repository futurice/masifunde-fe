import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ConditionalContainer from './ConditionalContainer'
import { mdBreakpoint } from '../styling/breakpoints'
import {
  createVimeoSrc,
  createYouTubeSrc,
  isYouTubeVideo,
} from '../utils/video'

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

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
    width: ${({ alwaysFullWidth }) => (alwaysFullWidth ? '100%' : '80%')};
  }
`

const ContainedEmbeddedVideo = ({ alwaysFullWidth, ...rest }) => (
  <ConditionalContainer containAfter={alwaysFullWidth ? 'never' : 'md'} >
    <EmbeddedVideoContainer alwaysFullWidth={alwaysFullWidth}>
      <EmbeddedVideo {...rest} />
    </EmbeddedVideoContainer>
  </ConditionalContainer>
)

ContainedEmbeddedVideo.propTypes = {
  alwaysFullWidth: PropTypes.bool,
}

ContainedEmbeddedVideo.defaultProps = {
  alwaysFullWidth: false,
}


export default ContainedEmbeddedVideo
