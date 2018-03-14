/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'

import Button from '../Button'
import PageSection from '../PageSection'
import { rem } from '../../styling/typography'
import theme from '../../styling/theme'
import Link from '../Link'
import Headline from './Headline'
import { propTypes, defaultProps } from './propTypes'

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

function BannerWithoutImage({ headline, buttonText, buttonLink }) {
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

BannerWithoutImage.propTypes = propTypes
BannerWithoutImage.defaultProps = defaultProps

export default BannerWithoutImage
