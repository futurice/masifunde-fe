import styled from 'styled-components'
import { lgBreakpoint, mdBreakpoint } from '../../styling/breakpoints'
import {
  extraExtraSmallSpacing,
  extraLargeSpacing,
  mediumSpacing,
  smallSpacing,
} from '../../styling/sizes'
import { headerFont, rem } from '../../styling/typography'
import Link from '../Link'
import Button from '../shared/Button'
import Markdown from '../shared/Markdown'
import Headline from './Headline'
import { defaultProps, propTypes } from './propTypes'
import { background } from './styles'

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
  ${background};
  padding: ${smallSpacing};
  color: white;

  @media (min-width: ${mdBreakpoint}) {
    padding: ${mediumSpacing};
  }

  @media (min-width: ${lgBreakpoint}) {
    padding: ${mediumSpacing} ${extraLargeSpacing};
  }
`

const SubHeading = styled.span`
  display: block;
  font-size: ${rem('24px')};
  font-family: ${headerFont};
  font-weight: 500;
`

const ExtendedHeadline = styled(Headline)`
  display: block;
  text-align: left;
  margin-bottom: ${extraExtraSmallSpacing};
`
const Description = styled(Markdown)`
  p {
    margin-bottom: ${smallSpacing};
  }
`

const BannerWithImage = ({
  subHeadline,
  headline,
  description,
  image,
  buttonText,
  buttonLink,
  showImageOnRight,
  className,
}) => {
  const content = (
    <ContentContainer className="col-md-8" key="content">
      {subHeadline && <SubHeading>{subHeadline}</SubHeading>}
      <ExtendedHeadline>{headline}</ExtendedHeadline>
      {description && <Description source={description} />}
      <Link href={buttonLink} passHref>
        <Button variant="banner">{buttonText}</Button>
      </Link>
    </ContentContainer>
  )
  const img = <Image className="col-md-4" alt="" image={image} key="img" />

  return (
    <Container className={`${className} row`}>
      {showImageOnRight ? [content, img] : [img, content]}
    </Container>
  )
}

BannerWithImage.propTypes = propTypes
BannerWithImage.defaultProps = defaultProps

export default BannerWithImage
