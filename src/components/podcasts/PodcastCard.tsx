import { FC, useRef } from 'react'
import styled from 'styled-components'
import { Podcast } from '../../content/podcast-content'
import formatDate from '../../utils/formatDate'
import PlayPauseButton from './PlayPauseButton'

// Props
// =====

export type Props = {
  podcast: Podcast
}

// Helpers
// =======

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

const IconContainer = styled.div`
  position: absolute;
  bottom: 12px;
  right: 25px;
`

// Component
// =========

const PodcastCard: FC<Props> = ({ podcast }) => {
  const audioElementRef = useRef<HTMLAudioElement>(null)

  return (
    <>
      <PodcastImageContainer>
        <PodcastImage src={podcast.image.file.url} />
      </PodcastImageContainer>

      <PodcastBodyContainer>
        <PodcastTitleContainter>{podcast.title}</PodcastTitleContainter>

        {/*  eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          ref={audioElementRef}
          id={podcast.title}
          src={podcast.audio.file.url}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>

        <PodcastInfo>
          {podcast.duration}
          {' | '}
          {formatDate(podcast.date)}
        </PodcastInfo>

        <PlayPauseButton audioElementRef={audioElementRef} />

        <IconContainer>
          <a href={podcast.audio.file.url} download title="Download">
            <img src="/static/images/download.svg" alt="" />
          </a>
        </IconContainer>
      </PodcastBodyContainer>
    </>
  )
}

export default PodcastCard
