import PropTypes from 'prop-types'
import styled from 'styled-components'

import { lgBreakpoint, mdBreakpoint } from '../../styling/breakpoints'
import { headerFont, rem } from '../../styling/typography'
import { smallSpacing, mediumSpacing, largeSpacing } from '../../styling/sizes'

export const HEADLINE_MIDDLE = 'middle'
export const HEADLINE_BOTTOM = 'bottom'

const Headline = styled.p`
  word-wrap: break-word;
  hyphens: auto;
  width: 100%;
  display: block;
  color: white;
  font-size: ${rem('26px')};
  font-weight: 700;
  font-family: ${headerFont};
  padding: ${smallSpacing};
  line-height: 1.1;
  max-width: ${({ maxWidth }) => `${maxWidth}`};

  @media screen and (min-width: ${mdBreakpoint}) {
    font-size: ${rem('34px')};
    line-height: 1.11;
    ${({ shadow }) => shadow && 'text-shadow: 0 2px 34px rgba(0, 0, 0, 0.5);'};
    margin-left: ${({ placement }) =>
      placement === HEADLINE_MIDDLE ? '32px' : '32px'};
    margin-bottom: ${({ placement }) =>
      placement === HEADLINE_MIDDLE ? '32px' : '32px'};
    padding: ${mediumSpacing};
  }

  @media screen and (min-width: ${lgBreakpoint}) {
    font-size: ${rem('40px')};
    line-height: 1.08;
    letter-spacing: ${rem('0.5px')};
    max-width: ${({ maxWidth }) => `calc(1.2 * ${maxWidth})`};
    padding: ${largeSpacing};
  }
`

const GradientShadow = styled.div`
  min-height: 40%;
  background-image: linear-gradient(
    to bottom,
    rgba(48, 42, 31, 0),
    rgba(48, 42, 31, 0.7)
  );

  @media screen and (min-width: ${mdBreakpoint}) {
    min-height: 60%;
  }
`

const HeroHeadline = ({
  headline,
  headlineShadow,
  headlinePlacement,
  maxWidth,
}) => {
  if (headline) {
    const title = (
      <Headline
        maxWidth={maxWidth}
        shadow={headlineShadow}
        placement={headlinePlacement}
      >
        {headline}
      </Headline>
    )

    if (headlinePlacement === HEADLINE_MIDDLE) {
      return title
    }

    return (
      <GradientShadow className="d-flex flex-column justify-content-end">
        {title}
      </GradientShadow>
    )
  }

  return null
}

export const propTypes = {
  headlineShadow: PropTypes.bool,
  headlinePlacement: PropTypes.oneOf([HEADLINE_MIDDLE, HEADLINE_BOTTOM]),
  headline: PropTypes.string,
  maxWidth: PropTypes.string,
}

export const defaultProps = {
  headlineShadow: false,
  headline: undefined,
  headlinePlacement: HEADLINE_MIDDLE,
  maxWidth: '660px',
}

HeroHeadline.propTypes = propTypes
HeroHeadline.defaultProps = defaultProps

export default HeroHeadline
