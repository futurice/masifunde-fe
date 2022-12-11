import { FC, RefObject, useCallback, useState } from 'react'
import styled from 'styled-components'

export type Props = {
  audioElementRef: RefObject<HTMLAudioElement | null>
}

const AudioButton = styled.button`
  height: 65px;
  border: none;
  background-color: white;

  :hover {
    cursor: pointer;
  }
`

const CenterImage = styled.img`
  position: relative;
  margin: auto;
  display: inline;
`

const PlayPauseButton: FC<Props> = ({ audioElementRef }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const iconUrl = isPlaying
    ? '/static/images/pause.svg'
    : '/static/images/play.svg'

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      audioElementRef.current?.pause()
      setIsPlaying(false)
    } else {
      audioElementRef.current?.play()
      setIsPlaying(true)
    }
  }, [audioElementRef, isPlaying])

  return (
    <AudioButton onClick={handlePlayPause}>
      <CenterImage src={iconUrl} />
    </AudioButton>
  )
}

export default PlayPauseButton
