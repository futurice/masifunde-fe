/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components'
import { rem as polishedRem } from 'polished'

import { largeBreakpoint, mediumBreakpoint } from './breakpoints'
import theme from './theme'

export const defaultFont = 'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
export const headerFont = 'Raleway, sans-serif'
export const handwrittenFont = 'banaueregular, sans-serif'

export const rootFontSize = '16px'

// Use this function to convert pixel font sizes from the designs to rem.
// Example: rem('24px')
export function rem(px) {
  return polishedRem(px, rootFontSize)
}

export const bodyText = css`
  color: #4F463F;
  font-family: ${defaultFont};
  font-weight: 400;
  line-height: 1.39;
`

export const headerText = css`
  font-family: ${headerFont};
  font-weight: 800;
  text-align: center;
  width: 100%;
  word-wrap: break-word;
`

export const pageHeaderText = css`
  ${headerText}
  color: ${theme.orangeRed};
  font-size: ${rem('30px')};
  font-weight: 800;
  line-height: 1;

  @media (min-width: ${mediumBreakpoint}) {
    font-size: ${rem('40px')};
  }

  @media (min-width: ${largeBreakpoint}) {
    font-size: ${rem('48px')};
    letter-spacing: ${rem('0.5px')};
    line-height: 1.08;
  }
`

export const sectionHeaderText = css`
  ${headerText}
  color: ${theme.orangeRed};
  font-size: ${rem('24px')};
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: ${rem('-0.3px')};

  @media (min-width: ${mediumBreakpoint}) {
    font-size: ${rem('34px')};
    line-height: 1.47;
    letter-spacing: ${rem('-0.4px')};
  }

  @media (min-width: ${largeBreakpoint}) {
    font-size: ${rem('48px')};
  }
`

export const subsectionHeaderText = css`
  ${headerText}
  color: ${theme.pineCone};
  font-size: ${rem('26px')};
  font-weight: 500;
  line-height: 1.39;
  letter-spacing: ${rem('-0.3px')};

  @media (min-width: ${mediumBreakpoint}) {
    font-size: ${rem('26px')};
  }

  @media (min-width: ${largeBreakpoint}) {
    font-size: ${rem('32px')};
  }
`

export const handwrittenText = css`
  font-family: ${handwrittenFont};
  font-size: ${rem('37px')};
  font-weight: normal;
`
