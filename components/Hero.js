import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeroContainer = styled.div`
  height: 700px;
  width: 100%;
  background: url("${({ imageUrl }) => imageUrl}") center no-repeat;
  background-size: cover;
  
  @media screen and (max-width: 768px){
    padding: 0 15px;
  }
`

const Headline = styled.h1`
  color: white;
  max-width: 480px;
`

function Hero({ headline, imageUrl }) {
  return (
    <HeroContainer
      className="d-flex flex-column justify-content-center"
      imageUrl={imageUrl}
    >
      <div className="container">
        <Headline>{headline}</Headline>
      </div>
    </HeroContainer>
  )
}

Hero.propTypes = {
  headline: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

export default Hero
