import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import { lgBreakpoint } from '../../../styling/breakpoints'

const SubContainer = styled.div`
  margin: 0 auto;

  @media (min-width: ${lgBreakpoint}) {
    width: 60%;
  }
`

const FormContainer = ({ children }) => (
  <Container>
    <SubContainer>{children}</SubContainer>
  </Container>
)

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FormContainer
