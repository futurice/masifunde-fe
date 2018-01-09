import styled from 'styled-components'

import Markdown from './Markdown'
import { lgBreakpoint } from '../styling/breakpoints'
import { smallSpacing } from '../styling/sizes'

const CenteredText = styled(Markdown)`
  margin: 0 auto;
  text-align: center;

  @media (min-width: ${lgBreakpoint}) {
    width: 70%;
  }
  
  h1 + & {
    margin-top: -${smallSpacing};
  }
`

export default CenteredText
