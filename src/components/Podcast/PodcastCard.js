import PropTypes from 'prop-types'
import { Component } from 'react'
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
  background: #f2dac9;
  margin: auto;
  display: block;
  opacity: 1;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
`
const PodcastTitleContainter = styled.div`
  padding-top: 20px;
  display: block;
  height: 90px;
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
`

const PodcastBodyContainer = styled.div`
  background: white;
  text-align: center;
  word-wrap: break-word;
  color: #4f463f;
  font: Bold 18px/22px Lato;
  letter-spacing: 0px;
  width: 100%;
  height: 200px;
`
const PodcastInfo = styled.div`
  text-align: center;
  font-weight: 200;
  margin-bottom: 10px;
`

const AudioButton = styled.button`
  height: 65px;
  border: none;
  background-color: white;
`

const CenterImage = styled.img`
  position: relative;
  margin: auto;
  display: inline;
`

const IconContainer = styled.div`
  position: absolute;
  bottom: 12px;
  right: 25px;
`

class PausePlayButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
    }
  }

  togglePlaying() {
    if (this.state.isPlaying) {
      document.getElementById(this.props.podcastTitle).pause()
    } else {
      document.getElementById(this.props.podcastTitle).play()
    }
    this.setState({
      isPlaying: !this.state.isPlaying,
    })
  }

  render() {
    const isPlaying = this.state.isPlaying
    if (isPlaying) {
      return (
        <AudioButton
          onClick={() => this.togglePlaying(this.props.podcastTitle)}
        >
          <CenterImage src="/static/images/pause.svg" />
        </AudioButton>
      )
    } else {
      return (
        <AudioButton
          onClick={() => this.togglePlaying(this.props.podcastTitle)}
        >
          <CenterImage src="/static/images/play.svg" />
        </AudioButton>
      )
    }
  }
}

PausePlayButton.propTypes = {
  podcastTitle: PropTypes.string,
}

const PodcastCard = ({
  podcastTitle,
  podcastAudio,
  podcastImage,
  date,
  duration,
}) => (
  <>
    <PodcastImageContainer>
      <PodcastImage src={podcastImage ? podcastImage.url : undefined} />
    </PodcastImageContainer>
    <PodcastBodyContainer>
      <PodcastTitleContainter>{podcastTitle}</PodcastTitleContainter>
      {/*  eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio id={podcastTitle} src={podcastAudio ? podcastAudio.url : ''}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <PodcastInfo>{duration.concat(' | ', formatDate(date))}</PodcastInfo>
      <PausePlayButton podcastTitle={podcastTitle} />
      <IconContainer>
        <a href={podcastAudio.url} download title="Download">
          <img src="/static/images/download.svg" alt="" />
        </a>
      </IconContainer>
    </PodcastBodyContainer>
  </>
)

PodcastCard.propTypes = {
  podcastTitle: PropTypes.string,
  podcastAudio: PropTypes.shape(FilePropType),
  podcastImage: PropTypes.shape(imagePropShape),
  date: PropTypes.string.isRequired,
  duration: PropTypes.string,
}

PodcastCard.defaultProps = {}

export default PodcastCard
