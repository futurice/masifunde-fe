import styled from 'styled-components'
import theme from '../styling/theme'

const { socialLinkGrey } = theme

const SocialLink = styled.a`
  color: ${socialLinkGrey};
  opacity: 0.6;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${socialLinkGrey} !important;
    opacity: 1;
  }
`

export default SocialLink
