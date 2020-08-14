import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FilePropType from '../../propTypes/file'
import imagePropShape from '../../propTypes/image'
import formatDate from '../../utils/date'



const PodcastImage = styled.img`
  margin: auto;
  width: auto;
  display: block;
`
const PodcastImageContainer = styled.div`
  background:#F2DAC9;
  margin: auto;
  display: block;
  opacity:1;
  padding-top: 20px;
  padding-bottom: 20px;
  width:100%;
`
const PodcastBodyContainer = styled.div`
  background: white;
  text-align: center;
  word-wrap: break-word;
  color: #4F463F;
  font: Bold 18px/22px Lato;
  letter-spacing: 0px;
  width:100%;
  height:200px;
`

const PlayButton = styled.button`
  border-radius:50px;
  border: none;
  background-color:white;
`
const PauseButton = styled.button`
  border-radius:50px;
  border: none;
  background-color:white;
`

const CenterImage = styled.img`
  position: relative;
  margin: auto;
`

const PodcastCard = ({
      podcastTitle,
      podcastAudio,
      podcastImage,
      date,
      duration,
}) =>(
  <Fragment>
    <PodcastImageContainer>
      <PodcastImage
        src={podcastImage ?
          (podcastImage.url ? "https:" + podcastImage.url : podcastImage.url)
            : podcastImage }/>
        </PodcastImageContainer>
        <PodcastBodyContainer>
        <figure>
          <figcaption>{podcastTitle}</figcaption>
          <audio id = {podcastTitle}
            src={podcastAudio.url ? "https:" + podcastAudio.url : podcastAudio.url}>
                Your browser does not support the
                  <code>audio</code> element.
          </audio>
          <p>{formatDate(date)}</p>
          <p>{duration}</p>
            <div>
              <PlayButton onClick={()=>(document.getElementById(podcastTitle).play())} >
                <CenterImage src="/static/images/play.svg"/>
              </PlayButton>
              <PauseButton onClick={()=>(document.getElementById(podcastTitle).pause())} >
               <CenterImage src="/static/images/pause.svg"/>
              </PauseButton>
              <CenterImage src="/static/images/share.svg"/>
              <a href={"https:" + podcastAudio.url} download={podcastTitle}>
               <CenterImage src="/static/images/download.svg"/>
              </a>
            </div>
        </figure>
      </PodcastBodyContainer>
    </Fragment>
)



PodcastCard.propTypes = {
  podcastTitle: PropTypes.string,
  podcastAudio: PropTypes.shape(FilePropType),
  podcastImage: PropTypes.shape(imagePropShape),
  date: PropTypes.string.isRequired,
  duration: PropTypes.string,
}

PodcastCard.defaultProps = {

}

export default PodcastCard
