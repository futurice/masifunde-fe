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

const AudioButton = styled.button`
  height:65px;
  border: none;
  background-color:white;
`

const CenterImage = styled.img`
  position: relative;
  margin: auto;
`


class PausePlayButton extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isPlaying: false,
    }
  }

  togglePlaying(props){
    if (this.state.isPlaying){
      document.getElementById(this.props.podcastTitle).pause()
    } else {
      document.getElementById(this.props.podcastTitle).play()
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  render(){
    const isPlaying = this.state.isPlaying
    if (isPlaying){
      return (
        <AudioButton onClick={()=>this.togglePlaying(this.props.podcastTitle)} >
         <CenterImage src="/static/images/pause.svg"/>
        </AudioButton>
      )
    } else {
      return(
        <AudioButton onClick={()=>this.togglePlaying(this.props.podcastTitle)} >
          <CenterImage src="/static/images/play.svg"/>
        </AudioButton>
      )
    }

  }

}



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
          <p>{duration + " | " + formatDate(date)}</p>
            <PausePlayButton podcastTitle={podcastTitle}/>
            <div>
            <CenterImage src="/static/images/share.svg"/>
            <a href={"http:" + podcastAudio.url} download>
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
