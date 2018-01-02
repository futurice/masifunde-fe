import styled from 'styled-components'

import { smBreakpoint } from '../styling/breakpoints'

const HorizontalRuler = styled.hr`
  border-color: ${props => props.theme.orange};
  margin: 3.5rem 12%;

  @media (min-width: ${smBreakpoint}) {
    margin: 4rem 22%;
  }
`

export default HorizontalRuler
