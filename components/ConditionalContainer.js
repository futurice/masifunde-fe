import styled from 'styled-components'
import PropTypes from 'prop-types'

const Div = styled.div`
  @media (max-width: ${(props) => {
      switch (props.containAfter) {
        case 'xs':
          return '575.99px'
        case 'sm':
          return '767.99px'
        case 'md':
          return '991.99px'
        case 'lg':
          return '1199.99px'
        case 'never':
          return '100vw'
        default:
          return '767.99px'
      }
    }}) {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
  }
`

const ConditionalContainer = ({ children, containAfter }) => (
  <Div className="container" containAfter={containAfter}>
    {children}
  </Div>
)

ConditionalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  containAfter: PropTypes.string.isRequired,
}

export default ConditionalContainer
