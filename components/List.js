import styled, { css } from 'styled-components'
import { smBreakpoint, mdBreakpoint, lgBreakpoint } from '../styling/breakpoints'
import { extraSmallSpacing, smallSpacing } from '../styling/sizes'

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

const listItemBottomMargin = smallSpacing

const smEntriesPerLine = 1
const mdEntriesPerLine = 2
const lgEntriesPerLine = 4

const List = styled.div`
  flex-grow: 0;

  display: flex;
  flex-wrap: wrap;
  
  ${({ entries }) => centerIfSingleLine(smBreakpoint, smEntriesPerLine, entries.length)}
  ${({ entries }) => centerIfSingleLine(mdBreakpoint, mdEntriesPerLine, entries.length)}
  ${({ entries }) => centerIfSingleLine(lgBreakpoint, lgEntriesPerLine, entries.length)}

  margin-bottom: -${listItemBottomMargin};

  > * {
    width: 100%;
    padding: 0 ${extraSmallSpacing};
    margin-bottom: ${listItemBottomMargin};

    @media (min-width: ${smBreakpoint}) {
      width: calc(100% / ${smEntriesPerLine});
    }

    @media (min-width: ${mdBreakpoint}) {
      width: calc(100% / ${mdEntriesPerLine});
    }

    @media (min-width: ${lgBreakpoint}) {
      width: calc(100% / ${lgEntriesPerLine});
    }
  }
`

export default List
