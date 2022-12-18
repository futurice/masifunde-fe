import PropTypes from 'prop-types'
import styled from 'styled-components'

const Error = styled.div`
  color: ${(props) => props.theme.error};
`

const ErrorMessage = ({ meta, ...rest }) =>
  meta.error && meta.touched ? <Error {...rest}>{meta.error}</Error> : null

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
