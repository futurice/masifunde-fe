import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { smBreakpoint } from '../styling/breakpoints'

const List = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;

  > * {
    margin-bottom: 1rem;
  }

  @media (min-width: ${smBreakpoint}) {
    flex-direction: row;

    > * {
      margin-bottom: 0;
    }
  }
`

const StatList = ({ children }) => (
  <List>
    {children}
  </List>
)

StatList.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StatList
