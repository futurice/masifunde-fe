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
  min-height: ${rem('412px')};
  padding-top: ${rem('24px')};
  padding-bottom: ${rem('24px')}
`

const Headline = styled.span`
  ${titleText}
  color: white;
  font-size: ${rem('24px')};
  font-weight: bold;
  hyphens: auto;
  letter-spacing: ${rem('0.2px')};
  line-height: 1.25;
  margin-bottom: ${rem('20px')};
  overflow-wrap: break-word;
  text-align: left;


  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('34px')};
    letter-spacing: ${rem('0.3px')};
    line-height: 1.12;
    text-align: center;
    width: 80%;
  }

  @media (min-width: ${lgBreakpoint}) {
    font-size: ${rem('40px')};
    letter-spacing: ${rem('0.4px')};
    line-height: 1.1;
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
