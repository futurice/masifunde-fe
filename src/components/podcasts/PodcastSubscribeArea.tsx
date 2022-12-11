import { FC } from 'react'
import styled from 'styled-components'
import { StaticPodcastPageContent } from '../../content/podcast-content'
import { smBreakpoint } from '../../styling/breakpoints'

// Props
// =====

export type Props = {
  subscribeText: string
  subscribeLinks: StaticPodcastPageContent['subscribeLinks']
}

// Helpers
// =======

const SubscribeText = styled.h3`
  color: #77695c;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0px;
  @media (max-width: ${smBreakpoint}) {
    text-align: center;
  }
`

const SubscribeContainer = styled.div`
  float: left;
  @media (max-width: ${smBreakpoint}) {
    float: none;
    display: block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`

const SubscribeIconContainer = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`
const SubscribeIcon = styled.div`
  float: left;
  width: 33.33%;
`

// Component
// =========

const Subscribe: FC<Props> = ({ subscribeText, subscribeLinks }) => (
  <SubscribeContainer>
    <SubscribeText>{subscribeText}</SubscribeText>
    <SubscribeIconContainer>
      <SubscribeIcon>
        <a href={subscribeLinks.iTunes} title="iTunes">
          <img src="/static/images/Icon-itunes.svg" alt="" />
        </a>
      </SubscribeIcon>
      <SubscribeIcon>
        <a href={subscribeLinks.Spotify} title="Spotify">
          <img src="/static/images/Icon-spotify.svg" alt="" />
        </a>
      </SubscribeIcon>
      <SubscribeIcon>
        <a href={subscribeLinks.Deezer} title="Deezer">
          <img src="/static/images/Icon-deezer.svg" alt="" />
        </a>
      </SubscribeIcon>
    </SubscribeIconContainer>
  </SubscribeContainer>
)

export default Subscribe
