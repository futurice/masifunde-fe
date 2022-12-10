import { Container } from 'reactstrap'
import styled from 'styled-components'
import { rem } from '../../styling/typography'
import Button from '../Button'
import Link from '../Link'
import PageSection from '../shared/PageSection'
import Headline from './Headline'
import { defaultProps, propTypes } from './propTypes'
import { background } from './styles'

const OuterContainer = styled(PageSection).attrs({ contained: false })`
  ${background};
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
  padding-bottom: ${rem('45px')};
`

function BannerWithoutImage({ headline, buttonText, buttonLink, className }) {
  return (
    <OuterContainer className={className}>
      <InnerContainer>
        <Headline>{headline}</Headline>
        <Link href={buttonLink} passHref>
          <Button type="banner">{buttonText}</Button>
        </Link>
      </InnerContainer>
    </OuterContainer>
  )
}

BannerWithoutImage.propTypes = propTypes
BannerWithoutImage.defaultProps = defaultProps

export default BannerWithoutImage
