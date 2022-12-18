import styled from 'styled-components'
import { lgBreakpoint } from '../../styling/breakpoints'
import { extraSmallSpacing } from '../../styling/sizes'
import Markdown from './Markdown'

const CenteredText = styled(Markdown)`
  margin: 0 auto;
  text-align: center;

  @media (min-width: ${lgBreakpoint}) {
    width: 70%;
  }

  h1 + & {
    margin-top: -${extraSmallSpacing};
  }
`

export default CenteredText
