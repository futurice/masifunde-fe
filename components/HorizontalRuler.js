import styled from 'styled-components'

import { smBreakpoint } from '../styling/breakpoints'

const HorizontalRuler = styled.hr.attrs({ role: 'presentation' })`
  border-color: ${props => props.theme.orange};
  margin: 0 12%;

  @media (min-width: ${smBreakpoint}) {
    margin: 0 22%;
  }
`

export default HorizontalRuler
