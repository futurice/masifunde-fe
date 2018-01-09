import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { rem } from '../styling/typography'
import { jpgCompression } from '../utils/constants'
import RoundedImage from './RoundedImage'

const TeamContainer = styled.div`
  &:not(:first-of-type):not(:last-of-type) {
    margin-bottom: ${rem('30px')};
  }
  font-size: 16px;
`

const Title = styled.div`
  font-weight: bold;
`

const Image = RoundedImage.extend`
  width: 100%;
`

const Email = styled.a`
  display: block;
  word-break: break-all;
`

const ContentContainer = styled.div`
  max-width: 160px;
`

const TeamMember = ({
  imageUrl,
  title,
  subtitle,
  email,
  className,
}) => (
  <TeamContainer className={`${className} d-flex justify-content-center`}>
    <ContentContainer>
      <Image
        className="img-fluid"
        src={`${imageUrl}?q=${jpgCompression}`}
        alt={`${title} - ${subtitle}`}
      />
      <Title>{title}</Title>
      <div>{subtitle}</div>
      <Email href={`mailto:${email}`}>{email}</Email>
    </ContentContainer>
  </TeamContainer>
)

TeamMember.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  email: PropTypes.string,
  className: PropTypes.string,
}

TeamMember.defaultProps = {
  email: '',
  className: '',
}

export default TeamMember
