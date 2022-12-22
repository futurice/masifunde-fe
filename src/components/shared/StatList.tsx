import styled from 'styled-components'
import { smBreakpoint } from '../../styling/breakpoints'
import { extraSmallSpacing, largeSpacing } from '../../styling/sizes'

const StatList = styled.div`
  margin-top: ${extraSmallSpacing};
  display: flex;
  justify-content: center;
  flex-direction: column;

  > * {
    margin-bottom: ${largeSpacing};
  }

  @media (min-width: ${smBreakpoint}) {
    flex-direction: row;
    justify-content: space-around;

    > * {
      margin-bottom: 0;
    }
  }
`

export default StatList
