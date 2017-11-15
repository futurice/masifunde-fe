/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Link } from '../routes'

const BannerContainer = styled.div`
  background-color: gray;
  padding-top: 50px;
  min-height: 350px;
  padding-bottom: 50px;
`

const Headline = styled.h2`
  margin-bottom: 30px;
`

const Button = styled.a`
  color: white;
`

function Banner({ headline, buttonText, buttonLink }) {
  return (
    <BannerContainer className="col d-flex flex-column align-items-center justify-content-center">
      <Headline>{headline}</Headline>
      <Link route={buttonLink} passHref>
        <Button className="btn btn-primary">
          {buttonText}
        </Button>
      </Link>
    </BannerContainer>
  )
}

Banner.propTypes = {
  headline: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
}

export default Banner
