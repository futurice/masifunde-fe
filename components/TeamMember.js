import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RoundedImage from './RoundedImage'
import { wordBreak } from '../styling/utils'

const TeamContainer = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
`

const WordBreakDiv = styled.div`
  ${wordBreak}
`

const Title = WordBreakDiv.extend`
  font-weight: bold;
`

const Subtitle = WordBreakDiv.extend``

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
  <TeamContainer className={className}>
    <ContentContainer>
      <Image
        className="img-fluid"
        src={imageUrl}
        alt=""
      />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {email && (<Email href={`mailto:${email}`}>{email}</Email>)}
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
