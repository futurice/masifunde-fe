import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Error = styled.div`
  color: ${props => props.theme.error};
`

const ErrorMessage = ({ meta, ...rest }) => (
  meta.error && meta.touched
    ? <Error {...rest}>{meta.error}</Error>
    : null
)

ErrorMessage.propTypes = {
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
}

ErrorMessage.defaultProps = {
  meta: {},
}

export default ErrorMessage
