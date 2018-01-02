import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import _flow from 'lodash/flow'

import withAnalytics from './withAnalytics'
import withLoadingIndicator from './withLoadingIndicator'
import Header, { propTypes as headerPropTypes } from './Header'
import Footer, { propTypes as footerPropTypes } from './Footer'
import { smallBreakpoint } from '../styling/breakpoints'
import { bodyText, h1Text, h2Text, h3Text, rootFontSize } from '../styling/typography'
import theme from '../styling/theme'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    font-size: ${rootFontSize};
 }

  body {
    background-color: #faf2e6;
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
    color: ${theme.linkBlue};;
  }

  .footer a, .footer a:visited {
    color: ${theme.pineCone};
  }

  .footer li {
    padding: 0.3rem 0;
    color: #77695c;
  }

  .footer ul li:first-of-type {
    font-weight: 700;
  }

  h1 {
    ${h1Text}
  }

  h2 {
    ${h2Text}
  }

  h3 {
    ${h3Text}
  }

  p + p {
    margin-top: 1.5rem;
  }

  .is-invalid {
    border-color: ${theme.error} !important
  }

  //Bootstrap overrides
  button.navbar-toggler {
    border: 0;
  }

  .nav-item {
    @media screen and (max-width: 768px) {
      padding: 1rem 0;
    }
  }

  .form-control {
    background-color: #FFFDFB !important;
  }
`

const LayoutChildrenContainer = styled.div`
  padding-top: calc(${props => props.theme.headerHeight} + ${props => props.theme.pagePaddingMobile});

  @media (min-width: ${smallBreakpoint}) {
    padding-top: calc(${props => props.theme.headerHeight} + ${props => props.theme.pagePadding});
  }
`

const Layout = ({ headerData, children, footerData }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon/favicon.ico" />
        <link rel="icon" type="image/png" href="/static/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/static/favicon/favicon-16x16.png" sizes="16x16" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta.2/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,900" />
        <link href="https://fonts.googleapis.com/css?family=Raleway:500,700,800" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/core-js@2/client/shim.min.js" />
      </Head>
      <Header height={theme.headerHeight} {...headerData} />
      <LayoutChildrenContainer>
        {children}
      </LayoutChildrenContainer>
      <Footer {...footerData} />
    </Fragment>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerData: PropTypes.shape(headerPropTypes).isRequired,
  footerData: PropTypes.shape(footerPropTypes).isRequired,
}

export default _flow(withLoadingIndicator, withAnalytics)(Layout)
