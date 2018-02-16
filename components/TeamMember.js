import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RoundedImage from './RoundedImage'
import { teamMemberAndPartnerWidth } from '../utils/constants'

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.div`
  font-weight: bold;
  margin-top: 0.25rem;
`

const Image = RoundedImage.extend`
  width: 100%;
`

const Email = styled.a`
  display: block;
  word-break: break-all;
`

const ContentContainer = styled.div`
  max-width: ${teamMemberAndPartnerWidth};
`

const TeamMember = ({
  imageUrl,
  title,
  subtitle,
  email,
  className,
}) => (
  <TeamContainer className={className}>
    <ContentContainer>
      <Image
        className="img-fluid"
        src={imageUrl}
        alt=""
      />
      <Title>{title}</Title>
      <div>{subtitle}</div>
      {email && (<Email href={`mailto:${email}`}>{email}</Email>)}
    </ContentContainer>
  </TeamContainer>
)

TeamMember.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  email: PropTypes.string,
  className: PropTypes.string,
}

TeamMember.defaultProps = {
  email: '',
  className: '',
  subtitle: '',
}

export default TeamMember
