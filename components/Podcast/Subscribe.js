import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { smBreakpoint } from '../../styling/breakpoints'


const SubscribeText = styled.h3`
  color: #77695C;
  font-size:18px;
  font-weight:600;
  margin-bottom:0px;
  @media (max-width: ${smBreakpoint}) {
    text-align: center;
  }
`

const SubscribeContainer = styled.div`
  float: left;
  @media (max-width: ${smBreakpoint}) {
    float: none;
    display:block;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`

const SubscribeIconContainer = styled.div`
  &::after{
    content: "";
    clear: both;
    display: table;
  }
`
const SubscribeIcon = styled.div`
  float: left;
  width: 33.33%;
`

const Subscribe = ({
      subscribeText,
      subscribeLinks,
}) =>(
  <SubscribeContainer>
    <SubscribeText>{subscribeText}</SubscribeText>
    <SubscribeIconContainer>
      <SubscribeIcon>
        <a href={subscribeLinks.iTunes} >
         <img src="/static/images/Icon-itunes.svg"/>
        </a>
      </SubscribeIcon>
      <SubscribeIcon>
        <a href={subscribeLinks.Spotify} >
         <img src="/static/images/Icon-spotify.svg"/>
        </a>
      </SubscribeIcon>
      <SubscribeIcon>
        <a href={subscribeLinks.Deezer} >
         <img src="/static/images/Icon-deezer.svg"/>
        </a>
      </SubscribeIcon>
    </SubscribeIconContainer>
  </SubscribeContainer>
)



Subscribe.propTypes = {
  subscribeText: PropTypes.string.isRequired,
  subscribeLinks : PropTypes.object.isRequired,
}

Subscribe.defaultProps = {

}

export default Subscribe
