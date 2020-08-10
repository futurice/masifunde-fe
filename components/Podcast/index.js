import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DocumentDownloadBox from '../DocumentsList/DocumentDownloadBox'
import FilePropType from '../../propTypes/file'
import { smBreakpoint } from '../../styling/breakpoints'
import { extraExtraSmallSpacing } from '../../styling/sizes'

const Title = styled.p`
  font-weight: bold;
  margin-bottom: ${extraExtraSmallSpacing};
  margin-top: ${extraExtraSmallSpacing};

  @media (min-width: ${smBreakpoint}) {
    margin-top: 0;
  }
`

const Description = styled.p`
  margin: 0;
`

const BoxContainerCol = styled.div`
  margin-bottom: 30px; // To match up bootstrap gutters
  display: flex;
  justify-content: center;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`


const Podcast = ({ expandList, podcast }) => (
  <Fragment>
    {expandList ? (
      <div className="row">
        {podcast.map(({
          podcastTitle, podcastImage, podcastAudio,
        }) => (
          <BoxContainerCol className="col-md-6" key={podcastAudio.url}>
            <div className="row">
              <ContentContainer className="col-sm-auto">
                <DocumentDownloadBox title={podcastTitle} fileUrl={podcastAudio.url} />
              </ContentContainer>
              <ContentContainer className="col">
                <Title>{podcastTitle}</Title>
                <Description>{podcastImage}</Description>
              </ContentContainer>
            </div>
          </BoxContainerCol>
        ))}
      </div>
    ) : (
      <div className="row">
        {podcast.map(({ podcastTitle, podcastAudio, podcastImage }) => (
          <BoxContainerCol key={podcastAudio.url} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-auto">
            <DocumentDownloadBox title={podcastTitle} fileUrl={podcastAudio.url} />
            <figure>
            <img src={podcastImage ?
               (podcastImage.file ? podcastImage.file.url : podcastImage.file)
                : podcastImage }/>
            <figcaption>{podcastTitle}</figcaption>
              <audio
                controls
                src={podcastAudio.file ? podcastAudio.file.url : podcastAudio.file}>
                    Your browser does not support the
                      <code>audio</code> element.
              </audio>
            </figure>
          </BoxContainerCol>
        ))}
      </div>
    )}
  </Fragment>
)

Podcast.propTypes = {
  expandList: PropTypes.bool,
  podcast: PropTypes.arrayOf(PropTypes.shape({
    podcastImage: PropTypes.string,
    podcastTitle: PropTypes.string,
    podcastAudio: PropTypes.shape(FilePropType),
  })),
}

Podcast.defaultProps = {
  expandList: false,
  podcast: [],
}

export default Podcast
