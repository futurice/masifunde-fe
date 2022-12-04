import { Component } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { bodyText } from '../../styling/typography'
import { extraExtraSmallSpacing } from '../../styling/sizes'
import EmbeddedVideo from '../EmbeddedVideo'
import {
  getVimeoThumbnail,
  getYoutubeThumbnail,
  isYouTubeVideo,
} from '../../utils/video'
import { wordBreak } from '../../styling/utils'

const ImageButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  width: 160px;
`

const Image = styled.img`
  min-width: 160px;
  min-height: 120px;
  background-color: gray;
`

const Title = styled.div`
  ${bodyText};
  text-align: left;
  font-weight: bold;
  margin-top: ${extraExtraSmallSpacing};
  ${wordBreak}
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-around;
`

const ImageContainer = styled.div`
  position: relative;
  &:before {
    position: absolute;
    background: url('/static/images/playvideo-icon.svg');
    content: '';
    height: 50px;
    width: 50px;

    top: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    left: 50%;
    margin-right: -50%;
  }

  &:hover {
    &:before {
      background: url('/static/images/playvideo-hover-icon.svg');
    }
  }
`

const CloseButton = styled.button`
  border: none;
  width: 25px;
  height: 25px;
  padding: 5px;
  background: transparent url('/static/images/close-icon.svg') no-repeat;
  cursor: pointer;
`

class VideoModal extends Component {
  state = {
    modalIsOpen: false,
    thumbnail: '',
  }

  componentDidMount = () => {
    const { videoUrl } = this.props

    if (isYouTubeVideo(videoUrl)) {
      this.setState({
        thumbnail: getYoutubeThumbnail(videoUrl),
      })
    } else {
      // To get vimeo thumbnail the API request is required
      getVimeoThumbnail(videoUrl).then((thumbnailUrl) => {
        this.setState({
          thumbnail: thumbnailUrl,
        })
      })
    }
  }

  getParent = () => document.getElementById('__next')

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  render() {
    const { title, videoUrl } = this.props
    const { thumbnail } = this.state

    return (
      <>
        <ImageButton onClick={this.openModal}>
          <ImageContainer>
            <Image className="img-fluid" src={thumbnail} alt="" />
          </ImageContainer>
          <Title>{title}</Title>
        </ImageButton>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          parentSelector={this.getParent}
          ariaHideApp={false}
          // By passing class names it removes default
          // Inline styling
          className="removeInlineStyles"
          overlayClassName="removeInlineStyles"
        >
          <ModalHeader>
            <h3>{title}</h3>
            <CloseButton onClick={this.closeModal} />
          </ModalHeader>
          <EmbeddedVideo alwaysFullWidth videoUrl={videoUrl} />
        </Modal>
      </>
    )
  }
}

VideoModal.propTypes = {
  title: PropTypes.string,
  videoUrl: PropTypes.string.isRequired,
}

VideoModal.defaultProps = {
  title: '',
}

export default VideoModal
