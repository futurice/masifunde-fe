import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import {
  lgBreakpoint,
  mdBreakpoint,
  smBreakpoint,
} from '../../styling/breakpoints'
import Headline, {
  HEADLINE_MIDDLE,
  propTypes as headlinePropTypes,
  defaultProps as headlineDefaultProps,
} from './Headline'

const HERO_LARGE = 'large'
const HERO_SMALL = 'small'

const HeroImage = styled.div`
  height: 400px;
  width: 100%;
  background: url("${({ imageUrl }) => imageUrl}") no-repeat;
  background-position: ${({ backgroundPositionX }) => backgroundPositionX} 50%;
  background-size: cover;
  max-height: calc(100vh - ${props => props.theme.headerHeight});
  margin-top: -${props => props.theme.pagePaddingMobile};
  margin-bottom: 3.5rem;
  @media (min-width: ${smBreakpoint}) {
    margin-bottom: 6.25rem;
    margin-top: -${props => props.theme.pagePadding};
  }

  @media screen and (min-width: ${mdBreakpoint}) {
    height: 550px;
  }

  @media screen and (min-width: ${lgBreakpoint}) {
    height: 700px;
  }

  ${({ size }) => size === HERO_SMALL && css`
    height: 300px;

    @media screen and (min-width: ${mdBreakpoint}) {
      height: 400px;
    }

    @media screen and (min-width: ${lgBreakpoint}) {
      height: 500px;
    }
  `}
`

const getPlacementClass = headlinePlacement =>
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
      ${getPlacementClass(headlinePlacement)}`}
      imageUrl={imageUrl}
      size={heroSize}
    >
      <Headline
        headlineShadow={headlineShadow}
        headlinePlacement={headlinePlacement}
        headline={headline}
      />
    </HeroImage>
  )
}

Hero.propTypes = {
  heroSize: PropTypes.oneOf([HERO_LARGE, HERO_SMALL]),
  backgroundPositionX: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  ...headlinePropTypes,
}

Hero.defaultProps = {
  heroSize: HERO_LARGE,
  backgroundPositionX: '50%',
  ...headlineDefaultProps,
}

export default Hero
