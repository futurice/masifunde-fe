import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const Subscribe = ({
      subscribeText,
      subscribeLinks,
}) =>(
  <Fragment>
  <div>
    <p>{subscribeText}</p>
    <a href={subscribeLinks.iTunes} >
     <img src="/static/images/Icon-itunes.svg"/>
    </a>
    <a href={subscribeLinks.Spotify} >
     <img src="/static/images/Icon-spotify.svg"/>
    </a>
    <a href={subscribeLinks.Deezer} >
     <img src="/static/images/Icon-deezer.svg"/>
    </a>
  </div>
    </Fragment>
)



Subscribe.propTypes = {
  subscribeText: PropTypes.string,
  subscribeLinks : PropTypes.object.isRequired,
}

Subscribe.defaultProps = {

}

export default Subscribe
