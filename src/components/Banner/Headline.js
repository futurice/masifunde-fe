import styled from 'styled-components'

import { rem, subsectionTitleText } from '../../styling/typography'
import { lgBreakpoint, mdBreakpoint } from '../../styling/breakpoints'

const Headline = styled.span`
  ${subsectionTitleText};
  color: white;
  font-size: ${rem('24px')};
  font-weight: bold;
  letter-spacing: ${rem('0.2px')};
  margin-bottom: ${rem('30px')};
  text-align: center;

  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('26px')};
    letter-spacing: ${rem('0.3px')};
    line-height: 1.39;
    width: 80%;
  }

  @media (min-width: ${lgBreakpoint}) {
    font-size: ${rem('32px')};
    letter-spacing: ${rem('0.4px')};
    line-height: 1.39;
  }
`

export default Headline
