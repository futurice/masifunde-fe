import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { useRouter } from 'next/router'
import T from 'i18n-react'
import { IconContext } from 'react-icons'

import theme from '../styling/theme'
import deLocale from '../i18n/de.json'
import enLocale from '../i18n/en.json'
import { fetchFooterData, fetchHeaderData } from '../content/common'
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
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <>
          <Header height={theme.headerHeight} {...headerData} />
          <Content>
            <CookieNotice />
            {children}
          </Content>
          <Footer {...footerData} />
        </>
      </IconContext.Provider>
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
