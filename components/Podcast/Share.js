import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const ShareText = styled.h3`
  color: #77695C;
  font-size:18px;
  font-weight:600;
  margin-bottom:0px;
  text-align: right;
`

const ShareContainer = styled.div`
  float: right;
  min-width: 8em;
  text-align:right;
`

const ShareIconContainer = styled.div`
  &::after{
    content: "";
    clear: both;
    display: table;
  }

`
const ShareIcon = styled.div`
  float: right;
  width: 33.33%;
`

const Share = ({
      shareText,
      shareLinks,
}) =>(
  <ShareContainer>
    <ShareText>{shareText}</ShareText>
    <ShareIconContainer>
      <ShareIcon>
        <a href={shareLinks.Twitter} >
         <img src="/static/images/Icon-twitter.svg"/>
        </a>
      </ShareIcon>
      <ShareIcon>
        <a href={shareLinks.Facebook} >
         <img src="/static/images/Icon-facebook.svg"/>
        </a>
      </ShareIcon>
      <ShareIcon>
        <a href={shareLinks.Instagram} >
         <img src="/static/images/Icon-instagram.svg"/>
        </a>
      </ShareIcon>
    </ShareIconContainer>
  </ShareContainer>
)



Share.propTypes = {
  shareText: PropTypes.string,
  shareLinks : PropTypes.object.isRequired,
}

Share.defaultProps = {

}

export default Share
