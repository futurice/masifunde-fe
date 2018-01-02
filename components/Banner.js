/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import { Link } from '../routes'
import { headerText, rem } from '../styling/typography'
import { mdBreakpoint, lgBreakpoint, smBreakpoint } from '../styling/breakpoints'

const BannerWrapper = styled.div`
  background-color: #FE9933;
  background: url(/static/images/banner-pattern.svg) repeat;
  margin-bottom: 4rem;
  @media (min-width: ${smBreakpoint}) {
    margin-bottom: 6.25rem;
  }
`

const BannerContainer = styled.div`
  height: auto;
  min-height: ${rem('412px')};
  padding-top: ${rem('24px')};
  padding-bottom: ${rem('24px')}
`

const Headline = styled.span`
  ${headerText}
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
    <BannerWrapper className="d-flex">
      <BannerContainer className="container d-flex flex-column align-items-center justify-content-center">
        <Headline>{headline}</Headline>
        <Link route={buttonLink} passHref>
          <Button type="banner">
            {buttonText}
          </Button>
        </Link>
      </BannerContainer>
    </BannerWrapper>
  )
}

Banner.propTypes = {
  headline: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
}

export default Banner
