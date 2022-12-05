import { FC } from 'react'
import styled from 'styled-components'
import { mdBreakpoint } from '../../styling/breakpoints'
import {
  createVimeoSrc,
  createYouTubeSrc,
  isYouTubeVideo,
} from '../../utils/video'
import ConditionalContainer from '../ConditionalContainer'

export type Props = {
  videoUrl: string
  className?: string
  alwaysFullWidth?: boolean
}

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const VideoIframeContainer: FC<Props> = ({ videoUrl, className }) => {
  const src = isYouTubeVideo(videoUrl)
    ? createYouTubeSrc(videoUrl)
    : createVimeoSrc(videoUrl)

  return (
    <div className={className}>
      <VideoIframe src={src} frameBorder="0" allowFullScreen />
    </div>
  )
}

const StyledVideoIframeContainer = styled(VideoIframeContainer)`
  position: relative;
  padding-bottom: 54%; /* 16:9 */
  height: 0;
`

const EmbeddedVideoContainer = styled.div<{ alwaysFullWidth: boolean }>`
  max-height: calc(90vh - ${({ theme }) => theme.headerHeight});
  margin: 0 auto;

  @media (min-width: ${mdBreakpoint}) {
    width: ${({ alwaysFullWidth }) => (alwaysFullWidth ? '100%' : '80%')};
  }
`

const EmbeddedVideo: FC<Props> = ({ alwaysFullWidth = false, ...rest }) => (
  <ConditionalContainer containAfter={alwaysFullWidth ? 'never' : 'md'}>
    <EmbeddedVideoContainer alwaysFullWidth={alwaysFullWidth}>
      <StyledVideoIframeContainer {...rest} />
    </EmbeddedVideoContainer>
  </ConditionalContainer>
)

export default EmbeddedVideo
