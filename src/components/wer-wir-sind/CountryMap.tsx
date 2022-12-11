import { FC } from 'react'
import styled from 'styled-components'
import { Asset } from '../../content/shared/assets'
import { lgBreakpoint } from '../../styling/breakpoints'
import { extraSmallSpacing, largeSpacing } from '../../styling/sizes'
import Button from '../Button'
import Link from '../Link'

export type Props = {
  image: Asset
  buttonText: string
  href: string
}

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const CountryContainer = styled.div`
  margin-top: ${extraSmallSpacing};
`

const ImageContainer = styled.div`
  flex-grow: 1;
  height: 270px;

  @media screen and (min-width: ${lgBreakpoint}) {
    height: 400px;
  }
`

const TeamButton = styled(Button)`
  margin-top: ${largeSpacing};
`

const CountryMap: FC<Props> = ({ image, buttonText, href }) => (
  <CountryContainer className="col-md-6 d-flex flex-column align-items-center">
    <ImageContainer className="d-flex justify-content-center w-100 align-items-center">
      <Image
        className="col-xs-8 col-sm-10 col-md-11 col-lg-10"
        src={image.file.url}
        alt={image.title}
      />
    </ImageContainer>
    <Link href={href} passHref>
      <TeamButton>{buttonText}</TeamButton>
    </Link>
  </CountryContainer>
)

export default CountryMap
