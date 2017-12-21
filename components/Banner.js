/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import { Link } from '../routes'

const BannerWrapper = styled.div`
  background-color: #FE9933;
  background: url(/static/images/banner-pattern.svg) repeat;
`

const BannerContainer = styled.div`
  height: auto;
  min-height: 350px;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`

const Headline = styled.span`
  font-weight: bold;
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  color: white;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 1.5rem;
  line-height: 1.3;
  
  @media (min-width: 768px) {
    font-size: 2.1rem;
    width: 80%;
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
