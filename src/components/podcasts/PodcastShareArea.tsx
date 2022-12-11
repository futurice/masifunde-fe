import { FC } from 'react'
import styled from 'styled-components'
import { StaticPodcastPageContent } from '../../content/podcast-content'
import { smBreakpoint } from '../../styling/breakpoints'

// Props
// =====

export type Props = {
  shareText: string
  shareLinks: StaticPodcastPageContent['shareLinks']
}

// Helpers
// =======

const ShareText = styled.h3`
  color: #77695c;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0px;
  text-align: right;
  @media (max-width: ${smBreakpoint}) {
    text-align: center;
  }
`

const ShareContainer = styled.div`
  float: right;
  min-width: 8em;
  text-align: right;
  @media (max-width: ${smBreakpoint}) {
    float: none;
    display: block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`

const ShareIconContainer = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`
const ShareIcon = styled.div`
  float: right;
  width: 33.33%;
  @media (max-width: ${smBreakpoint}) {
    float: none;
    display: inline-block;
    text-align: center;
  }
`

// Component
// =========

const Share: FC<Props> = ({ shareText, shareLinks }) => (
  <ShareContainer>
    <ShareText>{shareText}</ShareText>
    <ShareIconContainer>
      <ShareIcon>
        <a href={shareLinks.Twitter} title="Twitter">
          <img src="/static/images/Icon-twitter.svg" alt="" />
        </a>
      </ShareIcon>
      <ShareIcon>
        <a href={shareLinks.Facebook} title="Facebook">
          <img src="/static/images/Icon-facebook.svg" alt="" />
        </a>
      </ShareIcon>
      <ShareIcon>
        <a href={shareLinks.Instagram} title="Instagram">
          <img src="/static/images/Icon-instagram.svg" alt="" />
        </a>
      </ShareIcon>
    </ShareIconContainer>
  </ShareContainer>
)

export default Share
