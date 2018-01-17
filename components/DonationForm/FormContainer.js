import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { lgBreakpoint } from '../../styling/breakpoints'

const SubContainer = styled.div`
  margin: 0 auto;
  
  @media (min-width: ${lgBreakpoint}) {
      width: 60%;
  }
`

const FundraisingFormContainer = ({ children }) => (
  <Container>
    <SubContainer>
      {children}
    </SubContainer>
  </Container>
)

FundraisingFormContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FundraisingFormContainer
