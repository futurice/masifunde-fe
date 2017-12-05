import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import imagePropTypes from '../propTypes/image'

const CenteredSpan = styled.span`
  text-align: center;
`

const Stat = ({
  description, icon, number,
}) => (
  <div className="col-md d-flex flex-column align-items-center">
    <img src={icon.url} alt={icon.title} />
    <CenteredSpan>{number}</CenteredSpan>
    <CenteredSpan>{description}</CenteredSpan>
  </div>
)

Stat.propTypes = {
  icon: PropTypes.shape(imagePropTypes).isRequired,
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Stat
