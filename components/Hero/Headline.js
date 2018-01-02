import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { lgBreakpoint, mdBreakpoint } from '../../styling/breakpoints'
import { headerFont, rem } from '../../styling/typography'

export const HEADLINE_MIDDLE = 'middle'
export const HEADLINE_BOTTOM = 'bottom'

const Headline = styled.span`
  word-wrap: break-word;
  width: 100%;
  display: block;
  color: white;
  font-size: ${rem('30px')};
  font-weight: 700;
  font-family: ${headerFont};
  margin-bottom: ${rem('32px')};
  line-height: 1.1;
  max-width: 400px;

  @media screen and (min-width: ${mdBreakpoint}) {
    font-size: ${rem('36px')};
    line-height: 1.11;
    padding-left: 25px;
    ${({ shadow }) => shadow && 'text-shadow: 0 2px 34px rgba(0, 0, 0, 0.5);'};
    margin-bottom: ${({ placement }) => (placement === HEADLINE_MIDDLE ? '0' : '120px')};
  }

  @media screen and (min-width: ${lgBreakpoint}) {
    font-size: ${rem('48px')};
    line-height: 1.08;
    letter-spacing: ${rem('0.5px')};
    padding-left: ${rem('25px')};
    max-width: 450px;
  }
`

const GradientShadow = styled.div`
  min-height: 40%;
  background-image: linear-gradient(to bottom, rgba(48, 42, 31, 0), rgba(48, 42, 31, 0.7));

  @media screen and (min-width: ${mdBreakpoint}) {
    min-height: 0;
    background-image: none;
  }
`

const HeroHeadline = ({ headline, headlineShadow, headlinePlacement }) => {
  if (headline) {
    return (
      <GradientShadow className="d-flex flex-column justify-content-end">
        <div className="container">
          <Headline shadow={headlineShadow} placement={headlinePlacement}>
            {headline}
          </Headline>
        </div>
      </GradientShadow>
    )
  }
  return null
}


export const propTypes = {
  headlineShadow: PropTypes.bool,
  headlinePlacement: PropTypes.oneOf([HEADLINE_MIDDLE, HEADLINE_BOTTOM]),
  headline: PropTypes.string,
}

export const defaultProps = {
  headlineShadow: false,
  headline: undefined,
  headlinePlacement: HEADLINE_MIDDLE,
}

HeroHeadline.propTypes = propTypes
HeroHeadline.defaultProps = defaultProps

export default HeroHeadline
