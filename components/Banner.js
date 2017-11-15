/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Link } from '../routes'

const BannerContainer = styled.div`
  background-color: gray;
  padding: 50px 0;
`

const Headline = styled.h2`
  margin-bottom: 30px;
`

const Button = styled.a`
  color: white;
`

function Banner({ headline, buttonText, buttonLink }) {
  return (
    <div className="container-fluid">
      <BannerContainer className="row">
        <div className="col d-flex flex-column align-items-center justify-content-center">
          <Headline>{headline}</Headline>
          <Link route={buttonLink} passHref>
            <Button className="btn btn-primary">
              {buttonText}
            </Button>
          </Link>
        </div>
      </BannerContainer>
    </div>
  )
}

Banner.propTypes = {
  headline: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
}

export default Banner
