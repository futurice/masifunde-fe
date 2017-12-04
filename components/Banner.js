/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import { Link } from '../routes'

const BannerWrapper = styled.div`
  background-color: #FE9933;
  background: url(/static/banner-pattern.svg) repeat;
`

const BannerContainer = styled.div`
  height: 0px;
  min-height: 350px;
`

const Headline = styled.h2`
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
  color: white;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 40px;
`

function Banner({ headline, buttonText, buttonLink }) {
  return (
    <BannerWrapper>
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
