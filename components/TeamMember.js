import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Title = styled.div`
  font-weight: bold;
`

const TeamMember = ({
  imageUrl, title, subtitle, email, className,
}) => (
  <div className={className}>
    <img className="img-fluid" src={imageUrl} alt={`${title} - ${subtitle}`} />
    <Title>{title}</Title>
    <div>{subtitle}</div>
    <a href={`mailto:${email}`}>{email}</a>
  </div>
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
