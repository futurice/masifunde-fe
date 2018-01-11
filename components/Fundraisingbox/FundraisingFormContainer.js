import React from 'react'
import { Container } from 'reactstrap'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { lgBreakpoint } from '../../styling/breakpoints'

const SubContainer = styled.div`
  margin: 0 auto;
  
  @media (min-width: ${lgBreakpoint}) {
      width: 60%;
  }
  ${({ pullLeft }) => pullLeft && css`
    margin-left: 0;
    `}
`

const FundraisingFormContainer = ({ children, pullLeft }) => (
  <Container>
    <SubContainer pullLeft={pullLeft}>
      {children}
    </SubContainer>
  </Container>
)

FundraisingFormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  pullLeft: PropTypes.bool,
}

FundraisingFormContainer.defaultProps = {
  pullLeft: false,
}

export default FundraisingFormContainer
