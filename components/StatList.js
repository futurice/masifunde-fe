import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { smBreakpoint } from '../styling/breakpoints'
import { extraSmallSpacing } from '../styling/sizes'

const List = styled.div`
  margin-top: ${extraSmallSpacing};
  display: flex;
  justify-content: center;
  flex-direction: column;

  > * {
    margin-bottom: ${extraSmallSpacing};
  }

  @media (min-width: ${smBreakpoint}) {
    flex-direction: row;
    justify-content: space-around;

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
