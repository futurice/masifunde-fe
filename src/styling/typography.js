import { css } from 'styled-components'
import { rem as polishedRem } from 'polished'

import { lgBreakpoint, mdBreakpoint } from './breakpoints'
import theme from './theme'
import { extraSmallSpacing } from './sizes'

export const defaultFont =
  'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
export const headerFont = 'Raleway, sans-serif'
export const handwrittenFont = 'banaueregular, sans-serif'

export const rootFontSize = '18px'
export const smallFontSize = '16px'

export const bodyTextLineHeight = 1.39

// Use this function to convert pixel font sizes from the designs to rem.
// Example: rem('24px')
export function rem(px) {
  return polishedRem(px, rootFontSize)
}

export const bodyText = css`
  color: ${theme.black};
  font-family: ${defaultFont};
  font-weight: 400;
  line-height: ${bodyTextLineHeight};
`

export const titleText = css`
  font-family: ${headerFont};
  font-weight: 800;
  text-align: center;
  width: 100%;
  word-wrap: break-word;
  hyphens: auto;
`

export const pageTitleWidth = '70%'

export const pageTitleText = css`
  ${titleText}
  color: ${theme.orangeRed};
  font-size: ${rem('30px')};
  font-weight: 800;
  line-height: 1;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${rem('52px')};

  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('40px')};
  }

  @media (min-width: ${lgBreakpoint}) {
    font-size: ${rem('48px')};
    letter-spacing: ${rem('0.5px')};
    line-height: 1.08;
    width: ${pageTitleWidth};
  }
`

export const sectionTitleText = css`
  ${titleText}
  color: ${theme.orangeRed};
  font-size: ${rem('26px')};
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: ${rem('-0.3px')};
  margin-bottom: ${extraSmallSpacing};

  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('34px')};
    line-height: 1.47;
    letter-spacing: ${rem('-0.4px')};
  }

  @media (min-width: ${lgBreakpoint}) {
    font-size: ${rem('40px')};
  }
`

export const subsectionTitleText = css`
  ${titleText}
  text-align: left;
  color: ${theme.pineCone};
  font-size: ${rem('22px')};
  font-weight: 500;
  line-height: 1.39;
  letter-spacing: ${rem('-0.3px')};

  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('26px')};
  }

  @media (min-width: ${lgBreakpoint}) {
    font-size: ${rem('32px')};
  }
`

export const componentTitleText = css`
  ${titleText}
  color: ${theme.pineCone};
  font-size: ${rem('18px')};
  font-weight: bold;
`

export const handwrittenText = css`
  font-family: ${handwrittenFont};
  font-size: ${rem('37px')};
  font-weight: normal;
  color: ${theme.pineCone};
`

export const footerText = css`
  ${bodyText}
  font-size: ${rem('14px')};
`
