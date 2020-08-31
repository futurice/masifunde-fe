import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const Share = ({
      shareText,
      shareLinks,
}) =>(
  <Fragment>
  <div>
    <p>{shareText}</p>
    <a href={shareLinks.facebook} >
     <img src="/static/images/Icon-facebook.svg"/>
    </a>
    <a href={shareLinks.twitter} >
     <img src="/static/images/Icon-twitter.svg"/>
    </a>
  </div>
    </Fragment>
)



Share.propTypes = {
  shareText: PropTypes.string,
  shareLinks : PropTypes.object.isRequired,
}

Share.defaultProps = {

}

export default Share
