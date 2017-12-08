import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'

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
  const paramsString = youtubeVideo.substring(youtubeVideo.indexOf('?'))
  const parsedParams = queryString.parse(paramsString)
  const videoId = parsedParams.v
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
  padding-top: 25px;
  height: 0;
`

export default YouTubeVideo
