import { FC } from 'react'
import styled from 'styled-components'
import { Asset } from '../../content/shared/assets'
import { teamMemberAndPartnerWidth } from '../../utils/constants'

export type Props = {
  name: string
  logo: Asset
  link: string
  className?: string
}

const PartnerContainer = styled.div`
  width: ${teamMemberAndPartnerWidth};
`

const Link = styled.a`
  height: 100%;
`

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 5px;
`

const PartnerName = styled.div`
  margin-top: 0.25rem;
`

const PartnersListItem: FC<Props> = ({ name, logo, link, className }) => (
  <PartnerContainer className={className}>
    <Link href={link}>
      <ImageContainer>
        <Image src={logo.file.url} alt="" />
      </ImageContainer>
      <PartnerName>{name}</PartnerName>
    </Link>
  </PartnerContainer>
)

export default PartnersListItem
