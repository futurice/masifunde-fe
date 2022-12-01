import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import { useRouter } from 'next/router'
import T from 'i18n-react'

import theme from '../styling/theme'
import deLocale from '../i18n/de.json'
import enLocale from '../i18n/en.json'
import { fetchFooterData, fetchHeaderData } from '../api/common'
import Footer, { propTypes as footerPropTypes } from './Footer'
import Header, { propTypes as headerPropTypes } from './Header'
import CookieNotice from './CookieNotice'
import GlobalStyle from './GlobalStyle'

const locales = {
  de: deLocale,
  en: enLocale,
}

const Content = styled.main.attrs({ role: 'main' })`
  padding-top: ${(props) => props.theme.headerHeight};
`
const Layout = ({ headerData, children, footerData }) => {
  const router = useRouter()
  const { locale } = router.query

  T.setTexts(locales[locale])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.0/dist/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:400,700,900"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:500,700,800"
            rel="stylesheet"
          />
          <script src="https://cdn.jsdelivr.net/npm/core-js@2/client/shim.min.js" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-141682105-2"
          />
          <script
            dangerouslySetInnerHTML={{
              // Google Analytics
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'UA-141682105-2');
              `,
            }}
          />
        </Head>
        <Header height={theme.headerHeight} {...headerData} />
        <Content>
          <CookieNotice />
          {React.cloneElement(children, { locale })}
        </Content>
        <Footer {...footerData} />
      </Fragment>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  locale: PropTypes.string.isRequired,
  headerData: PropTypes.shape(headerPropTypes).isRequired,
  footerData: PropTypes.shape(footerPropTypes).isRequired,
  children: PropTypes.node.isRequired,
}

/**
 * Fetches the data required by the Layout component.
 *
 * Call this from each page's `getServerSideProps` function and
 * spread the result into the page's props object:
 *
 * ```js
 * export async function getServerSideProps({ query: { locale } }) {
 *   return {
 *     props: {
 *       ...(await getLayoutProps(locale)),
 *       // page-specific props
 *    }
 * }
 * ```
 *
 * These will then be forwarded
 * to the Layout (see `pages/_app.js`).
 *
 * @param {string} locale - The page's locale.
 * @returns {object} The props needed by `Layout`.
 */
export async function getLayoutProps(locale) {
  return {
    layoutProps: {
      locale,
      headerData: await fetchHeaderData(locale),
      footerData: await fetchFooterData(locale),
    },
  }
}

export default Layout
