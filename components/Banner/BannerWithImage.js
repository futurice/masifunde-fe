import React from 'react'
import styled from 'styled-components'

import { propTypes, defaultProps } from './propTypes'
import { rem, headerFont } from '../../styling/typography'
import Link from '../Link'
import Button from '../Button'
import Heading from './Headline'
import PageSection from '../PageSection'

const Container = styled.div`
  margin-right: 0;
  margin-left: 0;
`

const Image = styled.div`
  background: url(${({ image }) => image}) center no-repeat;
  background-size: cover;
  min-height: 300px;
`

const ContentContainer = styled.span`
  background: url('/static/images/banner-pattern.svg') repeat;
  padding: 2rem 4rem;
  color: white;
`

const SubHeading = styled.span`
  display: block;
  font-size: ${rem('24px')};
  font-family: ${headerFont};
  font-weight: 500;
`

const ExtendedHeading = Heading.extend`
  text-align: left;
`
const Description = styled.span`
  display: block;
  margin-bottom: 1.5rem;
`

const BannerWithImage = ({
  subHeadline,
  headline,
  description,
  image,
  buttonText,
  buttonLink,
  showImageOnRight,
}) => {
  const content = (
    <ContentContainer className="col-md-8" key="content">
      {subHeadline && <SubHeading>{subHeadline}</SubHeading>}
      <ExtendedHeading>{headline}</ExtendedHeading>
      <Description>{description}</Description>
      <Link route={buttonLink} passHref>
        <Button type="banner">{buttonText}</Button>
      </Link>
    </ContentContainer>
  )
  const img = <Image className="col-md-4" alt="" image={image} key="img" />

  return (
    <PageSection>
      <Container className="row">
        {showImageOnRight ? [content, img] : [img, content]}
      </Container>
    </PageSection>
  )
}

BannerWithImage.propTypes = propTypes
BannerWithImage.defaultProps = defaultProps

export default BannerWithImage
