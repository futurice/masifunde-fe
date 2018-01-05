/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import PageSection from './PageSection'
import { Link } from '../routes'
import { titleText, rem } from '../styling/typography'
import { mdBreakpoint, lgBreakpoint } from '../styling/breakpoints'
import theme from '../styling/theme'

const OuterContainer = styled(PageSection).attrs({ contained: false })`
  background-color: ${theme.orange};
  background: url(/static/images/banner-pattern.svg) repeat;
  display: flex;
`

const InnerContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: auto;
  min-height: ${rem('350px')};
  padding-top: ${rem('45px')};
  padding-bottom: ${rem('45px')}
`

const Headline = styled.span`
  ${titleText}
  color: white;
  font-size: ${rem('24px')};
  font-weight: bold;
  hyphens: auto;
  letter-spacing: ${rem('0.2px')};
  line-height: 1.39;
  margin-bottom: ${rem('30px')};
  overflow-wrap: break-word;
  text-align: center;


  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('26px')};
    letter-spacing: ${rem('0.3px')};
    line-height: 1.39;
    width: 80%;
  }

  @media (min-width: ${lgBreakpoint}) {
    font-size: ${rem('32px')};
    letter-spacing: ${rem('0.4px')};
    line-height: 1.39;
  }
`

function Banner({ headline, buttonText, buttonLink }) {
  return (
    <OuterContainer>
      <InnerContainer>
        <Headline>{headline}</Headline>
        <Link route={buttonLink} passHref>
          <Button type="banner">
            {buttonText}
          </Button>
        </Link>
      </InnerContainer>
    </OuterContainer>
  )
}

Banner.propTypes = {
  headline: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
}

export default Banner
