import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { teamMemberAndPartnerWidth } from '../../utils/constants'

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

const Partner = ({
  image,
  name,
  link,
  className,
}) => (
  <PartnerContainer className={className}>
    <Link href={link}>
      <ImageContainer>
        <Image src={image.url} alt="" />
      </ImageContainer>
      <PartnerName>{name}</PartnerName>
    </Link>
  </PartnerContainer>
)

export const propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Partner.propTypes = propTypes

Partner.defaultProps = {
  className: '',
}

export default Partner
