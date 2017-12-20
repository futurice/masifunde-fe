import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rem } from 'polished'

const HeroContainer = styled.div`
  height: 400px;
  width: 100%;
  margin-bottom: 50px;
  background: url("${({ imageUrl }) => imageUrl}") no-repeat;
  background-position: ${({ backgroundPositionX }) => backgroundPositionX} 50%;
  background-size: cover;

  @media screen and (min-width: 767px) {
    height: 550px;
  }

  @media screen and (min-width: 991px) {
    height: 700px;
  }
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

function Hero({
  headline, imageUrl, backgroundPositionX,
}) {
  return (
    <HeroContainer
      backgroundPositionX={backgroundPositionX}
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
  backgroundPositionX: PropTypes.string,
  headline: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
}

Hero.defaultProps = {
  backgroundPositionX: '50%',
  headline: undefined,
}

export default Hero
