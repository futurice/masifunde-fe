import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const VideoContainer = ({
  videoId,
  className,
}) => (
  <div className={className}>
    <VideoIframe
      src={`https://www.youtube.com/embed/${videoId}?rel=0&amp;showinfo=0`}
      frameBorder="0"
      allowFullScreen
    />
  </div>
)

VideoContainer.propTypes = {
  videoId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

const YouTubeVideo = styled(VideoContainer)`
  position: relative;
  padding-bottom: 54%; /* 16:9 */
  padding-top: 25px;
  height: 0;
`

export default YouTubeVideo
