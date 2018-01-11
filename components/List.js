import styled, { css } from 'styled-components'
import { smBreakpoint, mdBreakpoint, lgBreakpoint } from '../styling/breakpoints'
import { extraSmallSpacing } from '../styling/sizes'

const centerIfSingleLine = (breakpoint, maxEntiresPerLine, numberOfEntries) => {
  if (numberOfEntries < maxEntiresPerLine) {
    return css`
      @media (min-width: ${breakpoint}) {
        justify-content: center;
      }
    `
  }
  return ''
}

const listBottomMargin = '1rem'

const List = styled.div`
  flex-grow: 0;

  display: flex;
  flex-wrap: wrap;
  
  ${({ entries }) => centerIfSingleLine(smBreakpoint, 2, entries.length)}
  ${({ entries }) => centerIfSingleLine(mdBreakpoint, 3, entries.length)}
  ${({ entries }) => centerIfSingleLine(lgBreakpoint, 6, entries.length)}

  margin-bottom: -${listBottomMargin};

  > * {
    width: 50%;
    padding: 0 ${extraSmallSpacing};
    margin-bottom: ${listBottomMargin};

    @media (min-width: ${smBreakpoint}) {
      width: 50%;
    }

    @media (min-width: ${mdBreakpoint}) {
      width: 33%;
    }

    @media (min-width: ${lgBreakpoint}) {
      width: 16%;
    }
  }
`

export default List
