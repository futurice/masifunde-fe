import { FC } from 'react'
import styled from 'styled-components'
import { Asset } from '../../content/shared/assets'
import { rem } from '../../styling/typography'
import { wordBreak } from '../../styling/utils'
import RoundedImage from '../RoundedImage'

export type Props = {
  name: string
  title: string
  image: Asset
  className?: string
}

const maxImageSize = '160px'
const ImageContainer = styled.div`
  max-width: ${maxImageSize};
  max-height: ${maxImageSize};
  margin-bottom: 0.7rem;
`

const Name = styled.div`
  font-size: ${rem('18px')};
  font-weight: bold;
  line-height: 1.22;
  color: ${({ theme }) => theme.orangeRed};
  margin-bottom: 0.3rem;
`

const Title = styled.div`
  font-size: ${rem('12px')};
  line-height: 1.43;
  color: ${({ theme }) => theme.pineCone};
`

const PartnersListItem: FC<Props> = ({ image, name, title, className }) => (
  <div className={className}>
    <ImageContainer>
      <RoundedImage className="img-fluid" src={image.file.url} alt="" />
    </ImageContainer>
    {name && <Name>{name}</Name>}
    {title && <Title>{title}</Title>}
  </div>
)

const StyledPartnersListItem = styled(PartnersListItem)`
  ${wordBreak}
`

export default StyledPartnersListItem
