import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { smBreakpoint } from '../../styling/breakpoints'
import VideoModal from './VideoModal'

const ContentContainer = styled.div`
  margin-bottom: 30px; //bootrsrap gutter
  display: flex;
  justify-content: center;
  
  @media(min-width: ${smBreakpoint}) {
    display: block;
  }
`

const VideoList = ({ videos }) => (
  <div className="row">
    {videos.map(({ videoUrl, title }) => (
      <ContentContainer key={videoUrl} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-auto">
        <VideoModal videoUrl={videoUrl} title={title} />
      </ContentContainer>
    ))}
  </div>
)

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  })),
}

VideoList.defaultProps = {
  videos: [],
}

export default VideoList
