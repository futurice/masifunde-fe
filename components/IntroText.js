import styled from 'styled-components'

import Markdown from './Markdown'
import { lgBreakpoint } from '../styling/breakpoints'

const IntroText = styled(Markdown)`
  margin: 0 auto;
  text-align: center;

  @media (min-width: ${lgBreakpoint}) {
    width: 70%;
  }
`

export default IntroText
