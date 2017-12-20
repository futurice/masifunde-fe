import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { rem } from 'polished'

const HEADLINE_MIDDLE = 'middle'
const HEADLINE_BOTTOM = 'bottom'
const HERO_LARGE = 'large'
const HERO_SMALL = 'small'

const HeroImage = styled.div`
  height: 400px; // 300px
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
  
  ${({ size }) => size === HERO_SMALL && css`
    height: 300px;
    
    @media screen and (min-width: 767px) {
      height: 400px;
    }

    @media screen and (min-width: 991px) {
      height: 500px;
    }
  `}
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
    ${({ shadow }) => shadow && 'text-shadow: 0 2px 34px rgba(0, 0, 0, 0.5);'};
    margin-bottom: ${({ placement }) => (placement === HEADLINE_MIDDLE ? '0' : '120px')};
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

const calculateJustifyContent = headlinePlacement =>
  (headlinePlacement === HEADLINE_MIDDLE ? 'justify-content-md-center' : '')

function Hero({
  headline,
  imageUrl,
  backgroundPositionX,
  headlineShadow,
  headlinePlacement,
  heroSize,
}) {
  return (
    <HeroImage
      backgroundPositionX={backgroundPositionX}
      className={`d-flex flex-column justify-content-end
      ${calculateJustifyContent(headlinePlacement)}`}
      imageUrl={imageUrl}
      size={heroSize}
    >
      {headline && (
        <TextContainer className="d-flex flex-column justify-content-end">
          <div className="container">
            <Headline shadow={headlineShadow} placement={headlinePlacement}>
              {headline}
            </Headline>
          </div>
        </TextContainer>
      )}
    </HeroImage>
  )
}

Hero.propTypes = {
  heroSize: PropTypes.oneOf([HERO_LARGE, HERO_SMALL]),
  headlineShadow: PropTypes.bool,
  backgroundPositionX: PropTypes.string,
  headlinePlacement: PropTypes.oneOf([HEADLINE_MIDDLE, HEADLINE_BOTTOM]),
  headline: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
}

Hero.defaultProps = {
  heroSize: 'large',
  headlineShadow: false,
  backgroundPositionX: '50%',
  headline: undefined,
  headlinePlacement: HEADLINE_MIDDLE,
}

export default Hero
