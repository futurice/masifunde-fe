import PropTypes from 'prop-types'
import styled from 'styled-components'

import ImagePropTypes from '../../propTypes/image'
import { rem } from '../../styling/typography'
import { wordBreak } from '../../styling/utils'
import RoundedImage from '../RoundedImage'

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

const Supporter = ({ image: { url: imageUrl }, name, title, ...rest }) => (
  <div {...rest}>
    <ImageContainer>
      <RoundedImage className="img-fluid" src={imageUrl} alt="" />
    </ImageContainer>
    {name && <Name>{name}</Name>}
    {title && <Title>{title}</Title>}
  </div>
)

Supporter.propTypes = {
  image: PropTypes.shape(ImagePropTypes).isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
}

Supporter.defaultProps = {
  name: undefined,
  title: undefined,
}

const StyledPatron = styled(Supporter)`
  ${wordBreak}
`

StyledPatron.propTypes = Supporter.propTypes
StyledPatron.defaultProps = Supporter.defaultProps

export default StyledPatron
