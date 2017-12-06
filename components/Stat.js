import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import imagePropTypes from '../propTypes/image'

const CenteredSpan = styled.span`
  text-align: center;
  max-width: 200px;
`

const FixedHeight = styled.div`
  height: 65px;
`

const StatContainer = styled.div`
  margin-bottom: 30px;
`

const Stat = ({
  textAbove, description, icon, number, className,
}) => (
  <StatContainer className={`${className} d-flex flex-column align-items-center`}>
    {!!textAbove && (
      <FixedHeight className="d-flex align-items-center">
        <CenteredSpan>{textAbove}</CenteredSpan>
      </FixedHeight>
    )}
    <img src={icon.url} alt={icon.title} />
    <CenteredSpan>{number}</CenteredSpan>
    <CenteredSpan>{description}</CenteredSpan>
  </StatContainer>
)

Stat.propTypes = {
  className: PropTypes.string,
  textAbove: PropTypes.string,
  icon: PropTypes.shape(imagePropTypes).isRequired,
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

Stat.defaultProps = {
  textAbove: undefined,
  className: '',
}

export default Stat
