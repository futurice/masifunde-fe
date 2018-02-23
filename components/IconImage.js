import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { smBreakpoint } from '../styling/breakpoints'
import { extraExtraSmallSpacing } from '../styling/sizes'

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  height: auto;
`

const IconImage = ({ src, alt, ...rest }) => (
  <div {...rest}>
    <Image src={src} alt={alt} />
  </div>
)

IconImage.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.string,
  alt: PropTypes.string,
}

IconImage.defaultProps = {
  alt: '',
  size: '144px', // 1x1 ratio image
}

const StyledIconImage = styled(IconImage)`
  display: flex;
  align-items: center;  
  justify-content: center;
  margin-bottom: ${extraExtraSmallSpacing};
  max-width: ${({ size }) => size};
  max-height: ${({ size }) => size};

  @media(min-width: ${smBreakpoint}) {
    margin-bottom: 0;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

StyledIconImage.propTypes = IconImage.propTypes
StyledIconImage.defaultProps = IconImage.defaultProps

export default StyledIconImage
