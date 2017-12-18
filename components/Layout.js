import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'

import withAnalytics from './withAnalytics'
import Header, { propTypes as headerPropTypes } from './Header'
import Footer, { propTypes as footerPropTypes } from './Footer'
import { pageTitle, sectionTitle, subtitle } from '../styling/typography'

const theme = {
  orange: '#FE9933',
  orangeRed: '#FF621D',
  green: '#17DD73',
  darkGreen: '#00C078',
  blue: '#4176F9',
  linkBlue: '#225DBC',
  pineCone: '#77695C',
  roundedImageBorderRadius: '6px',
  error: '#DC3545',
}

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    //font-size: 75%; //9pt

    @media screen and (min-width: 768px) {
      font-size: 91%; //11pt
    }
  }
  
  body {
    font-family: 'Lato', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    color: #4F463F;
    background-color: #faf2e6;
    line-height: 1.6;
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

  h1, h2, h3 {
    font-family: 'Raleway';
    font-weight: 800;
    text-align: center;
  }
  
  h1 {
    ${pageTitle}
  }
  
  h2 {
    ${sectionTitle}
  }

  h3 {
    ${subtitle}
  }

  p + p {
    margin-top: 1.5rem;
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
`

const headerHeight = '4.5rem'

const LayoutChildrenContainer = styled.div`
  padding-top: ${headerHeight};
`

const Layout = ({ headerData, children, footerData }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta.2/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,900" />
        <link href="https://fonts.googleapis.com/css?family=Raleway:500,700,800" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/babel-polyfill@6.26.0/dist/polyfill.min.js" />
      </Head>
      <Header height={headerHeight} {...headerData} />
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

export default withAnalytics(Layout)
