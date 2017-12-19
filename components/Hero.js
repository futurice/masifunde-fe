import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rem } from 'polished'

const HeroContainer = styled.div`
  height: 70vh;
  max-height: 700px;
  width: 100%;
  background: url("${({ imageUrl }) => imageUrl}") center no-repeat;
  background-size: cover;
  margin-bottom: 50px;
`

const Headline = styled.span`
  display: block;
  color: white;
  font-size: ${rem('30px')};
  font-weight: 700;
  font-family: Raleway, sans-serif;
  margin-bottom: ${rem('32px')};
  line-height: 1.1;
  max-width: 400px;

  @media screen and (min-width: 767px) {
    font-size: ${rem('36px')};
    line-height: 1.11;
    padding-left: 25px;
  }

  @media screen and (min-width: 991px) {
    font-size: ${rem('48px')};
    line-height: 1.08;
    letter-spacing: ${rem('0.5px')};
    padding-left: ${rem('25px')};
    max-width: 450px;
  }
`

const TextContainer = styled.div`
  @media screen and (max-width: 767px) {
    min-height: 40%;
    background-image: linear-gradient(to bottom, rgba(48, 42, 31, 0), rgba(48, 42, 31, 0.7));
  }
`

function Hero({ headline, imageUrl }) {
  return (
    <HeroContainer
      className="d-flex flex-column justify-content-md-center justify-content-end"
      imageUrl={imageUrl}
    >
      <TextContainer className="d-flex flex-column justify-content-md-center justify-content-end">
        <div className="container">
          <Headline>{headline}</Headline>
        </div>
      </TextContainer>
    </HeroContainer>
  )
}

Hero.propTypes = {
  headline: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
}

Hero.defaultProps = {
  headline: undefined,
}

export default Hero
