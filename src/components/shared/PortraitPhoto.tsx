import { FC } from 'react'
import styled from 'styled-components'
import { rem } from '../../styling/typography'
import { teamMemberAndPartnerWidth } from '../../utils/constants'
import RoundedImage from '../RoundedImage'

// Prrops
// ======

export type Props = {
  imageUrl: string
  title: string
  subtitle?: string
  email?: string
  className?: string
}

// Helpers
// =======

const PortraitPhotoContainer = styled.div`
  max-width: ${teamMemberAndPartnerWidth};
  white-space: nowrap;
`

const Image = styled(RoundedImage)`
  width: 100%;
  margin-bottom: 0.7rem;
`

const Title = styled.div`
  font-weight: bold;
  margin: 0 0 0.3rem 0;
`

const Subtitle = styled.div`
  color: ${({ theme }) => theme.pineCone};
  font-size: ${rem('12px')};
`

const Email = styled.a`
  display: block;
  font-size: ${rem('12px')};
`

// Component
// =========

const PortraitPhoto: FC<Props> = ({
  imageUrl,
  title,
  subtitle,
  email,
  className,
}) => (
  <PortraitPhotoContainer className={className}>
    <Image className="img-fluid" src={imageUrl} alt="" />
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    {email && <Email href={`mailto:${email}`}>{email}</Email>}
  </PortraitPhotoContainer>
)

export default PortraitPhoto
