import { createGlobalStyle } from 'styled-components'

import {
  bodyText,
  pageTitleText,
  sectionTitleText,
  subsectionTitleText,
  componentTitleText,
  rootFontSize,
} from '../styling/typography'
import theme from '../styling/theme'
import { extraSmallSpacing, smallSpacing } from '../styling/sizes'
import { mdBreakpoint } from '../styling/breakpoints'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${rootFontSize};
 }

  body {
    background-color: ${theme.orangeBackgroundLight};
    ${bodyText}
  }

  @font-face {
    font-family: 'banaueregular';
    src: url('/static/fonts/banaue-regular-webfont.woff2') format('woff2'),
         url('/static/fonts/banaue-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  a {
    color: ${theme.linkBlue};
  }

  h1 {
    ${pageTitleText}
  }

  h2 {
    ${sectionTitleText}
  }

  h3 {
    ${subsectionTitleText}
  }

  h4 {
    ${componentTitleText}
  }

  p + p {
    margin-top: ${smallSpacing};
  }

  .is-invalid {
    border-color: ${theme.error} !important
  }

  /*
   * Bootstrap: Navbar
   * =================
   */

  button.navbar-toggler {
    border: 0;
  }

  .nav-item {
    @media screen and (max-width: ${mdBreakpoint}) {
      padding: ${extraSmallSpacing} 0;
    }
  }

  /*
   * Bootstrap: Forms
   * ================
   */

  .form-control {
    background-color: #FFFDFB !important;
  }

  /*
   * Bootstrap: Tooltips
   * ===================
   */

  .tooltip.bs-tooltip-top .arrow::before {
    border-top-color: white !important;
  }

  .tooltip.bs-tooltip-bottom .arrow::before {
    border-bottom-color: white !important;
  }

  .tooltip.bs-tooltip-left .arrow::before {
    border-left-color: white !important;
  }

  .tooltip.bs-tooltip-right .arrow::before {
    border-right-color: white !important;
  }

  /*
   * react-modal
   * ===========
   */

  .ReactModal__Body--open{
    overflow: hidden;
  }

  .ReactModal__Overlay {
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.70);
  }

  .ReactModal__Content {
    top: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    left: 50%;
    margin-right: -50%;

    position: absolute;
    border: 1px solid rgb(204, 204, 204);
    background-color: #faf2e6;
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
    max-width: 900px;
    width: calc(100vw - 30px);
  }
`

export default GlobalStyle
